const showPhotos = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showImg (block) {
        const img = block.querySelector('img'),
            text = block.querySelector('p');

        img.classList.add('phrase__item-img--active', 'animate__animated', 'animate__fadeIn', 'animate__faster');
        text.classList.remove('phrase__item-text--active');
    }

    function hideImg (block) {
        const img = block.querySelector('img'),
            text = block.querySelector('p');

        img.classList.remove('phrase__item-img--active');
        text.classList.add('phrase__item-text--active','animate__animated', 'animate__fadeIn', 'animate__faster');
    }

    blocks.forEach(item => {
        item.querySelector('.phrase__item-text').classList.add('phrase__item-text--active');

        item.addEventListener('mouseover', () => {
            showImg(item);
        });

        item.addEventListener('mouseout', () => {
            hideImg(item);
        });
    });
}

export default showPhotos;