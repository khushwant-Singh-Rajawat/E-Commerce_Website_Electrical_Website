// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const bookServiceModal = document.getElementById('bookServiceModal');
const serviceButtons = document.querySelectorAll('.book-service');
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const productsGrid = document.getElementById('productsGrid');

// Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentSlide = 0;
const totalSlides = 5;

// Products Data
const products = [
    {
        id: 1,
        name: "Energy Efficient LED Bulb 12W",
        price: 299,
        oldPrice: 399,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
        description: "Long lasting LED bulb with 1200 lumens brightness. Energy saving and cool white light."
    },
    {
        id: 2,
        name: "Premium Ceiling Fan 48\"",
        price: 2499,
        oldPrice: 2999,
        image: "https://images.unsplash.com/photo-1587344483176-6dff73d7eb47?w=400&h=300&fit=crop",
        description: "High speed ceiling fan with 5 star energy rating. Remote control included."
    },
    {
        id: 3,
        name: "MCB 16A Single Pole",
        price: 199,
        oldPrice: 249,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
        description: "High quality miniature circuit breaker for electrical safety and protection."
    },
    {
        id: 4,
        name: "Heavy Duty Extension Board 6A",
        price: 399,
        oldPrice: 499,
        image: "https://images.unsplash.com/photo-1585320702817-06c28414d8fc?w=400&h=300&fit=crop",
        description: "6 socket extension board with individual switches and 3m long wire."
    },
    {
        id: 5,
        name: "Smart WiFi Switch",
        price: 899,
        oldPrice: 1099,
        image: "https://images.unsplash.com/photo-1610748788044-456649849989?w=400&h=300&fit=crop",
        description: "Control your appliances remotely via smartphone app. Voice control compatible."
    },
    {
        id: 6,
        name: "Exhaust Fan 150mm",
        price: 599,
        oldPrice: 749,
        image: "https://images.unsplash.com/photo-1622296114554-68e9184e7173?w=400&h=300&fit=crop",
        description: "Powerful exhaust fan for kitchen and bathroom ventilation."
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    renderProducts();
    updateCartCount();
    initScrollAnimations();
    setActiveNavLink();
    
    // Preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1500);
});

// Navbar Mobile Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a, .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Image Slider
function initSlider() {
    const dotsContainer = document.getElementById('sliderDots');
    
    // Create dots
    for(let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    // Auto slide
    setInterval(nextSlide, 5000);
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

function goToSlide(slideIndex) {
    document.querySelectorAll('.slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    
    currentSlide = slideIndex;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

// Products Rendering
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card fade-in-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${Math.round((1 - product.price / product.oldPrice) * 100)}% OFF</div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    <span class="old-price">₹${product.oldPrice}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary buy-now" data-product-id="${product.id}">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
        const productId = parseInt(e.target.closest('.add-to-cart').dataset.productId);
        addToCart(productId);
    }
    
    if (e.target.closest('.buy-now')) {
        const productId = parseInt(e.target.closest('.buy-now').dataset.productId);
        addToCart(productId, true);
    }
});

function addToCart(productId, buyNow = false) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
    
    if (buyNow) {
        setTimeout(() => {
            cartIcon.click();
        }, 500);
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    cartCountEl.textContent = totalItems;
    cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Cart Modal
cartIcon.addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'flex';
});

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem;">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #d1d5db; margin-bottom: 1rem;"></i>
                <h3>Your cart is empty</h3>
                <p style="color: #6b7280;">Add some products to get started</p>
                <a href="#products" class="btn btn-primary" style="margin-top: 1rem;">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="cart-item-total">₹${(item.price * item.quantity).toLocaleString()}</div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <strong>Total: ₹${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</strong>
            </div>
            <button class="btn btn-primary btn-full checkout-btn">Proceed to Checkout</button>
        </div>
    `;
}

window.updateQuantity = function(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    }
};

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
};

// Checkout
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        showNotification('Redirecting to payment...', 'success');
        // Integrate payment gateway here
        setTimeout(() => {
            alert('Order placed successfully! Thank you for shopping with us! 🎉');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            cartModal.style.display = 'none';
        }, 2000);
    }
});

// Service Booking
serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('serviceType').value = button.closest('.service-card').dataset.service;
        bookServiceModal.style.display = 'flex';
    });
});

document.getElementById('serviceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate API call
    showNotification('✅ Service booked successfully! We will call you within 30 minutes.', 'success');
    bookServiceModal.style.display = 'none';
    e.target.reset();
});

// Modal Close
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Smooth Scrolling & Active Nav
function setActiveNavLink() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.product-card, .service-card, .feature, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        padding: '1.2rem 1.8rem',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        zIndex: '3000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        fontWeight: '600',
        fontSize: '1rem',
        transform: 'translateX(400px)',
        animation: 'slideInNotification 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.4s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInNotification {
        to { transform: translateX(0); }
    }
    @keyframes slideOutNotification {
        to { transform: translateX(400px); }
    }
    
    .notification.success i { color: #34d399; }
    .notification.error i { color: #f87171; }
`;
document.head.appendChild(style);

// WhatsApp Integration
document.querySelectorAll('.social-links a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const message = encodeURIComponent('Hello! I need electrical service/product information. Please help me.');
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    });
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('✅ Message sent successfully! We will respond within 24 hours.', 'success');
    e.target.reset();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Performance Optimization
// Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

// Add to cart CSS for cart modal (inline for demo)
const cartStyle = document.createElement('style');
cartStyle.textContent = `
    .cart-item {
        display: grid;
        grid-template-columns: 80px 1fr auto auto auto;
        gap: 1rem;
        align-items: center;
        padding: 1.5rem 0;
        border-bottom: 1px solid #f1f5f9;
    }
    .cart-item img {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        object-fit: cover;
    }
    .cart-item-controls button {
        width: 36px;
        height: 36px;
        border: 1px solid #e2e8f0;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
    }
    .remove-item {
        background: #fee2e2;
        color: #ef4444;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        cursor: pointer;
    }
    .cart-footer {
        padding-top: 2rem;
        border-top: 2px solid #f1f5f9;
        margin-top: 1rem;
    }
    .cart-total {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
        text-align: right;
    }
`;
document.head.appendChild(cartStyle);

console.log('🚀 ElectroSpark - Fully Loaded & Ready! ⚡');