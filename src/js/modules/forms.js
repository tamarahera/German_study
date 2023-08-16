import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        textareas = document.querySelectorAll('textarea'),
        inputPhone = document.querySelector('input[name="tel"]');

    inputPhone.addEventListener('input', () => {
        inputPhone.value = inputPhone.value.replace(/[^-0-9\+\(\)]/, '');
    });

    const message = {
        loading: 'Loading...',
        success: 'Thanks! We will answer as soon as possible.',
        error: 'Something goes wrong.',
        spinner: 'icons/spinner.gif',
        ok: 'icons/ok.svg',
        fail: 'icons/fail.svg'
    };

    const path = {
        question: 'server.php',
        order: 'order.php'
    }

    const resetInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        textareas.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div'); // ств блок, а який вставимо повідомлення для корист
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage); // ставимо повідомлення за межами форми

            item.classList.add('animate__animated', 'animate__fadeOutUp'); // cама форма має щезнути
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animate__animated', 'animate__fadeInUp', 'status__img');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            textMessage.classList.add('status__text');
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item); // або JSON

            let api;
            item.closest('#modalOrder') ? api = path.order : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(result => {
                    console.log(result);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    resetInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('animate__fadeOutUp'); 
                        item.classList.add('animate__fadeInDown');
                    }, 4000);
                })
        });
    });
}

export default forms;