/**
 * Skills Tab Management and Animation
 * This script handles the skills tab switching and progress bar animations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillGrids = document.querySelectorAll('.skills-grid');
    
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        skillTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all skill grids
        skillGrids.forEach(grid => grid.classList.remove('active'));
        
        // Show the target skill grid
        const targetGrid = document.getElementById(`${tab.dataset.target}-skills`);
        if (targetGrid) {
          targetGrid.classList.add('active');
          // Animate the progress bars in the visible grid
          animateSkillBars(targetGrid);
        }
      });
    });
    
    // Initial animation for visible skill bars
    animateSkillBars(document.querySelector('.skills-grid.active'));
    
    // Function to animate skill progress bars
    function animateSkillBars(container) {
      if (!container) return;
      
      const skillBars = container.querySelectorAll('.skill-progress');
      const percentageElements = container.querySelectorAll('.skill-percentage');
      
      skillBars.forEach((bar, index) => {
        const targetProgress = bar.dataset.progress;
        
        // Reset progress
        bar.style.width = '0%';
        percentageElements[index].textContent = '0%';
        
        // Animate progress bar
        setTimeout(() => {
          bar.style.transition = 'width 1.5s ease-in-out';
          bar.style.width = `${targetProgress}%`;
          
          // Animate percentage number
          let currentPercent = 0;
          const interval = setInterval(() => {
            currentPercent++;
            percentageElements[index].textContent = `${currentPercent}%`;
            
            if (currentPercent >= targetProgress) {
              clearInterval(interval);
            }
          }, 15);
        }, 200 * index);
      });
    }
    
    // Re-animate skills when scrolled into view
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeGrid = document.querySelector('.skills-grid.active');
            animateSkillBars(activeGrid);
          }
        });
      }, { 
        threshold: 0.3 
      });
      
      observer.observe(skillsSection);
    }
  });