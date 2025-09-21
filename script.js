// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Optimized navbar scroll behavior
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Optimized Intersection Observer for smooth animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .stat-item, .about-text');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add optimized CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(44, 95, 95, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Portfolio item click handling
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;
        const category = item.getAttribute('data-category');
        
        showPortfolioGallery(title, description, category);
    });
});

// Portfolio gallery data
const portfolioGalleryData = {
    coroas: {
        images: [
            'images/coroas-digitais.jpg',
            'images/coroas-digitais-2.jpg',
            'images/coroas-digitais-3.jpg'
        ],
        titles: [
            'Coroas Estéticas - Vista Frontal',
            'Coroas Estéticas - Vista Lateral',
            'Coroas Estéticas - Detalhe'
        ]
    },
    facetas: {
        images: [
            'images/facetas-laminadas.jpg',
            'images/facetas-laminadas-2.jpg',
            'images/facetas-laminadas-3.jpg',
            'images/facetas-laminadas-4.jpg'
        ],
        titles: [
            'Facetas Laminadas - Antes',
            'Facetas Laminadas - Durante',
            'Facetas Laminadas - Depois',
            'Facetas Laminadas - Detalhe'
        ]
    },
    enceramento: {
        images: [
            'images/enceramento-digital.jpg',
            'images/enceramento-digital-2.jpg'
        ],
        titles: [
            'Enceramento Digital - Planejamento',
            'Enceramento Digital - Resultado'
        ]
    },
    modelos: {
        images: [
            'images/modelos-3d.jpg',
            'images/modelos-3d-2.jpg',
            'images/modelos-3d-3.jpg',
            'images/modelos-3d-4.jpg',
            'images/modelos-3d-5.jpg'
        ],
        titles: [
            'Modelo 3D - Vista Geral',
            'Modelo 3D - Vista Superior',
            'Modelo 3D - Vista Lateral',
            'Modelo 3D - Detalhe Interno',
            'Modelo 3D - Renderização'
        ]
    },
    guias: {
        images: [
            'images/guias-cirurgicos.jpg',
            'images/guias-cirurgicos-2.jpg',
            'images/guias-cirurgicos-3.jpg'
        ],
        titles: [
            'Guia Cirúrgico - Design',
            'Guia Cirúrgico - Fabricação',
            'Guia Cirúrgico - Aplicação'
        ]
    },
    placas: {
        images: [
            'images/placas-odontologicas.jpg',
            'images/placas-odontologicas-2.jpg'
        ],
        titles: [
            'Placa Odontológica - Design',
            'Placa Odontológica - Finalizada'
        ]
    }
};

// Portfolio gallery
function showPortfolioGallery(title, description, category) {
    // Remove existing modal
    const existingModal = document.querySelector('.portfolio-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const galleryData = portfolioGalleryData[category] || {
        images: ['images/placeholder.jpg'],
        titles: ['Imagem do Projeto']
    };
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${description}</p>
                <div class="modal-image-container">
                    <img class="modal-main-image" src="${galleryData.images[0]}" alt="${galleryData.titles[0]}" id="mainImage">
                    <button class="modal-image-nav prev" id="prevBtn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="modal-image-nav next" id="nextBtn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="modal-thumbnails" id="thumbnails">
                    ${galleryData.images.map((img, index) => `
                        <img class="modal-thumbnail ${index === 0 ? 'active' : ''}" 
                             src="${img}" 
                             alt="${galleryData.titles[index]}" 
                             data-index="${index}">
                    `).join('')}
                </div>
                <div class="modal-image-counter">
                    <span id="imageCounter">1 / ${galleryData.images.length}</span>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary">Solicitar Orçamento</button>
                <button class="modal-btn modal-btn-secondary">Fechar</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: var(--secondary-dark);
        border: 1px solid rgba(74, 157, 157, 0.3);
        border-radius: 12px;
        max-width: 800px;
        width: 95%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        z-index: 1;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 100);
    
    // Gallery functionality
    let currentImageIndex = 0;
    const mainImage = modal.querySelector('#mainImage');
    const prevBtn = modal.querySelector('#prevBtn');
    const nextBtn = modal.querySelector('#nextBtn');
    const thumbnails = modal.querySelectorAll('.modal-thumbnail');
    const imageCounter = modal.querySelector('#imageCounter');
    
    function updateImage(index) {
        currentImageIndex = index;
        mainImage.src = galleryData.images[index];
        mainImage.alt = galleryData.titles[index];
        
        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Update counter
        imageCounter.textContent = `${index + 1} / ${galleryData.images.length}`;
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === galleryData.images.length - 1;
    }
    
    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            updateImage(currentImageIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < galleryData.images.length - 1) {
            updateImage(currentImageIndex + 1);
        }
    });
    
    // Thumbnail event listeners
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateImage(index);
        });
    });
    
    // Keyboard navigation
    const handleKeyPress = (e) => {
        if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            updateImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight' && currentImageIndex < galleryData.images.length - 1) {
            updateImage(currentImageIndex + 1);
        } else if (e.key === 'Escape') {
            closeModal();
        }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    // Close functionality
    const closeModal = () => {
        document.removeEventListener('keydown', handleKeyPress);
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.9)';
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-btn-secondary').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Primary button functionality
    modal.querySelector('.modal-btn-primary').addEventListener('click', () => {
        closeModal();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Initialize
    updateImage(0);
}

// Add CSS for modal
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-header {
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid rgba(74, 157, 157, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: 600;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .modal-close:hover {
        color: var(--text-primary);
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .modal-body p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .modal-image-container {
        position: relative;
        margin-bottom: 2rem;
        border-radius: 12px;
        overflow: hidden;
        background: var(--secondary-dark);
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-main-image {
        width: 100%;
        max-height: 400px;
        object-fit: contain;
        border-radius: 12px;
        transition: transform 0.3s ease;
    }
    
    .modal-image-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.7);
        border: none;
        color: var(--text-primary);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        z-index: 10;
    }
    
    .modal-image-nav:hover {
        background: var(--accent-glow);
        transform: translateY(-50%) scale(1.1);
    }
    
    .modal-image-nav.prev {
        left: 20px;
    }
    
    .modal-image-nav.next {
        right: 20px;
    }
    
    .modal-image-nav:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
    
    .modal-image-nav:disabled:hover {
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.7);
    }
    
    .modal-thumbnails {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .modal-thumbnail {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        opacity: 0.7;
    }
    
    .modal-thumbnail:hover {
        opacity: 1;
        border-color: var(--accent-glow);
    }
    
    .modal-thumbnail.active {
        opacity: 1;
        border-color: var(--accent-glow);
        box-shadow: 0 0 10px rgba(74, 157, 157, 0.5);
    }
    
    .modal-image-counter {
        text-align: center;
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-top: 1rem;
    }
    
    .modal-placeholder {
        background: var(--gradient-secondary);
        border-radius: 12px;
        padding: 3rem;
        text-align: center;
        color: var(--text-primary);
    }
    
    .modal-placeholder i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.8;
    }
    
    .modal-placeholder span {
        font-weight: 500;
    }
    
    .modal-footer {
        padding: 1rem 2rem 2rem;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .modal-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .modal-btn-primary {
        background: var(--gradient-primary);
        color: var(--text-primary);
    }
    
    .modal-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(44, 95, 95, 0.3);
    }
    
    .modal-btn-secondary {
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid rgba(74, 157, 157, 0.3);
    }
    
    .modal-btn-secondary:hover {
        color: var(--text-primary);
        border-color: var(--accent-glow);
    }
    
    @media (max-width: 768px) {
        .modal-content {
            max-width: 95% !important;
            width: 95% !important;
        }
        
        .modal-image-nav {
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
        
        .modal-image-nav.prev {
            left: 10px;
        }
        
        .modal-image-nav.next {
            right: 10px;
        }
        
        .modal-thumbnail {
            width: 50px;
            height: 50px;
        }
        
        .modal-main-image {
            max-height: 300px;
        }
    }
`;
document.head.appendChild(modalStyles);

// Optimized parallax effect for hero section
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && scrolled < window.innerHeight * 1.5) {
        // Subtle parallax effect
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        
        // Floating cards parallax
        if (heroVisual) {
            const cards = heroVisual.querySelectorAll('.floating-card');
            cards.forEach((card, index) => {
                const speed = 0.05 + (index * 0.02);
                card.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }
    
    parallaxTicking = false;
}

function requestParallaxTick() {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}

window.addEventListener('scroll', requestParallaxTick, { passive: true });

// Optimized loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Trigger hero animations after page load
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate hero elements with staggered timing
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const ctaButton = document.querySelector('.cta-button');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.style.animation = 'fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both';
            }, 200);
        }
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.animation = 'fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both';
            }, 400);
        }
        if (heroDescription) {
            setTimeout(() => {
                heroDescription.style.animation = 'fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both';
            }, 600);
        }
        if (ctaButton) {
            setTimeout(() => {
                ctaButton.style.animation = 'fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both';
            }, 800);
        }
    }, 100);
});

// Optimized service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.01)';
        card.style.transition = 'var(--transition-smooth)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add a subtle glow effect on load
        setTimeout(() => {
            heroTitle.style.textShadow = '0 0 20px rgba(74, 157, 157, 0.3)';
            setTimeout(() => {
                heroTitle.style.textShadow = 'none';
                heroTitle.style.transition = 'text-shadow 0.5s ease';
            }, 2000);
        }, 1500);
    }
});
