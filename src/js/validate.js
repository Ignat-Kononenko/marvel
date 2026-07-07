document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.powerplay-form');
    if (!form) return;

    const phoneInput = form.querySelector('input[type="tel"]');
    const emailInput = form.querySelector('input[type="email"]');
    const requiredInputs = form.querySelectorAll('.custom-input[required]');
    
    const currentFlag = form.querySelector('.current-flag');
    const currentCode = form.querySelector('.current-code');
    const countryItems = form.querySelectorAll('.country-select');


    countryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const flagUrl = item.getAttribute('data-flag');
            const code = item.getAttribute('data-code');

            if (currentFlag) currentFlag.setAttribute('src', flagUrl);
            if (currentCode) currentCode.textContent = code;

            if (phoneInput) {
                phoneInput.value = '';
                phoneInput.classList.remove('is-invalid');
            }
        });
    });


    if (emailInput && emailInput.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
                isFormValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }
    }
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value.trim() !== '') {
                e.target.classList.remove('is-invalid');
            }
        });
    }

    form.addEventListener('submit', (event) => {
        let isFormValid = true;

        requiredInputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
                isFormValid = false;
            }
            else if (input.placeholder.includes('NAME')) {
                const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
                if (input.value.trim().length <= 4 || !nameRegex.test(input.value.trim())) {
                    input.classList.add('is-invalid');
                    isFormValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            }
            else {
                input.classList.remove('is-invalid');
            }
        });

        
        if (!isFormValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            alert('Форма успешно заполнена! Тут будет скачивание PDF (уже на сервере)'); 
        }
    });

    form.querySelectorAll('.custom-input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.remove('is-invalid');
            }
        });
    });
});