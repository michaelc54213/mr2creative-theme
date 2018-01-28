jQuery(document).ready(function($){
/*slimscroll*/
(function(e) {
    e.fn.extend({
        slimScroll: function(f) {
            var a = e.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, f);
            this.each(function() {
                function v(d) {
                    if (r) {
                        d = d || window.event;
                        var c = 0;
                        d.wheelDelta && (c = -d.wheelDelta / 120);
                        d.detail && (c = d.detail / 3);
                        e(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && n(c, !0);
                        d.preventDefault && !k && d.preventDefault();
                        k || (d.returnValue = !1)
                    }
                }

                function n(d, e, f) {
                    k = !1;
                    var g = d,
                        h = b.outerHeight() - c.outerHeight();
                    e && (g = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), g = Math.min(Math.max(g, 0), h), g = 0 < d ? Math.ceil(g) : Math.floor(g), c.css({
                        top: g + "px"
                    }));
                    l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
                    g = l * (b[0].scrollHeight - b.outerHeight());
                    f && (g = d, d = g / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), h), c.css({
                        top: d + "px"
                    }));
                    b.scrollTop(g);
                    b.trigger("slimscrolling", ~~g);
                    w();
                    q()
                }

                function x() {
                    u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), 30);
                    c.css({
                        height: u + "px"
                    });
                    var a = u == b.outerHeight() ? "none" : "block";
                    c.css({
                        display: a
                    })
                }

                function w() {
                    x();
                    clearTimeout(B);
                    l == ~~l ? (k = a.allowPageScroll, C != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1;
                    C = l;
                    u >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && m.stop(!0, !0).fadeIn("fast"))
                }

                function q() {
                    a.alwaysVisible || (B = setTimeout(function() {
                        a.disableFadeOut && r || y || z || (c.fadeOut("slow"), m.fadeOut("slow"))
                    }, 1E3))
                }
                var r, y, z, B, A, u, l, C, k = !1,
                    b = e(this);
                if (b.parent().hasClass(a.wrapperClass)) {
                    var p = b.scrollTop(),
                        c = b.siblings("." + a.barClass),
                        m = b.siblings("." + a.railClass);
                    x();
                    if (e.isPlainObject(f)) {
                        if ("height" in f && "auto" == f.height) {
                            b.parent().css("height", "auto");
                            b.css("height", "auto");
                            var h = b.parent().parent().height();
                            b.parent().css("height",
                                h);
                            b.css("height", h)
                        } else "height" in f && (h = f.height, b.parent().css("height", h), b.css("height", h));
                        if ("scrollTo" in f) p = parseInt(a.scrollTo);
                        else if ("scrollBy" in f) p += parseInt(a.scrollBy);
                        else if ("destroy" in f) {
                            c.remove();
                            m.remove();
                            b.unwrap();
                            return
                        }
                        n(p, !1, !0)
                    }
                } else if (!(e.isPlainObject(f) && "destroy" in f)) {
                    a.height = "auto" == a.height ? b.parent().height() : a.height;
                    p = e("<div></div>").addClass(a.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    b.css({
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    var m = e("<div></div>").addClass(a.railClass).css({
                            width: a.size,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            display: a.alwaysVisible && a.railVisible ? "block" : "none",
                            "border-radius": a.railBorderRadius,
                            background: a.railColor,
                            opacity: a.railOpacity,
                            zIndex: 90
                        }),
                        c = e("<div></div>").addClass(a.barClass).css({
                            background: a.color,
                            width: a.size,
                            position: "absolute",
                            top: 0,
                            opacity: a.opacity,
                            display: a.alwaysVisible ? "block" : "none",
                            "border-radius": a.borderRadius,
                            BorderRadius: a.borderRadius,
                            MozBorderRadius: a.borderRadius,
                            WebkitBorderRadius: a.borderRadius,
                            zIndex: 99
                        }),
                        h = "right" == a.position ? {
                            right: a.distance
                        } : {
                            left: a.distance
                        };
                    m.css(h);
                    c.css(h);
                    b.wrap(p);
                    b.parent().append(c);
                    b.parent().append(m);
                    a.railDraggable && c.bind("mousedown", function(a) {
                        var b = e(document);
                        z = !0;
                        t = parseFloat(c.css("top"));
                        pageY = a.pageY;
                        b.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY;
                            c.css("top", currTop);
                            n(0, c.position().top, !1)
                        });
                        b.bind("mouseup.slimscroll", function(a) {
                            z = !1;
                            q();
                            b.unbind(".slimscroll")
                        });
                        return !1
                    }).bind("selectstart.slimscroll",
                        function(a) {
                            a.stopPropagation();
                            a.preventDefault();
                            return !1
                        });
                    m.hover(function() {
                        w()
                    }, function() {
                        q()
                    });
                    c.hover(function() {
                        y = !0
                    }, function() {
                        y = !1
                    });
                    b.hover(function() {
                        r = !0;
                        w();
                        q()
                    }, function() {
                        r = !1;
                        q()
                    });
                    b.bind("touchstart", function(a, b) {
                        a.originalEvent.touches.length && (A = a.originalEvent.touches[0].pageY)
                    });
                    b.bind("touchmove", function(b) {
                        k || b.originalEvent.preventDefault();
                        b.originalEvent.touches.length && (n((A - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), A = b.originalEvent.touches[0].pageY)
                    });
                    x();
                    "bottom" === a.start ? (c.css({
                        top: b.outerHeight() - c.outerHeight()
                    }), n(0, !0)) : "top" !== a.start && (n(e(a.start).position().top, null, !0), a.alwaysVisible || c.hide());
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", v, !1), this.addEventListener("mousewheel", v, !1)) : document.attachEvent("onmousewheel", v)
                }
            });
            return this
        }
    });
    e.fn.extend({
        slimscroll: e.fn.slimScroll
    })
})(jQuery);
/*video*/
! function(t, o, e) {
    "use strict";

    function i(i) {
        t(o).height(), t(e).height()
    }

    function n(o) {
        t(o.controlbox).append(o.settings.preloadHtml), o.settings.preloadCallback && o.settings.preloadCallback.call(o)
    }

    function s(o) {
        var e, i = o.find("video").get(0);
        e = o.settings.controlPosition ? t(o.settings.controlPosition).find(".video-background-play a") : o.find(".video-background-play a"), i.paused ? (i.play(), e.toggleClass("icon-pause icon-play").text(o.settings.controlText[1])) : i.ended ? (i.play(), e.toggleClass("icon-pause icon-play").text(o.settings.controlText[1])) : (i.pause(), e.toggleClass("icon-pause icon-play").text(o.settings.controlText[0]))
    }

    function a(o) {
        var e, i = o.find("video").get(0);
        e = o.settings.controlPosition ? t(o.settings.controlPosition).find(".video-background-mute a") : o.find(".video-background-mute a"), 0 === i.volume ? (i.volume = 1, e.toggleClass("icon-volume-on icon-volume-off").text(o.settings.controlText[2])) : (i.volume = 0, e.toggleClass("icon-volume-on icon-volume-off").text(o.settings.controlText[3]))
    }

    function l(o) {
        o.settings.resize && t(e).on("resize", function() {
            i(o)
        }), o.controls.find(".video-background-play a").on("click", function(t) {
            t.preventDefault(), s(o)
        }), o.controls.find(".video-background-mute a").on("click", function(t) {
            t.preventDefault(), a(o)
        }), o.settings.loop && o.find("video").on("ended", function() {
            t(this).get(0).play(), t(this).toggleClass("paused").text(o.settings.controlText[1])
        })
    }

    function d(o) {
        t(o.controlbox).html(o.controls), l(o), o.settings.loadedCallback && o.settings.loadedCallback.call(o)
    }
    var c = {
        init: function(e) {
            return this.each(function() {
                var s, a, l = t(this),
                    c = "",
                    r = "",
                    u = l.data("video-options");
                o.createElement("video").canPlayType ? (l.settings = t.extend(!0, {}, t.fn.videobackground.defaults, u, e), l.settings.initialised || (l.settings.initialised = !0, l.settings.resize && i(l), t.each(l.settings.videoSource, function() {
                    a = "[object Array]" === Object.prototype.toString.call(this), c = a && void 0 !== this[1] ? c + '<source src="' + this[0] + '" type="' + this[1] + '">' : a ? c + '<source src="' + this[0] + '">' : c + '<source src="' + this + '">'
                }), r = r + 'preload="' + l.settings.preload + '"', l.settings.poster && (r = r + ' poster="' + l.settings.poster + '"'), l.settings.autoplay && (r += ' autoplay="autoplay"'), l.settings.loop && (r += ' loop="loop"'), l.settings.muted && (r += ' muted="muted"'), t(l).html("<video " + r + ">" + c + "</video>"), l.controlbox = t('<div class="video-background widget widget-content corner-all"></div>'), l.settings.controlPosition ? t(l.settings.controlPosition).append(l.controlbox) : t(l).append(l.controlbox), l.controls = t('<ul class="video-background-controls"><li class="video-background-play"><a class="icon icon-pause" href="#">' + l.settings.controlText[1] + '</a></li><li class="video-background-mute"><a class="icon icon-volume-on" href="#">' + l.settings.controlText[2] + "</a></li></ul>"), l.settings.preloadHtml || l.settings.preloadCallback ? (n(l), l.find("video").on("canplaythrough", function() {
                    l.settings.autoplay && l.find("video").get(0).play(), d(l)
                })) : l.find("video").on("canplaythrough", function() {
                    l.settings.autoplay && l.find("video").get(0).play(), d(l)
                }), l.data("video-options", l.settings))) : (l.settings = t.extend(!0, {}, t.fn.videobackground.defaults, u, e), l.settings.initialised || (l.settings.initialised = !0, l.settings.poster && (s = t('<img class="video-background-poster" src="' + l.settings.poster + '">'), l.append(s)), l.data("video-options", l.settings)))
            })
        },
        play: function(o) {
            return this.each(function() {
                var e = t(this),
                    i = e.data("video-options");
                e.settings = t.extend(!0, {}, i, o), e.settings.initialised && (s(e), e.data("video-options", e.settings))
            })
        },
        mute: function(o) {
            return this.each(function() {
                var e = t(this),
                    i = e.data("video-options");
                e.settings = t.extend(!0, {}, i, o), e.settings.initialised && (a(e), e.data("video-options", e.settings))
            })
        },
        resize: function(o) {
            return this.each(function() {
                var e = t(this),
                    n = e.data("video-options");
                e.settings = t.extend(!0, {}, n, o), e.settings.initialised && (i(e), e.data("video-options", e.settings))
            })
        },
        destroy: function(i) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("video-options");
                n.settings = t.extend(!0, {}, s, i), n.settings.initialised && (n.settings.initialised = !1, o.createElement("video").canPlayType ? (n.find("video").off("ended"), n.settings.controlPosition ? (t(n.settings.controlPosition).find(".video-background-mute a").off("click"), t(n.settings.controlPosition).find(".video-background-play a").off("click")) : (n.find(".video-background-mute a").off("click"), n.find(".video-background-play a").off("click")), t(e).off("resize"), n.find("video").off("canplaythrough"), n.settings.controlPosition ? t(n.settings.controlPosition).find(".video-background").remove() : n.find(".video-background").remove(), t("video", n).remove()) : n.settings.poster && n.find(".video-background-poster").remove(), n.removeData("video-options"))
            })
        }
    };
    t.fn.videobackground = function(o) {
        return this.length ? c[o] ? c[o].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof o && o ? void t.error("Method " + o + " does not exist on jQuery.videobackground") : c.init.apply(this, arguments) : this
    }, t.fn.videobackground.defaults = {
        videoSource: [],
        poster: null,
        autoplay: !0,
        preload: "auto",
        loop: !0,
        controlPosition: null,
        controlText: ["Play", "Pause", "Mute", "Unmute"],
        resize: !0,
        preloadHtml: "",
        preloadCallback: null,
        loadedCallback: null,
        resizeTo: "document"
    }
}(jQuery, document, window);
/* script */
var scrollBar, video_bg;
video_bg = function() {
    var e;
    return e = $(window).width(), $(".main__media").prepend('<div class="main__video"></div>'), $(".main__video").videobackground({
        videoSource: [
            ["video/video.mp4", "video/mp4"],
            ["video/video.webm", "video/webm"],
            ["video/video.ogv", "video/ogg"]
        ],
        poster: "",
        controlText: ["", "", "", ""]
    })
}, $(document).on("ready", function() {
    return $(".main__media").length ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? $(".main__media").prepend('<div class="main__bg-img"></div>') : video_bg() : void 0
}), $(document).on("ready", function() {
    var e;
    return $(".main__content.swiper-container").length ? (e = new Swiper(".swiper-container", {
        pagination: ".swiper-pagination",
        slideActiveClass: "swiper-slide-active main-slider__item--active",
        direction: "vertical",
        slidesPerView: 1,
        paginationClickable: !0,
        mousewheelControl: !0,
        spaceBetween: 0,
        effect: "fade",
        loop: !0,
        autoplay: 6e3
    }), $(window).on("mousewheel", function() {
        return e.startAutoplay()
    })) : void 0
}), $(document).on("ready", function() {
    return $(".skill").length ? setTimeout(function() {
        return $(".skill").addClass("skill--active")
    }, 300) : void 0
}), $(document).on("ready", function() {
    return $(".frame").addClass("frame--active")
}), $(document).on("ready", function() {
    return $(".main").length ? $(".main").addClass("main--active") : void 0
}), $(document).on("ready", function() {
    return $(".about").length ? setTimeout(function() {
        return $(".about").addClass("about--active")
    }, 300) : void 0
}), $(document).on("ready", function() {
    return $(".contact").length ? setTimeout(function() {
        return $(".contact").addClass("contact--active")
    }, 300) : void 0
}), $(document).on("ready", function() {
    return $(".js-menu-btn").on("click", function(e) {
        var i, l;
        return $(".js-menu-btn").hasClass("js-menu-btn--active") ? ($(".js-menu--visible").delay(1300).fadeOut(400), $(".js-menu").removeClass("js-menu--visible"), $(".js-menu-btn").removeClass("js-menu-btn--active"), setTimeout(function() {
            return $(".main__content").removeClass("main__content--hidden")
        }, 1300), $(this).css({
            "pointer-events": "none"
        }), setTimeout(function() {
            return $(".js-menu-btn").css({
                "pointer-events": "auto"
            })
        }, 1600), $("#fullpage").length && $.fn.fullpage.setAllowScrolling(!0)) : ($(this).addClass("js-menu-btn--active"), $(".js-menu").addClass("js-menu--visible").fadeIn(400), l = $(window).height(), i = $(".menu__body").height(), $(window).width() > 400 ? $(".menu__empty").height((l - i) / 2) : ($(".menu__empty--top").height(44), $(".menu__empty--bottom").height(l - i - 44)), $(".main__content").addClass("main__content--hidden"), $("#fullpage").length && $.fn.fullpage.setAllowScrolling(!1), $(this).css({
            "pointer-events": "none"
        }), setTimeout(function() {
            return $(".js-menu-btn--active").css({
                "pointer-events": "auto"
            })
        }, 1600)), $(".menu").toggleClass("menu--visible")
    })
}), $(document).on("ready", function() {
    return $("#fullpage").length ? $("#fullpage").fullpage({
        scrollOverflow: !0,
        navigation: !0,
        onLeave: function(e, i, l) {
            var t;
            return t = $(this), 1 === e && "down" === l ? $(".about__team").addClass("about__team--active") : void 0
        },
        afterLoad: function(e, i) {
            return i > 0 ? $("#fake-frame").remove() : void 0
        }
    }) : void 0
}), scrollBar = function() {
    return ($(window).width() < 769 || $(window).height() < 451) && $(".skill__content").slimScroll({
        size: "0px",
        height: "auto"
    }), $(".menu__list-holder, .contact__wrapper").slimScroll({
        size: "0px",
        height: "auto"
    })
}, $(document).on("ready", function() {
    return scrollBar()
}), $(window).bind("resize", scrollBar), $(".skill__circle-nav--prev").on("click", function() {
    return $(".skill__circle-holder").hasClass("skill__circle-holder--2") && $(".skill__item.skill__item--1").click(), $(".skill__circle-holder").hasClass("skill__circle-holder--3") ? $(".skill__item.skill__item--2").click() : void 0
}), $(".skill__circle-nav--next").on("click", function() {
    return $(".skill__circle-holder").hasClass("skill__circle-holder--2") && $(".skill__item.skill__item--3").click(), $(".skill__circle-holder").hasClass("skill__circle-holder--1") ? $(".skill__item.skill__item--2").click() : void 0
}), $(".skill__item").on("click", function() {
    var e, i;
    return $(".skill__item").removeClass("skill__item--active"), $(this).addClass("skill__item--active"), $(".skill__info").removeClass("skill__info--active"), i = $(this).attr("data-info"), $("." + i).addClass("skill__info--active"), e = $(this).attr("data-circle"), $(".skill__circle-holder").removeClass("skill__circle-holder--1 skill__circle-holder--2 skill__circle-holder--3"), $(".skill__circle-holder").addClass(e)
}), $(window).width() < 1920 && $(".skill__item").on("click", function() {
    return $(".skill__item--1").hasClass("skill__item--active") && $(".skill__item--2").hide().delay(400).fadeIn(600).css({
        left: "70%"
    }), $(".skill__item--3").hasClass("skill__item--active") ? $(".skill__item--2").hide().delay(400).fadeIn(600).css({
        left: "30%"
    }) : void 0
}), $(window).width() >= 1920 && $(".skill__item").on("click", function() {
    return $(".skill__item--1").hasClass("skill__item--active") && $(".skill__item--2").hide().delay(400).fadeIn(600).css({
        left: "60%"
    }), $(".skill__item--3").hasClass("skill__item--active") ? $(".skill__item--2").hide().delay(400).fadeIn(600).css({
        left: "40%"
    }) : void 0
});
/*swiper.min.js*/
! function() {
    "use strict";

    function e(e) {
        e.fn.swiper = function(a) {
            var r;
            return e(this).each(function() {
                var e = new t(this, a);
                r || (r = e)
            }), r
        }
    }
    var a, t = function(e, i) {
        function s(e) {
            return Math.floor(e)
        }

        function n() {
            b.autoplayTimeoutId = setTimeout(function() {
                b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
            }, b.params.autoplay)
        }

        function o(e, t) {
            var r = a(e.target);
            if (!r.is(t))
                if ("string" == typeof t) r = r.parents(t);
                else if (t.nodeType) {
                var i;
                return r.parents().each(function(e, a) {
                    a === t && (i = t)
                }), i ? t : void 0
            }
            if (0 !== r.length) return r[0]
        }

        function l(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                r = new t(function(e) {
                    e.forEach(function(e) {
                        b.onResize(!0), b.emit("onObserverUpdate", b, e)
                    })
                });
            r.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), b.observers.push(r)
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a)) return !1;
            if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length) return;
                    var r = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        },
                        i = window.innerWidth,
                        s = window.innerHeight,
                        n = b.container.offset();
                    b.rtl && (n.left = n.left - b.container[0].scrollLeft);
                    for (var o = [
                            [n.left, n.top],
                            [n.left + b.width, n.top],
                            [n.left, n.top + b.height],
                            [n.left + b.width, n.top + b.height]
                        ], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= r.left && p[0] <= r.left + i && p[1] >= r.top && p[1] <= r.top + s && (t = !0)
                    }
                    if (!t) return
                }
                b.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev())
            }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = b.mousewheel.event,
                t = 0,
                r = b.rtl ? -1 : 1;
            if ("mousewheel" === a)
                if (b.params.mousewheelForceToAxis)
                    if (b.isHorizontal()) {
                        if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                        t = e.wheelDeltaX * r
                    } else {
                        if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                        t = e.wheelDeltaY
                    } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY;
            else if ("DOMMouseScroll" === a) t = -e.detail;
            else if ("wheel" === a)
                if (b.params.mousewheelForceToAxis)
                    if (b.isHorizontal()) {
                        if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                        t = -e.deltaX * r
                    } else {
                        if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                        t = -e.deltaY
                    } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;
            if (0 !== t) {
                if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
                    var i = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity,
                        s = b.isBeginning,
                        n = b.isEnd;
                    if (i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function() {
                            b.slideReset()
                        }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === i || i === b.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60)
                        if (0 > t)
                            if (b.isEnd && !b.params.loop || b.animating) {
                                if (b.params.mousewheelReleaseOnEdges) return !0
                            } else b.slideNext();
                    else if (b.isBeginning && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges) return !0
                    } else b.slidePrev();
                    b.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function u(e, t) {
            e = a(e);
            var r, i, s, n = b.rtl ? -1 : 1;
            r = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : b.isHorizontal() ? (i = r, s = "0") : (s = r, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + i + ", " + s + ",0px)")
        }

        function c(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof t)) return new t(e, i);
        var m = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                autoplayStopOnLast: !1,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                flip: {
                    slideShadows: !0,
                    limitRotation: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                hashnav: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                uniqueNavElements: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slidePrevClass: "swiper-slide-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationCurrentClass: "swiper-pagination-current",
                paginationTotalClass: "swiper-pagination-total",
                paginationHiddenClass: "swiper-pagination-hidden",
                paginationProgressbarClass: "swiper-pagination-progressbar",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
            h = i && i.virtualTranslate;
        i = i || {};
        var f = {};
        for (var g in i)
            if ("object" != typeof i[g] || null === i[g] || (i[g].nodeType || i[g] === window || i[g] === document || "undefined" != typeof r && i[g] instanceof r || "undefined" != typeof jQuery && i[g] instanceof jQuery)) f[g] = i[g];
            else {
                f[g] = {};
                for (var v in i[g]) f[g][v] = i[g][v]
            }
        for (var w in m)
            if ("undefined" == typeof i[w]) i[w] = m[w];
            else if ("object" == typeof i[w])
            for (var y in m[w]) "undefined" == typeof i[w][y] && (i[w][y] = m[w][y]);
        var b = this;
        if (b.params = i, b.originalParams = f, b.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function() {
                if (!b.params.breakpoints) return !1;
                var e, a = !1,
                    t = [];
                for (e in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function(e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var r = 0; r < t.length; r++) e = t[r], e >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, b.setBreakpoint = function() {
                var e = b.getActiveBreakpoint();
                if (e && b.currentBreakpoint !== e) {
                    var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                        t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;
                    for (var r in a) b.params[r] = a[r];
                    b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0)
                }
            }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
            if (b.container.length > 1) {
                var x = [];
                return b.container.each(function() {
                    x.push(new t(this, i))
                }), x
            }
            b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), ("fade" === b.params.effect || "flip" === b.params.effect) && (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof h && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function() {
                return "horizontal" === b.params.direction
            }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function() {
                b.params.allowSwipeToNext = !1
            }, b.lockSwipeToPrev = function() {
                b.params.allowSwipeToPrev = !1
            }, b.lockSwipes = function() {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1
            }, b.unlockSwipeToNext = function() {
                b.params.allowSwipeToNext = !0
            }, b.unlockSwipeToPrev = function() {
                b.params.allowSwipeToPrev = !0
            }, b.unlockSwipes = function() {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0
            }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function(e, a, t, r, i) {
                function s() {
                    i && i()
                }
                var n;
                e.complete && r ? s() : a ? (n = new window.Image, n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s()
            }, b.preloadImages = function() {
                function e() {
                    "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                }
                b.imagesToLoad = b.container.find("img");
                for (var a = 0; a < b.imagesToLoad.length; a++) b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), !0, e)
            }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function() {
                return "undefined" != typeof b.autoplayTimeoutId ? !1 : b.params.autoplay ? b.autoplaying ? !1 : (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n()) : !1
            }, b.stopAutoplay = function(e) {
                b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
            }, b.pauseAutoplay = function(e) {
                b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function() {
                    b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay())
                }))
            }, b.minTranslate = function() {
                return -b.snapGrid[0]
            }, b.maxTranslate = function() {
                return -b.snapGrid[b.snapGrid.length - 1]
            }, b.updateAutoHeight = function() {
                var e = b.slides.eq(b.activeIndex)[0];
                if ("undefined" != typeof e) {
                    var a = e.offsetHeight;
                    a && b.wrapper.css("height", a + "px")
                }
            }, b.updateContainerSize = function() {
                var e, a;
                e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height)
            }, b.updateSlidesSize = function() {
                b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                var e, a = b.params.spaceBetween,
                    t = -b.params.slidesOffsetBefore,
                    r = 0,
                    i = 0;
                if ("undefined" != typeof b.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : b.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var n;
                    b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));
                    var o, l = b.params.slidesPerColumn,
                        p = n / l,
                        d = p - (b.params.slidesPerColumn * p - b.slides.length);
                    for (e = 0; e < b.slides.length; e++) {
                        o = 0;
                        var u = b.slides.eq(e);
                        if (b.params.slidesPerColumn > 1) {
                            var c, m, h;
                            "column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
                                "-webkit-box-ordinal-group": c,
                                "-moz-box-ordinal-group": c,
                                "-ms-flex-order": c,
                                "-webkit-order": c,
                                order: c
                            })) : (h = Math.floor(e / p), m = e - h * p), u.css({
                                "margin-top": 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px"
                            }).attr("data-swiper-column", m).attr("data-swiper-row", h)
                        }
                        "none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + r / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, r = o, i++)
                    }
                    b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                    var f;
                    if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({
                            width: b.virtualSize + b.params.spaceBetween + "px"
                        }), (!b.support.flexbox || b.params.setWrapperSize) && (b.isHorizontal() ? b.wrapper.css({
                            width: b.virtualSize + b.params.spaceBetween + "px"
                        }) : b.wrapper.css({
                            height: b.virtualSize + b.params.spaceBetween + "px"
                        })), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({
                            width: b.virtualSize + b.params.spaceBetween + "px"
                        }), b.params.centeredSlides)) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
                        b.snapGrid = f
                    }
                    if (!b.params.centeredSlides) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
                        b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
                    }
                    0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({
                        marginLeft: a + "px"
                    }) : b.slides.css({
                        marginRight: a + "px"
                    }) : b.slides.css({
                        marginBottom: a + "px"
                    })), b.params.watchSlidesProgress && b.updateSlidesOffset()
                }
            }, b.updateSlidesOffset = function() {
                for (var e = 0; e < b.slides.length; e++) b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
            }, b.updateSlidesProgress = function(e) {
                if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
                    "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                    var a = -e;
                    b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);
                    for (var t = 0; t < b.slides.length; t++) {
                        var r = b.slides[t],
                            i = (a - r.swiperSlideOffset) / (r.swiperSlideSize + b.params.spaceBetween);
                        if (b.params.watchSlidesVisibility) {
                            var s = -(a - r.swiperSlideOffset),
                                n = s + b.slidesSizesGrid[t],
                                o = s >= 0 && s < b.size || n > 0 && n <= b.size || 0 >= s && n >= b.size;
                            o && b.slides.eq(t).addClass(b.params.slideVisibleClass)
                        }
                        r.progress = b.rtl ? -i : i
                    }
                }
            }, b.updateProgress = function(e) {
                "undefined" == typeof e && (e = b.translate || 0);
                var a = b.maxTranslate() - b.minTranslate(),
                    t = b.isBeginning,
                    r = b.isEnd;
                0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !r && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
            }, b.updateActiveIndex = function() {
                var e, a, t, r = b.rtl ? b.translate : -b.translate;
                for (a = 0; a < b.slidesGrid.length; a++) "undefined" != typeof b.slidesGrid[a + 1] ? r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] && (e = a + 1) : r >= b.slidesGrid[a] && (e = a);
                (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses())
            }, b.updateClasses = function() {
                b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);
                var e = b.slides.eq(b.activeIndex);
                e.addClass(b.params.slideActiveClass);
                var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                b.params.loop && 0 === t.length && b.slides.eq(0).addClass(b.params.slideNextClass);
                var r = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                if (b.params.loop && 0 === r.length && b.slides.eq(-1).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
                    var i, s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                    if (b.params.loop ? (i = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), i > b.slides.length - 1 - 2 * b.loopedSlides && (i -= b.slides.length - 2 * b.loopedSlides), i > s - 1 && (i -= s), 0 > i && "bullets" !== b.params.paginationType && (i = s + i)) : i = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function() {
                            a(this).index() === i && a(this).addClass(b.params.bulletActiveClass)
                        }) : b.bullets.eq(i).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(i + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
                        var n = (i + 1) / s,
                            o = n,
                            l = 1;
                        b.isHorizontal() || (l = n, o = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(b.params.speed)
                    }
                    "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, i + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                }
                b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
            }, b.updatePagination = function() {
                if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === b.params.paginationType) {
                        for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; a > t; t++) e += b.params.paginationBulletRender ? b.params.paginationBulletRender(t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                        b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                    }
                    "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                }
            }, b.update = function(e) {
                function a() {
                    r = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(r), b.updateActiveIndex(), b.updateClasses()
                }
                if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
                    var t, r;
                    b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a())
                } else b.params.autoHeight && b.updateAutoHeight()
            }, b.onResize = function(e) {
                b.params.breakpoints && b.setBreakpoint();
                var a = b.params.allowSwipeToPrev,
                    t = b.params.allowSwipeToNext;
                b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                var r = !1;
                if (b.params.freeMode) {
                    var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
                } else b.updateClasses(), r = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                b.params.lazyLoading && !r && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t
            };
            var T = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = {
                start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0],
                move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1],
                end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function(e) {
                var a = e ? "off" : "on",
                    t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                    s = b.support.touch ? r : document,
                    n = b.params.nested ? !0 : !1;
                b.browser.ie ? (r[t](b.touchEvents.start, b.onTouchStart, !1), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (r[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1)), !i.simulateTouch || b.device.ios || b.device.android || (r[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1))), window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && r[t]("click", b.preventClicks, !0)
            }, b.attachEvents = function() {
                b.initEvents()
            }, b.detachEvents = function() {
                b.initEvents(!0)
            }, b.allowClick = !0, b.preventClicks = function(e) {
                b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, b.onClickNext = function(e) {
                e.preventDefault(), (!b.isEnd || b.params.loop) && b.slideNext()
            }, b.onClickPrev = function(e) {
                e.preventDefault(), (!b.isBeginning || b.params.loop) && b.slidePrev()
            }, b.onClickIndex = function(e) {
                e.preventDefault();
                var t = a(this).index() * b.params.slidesPerGroup;
                b.params.loop && (t += b.loopedSlides), b.slideTo(t)
            }, b.updateClickedSlide = function(e) {
                var t = o(e, "." + b.params.slideClass),
                    r = !1;
                if (t)
                    for (var i = 0; i < b.slides.length; i++) b.slides[i] === t && (r = !0);
                if (!t || !r) return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
                if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                    var s, n = b.clickedIndex;
                    if (b.params.loop) {
                        if (b.animating) return;
                        s = a(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? n < b.loopedSlides - b.params.slidesPerView / 2 || n > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n) : n > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n)
                    } else b.slideTo(n)
                }
            };
            var S, C, z, M, E, P, k, I, L, B, D = "input, select, textarea, button",
                H = Date.now(),
                A = [];
            b.animating = !1, b.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var G, O;
            if (b.onTouchStart = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
                        if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass)) return void(b.allowClick = !0);
                        if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
                            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                r = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
                                if (S = !0, C = !1, z = !0, E = void 0, O = void 0, b.touches.startX = t, b.touches.startY = r, M = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                                    var i = !0;
                                    a(e.target).is(D) && (i = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), i && e.preventDefault()
                                }
                                b.emit("onTouchStart", b, e)
                            }
                        }
                    }
                }, b.onTouchMove = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (b.params.onlyExternal) return b.allowClick = !1, void(S && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, M = Date.now()));
                        if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return C = !0, void(b.allowClick = !1);
                        if (z && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof E) {
                                var t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;
                                E = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle
                            }
                            if (E && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof O && b.browser.ieTouch && (b.touches.currentX !== b.touches.startX || b.touches.currentY !== b.touches.startY) && (O = !0), S) {
                                if (E) return void(S = !1);
                                if (O || !b.browser.ieTouch) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), C || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), C = !0;
                                    var r = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    r *= b.params.touchRatio, b.rtl && (r = -r), b.swipeDirection = r > 0 ? "prev" : "next", P = r + k;
                                    var s = !0;
                                    if (r > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + r, b.params.resistanceRatio))) : 0 > r && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - r, b.params.resistanceRatio))),
                                        s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && k > P && (P = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > k && (P = k), b.params.followFinger) {
                                        if (b.params.threshold > 0) {
                                            if (!(Math.abs(r) > b.params.threshold || I)) return void(P = k);
                                            if (!I) return I = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
                                        }(b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === A.length && A.push({
                                            position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                            time: M
                                        }), A.push({
                                            position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), b.updateProgress(P), b.setWrapperTranslate(P)
                                    }
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), z && b.emit("onTouchEnd", b, e), z = !1, S) {
                        b.params.grabCursor && C && S && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");
                        var t = Date.now(),
                            r = t - M;
                        if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), 300 > r && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function() {
                                b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
                            }, 300)), 300 > r && 300 > t - H && (L && clearTimeout(L), b.emit("onDoubleTap", b, e))), H = Date.now(), setTimeout(function() {
                                b && (b.allowClick = !0)
                            }, 0), !S || !C || !b.swipeDirection || 0 === b.touches.diff || P === k) return void(S = C = !1);
                        S = C = !1;
                        var i;
                        if (i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
                            if (i < -b.minTranslate()) return void b.slideTo(b.activeIndex);
                            if (i > -b.maxTranslate()) return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
                            if (b.params.freeModeMomentum) {
                                if (A.length > 1) {
                                    var s = A.pop(),
                                        n = A.pop(),
                                        o = s.position - n.position,
                                        l = s.time - n.time;
                                    b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (b.velocity = 0)
                                } else b.velocity = 0;
                                A.length = 0;
                                var p = 1e3 * b.params.freeModeMomentumRatio,
                                    d = b.velocity * p,
                                    u = b.translate + d;
                                b.rtl && (u = -u);
                                var c, m = !1,
                                    h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate();
                                else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate();
                                else if (b.params.freeModeSticky) {
                                    var f, g = 0;
                                    for (g = 0; g < b.snapGrid.length; g += 1)
                                        if (b.snapGrid[g] > -u) {
                                            f = g;
                                            break
                                        }
                                    u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u)
                                }
                                if (0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity);
                                else if (b.params.freeModeSticky) return void b.slideReset();
                                b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function() {
                                    b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function() {
                                        b && b.onTransitionEnd()
                                    }))
                                })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
                                    b && b.onTransitionEnd()
                                }))) : b.updateProgress(u), b.updateActiveIndex()
                            }
                            return void((!b.params.freeModeMomentum || r >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
                        }
                        var v, w = 0,
                            y = b.slidesSizesGrid[0];
                        for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) "undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        var x = (i - b.slidesGrid[w]) / y;
                        if (r > b.params.longSwipesMs) {
                            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w))
                        } else {
                            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w)
                        }
                    }
                }, b._slideTo = function(e, a) {
                    return b.slideTo(e, a, !0, !0)
                }, b.slideTo = function(e, a, t, r) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var i = -b.snapGrid[b.snapIndex];
                    b.params.autoplay && b.autoplaying && (r || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i);
                    for (var s = 0; s < b.slidesGrid.length; s++) - Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
                    return !b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate() ? !1 : !b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
                        b && b.onTransitionEnd(t)
                    }))), !0))
                }, b.onTransitionStart = function(e) {
                    "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
                }, b.onTransitionEnd = function(e) {
                    b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash()
                }, b.slideNext = function(e, a, t) {
                    if (b.params.loop) {
                        if (b.animating) return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
                    }
                    return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
                }, b._slideNext = function(e) {
                    return b.slideNext(!0, e, !0)
                }, b.slidePrev = function(e, a, t) {
                    if (b.params.loop) {
                        if (b.animating) return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex - 1, a, e, t)
                    }
                    return b.slideTo(b.activeIndex - 1, a, e, t)
                }, b._slidePrev = function(e) {
                    return b.slidePrev(!0, e, !0)
                }, b.slideReset = function(e, a, t) {
                    return b.slideTo(b.activeIndex, a, e)
                }, b.setWrapperTransition = function(e, a) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e)
                }, b.setWrapperTranslate = function(e, a, t) {
                    var r = 0,
                        i = 0,
                        n = 0;
                    b.isHorizontal() ? r = b.rtl ? -e : e : i = e, b.params.roundLengths && (r = s(r), i = s(i)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + r + "px, " + i + "px, " + n + "px)") : b.wrapper.transform("translate(" + r + "px, " + i + "px)")), b.translate = b.isHorizontal() ? r : i;
                    var o, l = b.maxTranslate() - b.minTranslate();
                    o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate)
                }, b.getTranslate = function(e, a) {
                    var t, r, i, s;
                    return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function(e) {
                        return e.replace(",", ".")
                    }).join(", ")), s = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? s.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ? s.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && r && (r = -r), r || 0)
                }, b.getWrapperTranslate = function(e) {
                    return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
                }, b.observers = [], b.initObservers = function() {
                    if (b.params.observeParents)
                        for (var e = b.container.parents(), a = 0; a < e.length; a++) l(e[a]);
                    l(b.container[0], {
                        childList: !1
                    }), l(b.wrapper[0], {
                        attributes: !1
                    })
                }, b.disconnectObservers = function() {
                    for (var e = 0; e < b.observers.length; e++) b.observers[e].disconnect();
                    b.observers = []
                }, b.createLoop = function() {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var e = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);
                    var t, r = [],
                        i = [];
                    for (e.each(function(t, s) {
                            var n = a(this);
                            t < b.loopedSlides && i.push(s), t < e.length && t >= e.length - b.loopedSlides && r.push(s), n.attr("data-swiper-slide-index", t)
                        }), t = 0; t < i.length; t++) b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    for (t = r.length - 1; t >= 0; t--) b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
                }, b.destroyLoop = function() {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
                }, b.reLoop = function(e) {
                    var a = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1)
                }, b.fixLoop = function() {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
                }, b.appendSlide = function(e) {
                    if (b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)
                        for (var a = 0; a < e.length; a++) e[a] && b.wrapper.append(e[a]);
                    else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
                }, b.prependSlide = function(e) {
                    b.params.loop && b.destroyLoop();
                    var a = b.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) e[t] && b.wrapper.prepend(e[t]);
                        a = b.activeIndex + e.length
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1)
                }, b.removeSlide = function(e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var a, t = b.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++) a = e[r], b.slides[a] && b.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, b.slides[a] && b.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1)
                }, b.removeAllSlides = function() {
                    for (var e = [], a = 0; a < b.slides.length; a++) e.push(a);
                    b.removeSlide(e)
                }, b.effects = {
                    fade: {
                        setTranslate: function() {
                            for (var e = 0; e < b.slides.length; e++) {
                                var a = b.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    r = -t;
                                b.params.virtualTranslate || (r -= b.translate);
                                var i = 0;
                                b.isHorizontal() || (i = r, r = 0);
                                var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({
                                    opacity: s
                                }).transform("translate3d(" + r + "px, " + i + "px, 0px)")
                            }
                        },
                        setTransition: function(e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                b.slides.transitionEnd(function() {
                                    if (!a && b) {
                                        a = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) b.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    flip: {
                        setTranslate: function() {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e),
                                    r = t[0].progress;
                                b.params.flip.limitRotation && (r = Math.max(Math.min(t[0].progress, 1), -1));
                                var i = t[0].swiperSlideOffset,
                                    s = -180 * r,
                                    n = s,
                                    o = 0,
                                    l = -i,
                                    p = 0;
                                if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(r)) + b.slides.length, b.params.flip.slideShadows) {
                                    var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                        u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                    0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0))
                                }
                                t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                            }
                        },
                        setTransition: function(e) {
                            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function() {
                                    if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
                                        t = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], r = 0; r < e.length; r++) b.wrapper.trigger(e[r])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function() {
                            var e, t = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({
                                height: b.width + "px"
                            })) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));
                            for (var r = 0; r < b.slides.length; r++) {
                                var i = b.slides.eq(r),
                                    s = 90 * r,
                                    n = Math.floor(s / 360);
                                b.rtl && (s = -s, n = Math.floor(-s / 360));
                                var o = Math.max(Math.min(i[0].progress, 1), -1),
                                    l = 0,
                                    p = 0,
                                    d = 0;
                                r % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (r - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (r - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (r - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);
                                var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                                if (1 >= o && o > -1 && (t = 90 * r + 90 * o, b.rtl && (t = 90 * -r - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
                                    var c = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                        m = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                                }
                            }
                            if (b.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + b.size / 2 + "px"
                                }), b.params.cube.shadow)
                                if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");
                                else {
                                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                        g = b.params.cube.shadowScale,
                                        v = b.params.cube.shadowScale / f,
                                        w = b.params.cube.shadowOffset;
                                    e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
                                }
                            var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)")
                        },
                        setTransition: function(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, r = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, s = 0, n = b.slides.length; n > s; s++) {
                                var o = b.slides.eq(s),
                                    l = b.slidesSizesGrid[s],
                                    p = o[0].swiperSlideOffset,
                                    d = (t - p - l / 2) / l * b.params.coverflow.modifier,
                                    u = b.isHorizontal() ? r * d : 0,
                                    c = b.isHorizontal() ? 0 : r * d,
                                    m = -i * Math.abs(d),
                                    h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
                                    f = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;
                                Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                                var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                                if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
                                    var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                        w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                                }
                            }
                            if (b.browser.ie) {
                                var y = b.wrapper[0].style;
                                y.perspectiveOrigin = t + "px 50%"
                            }
                        },
                        setTransition: function(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
                            var r = b.slides.eq(e),
                                i = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || (i = i.add(r[0])), 0 !== i.length && i.each(function() {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var i = e.attr("data-background"),
                                    s = e.attr("data-src"),
                                    n = e.attr("data-srcset");
                                b.loadImage(e[0], s || i, n, !1, function() {
                                    if (i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && t) {
                                        var a = r.attr("data-swiper-slide-index");
                                        if (r.hasClass(b.params.slideDuplicateClass)) {
                                            var o = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                            b.lazy.loadImageInSlide(o.index(), !1)
                                        } else {
                                            var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            b.lazy.loadImageInSlide(l.index(), !1)
                                        }
                                    }
                                    b.emit("onLazyImageReady", b, r[0], e[0])
                                }), b.emit("onLazyImageLoad", b, r[0], e[0])
                            })
                        }
                    },
                    load: function() {
                        var e;
                        if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function() {
                            b.lazy.loadImageInSlide(a(this).index())
                        });
                        else if (b.params.slidesPerView > 1)
                            for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
                        else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext)
                            if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
                                var t = b.params.lazyLoadingInPrevNextAmount,
                                    r = b.params.slidesPerView,
                                    i = Math.min(b.activeIndex + r + Math.max(t, r), b.slides.length),
                                    s = Math.max(b.activeIndex - Math.max(r, t), 0);
                                for (e = b.activeIndex + b.params.slidesPerView; i > e; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
                                for (e = s; e < b.activeIndex; e++) b.slides[e] && b.lazy.loadImageInSlide(e)
                            } else {
                                var n = b.wrapper.children("." + b.params.slideNextClass);
                                n.length > 0 && b.lazy.loadImageInSlide(n.index());
                                var o = b.wrapper.children("." + b.params.slidePrevClass);
                                o.length > 0 && b.lazy.loadImageInSlide(o.index())
                            }
                    },
                    onTransitionStart: function() {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                    },
                    onTransitionEnd: function() {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                    }
                }, b.scrollbar = {
                    isTouched: !1,
                    setDragPosition: function(e) {
                        var a = b.scrollbar,
                            t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            r = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                            i = -b.minTranslate() * a.moveDivider,
                            s = -b.maxTranslate() * a.moveDivider;
                        i > r ? r = i : r > s && (r = s), r = -r / a.moveDivider, b.updateProgress(r), b.setWrapperTranslate(r, !0)
                    },
                    dragStart: function(e) {
                        var a = b.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b)
                    },
                    dragMove: function(e) {
                        var a = b.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b))
                    },
                    dragEnd: function(e) {
                        var a = b.scrollbar;
                        a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() {
                            a.track.css("opacity", 0), a.track.transition(400)
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                    },
                    enableDraggable: function() {
                        var e = b.scrollbar,
                            t = b.support.touch ? e.track : document;
                        a(e.track).on(b.touchEvents.start, e.dragStart), a(t).on(b.touchEvents.move, e.dragMove), a(t).on(b.touchEvents.end, e.dragEnd)
                    },
                    disableDraggable: function() {
                        var e = b.scrollbar,
                            t = b.support.touch ? e.track : document;
                        a(e.track).off(b.touchEvents.start, e.dragStart), a(t).off(b.touchEvents.move, e.dragMove), a(t).off(b.touchEvents.end, e.dragEnd)
                    },
                    set: function() {
                        if (b.params.scrollbar) {
                            var e = b.scrollbar;
                            e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function() {
                        if (b.params.scrollbar) {
                            var e, a = b.scrollbar,
                                t = (b.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function(e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e)
                    }
                }, b.controller = {
                    LinearSpline: function(e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, r;
                        this.x.length;
                        this.interpolate = function(e) {
                            return e ? (r = i(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0
                        };
                        var i = function() {
                            var e, a, t;
                            return function(r, i) {
                                for (a = -1, e = r.length; e - a > 1;) r[t = e + a >> 1] <= i ? a = t : e = t;
                                return e
                            }
                        }()
                    },
                    getInterpolateFunction: function(e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
                    },
                    setTranslate: function(e, a) {
                        function r(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, b), a.updateActiveIndex()
                        }
                        var i, s, n = b.params.control;
                        if (b.isArray(n))
                            for (var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && r(n[o]);
                        else n instanceof t && a !== n && r(n)
                    },
                    setTransition: function(e, a) {
                        function r(a) {
                            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                                s && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }
                        var i, s = b.params.control;
                        if (b.isArray(s))
                            for (i = 0; i < s.length; i++) s[i] !== a && s[i] instanceof t && r(s[i]);
                        else s instanceof t && a !== s && r(s)
                    }
                }, b.hashnav = {
                    init: function() {
                        if (b.params.hashnav) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var a = 0, t = 0, r = b.slides.length; r > t; t++) {
                                    var i = b.slides.eq(t),
                                        s = i.attr("data-hash");
                                    if (s === e && !i.hasClass(b.params.slideDuplicateClass)) {
                                        var n = i.index();
                                        b.slideTo(n, a, b.params.runCallbacksOnInit, !0)
                                    }
                                }
                        }
                    },
                    setHash: function() {
                        b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "")
                    }
                }, b.disableKeyboardControl = function() {
                    b.params.keyboardControl = !1, a(document).off("keydown", p)
                }, b.enableKeyboardControl = function() {
                    b.params.keyboardControl = !0, a(document).on("keydown", p)
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, b.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), b.mousewheel.event = "wheel"
                } catch (N) {
                    (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) && (b.mousewheel.event = "wheel")
                }!b.mousewheel.event && window.WheelEvent, b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll")
            }
            b.disableMousewheelControl = function() {
                return b.mousewheel.event ? (b.container.off(b.mousewheel.event, d), !0) : !1
            }, b.enableMousewheelControl = function() {
                return b.mousewheel.event ? (b.container.on(b.mousewheel.event, d), !0) : !1
            }, b.parallax = {
                setTranslate: function() {
                    b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        u(this, b.progress)
                    }), b.slides.each(function() {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, a)
                        })
                    })
                },
                setTransition: function(e) {
                    "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = a(this),
                            r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (r = 0), t.transition(r)
                    })
                }
            }, b._plugins = [];
            for (var R in b.plugins) {
                var W = b.plugins[R](b, b.params[R]);
                W && b._plugins.push(W)
            }
            return b.callPlugins = function(e) {
                for (var a = 0; a < b._plugins.length; a++) e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.emitterEventListeners = {}, b.emit = function(e) {
                b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (b.emitterEventListeners[e])
                    for (a = 0; a < b.emitterEventListeners[e].length; a++) b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.on = function(e, a) {
                return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b
            }, b.off = function(e, a) {
                var t;
                if (e = c(e), "undefined" == typeof a) return b.emitterEventListeners[e] = [], b;
                if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                    for (t = 0; t < b.emitterEventListeners[e].length; t++) b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
                    return b
                }
            }, b.once = function(e, a) {
                e = c(e);
                var t = function() {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t)
                };
                return b.on(e, t), b
            }, b.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function(e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function(e) {
                    13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click())
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = b.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function() {
                    b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion)
                },
                initPagination: function() {
                    b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function() {
                        var e = a(this);
                        b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function() {
                    b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
                }
            }, b.init = function() {
                b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(),
                    b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
            }, b.cleanupStyles = function() {
                b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
            }, b.destroy = function(e, a) {
                b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null)
            }, b.init(), b
        }
    };
    t.prototype = {
        isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function() {
            var e = navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                i = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: t || i || r,
                android: a
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                    if (a[t] in e) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var r = (function() {
            var e = function(e) {
                    var a = this,
                        t = 0;
                    for (t = 0; t < e.length; t++) a[t] = e[t];
                    return a.length = e.length, this
                },
                a = function(a, t) {
                    var r = [],
                        i = 0;
                    if (a && !t && a instanceof e) return a;
                    if (a)
                        if ("string" == typeof a) {
                            var s, n, o = a.trim();
                            if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                                var l = "div";
                                for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, i = 0; i < n.childNodes.length; i++) r.push(n.childNodes[i])
                            } else
                                for (s = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], i = 0; i < s.length; i++) s[i] && r.push(s[i])
                        } else if (a.nodeType || a === window || a === document) r.push(a);
                    else if (a.length > 0 && a[0].nodeType)
                        for (i = 0; i < a.length; i++) r.push(a[i]);
                    return new e(r)
                };
            return e.prototype = {
                addClass: function(e) {
                    if ("undefined" == typeof e) return this;
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var r = 0; r < this.length; r++) this[r].classList.add(a[t]);
                    return this
                },
                removeClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var r = 0; r < this.length; r++) this[r].classList.remove(a[t]);
                    return this
                },
                hasClass: function(e) {
                    return this[0] ? this[0].classList.contains(e) : !1
                },
                toggleClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var r = 0; r < this.length; r++) this[r].classList.toggle(a[t]);
                    return this
                },
                attr: function(e, a) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (var t = 0; t < this.length; t++)
                        if (2 === arguments.length) this[t].setAttribute(e, a);
                        else
                            for (var r in e) this[t][r] = e[r], this[t].setAttribute(r, e[r]);
                    return this
                },
                removeAttr: function(e) {
                    for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
                    return this
                },
                data: function(e, a) {
                    if ("undefined" != typeof a) {
                        for (var t = 0; t < this.length; t++) {
                            var r = this[t];
                            r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a
                        }
                        return this
                    }
                    if (this[0]) {
                        var i = this[0].getAttribute("data-" + e);
                        return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                    }
                },
                transform: function(e) {
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                    }
                    return this
                },
                transition: function(e) {
                    "string" != typeof e && (e += "ms");
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
                    }
                    return this
                },
                on: function(e, t, r, i) {
                    function s(e) {
                        var i = e.target;
                        if (a(i).is(t)) r.call(i, e);
                        else
                            for (var s = a(i).parents(), n = 0; n < s.length; n++) a(s[n]).is(t) && r.call(s[n], e)
                    }
                    var n, o, l = e.split(" ");
                    for (n = 0; n < this.length; n++)
                        if ("function" == typeof t || t === !1)
                            for ("function" == typeof t && (r = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], r, i);
                        else
                            for (o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                                listener: r,
                                liveListener: s
                            }), this[n].addEventListener(l[o], s, i);
                    return this
                },
                off: function(e, a, t, r) {
                    for (var i = e.split(" "), s = 0; s < i.length; s++)
                        for (var n = 0; n < this.length; n++)
                            if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(i[s], t, r);
                            else if (this[n].dom7LiveListeners)
                        for (var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[s], this[n].dom7LiveListeners[o].liveListener, r);
                    return this
                },
                once: function(e, a, t, r) {
                    function i(n) {
                        t(n), s.off(e, a, i, r)
                    }
                    var s = this;
                    "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), s.on(e, a, i, r)
                },
                trigger: function(e, a) {
                    for (var t = 0; t < this.length; t++) {
                        var r;
                        try {
                            r = new window.CustomEvent(e, {
                                detail: a,
                                bubbles: !0,
                                cancelable: !0
                            })
                        } catch (i) {
                            r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a
                        }
                        this[t].dispatchEvent(r)
                    }
                    return this
                },
                transitionEnd: function(e) {
                    function a(s) {
                        if (s.target === this)
                            for (e.call(this, s), t = 0; t < r.length; t++) i.off(r[t], a)
                    }
                    var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                        i = this;
                    if (e)
                        for (t = 0; t < r.length; t++) i.on(r[t], a);
                    return this
                },
                width: function() {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                },
                outerWidth: function(e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                },
                height: function() {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                },
                outerHeight: function(e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                },
                offset: function() {
                    if (this.length > 0) {
                        var e = this[0],
                            a = e.getBoundingClientRect(),
                            t = document.body,
                            r = e.clientTop || t.clientTop || 0,
                            i = e.clientLeft || t.clientLeft || 0,
                            s = window.pageYOffset || e.scrollTop,
                            n = window.pageXOffset || e.scrollLeft;
                        return {
                            top: a.top + s - r,
                            left: a.left + n - i
                        }
                    }
                    return null
                },
                css: function(e, a) {
                    var t;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (t = 0; t < this.length; t++)
                                for (var r in e) this[t].style[r] = e[r];
                            return this
                        }
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (t = 0; t < this.length; t++) this[t].style[e] = a;
                        return this
                    }
                    return this
                },
                each: function(e) {
                    for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
                    return this
                },
                html: function(e) {
                    if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
                    for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
                    return this
                },
                text: function(e) {
                    if ("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;
                    for (var a = 0; a < this.length; a++) this[a].textContent = e;
                    return this
                },
                is: function(t) {
                    if (!this[0]) return !1;
                    var r, i;
                    if ("string" == typeof t) {
                        var s = this[0];
                        if (s === document) return t === document;
                        if (s === window) return t === window;
                        if (s.matches) return s.matches(t);
                        if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);
                        if (s.mozMatchesSelector) return s.mozMatchesSelector(t);
                        if (s.msMatchesSelector) return s.msMatchesSelector(t);
                        for (r = a(t), i = 0; i < r.length; i++)
                            if (r[i] === this[0]) return !0;
                        return !1
                    }
                    if (t === document) return this[0] === document;
                    if (t === window) return this[0] === window;
                    if (t.nodeType || t instanceof e) {
                        for (r = t.nodeType ? [t] : t, i = 0; i < r.length; i++)
                            if (r[i] === this[0]) return !0;
                        return !1
                    }
                    return !1
                },
                index: function() {
                    if (this[0]) {
                        for (var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
                        return a
                    }
                },
                eq: function(a) {
                    if ("undefined" == typeof a) return this;
                    var t, r = this.length;
                    return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
                },
                append: function(a) {
                    var t, r;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof a) {
                            var i = document.createElement("div");
                            for (i.innerHTML = a; i.firstChild;) this[t].appendChild(i.firstChild)
                        } else if (a instanceof e)
                        for (r = 0; r < a.length; r++) this[t].appendChild(a[r]);
                    else this[t].appendChild(a);
                    return this
                },
                prepend: function(a) {
                    var t, r;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof a) {
                            var i = document.createElement("div");
                            for (i.innerHTML = a, r = i.childNodes.length - 1; r >= 0; r--) this[t].insertBefore(i.childNodes[r], this[t].childNodes[0])
                        } else if (a instanceof e)
                        for (r = 0; r < a.length; r++) this[t].insertBefore(a[r], this[t].childNodes[0]);
                    else this[t].insertBefore(a, this[t].childNodes[0]);
                    return this
                },
                insertBefore: function(e) {
                    for (var t = a(e), r = 0; r < this.length; r++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]);
                        else if (t.length > 1)
                        for (var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i])
                },
                insertAfter: function(e) {
                    for (var t = a(e), r = 0; r < this.length; r++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling);
                        else if (t.length > 1)
                        for (var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i].nextSibling)
                },
                next: function(t) {
                    return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
                },
                nextAll: function(t) {
                    var r = [],
                        i = this[0];
                    if (!i) return new e([]);
                    for (; i.nextElementSibling;) {
                        var s = i.nextElementSibling;
                        t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                    }
                    return new e(r)
                },
                prev: function(t) {
                    return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
                },
                prevAll: function(t) {
                    var r = [],
                        i = this[0];
                    if (!i) return new e([]);
                    for (; i.previousElementSibling;) {
                        var s = i.previousElementSibling;
                        t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                    }
                    return new e(r)
                },
                parent: function(e) {
                    for (var t = [], r = 0; r < this.length; r++) e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
                    return a(a.unique(t))
                },
                parents: function(e) {
                    for (var t = [], r = 0; r < this.length; r++)
                        for (var i = this[r].parentNode; i;) e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
                    return a(a.unique(t))
                },
                find: function(a) {
                    for (var t = [], r = 0; r < this.length; r++)
                        for (var i = this[r].querySelectorAll(a), s = 0; s < i.length; s++) t.push(i[s]);
                    return new e(t)
                },
                children: function(t) {
                    for (var r = [], i = 0; i < this.length; i++)
                        for (var s = this[i].childNodes, n = 0; n < s.length; n++) t ? 1 === s[n].nodeType && a(s[n]).is(t) && r.push(s[n]) : 1 === s[n].nodeType && r.push(s[n]);
                    return new e(a.unique(r))
                },
                remove: function() {
                    for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                },
                add: function() {
                    var e, t, r = this;
                    for (e = 0; e < arguments.length; e++) {
                        var i = a(arguments[e]);
                        for (t = 0; t < i.length; t++) r[r.length] = i[t], r.length++
                    }
                    return r
                }
            }, a.fn = e.prototype, a.unique = function(e) {
                for (var a = [], t = 0; t < e.length; t++) - 1 === a.indexOf(e[t]) && a.push(e[t]);
                return a
            }, a
        }()), i = ["jQuery", "Zepto", "Dom7"], s = 0; s < i.length; s++) window[i[s]] && e(window[i[s]]);
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function(e) {
        function a(s) {
            if (s.target === this)
                for (e.call(this, s), t = 0; t < r.length; t++) i.off(r[t], a)
        }
        var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            i = this;
        if (e)
            for (t = 0; t < r.length; t++) i.on(r[t], a);
        return this
    }), "transform" in n.fn || (n.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in n.fn || (n.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
});
//# sourceMappingURL=maps/swiper.min.js.map
/* swiper.jquery.min.js */
! function() {
    "use strict";

    function e(e) {
        e.fn.swiper = function(a) {
            var s;
            return e(this).each(function() {
                var e = new t(this, a);
                s || (s = e)
            }), s
        }
    }
    var a, t = function(e, s) {
        function r(e) {
            return Math.floor(e)
        }

        function i() {
            y.autoplayTimeoutId = setTimeout(function() {
                y.params.loop ? (y.fixLoop(), y._slideNext(), y.emit("onAutoplay", y)) : y.isEnd ? s.autoplayStopOnLast ? y.stopAutoplay() : (y._slideTo(0), y.emit("onAutoplay", y)) : (y._slideNext(), y.emit("onAutoplay", y))
            }, y.params.autoplay)
        }

        function n(e, t) {
            var s = a(e.target);
            if (!s.is(t))
                if ("string" == typeof t) s = s.parents(t);
                else if (t.nodeType) {
                var r;
                return s.parents().each(function(e, a) {
                    a === t && (r = t)
                }), r ? t : void 0
            }
            if (0 !== s.length) return s[0]
        }

        function o(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                s = new t(function(e) {
                    e.forEach(function(e) {
                        y.onResize(!0), y.emit("onObserverUpdate", y, e)
                    })
                });
            s.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), y.observers.push(s)
        }

        function l(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!y.params.allowSwipeToNext && (y.isHorizontal() && 39 === a || !y.isHorizontal() && 40 === a)) return !1;
            if (!y.params.allowSwipeToPrev && (y.isHorizontal() && 37 === a || !y.isHorizontal() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (y.container.parents(".swiper-slide").length > 0 && 0 === y.container.parents(".swiper-slide-active").length) return;
                    var s = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        },
                        r = window.innerWidth,
                        i = window.innerHeight,
                        n = y.container.offset();
                    y.rtl && (n.left = n.left - y.container[0].scrollLeft);
                    for (var o = [
                            [n.left, n.top],
                            [n.left + y.width, n.top],
                            [n.left, n.top + y.height],
                            [n.left + y.width, n.top + y.height]
                        ], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= s.left && p[0] <= s.left + r && p[1] >= s.top && p[1] <= s.top + i && (t = !0)
                    }
                    if (!t) return
                }
                y.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !y.rtl || 37 === a && y.rtl) && y.slideNext(), (37 === a && !y.rtl || 39 === a && y.rtl) && y.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && y.slideNext(), 38 === a && y.slidePrev())
            }
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = y.mousewheel.event,
                t = 0,
                s = y.rtl ? -1 : 1;
            if ("mousewheel" === a)
                if (y.params.mousewheelForceToAxis)
                    if (y.isHorizontal()) {
                        if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                        t = e.wheelDeltaX * s
                    } else {
                        if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                        t = e.wheelDeltaY
                    } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * s : -e.wheelDeltaY;
            else if ("DOMMouseScroll" === a) t = -e.detail;
            else if ("wheel" === a)
                if (y.params.mousewheelForceToAxis)
                    if (y.isHorizontal()) {
                        if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                        t = -e.deltaX * s
                    } else {
                        if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                        t = -e.deltaY
                    } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * s : -e.deltaY;
            if (0 !== t) {
                if (y.params.mousewheelInvert && (t = -t), y.params.freeMode) {
                    var r = y.getWrapperTranslate() + t * y.params.mousewheelSensitivity,
                        i = y.isBeginning,
                        n = y.isEnd;
                    if (r >= y.minTranslate() && (r = y.minTranslate()), r <= y.maxTranslate() && (r = y.maxTranslate()), y.setWrapperTransition(0), y.setWrapperTranslate(r), y.updateProgress(), y.updateActiveIndex(), (!i && y.isBeginning || !n && y.isEnd) && y.updateClasses(), y.params.freeModeSticky ? (clearTimeout(y.mousewheel.timeout), y.mousewheel.timeout = setTimeout(function() {
                            y.slideReset()
                        }, 300)) : y.params.lazyLoading && y.lazy && y.lazy.load(), 0 === r || r === y.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - y.mousewheel.lastScrollTime > 60)
                        if (0 > t)
                            if (y.isEnd && !y.params.loop || y.animating) {
                                if (y.params.mousewheelReleaseOnEdges) return !0
                            } else y.slideNext();
                    else if (y.isBeginning && !y.params.loop || y.animating) {
                        if (y.params.mousewheelReleaseOnEdges) return !0
                    } else y.slidePrev();
                    y.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return y.params.autoplay && y.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function d(e, t) {
            e = a(e);
            var s, r, i, n = y.rtl ? -1 : 1;
            s = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), i = e.attr("data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : y.isHorizontal() ? (r = s, i = "0") : (i = s, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px", e.transform("translate3d(" + r + ", " + i + ",0px)")
        }

        function u(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof t)) return new t(e, s);
        var c = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                autoplayStopOnLast: !1,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                flip: {
                    slideShadows: !0,
                    limitRotation: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                hashnav: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                uniqueNavElements: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slidePrevClass: "swiper-slide-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationCurrentClass: "swiper-pagination-current",
                paginationTotalClass: "swiper-pagination-total",
                paginationHiddenClass: "swiper-pagination-hidden",
                paginationProgressbarClass: "swiper-pagination-progressbar",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
            m = s && s.virtualTranslate;
        s = s || {};
        var f = {};
        for (var g in s)
            if ("object" != typeof s[g] || null === s[g] || (s[g].nodeType || s[g] === window || s[g] === document || "undefined" != typeof Dom7 && s[g] instanceof Dom7 || "undefined" != typeof jQuery && s[g] instanceof jQuery)) f[g] = s[g];
            else {
                f[g] = {};
                for (var h in s[g]) f[g][h] = s[g][h]
            }
        for (var v in c)
            if ("undefined" == typeof s[v]) s[v] = c[v];
            else if ("object" == typeof s[v])
            for (var w in c[v]) "undefined" == typeof s[v][w] && (s[v][w] = c[v][w]);
        var y = this;
        if (y.params = s, y.originalParams = f, y.classNames = [], "undefined" != typeof a && "undefined" != typeof Dom7 && (a = Dom7), ("undefined" != typeof a || (a = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (y.$ = a, y.currentBreakpoint = void 0, y.getActiveBreakpoint = function() {
                if (!y.params.breakpoints) return !1;
                var e, a = !1,
                    t = [];
                for (e in y.params.breakpoints) y.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function(e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var s = 0; s < t.length; s++) e = t[s], e >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, y.setBreakpoint = function() {
                var e = y.getActiveBreakpoint();
                if (e && y.currentBreakpoint !== e) {
                    var a = e in y.params.breakpoints ? y.params.breakpoints[e] : y.originalParams,
                        t = y.params.loop && a.slidesPerView !== y.params.slidesPerView;
                    for (var s in a) y.params[s] = a[s];
                    y.currentBreakpoint = e, t && y.destroyLoop && y.reLoop(!0)
                }
            }, y.params.breakpoints && y.setBreakpoint(), y.container = a(e), 0 !== y.container.length)) {
            if (y.container.length > 1) {
                var b = [];
                return y.container.each(function() {
                    b.push(new t(this, s))
                }), b
            }
            y.container[0].swiper = y, y.container.data("swiper", y), y.classNames.push("swiper-container-" + y.params.direction), y.params.freeMode && y.classNames.push("swiper-container-free-mode"), y.support.flexbox || (y.classNames.push("swiper-container-no-flexbox"), y.params.slidesPerColumn = 1), y.params.autoHeight && y.classNames.push("swiper-container-autoheight"), (y.params.parallax || y.params.watchSlidesVisibility) && (y.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 && (y.support.transforms3d ? (y.params.watchSlidesProgress = !0, y.classNames.push("swiper-container-3d")) : y.params.effect = "slide"), "slide" !== y.params.effect && y.classNames.push("swiper-container-" + y.params.effect), "cube" === y.params.effect && (y.params.resistanceRatio = 0, y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.centeredSlides = !1, y.params.spaceBetween = 0, y.params.virtualTranslate = !0, y.params.setWrapperSize = !1), ("fade" === y.params.effect || "flip" === y.params.effect) && (y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.watchSlidesProgress = !0, y.params.spaceBetween = 0, y.params.setWrapperSize = !1, "undefined" == typeof m && (y.params.virtualTranslate = !0)), y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1), y.wrapper = y.container.children("." + y.params.wrapperClass), y.params.pagination && (y.paginationContainer = a(y.params.pagination), y.params.uniqueNavElements && "string" == typeof y.params.pagination && y.paginationContainer.length > 1 && 1 === y.container.find(y.params.pagination).length && (y.paginationContainer = y.container.find(y.params.pagination)), "bullets" === y.params.paginationType && y.params.paginationClickable ? y.paginationContainer.addClass("swiper-pagination-clickable") : y.params.paginationClickable = !1, y.paginationContainer.addClass("swiper-pagination-" + y.params.paginationType)), (y.params.nextButton || y.params.prevButton) && (y.params.nextButton && (y.nextButton = a(y.params.nextButton), y.params.uniqueNavElements && "string" == typeof y.params.nextButton && y.nextButton.length > 1 && 1 === y.container.find(y.params.nextButton).length && (y.nextButton = y.container.find(y.params.nextButton))), y.params.prevButton && (y.prevButton = a(y.params.prevButton), y.params.uniqueNavElements && "string" == typeof y.params.prevButton && y.prevButton.length > 1 && 1 === y.container.find(y.params.prevButton).length && (y.prevButton = y.container.find(y.params.prevButton)))), y.isHorizontal = function() {
                return "horizontal" === y.params.direction
            }, y.rtl = y.isHorizontal() && ("rtl" === y.container[0].dir.toLowerCase() || "rtl" === y.container.css("direction")), y.rtl && y.classNames.push("swiper-container-rtl"), y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")), y.params.slidesPerColumn > 1 && y.classNames.push("swiper-container-multirow"), y.device.android && y.classNames.push("swiper-container-android"), y.container.addClass(y.classNames.join(" ")), y.translate = 0, y.progress = 0, y.velocity = 0, y.lockSwipeToNext = function() {
                y.params.allowSwipeToNext = !1
            }, y.lockSwipeToPrev = function() {
                y.params.allowSwipeToPrev = !1
            }, y.lockSwipes = function() {
                y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1
            }, y.unlockSwipeToNext = function() {
                y.params.allowSwipeToNext = !0
            }, y.unlockSwipeToPrev = function() {
                y.params.allowSwipeToPrev = !0
            }, y.unlockSwipes = function() {
                y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0
            }, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab"), y.imagesToLoad = [], y.imagesLoaded = 0, y.loadImage = function(e, a, t, s, r) {
                function i() {
                    r && r()
                }
                var n;
                e.complete && s ? i() : a ? (n = new window.Image, n.onload = i, n.onerror = i, t && (n.srcset = t), a && (n.src = a)) : i()
            }, y.preloadImages = function() {
                function e() {
                    "undefined" != typeof y && null !== y && (void 0 !== y.imagesLoaded && y.imagesLoaded++, y.imagesLoaded === y.imagesToLoad.length && (y.params.updateOnImagesReady && y.update(), y.emit("onImagesReady", y)))
                }
                y.imagesToLoad = y.container.find("img");
                for (var a = 0; a < y.imagesToLoad.length; a++) y.loadImage(y.imagesToLoad[a], y.imagesToLoad[a].currentSrc || y.imagesToLoad[a].getAttribute("src"), y.imagesToLoad[a].srcset || y.imagesToLoad[a].getAttribute("srcset"), !0, e)
            }, y.autoplayTimeoutId = void 0, y.autoplaying = !1, y.autoplayPaused = !1, y.startAutoplay = function() {
                return "undefined" != typeof y.autoplayTimeoutId ? !1 : y.params.autoplay ? y.autoplaying ? !1 : (y.autoplaying = !0, y.emit("onAutoplayStart", y), void i()) : !1
            }, y.stopAutoplay = function(e) {
                y.autoplayTimeoutId && (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplaying = !1, y.autoplayTimeoutId = void 0, y.emit("onAutoplayStop", y))
            }, y.pauseAutoplay = function(e) {
                y.autoplayPaused || (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplayPaused = !0, 0 === e ? (y.autoplayPaused = !1, i()) : y.wrapper.transitionEnd(function() {
                    y && (y.autoplayPaused = !1, y.autoplaying ? i() : y.stopAutoplay())
                }))
            }, y.minTranslate = function() {
                return -y.snapGrid[0]
            }, y.maxTranslate = function() {
                return -y.snapGrid[y.snapGrid.length - 1]
            }, y.updateAutoHeight = function() {
                var e = y.slides.eq(y.activeIndex)[0];
                if ("undefined" != typeof e) {
                    var a = e.offsetHeight;
                    a && y.wrapper.css("height", a + "px")
                }
            }, y.updateContainerSize = function() {
                var e, a;
                e = "undefined" != typeof y.params.width ? y.params.width : y.container[0].clientWidth, a = "undefined" != typeof y.params.height ? y.params.height : y.container[0].clientHeight, 0 === e && y.isHorizontal() || 0 === a && !y.isHorizontal() || (e = e - parseInt(y.container.css("padding-left"), 10) - parseInt(y.container.css("padding-right"), 10), a = a - parseInt(y.container.css("padding-top"), 10) - parseInt(y.container.css("padding-bottom"), 10), y.width = e, y.height = a, y.size = y.isHorizontal() ? y.width : y.height)
            }, y.updateSlidesSize = function() {
                y.slides = y.wrapper.children("." + y.params.slideClass), y.snapGrid = [], y.slidesGrid = [], y.slidesSizesGrid = [];
                var e, a = y.params.spaceBetween,
                    t = -y.params.slidesOffsetBefore,
                    s = 0,
                    i = 0;
                if ("undefined" != typeof y.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * y.size), y.virtualSize = -a, y.rtl ? y.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : y.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var n;
                    y.params.slidesPerColumn > 1 && (n = Math.floor(y.slides.length / y.params.slidesPerColumn) === y.slides.length / y.params.slidesPerColumn ? y.slides.length : Math.ceil(y.slides.length / y.params.slidesPerColumn) * y.params.slidesPerColumn, "auto" !== y.params.slidesPerView && "row" === y.params.slidesPerColumnFill && (n = Math.max(n, y.params.slidesPerView * y.params.slidesPerColumn)));
                    var o, l = y.params.slidesPerColumn,
                        p = n / l,
                        d = p - (y.params.slidesPerColumn * p - y.slides.length);
                    for (e = 0; e < y.slides.length; e++) {
                        o = 0;
                        var u = y.slides.eq(e);
                        if (y.params.slidesPerColumn > 1) {
                            var c, m, f;
                            "column" === y.params.slidesPerColumnFill ? (m = Math.floor(e / l), f = e - m * l, (m > d || m === d && f === l - 1) && ++f >= l && (f = 0, m++), c = m + f * n / l, u.css({
                                "-webkit-box-ordinal-group": c,
                                "-moz-box-ordinal-group": c,
                                "-ms-flex-order": c,
                                "-webkit-order": c,
                                order: c
                            })) : (f = Math.floor(e / p), m = e - f * p), u.css({
                                "margin-top": 0 !== f && y.params.spaceBetween && y.params.spaceBetween + "px"
                            }).attr("data-swiper-column", m).attr("data-swiper-row", f)
                        }
                        "none" !== u.css("display") && ("auto" === y.params.slidesPerView ? (o = y.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), y.params.roundLengths && (o = r(o))) : (o = (y.size - (y.params.slidesPerView - 1) * a) / y.params.slidesPerView, y.params.roundLengths && (o = r(o)), y.isHorizontal() ? y.slides[e].style.width = o + "px" : y.slides[e].style.height = o + "px"), y.slides[e].swiperSlideSize = o, y.slidesSizesGrid.push(o), y.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === e && (t = t - y.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t), y.slidesGrid.push(t)) : (i % y.params.slidesPerGroup === 0 && y.snapGrid.push(t), y.slidesGrid.push(t), t = t + o + a), y.virtualSize += o + a, s = o, i++)
                    }
                    y.virtualSize = Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;
                    var g;
                    if (y.rtl && y.wrongRTL && ("slide" === y.params.effect || "coverflow" === y.params.effect) && y.wrapper.css({
                            width: y.virtualSize + y.params.spaceBetween + "px"
                        }), (!y.support.flexbox || y.params.setWrapperSize) && (y.isHorizontal() ? y.wrapper.css({
                            width: y.virtualSize + y.params.spaceBetween + "px"
                        }) : y.wrapper.css({
                            height: y.virtualSize + y.params.spaceBetween + "px"
                        })), y.params.slidesPerColumn > 1 && (y.virtualSize = (o + y.params.spaceBetween) * n, y.virtualSize = Math.ceil(y.virtualSize / y.params.slidesPerColumn) - y.params.spaceBetween, y.wrapper.css({
                            width: y.virtualSize + y.params.spaceBetween + "px"
                        }), y.params.centeredSlides)) {
                        for (g = [], e = 0; e < y.snapGrid.length; e++) y.snapGrid[e] < y.virtualSize + y.snapGrid[0] && g.push(y.snapGrid[e]);
                        y.snapGrid = g
                    }
                    if (!y.params.centeredSlides) {
                        for (g = [], e = 0; e < y.snapGrid.length; e++) y.snapGrid[e] <= y.virtualSize - y.size && g.push(y.snapGrid[e]);
                        y.snapGrid = g, Math.floor(y.virtualSize - y.size) - Math.floor(y.snapGrid[y.snapGrid.length - 1]) > 1 && y.snapGrid.push(y.virtualSize - y.size)
                    }
                    0 === y.snapGrid.length && (y.snapGrid = [0]), 0 !== y.params.spaceBetween && (y.isHorizontal() ? y.rtl ? y.slides.css({
                        marginLeft: a + "px"
                    }) : y.slides.css({
                        marginRight: a + "px"
                    }) : y.slides.css({
                        marginBottom: a + "px"
                    })), y.params.watchSlidesProgress && y.updateSlidesOffset()
                }
            }, y.updateSlidesOffset = function() {
                for (var e = 0; e < y.slides.length; e++) y.slides[e].swiperSlideOffset = y.isHorizontal() ? y.slides[e].offsetLeft : y.slides[e].offsetTop
            }, y.updateSlidesProgress = function(e) {
                if ("undefined" == typeof e && (e = y.translate || 0), 0 !== y.slides.length) {
                    "undefined" == typeof y.slides[0].swiperSlideOffset && y.updateSlidesOffset();
                    var a = -e;
                    y.rtl && (a = e), y.slides.removeClass(y.params.slideVisibleClass);
                    for (var t = 0; t < y.slides.length; t++) {
                        var s = y.slides[t],
                            r = (a - s.swiperSlideOffset) / (s.swiperSlideSize + y.params.spaceBetween);
                        if (y.params.watchSlidesVisibility) {
                            var i = -(a - s.swiperSlideOffset),
                                n = i + y.slidesSizesGrid[t],
                                o = i >= 0 && i < y.size || n > 0 && n <= y.size || 0 >= i && n >= y.size;
                            o && y.slides.eq(t).addClass(y.params.slideVisibleClass)
                        }
                        s.progress = y.rtl ? -r : r
                    }
                }
            }, y.updateProgress = function(e) {
                "undefined" == typeof e && (e = y.translate || 0);
                var a = y.maxTranslate() - y.minTranslate(),
                    t = y.isBeginning,
                    s = y.isEnd;
                0 === a ? (y.progress = 0, y.isBeginning = y.isEnd = !0) : (y.progress = (e - y.minTranslate()) / a, y.isBeginning = y.progress <= 0, y.isEnd = y.progress >= 1), y.isBeginning && !t && y.emit("onReachBeginning", y), y.isEnd && !s && y.emit("onReachEnd", y), y.params.watchSlidesProgress && y.updateSlidesProgress(e), y.emit("onProgress", y, y.progress)
            }, y.updateActiveIndex = function() {
                var e, a, t, s = y.rtl ? y.translate : -y.translate;
                for (a = 0; a < y.slidesGrid.length; a++) "undefined" != typeof y.slidesGrid[a + 1] ? s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] - (y.slidesGrid[a + 1] - y.slidesGrid[a]) / 2 ? e = a : s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] && (e = a + 1) : s >= y.slidesGrid[a] && (e = a);
                (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / y.params.slidesPerGroup), t >= y.snapGrid.length && (t = y.snapGrid.length - 1), e !== y.activeIndex && (y.snapIndex = t, y.previousIndex = y.activeIndex, y.activeIndex = e, y.updateClasses())
            }, y.updateClasses = function() {
                y.slides.removeClass(y.params.slideActiveClass + " " + y.params.slideNextClass + " " + y.params.slidePrevClass);
                var e = y.slides.eq(y.activeIndex);
                e.addClass(y.params.slideActiveClass);
                var t = e.next("." + y.params.slideClass).addClass(y.params.slideNextClass);
                y.params.loop && 0 === t.length && y.slides.eq(0).addClass(y.params.slideNextClass);
                var s = e.prev("." + y.params.slideClass).addClass(y.params.slidePrevClass);
                if (y.params.loop && 0 === s.length && y.slides.eq(-1).addClass(y.params.slidePrevClass), y.paginationContainer && y.paginationContainer.length > 0) {
                    var r, i = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length;
                    if (y.params.loop ? (r = Math.ceil((y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup), r > y.slides.length - 1 - 2 * y.loopedSlides && (r -= y.slides.length - 2 * y.loopedSlides), r > i - 1 && (r -= i), 0 > r && "bullets" !== y.params.paginationType && (r = i + r)) : r = "undefined" != typeof y.snapIndex ? y.snapIndex : y.activeIndex || 0, "bullets" === y.params.paginationType && y.bullets && y.bullets.length > 0 && (y.bullets.removeClass(y.params.bulletActiveClass), y.paginationContainer.length > 1 ? y.bullets.each(function() {
                            a(this).index() === r && a(this).addClass(y.params.bulletActiveClass)
                        }) : y.bullets.eq(r).addClass(y.params.bulletActiveClass)), "fraction" === y.params.paginationType && (y.paginationContainer.find("." + y.params.paginationCurrentClass).text(r + 1), y.paginationContainer.find("." + y.params.paginationTotalClass).text(i)), "progress" === y.params.paginationType) {
                        var n = (r + 1) / i,
                            o = n,
                            l = 1;
                        y.isHorizontal() || (l = n, o = 1), y.paginationContainer.find("." + y.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(y.params.speed)
                    }
                    "custom" === y.params.paginationType && y.params.paginationCustomRender && (y.paginationContainer.html(y.params.paginationCustomRender(y, r + 1, i)), y.emit("onPaginationRendered", y, y.paginationContainer[0]))
                }
                y.params.loop || (y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.isBeginning ? (y.prevButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.prevButton)) : (y.prevButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.isEnd ? (y.nextButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.nextButton)) : (y.nextButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))))
            }, y.updatePagination = function() {
                if (y.params.pagination && y.paginationContainer && y.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === y.params.paginationType) {
                        for (var a = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length, t = 0; a > t; t++) e += y.params.paginationBulletRender ? y.params.paginationBulletRender(t, y.params.bulletClass) : "<" + y.params.paginationElement + ' class="' + y.params.bulletClass + '"></' + y.params.paginationElement + ">";
                        y.paginationContainer.html(e), y.bullets = y.paginationContainer.find("." + y.params.bulletClass), y.params.paginationClickable && y.params.a11y && y.a11y && y.a11y.initPagination()
                    }
                    "fraction" === y.params.paginationType && (e = y.params.paginationFractionRender ? y.params.paginationFractionRender(y, y.params.paginationCurrentClass, y.params.paginationTotalClass) : '<span class="' + y.params.paginationCurrentClass + '"></span> / <span class="' + y.params.paginationTotalClass + '"></span>', y.paginationContainer.html(e)), "progress" === y.params.paginationType && (e = y.params.paginationProgressRender ? y.params.paginationProgressRender(y, y.params.paginationProgressbarClass) : '<span class="' + y.params.paginationProgressbarClass + '"></span>', y.paginationContainer.html(e)), "custom" !== y.params.paginationType && y.emit("onPaginationRendered", y, y.paginationContainer[0])
                }
            }, y.update = function(e) {
                function a() {
                    s = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate()), y.setWrapperTranslate(s), y.updateActiveIndex(), y.updateClasses()
                }
                if (y.updateContainerSize(), y.updateSlidesSize(), y.updateProgress(), y.updatePagination(), y.updateClasses(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), e) {
                    var t, s;
                    y.controller && y.controller.spline && (y.controller.spline = void 0), y.params.freeMode ? (a(), y.params.autoHeight && y.updateAutoHeight()) : (t = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0), t || a())
                } else y.params.autoHeight && y.updateAutoHeight()
            }, y.onResize = function(e) {
                y.params.breakpoints && y.setBreakpoint();
                var a = y.params.allowSwipeToPrev,
                    t = y.params.allowSwipeToNext;
                y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0, y.updateContainerSize(), y.updateSlidesSize(), ("auto" === y.params.slidesPerView || y.params.freeMode || e) && y.updatePagination(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), y.controller && y.controller.spline && (y.controller.spline = void 0);
                var s = !1;
                if (y.params.freeMode) {
                    var r = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate());
                    y.setWrapperTranslate(r), y.updateActiveIndex(), y.updateClasses(), y.params.autoHeight && y.updateAutoHeight()
                } else y.updateClasses(), s = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0);
                y.params.lazyLoading && !s && y.lazy && y.lazy.load(), y.params.allowSwipeToPrev = a, y.params.allowSwipeToNext = t
            };
            var x = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? x = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (x = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), y.touchEvents = {
                start: y.support.touch || !y.params.simulateTouch ? "touchstart" : x[0],
                move: y.support.touch || !y.params.simulateTouch ? "touchmove" : x[1],
                end: y.support.touch || !y.params.simulateTouch ? "touchend" : x[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === y.params.touchEventsTarget ? y.container : y.wrapper).addClass("swiper-wp8-" + y.params.direction), y.initEvents = function(e) {
                var a = e ? "off" : "on",
                    t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === y.params.touchEventsTarget ? y.container[0] : y.wrapper[0],
                    i = y.support.touch ? r : document,
                    n = y.params.nested ? !0 : !1;
                y.browser.ie ? (r[t](y.touchEvents.start, y.onTouchStart, !1), i[t](y.touchEvents.move, y.onTouchMove, n), i[t](y.touchEvents.end, y.onTouchEnd, !1)) : (y.support.touch && (r[t](y.touchEvents.start, y.onTouchStart, !1), r[t](y.touchEvents.move, y.onTouchMove, n), r[t](y.touchEvents.end, y.onTouchEnd, !1)), !s.simulateTouch || y.device.ios || y.device.android || (r[t]("mousedown", y.onTouchStart, !1), document[t]("mousemove", y.onTouchMove, n), document[t]("mouseup", y.onTouchEnd, !1))), window[t]("resize", y.onResize), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.nextButton[a]("click", y.onClickNext), y.params.a11y && y.a11y && y.nextButton[a]("keydown", y.a11y.onEnterKey)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.prevButton[a]("click", y.onClickPrev), y.params.a11y && y.a11y && y.prevButton[a]("keydown", y.a11y.onEnterKey)), y.params.pagination && y.params.paginationClickable && (y.paginationContainer[a]("click", "." + y.params.bulletClass, y.onClickIndex), y.params.a11y && y.a11y && y.paginationContainer[a]("keydown", "." + y.params.bulletClass, y.a11y.onEnterKey)), (y.params.preventClicks || y.params.preventClicksPropagation) && r[t]("click", y.preventClicks, !0)
            }, y.attachEvents = function() {
                y.initEvents()
            }, y.detachEvents = function() {
                y.initEvents(!0)
            }, y.allowClick = !0, y.preventClicks = function(e) {
                y.allowClick || (y.params.preventClicks && e.preventDefault(), y.params.preventClicksPropagation && y.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, y.onClickNext = function(e) {
                e.preventDefault(), (!y.isEnd || y.params.loop) && y.slideNext()
            }, y.onClickPrev = function(e) {
                e.preventDefault(), (!y.isBeginning || y.params.loop) && y.slidePrev()
            }, y.onClickIndex = function(e) {
                e.preventDefault();
                var t = a(this).index() * y.params.slidesPerGroup;
                y.params.loop && (t += y.loopedSlides), y.slideTo(t)
            }, y.updateClickedSlide = function(e) {
                var t = n(e, "." + y.params.slideClass),
                    s = !1;
                if (t)
                    for (var r = 0; r < y.slides.length; r++) y.slides[r] === t && (s = !0);
                if (!t || !s) return y.clickedSlide = void 0, void(y.clickedIndex = void 0);
                if (y.clickedSlide = t, y.clickedIndex = a(t).index(), y.params.slideToClickedSlide && void 0 !== y.clickedIndex && y.clickedIndex !== y.activeIndex) {
                    var i, o = y.clickedIndex;
                    if (y.params.loop) {
                        if (y.animating) return;
                        i = a(y.clickedSlide).attr("data-swiper-slide-index"), y.params.centeredSlides ? o < y.loopedSlides - y.params.slidesPerView / 2 || o > y.slides.length - y.loopedSlides + y.params.slidesPerView / 2 ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                            y.slideTo(o)
                        }, 0)) : y.slideTo(o) : o > y.slides.length - y.params.slidesPerView ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                            y.slideTo(o)
                        }, 0)) : y.slideTo(o)
                    } else y.slideTo(o)
                }
            };
            var T, S, C, z, M, P, I, k, E, B, D = "input, select, textarea, button",
                L = Date.now(),
                H = [];
            y.animating = !1, y.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var G, A;
            if (y.onTouchStart = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
                        if (y.params.noSwiping && n(e, "." + y.params.noSwipingClass)) return void(y.allowClick = !0);
                        if (!y.params.swipeHandler || n(e, y.params.swipeHandler)) {
                            var t = y.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                s = y.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(y.device.ios && y.params.iOSEdgeSwipeDetection && t <= y.params.iOSEdgeSwipeThreshold)) {
                                if (T = !0, S = !1, C = !0, M = void 0, A = void 0, y.touches.startX = t, y.touches.startY = s, z = Date.now(), y.allowClick = !0, y.updateContainerSize(), y.swipeDirection = void 0, y.params.threshold > 0 && (k = !1), "touchstart" !== e.type) {
                                    var r = !0;
                                    a(e.target).is(D) && (r = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), r && e.preventDefault()
                                }
                                y.emit("onTouchStart", y, e)
                            }
                        }
                    }
                }, y.onTouchMove = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper) return y.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(y.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (y.params.onlyExternal) return y.allowClick = !1, void(T && (y.touches.startX = y.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, y.touches.startY = y.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, z = Date.now()));
                        if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return S = !0, void(y.allowClick = !1);
                        if (C && y.emit("onTouchMove", y, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (y.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, y.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof M) {
                                var t = 180 * Math.atan2(Math.abs(y.touches.currentY - y.touches.startY), Math.abs(y.touches.currentX - y.touches.startX)) / Math.PI;
                                M = y.isHorizontal() ? t > y.params.touchAngle : 90 - t > y.params.touchAngle
                            }
                            if (M && y.emit("onTouchMoveOpposite", y, e), "undefined" == typeof A && y.browser.ieTouch && (y.touches.currentX !== y.touches.startX || y.touches.currentY !== y.touches.startY) && (A = !0), T) {
                                if (M) return void(T = !1);
                                if (A || !y.browser.ieTouch) {
                                    y.allowClick = !1, y.emit("onSliderMove", y, e), e.preventDefault(), y.params.touchMoveStopPropagation && !y.params.nested && e.stopPropagation(), S || (s.loop && y.fixLoop(), I = y.getWrapperTranslate(), y.setWrapperTransition(0), y.animating && y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), y.params.autoplay && y.autoplaying && (y.params.autoplayDisableOnInteraction ? y.stopAutoplay() : y.pauseAutoplay()), B = !1, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grabbing", y.container[0].style.cursor = "-moz-grabbin", y.container[0].style.cursor = "grabbing")), S = !0;
                                    var r = y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY;
                                    r *= y.params.touchRatio, y.rtl && (r = -r), y.swipeDirection = r > 0 ? "prev" : "next", P = r + I;
                                    var i = !0;
                                    if (r > 0 && P > y.minTranslate() ? (i = !1, y.params.resistance && (P = y.minTranslate() - 1 + Math.pow(-y.minTranslate() + I + r, y.params.resistanceRatio))) : 0 > r && P < y.maxTranslate() && (i = !1, y.params.resistance && (P = y.maxTranslate() + 1 - Math.pow(y.maxTranslate() - I - r, y.params.resistanceRatio))),
                                        i && (e.preventedByNestedSwiper = !0), !y.params.allowSwipeToNext && "next" === y.swipeDirection && I > P && (P = I), !y.params.allowSwipeToPrev && "prev" === y.swipeDirection && P > I && (P = I), y.params.followFinger) {
                                        if (y.params.threshold > 0) {
                                            if (!(Math.abs(r) > y.params.threshold || k)) return void(P = I);
                                            if (!k) return k = !0, y.touches.startX = y.touches.currentX, y.touches.startY = y.touches.currentY, P = I, void(y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY)
                                        }(y.params.freeMode || y.params.watchSlidesProgress) && y.updateActiveIndex(), y.params.freeMode && (0 === H.length && H.push({
                                            position: y.touches[y.isHorizontal() ? "startX" : "startY"],
                                            time: z
                                        }), H.push({
                                            position: y.touches[y.isHorizontal() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), y.updateProgress(P), y.setWrapperTranslate(P)
                                    }
                                }
                            }
                        }
                    }
                }, y.onTouchEnd = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), C && y.emit("onTouchEnd", y, e), C = !1, T) {
                        y.params.grabCursor && S && T && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab");
                        var t = Date.now(),
                            s = t - z;
                        if (y.allowClick && (y.updateClickedSlide(e), y.emit("onTap", y, e), 300 > s && t - L > 300 && (E && clearTimeout(E), E = setTimeout(function() {
                                y && (y.params.paginationHide && y.paginationContainer.length > 0 && !a(e.target).hasClass(y.params.bulletClass) && y.paginationContainer.toggleClass(y.params.paginationHiddenClass), y.emit("onClick", y, e))
                            }, 300)), 300 > s && 300 > t - L && (E && clearTimeout(E), y.emit("onDoubleTap", y, e))), L = Date.now(), setTimeout(function() {
                                y && (y.allowClick = !0)
                            }, 0), !T || !S || !y.swipeDirection || 0 === y.touches.diff || P === I) return void(T = S = !1);
                        T = S = !1;
                        var r;
                        if (r = y.params.followFinger ? y.rtl ? y.translate : -y.translate : -P, y.params.freeMode) {
                            if (r < -y.minTranslate()) return void y.slideTo(y.activeIndex);
                            if (r > -y.maxTranslate()) return void(y.slides.length < y.snapGrid.length ? y.slideTo(y.snapGrid.length - 1) : y.slideTo(y.slides.length - 1));
                            if (y.params.freeModeMomentum) {
                                if (H.length > 1) {
                                    var i = H.pop(),
                                        n = H.pop(),
                                        o = i.position - n.position,
                                        l = i.time - n.time;
                                    y.velocity = o / l, y.velocity = y.velocity / 2, Math.abs(y.velocity) < y.params.freeModeMinimumVelocity && (y.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (y.velocity = 0)
                                } else y.velocity = 0;
                                H.length = 0;
                                var p = 1e3 * y.params.freeModeMomentumRatio,
                                    d = y.velocity * p,
                                    u = y.translate + d;
                                y.rtl && (u = -u);
                                var c, m = !1,
                                    f = 20 * Math.abs(y.velocity) * y.params.freeModeMomentumBounceRatio;
                                if (u < y.maxTranslate()) y.params.freeModeMomentumBounce ? (u + y.maxTranslate() < -f && (u = y.maxTranslate() - f), c = y.maxTranslate(), m = !0, B = !0) : u = y.maxTranslate();
                                else if (u > y.minTranslate()) y.params.freeModeMomentumBounce ? (u - y.minTranslate() > f && (u = y.minTranslate() + f), c = y.minTranslate(), m = !0, B = !0) : u = y.minTranslate();
                                else if (y.params.freeModeSticky) {
                                    var g, h = 0;
                                    for (h = 0; h < y.snapGrid.length; h += 1)
                                        if (y.snapGrid[h] > -u) {
                                            g = h;
                                            break
                                        }
                                    u = Math.abs(y.snapGrid[g] - u) < Math.abs(y.snapGrid[g - 1] - u) || "next" === y.swipeDirection ? y.snapGrid[g] : y.snapGrid[g - 1], y.rtl || (u = -u)
                                }
                                if (0 !== y.velocity) p = y.rtl ? Math.abs((-u - y.translate) / y.velocity) : Math.abs((u - y.translate) / y.velocity);
                                else if (y.params.freeModeSticky) return void y.slideReset();
                                y.params.freeModeMomentumBounce && m ? (y.updateProgress(c), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating = !0, y.wrapper.transitionEnd(function() {
                                    y && B && (y.emit("onMomentumBounce", y), y.setWrapperTransition(y.params.speed), y.setWrapperTranslate(c), y.wrapper.transitionEnd(function() {
                                        y && y.onTransitionEnd()
                                    }))
                                })) : y.velocity ? (y.updateProgress(u), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function() {
                                    y && y.onTransitionEnd()
                                }))) : y.updateProgress(u), y.updateActiveIndex()
                            }
                            return void((!y.params.freeModeMomentum || s >= y.params.longSwipesMs) && (y.updateProgress(), y.updateActiveIndex()))
                        }
                        var v, w = 0,
                            b = y.slidesSizesGrid[0];
                        for (v = 0; v < y.slidesGrid.length; v += y.params.slidesPerGroup) "undefined" != typeof y.slidesGrid[v + y.params.slidesPerGroup] ? r >= y.slidesGrid[v] && r < y.slidesGrid[v + y.params.slidesPerGroup] && (w = v, b = y.slidesGrid[v + y.params.slidesPerGroup] - y.slidesGrid[v]) : r >= y.slidesGrid[v] && (w = v, b = y.slidesGrid[y.slidesGrid.length - 1] - y.slidesGrid[y.slidesGrid.length - 2]);
                        var x = (r - y.slidesGrid[w]) / b;
                        if (s > y.params.longSwipesMs) {
                            if (!y.params.longSwipes) return void y.slideTo(y.activeIndex);
                            "next" === y.swipeDirection && (x >= y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w)), "prev" === y.swipeDirection && (x > 1 - y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w))
                        } else {
                            if (!y.params.shortSwipes) return void y.slideTo(y.activeIndex);
                            "next" === y.swipeDirection && y.slideTo(w + y.params.slidesPerGroup), "prev" === y.swipeDirection && y.slideTo(w)
                        }
                    }
                }, y._slideTo = function(e, a) {
                    return y.slideTo(e, a, !0, !0)
                }, y.slideTo = function(e, a, t, s) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), y.snapIndex = Math.floor(e / y.params.slidesPerGroup), y.snapIndex >= y.snapGrid.length && (y.snapIndex = y.snapGrid.length - 1);
                    var r = -y.snapGrid[y.snapIndex];
                    y.params.autoplay && y.autoplaying && (s || !y.params.autoplayDisableOnInteraction ? y.pauseAutoplay(a) : y.stopAutoplay()), y.updateProgress(r);
                    for (var i = 0; i < y.slidesGrid.length; i++) - Math.floor(100 * r) >= Math.floor(100 * y.slidesGrid[i]) && (e = i);
                    return !y.params.allowSwipeToNext && r < y.translate && r < y.minTranslate() ? !1 : !y.params.allowSwipeToPrev && r > y.translate && r > y.maxTranslate() && (y.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = y.params.speed), y.previousIndex = y.activeIndex || 0, y.activeIndex = e, y.rtl && -r === y.translate || !y.rtl && r === y.translate ? (y.params.autoHeight && y.updateAutoHeight(), y.updateClasses(), "slide" !== y.params.effect && y.setWrapperTranslate(r), !1) : (y.updateClasses(), y.onTransitionStart(t), 0 === a ? (y.setWrapperTranslate(r), y.setWrapperTransition(0), y.onTransitionEnd(t)) : (y.setWrapperTranslate(r), y.setWrapperTransition(a), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function() {
                        y && y.onTransitionEnd(t)
                    }))), !0))
                }, y.onTransitionStart = function(e) {
                    "undefined" == typeof e && (e = !0), y.params.autoHeight && y.updateAutoHeight(), y.lazy && y.lazy.onTransitionStart(), e && (y.emit("onTransitionStart", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeStart", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextStart", y) : y.emit("onSlidePrevStart", y)))
                }, y.onTransitionEnd = function(e) {
                    y.animating = !1, y.setWrapperTransition(0), "undefined" == typeof e && (e = !0), y.lazy && y.lazy.onTransitionEnd(), e && (y.emit("onTransitionEnd", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeEnd", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextEnd", y) : y.emit("onSlidePrevEnd", y))), y.params.hashnav && y.hashnav && y.hashnav.setHash()
                }, y.slideNext = function(e, a, t) {
                    if (y.params.loop) {
                        if (y.animating) return !1;
                        y.fixLoop();
                        y.container[0].clientLeft;
                        return y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t)
                    }
                    return y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t)
                }, y._slideNext = function(e) {
                    return y.slideNext(!0, e, !0)
                }, y.slidePrev = function(e, a, t) {
                    if (y.params.loop) {
                        if (y.animating) return !1;
                        y.fixLoop();
                        y.container[0].clientLeft;
                        return y.slideTo(y.activeIndex - 1, a, e, t)
                    }
                    return y.slideTo(y.activeIndex - 1, a, e, t)
                }, y._slidePrev = function(e) {
                    return y.slidePrev(!0, e, !0)
                }, y.slideReset = function(e, a, t) {
                    return y.slideTo(y.activeIndex, a, e)
                }, y.setWrapperTransition = function(e, a) {
                    y.wrapper.transition(e), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTransition(e), y.params.parallax && y.parallax && y.parallax.setTransition(e), y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(e), y.params.control && y.controller && y.controller.setTransition(e, a), y.emit("onSetTransition", y, e)
                }, y.setWrapperTranslate = function(e, a, t) {
                    var s = 0,
                        i = 0,
                        n = 0;
                    y.isHorizontal() ? s = y.rtl ? -e : e : i = e, y.params.roundLengths && (s = r(s), i = r(i)), y.params.virtualTranslate || (y.support.transforms3d ? y.wrapper.transform("translate3d(" + s + "px, " + i + "px, " + n + "px)") : y.wrapper.transform("translate(" + s + "px, " + i + "px)")), y.translate = y.isHorizontal() ? s : i;
                    var o, l = y.maxTranslate() - y.minTranslate();
                    o = 0 === l ? 0 : (e - y.minTranslate()) / l, o !== y.progress && y.updateProgress(e), a && y.updateActiveIndex(), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTranslate(y.translate), y.params.parallax && y.parallax && y.parallax.setTranslate(y.translate), y.params.scrollbar && y.scrollbar && y.scrollbar.setTranslate(y.translate), y.params.control && y.controller && y.controller.setTranslate(y.translate, t), y.emit("onSetTranslate", y, y.translate)
                }, y.getTranslate = function(e, a) {
                    var t, s, r, i;
                    return "undefined" == typeof a && (a = "x"), y.params.virtualTranslate ? y.rtl ? -y.translate : y.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = r.transform || r.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function(e) {
                        return e.replace(",", ".")
                    }).join(", ")), i = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), y.rtl && s && (s = -s), s || 0)
                }, y.getWrapperTranslate = function(e) {
                    return "undefined" == typeof e && (e = y.isHorizontal() ? "x" : "y"), y.getTranslate(y.wrapper[0], e)
                }, y.observers = [], y.initObservers = function() {
                    if (y.params.observeParents)
                        for (var e = y.container.parents(), a = 0; a < e.length; a++) o(e[a]);
                    o(y.container[0], {
                        childList: !1
                    }), o(y.wrapper[0], {
                        attributes: !1
                    })
                }, y.disconnectObservers = function() {
                    for (var e = 0; e < y.observers.length; e++) y.observers[e].disconnect();
                    y.observers = []
                }, y.createLoop = function() {
                    y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove();
                    var e = y.wrapper.children("." + y.params.slideClass);
                    "auto" !== y.params.slidesPerView || y.params.loopedSlides || (y.params.loopedSlides = e.length), y.loopedSlides = parseInt(y.params.loopedSlides || y.params.slidesPerView, 10), y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides, y.loopedSlides > e.length && (y.loopedSlides = e.length);
                    var t, s = [],
                        r = [];
                    for (e.each(function(t, i) {
                            var n = a(this);
                            t < y.loopedSlides && r.push(i), t < e.length && t >= e.length - y.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t)
                        }), t = 0; t < r.length; t++) y.wrapper.append(a(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
                    for (t = s.length - 1; t >= 0; t--) y.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass))
                }, y.destroyLoop = function() {
                    y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove(), y.slides.removeAttr("data-swiper-slide-index")
                }, y.reLoop = function(e) {
                    var a = y.activeIndex - y.loopedSlides;
                    y.destroyLoop(), y.createLoop(), y.updateSlidesSize(), e && y.slideTo(a + y.loopedSlides, 0, !1)
                }, y.fixLoop = function() {
                    var e;
                    y.activeIndex < y.loopedSlides ? (e = y.slides.length - 3 * y.loopedSlides + y.activeIndex, e += y.loopedSlides, y.slideTo(e, 0, !1, !0)) : ("auto" === y.params.slidesPerView && y.activeIndex >= 2 * y.loopedSlides || y.activeIndex > y.slides.length - 2 * y.params.slidesPerView) && (e = -y.slides.length + y.activeIndex + y.loopedSlides, e += y.loopedSlides, y.slideTo(e, 0, !1, !0))
                }, y.appendSlide = function(e) {
                    if (y.params.loop && y.destroyLoop(), "object" == typeof e && e.length)
                        for (var a = 0; a < e.length; a++) e[a] && y.wrapper.append(e[a]);
                    else y.wrapper.append(e);
                    y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0)
                }, y.prependSlide = function(e) {
                    y.params.loop && y.destroyLoop();
                    var a = y.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) e[t] && y.wrapper.prepend(e[t]);
                        a = y.activeIndex + e.length
                    } else y.wrapper.prepend(e);
                    y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.slideTo(a, 0, !1)
                }, y.removeSlide = function(e) {
                    y.params.loop && (y.destroyLoop(), y.slides = y.wrapper.children("." + y.params.slideClass));
                    var a, t = y.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var s = 0; s < e.length; s++) a = e[s], y.slides[a] && y.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, y.slides[a] && y.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.params.loop ? y.slideTo(t + y.loopedSlides, 0, !1) : y.slideTo(t, 0, !1)
                }, y.removeAllSlides = function() {
                    for (var e = [], a = 0; a < y.slides.length; a++) e.push(a);
                    y.removeSlide(e)
                }, y.effects = {
                    fade: {
                        setTranslate: function() {
                            for (var e = 0; e < y.slides.length; e++) {
                                var a = y.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    s = -t;
                                y.params.virtualTranslate || (s -= y.translate);
                                var r = 0;
                                y.isHorizontal() || (r = s, s = 0);
                                var i = y.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({
                                    opacity: i
                                }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                            }
                        },
                        setTransition: function(e) {
                            if (y.slides.transition(e), y.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                y.slides.transitionEnd(function() {
                                    if (!a && y) {
                                        a = !0, y.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) y.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    flip: {
                        setTranslate: function() {
                            for (var e = 0; e < y.slides.length; e++) {
                                var t = y.slides.eq(e),
                                    s = t[0].progress;
                                y.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
                                var r = t[0].swiperSlideOffset,
                                    i = -180 * s,
                                    n = i,
                                    o = 0,
                                    l = -r,
                                    p = 0;
                                if (y.isHorizontal() ? y.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + y.slides.length, y.params.flip.slideShadows) {
                                    var d = y.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                        u = y.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                    0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0))
                                }
                                t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                            }
                        },
                        setTransition: function(e) {
                            if (y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                y.slides.eq(y.activeIndex).transitionEnd(function() {
                                    if (!t && y && a(this).hasClass(y.params.slideActiveClass)) {
                                        t = !0, y.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < e.length; s++) y.wrapper.trigger(e[s])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function() {
                            var e, t = 0;
                            y.params.cube.shadow && (y.isHorizontal() ? (e = y.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), y.wrapper.append(e)), e.css({
                                height: y.width + "px"
                            })) : (e = y.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), y.container.append(e))));
                            for (var s = 0; s < y.slides.length; s++) {
                                var r = y.slides.eq(s),
                                    i = 90 * s,
                                    n = Math.floor(i / 360);
                                y.rtl && (i = -i, n = Math.floor(-i / 360));
                                var o = Math.max(Math.min(r[0].progress, 1), -1),
                                    l = 0,
                                    p = 0,
                                    d = 0;
                                s % 4 === 0 ? (l = 4 * -n * y.size, d = 0) : (s - 1) % 4 === 0 ? (l = 0, d = 4 * -n * y.size) : (s - 2) % 4 === 0 ? (l = y.size + 4 * n * y.size, d = y.size) : (s - 3) % 4 === 0 && (l = -y.size, d = 3 * y.size + 4 * y.size * n), y.rtl && (l = -l), y.isHorizontal() || (p = l, l = 0);
                                var u = "rotateX(" + (y.isHorizontal() ? 0 : -i) + "deg) rotateY(" + (y.isHorizontal() ? i : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                                if (1 >= o && o > -1 && (t = 90 * s + 90 * o, y.rtl && (t = 90 * -s - 90 * o)), r.transform(u), y.params.cube.slideShadows) {
                                    var c = y.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                                        m = y.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), r.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                                }
                            }
                            if (y.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + y.size / 2 + "px"
                                }), y.params.cube.shadow)
                                if (y.isHorizontal()) e.transform("translate3d(0px, " + (y.width / 2 + y.params.cube.shadowOffset) + "px, " + -y.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + y.params.cube.shadowScale + ")");
                                else {
                                    var f = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        g = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
                                        h = y.params.cube.shadowScale,
                                        v = y.params.cube.shadowScale / g,
                                        w = y.params.cube.shadowOffset;
                                    e.transform("scale3d(" + h + ", 1, " + v + ") translate3d(0px, " + (y.height / 2 + w) + "px, " + -y.height / 2 / v + "px) rotateX(-90deg)")
                                }
                            var b = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;
                            y.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (y.isHorizontal() ? 0 : t) + "deg) rotateY(" + (y.isHorizontal() ? -t : 0) + "deg)")
                        },
                        setTransition: function(e) {
                            y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.cube.shadow && !y.isHorizontal() && y.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var e = y.translate, t = y.isHorizontal() ? -e + y.width / 2 : -e + y.height / 2, s = y.isHorizontal() ? y.params.coverflow.rotate : -y.params.coverflow.rotate, r = y.params.coverflow.depth, i = 0, n = y.slides.length; n > i; i++) {
                                var o = y.slides.eq(i),
                                    l = y.slidesSizesGrid[i],
                                    p = o[0].swiperSlideOffset,
                                    d = (t - p - l / 2) / l * y.params.coverflow.modifier,
                                    u = y.isHorizontal() ? s * d : 0,
                                    c = y.isHorizontal() ? 0 : s * d,
                                    m = -r * Math.abs(d),
                                    f = y.isHorizontal() ? 0 : y.params.coverflow.stretch * d,
                                    g = y.isHorizontal() ? y.params.coverflow.stretch * d : 0;
                                Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                                var h = "translate3d(" + g + "px," + f + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                                if (o.transform(h), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, y.params.coverflow.slideShadows) {
                                    var v = y.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                        w = y.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                                }
                            }
                            if (y.browser.ie) {
                                var b = y.wrapper[0].style;
                                b.perspectiveOrigin = t + "px 50%"
                            }
                        },
                        setTransition: function(e) {
                            y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, y.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== y.slides.length)) {
                            var s = y.slides.eq(e),
                                r = s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !s.hasClass("swiper-lazy") || s.hasClass("swiper-lazy-loaded") || s.hasClass("swiper-lazy-loading") || (r = r.add(s[0])), 0 !== r.length && r.each(function() {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var r = e.attr("data-background"),
                                    i = e.attr("data-src"),
                                    n = e.attr("data-srcset");
                                y.loadImage(e[0], i || r, n, !1, function() {
                                    if (r ? (e.css("background-image", 'url("' + r + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), i && (e.attr("src", i), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), s.find(".swiper-lazy-preloader, .preloader").remove(), y.params.loop && t) {
                                        var a = s.attr("data-swiper-slide-index");
                                        if (s.hasClass(y.params.slideDuplicateClass)) {
                                            var o = y.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + y.params.slideDuplicateClass + ")");
                                            y.lazy.loadImageInSlide(o.index(), !1)
                                        } else {
                                            var l = y.wrapper.children("." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            y.lazy.loadImageInSlide(l.index(), !1)
                                        }
                                    }
                                    y.emit("onLazyImageReady", y, s[0], e[0])
                                }), y.emit("onLazyImageLoad", y, s[0], e[0])
                            })
                        }
                    },
                    load: function() {
                        var e;
                        if (y.params.watchSlidesVisibility) y.wrapper.children("." + y.params.slideVisibleClass).each(function() {
                            y.lazy.loadImageInSlide(a(this).index())
                        });
                        else if (y.params.slidesPerView > 1)
                            for (e = y.activeIndex; e < y.activeIndex + y.params.slidesPerView; e++) y.slides[e] && y.lazy.loadImageInSlide(e);
                        else y.lazy.loadImageInSlide(y.activeIndex);
                        if (y.params.lazyLoadingInPrevNext)
                            if (y.params.slidesPerView > 1 || y.params.lazyLoadingInPrevNextAmount && y.params.lazyLoadingInPrevNextAmount > 1) {
                                var t = y.params.lazyLoadingInPrevNextAmount,
                                    s = y.params.slidesPerView,
                                    r = Math.min(y.activeIndex + s + Math.max(t, s), y.slides.length),
                                    i = Math.max(y.activeIndex - Math.max(s, t), 0);
                                for (e = y.activeIndex + y.params.slidesPerView; r > e; e++) y.slides[e] && y.lazy.loadImageInSlide(e);
                                for (e = i; e < y.activeIndex; e++) y.slides[e] && y.lazy.loadImageInSlide(e)
                            } else {
                                var n = y.wrapper.children("." + y.params.slideNextClass);
                                n.length > 0 && y.lazy.loadImageInSlide(n.index());
                                var o = y.wrapper.children("." + y.params.slidePrevClass);
                                o.length > 0 && y.lazy.loadImageInSlide(o.index())
                            }
                    },
                    onTransitionStart: function() {
                        y.params.lazyLoading && (y.params.lazyLoadingOnTransitionStart || !y.params.lazyLoadingOnTransitionStart && !y.lazy.initialImageLoaded) && y.lazy.load()
                    },
                    onTransitionEnd: function() {
                        y.params.lazyLoading && !y.params.lazyLoadingOnTransitionStart && y.lazy.load()
                    }
                }, y.scrollbar = {
                    isTouched: !1,
                    setDragPosition: function(e) {
                        var a = y.scrollbar,
                            t = y.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            s = t - a.track.offset()[y.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                            r = -y.minTranslate() * a.moveDivider,
                            i = -y.maxTranslate() * a.moveDivider;
                        r > s ? s = r : s > i && (s = i), s = -s / a.moveDivider, y.updateProgress(s), y.setWrapperTranslate(s, !0)
                    },
                    dragStart: function(e) {
                        var a = y.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), y.params.scrollbarHide && a.track.css("opacity", 1), y.wrapper.transition(100), a.drag.transition(100), y.emit("onScrollbarDragStart", y)
                    },
                    dragMove: function(e) {
                        var a = y.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), y.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), y.emit("onScrollbarDragMove", y))
                    },
                    dragEnd: function(e) {
                        var a = y.scrollbar;
                        a.isTouched && (a.isTouched = !1, y.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() {
                            a.track.css("opacity", 0), a.track.transition(400)
                        }, 1e3)), y.emit("onScrollbarDragEnd", y), y.params.scrollbarSnapOnRelease && y.slideReset())
                    },
                    enableDraggable: function() {
                        var e = y.scrollbar,
                            t = y.support.touch ? e.track : document;
                        a(e.track).on(y.touchEvents.start, e.dragStart), a(t).on(y.touchEvents.move, e.dragMove), a(t).on(y.touchEvents.end, e.dragEnd)
                    },
                    disableDraggable: function() {
                        var e = y.scrollbar,
                            t = y.support.touch ? e.track : document;
                        a(e.track).off(y.touchEvents.start, e.dragStart), a(t).off(y.touchEvents.move, e.dragMove), a(t).off(y.touchEvents.end, e.dragEnd)
                    },
                    set: function() {
                        if (y.params.scrollbar) {
                            var e = y.scrollbar;
                            e.track = a(y.params.scrollbar), y.params.uniqueNavElements && "string" == typeof y.params.scrollbar && e.track.length > 1 && 1 === y.container.find(y.params.scrollbar).length && (e.track = y.container.find(y.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = y.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = y.size / y.virtualSize, e.moveDivider = e.divider * (e.trackSize / y.size), e.dragSize = e.trackSize * e.divider, y.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", y.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function() {
                        if (y.params.scrollbar) {
                            var e, a = y.scrollbar,
                                t = (y.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * y.progress, y.rtl && y.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), y.isHorizontal() ? (y.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (y.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), y.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function(e) {
                        y.params.scrollbar && y.scrollbar.drag.transition(e)
                    }
                }, y.controller = {
                    LinearSpline: function(e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, s;
                        this.x.length;
                        this.interpolate = function(e) {
                            return e ? (s = r(this.x, e), t = s - 1, (e - this.x[t]) * (this.y[s] - this.y[t]) / (this.x[s] - this.x[t]) + this.y[t]) : 0
                        };
                        var r = function() {
                            var e, a, t;
                            return function(s, r) {
                                for (a = -1, e = s.length; e - a > 1;) s[t = e + a >> 1] <= r ? a = t : e = t;
                                return e
                            }
                        }()
                    },
                    getInterpolateFunction: function(e) {
                        y.controller.spline || (y.controller.spline = y.params.loop ? new y.controller.LinearSpline(y.slidesGrid, e.slidesGrid) : new y.controller.LinearSpline(y.snapGrid, e.snapGrid))
                    },
                    setTranslate: function(e, a) {
                        function s(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -y.translate : y.translate, "slide" === y.params.controlBy && (y.controller.getInterpolateFunction(a), i = -y.controller.spline.interpolate(-e)), i && "container" !== y.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (y.maxTranslate() - y.minTranslate()), i = (e - y.minTranslate()) * r + a.minTranslate()), y.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, y), a.updateActiveIndex()
                        }
                        var r, i, n = y.params.control;
                        if (y.isArray(n))
                            for (var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && s(n[o]);
                        else n instanceof t && a !== n && s(n)
                    },
                    setTransition: function(e, a) {
                        function s(a) {
                            a.setWrapperTransition(e, y), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                                i && (a.params.loop && "slide" === y.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }
                        var r, i = y.params.control;
                        if (y.isArray(i))
                            for (r = 0; r < i.length; r++) i[r] !== a && i[r] instanceof t && s(i[r]);
                        else i instanceof t && a !== i && s(i)
                    }
                }, y.hashnav = {
                    init: function() {
                        if (y.params.hashnav) {
                            y.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var a = 0, t = 0, s = y.slides.length; s > t; t++) {
                                    var r = y.slides.eq(t),
                                        i = r.attr("data-hash");
                                    if (i === e && !r.hasClass(y.params.slideDuplicateClass)) {
                                        var n = r.index();
                                        y.slideTo(n, a, y.params.runCallbacksOnInit, !0)
                                    }
                                }
                        }
                    },
                    setHash: function() {
                        y.hashnav.initialized && y.params.hashnav && (document.location.hash = y.slides.eq(y.activeIndex).attr("data-hash") || "")
                    }
                }, y.disableKeyboardControl = function() {
                    y.params.keyboardControl = !1, a(document).off("keydown", l)
                }, y.enableKeyboardControl = function() {
                    y.params.keyboardControl = !0, a(document).on("keydown", l)
                }, y.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, y.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), y.mousewheel.event = "wheel"
                } catch (O) {
                    (window.WheelEvent || y.container[0] && "wheel" in y.container[0]) && (y.mousewheel.event = "wheel")
                }!y.mousewheel.event && window.WheelEvent, y.mousewheel.event || void 0 === document.onmousewheel || (y.mousewheel.event = "mousewheel"), y.mousewheel.event || (y.mousewheel.event = "DOMMouseScroll")
            }
            y.disableMousewheelControl = function() {
                return y.mousewheel.event ? (y.container.off(y.mousewheel.event, p), !0) : !1
            }, y.enableMousewheelControl = function() {
                return y.mousewheel.event ? (y.container.on(y.mousewheel.event, p), !0) : !1
            }, y.parallax = {
                setTranslate: function() {
                    y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        d(this, y.progress)
                    }), y.slides.each(function() {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            d(this, a)
                        })
                    })
                },
                setTransition: function(e) {
                    "undefined" == typeof e && (e = y.params.speed), y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = a(this),
                            s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (s = 0), t.transition(s)
                    })
                }
            }, y._plugins = [];
            for (var N in y.plugins) {
                var R = y.plugins[N](y, y.params[N]);
                R && y._plugins.push(R)
            }
            return y.callPlugins = function(e) {
                for (var a = 0; a < y._plugins.length; a++) e in y._plugins[a] && y._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, y.emitterEventListeners = {}, y.emit = function(e) {
                y.params[e] && y.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (y.emitterEventListeners[e])
                    for (a = 0; a < y.emitterEventListeners[e].length; a++) y.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                y.callPlugins && y.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, y.on = function(e, a) {
                return e = u(e), y.emitterEventListeners[e] || (y.emitterEventListeners[e] = []), y.emitterEventListeners[e].push(a), y
            }, y.off = function(e, a) {
                var t;
                if (e = u(e), "undefined" == typeof a) return y.emitterEventListeners[e] = [], y;
                if (y.emitterEventListeners[e] && 0 !== y.emitterEventListeners[e].length) {
                    for (t = 0; t < y.emitterEventListeners[e].length; t++) y.emitterEventListeners[e][t] === a && y.emitterEventListeners[e].splice(t, 1);
                    return y
                }
            }, y.once = function(e, a) {
                e = u(e);
                var t = function() {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), y.off(e, t)
                };
                return y.on(e, t), y
            }, y.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function(e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function(e) {
                    13 === e.keyCode && (a(e.target).is(y.params.nextButton) ? (y.onClickNext(e), y.isEnd ? y.a11y.notify(y.params.lastSlideMessage) : y.a11y.notify(y.params.nextSlideMessage)) : a(e.target).is(y.params.prevButton) && (y.onClickPrev(e), y.isBeginning ? y.a11y.notify(y.params.firstSlideMessage) : y.a11y.notify(y.params.prevSlideMessage)), a(e.target).is("." + y.params.bulletClass) && a(e.target)[0].click())
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = y.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function() {
                    y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.a11y.makeFocusable(y.nextButton), y.a11y.addRole(y.nextButton, "button"), y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.a11y.makeFocusable(y.prevButton), y.a11y.addRole(y.prevButton, "button"), y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)), a(y.container).append(y.a11y.liveRegion)
                },
                initPagination: function() {
                    y.params.pagination && y.params.paginationClickable && y.bullets && y.bullets.length && y.bullets.each(function() {
                        var e = a(this);
                        y.a11y.makeFocusable(e), y.a11y.addRole(e, "button"), y.a11y.addLabel(e, y.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function() {
                    y.a11y.liveRegion && y.a11y.liveRegion.length > 0 && y.a11y.liveRegion.remove()
                }
            }, y.init = function() {
                y.params.loop && y.createLoop(), y.updateContainerSize(), y.updateSlidesSize(), y.updatePagination(), y.params.scrollbar && y.scrollbar && (y.scrollbar.set(), y.params.scrollbarDraggable && y.scrollbar.enableDraggable()), "slide" !== y.params.effect && y.effects[y.params.effect] && (y.params.loop || y.updateProgress(), y.effects[y.params.effect].setTranslate()), y.params.loop ? y.slideTo(y.params.initialSlide + y.loopedSlides, 0, y.params.runCallbacksOnInit) : (y.slideTo(y.params.initialSlide, 0, y.params.runCallbacksOnInit), 0 === y.params.initialSlide && (y.parallax && y.params.parallax && y.parallax.setTranslate(), y.lazy && y.params.lazyLoading && (y.lazy.load(), y.lazy.initialImageLoaded = !0))), y.attachEvents(), y.params.observer && y.support.observer && y.initObservers(), y.params.preloadImages && !y.params.lazyLoading && y.preloadImages(), y.params.autoplay && y.startAutoplay(), y.params.keyboardControl && y.enableKeyboardControl && y.enableKeyboardControl(), y.params.mousewheelControl && y.enableMousewheelControl && y.enableMousewheelControl(),
                    y.params.hashnav && y.hashnav && y.hashnav.init(), y.params.a11y && y.a11y && y.a11y.init(), y.emit("onInit", y)
            }, y.cleanupStyles = function() {
                y.container.removeClass(y.classNames.join(" ")).removeAttr("style"), y.wrapper.removeAttr("style"), y.slides && y.slides.length && y.slides.removeClass([y.params.slideVisibleClass, y.params.slideActiveClass, y.params.slideNextClass, y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), y.paginationContainer && y.paginationContainer.length && y.paginationContainer.removeClass(y.params.paginationHiddenClass), y.bullets && y.bullets.length && y.bullets.removeClass(y.params.bulletActiveClass), y.params.prevButton && a(y.params.prevButton).removeClass(y.params.buttonDisabledClass), y.params.nextButton && a(y.params.nextButton).removeClass(y.params.buttonDisabledClass), y.params.scrollbar && y.scrollbar && (y.scrollbar.track && y.scrollbar.track.length && y.scrollbar.track.removeAttr("style"), y.scrollbar.drag && y.scrollbar.drag.length && y.scrollbar.drag.removeAttr("style"))
            }, y.destroy = function(e, a) {
                y.detachEvents(), y.stopAutoplay(), y.params.scrollbar && y.scrollbar && y.params.scrollbarDraggable && y.scrollbar.disableDraggable(), y.params.loop && y.destroyLoop(), a && y.cleanupStyles(), y.disconnectObservers(), y.params.keyboardControl && y.disableKeyboardControl && y.disableKeyboardControl(), y.params.mousewheelControl && y.disableMousewheelControl && y.disableMousewheelControl(), y.params.a11y && y.a11y && y.a11y.destroy(), y.emit("onDestroy"), e !== !1 && (y = null)
            }, y.init(), y
        }
    };
    t.prototype = {
        isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function() {
            var e = navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: t || r || s,
                android: a
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                    if (a[t] in e) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var s = ["jQuery", "Zepto", "Dom7"], r = 0; r < s.length; r++) window[s[r]] && e(window[s[r]]);
    var i;
    i = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, i && ("transitionEnd" in i.fn || (i.fn.transitionEnd = function(e) {
        function a(i) {
            if (i.target === this)
                for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
        }
        var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            r = this;
        if (e)
            for (t = 0; t < s.length; t++) r.on(s[t], a);
        return this
    }), "transform" in i.fn || (i.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in i.fn || (i.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
});
//# sourceMappingURL=maps/swiper.jquery.min.js.map
});