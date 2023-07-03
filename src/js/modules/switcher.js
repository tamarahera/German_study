const switcher = (switchWrapperSelector, switchBtnsSelector, activeClassBtn, numSelector, activeClassNum) => {

    const switchWrapper = document.querySelector(switchWrapperSelector),
        switchBtns = document.querySelectorAll(switchBtnsSelector),
        local = [13, 12, 11, 10],
        native = [15, 14, 13, 12];

    let switchContentBlock = Array.from(document.querySelectorAll(numSelector));

    switchContentBlock.map((item, i) => {
        return item.textContent = `${local[i]} €`;
    });

    switchWrapper.addEventListener('click', (e) => {
        const target = e.target;

        if (target.getAttribute('data-price-btn') === 'local' && !target.classList.contains(activeClassBtn)) {
            switchBtns.forEach(item => item.classList.remove(activeClassBtn));
            target.classList.add(activeClassBtn);

            switchContentBlock.map((item, i) => {
                item.classList.toggle(activeClassNum);
                return item.textContent = `${local[i]} €`;
            });
        } 
        
        if (target.getAttribute('data-price-btn') === 'native' && !target.classList.contains(activeClassBtn)) {
            switchBtns.forEach(item => item.classList.remove(activeClassBtn));
            target.classList.add(activeClassBtn);

            switchContentBlock.map((item, i) => {
                item.classList.toggle(activeClassNum);
                return item.textContent = `${native[i]} €`;
            });
        }
    });
};

export default switcher;