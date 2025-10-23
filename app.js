// Portfolio Website JavaScript

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            // Add active class to current section's nav link
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(38, 40, 40, 0.98)';
        } else {
            navbar.style.background = 'rgba(38, 40, 40, 0.95)';
        }
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Simple form validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Message display function
function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const message = document.createElement('div');
    message.className = `form-message status status--${type}`;
    message.textContent = text;
    message.style.marginTop = '16px';
    
    // Insert message after the form
    contactForm.parentNode.insertBefore(message, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills progress animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 200);
    });
}

// DOMContentLoaded - All initialization code here
document.addEventListener('DOMContentLoaded', () => {
    // Image Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');
    let lastFocusedElement;

    function openModal(src, alt) {
        lastFocusedElement = document.activeElement;
        modal.style.display = 'flex';
        modal.classList.add('active');
        modalImg.src = src;
        modalImg.alt = alt || "enlarged image";
        closeModal.focus();
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFn() {
        modal.style.display = 'none';
        modal.classList.remove('active');
        modalImg.src = '';
        document.body.style.overflow = '';
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    // Click any .image-placeholder img to enlarge
    document.querySelectorAll('.image-placeholder img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', e => {
            e.stopPropagation();
            openModal(img.src, img.alt);
        });
    });

    // Close logic
    if (closeModal) {
        closeModal.onclick = closeModalFn;
    }
    
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModalFn();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (modal && modal.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
            closeModalFn();
        }
        // Trap focus inside modal
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Tab') {
                e.preventDefault();
                if (closeModal) closeModal.focus();
            }
        }
    });

    // Add initial styles for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .image-placeholder, .instructions-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize skill animation when skills section is visible
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
});
