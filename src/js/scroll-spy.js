document.addEventListener('DOMContentLoaded', () => {
    
    const menuLinks = document.querySelectorAll('.electricity-first-section .list a[href^="#"], .aside-nav a[href^="#"]');  
    
    const sections =[];

    menuLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const section = document.querySelector(targetId);
        if(section) {
            sections.push(section);
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                menuLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
})