! function(e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }, n.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "/163/frontend/share/", n(n.s = 3)
}([function(e, t, n) {
    "use strict";
    n.r(t);
    var o = function() {
        var e = document.documentElement.clientHeight,
            t = void 0;

        function n() {
            return [].slice.call(document.querySelectorAll("[data-echo]:not(.img-error):not(.img-loading)"))
        }

        function o() {
            document.removeEventListener("scroll", i, !1), document.addEventListener("scroll", i, {
                passive: !0
            });
            var e = document.body.scrollTop;
            t = n().map(function(t) {
                return {
                    el: t,
                    top: t.getBoundingClientRect().top + e
                }
            }).sort(function(e, t) {
                return e.top - t.top
            }), i()
        }

        function i() {
            for (var o = document.body.scrollTop || document.documentElement.scrollTop, a = 0, d = 0; d < t.length; d++) {
                var r = t[d].el;
                if (t[d].top >= o + 1.1 * e) {
                    a = d;
                    break
                }
                r && r.dataset.echo && s(r)
            }
            if (0 === (t = t.slice(a)).length) {
                var c = n();
                c ? t = c : document.removeEventListener("scroll", i, !1)
            }
        }

        function s(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {},
                o = e.dataset,
                i = o.echo,
                s = function(e) {
                    var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {},
                        i = new Image,
                        s = e.dataset,
                        a = s.echo,
                        d = s.alt,
                        r = s.background,
                        c = a,
                        l = (t = "transition", window.CSS && window.CSS.supports && CSS.supports(t) ? "transition" : "webkitTransition"),
                        p = i;
                    return r && (i.style.display = "none", p = e), p.style.opacity = 0, p.style[l] = "opacity .2s ease-in-out", i.src = c, i.alt = d || "", i.onload = function() {
                        n(i), p.style.opacity = 1, setTimeout(function() {
                            p.style[l] = "", p.style.opacity = ""
                        }, 200)
                    }, i.onerror = function() {
                        o && o(i)
                    }, i
                }(e, function(n) {
                    o.min && o.min >= n.naturalWidth && o.min >= n.naturalWidth ? e.style.display = "none" : (e.classList.add("img-loaded"), e.classList.remove("u-img-placeholder"), e.classList.remove("img-error"), e.classList.remove("img-loading"), e.dataset.echo = "", t(), e.dataset.background && (e.style.backgroundImage = "url(" + i + ")"))
                }, function(t) {
                    e.classList.add("img-error"), e.classList.remove("img-loading"), e && t && e.removeChild(t), e.dataset.retry && (e.dataset.text = "点击加载", e.addEventListener("click", a, !1)), n()
                });
            e.classList.contains("img-loading") || (e.classList.add("img-loading"), e.insertBefore(s, e.firstChild))
        }

        function a(e) {
            e.preventDefault(), e.stopImmediatePropagation();
            var t = e.target;
            t.dataset.text = "加载中", s(t, function() {
                t.dataset.text = "", t.dataset.retry = ""
            }, function() {
                t.dataset.text = "点击加载"
            }), t.removeEventListener("click", a, !1)
        }
        return {
            init: o,
            refresh: function() {
                o()
            }
        }
    }();
    n(2);
    var i = navigator.userAgent,
        s = D().search,
        a = !!i.match(/android/i),
        d = /android\s?2\./i.test(i),
        r = !!i.match(/ipad|ipod|iphone/i),
        c = r ? +i.match(/OS\s(\d*)/)[1] : 0,
        l = /MSIE/gi.test(i),
        p = !!i.match(/MicroMessenger/i),
        u = !!i.match(/QQ\//) || !!i.match(/Qzone/i),
        m = !!i.match(/MQQBrowser/i),
        w = !!i.match(/weibo/i),
        f = !!i.match(/yixin/i),
        h = r && !!i.match(/safari/i),
        v = !!i.match(/ucbrowser/i),
        g = !!i.match(/caipiao/i),
        y = a && "newsapp-lite" === s.spss,
        b = y ? "newsApp-lite" : "newsapp",
        T = "";
    u ? T = "qq" : p ? T = "wx" : f ? T = "yx" : w ? T = "wb" : s.spsp && (T = s.spsp);
    var S = y ? "com.netease.news.lite" : "com.netease.newsreader.activity",
        k = {
            androidDownloadUrl: "http://3g.163.com/links/7263",
            tencentMarket: "http://a.app.qq.com/o/simple.jsp?pkgname=" + S + "&ckey=CK1360677426225&android_schema=" + b + "://startup",
            appStoreLink: "https://itunes.apple.com/app/apple-store/id425349261?pt=104792803&ct=huiliu_9qq&mt=8"
        };
    h && (document.querySelector(".fixed-tip").style.display = "block"), r && p && document.body.classList.add("open-in-ios-wechat");
    var A = s.title;
    A && (document.body.classList.add("titled"), (A = decodeURIComponent(A)).length > 20 && (A = A.substring(0, 20), A += "..."), document.querySelector(".guide-title p").innerText = A), setTimeout(o.init, 100);
    var L = s.spsc || s.ss || s.s || D(document.referrer).search.spsc || "sps",
        x = "",
        E = {};

    function C() {
        var e, t, n;
        x = window.NTESAntAnalysis.info && window.NTESAntAnalysis.info.uid, E = {
            spsid: s.spsid,
            spsuuid: x,
            spsc: L,
            spspath: decodeURIComponent(s.path)
        }, s.redirect || (e = "//channel.m.163.com/data/d/iosTracking/" + L + "/click?callback=callback&nuid=" + x, t = function(e) {
            !1 === e && window.callback({})
        }, (n = document.createElement("script")).src = e, n.charset = "utf-8", n.onload = function() {
            n.onload = n.onerror = null, n.parentNode.removeChild(n), t && t(!0)
        }, n.onerror = function() {
            n.onload = n.onerror = null, n.parentNode.removeChild(n), t && t(!1)
        }, document.head.appendChild(n), window.callback = function(e) {
            window.callback = null;
            var t = e.channel || k;
            a && p && !t.tencentMarket ? document.body.classList.add("active") : (x = e.uuid || x, a && (j = p ? t.tencentMarket.replace("newsapp://startup", encodeURIComponent(_)).replace("com.netease.newsreader.activity", S) : t.androidDownloadUrl || k.androidDownloadUrl), r && (j = t.appStoreLink || k.appStoreLink, document.querySelector(".ios-wechat-tip a").href = t.appStoreLink || k.appStoreLink), l && (j = "http://3g.163.com/links/3614?s=" + L), d && (j = "http://3g.163.com/links/6264?s=" + L), !s.prevent && a && p && (window.location.href = j), [].slice.call(document.querySelectorAll(".button")).forEach(function(e) {
                e.dataset.href = j
            }), document.body.classList.add("active"))
        }), window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
            projectid: "NTM-CQNTS2VV-2",
            val_nm: "pageview",
            val_act: "pageview",
            info: E
        })
    }
    if (window.NTESAntAnalysis ? C() : window.addEventListener("NTMReady", function() {
            C()
        }), window.STATS = function(e) {
            var t = e.docid,
                n = e.sid,
                o = e.pid,
                i = e.vid,
                s = e.liveRoomid,
                a = e.url,
                d = e.subjectid,
                r = e.expertid,
                c = e.readerid,
                l = e.luoboid,
                m = e.bookid;
            if (e.path) {
                var h = decodeURIComponent(e.path).split("/"),
                    v = h[1],
                    g = h[2];
                "doc" === v && (t = g), "topic" === v && (n = g), "photo" === v && (o = g + "_" + h[3]), "video" === v && (i = g), "live" === v && (s = g), "web" === v && (a = decodeURIComponent(g)), "subject" === v && (d = g), "expert" === v && (r = g), "reader" === v && (c = g), "luobo" === v && (l = g), "book" === v && (m = g)
            }
            var y = 0;
            n && (y = 2), o && (y = 3), s && (y = 4), a && (y = 5), i && (y = 6), r && (y = 8), d && (y = 10), l && (y = 11);
            var b = "";
            return u && (b = "qq"), p && (b = "wx"), w && (b = "wb"), f && (b = "yx"), {
                spst: y,
                modelid: t || i || s || o || n || a || d || r || c || l || m || "",
                spsf: b,
                spss: L
            }
        }(s), s.redirect) {
        var N = decodeURIComponent(s.redirect);
        s.spss && !D(N).search.spss && (N += N.indexOf("?") >= 0 ? "&" : "?", N += "spss=" + s.spss), setTimeout(function() {
            var e = N;
            (e.match(/^\/\//) || e.match(/^http/)) && (window.location.href = e)
        }, 100)
    }
    var _ = I(s),
        q = function(e) {
            var t = "";
            return Object.keys(e).forEach(function(n) {
                0 === n.indexOf("sps") && -1 === ["spsc", "spss", "spsp"].indexOf(n) && (t += "&" + n + "=" + (e[n] || ""))
            }), t
        }(s);
    if (_ += _.indexOf("?") >= 0 ? "&" : "?", _ += "s=" + L + "&spsc=" + L + "&spsp=" + T + "&spss=" + (s.spss || "newsapp") + q, !s.prevent && a && M(a, _), document.body.classList.add(r ? "ios" : "android"), r) {
        var R = document.querySelector('[name="apple-itunes-app"]');
        R.setAttribute("content", R.getAttribute("content") + _)
    }
    r ? w ? document.body.classList.add("open-in-ios-weibo") : c < 9 && !h && !v && !g ? document.body.classList.add("open-in-ios-wechat") : p && document.body.classList.add("open-in-ios-wechat") : a && (w ? document.body.classList.add("open-in-android-weibo") : p ? document.body.classList.add("open-in-android-wechat") : f && document.body.classList.add("open-in-android-wechat"));
    var j = "";

    function I(e) {
        var t = b + "://",
            n = e.docid,
            o = e.sid,
            i = e.pid,
            s = e.vid,
            d = e.liveRoomid,
            r = e.url,
            c = e.subjectid,
            l = e.expertid,
            u = e.readerid,
            w = e.luoboid,
            f = e.postid;
        if (e.path) {
            var h = decodeURIComponent(e.path);
            return b + "://" + h.slice(1)
        }
        return n ? t + "doc/" + n : o ? t + "topic/" + o : i ? t + "photo/" + i.replace("_", "/") : s ? t + "video/" + s : d ? t + "live/" + d : r ? a && (p || m) ? t + "web/" + encodeURIComponent(r) : t + "web/" + r : l ? t + "expert/" + l : c ? t + "subject/" + c : u ? t + "reader/" + u : w ? t + "luobo/" + w.replace("_", "/") : f ? t + "tie/" + f : t + "startup"
    }

    function M(e, t) {
        e ? document.getElementById("iframe").src = t : window.location.href = t
    }
    var O = function(e) {
            window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                projectid: "NTM-CQNTS2VV-2",
                val_nm: "click",
                val_act: "click",
                info: E
            }), window.neteaseTracker && window.neteaseTracker(!1, "http://sps.163.com/func/?func=click&modelid=" + window.STATS.modelid + "&spst=" + window.STATS.spst + "&spsf=" + window.STATS.spsf + "&spss=" + window.STATS.spss, "", "sps"), r ? (M(!0, _), setTimeout(function() {
                window.location.href = e.dataset.href
            }, 200)) : a ? (M(!0, _), setTimeout(function() {
                window.NTESAntAnalysis && window.NTESAntAnalysis.sendData({
                    projectid: "NTM-CQNTS2VV-2",
                    val_nm: "download",
                    val_act: "download",
                    info: E
                }), window.neteaseTracker && window.neteaseTracker(!1, "http://sps.163.com/func/?func=download&modelid=" + window.STATS.modelid + "&spst=" + window.STATS.spst + "&spsf=" + window.STATS.spsf + "&spss=" + window.STATS.spss, "", "sps")
            }, 200), setTimeout(function() {
                window.location.href = e.dataset.href
            }, 1e3)) : l && (window.location.href = e.dataset.href)
        },
        U = new window.Clipboard(".js-download", {
            text: function() {
                var e = I(s);
                return e += e.indexOf("?") >= 0 ? "&" : "?", "网易 `{{" + (e += "s=CH_" + L) + "}}` !{{" + (Date.now() + 6e5) + "}}! ${{" + L + "}}$ ^{{" + x + "}}^ "
            }
        });

    function D() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.search,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.hash;

        function n(e, t) {
            if (e) {
                var n = {};
                return e.replace(t, function(e, t, o, i) {
                    n[t] = i
                }), n
            }
            return ""
        }
        return {
            search: n(e, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
            hash: n(t, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
        }
    }
    U.on("success", function(e) {
        O(e.trigger)
    }), U.on("error", function(e) {
        O(e.trigger)
    })
}, , function(e, t, n) {}, function(e, t, n) {
    e.exports = n(0)
}]);