// Authentication JavaScript

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Get current user info
function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

// Set user as logged in
function setLoggedIn(user) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Logout user
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Update navigation based on login status
function updateNavigation() {
  const loginNavItem = document.getElementById('loginNavItem');
  const userNavItem = document.getElementById('userNavItem');
  const userName = document.getElementById('userName');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (isLoggedIn()) {
    const user = getCurrentUser();
    if (loginNavItem) loginNavItem.style.display = 'none';
    if (userNavItem) {
      userNavItem.style.display = 'block';
      if (userName) userName.textContent = `Hello, ${user.email}`;
    }
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }
  } else {
    if (loginNavItem) loginNavItem.style.display = 'block';
    if (userNavItem) userNavItem.style.display = 'none';
  }
}

// Handle login form submission
function handleLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Simple validation
    // For demo, accept any email/password combination
    if (email && password) {
      // Simulate successful login
      const user = {
        email: email,
        loginTime: new Date().toISOString()
      };
      
      setLoggedIn(user);
      
      // Show success message briefly, then redirect
      if (errorMessage) {
        errorMessage.style.display = 'none';
      }
      
      // Redirect to home page
      window.location.href = 'index.html';
    } else {
      if (errorMessage) {
        errorMessage.textContent = 'Please fill in all fields.';
        errorMessage.style.display = 'block';
      }
    }
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateNavigation();
  handleLoginForm();
  
  // If on login page and already logged in, redirect to home
  if (window.location.pathname.includes('login.html') && isLoggedIn()) {
    window.location.href = 'index.html';
  }
});
