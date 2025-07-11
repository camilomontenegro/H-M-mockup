// Main application logic

// State management
let appState = {
    isLoading: false,
    products: [],
    maxProductsToTry: 50 // Maximum number of sequential images to try
};

// Product management
const loadProductImages = async () => {
    const productGrid = querySelector('#product-grid');
    if (!productGrid) return;

    // Show loading state
    appState.isLoading = true;
    productGrid.innerHTML = '<div class="loading">Loading products...</div>';

    const loadedProducts = [];
    
    // Try to load images sequentially from 1.jpg, 2.jpg, etc.
    for (let i = 1; i <= appState.maxProductsToTry; i++) {
        const imagePath = `assets/products/${i}.png`;
        const imageExists = await checkImageExists(imagePath);
        
        if (imageExists) {
            const product = createProductData(i, imagePath);
            loadedProducts.push(product);
        } else {
            // Stop trying if we hit 3 consecutive missing images
            if (i > 3 && loadedProducts.length === 0) break;
            if (i > loadedProducts.length + 3) break;
        }
    }

    appState.products = loadedProducts;
    appState.isLoading = false;
    renderProducts(loadedProducts);
};

const createProductData = (index, imagePath) => {
    return {
        id: index,
        name: generateProductName(index - 1),
        price: generateProductPrice(),
        image: imagePath,
        alt: `Product ${index}`
    };
};

const createProductCard = (product) => {
    const card = createElement('div', 'product-card');
    
    const image = createImageElement(product.image, product.alt, 'product-image');
    const info = createElement('div', 'product-info');
    const name = createElement('h3', 'product-name', product.name);
    const price = createElement('p', 'product-price', product.price);
    
    info.appendChild(name);
    info.appendChild(price);
    card.appendChild(image);
    card.appendChild(info);
    
    return card;
};

const renderProducts = (products) => {
    const productGrid = querySelector('#product-grid');
    if (!productGrid) return;

    if (products.length === 0) {
        productGrid.innerHTML = '<div class="loading">No products found. Add images to assets/products/ folder (1.jpg, 2.jpg, etc.)</div>';
        return;
    }

    // Clear existing content
    productGrid.innerHTML = '';
    
    // Create and append product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
};

// Navigation management
const updateAuthButton = () => {
    const authButton = querySelector('#auth-button');
    if (!authButton) return;

    const userData = getFromStorage('userData');
    const isUserLoggedIn = userData && userData.name;

    if (isUserLoggedIn) {
        // Replace login button with user info and logout
        authButton.outerHTML = `
            <div class="user-info">
                <span class="user-name">${userData.name}</span>
                <button class="logout-btn" onclick="handleLogout()">Logout</button>
            </div>
        `;
    } else {
        // Show login button
        authButton.textContent = 'Login';
        authButton.onclick = () => window.location.href = 'login.html';
    }
};

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
            
            // Handle internal navigation
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

// Application initialization
const initializeApp = () => {
    // Update authentication state
    updateAuthButton();
    
    // Initialize navigation
    initializeNavigation();
    
    // Load products
    loadProductImages();
    
    // Add scroll effect to navbar
    initializeScrollEffects();
};

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

// Make logout function available globally
window.handleLogout = handleLogout;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);