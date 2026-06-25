// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        loadCart();
    }
});

// Load cart
async function loadCart() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        document.getElementById('cart-items').innerHTML = `
            <div style="text-align:center; padding:3rem;">
                <p>Please login to view your cart</p>
                <a href="login.html" style="color:#3498db;">Login here</a>
            </div>
        `;
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }
        
        if (!response.ok) throw new Error('Failed to load cart');
        
        const cart = await response.json();
        displayCart(cart);
    } catch (error) {
        console.error('Error loading cart:', error);
        document.getElementById('cart-items').innerHTML = '<p style="text-align:center;">Error loading cart</p>';
    }
}

// Display cart
function displayCart(cart) {
    const container = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (!cart.items || cart.items.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:3rem;">
                <p style="font-size:1.2rem; color:#7f8c8d;">Your cart is empty</p>
                <a href="index.html" style="color:#3498db;">Continue Shopping</a>
            </div>
        `;
        subtotalElement.textContent = '$0.00';
        shippingElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }
    
    container.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.productId}', ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeItem('${item.productId}')">✕</button>
        </div>
    `).join('');
    
    const subtotal = cart.total || 0;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Update quantity
async function updateQuantity(productId, newQuantity) {
    if (newQuantity < 0) return;
    
    try {
        const response = await fetch(`${API_URL}/cart/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId, quantity: newQuantity })
        });
        
        if (response.ok) {
            loadCart();
            updateCartCount();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error updating quantity', 'error');
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        showNotification('Error updating quantity', 'error');
    }
}

// Remove item
async function removeItem(productId) {
    try {
        const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.ok) {
            loadCart();
            updateCartCount();
            showNotification('Item removed');
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error removing item', 'error');
        }
    } catch (error) {
        console.error('Error removing item:', error);
        showNotification('Error removing item', 'error');
    }
}

// Clear cart
async function clearCart() {
    if (!confirm('Clear your cart?')) return;
    
    try {
        const response = await fetch(`${API_URL}/cart/clear`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.ok) {
            loadCart();
            updateCartCount();
            showNotification('Cart cleared');
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error clearing cart', 'error');
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
        showNotification('Error clearing cart', 'error');
    }
}

// Checkout
async function checkout() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        showNotification('Please login first', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const cartResponse = await fetch(`${API_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const cart = await cartResponse.json();
        
        if (!cart.items || cart.items.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }
        
        const orderData = {
            items: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            shippingAddress: {
                street: '123 Main St',
                city: 'City',
                state: 'State',
                zipCode: '12345',
                country: 'USA'
            }
        };
        
        const orderResponse = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });
        
        if (orderResponse.ok) {
            showNotification('✅ Order placed successfully!');
            await fetch(`${API_URL}/cart/clear`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            loadCart();
            updateCartCount();
        } else {
            const error = await orderResponse.json();
            showNotification(error.message || 'Error placing order', 'error');
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        showNotification('Error processing checkout', 'error');
    }
}