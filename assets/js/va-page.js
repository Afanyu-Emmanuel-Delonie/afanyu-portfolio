// VA Page specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // Testimonial carousel
    const testimonials = document.querySelectorAll(".testimonial")
    let currentTestimonial = 0
  
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? "block" : "none"
      })
    }
  
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      showTestimonial(currentTestimonial)
    }
  
    // Initialize testimonials if they exist
    if (testimonials.length > 0) {
      showTestimonial(0)
      setInterval(nextTestimonial, 5000)
    }
  
    // Pricing toggle (monthly/yearly)
    const pricingToggle = document.getElementById("pricing-toggle")
    const monthlyPrices = document.querySelectorAll(".price-monthly")
    const yearlyPrices = document.querySelectorAll(".price-yearly")
    const monthlyLabel = document.getElementById("monthly-label")
    const yearlyLabel = document.getElementById("yearly-label")
  
    if (pricingToggle) {
      pricingToggle.addEventListener("change", () => {
        const isYearly = pricingToggle.checked
  
        monthlyPrices.forEach((price) => {
          price.style.display = isYearly ? "none" : "block"
        })
  
        yearlyPrices.forEach((price) => {
          price.style.display = isYearly ? "block" : "none"
        })
  
        monthlyLabel.classList.toggle("active", !isYearly)
        yearlyLabel.classList.toggle("active", isYearly)
      })
    }
  
    // Service selection in contact form
    const serviceSelect = document.getElementById("service")
    const messageTextarea = document.getElementById("message")
  
    if (serviceSelect && messageTextarea) {
      serviceSelect.addEventListener("change", () => {
        const selectedService = serviceSelect.value
        if (selectedService && selectedService !== "") {
          const currentMessage = messageTextarea.value
          if (!currentMessage.includes(`Service: ${selectedService}`)) {
            messageTextarea.value = `Service: ${selectedService}\n\n${currentMessage}`
          }
        }
      })
    }
  
    // Animate numbers in statistics
    const statNumbers = document.querySelectorAll(".stat-number")
  
    function animateNumbers() {
      statNumbers.forEach((number) => {
        const target = Number.parseInt(number.getAttribute("data-target"))
        const duration = 2000 // 2 seconds
        const step = target / (duration / 16) // 60fps
        let current = 0
  
        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            clearInterval(timer)
            number.textContent = target
          } else {
            number.textContent = Math.floor(current)
          }
        }, 16)
      })
    }
  
    // Initialize number animation if stats exist
    if (statNumbers.length > 0) {
      const statsSection = document.querySelector(".va-stats")
  
      if (statsSection) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateNumbers()
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.2 },
        )
  
        observer.observe(statsSection)
      }
    }
  })


  /// initial animation for the hero page
  document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const targetValue = parseInt(stat.getAttribute('data-count'));
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const frameDuration = 1000/60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.round(progress * targetValue);
        
        if (frame === totalFrames) {
          stat.textContent = targetValue;
          clearInterval(counter);
        } else {
          stat.textContent = currentValue;
        }
      }, frameDuration);
    });
    
  })