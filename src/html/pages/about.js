document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
    }, 1000);

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = Array.from(document.querySelectorAll('.dot'));

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('active');
        targetSlide.classList.add('active');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.style.opacity = '0.5';
            prevButton.style.pointerEvents = 'none';
            nextButton.style.opacity = '1';
            nextButton.style.pointerEvents = 'auto';
        } else if (targetIndex === slides.length - 1) {
            prevButton.style.opacity = '1';
            prevButton.style.pointerEvents = 'auto';
            nextButton.style.opacity = '0.5';
            nextButton.style.pointerEvents = 'none';
        } else {
            prevButton.style.opacity = '1';
            prevButton.style.pointerEvents = 'auto';
            nextButton.style.opacity = '1';
            nextButton.style.pointerEvents = 'auto';
        }
    };

    // Click on right button, move slides to right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.active') || slides[0];
        const currentDot = dotsNav.querySelector('.active');
        const currentIndex = slides.findIndex(slide => slide === currentSlide);
        const nextIndex = currentIndex + 1 >= slides.length ? slides.length - 1 : currentIndex + 1;
        const nextSlide = slides[nextIndex];
        const nextDot = dots[nextIndex];

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    // Click on left button, move slides to left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.active') || slides[0];
        const currentDot = dotsNav.querySelector('.active');
        const currentIndex = slides.findIndex(slide => slide === currentSlide);
        const prevIndex = currentIndex - 1 < 0 ? 0 : currentIndex - 1;
        const prevSlide = slides[prevIndex];
        const prevDot = dots[prevIndex];

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    // Click on nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('span');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.active') || slides[0];
        const currentDot = dotsNav.querySelector('.active');
        const targetIndex = parseInt(targetDot.getAttribute('data-index'));
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });

    // Initialize first slide as active
    if (slides.length > 0 && !track.querySelector('.active')) {
        slides[0].classList.add('active');
        hideShowArrows(slides, prevButton, nextButton, 0);
    }
});
