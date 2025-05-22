document.addEventListener('DOMContentLoaded', function() {
    //Loading screen animation more explanation on main.js
    setTimeout(function() {
        var loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
    }, 1000);

    var contactForm = document.getElementById('contact-form');
    var successMessage = document.getElementById('success-message');
    var closeSuccessBtn = document.getElementById('close-success');

    // Validation patterns using regex
    var patterns = {
        firstName: /^[a-zA-Z]{2,}$/, //starts (^) and ends ($) with at least 2 letters only [a-zA-Z] this is restricting the character set
        lastName: /^[a-zA-Z]{2,}$/, // {2,} =is minimum 2 characters
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // standard email: before@after.domain — uses + for "1 or more", \. for a dot, {2,} for domain length
        message: /^.{10,}$/ // any 10+ characters, . = any char, {10,} = min length 10
    };
    var errorMessages = {
        firstName: 'First name must contain at least 2 letters and no numbers or special characters',
        lastName: 'Last name must contain at least 2 letters and no numbers or special characters',
        email: 'Please enter a valid email address',
        message: 'Message must be at least 10 characters long'
    };
    function validateField(field) {
        var fieldName = field.getAttribute('name');
        var errorElement = document.getElementById(`${fieldName}-error`);
        if (field.value.trim() === '') {
            field.classList.add('error');
            errorElement.textContent = 'This field is required';
            return false;
        }
        if (field.value.trim() !== '' && patterns[fieldName] && !patterns[fieldName].test(field.value)) {
            field.classList.add('error');
            errorElement.textContent = errorMessages[fieldName];
            return false;
        }

        field.classList.remove('error');
        errorElement.textContent = '';
        return true;
    }
    var formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });

        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var isValid = true;

        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            console.log("Form validation passed.");
            successMessage.classList.add('show');
            contactForm.reset();
        } else {
            console.log("Form validation failed.");
        }
    });

    closeSuccessBtn.addEventListener('click', function() {
        successMessage.classList.remove('show');

    });
});
// every field is validated by using the comparison with empty string and test using the regex to return some boolean value and using the gates to ensure every field is validated properly
