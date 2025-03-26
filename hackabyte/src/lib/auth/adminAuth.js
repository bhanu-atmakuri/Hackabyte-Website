/**
 * Verifies if the current user has admin privileges
 * @returns {Promise<boolean>} True if user is an admin, false otherwise
 */
export async function ensureAdminAuth() {
  // Only run this in the browser
  if (typeof window === 'undefined') {
    console.warn('Admin auth check attempted during server-side rendering');
    return false;
  }
  
  try {
    // Check for admin session in session storage
    const isAdmin = sessionStorage.getItem('adminLoggedIn') === 'true';
    const adminEmail = sessionStorage.getItem('adminEmail');
    
    if (!isAdmin || !adminEmail) {
      console.log('Admin authentication failed: No valid admin session');
      return false;
    }
    
    // In a production app, you would verify this against a database or auth token
    // to ensure the session hasn't been tampered with
    
    return true;
  } catch (error) {
    console.error('Error in admin auth check:', error);
    return false;
  }
}

/**
 * Verifies if a user is logged in (admin or regular user)
 * @returns {Promise<boolean>} True if user is logged in
 */
export async function ensureUserAuth() {
  // Only run this in the browser
  if (typeof window === 'undefined') {
    console.warn('User auth check attempted during server-side rendering');
    return false;
  }
  
  try {
    // Check for user session in session storage
    const isUserLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    return isUserLoggedIn || isAdminLoggedIn;
  } catch (error) {
    console.error('Error in user auth check:', error);
    return false;
  }
}

/**
 * Verifies if the current user is a regular user (not an admin)
 * @returns {Promise<boolean>} True if user is a regular user, false if admin or not logged in
 */
export async function ensureRegularUserAuth() {
  // Only run this in the browser
  if (typeof window === 'undefined') {
    console.warn('Regular user auth check attempted during server-side rendering');
    return false;
  }
  
  try {
    // Check if user is logged in but not as admin
    const isUserLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    // Return true only if user is logged in but not as admin
    return isUserLoggedIn && !isAdminLoggedIn;
  } catch (error) {
    console.error('Error in regular user auth check:', error);
    return false;
  }
}
