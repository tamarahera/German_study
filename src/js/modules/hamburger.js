const hamburger = (btnOpen, btnClose, menuClass, logoText, headerActiveClass, logoActiveClass, overlayClass) => {
    const hamburgerBtnOpen = document.querySelector(btnOpen),
        hamburgerBtnClose = document.querySelector(btnClose),
        menu = document.querySelector(menuClass),
        logo = document.querySelector(logoText);

    if (menu.classList.contains(headerActiveClass) && !logo.classList.contains(logoActiveClass)) {
        logo.classList.add(logoActiveClass);
    }
    
    function openMenu() {
        menu.classList.add(headerActiveClass);
        logo.classList.add(logoActiveClass);
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        menu.classList.remove(headerActiveClass);
        logo.classList.remove(logoActiveClass);
        document.body.style.overflow = '';
    }

    hamburgerBtnOpen.addEventListener('click', () => {
        if (!menu.classList.contains(headerActiveClass)) {
            openMenu();
        }
    });

    hamburgerBtnClose.addEventListener('click', () => {
        if (menu.classList.contains(headerActiveClass)) {
            closeMenu();
        }
    });

    menu.parentElement.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && menu.classList.contains(headerActiveClass) || e.target.classList.contains(overlayClass)) {
            closeMenu();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (menu.classList.contains(headerActiveClass) && e.key === 'Escape') {
            closeMenu();
        }
    });
}

export default hamburger;