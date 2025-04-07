document.addEventListener("DOMContentLoaded", () => {
    // Import gsap (or declare it if it's already available globally)
    // This assumes gsap is available via CDN or a module bundler
    // If using a module bundler (e.g., Webpack, Parcel), use:
    // import gsap from 'gsap';

    // Logo gradient animation
    const logoText = document.querySelector(".logo-text")
    gsap.to(logoText, {
        backgroundPosition: "100% 50%",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    })

    // Form validation
    const contactForm = document.getElementById("contact-form")
    const successToast = document.getElementById("success-toast")

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            let isValid = true
            const formGroups = contactForm.querySelectorAll(".form-group")

            formGroups.forEach((group) => {
                const input = group.querySelector("input, textarea, select")
                if (input && input.required && !input.value.trim()) {
                    group.classList.add("error")
                    isValid = false
                } else if (input && input.type === "email") {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailPattern.test(input.value)) {
                        group.classList.add("error")
                        isValid = false
                    } else {
                        group.classList.remove("error")
                    }
                } else if (input && input.type === "tel") {
                    const phonePattern = /^[0-9+\-\s$$$$]{7,15}$/
                    if (!phonePattern.test(input.value)) {
                        group.classList.add("error")
                        isValid = false
                    } else {
                        group.classList.remove("error")
                    }
                } else {
                    group.classList.remove("error")
                }
            })

            if (isValid) {
                // Form is valid - in a real app, this would submit the form
                showSuccessToast()
                contactForm.reset()
            }
        })

        // Add input event listeners to clear errors on typing
        const inputs = contactForm.querySelectorAll("input, textarea, select")
        inputs.forEach((input) => {
            input.addEventListener("input", function () {
                const formGroup = this.closest(".form-group")
                formGroup.classList.remove("error")
            })
        })
    }

    // Show success toast
    function showSuccessToast() {
        successToast.classList.add("show")

        // Hide toast after 3 seconds
        setTimeout(() => {
            successToast.classList.remove("show")
        }, 3000)
    }

    // Animate elements on page load
    gsap.from(".contact-heading", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
    })

    gsap.from(".contact-subheading", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
    })

    gsap.from(".contact-detail-item", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4,
        ease: "power2.out",
    })

    gsap.from(".contact-form-container", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
    })
})

