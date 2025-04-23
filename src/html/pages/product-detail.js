// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen after page loads
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
        }, 500);
    }

    // Color Selection
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.querySelector('.selected-color');

    if (colorOptions.length > 0 && selectedColorText) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Update active color
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Update selected color text
                const colorName = this.getAttribute('data-color');
                selectedColorText.textContent = colorName;
            });
        });
    }

    // Size Selection
    const sizeOptions = document.querySelectorAll('.size-option');

    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Update active size
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Quantity Selector
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    if (quantityInput && minusBtn && plusBtn) {
        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');

                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Show selected tab content
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Review Form
    const writeReviewBtn = document.querySelector('.write-review-btn');
    const reviewForm = document.getElementById('review-form');
    const cancelReviewBtn = document.querySelector('.cancel-review-btn');
    const reviewStars = document.querySelectorAll('.star-selector .star');
    const selectedRating = document.querySelector('.selected-rating');
    const reviewFormElement = document.getElementById('new-review-form');
    const reviewSuccessMessage = document.getElementById('review-success');
    const closeSuccessBtn = document.getElementById('close-review-success');

    // Show review form
    if (writeReviewBtn && reviewForm) {
        writeReviewBtn.addEventListener('click', function() {
            reviewForm.classList.add('active');
            // Scroll to form
            reviewForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Hide review form
    if (cancelReviewBtn && reviewForm) {
        cancelReviewBtn.addEventListener('click', function() {
            reviewForm.classList.remove('active');
        });
    }

    // Star rating selection
    if (reviewStars && reviewStars.length > 0 && selectedRating) {
        reviewStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');

                // Update visual state of stars
                reviewStars.forEach(s => {
                    s.classList.remove('active');
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.add('active');
                    }
                });

                // Update rating text
                selectedRating.textContent = rating + '/5';
            });

            // Hover effect
            star.addEventListener('mouseenter', function() {
                const rating = this.getAttribute('data-rating');

                reviewStars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.style.color = '#f8c51c';
                    }
                });
            });

            star.addEventListener('mouseleave', function() {
                reviewStars.forEach(s => {
                    if (!s.classList.contains('active')) {
                        s.style.color = '';
                    }
                });
            });
        });
    }

    // Submit review form
    if (reviewFormElement && reviewSuccessMessage) {
        reviewFormElement.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show success message
            reviewSuccessMessage.classList.add('active');

            // Reset and hide form
            reviewFormElement.reset();
            if (reviewForm) {
                reviewForm.classList.remove('active');
            }

            if (reviewStars && reviewStars.length > 0 && selectedRating) {
                reviewStars.forEach(s => {
                    s.classList.remove('active');
                    s.style.color = '';
                });
                selectedRating.textContent = '0/5';
            }
        });
    }

    // Close success message
    if (closeSuccessBtn && reviewSuccessMessage) {
        closeSuccessBtn.addEventListener('click', function() {
            reviewSuccessMessage.classList.remove('active');
        });
    }

    // Add to Cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Get selected options
            let selectedColor = "Default";
            let selectedSize = "Default";

            const activeColor = document.querySelector('.color-option.active');
            if (activeColor) {
                selectedColor = activeColor.getAttribute('data-color');
            }

            const activeSize = document.querySelector('.size-option.active');
            if (activeSize) {
                selectedSize = activeSize.textContent;
            }

            const quantity = document.getElementById('quantity').value;

            // Show confirmation
            alert(`Added to cart: ${quantity} x Air Zoom Runner - ${selectedColor}, Size ${selectedSize}`);
        });
    }

    // Wishlist button
    const wishlistBtn = document.querySelector('.wishlist-btn');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
                alert('Added to wishlist!');
            } else {
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            }
        });
    }

    // Add CSS class for active wishlist button
    const style = document.createElement('style');
    style.textContent = `
    .wishlist-btn.active svg {
      fill: #e53935;
      stroke: #e53935;
    }
  `;
    document.head.appendChild(style);
});
