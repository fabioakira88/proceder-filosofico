import json
import mimetypes
import subprocess
from pathlib import Path

import requests

from wp_auth import get_auth


SITE = "https://procederfilosofico.com.br"
HOME_PAGE_ID = 68


def wp_url(path):
    # /wp-json/ is blocked on Hostinger; use ?rest_route= fallback
    return f"{SITE}/?rest_route=/wp/v2{path}"


def require_json(response, label):
    content_type = response.headers.get("content-type", "")
    if "json" not in content_type.lower():
        preview = response.text[:220].replace("\n", " ")
        raise RuntimeError(
            f"{label} nao retornou JSON. Status {response.status_code}, "
            f"content-type {content_type!r}. Preview: {preview}"
        )
    return response.json()


PROJECT_ROOT = Path(__file__).resolve().parents[1]
POSTS_JS = PROJECT_ROOT / "SITE" / "posts.js"

PATCH_START = "<!-- PROCEDER_CARDS_FIX_START -->"
PATCH_END = "<!-- PROCEDER_CARDS_FIX_END -->"


def load_posts():
    script = f"""
const fs = require('fs');
const vm = require('vm');
let code = fs.readFileSync({json.dumps(str(POSTS_JS))}, 'utf8');
code = code.replace(/const\\s+POSTS\\s*=/, 'var POSTS =');
const context = {{}};
vm.createContext(context);
vm.runInContext(code + '\\nthis.__POSTS__ = POSTS;', context);
console.log(JSON.stringify(context.__POSTS__));
"""
    result = subprocess.run(
        ["node", "-e", script],
        check=True,
        capture_output=True,
        text=True,
    )
    posts = json.loads(result.stdout)
    for post in posts:
        post["slug"] = post.get("slug") or post.get("id")
    return posts


def resolve_local_path(value):
    if not value or value.startswith(("http://", "https://")):
        return None
    return (PROJECT_ROOT / "SITE" / value).resolve()


def upload_image(path, auth):
    if not path.exists():
        raise FileNotFoundError(f"Imagem nao encontrada: {path}")

    filename = path.name
    mime = mimetypes.guess_type(str(path))[0] or "application/octet-stream"

    with path.open("rb") as handle:
        response = requests.post(
            wp_url("/media"),
            auth=auth,
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Content-Type": mime,
            },
            data=handle,
            timeout=90,
        )

    if response.status_code not in (200, 201):
        raise RuntimeError(f"Falha ao subir {filename}: {response.status_code} {response.text[:300]}")

    data = require_json(response, f"Upload de {filename}")
    return data["source_url"]


def prepare_posts(posts, auth):
    uploaded = {}
    for post in posts:
        thumb = post.get("thumb", "")
        local_path = resolve_local_path(thumb)
        if not local_path:
            continue
        if local_path not in uploaded:
            print(f"Subindo thumb: {local_path.name}")
            uploaded[local_path] = upload_image(local_path, auth)
        post["thumb"] = uploaded[local_path]
    return posts


def build_patch(posts):
    posts_json = json.dumps(posts, ensure_ascii=False).replace("</", "<\\/")
    return f"""{PATCH_START}
<!-- wp:html -->
<style id="proceder-cards-fix-style">
  .news-card-thumb {{
    width: 100%;
    height: 200px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center center;
    display: block;
    overflow: hidden;
    border-bottom: 1px solid rgba(201, 168, 76, 0.2);
  }}
  .news-grid .news-card:nth-child(-n+3) .news-card-thumb {{
    height: 260px;
    aspect-ratio: auto;
  }}
  .news-card {{
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
  }}
</style>
<script id="proceder-cards-fix-data" type="application/json">{posts_json}</script>
<script id="proceder-cards-fix-script">
(function() {{
  function text(value) {{
    return String(value || '').replace(/[&<>"']/g, function(ch) {{
      return {{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}}[ch];
    }});
  }}

  function getPosts() {{
    var data = document.getElementById('proceder-cards-fix-data');
    if (!data) return [];
    try {{
      return JSON.parse(data.textContent || '[]').map(function(post) {{
        post.slug = post.slug || post.id;
        return post;
      }});
    }} catch (err) {{
      console.error('Proceder cards fix: JSON invalido', err);
      return [];
    }}
  }}

  function render() {{
    var grid = document.getElementById('newsGrid');
    if (!grid) return;

    var posts = getPosts();
    if (!posts.length) return;

    window.POSTS = posts;
    grid.innerHTML = '';

    posts.forEach(function(post) {{
      var slug = post.slug || post.id;
      var card = document.createElement('article');
      card.className = 'news-card';
      card.setAttribute('data-slug', slug);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Ler artigo: ' + (post.title || ''));

      card.innerHTML =
        (post.thumb ? '<img class="news-card-thumb" src="' + text(post.thumb) + '" alt="' + text(post.title) + '" loading="lazy">' : '') +
        '<div class="news-card-body">' +
          '<span class="news-card-tag">' + text(post.tag) + '<\\/span>' +
          '<h3 class="news-card-title">' + text(post.title) + '<\\/h3>' +
          '<p class="news-card-excerpt">' + text(post.excerpt) + '<\\/p>' +
          '<div class="news-card-meta">' +
            '<span class="news-card-date">' + text(post.date) + '<\\/span>' +
            '<span class="news-card-read">Ler materia <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"><\\/path><\\/svg><\\/span>' +
          '<\\/div>' +
        '<\\/div>';

      card.addEventListener('click', function() {{
        if (typeof window.openPost === 'function') window.openPost(slug);
      }});
      card.addEventListener('keydown', function(event) {{
        if (event.key === 'Enter' || event.key === ' ') {{
          event.preventDefault();
          if (typeof window.openPost === 'function') window.openPost(slug);
        }}
      }});
      grid.appendChild(card);
    }});
  }}

  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', function() {{ setTimeout(render, 0); }});
  }} else {{
    setTimeout(render, 0);
  }}
  window.__procederRenderCards = render;
}})();
</script>
<!-- /wp:html -->
{PATCH_END}"""


def replace_patch(raw, patch):
    start = raw.find(PATCH_START)
    end = raw.find(PATCH_END)
    if start != -1 and end != -1 and end > start:
        end += len(PATCH_END)
        return raw[:start] + patch + raw[end:]
    return raw + "\n\n" + patch


def main():
    auth = get_auth()
    posts = load_posts()
    print(f"Posts locais: {len(posts)}")

    page = requests.get(
        wp_url(f"/pages/{HOME_PAGE_ID}"),
        auth=auth,
        params={"context": "edit"},
        timeout=30,
    )
    page.raise_for_status()
    page_data = require_json(page, "Leitura da home")
    raw = page_data.get("content", {}).get("raw", "")
    print(f"Home atual: {len(raw)} chars")

    posts = prepare_posts(posts, auth)

    patch = build_patch(posts)
    updated = replace_patch(raw, patch)

    response = requests.post(
        wp_url(f"/pages/{HOME_PAGE_ID}"),
        auth=auth,
        json={"content": updated, "status": "publish"},
        timeout=60,
    )
    if response.status_code not in (200, 201):
        raise RuntimeError(f"Falha ao publicar home: {response.status_code} {response.text[:500]}")
    require_json(response, "Publicacao da home")

    print("Publicado: patch de cards aplicado na home.")
    print(page_data.get("link", "https://procederfilosofico.com.br/"))


if __name__ == "__main__":
    main()
