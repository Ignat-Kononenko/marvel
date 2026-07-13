document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.powerplay-form');
    if (!form) return;

    const phoneInput = form.querySelector('input[type="tel"]');
    const emailInput = form.querySelector('input[type="email"]');
    const requiredInputs = form.querySelectorAll('.custom-input[required]');
    
    const currentFlag = form.querySelector('.current-flag');
    const currentCode = form.querySelector('.current-code');
    const countryItems = form.querySelectorAll('.country-select');

    const setError = (input, message) => {
        input.classList.add('is-invalid');
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        }
    };

    const validateSingleInput = (input) => {
        const value = input.value.trim();
        const placeholder = input.placeholder || '';

        if (value === '') {
            setError(input, 'Please fill in this field.');
            return false;
        }

        if ((placeholder.includes('FIRST NAME') || placeholder.includes('LAST NAME')) && !placeholder.includes('COMPANY')) {
            const nameRegex = /^[a-zA-Z]+$/;
            if (value.length <= 2 || !nameRegex.test(value)) {
                setError(input, 'The name must be longer than two letters and contain only english letters.');
                return false;
            }
        }

        input.classList.remove('is-invalid');
        return true;
    };

    const validateEmail = (input) => {
        if (!input) return true;
        const value = input.value.trim();

        if (value === '') {
            setError(input, 'Please fill in this field.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setError(input, 'Please enter a valid email address.');
            return false;
        }

        input.classList.remove('is-invalid');
        return true;
    };

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
            if (input.type !== 'email') {
                if (!validateSingleInput(input)) isFormValid = false;
            }
        });
        
        if (emailInput && !validateEmail(emailInput)) {
            isFormValid = false;
        }

        if (!isFormValid) {
            event.preventDefault();
        } else {
            alert('The form has been successfully filled out! The PDF download will be available here (it is already on the server).'); 
        }
    });

    form.querySelectorAll('.custom-input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.type === 'email') {
                validateEmail(input);
            } else {
                validateSingleInput(input);
            }
        });
    });
});