document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
    }, 1000);

    // Form validation
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success');

    // Validation patterns
    const patterns = {
        firstName: /^[a-zA-Z]{2,}$/,
        lastName: /^[a-zA-Z]{2,}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: /^.{10,}$/
    };

    // Error messages
    const errorMessages = {
        firstName: 'First name must contain at least 2 letters and no numbers or special characters',
        lastName: 'Last name must contain at least 2 letters and no numbers or special characters',
        email: 'Please enter a valid email address',
        message: 'Message must be at least 10 characters long'
    };

    // Validate a single field
    function validateField(field) {
        const fieldName = field.getAttribute('name');
        const errorElement = document.getElementById(`${fieldName}-error`);

        // Check if field is required and empty
        if (field.hasAttribute('required') && field.value.trim() === '') {
            field.classList.add('error');
            errorElement.textContent = 'This field is required';
            return false;
        }

        // Check against pattern if not empty
        if (field.value.trim() !== '' && patterns[fieldName] && !patterns[fieldName].test(field.value)) {
            field.classList.add('error');
            errorElement.textContent = errorMessages[fieldName];
            return false;
        }

        // Field is valid
        field.classList.remove('error');
        errorElement.textContent = '';
        return true;
    }

    // Add blur event listeners to all form fields
    const formFields = contactForm.querySelectorAll('input, textarea');
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

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validate all fields
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            successMessage.classList.add('show');

            // Reset form
            contactForm.reset();
        }
    });

    // Close success message
    closeSuccessBtn.addEventListener('click', function() {
        successMessage.classList.remove('show');
    });
});
