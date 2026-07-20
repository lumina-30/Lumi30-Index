# LUMINA-30 OGP Exact Working Clone Pack (2026-07-21)

## Purpose

Rebuild the 4 character-card OGP pages by cloning the actually working LUMINA-30 X-card HTML templates.

## Basis

- Japanese pages: cloned from `oqp-x-ja.html`
- English pages: cloned from `oqp-x.html`
- Image dimensions: 1536 × 807, matching the currently used successful LUMINA-30 OQP card size.

## Rule

Only the following are changed from the working template:

- page URL
- image URL
- title
- description
- alt text
- l30 entry/context IDs
- visible h1/lead text
- UTM content name

The HTML skeleton, meta order, CSS structure, body structure, and analytics script placement are preserved from the successful template.

## New URLs after publish

- https://lumina-30.github.io/Lumi30-Index/oqp-x-live-chatgpt-red-ja.html
- https://lumina-30.github.io/Lumi30-Index/oqp-x-live-gemini-blue-ja.html
- https://lumina-30.github.io/Lumi30-Index/oqp-x-live-claude-orange-en.html
- https://lumina-30.github.io/Lumi30-Index/oqp-x-live-grok-emerald-en.html

## Important

- Do not use `?v=...`.
- Test one URL at a time in X.
- Do not add these to the card inventory until X displays the large image card.
- Keep the old failed/cached names unused.
