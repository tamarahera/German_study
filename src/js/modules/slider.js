const slider = (slidesSelector, prev, next, activeClassSlide, sliderWrapperSelector, multipleSlides = false, sliderDotSelector = false, activeClassDot = false) => {
    let slideIndex = 6,
        paused = false;
    const slideItems = document.querySelectorAll(slidesSelector),
        sliderWrapper = document.querySelector(sliderWrapperSelector),
        dots = document.querySelectorAll(sliderDotSelector);

    function showSlides(n, slideAmount = 1) {
        if (n > slideItems.length - 1) {
            slideIndex = 0;
        }

        if (n < 0) {
            slideIndex = slideItems.length - 1;
        }

        slideItems.forEach(item => {
            item.classList.add('animate__animated');
            item.classList.remove(activeClassSlide);
        });

        if (multipleSlides === true) {
            dots.forEach(item => {
                item.classList.remove(activeClassDot);
            });
            slideItems.forEach((item, index) => {

                let slideIndexEnd = slideIndex + slideAmount - 1;

                if (slideIndexEnd > slideItems.length - 1) {
                    slideIndex = 0;
                }

                if (index >= slideIndex && index <= slideIndexEnd) {
                    item.classList.add(activeClassSlide);
                    item.classList.add('animate__slideInRight');

                    dots[index].classList.add(activeClassDot);

                    setTimeout(() => {
                        item.classList.remove('animate__slideInRight');
                    }, 1000);
                }
            });
        } else {
            slideItems[slideIndex].classList.add(activeClassSlide);
        }
    };
    function plusSlide(n, slideAmount = 1) {
        showSlides(slideIndex += n, slideAmount);
    }

    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlide(-1);
            slideItems[slideIndex].classList.remove('animate__fadeInLeft');
            slideItems[slideIndex].classList.add('animate__fadeInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlide(1);
            slideItems[slideIndex].classList.add('animate__fadeInLeft');
            slideItems[slideIndex].classList.remove('animate__fadeInRight');
        });
    } catch (e) {
    }

    function activateAnimation() {
        paused = setInterval(function () {
            plusSlide(1);
            slideItems[slideIndex].classList.add('animate__fadeInLeft');
            slideItems[slideIndex].classList.remove('animate__fadeInRight');
        }, 3000);
    }

    function activateAnimationMultiple(slideAmount, time) {
        paused = setInterval(function () {
            plusSlide(1, slideAmount);
        }, time);
    }

    if (multipleSlides === false) {
        activateAnimation();
        sliderWrapper.addEventListener('mouseleave', () => {
            activateAnimation();
        });
        sliderWrapper.addEventListener('mouseenter', () => {
            clearInterval(paused);
        });
    }

    function setSliderByWindowSize() {
        let slideAmount,
            time;

        if (window.matchMedia("(min-width: 1201px)").matches) {
            slideAmount = 4;
            time = 5000;

            activateAnimationMultiple(slideAmount, time);
            showSlides(1, slideAmount);

            sliderWrapper.addEventListener('mouseleave', () => {
                activateAnimationMultiple(slideAmount, time);
            });
            sliderWrapper.addEventListener('mouseenter', () => {
                clearInterval(paused);
            });

        } else if (window.matchMedia("(max-width: 1200px) and (min-width: 993px)").matches) {
            slideAmount = 3;
            time = 5000;
            showSlides(1, slideAmount);
            sliderWrapper.addEventListener('mouseleave', () => {
                activateAnimationMultiple(slideAmount, time);
            });
            sliderWrapper.addEventListener('mouseenter', () => {
                clearInterval(paused);
            });
        } else if (window.matchMedia("(max-width: 992px) and (min-width: 575px)").matches) {
            slideAmount = 2;
            time = 4000;
            showSlides(1, slideAmount);

            activateAnimationMultiple(slideAmount, time);
        } else if (window.matchMedia("(max-width: 576px)").matches) {
            time = 3000;
            slideAmount = 1;

            showSlides(1, slideAmount);
            activateAnimationMultiple(slideAmount, time);
        }
        dots.forEach((item, index) => {
            item.addEventListener('click', (e) => {

                if ((index >= dots.length - slideAmount) && !e.target.classList.contains(activeClassDot)) {
                    clearInterval(paused);
                    slideIndex = dots.length - slideAmount;
                    showSlides(1, slideAmount);

                    return;
                }
                if (!(index >= dots.length - slideAmount) && !e.target.classList.contains(activeClassDot)) {
                    clearInterval(paused);
                    slideIndex = index;
                    showSlides(1, slideAmount);

                    return;
                }
            });
        });
    }

    if (multipleSlides === true) {
        setSliderByWindowSize();
        window.screen.orientation.addEventListener('change', () => {
            clearInterval(paused);
            setSliderByWindowSize();
        });
    }
}

export default slider;