const burgerButton = document.querySelector('.burger-button');
const mobileMenu = document.getElementById('mobileMenu');
const closeButton = document.getElementById('closeMenu');

burgerButton.addEventListener('click', () => {
    mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});   
