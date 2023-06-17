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

    function addModal(modalItem, activeClass, scrollNum) {
        modalItem.classList.add(activeClass);
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollNum}px`;
        if (giftBtn) {
            giftBtn.style.marginRight = `${scrollNum}px`;
        }
    }

    function initModal(openSelector, modalSelector, closeSelector, activeClass, overlayClass, deleteBtn = false) {

        const openBtns = document.querySelectorAll(openSelector),
            closeBtn = document.querySelector(closeSelector),
            modal = document.querySelector(modalSelector),
            modals = document.querySelectorAll('.modal'),
            scroll = calculateScroll();

        modals.forEach(item => {
            item.classList.remove(activeClass);
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
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
                modal.classList.add(activeClass);
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove(activeClass);
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains(overlayClass)) {
                modal.classList.remove(activeClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;

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

/*     showModalWithTime('#modalLevel', 'modal--active', 6000); */

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


    initModal('[data-btn="contact"]', '#modalContact', '#modalContact [data-btn="modal-close"]', 'modal--active', 'modal__overlay');
    initModal('[data-btn="level"]', '#modalLevel', '#modalLevel [data-btn="modal-close"]', 'modal--active', 'modal__overlay');
    initModal('[data-btn="order"]', '#modalOrder', '#modalOrder [data-btn="modal-close"]', 'modal--active', 'modal__overlay');
    initModal('[data-btn="gift"]', '#modalGift', '#modalGift [data-btn="modal-close"]', 'modal--active', 'modal__overlay', true);

};

export default modal;