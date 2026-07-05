/*!
 * LUMINA-30 lightweight analytics bridge v0.1
 *
 * PARTIAL GO status:
 * - This file is a central insertion point and click-event bridge only.
 * - It does not send pageviews, clicks, or UTM values to any external service yet.
 * - No GoatCounter / Plausible / Umami / Cloudflare / other production code is embedded here.
 * - True GO requires a real analytics service code and a verified test event in that service.
 */
(function () {
  "use strict";

  var config = {
    version: "0.1",
    status: "pending_service_selection",
    provider: "none",
    sendsNetworkRequests: false
  };

  function readMeta(name) {
    var node = document.querySelector('meta[name="' + name + '"]');
    return node ? node.getAttribute("content") || "" : "";
  }

  function parseUtm(href) {
    var result = {};
    try {
      var url = new URL(href, window.location.href);
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (key) {
        if (url.searchParams.has(key)) {
          result[key] = url.searchParams.get(key);
        }
      });
    } catch (error) {
      result.error = "invalid_url";
    }
    return result;
  }

  function buildEvent(link) {
    var href = link.getAttribute("href") || "";
    return {
      event_name: link.getAttribute("data-l30-track") || "click",
      entry_id: link.getAttribute("data-l30-entry-id") || readMeta("l30:entry-id"),
      entry_context: link.getAttribute("data-l30-entry-context") || readMeta("l30:entry-context"),
      analytics_state: link.getAttribute("data-l30-analytics-state") || readMeta("l30:analytics-status"),
      target: link.getAttribute("data-l30-target") || "",
      href: href,
      page_path: window.location.pathname,
      utm: parseUtm(href),
      bridge_status: config.status,
      provider: config.provider
    };
  }

  function debugEnabled() {
    try {
      return window.L30_ANALYTICS_DEBUG === true ||
        window.L30_ANALYTICS_DEBUG === "1" ||
        window.localStorage.getItem("L30_ANALYTICS_DEBUG") === "1";
    } catch (error) {
      return false;
    }
  }

  function handleClick(event) {
    var link = event.target.closest ? event.target.closest("[data-l30-track]") : null;
    if (!link) {
      return;
    }

    var detail = buildEvent(link);

    window.dispatchEvent(new CustomEvent("l30:analytics-event", { detail: detail }));

    if (debugEnabled() && window.console && typeof window.console.info === "function") {
      window.console.info("[L30 analytics bridge: not sent]", detail);
    }

    /*
     * Future real-service hook:
     * Replace this no-op area only after an analytics service is selected.
     * Do not leave placeholder IDs such as placeholder service code in production pages.
     */
  }

  document.addEventListener("click", handleClick, true);

  window.L30_ANALYTICS_BRIDGE = config;
})();
