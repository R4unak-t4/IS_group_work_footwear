
document.addEventListener('DOMContentLoaded', function() {
    //same loading animation as main.js
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
    }, 1000);  //one-second delay
});
