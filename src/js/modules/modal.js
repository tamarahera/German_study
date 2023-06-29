const modal = () => {
    let onceOpenModal = false;
    const giftBtn = document.querySelector('[data-btn="gift"]');

    function closeModal(modalItem, activeClass) {
        modalItem.classList.remove(activeClass);
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
        if (giftBtn) {
            giftBtn.style.marginRight = `0px`;
        }
    }

    function openModal(modalItem, activeClass, scrollNum) {
        modalItem.classList.add(activeClass);
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollNum}px`;
        if (giftBtn) {
            giftBtn.style.marginRight = `${scrollNum}px`;
        }
    }

    function initModal(modalSelector, activeClass, overlayClass, openSelector, closeSelector = false, deleteBtn = false, openImg = false) {

        const modal = document.querySelector(modalSelector),
            modals = document.querySelectorAll('.modal'),
            openBtns = document.querySelectorAll(openSelector),
            scroll = calculateScroll();

        modals.forEach(item => {
            closeModal(item, activeClass);
        });

        openBtns.forEach(item => {
            item.addEventListener('click', (e) => {
                onceOpenModal = true;

                if (e.target) {
                    e.preventDefault();
                }
                if (deleteBtn) {
                    item.remove();
                    window.removeEventListener('scroll', initScroll);
                }

                if (openImg) {
                    let img = modal.querySelector('img'),
                        p = modal.querySelector('p'),
                        href = e.currentTarget.getAttribute('href'),
                        subtitle = href.replace(/(.*\/)|(\.\w*)/gi, '').replace(/_/gi, ' ');

                    img.setAttribute('src', href);
                    img.setAttribute('alt', subtitle)
                    p.textContent = `${subtitle}, Germany`
                }

                openModal(modal, activeClass, scroll);
            });
        });

        try {
            const closeBtn = document.querySelector(closeSelector);

            closeBtn.addEventListener('click', () => {
                closeModal(modal, activeClass);
            });
        } catch {}
      
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains(overlayClass)) {
                closeModal(modal, activeClass);
            };
        });


    };

    function showModalWithTime(modalSelector, activeClass, time) {
        setTimeout(() => {
            const modals = document.querySelectorAll('.modal'),
                modalsDisplay = Array.from(modals).some((item) => {
                    return item.classList.contains('modal--active');
                });

            if (!modalsDisplay) {
                document.querySelector(modalSelector).classList.add(activeClass);
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    };

    showModalWithTime('#modalLevel', 'modal--active', 60000);

    function calculateScroll() {
        let block = document.createElement('div');
        block.style.width = '100px';
        block.style.height = '100px';
        block.style.overflowY = 'scroll';
        block.style.visibility = 'hidden';

        document.body.appendChild(block);

        let scrollWidth = block.offsetWidth - block.clientWidth;
        block.remove();

        return scrollWidth;
    }

    function initScroll() {
        openByScroll('[data-btn="gift"]');
    }

    function openByScroll(btnSelector) {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - 5;
        // element - для стандартних браузерів
        // body - для більш старих

        if (!onceOpenModal && (window.scrollY + document.documentElement.clientHeight >= scrollHeight)) {
            document.querySelector(btnSelector).click();
            window.removeEventListener('scroll', initScroll);
        }
        // scrollY - скільки зверху пролистано
        // clientHeight - те що бачить користувач зараз
        // scrollHeight - повна висота документу
    }
    window.addEventListener('scroll', initScroll);


    initModal('#modalContact', 'modal--active', 'modal__overlay', '[data-btn="contact"]', '#modalContact [data-btn="modal-close"]');
    initModal('#modalLevel', 'modal--active', 'modal__overlay', '[data-btn="level"]',);
    initModal('#modalOrder', 'modal--active', 'modal__overlay', '[data-btn="order"]', '#modalLevel [data-btn="modal-close"]');
    initModal('#modalGift', 'modal--active', 'modal__overlay', '[data-btn="gift"]', '#modalGift [data-btn="modal-close"]', true);
    initModal('#modalImg', 'modal--active', 'modal__overlay', '.phrase__item-link', false, false, true);

};

export default modal;