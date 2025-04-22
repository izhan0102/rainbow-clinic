// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Force all elements to load immediately
    document.querySelectorAll('img, .card, .service-cards, .about-content, .about-image').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'none';
    });
    
    // Ensure hero image loads properly
    const heroImage = document.querySelector('.main-hero-image');
    if (heroImage) {
        heroImage.onload = function() {
            this.style.opacity = '1';
        };
        
        // If image is already loaded
        if (heroImage.complete) {
            heroImage.style.opacity = '1';
        }
    }
    
    // Prevent horizontal scroll
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
    document.documentElement.style.maxWidth = '100vw';
    
    // Remove any horizontal scrollbars
    const style = document.createElement('style');
    style.textContent = `
        body, html {
            overflow-x: hidden !important;
            max-width: 100vw;
            width: 100%;
        }
        
        * {
            max-width: 100%;
        }
        
        ::-webkit-scrollbar {
            display: none;
        }
        
        .container, section, .hero, .services, .about, .contact {
            overflow-x: hidden;
            max-width: 100vw;
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
    
    // Fix any overflow issues on mobile
    const fixMobileOverflow = () => {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
        
        // Remove any scrollbars that might have been created
        document.querySelectorAll('div, section, .container').forEach(el => {
            el.style.maxWidth = '100%';
            el.style.overflowX = 'hidden';
        });
        
        // Ensure all content is visible immediately
        document.querySelectorAll('.card, .about-content, .about-image, .service-cards').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        
        // Ensure all elements fit within viewport
        const viewportWidth = window.innerWidth;
        document.querySelectorAll('img, .card, .service-cards, .hero-content, .about-content').forEach(el => {
            if (el.offsetWidth > viewportWidth) {
                el.style.width = '100%';
                el.style.maxWidth = '100%';
            }
        });
    };
    
    // Run immediately and on resize
    fixMobileOverflow();
    window.addEventListener('resize', fixMobileOverflow);
    window.addEventListener('load', fixMobileOverflow);
    window.addEventListener('scroll', fixMobileOverflow);
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        fixMobileOverflow(); // Re-apply overflow fixes after menu toggle
    });
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                const lines = hamburger.querySelectorAll('.line');
                lines[0].classList.remove('rotate-down');
                lines[1].classList.remove('fade-out');
                lines[2].classList.remove('rotate-up');
                
                fixMobileOverflow(); // Re-apply overflow fixes after menu close
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Navbar color change on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Form submission with animation
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                button.classList.add('success');
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    button.textContent = originalText;
                    button.classList.remove('success');
                }, 3000);
            }
        });
    }
    
    // Add animated bubbles to the background
    const createBubbles = () => {
        const sections = document.querySelectorAll('.hero, .services, .about, .contact');
        
        sections.forEach(section => {
            const numberOfBubbles = 5;
            
            for (let i = 0; i < numberOfBubbles; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('background-bubble');
                
                // Random position, size and animation delay
                const size = Math.random() * 50 + 20;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 10 + 10;
                
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${posX}%`;
                bubble.style.top = `${posY}%`;
                bubble.style.animationDelay = `${delay}s`;
                bubble.style.animationDuration = `${duration}s`;
                
                // Add random color based on our theme
                const colors = ['rgba(33, 150, 243, 0.2)', 'rgba(255, 128, 171, 0.2)', 'rgba(13, 71, 161, 0.1)'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                bubble.style.backgroundColor = randomColor;
                
                section.appendChild(bubble);
            }
        });
    };
    
    createBubbles();
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add a little animation to the cards on hover
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
});

// Gallery Modal functionality
function setupGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const modalClose = document.querySelector('.modal-close');
    const modalImg = document.getElementById('galleryModalImg');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Setup click events for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal on click
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize the gallery modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupGalleryModal();
    
    // Add hover effects to team members
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'translateY(0)';
        });
    });
}); 