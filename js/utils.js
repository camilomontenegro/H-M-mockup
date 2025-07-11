// Utility Functions

// DOM manipulation helpers
const createElement = (tag, className = '', textContent = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
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
    const img = createElement('img', className);
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    return img;
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

// Export functions to global scope for compatibility
window.scrollToProducts = scrollToProducts;