document.addEventListener('DOMContentLoaded', function() {
    // Logo gradient animation
    const logoText = document.querySelector('.logo-text');
    gsap.to(logoText, {
        backgroundPosition: "100% 50%",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Animate product cards
    gsap.from('.product-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Animate product info
    gsap.from('.product-info-section > *', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Add hover effects
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.1,
                color: '#8a2be2',
                duration: 0.3
            });
        });

        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                gsap.to(link, {
                    scale: 1,
                    color: '#000',
                    duration: 0.3
                });
            }
        });
    });
});
