import re, requests

from wp_auth import get_auth

AUTH = get_auth()
BASE = 'https://procederfilosofico.com.br/wp-json/wp/v2'
IMG  = ''  # TODO: fazer upload da imagem do Balzac e colar a URL aqui

SLUG = 'balzac-anatomia-capitalismo'

# Lê artigo do posts.js
with open('../posts.js', 'r', encoding='utf-8') as f:
    posts_js = f.read()

pos     = posts_js.find(f'"{SLUG}"')
title   = re.search(r'title:\s*"([^"]+)"',   posts_js[pos:pos+500]).group(1)
tag     = re.search(r'tag:\s*"([^"]+)"',     posts_js[pos:pos+500]).group(1)
date_v  = re.search(r'date:\s*"([^"]+)"',    posts_js[pos:pos+500]).group(1)
excerpt = re.search(r'excerpt:\s*"([^"]+)"', posts_js[pos:pos+500]).group(1)

c_pos    = posts_js.find('content:', pos)
bt_start = posts_js.find('`', c_pos) + 1
depth, i = 1, bt_start
while i < len(posts_js) and depth > 0:
    if posts_js[i] == '`': depth -= 1
    i += 1
content_html = posts_js[bt_start:i-1].strip()

print(f'Artigo: {title}')
print(f'Conteúdo: {len(content_html)} chars')

content_js   = content_html.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
title_safe   = title.replace("'", "\\'")
excerpt_safe = excerpt[:200].replace("'", "\\'")

r0 = requests.get(f'{BASE}/pages/68', auth=AUTH, params={'context': 'edit'})
current_raw = r0.json().get('content', {}).get('raw', '')
print(f'Page 68 raw atual: {len(current_raw)} chars')

if SLUG in current_raw:
    print('AVISO: Balzac já publicado. Abortando.')
    exit(0)

js_block = (
    "<!-- wp:html -->\n"
    "<script>\n"
    "(function() {\n"
    "  if (typeof POSTS === 'undefined') return;\n"
    "  POSTS.unshift({\n"
    f"    slug:     '{SLUG}',\n"
    "    title:    '" + title_safe + "',\n"
    "    tag:      '" + tag + "',\n"
    "    date:     '" + date_v + "',\n"
    "    excerpt:  '" + excerpt_safe + "',\n"
    "    thumb:    '" + IMG + "',\n"
    "    featured: false,\n"
    "    content:  `" + content_js + "`\n"
    "  });\n"
    "})();\n"
    "</script>\n"
    "<!-- /wp:html -->"
)

new_content = js_block + '\n' + current_raw

resp = requests.post(f'{BASE}/pages/68', auth=AUTH,
    json={'content': new_content, 'status': 'publish'})
print(f'\nPublicação: {resp.status_code}')
if resp.ok:
    print('Link:', resp.json().get('link', 'N/A'))
    print('✓ Balzac publicado no Proceder!')
else:
    print(resp.text[:300])
