// Build-time configuration generator for Vercel deployment
// This script reads environment variables and generates js/config.js

const fs = require('fs');
const path = require('path');

// Get environment variables (Vercel automatically provides these during build)
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'your-anon-key';
const googleClientId = process.env.GOOGLE_CLIENT_ID || 'your-google-client-id';

// Generate config content
const configContent = `// Auto-generated configuration file
// This file is created during build time and should not be edited manually

window.ENV = {
    SUPABASE_URL: '${supabaseUrl}',
    SUPABASE_KEY: '${supabaseKey}',
    GOOGLE_CLIENT_ID: '${googleClientId}'
};

// Debug info (remove in production)
console.log('Configuration loaded:', {
    hasSupabaseUrl: !!window.ENV.SUPABASE_URL && window.ENV.SUPABASE_URL !== 'https://your-project.supabase.co',
    hasSupabaseKey: !!window.ENV.SUPABASE_KEY && window.ENV.SUPABASE_KEY !== 'your-anon-key',
    hasGoogleClientId: !!window.ENV.GOOGLE_CLIENT_ID && window.ENV.GOOGLE_CLIENT_ID !== 'your-google-client-id'
});
`;

// Ensure js directory exists
const jsDir = path.join(__dirname, 'js');
if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
}

// Write config file
const configPath = path.join(jsDir, 'config.js');
fs.writeFileSync(configPath, configContent);

console.log('✅ Configuration file generated at:', configPath);
console.log('Environment variables detected:');
console.log('- SUPABASE_URL:', supabaseUrl !== 'https://your-project.supabase.co' ? '✅ Set' : '❌ Not set');
console.log('- SUPABASE_KEY:', supabaseKey !== 'your-anon-key' ? '✅ Set' : '❌ Not set');
console.log('- GOOGLE_CLIENT_ID:', googleClientId !== 'your-google-client-id' ? '✅ Set' : '❌ Not set');