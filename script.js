const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Remove any existing success message
        const existingMessage = this.querySelector('.form-success');
        if (existingMessage) existingMessage.remove();
        
        // Show temporary "sending" message
        const sendingMessage = document.createElement('div');
        sendingMessage.className = 'form-success';
        sendingMessage.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i><p>Sending your message...</p>`;
        
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.insertAdjacentElement('afterend', sendingMessage);
        
        // Submit the form data to FormSubmit
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                sendingMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you! Your message has been sent.</p>
                `;
                this.reset();
            } else {
                throw new Error('Failed to send');
            }
        })
        .catch(error => {
            sendingMessage.innerHTML = `
                <i class="fas fa-times-circle"></i>
                <p>Failed to send. Please try again or email me directly.</p>
            `;
        })
        .finally(() => {
            // Auto-remove message after 5 seconds
            setTimeout(() => {
                sendingMessage.classList.add('fade-out');
                setTimeout(() => sendingMessage.remove(), 500);
            }, 5000);
        });
    });
}

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Animate Stats Counter
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const count = parseInt(stat.innerText);
        const increment = target / 200;

        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 1);
        } else {
            stat.innerText = target;
        }
    });
};

// Quote Carousel
const quotes = document.querySelectorAll('.quote-item');
let currentQuote = 0;

const showQuote = (index) => {
    quotes.forEach(quote => quote.classList.remove('active'));
    quotes[index].classList.add('active');
};

const nextQuote = () => {
    currentQuote = (currentQuote + 1) % quotes.length;
    showQuote(currentQuote);
};

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start stats animation
    animateStats();
    
    // Start quote carousel
    setInterval(nextQuote, 5000);
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.expertise-item, .quick-nav-card').forEach(el => {
        observer.observe(el);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to expertise items
document.querySelectorAll('.expertise-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Navigation scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Section Visibility Animation
const pageSections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

pageSections.forEach(section => {
    sectionObserver.observe(section);
});

// Enhanced Button Click Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});