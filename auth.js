// Current user data
let currentUser = null;

// DOM Elements
const usernameDisplay = document.getElementById('username-display');
const logoutBtn = document.getElementById('logout-btn');
const profileLink = document.getElementById('profile-link');
const adminLink = document.getElementById('admin-link');

// Initialize auth functionality
function initAuth() {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('libraryUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }

    // Set up logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Update UI based on auth state
function updateAuthUI() {
    if (currentUser) {
        if (usernameDisplay) usernameDisplay.textContent = currentUser.username;
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (profileLink) profileLink.style.display = 'block';
        
        if (currentUser.role === 'admin' && adminLink) {
            adminLink.style.display = 'block';
        } else if (adminLink) {
            adminLink.style.display = 'none';
        }
    } else {
        if (usernameDisplay) usernameDisplay.textContent = 'Guest';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('libraryUser');
    updateAuthUI();
    window.location.href = 'index.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);