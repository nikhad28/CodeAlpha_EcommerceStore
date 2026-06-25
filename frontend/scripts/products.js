// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-grid')) {
        loadProducts();
    }
    if (document.getElementById('product-name')) {
        loadProductDetails();
    }
});

// Load all products
async function loadProducts(category = 'all', search = '') {
    try {
        let url = `${API_URL}/products`;
        const params = new URLSearchParams();
        
        if (category !== 'all') params.append('category', category);
        if (search) params.append('search', search);
        
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        
        const response = await fetch(url);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('product-grid').innerHTML = '<p style="text-align:center;">Error loading products. Please try again.</p>';
    }
}

// Display products
function displayProducts(products) {
    const grid = document.getElementById('product-grid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No products found</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="viewProduct('${product._id}')">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-category">${product.category}</div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product._id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// View product
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Load product details
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        const product = await response.json();
        
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-category').textContent = `Category: ${product.category}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-stock').textContent = `In Stock: ${product.stock}`;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;
        document.getElementById('product-image').dataset.productId = product._id;
    } catch (error) {
        console.error('Error loading product:', error);
        window.location.href = 'index.html';
    }
}

// Add to cart
async function addToCart(productId = null) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        showNotification('Please login first', 'error');
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }
    
    if (!productId) {
        productId = document.getElementById('product-image')?.dataset.productId;
    }
    
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
    
    try {
        const response = await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity })
        });
        
        if (response.ok) {
            showNotification('✅ Added to cart!');
            updateCartCount();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error adding to cart', 'error');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error adding to cart', 'error');
    }
}

// Buy now
function buyNow() {
    const productId = document.getElementById('product-image')?.dataset.productId;
    if (!localStorage.getItem('token')) {
        showNotification('Please login first', 'error');
        window.location.href = 'login.html';
        return;
    }
    showNotification('Redirecting to checkout...');
}

// Filter category
function filterCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.category-btn[onclick*="${category}"]`)?.classList.add('active');
    loadProducts(category);
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.trim();
    loadProducts('all', searchTerm);
}

// Enter key for search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchProducts();
        });
    }
});