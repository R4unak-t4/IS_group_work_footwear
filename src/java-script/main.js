// adding an eventlistner for the DOM to be loaded completely
// then perform a call back function in which set timeout is used to perform a 1.5 second of loading during this the loading div will be displayed
window.addEventListener('load', () => {
    setTimeout(() => {
        var loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('fade-out');
    }, 1500); //1.5 seconds delay
});

// getting all the required elements from the DOM
var slider = document.querySelector('.slider');
var list = document.querySelector('.list');
var prev = document.getElementById('prev-arrow');
var next = document.getElementById('next-arrow');
var items = document.querySelectorAll('.list .shoe');
var count = items.length;
var active = 1;
var leftTransform = 0;
var width_item = items[active].offsetWidth;

//Making a JSON to store all the collection texts for dynamic flow of text
const shoeContent = [
    { collection: "street", footwear: "sneakers" },
    { collection: "premium", footwear: "classics" },
    { collection: "sport", footwear: "running" },
    { collection: "urban", footwear: "casual" },
    { collection: "limited", footwear: "edition" }
];

var collectionText = document.getElementById('collection-text');
var footwearText = document.getElementById('footwear-text');

//making a call back function for next button
function handleNextClick() {
    // checking if the active shoe is greater than or equal the last index of the slides
    if (active >= count-1) {
        // if yes we then the value of active stays at the last index nd avoids any furthur increment
        active = count-1;
    //     if no then we increment the index by one to move forward in the slide
    } else {
        active +=1;
    }
    runCarousel();
}

//making a call back function for prev button
// same functionality for the previous button as well
function handlePrevClick() {
    if (active <= 0) {
        active = 0;
    } else {
        active -= 1;
    }
    runCarousel();
}
// adding event listner for the prev and next arrows
next.addEventListener('click', handleNextClick);
prev.addEventListener('click', handlePrevClick);

function updateText(index) {
    // Adding the fade animation class to have the fade out trigger when text changes
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
    // hidding the prev and next button when on the edge of the array index i.e 0 or last index
    prev.style.display = (active === 0) ? 'none' : 'block';
    next.style.display = (active === count - 1) ? 'none' : 'block';

    var old_active = document.querySelector('.shoe.active');
    // removing the active class from the previous active shoe
    if(old_active) old_active.classList.remove('active');
    items[active].classList.add('active');
    // adding the active class to unblur the new element shoe in the middle
    leftTransform = width_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;

    // Update text content based on active shoe
    updateText(active);
}
// calling the text setup function to have the text shown for the 2nd shoe
updateText(active);

// Runninh carousel after the loading is done
runCarousel();
