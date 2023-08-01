import hamburger from "./modules/hamburger";
import accordion from "./modules/accordion";
import modal from "./modules/modal";
import tabs from "./modules/tabs";
import switcher from "./modules/switcher";
import slider from "./modules/slider";
import forms from "./modules/forms";
import checkTextInput from "./modules/checkTextInput";
import showMoreReviews from "./modules/showMoreReviews";
import calc from "./modules/calc"
import showPhotos from "./modules/showPhotos";
import mask from "./modules/mask";
import cookie from "./modules/cookie";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    cookie();
    hamburger('[data-btn="hamburger-open"]', '[data-btn="hamburger-close"]', '.header__nav', '.header .logo .logo__text', 'header__nav--active', 'logo__text--active', 'header__overlay');
    accordion('.question__btn', 'question__btn--active', 'question__descr--active');
    modal();
    tabs('.level__tabs', '.level__tab', '.level__content-text', 'level__tab--active', 'level__content-text--active');
    switcher('.price__switch', '.price__switch-btn', 'price__switch-btn--active', '.price__offer-num', 'price__offer-num--active');
    slider('.tutor__slide','[data-slider="left"]', '[data-slider="right"]', 'tutor__slide--active', '.tutor__wrapper');
    slider('.phrase__item','', '', 'phrase__item--active', '.phrase', true, '.phrase__buttons-btn', 'phrase__buttons-btn--active');
    forms();
    checkTextInput('[name="name"]');
    checkTextInput('[name="message"]');
    showMoreReviews('[data-load="review"]', '#review .review__list');
    calc('#modalOrderLessons', 'input[name="tutor"]', '#modalOrderPromocode', '.modal__calc', '.modal__promocode-text');
    showPhotos('.phrase__item');
    mask('[name="tel"]');
});