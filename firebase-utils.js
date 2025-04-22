/**
 * Rainbow Clinic Firebase Utilities
 * 
 * This file contains utility functions for interacting with Firebase
 * to load dynamic content from the Realtime Database.
 */

// Function to fetch data from Firebase Realtime Database
function fetchFromDatabase(path, callback) {
  const dbRef = window.firebaseDatabaseRef(window.firebaseDatabase, path);
  
  window.firebaseOnValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      console.log('No data available at path: ' + path);
    }
  }, (error) => {
    console.error('Error fetching data:', error);
  });
}

// Example function to load services dynamically
function loadDynamicServices() {
  fetchFromDatabase('/services', (services) => {
    const serviceContainer = document.querySelector('.service-cards');
    
    if (!serviceContainer) return;
    
    // Clear existing content
    serviceContainer.innerHTML = '';
    
    // Add services from database
    Object.keys(services).forEach(key => {
      const service = services[key];
      
      const serviceCard = document.createElement('div');
      serviceCard.className = 'card';
      
      serviceCard.innerHTML = `
        <div class="card-icon">
          <i class="${service.icon || 'fas fa-star'}"></i>
        </div>
        <h3>${service.title || 'Service'}</h3>
        <p>${service.description || 'Service description'}</p>
        <a href="#contact" class="service-link">Book Now</a>
      `;
      
      serviceContainer.appendChild(serviceCard);
    });
  });
}

// Function to load team members dynamically
function loadDynamicTeam() {
  // First load the director's profile
  fetchFromDatabase('/team/director', (director) => {
    const directorProfile = document.getElementById('directorProfile');
    
    if (directorProfile && director) {
      directorProfile.innerHTML = `
        <div class="director-image">
          <img src="${director.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80'}" alt="${director.name || 'Director'}" loading="lazy">
        </div>
        <div class="director-info">
          <h3>${director.name || 'Clinic Director'}</h3>
          <p class="director-title">${director.title || 'Clinic Director & Child Psychologist'}</p>
          <div class="director-details">
            ${director.bio ? `<p>${director.bio}</p>` : ''}
            ${director.education ? `<p>${director.education}</p>` : ''}
          </div>
          <div class="director-credentials">
            ${director.credentials ? director.credentials.map(credential => `
              <div class="credential-item">
                <i class="${credential.icon || 'fas fa-certificate'}"></i>
                <span>${credential.text}</span>
              </div>
            `).join('') : ''}
          </div>
        </div>
      `;
    }
  });
  
  // Then load the team members
  fetchFromDatabase('/team/members', (members) => {
    const teamGrid = document.getElementById('teamGrid');
    
    if (teamGrid && members) {
      // Clear existing content
      teamGrid.innerHTML = '';
      
      // Add team members from database
      Object.keys(members).forEach(key => {
        const member = members[key];
        
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        
        teamMember.innerHTML = `
          <div class="member-image">
            <img src="${member.imageUrl || 'https://via.placeholder.com/300x400?text=Team+Member'}" alt="${member.name}" loading="lazy">
          </div>
          <div class="member-info">
            <h4>${member.name || 'Team Member'}</h4>
            <p class="member-title">${member.title || 'Therapist'}</p>
            <p class="member-description">${member.description || ''}</p>
          </div>
        `;
        
        teamGrid.appendChild(teamMember);
      });
    }
  });
}

// Function to load gallery images dynamically
function loadDynamicGallery() {
  const galleryContainer = document.getElementById('galleryGrid');
  
  if (!galleryContainer) return;
  
  fetchFromDatabase('/gallery', (gallery) => {
    // Clear loading spinner
    galleryContainer.innerHTML = '';
    
    if (gallery && Object.keys(gallery).length > 0) {
      // Add gallery images from database
      Object.keys(gallery).forEach(key => {
        const item = gallery[key];
        addGalleryItem(galleryContainer, item.imageUrl, item.caption);
      });
    } else {
      // Fallback to Unsplash images if no gallery data exists
      loadUnsplashImages(galleryContainer);
    }
    
    // Add modal for image viewing
    setupGalleryModal();
  });
}

// Fallback function to load images from Unsplash
function loadUnsplashImages(container) {
  // Array of Unsplash images for children's therapy/psychology
  const unsplashImages = [
    {
      url: 'https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGQlMjBwbGF5aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
      caption: 'Creative play activities to develop emotional expression'
    },
    {
      url: 'https://images.unsplash.com/photo-1615627121117-e3278bc8b1db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hpbGQlMjBwbGF5aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
      caption: 'Building confidence through guided activities'
    },
    {
      url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlcmFweXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'A calm and welcoming therapy environment'
    },
    {
      url: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGQlMjBkcmF3aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
      caption: 'Art therapy sessions for emotional expression'
    },
    {
      url: 'https://images.unsplash.com/photo-1489710020360-66e504159b43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpbGRyZW4lMjBwbGF5aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
      caption: 'Group activities to develop social skills'
    },
    {
      url: 'https://images.unsplash.com/photo-1518880073437-13d11c545a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWxkcmVuJTIwcGxheWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
      caption: 'Safe spaces for children to explore and grow'
    }
  ];
  
  // Add each image to the gallery
  unsplashImages.forEach(img => {
    addGalleryItem(container, img.url, img.caption);
  });
}

// Helper function to add gallery items
function addGalleryItem(container, imageUrl, caption) {
  const galleryItem = document.createElement('div');
  galleryItem.className = 'gallery-item';
  
  galleryItem.innerHTML = `
    <img src="${imageUrl}" alt="${caption || 'Rainbow Clinic Gallery Image'}" loading="lazy">
    <div class="gallery-caption">${caption || ''}</div>
  `;
  
  // Add click event for modal
  galleryItem.addEventListener('click', function() {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('galleryModalImg');
    
    if (modal && modalImg) {
      modalImg.src = imageUrl;
      modal.classList.add('active');
    }
  });
  
  container.appendChild(galleryItem);
}

// Setup gallery modal for image viewing
function setupGalleryModal() {
  // Check if modal already exists
  if (document.getElementById('galleryModal')) return;
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.id = 'galleryModal';
  
  modal.innerHTML = `
    <div class="gallery-modal-content">
      <img id="galleryModalImg" src="" alt="Gallery Image">
      <div class="gallery-modal-close">&times;</div>
    </div>
  `;
  
  // Close modal when clicking the X or outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('gallery-modal-close')) {
      modal.classList.remove('active');
    }
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
  
  document.body.appendChild(modal);
}

// Example function to load testimonials dynamically
function loadDynamicTestimonials() {
  fetchFromDatabase('/testimonials', (testimonials) => {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    
    if (!testimonialsContainer) return;
    
    // Clear existing content
    testimonialsContainer.innerHTML = '';
    
    // Add testimonials from database
    Object.keys(testimonials).forEach(key => {
      const testimonial = testimonials[key];
      
      const testimonialItem = document.createElement('div');
      testimonialItem.className = 'testimonial';
      
      testimonialItem.innerHTML = `
        <div class="testimonial-content">
          <p class="testimonial-text">${testimonial.text || ''}</p>
          <div class="testimonial-author">
            <h4>${testimonial.name || 'Anonymous'}</h4>
            <p>${testimonial.title || ''}</p>
          </div>
        </div>
      `;
      
      testimonialsContainer.appendChild(testimonialItem);
    });
  });
}

// Export functions for use in other scripts
window.RainbowClinic = {
  fetchFromDatabase,
  loadDynamicServices,
  loadDynamicGallery,
  loadDynamicTeam,
  loadDynamicTestimonials
}; 