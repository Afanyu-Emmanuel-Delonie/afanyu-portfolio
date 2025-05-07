document.addEventListener('DOMContentLoaded', function () {
  // Project filtering
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        // Filter the projects
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
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

    if (!modal || !closeBtn || !modalBody) return;

    // Project details data
    const projectDetails = {
      ecommerce: {
        title: 'E-commerce Mobile App',
        images: ['/placeholder.svg?height=500&width=800'],
        description: `<p>...project description here...</p>`,
        links: {
          live: '#',
        }
      },
     
    };

    // Open modal with project details
    detailTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        const project = projectDetails[projectId];

        if (!project) {
          modalBody.innerHTML = `<p>Project details not found.</p>`;
          modal.style.display = 'flex';
          return;
        }

        const galleryHtml = project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('');

        const modalContent = `
          <div class="modal-header">
            <h2>${project.title}</h2>
          </div>
          <div class="modal-gallery">${galleryHtml}</div>
          <div class="modal-description">${project.description}</div>
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
      });
    });

    // Close modal
    closeBtn.addEventListener('click', function () {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    });

    // Close modal on outside click
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });
  }

  // Initialize all
  initProjectFilters();
  initProjectModal();
});
