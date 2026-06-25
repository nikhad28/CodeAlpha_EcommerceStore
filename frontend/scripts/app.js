// API URL
const API_URL = 'http://localhost:5000/api';
let currentUser = null;
let token = localStorage.getItem('token');

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        verifyToken();
    } else {
        showAuthLinks();
    }
    updateCartCount();
    initScrollTop();
    initNavbarScroll();
});

// Verify token
async function verifyToken() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const user = await response.json();
            currentUser = user;
            showUserInfo(user);
        } else {
            localStorage.removeItem('token');
            token = null;
            showAuthLinks();
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        token = null;
        showAuthLinks();
    }
}

// Show auth links
function showAuthLinks() {
    const authLinks = document.getElementById('auth-links');
    const userInfo = document.getElementById('user-info');
    if (authLinks) authLinks.style.display = 'flex';
    if (userInfo) userInfo.style.display = 'none';
}

// Show user info
function showUserInfo(user) {
    const authLinks = document.getElementById('auth-links');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    
    if (authLinks) authLinks.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    if (userName) userName.textContent = `Welcome, ${user.name}`;
}

// Logout
function logout() {
    localStorage.removeItem('token');
    token = null;
    currentUser = null;
    showAuthLinks();
    showNotification('Logged out successfully');
    setTimeout(() => window.location.href = 'index.html', 500);
}

// Update cart count
async function updateCartCount() {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.ok) {
            const cart = await response.json();
            const count = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
            const cartCount = document.getElementById('cart-count');
            if (cartCount) {
                cartCount.textContent = count;
                // Animation
                cartCount.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 300);
            }
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        background: ${type === 'success' ? 'linear-gradient(135deg, #2ecc71, #27ae60)' : 'linear-gradient(135deg, #ff6b6b, #c0392b)'};
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
}

// Scroll to top
function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);