// ==UserScript==
// @name         SharePoint - Dark Theme Shell Fix
// @namespace    https://texomans.com/
// @version      1.0.0
// @description  Fixes Microsoft's bright SharePoint app-bar shell for dark themes.
// @match        https://*.sharepoint.com/*
// @updateURL    https://raw.githubusercontent.com/texomans/TamperMonkey-Other/main/SharePoint%20-%20Dark%20Theme%20Shell%20Fix.js
// @downloadURL  https://raw.githubusercontent.com/texomans/TamperMonkey-Other/main/SharePoint%20-%20Dark%20Theme%20Shell%20Fix.js
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const DARK = '#152b38';
    const LIGHT = '#f5f5f5';

    /*
     * Use CSS for the stable SharePoint shell elements.
     *
     * Important:
     * The real root is #sp-appBar — note the hyphen.
     */
    const style = document.createElement('style');

    style.textContent = `

        /* =========================================================
           SHAREPOINT APP BAR ROOT
           ========================================================= */

        #sp-appBar,
        #sp-appBar::before,
        #sp-appBar::after {
            background: ${DARK} !important;
            background-color: ${DARK} !important;
            border-color: ${DARK} !important;
        }


        /* =========================================================
           FLUENT PROVIDER / APP BAR WRAPPERS
           ========================================================= */

        #sp-appBar > .fui-FluentProvider,
        #sp-appBar > .fui-FluentProvider > div {
            background-color: ${DARK} !important;
        }


        /* =========================================================
           PORTAL-SLOT AREA
           ========================================================= */

        #spAppBarPortalSlot,
        #spAppBarPortalSlot::before,
        #spAppBarPortalSlot::after,
        #spAppBarPortalSlot > * {
            background: ${DARK} !important;
            background-color: ${DARK} !important;
            border-color: ${DARK} !important;
        }

        /*
         * The portal slot itself is empty, but its parent is a
         * Microsoft-generated Fluent wrapper. :has() lets us target
         * that wrapper without using Microsoft's randomized classes.
         */
        #sp-appBar div:has(> #spAppBarPortalSlot) {
            background: ${DARK} !important;
            background-color: ${DARK} !important;
            border-color: ${DARK} !important;
        }


        /* =========================================================
           MAIN APP BAR
           ========================================================= */

        #sp-appBar .spui-AppBar,
        #sp-appBar .fui-Overflow {
            background-color: ${DARK} !important;
            border-color: ${DARK} !important;
            color: ${LIGHT} !important;
        }


        /* =========================================================
           BUTTONS
           ========================================================= */

        #sp-appBar .spui-AppBarItem {
            background-color: transparent !important;
            border-color: transparent !important;
            color: ${LIGHT} !important;
        }


        /* =========================================================
           ICONS
           ========================================================= */

        #sp-appBar .spui-AppBarItem svg,
        #sp-appBar .spui-AppBarItem svg path,
        #sp-appBar .spui-AppBarAvatar,
        #sp-appBar .spui-AppBarAvatar__icon {
            color: ${LIGHT} !important;
            fill: currentColor !important;
        }


        /* =========================================================
           LABELS
           ========================================================= */

        #sp-appBar .spui-AppBarItem__content {
            color: ${LIGHT} !important;
        }


        /* =========================================================
           DIVIDERS
           ========================================================= */

        #sp-appBar [data-overflow-divider] {
            background-color: rgba(255,255,255,0.12) !important;
            height: 1px !important;
            min-height: 1px !important;
            margin: 3px 10px !important;
            border: none !important;
        }

    `;

    document.documentElement.appendChild(style);


    /*
     * SharePoint can rebuild the app-bar DOM during SPA navigation.
     * Reinforce the two stable shell elements when that happens.
     */
    function applyFix() {
        const root = document.getElementById('sp-appBar');

        if (root) {
            root.style.setProperty(
                'background-color',
                DARK,
                'important'
            );
        }

        const portal = document.getElementById('spAppBarPortalSlot');

        if (portal) {
            portal.style.setProperty(
                'background-color',
                DARK,
                'important'
            );

            if (portal.parentElement) {
                portal.parentElement.style.setProperty(
                    'background-color',
                    DARK,
                    'important'
                );
            }
        }
    }


    applyFix();


    let scheduled = false;

    const observer = new MutationObserver(() => {
        if (scheduled) return;

        scheduled = true;

        requestAnimationFrame(() => {
            scheduled = false;
            applyFix();
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
