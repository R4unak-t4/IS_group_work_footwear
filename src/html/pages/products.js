// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation (same as main.js)
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
    }, 1000); // Slightly faster loading for product page

    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');

    // Add click event listeners to "See More" buttons
    const seeMoreButtons = document.querySelectorAll('.see-more-btn');
    seeMoreButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Get product info
            const productName = document.querySelectorAll('.product-info h3')[index].textContent;
            const productPrice = document.querySelectorAll('.price')[index].textContent;

            // Alert for demo purposes (would normally navigate to product detail page)
            alert(`You selected: ${productName} - ${productPrice}`);
        });
    });
});
