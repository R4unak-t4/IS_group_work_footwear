document.addEventListener('DOMContentLoaded', function() {
    // Shoe data with collection information
    const shoeData = [
        {
            id: 1,
            image: 'images/shoe1.png',
            alt: 'White Nike Air Max Sneakers',
            collection: 'New Collection',
            number: '01'
        },
        {
            id: 2,
            image: 'images/shoe2.png',
            alt: 'Blue Athletic Shoes',
            collection: 'Sport Collection',
            number: '02'
        },
        {
            id: 3,
            image: 'images/shoe3.png',
            alt: 'Colorful Patterned Shoes',
            collection: 'Designer Collection',
            number: '03'
        },
        {
            id: 4,
            image: 'images/shoe4.png',
            alt: 'Running Shoes',
            collection: 'Athletic Collection',
            number: '04'
        },
        {
            id: 5,
            image: 'images/shoe5.png',
            alt: 'Casual Shoes',
            collection: 'Casual Collection',
            number: '05'
        }
    ];

    // Get DOM elements
    const carousel = document.querySelector('.carousel');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const collectionTitle = document.querySelector('.collection-title');
    const collectionNumber = document.querySelector('.collection-number');

    // Get all thumbnail images
    const farLeftThumbnail = document.querySelector('.far-left-thumbnail .thumbnail-img');
    const rightThumbnail = document.querySelector('.right-thumbnail');
    const farRightThumbnail = document.querySelector('.far-right-thumbnail .thumbnail-img');

    // Current active index (0-based)
    let currentIndex = 0;
    let isAnimating = false; // Flag to prevent multiple clicks during animation

    // Initialize animations
    function initAnimations() {
        // Animate header
        gsap.from('header', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animate main shoe
        gsap.from('.shoe-item', {
            y: 50,
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animate collection text
        gsap.from('.collection-title', {
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animate collection number
        gsap.from('.collection-number', {
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Animate arrows
        gsap.from('.slide-arrow', {
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });
    }

    // Create shoe elements for the carousel
    function createShoeElements() {
        // Clear existing content
        carousel.innerHTML = '';

        // Calculate indices for all 5 positions
        const farLeftIndex = (currentIndex - 2 + shoeData.length) % shoeData.length;
        const leftIndex = (currentIndex - 1 + shoeData.length) % shoeData.length;
        const rightIndex = (currentIndex + 1) % shoeData.length;
        const farRightIndex = (currentIndex + 2) % shoeData.length;

        // Create far left shoe
        const farLeftShoe = document.createElement('div');
        farLeftShoe.className = 'shoe-item far-left';
        farLeftShoe.innerHTML = `<img src="${shoeData[farLeftIndex].image}" alt="${shoeData[farLeftIndex].alt}" class="shoe-img">`;

        // Create left shoe
        const leftShoe = document.createElement('div');
        leftShoe.className = 'shoe-item left';
        leftShoe.innerHTML = `<img src="${shoeData[leftIndex].image}" alt="${shoeData[leftIndex].alt}" class="shoe-img">`;

        // Create center shoe
        const centerShoe = document.createElement('div');
        centerShoe.className = 'shoe-item center';
        centerShoe.innerHTML = `<img src="${shoeData[currentIndex].image}" alt="${shoeData[currentIndex].alt}" class="shoe-img">`;

        // Create right shoe
        const rightShoe = document.createElement('div');
        rightShoe.className = 'shoe-item right';
        rightShoe.innerHTML = `<img src="${shoeData[rightIndex].image}" alt="${shoeData[rightIndex].alt}" class="shoe-img">`;

        // Create far right shoe
        const farRightShoe = document.createElement('div');
        farRightShoe.className = 'shoe-item far-right';
        farRightShoe.innerHTML = `<img src="${shoeData[farRightIndex].image}" alt="${shoeData[farRightIndex].alt}" class="shoe-img">`;

        // Add all shoes to carousel
        carousel.appendChild(farLeftShoe);
        carousel.appendChild(leftShoe);
        carousel.appendChild(centerShoe);
        carousel.appendChild(rightShoe);
        carousel.appendChild(farRightShoe);

        // Apply initial styles with GSAP - no animation here, just setting positions
        gsap.set('.shoe-item.far-left', {
            x: '-150%',
            scale: 0.6,
            opacity: 0.4,
            zIndex: 1,
            filter: 'blur(2px)'
        });

        gsap.set('.shoe-item.left', {
            x: '-80%',
            scale: 0.8,
            opacity: 0.7,
            zIndex: 3,
            filter: 'blur(1px)'
        });

        gsap.set('.shoe-item.center', {
            x: '0%',
            scale: 1.4,
            opacity: 1,
            zIndex: 5,
            filter: 'blur(0px)'
        });

        gsap.set('.shoe-item.right', {
            x: '80%',
            scale: 0.8,
            opacity: 0.7,
            zIndex: 3,
            filter: 'blur(1px)'
        });

        gsap.set('.shoe-item.far-right', {
            x: '150%',
            scale: 0.6,
            opacity: 0.4,
            zIndex: 1,
            filter: 'blur(2px)'
        });
    }

    // Update collection info
    function updateCollectionInfo() {
        gsap.to([collectionTitle, collectionNumber], {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                collectionTitle.textContent = shoeData[currentIndex].collection;
                collectionNumber.textContent = shoeData[currentIndex].number;
                gsap.to([collectionTitle, collectionNumber], {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            }
        });
    }

    // Handle right arrow click - move to next slide
    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;

        // Animate arrow click
        gsap.to(rightArrow, {
            scale: 0.9,
            duration: 0.1,
            onComplete: () => {
                gsap.to(rightArrow, { scale: 1, duration: 0.1 });
            }
        });

        // Get all shoe items
        const shoeItems = document.querySelectorAll('.shoe-item');
        const farLeftShoe = shoeItems[0];
        const leftShoe = shoeItems[1];
        const centerShoe = shoeItems[2];
        const rightShoe = shoeItems[3];
        const farRightShoe = shoeItems[4];

        // Create a timeline for the animation
        const tl = gsap.timeline({
            onComplete: () => {
                // Update current index
                currentIndex = (currentIndex + 1) % shoeData.length;

                // Update collection info
                updateCollectionInfo();

                // Recreate shoe elements with new positions
                createShoeElements();

                isAnimating = false;
            }
        });

        // Add a new far right shoe (off screen initially)
        const newFarRightIndex = (currentIndex + 3) % shoeData.length;
        const newFarRightShoe = document.createElement('div');
        newFarRightShoe.className = 'shoe-item new-far-right';
        newFarRightShoe.innerHTML = `<img src="${shoeData[newFarRightIndex].image}" alt="${shoeData[newFarRightIndex].alt}" class="shoe-img">`;
        carousel.appendChild(newFarRightShoe);

        gsap.set(newFarRightShoe, {
            x: '200%',
            scale: 0.4,
            opacity: 0,
            zIndex: 1,
            filter: 'blur(3px)'
        });

        // Animate all shoes moving one position to the left with smoother transitions
        // Use a longer duration and smoother easing

        // Far left moves off screen
        tl.to(farLeftShoe, {
            x: '-200%',
            scale: 0.4,
            opacity: 0,
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Left becomes far left
        tl.to(leftShoe, {
            x: '-150%',
            scale: 0.6,
            opacity: 0.4,
            zIndex: 1,
            filter: 'blur(2px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Center becomes left
        tl.to(centerShoe, {
            x: '-80%',
            scale: 0.8,
            opacity: 0.7,
            zIndex: 3,
            filter: 'blur(1px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Right becomes center with gradual scaling
        // Split the animation into two parts for smoother scaling
        tl.to(rightShoe, {
            x: '0%',
            opacity: 1,
            zIndex: 5,
            filter: 'blur(0px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Separate scale animation with slightly different timing for smoother growth
        tl.to(rightShoe, {
            scale: 1.4,
            duration: 1.2, // Slightly longer for smoother scaling
            ease: "power2.out" // Different easing for scale to avoid jitter
        }, 0);

        // Far right becomes right
        tl.to(farRightShoe, {
            x: '80%',
            scale: 0.8,
            opacity: 0.7,
            zIndex: 3,
            filter: 'blur(1px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Animate new far right shoe coming in
        tl.to(newFarRightShoe, {
            x: '150%',
            scale: 0.6,
            opacity: 0.4,
            filter: 'blur(2px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);
    }

    // Handle left arrow click - move to previous slide
    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;

        // Animate arrow click
        gsap.to(leftArrow, {
            scale: 0.9,
            duration: 0.1,
            onComplete: () => {
                gsap.to(leftArrow, { scale: 1, duration: 0.1 });
            }
        });

        // Get all shoe items
        const shoeItems = document.querySelectorAll('.shoe-item');
        const farLeftShoe = shoeItems[0];
        const leftShoe = shoeItems[1];
        const centerShoe = shoeItems[2];
        const rightShoe = shoeItems[3];
        const farRightShoe = shoeItems[4];

        // Create a timeline for the animation
        const tl = gsap.timeline({
            onComplete: () => {
                // Update current index
                currentIndex = (currentIndex - 1 + shoeData.length) % shoeData.length;

                // Update collection info
                updateCollectionInfo();

                // Recreate shoe elements with new positions
                createShoeElements();

                isAnimating = false;
            }
        });

        // Add a new far left shoe (off screen initially)
        const newFarLeftIndex = (currentIndex - 3 + shoeData.length) % shoeData.length;
        const newFarLeftShoe = document.createElement('div');
        newFarLeftShoe.className = 'shoe-item new-far-left';
        newFarLeftShoe.innerHTML = `<img src="${shoeData[newFarLeftIndex].image}" alt="${shoeData[newFarLeftIndex].alt}" class="shoe-img">`;
        carousel.appendChild(newFarLeftShoe);

        gsap.set(newFarLeftShoe, {
            x: '-200%',
            scale: 0.4,
            opacity: 0,
            zIndex: 1,
            filter: 'blur(3px)'
        });

        // Animate all shoes moving one position to the right with smoother transitions

        // Far right moves off screen
        tl.to(farRightShoe, {
            x: '200%',
            scale: 0.4,
            opacity: 0,
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Right becomes far right
        tl.to(rightShoe, {
            x: '150%',
            scale: 0.6,
            opacity: 0.4,
            zIndex: 1,
            filter: 'blur(2px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Center becomes right
        tl.to(centerShoe, {
            x: '80%',
            scale: 0.8,
            opacity: 0.7,
            zIndex: 3,
            filter: 'blur(1px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Left becomes center with gradual scaling
        // Split the animation into two parts for smoother scaling
        tl.to(leftShoe, {
            x: '0%',
            opacity: 1,
            zIndex: 5,
            filter: 'blur(0px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Separate scale animation with slightly different timing for smoother growth
        tl.to(leftShoe, {
            scale: 1.4,
            duration: 1.2, // Slightly longer for smoother scaling
            ease: "power2.out" // Different easing for scale to avoid jitter
        }, 0);

        // Far left becomes left
        tl.to(farLeftShoe, {
            x: '-80%',
            scale: 0.8,
            opacity: 0.7,
            zIndex: 3,
            filter: 'blur(1px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Animate new far left shoe coming in
        tl.to(newFarLeftShoe, {
            x: '-150%',
            scale: 0.6,
            opacity: 0.4,
            filter: 'blur(2px)',
            duration: 1,
            ease: "power1.inOut"
        }, 0);
    }

    // Add event listeners
    leftArrow.addEventListener('click', prevSlide);
    rightArrow.addEventListener('click', nextSlide);

    // Add hover effects
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { scale: 1.1, duration: 0.3 });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, { scale: 1, duration: 0.3 });
        });
    });

    // Add hover effects to arrows
    const arrows = document.querySelectorAll('.slide-arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('mouseenter', () => {
            gsap.to(arrow, {
                scale: 1.1,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                duration: 0.3
            });
        });

        arrow.addEventListener('mouseleave', () => {
            gsap.to(arrow, {
                scale: 1,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                duration: 0.3
            });
        });
    });

    // Auto-rotate carousel every 8 seconds (slower as requested)
    let carouselInterval = setInterval(nextSlide, 8000);

    // Pause auto-rotation when user interacts with carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 8000);
    });

    // Initialize carousel and animations
    createShoeElements();
    updateCollectionInfo();
    initAnimations();
});
