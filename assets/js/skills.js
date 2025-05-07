/**
 * Skills Tab Management and Animation
 * This script handles the skills progress bar animations
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initial animation for all skill bars
  const technicalSkills = document.getElementById('technical-skills');
  const softSkills = document.getElementById('soft-skills');
  
  animateSkillBars(technicalSkills);
  animateSkillBars(softSkills);
  
  // Function to animate skill progress bars
  function animateSkillBars(container) {
    if (!container) return;
    
    const skillBars = container.querySelectorAll('.skill-progress');
    const percentageElements = container.querySelectorAll('.skill-percentage');
    
    skillBars.forEach((bar, index) => {
      const targetProgress = bar.getAttribute('data-progress');
      
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
          
          if (currentPercent >= parseInt(targetProgress)) {
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
          animateSkillBars(technicalSkills);
          animateSkillBars(softSkills);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
  }
});