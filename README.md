# H&M Style - Fashion Homepage Mockup

A professional and visually elegant homepage mockup for a fashion brand inspired by H&M. Built using clean HTML, CSS, and modern JavaScript without frameworks.

## Features

- **Fixed Navigation Bar** - Clean navbar with brand logo and navigation links
- **Hero Section** - Full-width hero with background image and call-to-action
- **Dynamic Product Grid** - Automatically loads and displays product images from `/assets/products/`
- **Google Sign-In Integration** - Secure authentication using Google Identity Services
- **Responsive Design** - Mobile-friendly layout that works on all devices
- **Neutral Color Palette** - Professional styling with light gray, white, black, and beige tones

## Project Structure

```
/hm-homepage-mockup
├── index.html          # Main homepage
├── login.html          # Login page with Google Sign-In
├── /css/
│   └── style.css       # All styling and responsive design
├── /js/
│   ├── main.js         # Homepage functionality and product grid
│   ├── auth.js         # Google Sign-In authentication logic
│   └── utils.js        # Helper functions and utilities
├── /assets/
│   ├── logo.png        # Brand logo (placeholder)
│   ├── hero.jpg        # Hero section background image (placeholder)
│   └── /products/      # Product images (1.jpg, 2.jpg, 3.jpg...)
└── README.md           # This file
```

## Setup Instructions

### 1. Add Product Images
Place your product images in the `/assets/products/` folder using sequential naming:
- `1.jpg`, `2.jpg`, `3.jpg`, etc.
- The JavaScript will automatically detect and load all available images
- Recommended image size: 400x500px or similar aspect ratio

### 2. Add Brand Assets
Replace the placeholder files in `/assets/`:
- `logo.png` - Your brand logo
- `hero.jpg` - Hero section background image (recommended: 1920x1080px)

### 3. Configure Google Sign-In
To enable Google authentication:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add your domain to authorized origins
6. Copy your Client ID
7. Replace `YOUR_GOOGLE_CLIENT_ID` in both `login.html` and `auth.js` with your actual Client ID

### 4. Launch the Website
Simply open `index.html` in a web browser or serve it using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## Code Architecture

### JavaScript Principles
- **Modular & Functional** - No classes, small reusable functions
- **Declarative Code** - Clear, readable function names
- **Descriptive Variables** - Uses auxiliary verbs (isUserLoggedIn, hasError, etc.)
- **Separation of Concerns** - Auth, utilities, and main logic in separate files

### CSS Features
- **CSS Custom Properties** - Consistent color palette and spacing
- **Mobile-First Design** - Responsive breakpoints at 768px and 480px
- **Smooth Animations** - Subtle transitions and hover effects
- **Grid Layout** - Modern CSS Grid for product display

### HTML Structure
- **Semantic HTML5** - Proper use of header, main, section, footer
- **Accessibility** - Alt text, proper heading hierarchy
- **Clean Markup** - Minimal, semantic structure

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License
This project is a mockup/demo and is not affiliated with H&M. Use for educational and portfolio purposes.