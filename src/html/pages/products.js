document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Carousel functionality
    const container = document.querySelector('.products-container');
    const cards = document.querySelectorAll('.product-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    const cardsPerPage = 3;
    let currentPage = 0;
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    function updateCarousel() {
        const offset = currentPage * cardsPerPage;
        cards.forEach((card, index) => {
            if (index >= offset && index < offset + cardsPerPage) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Update button states
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage >= totalPages - 1;

        // Update opacity for better visual feedback
        prevButton.style.opacity = currentPage === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentPage >= totalPages - 1 ? '0.5' : '1';
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateCarousel();
        }
    });

    // Initialize carousel
    updateCarousel();

    // Add hover effects to nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1)';
            link.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // Add click animation to buy buttons and prevent navigation
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.background = '#27ae60';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '#2c3e50';
            }, 1500);
        });
    });

    // Add animation for product cards on page load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
