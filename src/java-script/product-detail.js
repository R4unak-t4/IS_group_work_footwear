// same functionality for loading as in main.js (more detailed explanation in main.js)
document.addEventListener('DOMContentLoaded', function() {
    var loadingScreen = document.querySelector('.loading-screen');
    // additional check to see if loading div is in the given file
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
        }, 500);
    }

    // Handle color option selection
    var colorOptions = document.querySelectorAll('.color-option');
    var selectedColorText = document.querySelector('.selected-color');

    if (colorOptions.length > 0 && selectedColorText) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // Remove active class from all color options which is not selected
                colorOptions.forEach(opt => opt.classList.remove('active'));

                // Add active class to the clicked option of the color
                e.currentTarget.classList.add('active');
                //Update the displayed selected color name
                var colorName = e.currentTarget.getAttribute('data-color');
                selectedColorText.textContent = colorName;
                //test for color selected
                var activeColor = document.querySelector('.color-option.active');
                if (activeColor) {
                    var colorActive = activeColor.getAttribute('data-color');
                    console.log(colorActive + "selected as color")
                }
            });
        });
    }

    // Handle size option selection
    var sizeOptions = document.querySelectorAll('.size-option');

    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // Remove active class from all sizes
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                // Mark clicked size as active
                e.currentTarget.classList.add('active');
                //test for size selection
                var activeSize = document.querySelector('.size-option.active');
                if (activeSize) {
                    var size = activeSize.textContent;
                    console.log(size + " selected for size");
                }
            });
        });
    }

    //Quantity selection logic
    var quantityInput = document.getElementById('quantity');
    var minusBtn = document.querySelector('.quantity-btn.minus');
    var plusBtn = document.querySelector('.quantity-btn.plus');

    if (quantityInput && minusBtn && plusBtn) {
        minusBtn.addEventListener('click', function() {
            var currentValue = parseInt(quantityInput.value);
            // making sure the value is valid before decrement to not make it 0 by mistake
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
            //test for quantity
            var quantity = document.getElementById('quantity').value;
            console.log("Current quantity selected "+quantity);
        });
        // same logic for increment
        plusBtn.addEventListener('click', function() {
            var currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
            //test for quantity
            var quantity = document.getElementById('quantity').value;
            console.log("Current quantity selected "+quantity);
        });
    }

    //Handle tab switching for product info
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                var tabId = e.currentTarget.getAttribute('data-tab');

                //Update tab button states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');

                //Show the corresponding tab pane
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    var writeReviewBtn = document.querySelector('.write-review-btn');
    var reviewForm = document.getElementById('review-form');
    var cancelReviewBtn = document.querySelector('.cancel-review-btn');
    var reviewStars = document.querySelectorAll('.star-selector .star');
    var selectedRating = document.querySelector('.selected-rating');
    var reviewFormElement = document.getElementById('new-review-form');
    var reviewSuccessMessage = document.getElementById('review-success');
    var closeSuccessBtn = document.getElementById('close-review-success');

    // Show review form when (Write a review) button is clicked
    if (writeReviewBtn && reviewForm) {
        writeReviewBtn.addEventListener('click', function() {
            reviewForm.classList.add('active');
        });
    }
    //Hide the review form when Cancel is clicked by removing active class from it
    if (cancelReviewBtn && reviewForm) {
        cancelReviewBtn.addEventListener('click', function() {
            reviewForm.classList.remove('active');
        });
    }

    //Handle star rating selection
    if (reviewStars && reviewStars.length > 0 && selectedRating) {
        reviewStars.forEach(star => {
            //Set rating on click
            star.addEventListener('click', function(e) {
                var rating = e.currentTarget.getAttribute('data-rating');

                //Highlight stars based on selected rating
                reviewStars.forEach(s => {
                    s.classList.remove('active');
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.add('active');
                    }
                });

                //Update numeric rating text
                selectedRating.textContent = rating + '/5';
            });

            //Add hover highlight effect for stars
            star.addEventListener('mouseenter', function(e) {
                var rating = e.currentTarget.getAttribute('data-rating');
                reviewStars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.style.color = '#f8c51c';
                    }
                });
            });

            //Reset star color when mouse leaves
            star.addEventListener('mouseleave', function() {
                reviewStars.forEach(s => {
                    if (!s.classList.contains('active')) {
                        s.style.color = '';
                    }
                });
            });
        });
    }

    //Submit review form and show success message
    if (reviewFormElement && reviewSuccessMessage) {
        reviewFormElement.addEventListener('submit', function(e) {
            e.preventDefault(); // adding this to prevent a page reload behaviour on submit

            // Show success message
            reviewSuccessMessage.classList.add('active');

            //Reset and hide the form once the form is submitted
            reviewFormElement.reset();
            if (reviewForm) {
                reviewForm.classList.remove('active');
            }

            //Reset star visuals and rating
            if (reviewStars && reviewStars.length > 0 && selectedRating) {
                reviewStars.forEach(s => {
                    s.classList.remove('active');
                    s.style.color = '';
                });
                selectedRating.textContent = '0/5';
            }
        });
    }

    //Close the review success message
    if (closeSuccessBtn && reviewSuccessMessage) {
        closeSuccessBtn.addEventListener('click', function() {
            reviewSuccessMessage.classList.remove('active');
        });
    }

    var addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Fetching selected options
            var selectedColor = "Default";
            var selectedSize = "Default";
            var activeColor = document.querySelector('.color-option.active');
            if (activeColor) {
                selectedColor = activeColor.getAttribute('data-color');
            }

            var activeSize = document.querySelector('.size-option.active');
            if (activeSize) {
                selectedSize = activeSize.textContent;
            }
            var quantity = document.getElementById('quantity').value;
            // Show confirmation popup once the form is validated and submit is hit
            alert(`Added to cart: ${quantity} x Air Zoom Runner in ${selectedColor} & Size ${selectedSize}`);
        });
    }

});

