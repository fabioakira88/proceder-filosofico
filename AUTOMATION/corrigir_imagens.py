"""
CORREÇÃO DE IMAGENS — Proceder Filosófico
==========================================
Fixes:
  1. Peter Pan: thumb 404 → upload imagem + atualizar page 68
  2. A Montanha: thumb ausente → fazer patch no POSTS via page 68

Executa via REST API. Se a API estiver bloqueada (403/404),
o script imprime instruções manuais exatas.
"""
import re, sys, mimetypes, requests
from pathlib import Path

from wp_auth import get_auth

AUTH = get_auth()
BASE = 'https://procederfilosofico.com.br/wp-json/wp/v2'
PROJECT_ROOT = Path(__file__).resolve().parents[1]

# ── Imagem local para A Montanha (Nietzsche) ────────────────────
NIETZSCHE_IMG = PROJECT_ROOT / "BRANDING" / "assets" / "Filósofos " / "FRIEDRICH NIETZSCHE.jpeg"

# ── Imagem para Peter Pan (fornecer manualmente se necessário) ──
# Coloque o caminho local da imagem aqui:
PETER_PAN_IMG = ""  # ex: str(PROJECT_ROOT / "BRANDING" / "assets" / "peter-pan.png")
# OU cole a URL já existente no WP Media Library:
PETER_PAN_URL = ""  # ex: "https://procederfilosofico.com.br/wp-content/uploads/..."

# ────────────────────────────────────────────────────────────────

def upload_image(path, filename):
    print(f"  Subindo {filename}...")
    with open(path, 'rb') as f:
        data = f.read()
    mime = mimetypes.guess_type(str(path))[0] or 'image/jpeg'
    r = requests.post(
        f'{BASE}/media', auth=AUTH,
        headers={'Content-Disposition': f'attachment; filename="{filename}"', 'Content-Type': mime},
        data=data
    )
    if not r.ok:
        print(f"  ERRO no upload: {r.status_code}")
        print(r.text[:200])
        return None
    url = r.json().get('source_url')
    print(f"  ✓ URL: {url}")
    return url

def get_page_content(page_id):
    r = requests.get(f'{BASE}/pages/{page_id}', auth=AUTH, params={'context': 'edit'})
    if not r.ok:
        return None, None
    data = r.json()
    return data.get('content', {}).get('raw', ''), data.get('link', '')

def update_page(page_id, content):
    r = requests.post(f'{BASE}/pages/{page_id}', auth=AUTH,
        json={'content': content, 'status': 'publish'})
    return r.ok, r.status_code

def find_home_page_id():
    """Busca o ID da página home (show_on_front=page)."""
    r = requests.get(f'{BASE}/settings', auth=AUTH)
    if r.ok:
        data = r.json()
        return data.get('page_on_front')
    # Fallback: listar páginas
    r2 = requests.get(f'{BASE}/pages', auth=AUTH, params={'per_page': 20, 'context': 'edit'})
    if r2.ok:
        for p in r2.json():
            if 'home' in p['slug'].lower() or p.get('link', '').rstrip('/') == 'https://procederfilosofico.com.br':
                return p['id']
    return None

def js_escape(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

# ── 1. Testar API ────────────────────────────────────────────────
print("[0] Testando acesso à API...")
test = requests.get(f'{BASE}/pages', auth=AUTH, params={'per_page': 1}, timeout=10)
if not test.ok:
    print(f"\n  API INACESSÍVEL (status {test.status_code}).")
    print("  Aplique os fixes MANUALMENTE conforme instruções abaixo:\n")
    print("=" * 60)
    print("FIX 1 — PETER PAN (via WordPress Admin)")
    print("=" * 60)
    print("1. Acesse: procederfilosofico.com.br/wp-admin")
    print("2. Vá em Mídia → Adicionar Nova → faça upload de uma")
    print("   imagem de J.M. Barrie ou Peter Pan")
    print("3. Copie a URL da imagem do WP Media Library")
    print("4. Vá em Páginas → encontre a página inicial → Editar")
    print("5. Encontre o bloco HTML com o texto:")
    print("     slug:     'peter-pan-sindrome-amadurecimento'")
    print("6. Altere a linha:")
    print("     thumb:    'Canva%20-%20Proceder/peter-pan.png',")
    print("   Para:")
    print("     thumb:    'URL_DA_IMAGEM_AQUI',")
    print()
    print("=" * 60)
    print("FIX 2 — A MONTANHA CONTRA A CAVERNA (via hPanel File Manager)")
    print("=" * 60)
    print("1. hPanel → Gerenciamento de Arquivos → public_html")
    print("2. Abra: wp-content/themes/hostinger-ai-theme/front-page.php")
    print("3. Encontre o bloco:")
    print('     slug: "a-montanha-contra-a-caverna",')
    print("4. Adicione APÓS a linha `date: \"05/05/2026\",`:")
    print('     thumb: "assets/FLaneKfrfyGYOgJd.jpg",')
    print()
    print("NOTA: Também adicione thumbs para os outros artigos base")
    print("que estão sem imagem (somos-livres, ser-so-religioso, etc.)")
    sys.exit(1)

print(f"  ✓ API acessível (status {test.status_code})")

# ── 2. Localizar página home ─────────────────────────────────────
print("\n[1] Localizando página home...")
home_id = find_home_page_id()
if not home_id:
    print("  ERRO: página home não encontrada. Tente setar home_id manualmente.")
    home_id = 68  # fallback
    print(f"  Usando fallback: page ID={home_id}")

print(f"  Page ID: {home_id}")

# ── 3. Ler conteúdo atual da page ────────────────────────────────
print("\n[2] Lendo conteúdo da página...")
raw, link = get_page_content(home_id)
if raw is None:
    print(f"  ERRO: não foi possível ler page {home_id}")
    sys.exit(1)
print(f"  {len(raw)} chars | link: {link}")

# ── 4. Upload imagem Nietzsche (para A Montanha) ─────────────────
nietzsche_url = None
print("\n[3] Upload imagem Nietzsche (A Montanha)...")
nietzsche_url = upload_image(NIETZSCHE_IMG, "nietzsche.jpeg")
if not nietzsche_url:
    nietzsche_url = "assets/FLaneKfrfyGYOgJd.jpg"
    print(f"  Usando fallback: {nietzsche_url}")

# ── 5. Upload imagem Peter Pan ───────────────────────────────────
peter_pan_url = PETER_PAN_URL
if not peter_pan_url and PETER_PAN_IMG:
    print("\n[4] Upload imagem Peter Pan...")
    peter_pan_url = upload_image(PETER_PAN_IMG, "peter-pan.png")

if not peter_pan_url:
    print("\n[4] AVISO: sem imagem para Peter Pan.")
    print("   Defina PETER_PAN_IMG ou PETER_PAN_URL no script e reexecute.")
    print("   Por agora, o Peter Pan ficará sem thumb (card sem imagem).")
    peter_pan_url = ""

# ── 6. Atualizar thumb do Peter Pan no bloco POSTS.unshift ───────
print("\n[5] Atualizando thumb Peter Pan na page...")
old_peter = "thumb:    'Canva%20-%20Proceder/peter-pan.png',"
new_peter = f"thumb:    '{peter_pan_url}',"
if old_peter in raw:
    raw = raw.replace(old_peter, new_peter)
    print(f"  ✓ thumb Peter Pan → {peter_pan_url or '(removido)'}")
else:
    print("  AVISO: string thumb Peter Pan não encontrada na page.")
    print(f"  Procurado: {old_peter}")

# ── 7. Injetar patch para A Montanha (e demais base articles) ─────
print("\n[6] Injetando patch de thumbs para artigos base...")

# Mapeamento: slug → (thumb_url, descrição)
BASE_THUMBS = {
    "a-montanha-contra-a-caverna":         (nietzsche_url, "Nietzsche"),
    "somos-livres-por-completo":           ("assets/zBmXzIGbgLLlbNyh.jpg", "assets"),
    "ser-so-religioso-pode-te-tornar-ignorante": ("assets/AJPBTuUJaFhjwjvx.jpg", "assets"),
    "a-etica-da-virtude-segundo-aristoteles": ("assets/wPdrfjjEMXEymTcc.jpg", "assets"),
    "critica-da-razao-pura":               ("assets/yPCECtiDBKjEdTjP.jpg", "assets"),
}

patch_lines = "\n".join([
    f"    case '{slug}': p.thumb = '{thumb}'; break;"
    for slug, (thumb, _) in BASE_THUMBS.items()
])

patch_js = (
    "<!-- wp:html -->\n"
    "<script>\n"
    "(function() {\n"
    "  if (typeof POSTS === 'undefined') return;\n"
    "  POSTS.forEach(function(p) {\n"
    "    if (p.thumb) return;\n"
    "    switch(p.slug) {\n"
    f"{patch_lines}\n"
    "    }\n"
    "  });\n"
    "})();\n"
    "</script>\n"
    "<!-- /wp:html -->"
)

PATCH_MARKER = "patch-base-thumbs"
if PATCH_MARKER in raw:
    print("  Patch já aplicado. Pulando.")
else:
    patch_block = patch_js.replace("<script>", f"<script>/* {PATCH_MARKER} */")
    raw = patch_block + "\n" + raw
    print("  ✓ Patch injetado para 5 artigos base")

# ── 8. Publicar na página ────────────────────────────────────────
print("\n[7] Publicando alterações...")
ok, status = update_page(home_id, raw)
print(f"  Status: {status}")
if ok:
    print("  ✓ Imagens corrigidas com sucesso!")
    print(f"  Acesse: {link}")
else:
    print("  ERRO ao publicar. Tente novamente ou aplique manualmente.")
