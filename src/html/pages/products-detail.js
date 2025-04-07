document.addEventListener("DOMContentLoaded", () => {
    // Import gsap (or declare it if it's already available globally)
    // This assumes you're using a module bundler like Webpack or Parcel
    // If not, you'll need to include gsap via a <script> tag in your HTML
    import gsap from "gsap";

    // Logo gradient animation
    const logoText = document.querySelector(".logo-text")
    gsap.to(logoText, {
        backgroundPosition: "100% 50%",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    })

    // Remove tab functionality since we're using separate sections now

    // Size selector functionality
    const sizeOptions = document.querySelectorAll(".size-option")
    sizeOptions.forEach((option) => {
        option.addEventListener("click", () => {
            sizeOptions.forEach((o) => o.classList.remove("active"))
            option.classList.add("active")
        })
    })

    // Color selector functionality
    const colorOptions = document.querySelectorAll(".color-option")
    colorOptions.forEach((option) => {
        option.addEventListener("click", () => {
            colorOptions.forEach((o) => o.classList.remove("active"))
            option.classList.add("active")
        })
    })

    // Rating selector functionality
    const ratingStars = document.querySelectorAll(".rating-selector i")
    const ratingValue = document.getElementById("rating-value")

    ratingStars.forEach((star) => {
        star.addEventListener("mouseover", () => {
            const rating = Number.parseInt(star.getAttribute("data-rating"))
            highlightStars(rating)
        })

        star.addEventListener("mouseout", () => {
            const currentRating = ratingValue.value ? Number.parseInt(ratingValue.value) : 0
            highlightStars(currentRating)
        })

        star.addEventListener("click", () => {
            const rating = Number.parseInt(star.getAttribute("data-rating"))
            ratingValue.value = rating
            highlightStars(rating)
        })
    })

    function highlightStars(rating) {
        ratingStars.forEach((star) => {
            const starRating = Number.parseInt(star.getAttribute("data-rating"))
            if (starRating <= rating) {
                star.classList.remove("far")
                star.classList.add("fas")
            } else {
                star.classList.remove("fas")
                star.classList.add("far")
            }
        })
    }

    // Form validation
    const reviewForm = document.getElementById("review-form")
    if (reviewForm) {
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault()

            let isValid = true
            const formGroups = reviewForm.querySelectorAll(".form-group")

            formGroups.forEach((group) => {
                const input = group.querySelector("input, textarea")
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
                } else {
                    group.classList.remove("error")
                }
            })

            // Check rating
            const ratingGroup = reviewForm.querySelector(".form-group:has(#rating-value)")
            if (!ratingValue.value) {
                ratingGroup.classList.add("error")
                isValid = false
            }

            if (isValid) {
                // Form is valid - in a real app, this would submit the form
                alert("Thank you for your review!")
                reviewForm.reset()
                highlightStars(0)
            }
        })
    }

    // Product image hover animation
    const productImage = document.querySelector(".product-image")
    if (productImage) {
        productImage.addEventListener("mouseenter", () => {
            gsap.to(productImage, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
            })
        })

        productImage.addEventListener("mouseleave", () => {
            gsap.to(productImage, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            })
        })
    }

    // Buy now button animation
    const buyNowBtn = document.querySelector(".buy-now-btn")
    if (buyNowBtn) {
        buyNowBtn.addEventListener("mouseenter", () => {
            gsap.to(buyNowBtn, {
                y: -3,
                boxShadow: "0 5px 15px rgba(138, 43, 226, 0.3)",
                duration: 0.3,
            })
        })

        buyNowBtn.addEventListener("mouseleave", () => {
            gsap.to(buyNowBtn, {
                y: 0,
                boxShadow: "0 0 0 rgba(138, 43, 226, 0)",
                duration: 0.3,
            })
        })

        buyNowBtn.addEventListener("click", () => {
            // Animate button click
            gsap
                .timeline()
                .to(buyNowBtn, {
                    scale: 0.95,
                    duration: 0.1,
                })
                .to(buyNowBtn, {
                    scale: 1,
                    duration: 0.1,
                })

            alert("Thank you for your purchase!")
        })
    }

    // Animate elements on page load
    gsap.from(".product-showcase", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
    })

    gsap.from(".product-info", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
    })

    gsap.from(".product-section", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power3.out",
    })
})

