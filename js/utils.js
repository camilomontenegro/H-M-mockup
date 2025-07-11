// Utility Functions

// Enhanced DOM manipulation helpers
const createElement = (tag, options = {}) => {
    const element = document.createElement(tag);
    
    // Set className if provided
    if (options.className) {
        element.className = options.className;
    }
    
    // Set textContent if provided
    if (options.textContent) {
        element.textContent = options.textContent;
    }
    
    // Set innerHTML if provided (use with caution)
    if (options.innerHTML) {
        element.innerHTML = options.innerHTML;
    }
    
    // Set attributes if provided
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    // Set properties if provided
    if (options.properties) {
        Object.entries(options.properties).forEach(([key, value]) => {
            element[key] = value;
        });
    }
    
    // Add event listeners if provided
    if (options.events) {
        Object.entries(options.events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
    }
    
    return element;
};

const querySelector = (selector) => document.querySelector(selector);
const querySelectorAll = (selector) => document.querySelectorAll(selector);

// Smooth scrolling function
const scrollToProducts = () => {
    const productsSection = querySelector('#products');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Local storage helpers
const getFromStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
};

// Product data generation
const generateProductName = (index) => {
    const productNames = [
        'Essential Jacket',
        'Classic Denim',
        'Wool Sweater',
        'Cotton Dress',
        'Leather Boots',
        'Silk Blouse',
        'Casual Pants',
        'Winter Coat',
        'Summer Top',
        'Formal Shirt',
        'Knit Cardigan',
        'Ankle Boots',
        'Maxi Dress',
        'Blazer',
        'Skinny Jeans'
    ];
    return productNames[index % productNames.length];
};

const generateProductPrice = () => {
    const prices = ['€29.99', '€39.99', '€49.99', '€59.99', '€69.99', '€79.99', '€89.99', '€99.99'];
    return prices[Math.floor(Math.random() * prices.length)];
};

// Image loading helpers
const createImageElement = (src, alt, className = '') => {
    return createElement('img', {
        className,
        attributes: {
            src,
            alt,
            loading: 'lazy'
        }
    });
};

const checkImageExists = async (imagePath) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;
    });
};

// Array helpers
const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

// Additional utility functions for Supabase integration
const formatCurrency = (price, currency = '€') => {
    if (typeof price === 'number') {
        return `${currency}${price.toFixed(2)}`;
    }
    return `${currency}${price}`;
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// DOM state management helpers
const toggleClass = (element, className, condition) => {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
};

const setActiveButton = (buttons, activeButton) => {
    buttons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
};

// Error handling helpers
const handleError = (error, context = '') => {
    console.error(`Error in ${context}:`, error);
    return {
        success: false,
        error: error.message || 'An unexpected error occurred'
    };
};

const handleSuccess = (data, message = '') => {
    return {
        success: true,
        data,
        message
    };
};

// Export functions to global scope for compatibility
window.scrollToProducts = scrollToProducts;