// Production config - safe to commit (anon key is meant to be public)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://kudhfkhefacuocdhumwt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZGhma2hlZmFjdW9jZGh1bXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzY5NTgsImV4cCI6MjA2NzgxMjk1OH0.6xrC8zz6PsAvJNF23f62X6sXvTswGaWbxhxX5oRTUf8';

console.log('Environment: Production');

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);