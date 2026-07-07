// ============================================
// PRODUCTS.JS - Products Display Logic
// ============================================

// Load and display products
function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    const products = getProducts();
    
    if (products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:3rem;color:#6B7280;">
                <i class="fas fa-box-open" style="font-size:3rem;color:#8B5CF6;opacity:0.4;display:block;margin-bottom:1rem;"></i>
                <h3>No products available</h3>
                <p>Check back later for new arrivals!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = products.map(p => `
        <div class="product-card" data-id="${p.id}" onclick="handleProductClick(${p.id})">
            <div class="image-wrapper">
                <img src="${p.image}" alt="${p.name}" loading="lazy" />
                <span class="product-badge">${p.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <div class="product-name">${p.name}</div>
                <div class="product-price">$${p.price.toFixed(2)}</div>
                <div class="product-stock">
                    <i class="fas fa-box"></i> ${p.stock} in stock
                    <span style="margin-left:0.5rem;color:#F59E0B;">
                        <i class="fas fa-star"></i> ${p.rating || 4.0}
                    </span>
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <span class="view-details" onclick="event.stopPropagation(); viewProduct(${p.id})">
                    View Details <i class="fas fa-arrow-right"></i>
                </span>
            </div>
        </div>
    `).join('');
}

// Handle product card click
function handleProductClick(productId) {
    viewProduct(productId);
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Filter products by category
function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize category buttons
function initCategoryFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category || 'all';
            filterProducts(category);
        });
    });
}

// Export functions
window.loadProducts = loadProducts;
window.viewProduct = viewProduct;
window.filterProducts = filterProducts;
window.initCategoryFilter = initCategoryFilter;
window.handleProductClick = handleProductClick;

// Auto-init when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('product-grid')) {
            loadProducts();
        }
        initCategoryFilter();
    });
} else {
    if (document.getElementById('product-grid')) {
        loadProducts();
    }
    initCategoryFilter();
}