// Main application logic with Supabase integration

// Supabase configuration - Load from environment or config
import { supabase } from "./config";

// Initialize Supabase client
let supabase;

// Application state
let appState = {
    isLoading: false,
    currentGender: 'women',
    products: [],
    hasError: false,
    errorMessage: ''
};

// DOM elements cache
const domElements = {
    productsGrid: null,
    statusMessage: null,
    womenButton: null,
    menButton: null,
    authButton: null
};

// Initialize DOM elements cache
const cacheDOMElements = () => {
    domElements.productsGrid = querySelector('#products-grid');
    domElements.statusMessage = querySelector('#status-message');
    domElements.womenButton = querySelector('#btn-women');
    domElements.menButton = querySelector('#btn-men');
    domElements.authButton = querySelector('#auth-button');
};

// Initialize Supabase client
const initializeSupabase = () => {
    try {
        if (typeof window.supabase === 'undefined') {
            throw new Error('Supabase library not loaded');
        }
        
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('Supabase client initialized successfully');
        return true;
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        showMessage('Failed to connect to database. Please check your configuration.', 'error');
        return false;
    }
};

// Fetch products from Supabase
const fetchProducts = async (gender = 'women') => {
    if (!supabase) {
        return handleError(new Error('Supabase not initialized'), 'fetchProducts');
    }

    try {
        appState.isLoading = true;
        showMessage('Loading products...', 'loading');

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('gender', gender)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        appState.products = data || [];
        appState.hasError = false;
        appState.errorMessage = '';
        
        return handleSuccess(data, `Found ${data.length} products`);
    } catch (error) {
        appState.hasError = true;
        appState.errorMessage = error.message;
        return handleError(error, 'fetchProducts');
    } finally {
        appState.isLoading = false;
    }
};

// Create product card element
const createProductCard = (product) => {
    const card = createElement('div', {
        className: 'product-card',
        attributes: {
            'data-product-id': product.id
        }
    });

    const image = createImageElement(
        product.image_url || 'assets/placeholder-product.jpg',
        product.title || 'Product image',
        'product-image'
    );

    const info = createElement('div', {
        className: 'product-info'
    });

    const name = createElement('h3', {
        className: 'product-name',
        textContent: product.title || 'Untitled Product'
    });

    const price = createElement('p', {
        className: 'product-price',
        textContent: formatCurrency(product.price)
    });

    // Handle image loading errors
    image.addEventListener('error', () => {
        image.src = 'assets/placeholder-product.jpg';
        image.alt = 'Product image not available';
    });

    info.appendChild(name);
    info.appendChild(price);
    card.appendChild(image);
    card.appendChild(info);

    return card;
};

// Render products to the grid
const renderProducts = (products) => {
    if (!domElements.productsGrid) {
        console.error('Products grid element not found');
        return;
    }

    // Clear existing products
    domElements.productsGrid.innerHTML = '';

    if (!products || products.length === 0) {
        showMessage(`No ${appState.currentGender}'s products found.`, 'empty');
        return;
    }

    // Clear status message on successful render
    showMessage('', '');

    // Create and append product cards
    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        const productCard = createProductCard(product);
        fragment.appendChild(productCard);
    });

    domElements.productsGrid.appendChild(fragment);
};

// Show status message
const showMessage = (text, type = '') => {
    if (!domElements.statusMessage) return;

    domElements.statusMessage.textContent = text;
    domElements.statusMessage.className = `status-message ${type}`;
    
    if (!text) {
        domElements.statusMessage.style.display = 'none';
    } else {
        domElements.statusMessage.style.display = 'block';
    }
};

// Set active gender filter
const setActiveGender = (gender) => {
    appState.currentGender = gender;
    
    if (domElements.womenButton && domElements.menButton) {
        const buttons = [domElements.womenButton, domElements.menButton];
        const activeButton = gender === 'women' ? domElements.womenButton : domElements.menButton;
        setActiveButton(buttons, activeButton);
    }
};

// Handle gender filter click
const handleGenderFilter = async (gender) => {
    if (appState.isLoading || appState.currentGender === gender) {
        return;
    }

    setActiveGender(gender);
    
    const result = await fetchProducts(gender);
    
    if (result.success) {
        renderProducts(result.data);
    } else {
        showMessage(`Failed to load ${gender}'s products: ${result.error}`, 'error');
    }
};

// Initialize gender filter buttons
const initializeGenderFilters = () => {
    if (domElements.womenButton) {
        domElements.womenButton.addEventListener('click', () => {
            handleGenderFilter('women');
        });
    }

    if (domElements.menButton) {
        domElements.menButton.addEventListener('click', () => {
            handleGenderFilter('men');
        });
    }

    // Set initial active state
    setActiveGender(appState.currentGender);
};

// Update authentication button state
const updateAuthButton = () => {
    if (!domElements.authButton) return;

    const userData = getFromStorage('userData');
    const isUserLoggedIn = userData && userData.name;

    if (isUserLoggedIn) {
        domElements.authButton.outerHTML = `
            <div class="user-info">
                <span class="user-name">${userData.name}</span>
                <button class="logout-btn" onclick="handleLogout()">Logout</button>
            </div>
        `;
    } else {
        domElements.authButton.textContent = 'Login';
        domElements.authButton.onclick = () => window.location.href = 'login.html';
    }
};

// Handle logout
const handleLogout = () => {
    removeFromStorage('userData');
    window.location.reload();
};

// Initialize smooth scroll for navigation links
const initializeNavigation = () => {
    const navLinks = querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = querySelector(`#${targetId}`);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Initialize scroll effects
const initializeScrollEffects = () => {
    const navbar = querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });
};

// Load initial products
const loadInitialProducts = async () => {
    const result = await fetchProducts(appState.currentGender);
    
    if (result.success) {
        renderProducts(result.data);
    } else {
        showMessage(`Failed to load products. Please check your Supabase configuration.`, 'error');
    }
};

// Application initialization
const initializeApp = async () => {
    // Cache DOM elements
    cacheDOMElements();
    
    // Initialize Supabase
    const supabaseInitialized = initializeSupabase();
    
    // Update authentication state
    updateAuthButton();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize gender filters
    initializeGenderFilters();
    
    // Load initial products if Supabase is available
    if (supabaseInitialized) {
        await loadInitialProducts();
    }
};

// Error boundary for unhandled errors
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    showMessage('An unexpected error occurred. Please refresh the page.', 'error');
});

// Make functions available globally
window.handleLogout = handleLogout;
window.scrollToProducts = scrollToProducts;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);