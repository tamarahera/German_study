const accordion = (triggersSelector, activeClassBtn, activeClassContent) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(item => {
        item.addEventListener('click', function() {
            console.log(this.nextElementSibling);

            this.classList.toggle(activeClassBtn);
            this.nextElementSibling.classList.toggle(activeClassContent);
            

            if (this.classList.contains(activeClassBtn)) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 20 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            };
        });
    });
}

export default accordion;