const switcher = () => {

    const switchWrapper = document.querySelector('.price__switch'),
        switchBtns = document.querySelectorAll('.price__switch-btn'),
        local = [13, 12, 11, 10],
        native = [15, 14, 13, 12];

    let switchContentBlock = Array.from(document.querySelectorAll('.price__offer-num'));

    switchContentBlock.map((item, i) => {
        return item.textContent = `${local[i]} €`;
    });

    switchWrapper.addEventListener('click', (e) => {
        const target = e.target;
        console.log(target.getAttribute('data-price-btn') === 'native')

        if (target.getAttribute('data-price-btn') === 'local' && !target.classList.contains('price__switch-btn--active')) {
            switchBtns.forEach(item => item.classList.remove('price__switch-btn--active'));
            target.classList.add('price__switch-btn--active');

            switchContentBlock.map((item, i) => {
                return item.textContent = `${local[i]} €`;
            });
        } 
        
        if (target.getAttribute('data-price-btn') === 'native' && !target.classList.contains('price__switch-btn--active')) {
            switchBtns.forEach(item => item.classList.remove('price__switch-btn--active'));
            target.classList.add('price__switch-btn--active');

            switchContentBlock.map((item, i) => {
                return item.textContent = `${native[i]} €`;
            });
        }
    });
};

export default switcher;