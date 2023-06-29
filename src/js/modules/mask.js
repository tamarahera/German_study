const mask = (inputSelector) => {

    let setCursorPosition = (position, element) => {
        element.focus();

        if (element.setSelectionRange) { // виділяє текст від до
            element.setSelectionRange(position, position); // виділяє не текст, а ставить курсор в певну позицію
        } else if (element.createTextRange) { // поліфіл для ie
            let range = element.createTextRange();

            range.collapse(true); // об'єднує граничні точки діапазону
            range.moveEnd('character', position); // кінцева точка виділення
            range.moveStart('character', position); // стартова точка виділення
            range.select(); //виділимо знач.
        }
    };

    function createMask(event) {
        let matrix = '+_ (___) ___ __ __', //можна задати через json
            i = 0,
            def = matrix.replace(/\D/g, ''), //всі не цифри видаляються, статичне значення
            val = this.value.replace(/\D/g, ''); //динамічне значення

        console.log(matrix)
        console.log(def)
        console.log(val)

        if (def.length >= val.length) { // коли хоче видалити + з матриці, не даємо йому це зробити
            val = def;
        }

        this.value = matrix.replace(/./g, function (a) { // a - кожен символ в матриці
            // return (/[_\d]/.test(a) && i < val.length) ? val.charAt(i++) : i >= val.length ? '' : a;
            if (/[_\d]/.test(a) && i < val.length) {
                return val.charAt(i++);
            }
            if (i >= val.length) {
                return '';
            }
            return a;

            /*  
            /[_\d]/.test(a) - true/false
            i < val.length - початково і=0, val.length - це те що ввів користувач 
            якщо це правда, то повертається просто val.charAt(i++) - цифра наступна за цифрою яка перевіряється і знаходиться на позиції і(index)
            i >= val.length ? '' - якщо індекс більше за довжину того що ввід користувач - пуска строка
            або повертаємо а - символ що був початково
            */

        });

        if (event.type === 'blur') { //коли користувач перестав вводити дані
            if (this.value.length == 1) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this); //к-сть символів в інпут, сам інпут
        }
    }

    let inputs = document.querySelectorAll(inputSelector);

    inputs.forEach(item => {
        item.addEventListener('input', createMask);
        item.addEventListener('keypress', createMask);
        item.addEventListener('focus', createMask);
        item.addEventListener('blue', createMask);
    });
};

export default mask;