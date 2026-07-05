# OQP Entry Tracking v0.1

Status: GO CANDIDATE / pending GoatCounter dashboard verification

This document defines tracking for LUMINA-30 One-Question Pilot X-card entry pages.

## Principle

表URLは短く、裏導線は細かく。

Xカードは見た目で止め、UTMはボタン先で測る。

UTMは名札、解析は記録装置。

名札だけで終わらせず、最初から記録装置も入れる。

## Provider

Provider:

```text
GoatCounter
```

Configured endpoint:

```text
https://lumina30.goatcounter.com/count
```

Provider script:

```text
https://gc.zgo.at/count.js
```

The provider code is centralized in:

```text
assets/js/l30-analytics.js
```

Do not scatter GoatCounter snippets across entry pages.

## Current status

This change is not final GO by code placement alone.

The correct status immediately after applying the code is:

```text
GO CANDIDATE
```

Final GO requires:

```text
- GoatCounter count.js loads on the live GitHub Pages entry pages.
- At least one pageview appears in the GoatCounter dashboard.
- At least one OQP button click event appears in the GoatCounter dashboard.
```

## Entry pages and UTM rules

| Entry page | Entry ID | Context | Button target |
|---|---|---|---|
| `oqp-x.html` | `oqp_x_standard_en` | `standard_oqp_x_card_en` | `./oqp.html?utm_source=x&utm_medium=social&utm_campaign=oqp_x_card&utm_content=standard_en` |
| `oqp-x-ja.html` | `oqp_x_standard_ja` | `standard_oqp_x_card_ja` | `./oqp-ja.html?utm_source=x&utm_medium=social&utm_campaign=oqp_x_card&utm_content=standard_ja` |
| `oqp-x-claude.html` | `oqp_x_claude_invader_en` | `claude_code_ai_agents_red_teaming` | `./oqp.html?utm_source=x&utm_medium=social&utm_campaign=oqp_x_card&utm_content=claude_invader_en&utm_term=claude_code_ai_agents_red_teaming` |

## Click attributes

Tracked links should include:

```html
data-l30-track="oqp_open"
data-l30-entry-id="..."
data-l30-entry-context="..."
data-l30-target="oqp"
```

These are already present on the current OQP X-card entry pages.

## GoatCounter event shape

The bridge sends OQP button clicks as GoatCounter events with paths shaped like:

```text
/events/oqp_open/<entry_id>/<target>
```

Examples:

```text
/events/oqp_open/oqp_x_standard_en/oqp
/events/oqp_open/oqp_x_standard_ja/oqp_ja
/events/oqp_open/oqp_x_claude_invader_en/oqp
```

The event title includes the entry ID and entry context.

## Dashboard verification procedure

After deployment:

1. Open one or more live entry pages:
   - `https://lumina-30.github.io/Lumi30-Index/oqp-x.html`
   - `https://lumina-30.github.io/Lumi30-Index/oqp-x-ja.html`
   - `https://lumina-30.github.io/Lumi30-Index/oqp-x-claude.html`
2. Click `Open One-Question Pilot` on each page.
3. Open the GoatCounter dashboard:
   - `https://lumina30.goatcounter.com`
4. Confirm pageviews appear.
5. Confirm event paths under `/events/oqp_open/...` appear.

If nothing appears, check whether an ad blocker is blocking either:

```text
goatcounter.com
gc.zgo.at
```

## Debug mode

For local browser sanity checks, run:

```javascript
localStorage.setItem("L30_ANALYTICS_DEBUG", "1")
```

Then click an instrumented OQP link. The console should show either:

```text
[L30 GoatCounter event sent]
```

or:

```text
[L30 GoatCounter pending: count.js not ready]
```

Debug mode is not the final evidence. Final evidence is the GoatCounter dashboard record.

## Do not do this

Do not commit unresolved analytics placeholders to production pages and call the work GO.

Do not use a sample analytics domain in production.

## Completion status

Current code status after applying this bundle:

```text
GO CANDIDATE
```

Final status becomes:

```text
GO
```

only after a real GoatCounter dashboard record is visible.
