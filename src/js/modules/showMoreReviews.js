import { getResource } from "../services/requests";

const showMoreReviews = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    btn.addEventListener('click', function() {
        getResource('db.json') //http://localhost:3000/data
            .then(res => createCards(res.data)) // res
            .catch(error => console.log(error));

        this.remove();
    });

    function createCards(response) {
        response.forEach(({name, date, src, text, rating}) => {
            let card = document.createElement('li'),
                starsBlock = document.createElement('ul'),
                star = document.createElement('li');

            card.classList.add('review__item', 'animate__animated', 'animate__fadeInUp');
            starsBlock.classList.add('review__star-list');
            star.classList.add('review__star-item');
            star.innerHTML = `<img src="icons/star-solid.svg" alt="star" class="review__star-img">`

            for (let i = 1; i <= 5; i++) {
                if (i <= +rating) {
                    starsBlock.innerHTML += `
                        <li class="review__star-item">
                            <img src="icons/star-solid.svg" alt="star"
                            class="review__star-img">
                        </li>
                    `
                } else {
                    starsBlock.innerHTML += `
                        <li class="review__star-item">
                            <img src="icons/star-inline.svg" alt="star-inline"
                            class="review__star-img">
                        </li>
                    `
                }
            }

            card.innerHTML = `
                <div class="review__box">
                    <img src=${src} alt="review" class="review__box-img">
                </div>
                <h3 class="subtitle review__name">${name}</h3>
                <p class="review__date">${date}</p>
                ${starsBlock.outerHTML}
                <p class="review__text">${text}</p>
                <i class="review__translate">*Translated from German</i>
            `

            document.querySelector(wrapper).appendChild(card);
        });
    }
}

export default showMoreReviews;