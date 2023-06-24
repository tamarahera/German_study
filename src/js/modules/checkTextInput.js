const checkTextInput = (inputsSelector) => {
    const textInputs = document.querySelectorAll(inputsSelector);

    textInputs.forEach(item => {
        item.addEventListener('keypress', function(e) {
            if (e.key.match(/[^a-z 0-9 äöüß]/ig)) {
                e.preventDefault();
            }
        });

        item.addEventListener('input', () => {
            item.value = item.value.replace((/[^a-z 0-9 äöüß]/ig), ''); 
        });
    });
};

export default checkTextInput;