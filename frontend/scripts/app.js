// ============================================
// APP.JS - Main Application Logic
// ============================================

// ============================================
// CART FUNCTIONS
// ============================================

// Get cart from localStorage
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
        return [];
    }
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartCount();
    
    // Show success feedback
    const btn = document.querySelector(`[data-id="${productId}"] .add-to-cart-btn`);
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 1500);
    }
    
    // Show order popup
    showOrderPopup();
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    renderCart();
}

// Update quantity
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = Math.max(1, (item.quantity || 1) + change);
        saveCart(cart);
        updateCartCount();
        renderCart();
    }
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    const products = getProducts();
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * (item.quantity || 1) : 0);
    }, 0);
}

// Get cart count
function getCartCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

// Update cart count in UI
function updateCartCount() {
    const count = getCartCount();
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

// ============================================
// PRODUCT FUNCTIONS
// ============================================

// Sample products data
function getProducts() {
    return [
        { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, image: 'https://via.placeholder.com/300x300/8B5CF6/ffffff?text=Headphones', stock: 15, rating: 4.5 },
        { id: 2, name: 'Smart Watch Series 5', category: 'Electronics', price: 249.99, image: 'https://via.placeholder.com/300x300/6D28D9/ffffff?text=Watch', stock: 8, rating: 4.8 },
        { id: 3, name: 'Premium Cotton T-Shirt', category: 'Clothing', price: 29.99, image: 'https://via.placeholder.com/300x300/A78BFA/ffffff?text=T-Shirt', stock: 20, rating: 4.2 },
        { id: 4, name: 'The Art of Coding', category: 'Books', price: 39.99, image: 'https://via.placeholder.com/300x300/8B5CF6/ffffff?text=Book', stock: 12, rating: 4.7 },
        { id: 5, name: 'LED Desk Lamp', category: 'Home', price: 49.99, image: 'https://via.placeholder.com/300x300/6D28D9/ffffff?text=Lamp', stock: 5, rating: 4.0 },
        { id: 6, name: 'Natural Face Cream', category: 'Beauty', price: 24.99, image: 'https://via.placeholder.com/300x300/A78BFA/ffffff?text=Cream', stock: 18, rating: 4.3 },
        { id: 7, name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, image: 'https://via.placeholder.com/300x300/8B5CF6/ffffff?text=Speaker', stock: 10, rating: 4.6 },
        { id: 8, name: 'Slim Fit Jeans', category: 'Clothing', price: 59.99, image: 'https://via.placeholder.com/300x300/6D28D9/ffffff?text=Jeans', stock: 7, rating: 4.1 }
    ];
}

// Get product by ID
function getProductById(id) {
    return getProducts().find(p => p.id === id);
}

// ============================================
// ORDER POPUP
// ============================================

function showOrderPopup() {
    const popup = document.getElementById('orderPopup');
    if (!popup) return;
    
    const orderId = Math.floor(10000 + Math.random() * 90000);
    const orderIdSpan = document.getElementById('orderId');
    if (orderIdSpan) orderIdSpan.textContent = orderId;
    
    popup.classList.add('show');
}

function closeOrderPopup() {
    const popup = document.getElementById('orderPopup');
    if (popup) popup.classList.remove('show');
}

// ============================================
// SEARCH FUNCTION
// ============================================

function searchProducts() {
    const searchTerm = document.getElementById('search-input')?.value?.toLowerCase() || '';
    const cards = document.querySelectorAll('.product-card');
    let found = false;
    
    cards.forEach(card => {
        const name = card.querySelector('.product-name')?.textContent?.toLowerCase() || '';
        const category = card.querySelector('.product-category')?.textContent?.toLowerCase() || '';
        if (name.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = found ? 'none' : 'block';
    }
}

// ============================================
// NAVBAR FUNCTIONS
// ============================================

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('open');
}

// ============================================
// SCROLL TO TOP
// ============================================

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    updateCartCount();
    
    // Load products if on home page
    if (document.getElementById('product-grid')) {
        loadProducts();
    }
    
    // Render cart if on cart page
    if (document.getElementById('cart-items')) {
        renderCart();
    }
    
    // Setup scroll to top
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
    }
    
    // Close order popup on outside click
    const popup = document.getElementById('orderPopup');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === this) closeOrderPopup();
        });
    }
});

// Export functions for use in other files
window.addToCart = addToCart;
window.getCart = getCart;
window.getCartCount = getCartCount;
window.getCartTotal = getCartTotal;
window.updateCartCount = updateCartCount;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.searchProducts = searchProducts;
window.toggleMenu = toggleMenu;
window.scrollToTop = scrollToTop;
window.showOrderPopup = showOrderPopup;
window.closeOrderPopup = closeOrderPopup;
window.getProducts = getProducts;
window.getProductById = getProductById;