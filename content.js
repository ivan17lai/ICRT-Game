document.addEventListener('DOMContentLoaded', () => {
    const elements = document.getElementsByClassName('icrt-block');

    Array.from(elements).forEach(element => {

        element.addEventListener('click', () => {
            if (event.target === element) {
                if (element.style.height === '90%') {
                    element.style.height = '55%';
                }else{
                    element.style.height = '90%';
                }
            }
        });
    });
});
