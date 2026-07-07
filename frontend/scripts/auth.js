// ============================================
// AUTH.JS - Authentication Functions
// ============================================

// ============================================
// REGISTER
// ============================================

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const password = document.getElementById('password')?.value || '';
    const confirm = document.getElementById('confirm-password')?.value || '';
    const msg = document.getElementById('auth-message');
    
    if (!msg) return;
    
    // Validate
    if (name.length < 2) {
        showMessage(msg, '❌ Please enter your full name (minimum 2 characters)', 'error');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showMessage(msg, '❌ Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage(msg, '❌ Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirm) {
        showMessage(msg, '❌ Passwords do not match!', 'error');
        return;
    }
    
    // Save to localStorage (for demo)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        showMessage(msg, '❌ Email already registered! Please login.', 'error');
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage(msg, '✅ Registration successful! Redirecting to login...', 'success');
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// ============================================
// LOGIN
// ============================================

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email')?.value?.trim() || '';
    const password = document.getElementById('password')?.value || '';
    const msg = document.getElementById('auth-message');
    
    if (!msg) return;
    
    if (!email || !password) {
        showMessage(msg, '❌ Please enter both email and password', 'error');
        return;
    }
    
    // Check in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save session
        localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
        localStorage.setItem('token', 'fake-jwt-token-' + Date.now());
        
        showMessage(msg, '✅ Login successful! Redirecting...', 'success');
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        // Check if email exists
        const emailExists = users.find(u => u.email === email);
        if (emailExists) {
            showMessage(msg, '❌ Wrong password! Please try again.', 'error');
        } else {
            showMessage(msg, '❌ Email not registered! Please sign up first.', 'error');
        }
    }
}

// ============================================
// LOGOUT
// ============================================

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    window.location.href = 'login.html';
}

// ============================================
// CHECK AUTH STATUS
// ============================================

function checkAuth() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    const authLinks = document.getElementById('auth-links');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    
    if (user && token) {
        try {
            const userData = JSON.parse(user);
            if (userName) {
                userName.innerHTML = `<i class="fas fa-user-circle"></i> ${userData.name || 'User'}`;
            }
            if (userInfo) userInfo.style.display = 'block';
            if (authLinks) authLinks.style.display = 'none';
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (authLinks) authLinks.style.display = 'flex';
    }
}

// ============================================
// HELPER: Show message
// ============================================

function showMessage(element, text, type) {
    if (!element) return;
    element.className = type;
    element.textContent = text;
    element.style.display = 'block';
    
    // Auto-hide after 5 seconds
    clearTimeout(element._hideTimeout);
    element._hideTimeout = setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// ============================================
// PASSWORD STRENGTH
// ============================================

function checkPasswordStrength(password) {
    const bar = document.getElementById('password-strength');
    if (!bar) return;
    
    if (password.length === 0) {
        bar.className = 'password-strength';
        return;
    }
    if (password.length < 4) {
        bar.className = 'password-strength weak';
    } else if (password.length < 8) {
        bar.className = 'password-strength medium';
    } else {
        bar.className = 'password-strength strong';
    }
}

function checkPasswordMatch(confirm) {
    const password = document.getElementById('password')?.value || '';
    const hint = document.getElementById('password-match-hint');
    if (!hint) return;
    
    if (confirm.length === 0) {
        hint.innerHTML = '<i class="fas fa-info-circle"></i> Re-enter your password to confirm';
        hint.style.color = '#6B7280';
        return;
    }
    if (password === confirm) {
        hint.innerHTML = '<i class="fas fa-check-circle" style="color:#10B981;"></i> Passwords match!';
        hint.style.color = '#10B981';
    } else {
        hint.innerHTML = '<i class="fas fa-exclamation-circle" style="color:#EF4444;"></i> Passwords do not match';
        hint.style.color = '#EF4444';
    }
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.logout = logout;
window.checkAuth = checkAuth;
window.checkPasswordStrength = checkPasswordStrength;
window.checkPasswordMatch = checkPasswordMatch;

// Auto-check auth when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateCartCount();
});