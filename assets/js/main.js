// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll)
  AOS = AOS || {} // Declare AOS if it's not already defined
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear()

  // Hide preloader after page loads
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader")
    setTimeout(() => {
      preloader.classList.add("hidden")
    }, 500)
  })

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-link")

  function setActiveNavItem() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", setActiveNavItem)

  // Theme toggle functionality
  const themeToggle = document.querySelectorAll(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.classList.toggle("dark-mode", savedTheme === "dark")
  }

  themeToggle.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")

      // Save theme preference
      const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light"
      localStorage.setItem("theme", currentTheme)
    })
  })

  // Language toggle functionality
  const enToggles = document.querySelectorAll("#en-toggle, #footer-en-toggle")
  const frToggles = document.querySelectorAll("#fr-toggle, #footer-fr-toggle")

  // Check for saved language preference
  const savedLanguage = localStorage.getItem("language") || "en"
  setLanguage(savedLanguage)

  enToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setLanguage("en")
    })
  })

  frToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setLanguage("fr")
    })
  })

  function setLanguage(language) {
    // Update toggle buttons
    if (language === "en") {
      enToggles.forEach((toggle) => toggle.classList.add("active"))
      frToggles.forEach((toggle) => toggle.classList.remove("active"))
    } else {
      enToggles.forEach((toggle) => toggle.classList.remove("active"))
      frToggles.forEach((toggle) => toggle.classList.add("active"))
    }

    // Update text content
    document.querySelectorAll("[data-en]").forEach((element) => {
      element.textContent = element.getAttribute(`data-${language}`)
    })

    // Save language preference
    localStorage.setItem("language", language)
  }

  // Typing animation for home section
  const typingText = document.querySelector(".typing-text")
  if (typingText) {
    const words = ["Flutter", "Mobile Development", "Virtual Assistant", "Web Development"]
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let isEnd = false

    function type() {
      const current = wordIndex % words.length
      const fullText = words[current]

      if (isDeleting) {
        typingText.textContent = fullText.substring(0, charIndex - 1)
        charIndex--
      } else {
        typingText.textContent = fullText.substring(0, charIndex + 1)
        charIndex++
      }

      if (!isDeleting && charIndex === fullText.length) {
        isEnd = true
        isDeleting = true
        setTimeout(type, 1500)
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex++
        setTimeout(type, 500)
      } else {
        setTimeout(type, isDeleting ? 50 : 100)
      }
    }

    type()
  }

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })

    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Project modal functionality
  const projectDetailsTriggers = document.querySelectorAll(".project-details-trigger")
  const projectModal = document.getElementById("projectModal")
  const modalBody = document.querySelector(".modal-body")
  const closeModal = document.querySelector(".close-modal")

  if (projectDetailsTriggers.length > 0 && projectModal) {
    projectDetailsTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault()
        const projectId = trigger.getAttribute("data-project")
        // Here you would typically fetch project details from a database
        // For now, we'll just show a placeholder
        modalBody.innerHTML = `
          <h2>Project Details: ${projectId}</h2>
          <div class="project-detail-content">
            <img src="/placeholder.svg?height=400&width=600" alt="Project Detail" class="project-detail-image">
            <div class="project-detail-info">
              <h3>Description</h3>
              <p>This is a detailed description of the ${projectId} project. In a real implementation, this would be fetched from a database or CMS.</p>
              <h3>Technologies Used</h3>
              <ul>
                <li>Flutter</li>
                <li>Dart</li>
                <li>Firebase</li>
                <li>RESTful APIs</li>
              </ul>
              <h3>Key Features</h3>
              <ul>
                <li>Responsive design</li>
                <li>User authentication</li>
                <li>Real-time updates</li>
                <li>Offline capabilities</li>
              </ul>
              <div class="project-detail-links">
                <a href="#" class="btn primary-btn">View Live Demo</a>
                <a href="#" class="btn secondary-btn">View Source Code</a>
              </div>
            </div>
          </div>
        `
        projectModal.classList.add("active")
        document.body.style.overflow = "hidden"
      })
    })

    closeModal.addEventListener("click", () => {
      projectModal.classList.remove("active")
      document.body.style.overflow = "auto"
    })

    window.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }
})


/// faq section
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});
