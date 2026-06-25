// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('auth-message');
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            showNotification('Login successful!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            messageDiv.className = 'auth-message error';
            messageDiv.textContent = data.message || 'Invalid credentials';
        }
    } catch (error) {
        console.error('Login error:', error);
        messageDiv.className = 'auth-message error';
        messageDiv.textContent = 'An error occurred. Please try again.';
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('auth-message');
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            showNotification('Registration successful!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            messageDiv.className = 'auth-message error';
            messageDiv.textContent = data.message || 'Registration failed';
        }
    } catch (error) {
        console.error('Registration error:', error);
        messageDiv.className = 'auth-message error';
        messageDiv.textContent = 'An error occurred. Please try again.';
    }
}

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}