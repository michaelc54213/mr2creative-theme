!function(t,o,e){"use strict";function i(i){t(o).height(),t(e).height()}function n(o){t(o.controlbox).append(o.settings.preloadHtml),o.settings.preloadCallback&&o.settings.preloadCallback.call(o)}function s(o){var e,i=o.find("video").get(0);e=o.settings.controlPosition?t(o.settings.controlPosition).find(".video-background-play a"):o.find(".video-background-play a"),i.paused?(i.play(),e.toggleClass("icon-pause icon-play").text(o.settings.controlText[1])):i.ended?(i.play(),e.toggleClass("icon-pause icon-play").text(o.settings.controlText[1])):(i.pause(),e.toggleClass("icon-pause icon-play").text(o.settings.controlText[0]))}function a(o){var e,i=o.find("video").get(0);e=o.settings.controlPosition?t(o.settings.controlPosition).find(".video-background-mute a"):o.find(".video-background-mute a"),0===i.volume?(i.volume=1,e.toggleClass("icon-volume-on icon-volume-off").text(o.settings.controlText[2])):(i.volume=0,e.toggleClass("icon-volume-on icon-volume-off").text(o.settings.controlText[3]))}function l(o){o.settings.resize&&t(e).on("resize",function(){i(o)}),o.controls.find(".video-background-play a").on("click",function(t){t.preventDefault(),s(o)}),o.controls.find(".video-background-mute a").on("click",function(t){t.preventDefault(),a(o)}),o.settings.loop&&o.find("video").on("ended",function(){t(this).get(0).play(),t(this).toggleClass("paused").text(o.settings.controlText[1])})}function d(o){t(o.controlbox).html(o.controls),l(o),o.settings.loadedCallback&&o.settings.loadedCallback.call(o)}var c={init:function(e){return this.each(function(){var s,a,l=t(this),c="",r="",u=l.data("video-options");o.createElement("video").canPlayType?(l.settings=t.extend(!0,{},t.fn.videobackground.defaults,u,e),l.settings.initialised||(l.settings.initialised=!0,l.settings.resize&&i(l),t.each(l.settings.videoSource,function(){a="[object Array]"===Object.prototype.toString.call(this),c=a&&void 0!==this[1]?c+'<source src="'+this[0]+'" type="'+this[1]+'">':a?c+'<source src="'+this[0]+'">':c+'<source src="'+this+'">'}),r=r+'preload="'+l.settings.preload+'"',l.settings.poster&&(r=r+' poster="'+l.settings.poster+'"'),l.settings.autoplay&&(r+=' autoplay="autoplay"'),l.settings.loop&&(r+=' loop="loop"'),l.settings.muted&&(r+=' muted="muted"'),t(l).html("<video "+r+">"+c+"</video>"),l.controlbox=t('<div class="video-background widget widget-content corner-all"></div>'),l.settings.controlPosition?t(l.settings.controlPosition).append(l.controlbox):t(l).append(l.controlbox),l.controls=t('<ul class="video-background-controls"><li class="video-background-play"><a class="icon icon-pause" href="#">'+l.settings.controlText[1]+'</a></li><li class="video-background-mute"><a class="icon icon-volume-on" href="#">'+l.settings.controlText[2]+"</a></li></ul>"),l.settings.preloadHtml||l.settings.preloadCallback?(n(l),l.find("video").on("canplaythrough",function(){l.settings.autoplay&&l.find("video").get(0).play(),d(l)})):l.find("video").on("canplaythrough",function(){l.settings.autoplay&&l.find("video").get(0).play(),d(l)}),l.data("video-options",l.settings))):(l.settings=t.extend(!0,{},t.fn.videobackground.defaults,u,e),l.settings.initialised||(l.settings.initialised=!0,l.settings.poster&&(s=t('<img class="video-background-poster" src="'+l.settings.poster+'">'),l.append(s)),l.data("video-options",l.settings)))})},play:function(o){return this.each(function(){var e=t(this),i=e.data("video-options");e.settings=t.extend(!0,{},i,o),e.settings.initialised&&(s(e),e.data("video-options",e.settings))})},mute:function(o){return this.each(function(){var e=t(this),i=e.data("video-options");e.settings=t.extend(!0,{},i,o),e.settings.initialised&&(a(e),e.data("video-options",e.settings))})},resize:function(o){return this.each(function(){var e=t(this),n=e.data("video-options");e.settings=t.extend(!0,{},n,o),e.settings.initialised&&(i(e),e.data("video-options",e.settings))})},destroy:function(i){return this.each(function(){var n=t(this),s=n.data("video-options");n.settings=t.extend(!0,{},s,i),n.settings.initialised&&(n.settings.initialised=!1,o.createElement("video").canPlayType?(n.find("video").off("ended"),n.settings.controlPosition?(t(n.settings.controlPosition).find(".video-background-mute a").off("click"),t(n.settings.controlPosition).find(".video-background-play a").off("click")):(n.find(".video-background-mute a").off("click"),n.find(".video-background-play a").off("click")),t(e).off("resize"),n.find("video").off("canplaythrough"),n.settings.controlPosition?t(n.settings.controlPosition).find(".video-background").remove():n.find(".video-background").remove(),t("video",n).remove()):n.settings.poster&&n.find(".video-background-poster").remove(),n.removeData("video-options"))})}};t.fn.videobackground=function(o){return this.length?c[o]?c[o].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof o&&o?void t.error("Method "+o+" does not exist on jQuery.videobackground"):c.init.apply(this,arguments):this},t.fn.videobackground.defaults={videoSource:[],poster:null,autoplay:!0,preload:"auto",loop:!0,controlPosition:null,controlText:["Play","Pause","Mute","Unmute"],resize:!0,preloadHtml:"",preloadCallback:null,loadedCallback:null,resizeTo:"document"}}(jQuery,document,window);