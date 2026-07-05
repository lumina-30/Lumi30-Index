/*!
 * LUMINA-30 lightweight analytics bridge v0.2
 *
 * GO candidate status:
 * - GoatCounter provider code is configured for https://lumina30.goatcounter.com/count.
 * - Pageviews are handled by GoatCounter count.js.
 * - OQP button clicks are sent as GoatCounter events when goatcounter.count is available.
 * - Event paths intentionally do not start with "/" because GoatCounter event paths must not start with a slash.
 * - Final GO requires at least one verified pageview or click event in the GoatCounter dashboard.
 */
(function () {
  "use strict";

  var config = {
    version: "0.2",
    status: "go_candidate_pending_dashboard_verification",
    provider: "goatcounter",
    endpoint: "https://lumina30.goatcounter.com/count",
    scriptSrc: "https://gc.zgo.at/count.js",
    sendsNetworkRequests: true
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

  function encodeEventPath(detail) {
    var entryId = detail.entry_id || "unknown_entry";
    var target = detail.target || "unknown_target";
    return "events/oqp_open/" + encodeURIComponent(entryId) + "/" + encodeURIComponent(target);
  }

  function buildTitle(detail) {
    var title = "OQP open";
    if (detail.entry_id) {
      title += " | " + detail.entry_id;
    }
    if (detail.entry_context) {
      title += " | " + detail.entry_context;
    }
    return title;
  }

  function buildEvent(link) {
    var href = link.getAttribute("href") || "";
    return {
      event_name: link.getAttribute("data-l30-track") || "click",
      entry_id: link.getAttribute("data-l30-entry-id") || readMeta("l30:entry-id"),
      entry_context: link.getAttribute("data-l30-entry-context") || readMeta("l30:entry-context"),
      analytics_state: readMeta("l30:analytics-status") || "go_candidate_pending_dashboard_verification",
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

  function loadGoatCounter() {
    if (document.querySelector('script[data-l30-provider="goatcounter"]')) {
      return;
    }

    window.goatcounter = window.goatcounter || {};
    window.goatcounter.endpoint = config.endpoint;

    var script = document.createElement("script");
    script.async = true;
    script.src = config.scriptSrc;
    script.setAttribute("data-goatcounter", config.endpoint);
    script.setAttribute("data-l30-provider", "goatcounter");
    script.setAttribute("data-l30-analytics-status", config.status);
    document.head.appendChild(script);
  }

  function sendGoatCounterEvent(detail) {
    if (!window.goatcounter || typeof window.goatcounter.count !== "function") {
      if (debugEnabled() && window.console && typeof window.console.info === "function") {
        window.console.info("[L30 GoatCounter pending: count.js not ready]", detail);
      }
      return;
    }

    window.goatcounter.count({
      path: encodeEventPath(detail),
      title: buildTitle(detail),
      referrer: window.location.href,
      event: true
    });

    if (debugEnabled() && window.console && typeof window.console.info === "function") {
      window.console.info("[L30 GoatCounter event sent]", detail);
    }
  }

  function handleClick(event) {
    var link = event.target.closest ? event.target.closest("[data-l30-track]") : null;
    if (!link) {
      return;
    }

    var detail = buildEvent(link);

    window.dispatchEvent(new CustomEvent("l30:analytics-event", { detail: detail }));
    sendGoatCounterEvent(detail);
  }

  loadGoatCounter();
  document.addEventListener("click", handleClick, true);

  window.L30_ANALYTICS_BRIDGE = config;
})();
