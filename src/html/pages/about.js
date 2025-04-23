document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const mainNav = document.querySelector(".main-nav")

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", function () {
            this.classList.toggle("active")
            mainNav.classList.toggle("active")

            // Add styles for active mobile menu
            if (!document.querySelector("#mobile-styles")) {
                const style = document.createElement("style")
                style.id = "mobile-styles"
                style.textContent = `
          .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          .menu-toggle.active span:nth-child(2) {
            opacity: 0;
          }
          .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
          }
          .main-nav.active {
            display: block;
            width: 100%;
            padding: 20px 0;
          }
          .main-nav.active ul {
            flex-direction: column;
            align-items: center;
          }
        `
                document.head.appendChild(style)
            }
        })
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            // Skip if it's a portfolio navigation link
            if (this.closest(".nav-links") || this.closest(".sidebar-nav")) {
                return
            }

            e.preventDefault()
            const targetId = this.getAttribute("href").substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                const headerOffset = 80
                const elementPosition = targetElement.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                })
            }
        })
    })

    // Portfolio Navigation
    if (window.location.pathname.includes("portfolios.html")) {
        // Get all navigation links
        const navLinks = document.querySelectorAll(".nav-links a")

        // Get all portfolio sections
        const portfolioSections = document.querySelectorAll(".portfolio-section")

        // Function to activate a specific portfolio
        function activatePortfolio(id) {
            // Remove active class from all links and sections
            navLinks.forEach((link) => link.classList.remove("active"))
            portfolioSections.forEach((section) => section.classList.remove("active"))

            // Add active class to the selected link and section
            document.querySelector(`.nav-links a[href="#${id}"]`).classList.add("active")
            document.getElementById(id).classList.add("active")

            // Scroll to top
            window.scrollTo(0, 0)
        }

        // Add click event listeners to navigation links
        navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault()
                const id = this.getAttribute("href").substring(1)
                activatePortfolio(id)

                // Update URL hash without scrolling
                history.pushState(null, null, `#${id}`)
            })
        })

        // Handle hash changes (browser back/forward buttons)
        window.addEventListener("hashchange", () => {
            const hash = window.location.hash.substring(1)
            if (hash && document.getElementById(hash)) {
                activatePortfolio(hash)
            }
        })

        // Check for hash in URL on page load
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            if (document.getElementById(hash)) {
                activatePortfolio(hash)
            }
        }

        // Saarika's portfolio internal navigation
        const saarikaSidebarLinks = document.querySelectorAll(".sidebar-nav a")

        saarikaSidebarLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault()
                const targetId = this.getAttribute("href").substring(1)
                const targetElement = document.getElementById(targetId)

                if (targetElement) {
                    // Activate Saarika's portfolio first if not active
                    if (!document.getElementById("saarika").classList.contains("active")) {
                        activatePortfolio("saarika")
                    }

                    // Scroll to the section with offset for fixed header
                    const headerOffset = 120
                    const elementPosition = targetElement.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    })
                }
            })
        })
    }

    // Form submission handling
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault()

            // Simple form validation
            const name = this.querySelector("#name").value
            const email = this.querySelector("#email").value

            if (!name || !email) {
                alert("Please fill in all required fields.")
                return
            }

            // Simulate form submission
            const submitBtn = this.querySelector(".submit-btn")
            submitBtn.textContent = "Sending..."
            submitBtn.disabled = true

            setTimeout(() => {
                alert("Thank you for your message! We will get back to you soon.")
                this.reset()
                submitBtn.textContent = "Send Message"
                submitBtn.disabled = false
            }, 1500)
        })
    }
})

// Loading screen functionality
window.addEventListener("load", () => {
    const loadingScreen = document.querySelector(".loading-screen")
    if (loadingScreen) {
        loadingScreen.classList.add("fade-out")

        setTimeout(() => {
            loadingScreen.style.display = "none"
        }, 800)
    }
})
