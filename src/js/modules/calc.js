const calc = (lessons, tutor, promocode, result, promocodeSuccess) => {
    const lessonsBlock = document.querySelector(lessons),
        tutorBlocks = Array.from(document.querySelectorAll(tutor)),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result),
        promocodeMessage = document.querySelector(promocodeSuccess)

    let sum = 0;

    const calcFunc = () => {
        let hourPrice,
            courseName,
            tutorBlock = tutorBlocks.find(item => item.checked);

        switch (+lessonsBlock.value) {
            case 5:
                hourPrice = 13;
                courseName = 'Minimum';
                break;
            case 10:
                hourPrice = 12;
                courseName = 'Economical';
                break;
            case 15:
                hourPrice = 11;
                courseName = 'Normally';
                break;
            case 20:
                hourPrice = 10;
                courseName = 'Advanced';
                break;
        }

        if (tutorBlock.value === 'native') {
            hourPrice = hourPrice + 2;
        }

        sum = Math.round(hourPrice * (+lessonsBlock.value));

        if (lessonsBlock == '' || tutorBlocks == '') {
            resultBlock.textContent = 'Please, choose an amount of lessons and a tutor';
            return;
        } 
        
        if (promocodeBlock.value === 'MOINMOIN') {
            sum = Math.round(sum - (hourPrice * 2));
            promocodeMessage.classList.add('modal__promocode-text--active');
        } else {
            promocodeMessage.classList.remove('modal__promocode-text--active');
        }
        
        resultBlock.innerHTML = `
            <b class="modal__calc-course">${courseName}</b>
            <p class="modal__calc-lessons"><b>${+lessonsBlock.value}</b> lessons with a ${tutorBlock.value} tutor</p>
            <p class="modal__calc-price">
                Price for an one lesson: <b>${hourPrice} €</b><br>
                Total price: <input class="modal__calc-total" name="sum" value="${sum}€">
            </p>
        `;

    };
    calcFunc();
    lessonsBlock.addEventListener('change', calcFunc);
    tutorBlocks.forEach(item => {
        item.addEventListener('input', calcFunc);
    });
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;