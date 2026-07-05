# OQP Entry Tracking v0.1

Status: PARTIAL GO

This document defines tracking preparation for LUMINA-30 One-Question Pilot X-card entry pages.

## Principle

表URLは短く、裏導線は細かく。

Xカードは見た目で止め、UTMはボタン先で測る。

UTMは名札、解析は記録装置。

名札だけで終わらせず、最初から記録装置も入れる。

## Current scope

This v0.1 change does the following:

1. Adds UTM parameters to the OQP button/link destinations on existing X-card entry pages.
2. Adds click-measurement attributes to those links.
3. Adds a central analytics bridge file at `assets/js/l30-analytics.js`.
4. Documents that measurement is not possible until a real analytics service is installed.
5. Avoids placeholder production snippets such as `placeholder service code`.

## Important limitation

UTM parameters alone do not store statistics.

`assets/js/l30-analytics.js` is currently a central insertion point and local event bridge only. It does not send events to any analytics provider.

Therefore, this change must not be judged as final GO.

The correct status is:

```text
PARTIAL GO
```

True GO requires:

```text
- A real analytics provider code is installed.
- No placeholder code such as placeholder service code remains.
- At least one test access / click is visible in the selected analytics dashboard.
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
data-l30-analytics-state="pending_service_selection"
```

These attributes are for future analytics instrumentation. They are not sufficient for real measurement by themselves.

## Central analytics bridge

File:

```text
assets/js/l30-analytics.js
```

Current behavior:

```text
- Listens for clicks on [data-l30-track]
- Builds a structured event object
- Dispatches a browser CustomEvent named l30:analytics-event
- Does not send network requests
- Logs only when L30_ANALYTICS_DEBUG is enabled
```

Debugging in browser console:

```javascript
localStorage.setItem("L30_ANALYTICS_DEBUG", "1")
```

Then click an instrumented OQP link. The console should show:

```text
[L30 analytics bridge: not sent]
```

This debug mode is not analytics. It is only a local sanity check.

## Future provider insertion

When a provider is chosen, update only:

```text
assets/js/l30-analytics.js
```

Do not scatter provider snippets across entry pages.

Candidate providers may include:

```text
- GoatCounter
- Plausible
- Umami
- Cloudflare Web Analytics
```

Provider selection is outside this v0.1 scope.

## Do not do this

Do not commit placeholder snippets like:

```text
placeholder service code
placeholder site ID
placeholder analytics domain
```

to production pages and call the work GO.

## Completion status

This v0.1 is complete only as preparation:

```text
PARTIAL GO
```

Final GO is allowed only after a real provider records a test event.
