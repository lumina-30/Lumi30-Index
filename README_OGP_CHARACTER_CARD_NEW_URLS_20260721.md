# LUMINA-30 OGP Character Card New URL Pack (2026-07-21)

## Purpose

Create new permanent OGP HTML filenames to avoid X card cache contamination from the earlier failed HTML attempts.

## Strategy

- Keep the previously image-working HTML structure.
- Keep the existing JPG assets.
- Do not use `?v=...`.
- Change the HTML filenames permanently so X treats them as new URLs.
- Update canonical / og:url values to the new filenames.

## New OGP URLs after publish

- https://lumina-30.github.io/Lumi30-Index/oqp-card-chatgpt-red-ja.html
- https://lumina-30.github.io/Lumi30-Index/oqp-card-gemini-blue-ja.html
- https://lumina-30.github.io/Lumi30-Index/oqp-card-claude-orange-en.html
- https://lumina-30.github.io/Lumi30-Index/oqp-card-grok-emerald-en.html

## Included files

- oqp-card-chatgpt-red-ja.html
- oqp-card-gemini-blue-ja.html
- oqp-card-claude-orange-en.html
- oqp-card-grok-emerald-en.html
- OGP_CHARACTER_CARD_NEW_URLS_20260721.json

## Notes

- HTML only.
- Existing JPG assets are reused.
- Do not remove the old HTML immediately; leave it as historical failed/cached material unless a separate cleanup decision is made.
- Test one plain URL at a time in X.
