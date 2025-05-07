document.addEventListener('DOMContentLoaded', function() {
    // Testimonials slider
    function initTestimonialsSlider() {
      const testimonialItems = document.querySelectorAll('.testimonial-item');
      const dots = document.querySelectorAll('.testimonial-dot');
      const prevBtn = document.querySelector('.testimonial-prev');
      const nextBtn = document.querySelector('.testimonial-next');
      
      let currentIndex = 0;
      const totalItems = testimonialItems.length;
      
      // Function to show testimonial at specific index
      function showTestimonial(index) {
        // Handle index bounds
        if (index < 0) {
          index = totalItems - 1;
        } else if (index >= totalItems) {
          index = 0;
        }
        
        // Update current index
        currentIndex = index;
        
        // Hide all testimonials
        testimonialItems.forEach(item => {
          item.classList.remove('active');
          item.style.opacity = '0';
          item.style.transform = 'translateX(50px)';
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
          dot.classList.remove('active');
        });
        
        // Show current testimonial with animation
        setTimeout(() => {
          testimonialItems[currentIndex].classList.add('active');
          testimonialItems[currentIndex].style.opacity = '1';
          testimonialItems[currentIndex].style.transform = 'translateX(0)';
          
          // Activate current dot
          dots[currentIndex].classList.add('active');
        }, 300);
      }
      
      // Next button click handler
      nextBtn.addEventListener('click', function() {
        showTestimonial(currentIndex + 1);
      });
      
      // Previous button click handler
      prevBtn.addEventListener('click', function() {
        showTestimonial(currentIndex - 1);
      });
      
      // Dot click handlers
      dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
          showTestimonial(index);
        });
      });
      
      // Auto slide every 5 seconds
      let autoSlide = setInterval(() => {
        showTestimonial(currentIndex + 1);
      }, 5000);
      
      // Pause auto slide when hovering over testimonial
      const testimonialsSection = document.querySelector('.testimonials-slider');
      testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
      });
      
      // Resume auto slide when mouse leaves testimonial
      testimonialsSection.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
          showTestimonial(currentIndex + 1);
        }, 5000);
      });
      
      // Touch events for mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      const slider = document.querySelector('.testimonials-slider');
      
      slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
        // Detect swipe direction
        if (touchEndX < touchStartX - 50) {
          // Swipe left - go to next
          showTestimonial(currentIndex + 1);
        } else if (touchEndX > touchStartX + 50) {
          // Swipe right - go to previous
          showTestimonial(currentIndex - 1);
        }
      }
    }
    
    // Initialize testimonials slider
    initTestimonialsSlider();
  });