const tabs = (parentSelector, tabSelector, contentSelector, activeClassTab, activeClassContent) => {
    const parent = document.querySelector(parentSelector),
        tabs = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideContent() {
        content.forEach(item => {
            item.classList.remove(activeClassContent)
        });

        tabs.forEach(item => {
            item.classList.remove(activeClassTab);
        });
    }

    function showContent(i = 0) {
        content[i].classList.add(activeClassContent);
        tabs[i].classList.add(activeClassTab);
    }

    hideContent();
    showContent();

    parent.addEventListener('click', (e) => {
        const target = e.target;

        if ((target.classList.contains(tabSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) && (!target.classList.contains(activeClassTab) && target)) {
            tabs.forEach((item, i) => {
                if (item === target || item === target.parentNode) { 
                    // parentNode для того, щоб дочірні ел посилались на головний таргет
                    hideContent();
                    showContent(i);
                }
            });
        };
    });

    parent.addEventListener('keydown', (e) => {
        const target = e.target;

        if ((target.classList.contains(tabSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) && (!target.classList.contains(activeClassTab) && target) && e.key === 'Enter') {
            tabs.forEach((item, i) => {
                if (item === target || item === target.parentNode) { 
                    // parentNode для того, щоб дочірні ел посилались на головний таргет
                    hideContent();
                    showContent(i);
                }
            });
        };
    });
};

export default tabs;