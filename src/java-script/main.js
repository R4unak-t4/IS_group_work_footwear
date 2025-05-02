// Loading screen animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('fade-out');
    }, 1500); // 1.5 seconds delay
});

let slider = document.querySelector('.slider');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

// Text content for each shoe
const shoeContent = [
    { collection: "street", footwear: "sneakers" },
    { collection: "premium", footwear: "classics" },
    { collection: "sport", footwear: "running" },
    { collection: "urban", footwear: "casual" },
    { collection: "limited", footwear: "edition" }
];

const collectionText = document.getElementById('collection-text');
const footwearText = document.getElementById('footwear-text');

next.onclick = () => {
    active = active >= count - 1 ? count - 1 : active + 1;
    runCarousel();
}

prev.onclick = () => {
    active = active <= 0 ? active : active - 1;
    runCarousel();
}

function updateText(index) {
    // Add class to trigger fade out animation
    slider.classList.add('text-changing');

    // After animation completes, update text and fade back in
    setTimeout(() => {
        collectionText.textContent = shoeContent[index].collection;
        footwearText.textContent = shoeContent[index].footwear;

        // Remove class to trigger fade in animation
        slider.classList.remove('text-changing');
    }, 300);
}

function runCarousel() {
    prev.style.display = (active === 0) ? 'none' : 'block';
    next.style.display = (active === count - 1) ? 'none' : 'block';

    let old_active = document.querySelector('.item.active');
    if(old_active) old_active.classList.remove('active');
    items[active].classList.add('active');

    leftTransform = width_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;

    // Update text content based on active shoe
    updateText(active);
}

// Initial text setup
updateText(active);

// Run carousel on load
runCarousel();
