// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation (same as main.java-script)
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
    }, 1000); // Slightly faster loading for product page

    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');

});
