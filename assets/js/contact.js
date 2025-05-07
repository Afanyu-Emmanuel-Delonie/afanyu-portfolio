document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation and submission
    function initContactForm() {
      const contactForm = document.getElementById('contactForm');
      const formStatus = document.querySelector('.form-status');
      
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form inputs
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const subject = document.getElementById('subject').value.trim();
          const message = document.getElementById('message').value.trim();
          
          // Validate inputs
          if (!name || !email || !subject || !message) {
            showFormMessage('error', 'Please fill in all fields');
            return;
          }
          
          // Validate email format
          if (!isValidEmail(email)) {
            showFormMessage('error', 'Please enter a valid email address');
            return;
          }
          
          // In a real implementation, you would send the form data to a server
          // Here we'll simulate the process with a timeout
          showFormMessage('sending', 'Sending your message...');
          
          // Simulate form submission
          setTimeout(() => {
            // Success simulation
            showFormMessage('success', 'Your message has been sent successfully!');
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
              formStatus.textContent = '';
              formStatus.className = 'form-status';
            }, 5000);
          }, 1500);
        });
      }
      
      // Helper function to show form messages
      function showFormMessage(type, message) {
        formStatus.textContent = message;
        formStatus.className = 'form-status';
        formStatus.classList.add(`form-${type}`);
      }
      
      // Helper function to validate email format
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    }
    
    // Form input animation
    function initFormInputAnimation() {
      const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
      
      formInputs.forEach(input => {
        // Add focus class when input is focused
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        // Remove focus class when input loses focus
        input.addEventListener('blur', function() {
          if (this.value.trim() === '') {
            this.parentElement.classList.remove('focused');
          }
        });
        
        // Add focused class if input has value (on page load)
        if (input.value.trim() !== '') {
          input.parentElement.classList.add('focused');
        }
      });
    }
    
    // WhatsApp direct message handling
    function initWhatsAppLink() {
      const whatsappLink = document.querySelector('.whatsapp-link');
      
      if (whatsappLink) {
        whatsappLink.addEventListener('click', function(e) {
          e.preventDefault();
          
          const phone = this.getAttribute('href').replace('https://wa.me/', '');
          const message = encodeURIComponent('Hello, I visited your portfolio website and I would like to discuss a potential project.');
          
          window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
      }
    }
    
    // Map loading optimization
    function initLazyMapLoading() {
      const mapFrame = document.querySelector('.contact-map iframe');
      
      if (mapFrame) {
        // Create an Intersection Observer to load the map when it comes into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Get the data-src and set it as the src
              const src = mapFrame.getAttribute('src');
              mapFrame.setAttribute('src', src);
              
              // Once loaded, no need to observe anymore
              observer.unobserve(mapFrame);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(mapFrame);
      }
    }
    
    // Initialize everything
    initContactForm();
    initFormInputAnimation();
    initWhatsAppLink();
    initLazyMapLoading();
  });