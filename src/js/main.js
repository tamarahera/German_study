import hamburger from "./modules/hamburger";

import switcher from "./modules/switcher";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    hamburger('[data-btn="hamburger-open"]', '[data-btn="hamburger-close"]', '.header__nav', '.header .logo .logo__text', 'header__nav--active', 'logo__text--active', 'header__overlay');

});