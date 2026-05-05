#!/usr/bin/env python3
"""
publish-today.py - auto-publish today's scheduled blog articles.

Usage:
  python3 publish-today.py              # publish whatever is scheduled for today
  python3 publish-today.py 2026-05-07   # publish a specific date
  python3 publish-today.py --dry-run    # show what would happen without changing files

What it does:
  1. Removes the SCHEDULED <div hidden> wrappers around today's blog cards in blog.html
  2. Removes the SCHEDULED comment wrappers around today's URL entries in sitemap.xml
  3. Updates the lastmod date in sitemap entries to today
  4. Removes the noindex meta tag from each published article HTML file
  5. Re-adds the entries to the schema.org ItemList in blog.html

After running, commit + push:
  git add -A && git commit -m "Publish blog posts for $(date +%F)" && git push
"""
import re
import sys
from datetime import date
from pathlib import Path

REPO = Path(__file__).parent
DRY_RUN = '--dry-run' in sys.argv


def parse_target_date():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if args:
        return date.fromisoformat(args[0])
    return date.today()


def find_scheduled_slugs_for_date(target_date_str):
    html = (REPO / 'blog.html').read_text(encoding='utf-8')
    pattern = re.compile(
        r'<!-- SCHEDULED:' + re.escape(target_date_str) + r' -->\s*<div hidden data-scheduled="[^"]+">[\s\S]*?<a href="blog/([^"]+)\.html"',
    )
    return pattern.findall(html)


def publish_blog_card(slug, target_date_str):
    path = REPO / 'blog.html'
    html = path.read_text(encoding='utf-8')
    pattern = re.compile(
        r'\s*<!-- SCHEDULED:' + re.escape(target_date_str) + r' -->\s*<div hidden data-scheduled="[^"]+">\n([\s\S]*?<a href="blog/' + re.escape(slug) + r'\.html"[\s\S]*?</a>\n)\s*</div>\s*<!-- /SCHEDULED -->'
    )
    new = pattern.sub(lambda m: '\n' + m.group(1), html, count=1)
    if new == html:
        return False
    if not DRY_RUN:
        path.write_text(new, encoding='utf-8')
    return True


def publish_sitemap_entry(slug, target_date_str):
    path = REPO / 'sitemap.xml'
    xml = path.read_text(encoding='utf-8')
    pattern = re.compile(
        r'\n\s*<!-- SCHEDULED:' + re.escape(target_date_str) + r' -->\n\s*<!--([\s\S]*?<loc>https://www\.ilaaj\.ai/blog/' + re.escape(slug) + r'</loc>[\s\S]*?</url>\n)\s*-->\n\s*<!-- /SCHEDULED -->\n'
    )
    m = pattern.search(xml)
    if not m:
        return False
    block = m.group(1)
    block = re.sub(r'<lastmod>[^<]+</lastmod>', '<lastmod>' + target_date_str + '</lastmod>', block)
    new = pattern.sub('\n' + block, xml, count=1)
    if not DRY_RUN:
        path.write_text(new, encoding='utf-8')
    return True


def remove_noindex(slug):
    path = REPO / 'blog' / (slug + '.html')
    if not path.exists():
        return False
    html = path.read_text(encoding='utf-8')
    if 'data-scheduled="1"' not in html:
        return False
    new = html.replace(
        '<meta name="robots" content="noindex,follow" data-scheduled="1">',
        '<meta name="robots" content="index, follow">',
        1
    )
    if not DRY_RUN:
        path.write_text(new, encoding='utf-8')
    return True


def add_to_schema_itemlist(slugs):
    path = REPO / 'blog.html'
    html = path.read_text(encoding='utf-8')
    pattern = re.compile(
        r'("itemListElement":\s*\[)([\s\S]*?)(\]\s*\}\s*\}\s*</script>)'
    )
    m = pattern.search(html)
    if not m:
        return False
    existing = m.group(2)
    positions = re.findall(r'"position":\s*(\d+)', existing)
    next_pos = max(int(p) for p in positions) + 1 if positions else 1
    new_items = []
    for slug in slugs:
        new_items.append(
            '        {"@type": "ListItem", "position": ' + str(next_pos) + ', "url": "https://www.ilaaj.ai/blog/' + slug + '"}'
        )
        next_pos += 1
    new_existing = existing.rstrip().rstrip(',') + ',\n' + ',\n'.join(new_items) + '\n      '
    new = pattern.sub(lambda mm: mm.group(1) + new_existing + mm.group(3), html, count=1)
    if not DRY_RUN:
        path.write_text(new, encoding='utf-8')
    return True


def main():
    target = parse_target_date()
    target_str = target.isoformat()
    slugs = find_scheduled_slugs_for_date(target_str)

    if not slugs:
        print('Nothing scheduled for ' + target_str + '.')
        return

    print('Publishing for ' + target_str + ' (' + str(len(slugs)) + ' articles):')
    for s in slugs:
        print('  - ' + s)
    if DRY_RUN:
        print('\n(dry run - no files modified)')
        return

    for slug in slugs:
        ok_card = publish_blog_card(slug, target_str)
        ok_sitemap = publish_sitemap_entry(slug, target_str)
        ok_noindex = remove_noindex(slug)
        status = 'OK' if (ok_card and ok_sitemap and ok_noindex) else 'WARN'
        print('  [' + status + '] ' + slug + ': card=' + str(ok_card) + ' sitemap=' + str(ok_sitemap) + ' noindex_removed=' + str(ok_noindex))

    add_to_schema_itemlist(slugs)
    print('')
    print('Done. Commit + push:')
    cmd = '  git add -A && git commit -m "Publish blog posts for ' + target_str + '" && git push'
    print(cmd)


if __name__ == '__main__':
    main()
