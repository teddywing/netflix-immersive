// ==UserScript==
// @name Netflix Immersive
// @description Netflix user script providing a more immersive experience
// @version 0.0.1
// @namespace com.teddywing
// @run-at document-idle
// @match https://www.netflix.com/*
// ==/UserScript==

// Copyright (c) 2020  Teddy Wing
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var controls = {
    // Hide playback controls.
    hide: function () {
        logger_1.default.debug('hide():', 'Hiding controls');
        // When the player is activated, the mouse cursor is shown.
        hide_cursor();
        var controls_el = document.querySelector('.PlayerControlsNeo__layout.PlayerControlsNeo__layout--active');
        logger_1.default.debug('hide():', 'Controls:', controls_el);
        controls_el
            .classList
            .replace('PlayerControlsNeo__layout--active', 'PlayerControlsNeo__layout--inactive');
    }
};
exports.default = controls;
// Hide the cursor, which appears due to the `active` CSS class when the player
// is reactivated.
function hide_cursor() {
    var style_el = document.createElement('style');
    // Hide the cursor.
    function style() {
        document.head.appendChild(style_el);
        var stylesheet = style_el.sheet;
        stylesheet.insertRule("\n\t\t\t.NFPlayer.nf-player-container.active {\n\t\t\t\tcursor: none !important;\n\t\t\t}", stylesheet.cssRules.length);
    }
    // When the player reappears, set it to inactive.
    function set_player_inactive() {
        var observer = new MutationObserver(function (mutation_list) {
            for (var i = 0; i < mutation_list.length; i++) {
                var mutation = mutation_list[i];
                var player = mutation.target;
                if (player.classList.contains('active')) {
                    player.classList.replace('active', 'inactive');
                    document.head.removeChild(style_el);
                    observer.disconnect();
                    return;
                }
            }
        });
        observer.observe(document.querySelector('.NFPlayer.nf-player-container'), {
            attributeFilter: ['class']
        });
    }
    set_player_inactive();
    style();
}

},{"./logger":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controls_1 = require("./controls");
var wait_element_1 = require("./wait_element");
// Prevent credits from being minimised.
function init_mutation_observer(player) {
    var observer = new MutationObserver(function (mutation_list) {
        for (var i = 0; i < mutation_list.length; i++) {
            var mutation = mutation_list[i];
            var player_1 = mutation.target;
            // The `postplay` class minimises the movie. Remove it if it gets
            // added to remain in full frame.
            if (player_1.classList.contains('postplay')) {
                player_1.classList.remove('postplay');
                // Playback controls are removed when postplay is activated.
                // Re-enable them.
                player_1.click();
                // Activating playback controls makes them visible. Keep them
                // hidden.
                controls_1.default.hide();
                return;
            }
        }
    });
    observer.observe(player, {
        attributeFilter: ['class']
    });
}
// Initialise the mutation observer when the video player becomes available.
function init() {
    wait_element_1.default('.NFPlayer.nf-player-container')
        .then(function (player) {
        init_mutation_observer(player);
    });
}
exports.default = init;

},{"./controls":1,"./wait_element":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fullscreen_credits_1 = require("./fullscreen_credits");
var logger_1 = require("./logger");
var styles_1 = require("./styles");
var watch_credits_1 = require("./watch_credits");
function main() {
    logger_1.default.debug('Initialising');
    styles_1.default();
    fullscreen_credits_1.default();
    watch_credits_1.default();
}
main();
// Reinitialise when the page changes.
window.onpopstate = main;

},{"./fullscreen_credits":2,"./logger":4,"./styles":5,"./watch_credits":7}],4:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    debug: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.debug.apply(console, __spreadArrays(['Immersive:'], args));
    }
};

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Adds CSS to the page to hide superfluous user interface elements.
function styles() {
    var style = document.createElement('style');
    document.head.appendChild(style);
    var stylesheet = style.sheet;
    // 2021.08.13: May want to remove `.player-view-childrens`, which is now
    // replaced by `.advisory-container`.
    stylesheet.insertRule("\n\t\t/* \"Back to Browse\" button that appears when credits are minimised. */\n\t\t.OriginalsPostPlay-BackgroundTrailer .BackToBrowse,\n\n\t\t/* Age rating. */\n\t\t.player-view-childrens,\n\t\t.advisory-container,\n\n\t\t/* \"Watch Credits\" button. */\n\t\t[data-uia=\"watch-credits-seamless-button\"],\n\n\t\t/* Skip buttons. */\n\t\ta[aria-label=\"Skip Intro\"],\n\t\ta[aria-label=\"Skip Recap\"],\n\t\ta[aria-label=\"Next Episode\"],\n\t\t[data-uia=\"next-episode-seamless-button\"] {\n\t\t\tvisibility: hidden !important;\n\t\t}", stylesheet.cssRules.length);
    stylesheet.insertRule("\n\t\t/* Remove white border around credits. */\n\t\t.NFPlayer.can-resume:hover {\n\t\t\tborder: none !important;\n\t\t}", stylesheet.cssRules.length);
}
exports.default = styles;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
// Wait for the element corresponding to `selector` to be added to the page,
// checking every second until it appears.
function wait_element(selector) {
    return new Promise(function (resolve) {
        var interval = setInterval(function () {
            var element = document.querySelector(selector);
            if (element) {
                logger_1.default.debug('wait_element():', 'found', element);
                clearInterval(interval);
                resolve(element);
            }
        }, 1000);
    });
}
exports.default = wait_element;

},{"./logger":4}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controls_1 = require("./controls");
var logger_1 = require("./logger");
var wait_element_1 = require("./wait_element");
// Remove the "Watch Credits" button.
function init_mutation_observer(controls_el) {
    var observer = new MutationObserver(function (mutation_list) {
        for (var i = 0; i < mutation_list.length; i++) {
            var mutation = mutation_list[i];
            var element = mutation.target;
            var watch_credits_button = element.querySelector('[data-uia="watch-credits-seamless-button"]');
            if (watch_credits_button) {
                logger_1.default.debug('watch_credits', 'init_mutation_observer()', 'found Watch Credits button', watch_credits_button);
                var pointer_event = new PointerEvent('pointerdown', { bubbles: true });
                watch_credits_button.dispatchEvent(pointer_event);
                // When playback controls return as a result of having pressed
                // "Watch Credits", they become visible. Keep them hidden.
                controls_1.default.hide();
                return;
            }
        }
    });
    observer.observe(controls_el, {
        childList: true,
        subtree: true
    });
}
// Initialise the mutation observer when playback controls become available.
function init() {
    wait_element_1.default('.PlayerControlsNeo__all-controls')
        .then(function (controls_el) {
        logger_1.default.debug('Controls element:', controls_el);
        init_mutation_observer(controls_el);
    });
}
exports.default = init;

},{"./controls":1,"./logger":4,"./wait_element":6}]},{},[3]);
