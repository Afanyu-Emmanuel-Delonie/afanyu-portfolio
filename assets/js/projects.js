document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    function initProjectFilters() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          // Add active class to clicked button
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          // Filter the projects
          projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              // Show the card with animation
              card.style.display = 'block';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 100);
            } else {
              // Hide the card with animation
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
    
    // Initialize project details modal
    function initProjectModal() {
      const modal = document.getElementById('projectModal');
      const closeBtn = document.querySelector('.close-modal');
      const modalBody = document.querySelector('.modal-body');
      const detailTriggers = document.querySelectorAll('.project-details-trigger');
      
      // Project details data
      const projectDetails = {
        ecommerce: {
          title: 'E-commerce Mobile App',
          images: ['/placeholder.svg?height=500&width=800'],
          description: `
            <p>A comprehensive e-commerce mobile application built with Flutter and Firebase, featuring a clean user interface, smooth animations, and a robust backend.</p>
            <h4>Key Features:</h4>
            <ul>
              <li>User authentication and profile management</li>
              <li>Product catalog with categories and search functionality</li>
              <li>Shopping cart and wishlist management</li>
              <li>Order tracking and history</li>
              <li>Payment gateway integration</li>
              <li>Push notifications for order updates</li>
            </ul>
            <h4>Technical Stack:</h4>
            <ul>
              <li>Flutter for cross-platform development</li>
              <li>Firebase Authentication for user management</li>
              <li>Cloud Firestore for real-time database</li>
              <li>Firebase Storage for image uploads</li>
              <li>Provider for state management</li>
              <li>Custom animations and UI components</li>
            </ul>
          `,
          links: {
            live: '#',
            github: '#',
            dribbble: '#'
          }
        },
        taskmanager: {
          title: 'Task Management App',
          images: ['/placeholder.svg?height=500&width=800'],
          description: `
            <p>A productivity app built with Flutter featuring task categorization, reminders, and cloud synchronization.</p>
            <h4>Key Features:</h4>
            <ul>
              <li>Task creation, editing, and deletion</li>
              <li>Category-based organization</li>
              <li>Priority levels and due dates</li>
              <li>Reminder notifications</li>
              <li>Progress tracking and statistics</li>
              <li>Dark and light theme support</li>
            </ul>
            <h4>Technical Stack:</h4>
            <ul>
              <li>Flutter for UI development</li>
              <li>Hive for local storage</li>
              <li>Provider for state management</li>
              <li>Flutter Local Notifications for reminders</li>
              <li>Custom animations and transitions</li>
            </ul>
          `,
          links: {
            live: '#',
            github: '#',
            dribbble: '#'
          }
        },
        weather: {
          title: 'Weather Forecast App',
          images: ['/placeholder.svg?height=500&width=800'],
          description: `
            <p>A beautiful weather application with animations, location detection, and 7-day forecasts.</p>
            <h4>Key Features:</h4>
            <ul>
              <li>Current weather conditions display</li>
              <li>7-day weather forecast</li>
              <li>Location-based weather data</li>
              <li>Weather animations based on conditions</li>
              <li>Multiple location saving</li>
              <li>Weather alerts and notifications</li>
            </ul>
            <h4>Technical Stack:</h4>
            <ul>
              <li>Flutter for UI development</li>
              <li>OpenWeatherMap API integration</li>
              <li>Geolocator for location services</li>
              <li>Lottie for weather animations</li>
              <li>Shared Preferences for saving user preferences</li>
            </ul>
          `,
          links: {
            live: '#',
            github: '#',
            dribbble: '#'
          }
        },
        chat: {
          title: 'Real-time Chat App',
          images: ['/placeholder.svg?height=500&width=800'],
          description: `
            <p>A messaging application with real-time updates, media sharing, and user authentication.</p>
            <h4>Key Features:</h4>
            <ul>
              <li>Real-time messaging</li>
              <li>Media sharing (images, videos, documents)</li>
              <li>User profiles and contacts</li>
              <li>Group chat functionality</li>
              <li>Online status indicators</li>
              <li>Message read receipts</li>
            </ul>
            <h4>Technical Stack:</h4>
            <ul>
              <li>Flutter for cross-platform development</li>
              <li>Firebase Authentication for user management</li>
              <li>Firestore for real-time database</li>
              <li>Firebase Storage for media files</li>
              <li>Cloud Functions for backend logic</li>
              <li>Provider for state management</li>
            </ul>
          `,
          links: {
            live: '#',
            github: '#',
            dribbble: '#'
          }
        },
        portfolio: {
          title: 'Personal Portfolio Website',
          images: ['/placeholder.svg?height=500&width=800'],
          description: `
            <p>A responsive personal portfolio website built with HTML, CSS, and JavaScript.</p>
            <h4>Key Features:</h4>
            <ul>
              <li>Responsive design for all devices</li>
              <li>Interactive project showcase</li>
              <li>Smooth scrolling and animations</li>
              <li>Contact form with validation</li>
              <li>Light and dark mode toggle</li>
              <li>Multilingual support (English and French)</li>
            </ul>
            <h4>Technical Stack:</h4>
            <ul>
              <li>HTML5 for structure</li>
              <li>CSS3 for styling (including animations)</li>
              <li>JavaScript for interactivity</li>
              <li>AOS library for scroll animations</li>
              <li>Font Awesome for icons</li>
            </ul>
          `,
          links: {
            live: '#',
            github: '#',
            dribbble: '#'
          }
        },
        uidesign: {
          title: 'Mobile App UI Design',
          images: ['/placeholder.svg?height=500&width=800'],
          description: `
            <p>A modern and clean UI design for a fitness tracking mobile application.</p>
            <h4>Key Design Elements:</h4>
            <ul>
              <li>Minimalist and intuitive interface</li>
              <li>Consistent color scheme and typography</li>
              <li>Custom illustrations and icons</li>
              <li>Interactive prototypes</li>
              <li>User-centered design approach</li>
              <li>Accessibility considerations</li>
            </ul>
            <h4>Tools Used:</h4>
            <ul>
              <li>Figma for design and prototyping</li>
              <li>Adobe XD for initial wireframes</li>
              <li>Illustrator for custom icons</li>
              <li>User testing for feedback</li>
            </ul>
          `,
          links: {
            live: '#',
            behance: '#',
            dribbble: '#'
          }
        }
      };
      
      // Open modal with project details
      detailTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          
          const projectId = this.getAttribute('data-project');
          const project = projectDetails[projectId];
          
          if (project) {
            // Create modal content
            let modalContent = `
              <div class="modal-header">
                <h2>${project.title}</h2>
              </div>
              <div class="modal-gallery">
                ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
              </div>
              <div class="modal-description">
                ${project.description}
              </div>
              <div class="modal-links">
                ${project.links.live ? `<a href="${project.links.live}" class="btn primary-btn" target="_blank"><i class="fas fa-external-link-alt"></i> View Live</a>` : ''}
                ${project.links.github ? `<a href="${project.links.github}" class="btn outline-btn" target="_blank"><i class="fab fa-github"></i> View Code</a>` : ''}
                ${project.links.behance ? `<a href="${project.links.behance}" class="btn outline-btn" target="_blank"><i class="fab fa-behance"></i> View on Behance</a>` : ''}
                ${project.links.dribbble ? `<a href="${project.links.dribbble}" class="btn outline-btn" target="_blank"><i class="fab fa-dribbble"></i> View on Dribbble</a>` : ''}
              </div>
            `;
            
            modalBody.innerHTML = modalContent;
            
            // Show modal with animation
            modal.style.display = 'flex';
            setTimeout(() => {
              modal.classList.add('active');
            }, 10);
          }
        });
      });
      
      // Close modal
      closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      });
      
      // Close modal when clicking outside
      window.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('active');
          setTimeout(() => {
            modal.style.display = 'none';
          }, 300);
        }
      });
    }
    
    // Initialize everything
    initProjectFilters();
    initProjectModal();
  });