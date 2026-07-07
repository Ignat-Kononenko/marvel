const statsRow = document.querySelector('.stats-row');
const statNumbers = document.querySelectorAll('.stat-number');

if (statsRow && statNumbers.length > 0) {

    const animateCounter = (element) => {
        const target = +element.getAttribute('data-target');
        const duration = 1500;
        const startTime = performance.now();

        const originalText = element.textContent;
        const prefix = originalText.includes('$') ? '$' : '';
        const suffix = originalText.replace('0', '').replace('$', '');

        const updateNumber = (currentTime) => {
            const finalTime = currentTime - startTime;
            
            if (finalTime < duration) {

                const progress = finalTime / duration;
                
                const easeOutProgress = progress * (2 - progress);
                
                const currentValue = Math.floor(easeOutProgress * target);
                
                element.textContent = `${prefix}${currentValue}${suffix}`;
                
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = originalText.replace('0', target);
            }
        };
        requestAnimationFrame(updateNumber);
    }

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                statNumbers.forEach(num => animateCounter(num));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    statsObserver.observe(statsRow);
}