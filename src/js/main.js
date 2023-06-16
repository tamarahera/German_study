import hamburger from "./modules/hamburger";
import accordion from "./modules/accordion";
import modal from "./modules/modal";
import tabs from "./modules/tabs";
import switcher from "./modules/switcher";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    hamburger('[data-btn="hamburger-open"]', '[data-btn="hamburger-close"]', '.header__nav', '.header .logo .logo__text', 'header__nav--active', 'logo__text--active', 'header__overlay');
    accordion('.question__btn', 'question__btn--active', 'question__descr--active');
    modal();
    tabs('.level__tabs', '.level__tab-btn', '.level__content-text', 'level__tab-btn--active', 'level__content-text--active');
    switcher();
});