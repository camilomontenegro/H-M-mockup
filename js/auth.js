// Authentication logic using Google Sign-In

// Google Sign-In configuration
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with actual client ID

// Authentication state
let authState = {
    isAuthenticated: false,
    user: null
};

// Initialize Google Sign-In
const initializeGoogleAuth = () => {
    // Check if we're on the login page
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (isLoginPage) {
        // Google Sign-In will automatically initialize based on HTML attributes
        console.log('Google Sign-In initialized on login page');
    }
    
    // Check existing authentication state
    checkAuthenticationState();
};

// Handle Google Sign-In response
const handleCredentialResponse = (response) => {
    try {
        // Decode the JWT token (in a real app, this should be done server-side)
        const payload = parseJWT(response.credential);
        
        if (payload) {
            const userData = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                loginTime: new Date().toISOString()
            };
            
            // Save user data to localStorage
            const saveSuccess = saveToStorage('userData', userData);
            
            if (saveSuccess) {
                authState.isAuthenticated = true;
                authState.user = userData;
                
                // Redirect to homepage
                window.location.href = 'index.html';
            } else {
                showAuthError('Failed to save user data');
            }
        } else {
            showAuthError('Failed to process authentication');
        }
    } catch (error) {
        console.error('Authentication error:', error);
        showAuthError('Authentication failed');
    }
};

// Simple JWT parser (for demo purposes only - use proper JWT library in production)
const parseJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
};

// Check current authentication state
const checkAuthenticationState = () => {
    const userData = getFromStorage('userData');
    
    if (userData && userData.name) {
        authState.isAuthenticated = true;
        authState.user = userData;
        
        // Check if login session is still valid (optional: add expiration check)
        const loginTime = new Date(userData.loginTime);
        const currentTime = new Date();
        const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);
        
        // Auto-logout after 24 hours (optional)
        if (hoursSinceLogin > 24) {
            handleAuthLogout();
            return false;
        }
        
        return true;
    } else {
        authState.isAuthenticated = false;
        authState.user = null;
        return false;
    }
};

// Handle logout
const handleAuthLogout = () => {
    // Clear user data
    removeFromStorage('userData');
    
    // Reset auth state
    authState.isAuthenticated = false;
    authState.user = null;
    
    // Sign out from Google (if available)
    if (window.google && window.google.accounts) {
        window.google.accounts.id.disableAutoSelect();
    }
    
    // Redirect to homepage or refresh
    if (window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    } else {
        window.location.reload();
    }
};

// Show authentication error
const showAuthError = (message) => {
    const errorElement = querySelector('.auth-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        alert(message); // Fallback
    }
};

// Get current user data
const getCurrentUser = () => {
    return authState.user;
};

// Check if user is authenticated
const isUserAuthenticated = () => {
    return authState.isAuthenticated;
};

// Protected route handler
const requireAuth = () => {
    if (!isUserAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
};

// Auto-redirect authenticated users away from login page
const redirectIfAuthenticated = () => {
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (isLoginPage && isUserAuthenticated()) {
        window.location.href = 'index.html';
    }
};

// Export functions to global scope
window.handleCredentialResponse = handleCredentialResponse;
window.handleAuthLogout = handleAuthLogout;
window.getCurrentUser = getCurrentUser;
window.isUserAuthenticated = isUserAuthenticated;
window.requireAuth = requireAuth;

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGoogleAuth();
    redirectIfAuthenticated();
});