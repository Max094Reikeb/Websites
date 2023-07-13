(function(e, t) {
    let o,
        i,
        a,
        r,
        c,
        l,
        d,
        u,
        n = e.amplitude || {
            _q: [],
            _iq: {}
        },
        s = t.createElement("script");
    s.type = "text/javascript",
        s.integrity = "sha384-u0hlTAJ1tNefeBKwiBNwB4CkHZ1ck4ajx/pKmwWtc+IufKJiCQZ+WjJIi+7C6Ntm",
        s.crossOrigin = "anonymous",
        s.async = !0,
        s.src = "https://cdn.amplitude.com/libs/amplitude-8.1.0-min.gz.js",
        s.onload = function() {
            e.amplitude.runQueuedFunctions || console.log("[Amplitude] Error: could not load SDK")
        },
        a = t.getElementsByTagName("script")[0],
        a.parentNode.insertBefore(s, a);
    function h(e, t) {
        e.prototype[t] = function() {
            return this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))), this
        }
    }
    r = function() {
        return this._q = [], this
    },
        c = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset", "preInsert", "postInsert", "remove"];
    for (o = 0; o < c.length; o++)
        h(r, c[o]);
    n.Identify = r,
        l = function() {
            return this._q = [], this
        },
        d = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
    for (i = 0; i < d.length; i++)
        h(l, d[i]);
    n.Revenue = l,
        u = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "enableTracking", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"];
    function m(e) {
        function n(t) {
            e[t] = function() {
                e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }
        for (var t = 0; t < u.length; t++)
            n(u[t])
    }
    m(n),
        n.getInstance = function(e) {
            return e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase(), Object.prototype.hasOwnProperty.call(n._iq, e) || (n._iq[e] = {
                _q: []
            }, m(n._iq[e])), n._iq[e]
        },
        e.amplitude = n
})(window, document);
function getReferrerHost() {
    try {
        return new URL(document.referrer).hostname
    } catch {
        return null
    }
}
amplitude.getInstance().init("1d6c62a471c2e4d71820bd631ad371ae"),
    amplitude.getInstance().logEvent("Pageview", {
        path: window.location.pathname,
        full_url: window.location.href,
        referrer: document.referrer,
        referrer_host: getReferrerHost()
    })