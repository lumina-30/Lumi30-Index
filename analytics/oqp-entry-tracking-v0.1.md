# OQP Entry Tracking v0.1

Status: GO CANDIDATE / pending GoatCounter dashboard verification

This document defines tracking for LUMINA-30 One-Question Pilot X-card entry pages.

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

The entry pages load it with a version query to avoid stale browser or GitHub Pages cache:

```text
./assets/js/l30-analytics.js?v=20260705-goatcounter-v2
```

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

## GoatCounter event shape

The bridge sends OQP button clicks as GoatCounter events with paths shaped like:

```text
events/oqp_open/<entry_id>/<target>
```

Examples:

```text
events/oqp_open/oqp_x_standard_en/oqp
events/oqp_open/oqp_x_standard_ja/oqp_ja
events/oqp_open/oqp_x_claude_invader_en/oqp
```

Do not add a leading slash to GoatCounter event paths.

## Dashboard verification procedure

After deployment:

1. Open one or more live entry pages:
   - `https://lumina-30.github.io/Lumi30-Index/oqp-x.html?test=goatcounter-v2`
   - `https://lumina-30.github.io/Lumi30-Index/oqp-x-ja.html?test=goatcounter-v2`
   - `https://lumina-30.github.io/Lumi30-Index/oqp-x-claude.html?test=goatcounter-v2`
2. Wait about 10 seconds.
3. Click `Open One-Question Pilot` on each page.
4. Open the GoatCounter dashboard:
   - `https://lumina30.goatcounter.com`
5. Confirm pageviews appear.
6. Confirm event paths under `events/oqp_open/...` appear.

If nothing appears, check whether an ad blocker is blocking either:

```text
goatcounter.com
gc.zgo.at
```

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
