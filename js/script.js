// Main JavaScript functionality for SaasFlow website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile menu functionality
    initializeMobileMenu();
    
    // RTL toggle functionality
    initializeRTLToggle();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Animation on scroll
    initializeScrollAnimations();
    
    // Form handling
    initializeFormHandling();
    
    // Dashboard functionality
    initializeDashboard();
    
    // Stats counter animation
    initializeStatsCounter();
    
    // Typewriter effect for hero text
    initializeTypewriterEffect();
    
    // Lazy loading for images
    initializeLazyLoading();
    
    // Search functionality
    initializeSearch();
    
    console.log('SaasFlow website initialized successfully');
});

/**
 * Mobile Menu Toggle Functionality
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                const isOpen = !mobileMenu.classList.contains('hidden');
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    }
}

/**
 * RTL Toggle Functionality
 */
function initializeRTLToggle() {
    const rtlToggle = document.getElementById('rtlToggle');
    
    if (rtlToggle) {
        // Check for saved RTL preference
        const isRTL = localStorage.getItem('rtl') === 'true';
        if (isRTL) {
            document.documentElement.classList.add('rtl');
            document.dir = 'rtl';
        }
        
        rtlToggle.addEventListener('click', function() {
            const isCurrentlyRTL = document.documentElement.classList.contains('rtl');
            
            if (isCurrentlyRTL) {
                document.documentElement.classList.remove('rtl');
                document.dir = 'ltr';
                localStorage.setItem('rtl', 'false');
            } else {
                document.documentElement.classList.add('rtl');
                document.dir = 'rtl';
                localStorage.setItem('rtl', 'true');
            }
            
            // Show notification
            showNotification(isCurrentlyRTL ? 'Switched to LTR' : 'Switched to RTL');
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Animation on Scroll
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.feature-card, .stat-item, .blog-post, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Form Handling
 */
function initializeFormHandling() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Contact form submitted successfully!');
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Login successful!', function() {
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    window.location.href = 'user-dashboard.html';
                }, 1500);
            });
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Registration successful!', function() {
                // Redirect to dashboard after successful registration
                setTimeout(() => {
                    window.location.href = 'user-dashboard.html';
                }, 1500);
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Successfully subscribed to newsletter!');
        });
    }
}

/**
 * Handle Form Submission
 */
function handleFormSubmission(form, successMessage, callback) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        showNotification(successMessage, 'success');
        form.reset();
        
        if (callback) {
            callback();
        }
    }, 2000);
}

/**
 * Dashboard Functionality
 */
function initializeDashboard() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('-translate-x-full');
        });
    }
    
    // Dashboard cards hover effects
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });
    });
    
    // Update dashboard stats
    updateDashboardStats();
}

/**
 * Stats Counter Animation
 */
function initializeStatsCounter() {
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas
            const formattedNumber = Math.floor(current).toLocaleString();
            element.textContent = formattedNumber;
        }, 20);
    }
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const targetText = statNumber.textContent;
                const target = parseInt(targetText.replace(/[^\d]/g, ''));
                
                if (target) {
                    animateCounter(statNumber, target);
                    observer.unobserve(statNumber);
                }
            }
        });
    });
    
    document.querySelectorAll('.text-4xl.font-bold').forEach(stat => {
        observer.observe(stat);
    });
}

/**
 * Typewriter Effect
 */
function initializeTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    });
}

/**
 * Lazy Loading for Images
 */
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Search Functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                if (searchResults) {
                    searchResults.innerHTML = '';
                    searchResults.classList.add('hidden');
                }
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
    }
}

/**
 * Perform Search
 */
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    // Simulate search results
    const mockResults = [
        { title: 'Getting Started Guide', url: '#', type: 'Documentation' },
        { title: 'API Reference', url: '#', type: 'Documentation' },
        { title: 'Pricing Plans', url: 'pricing.html', type: 'Page' },
        { title: 'Contact Support', url: 'contact.html', type: 'Page' }
    ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase())
    );
    
    if (mockResults.length === 0) {
        searchResults.innerHTML = '<div class="p-4 text-gray-500">No results found</div>';
    } else {
        const resultsHTML = mockResults.map(result => `
            <div class="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                <div class="font-medium">${result.title}</div>
                <div class="text-sm text-gray-500">${result.type}</div>
            </div>
        `).join('');
        
        searchResults.innerHTML = resultsHTML;
    }
    
    searchResults.classList.remove('hidden');
}

/**
 * Update Dashboard Stats
 */
function updateDashboardStats() {
    const statsElements = {
        totalUsers: document.getElementById('totalUsers'),
        activeProjects: document.getElementById('activeProjects'),
        revenue: document.getElementById('revenue'),
        growth: document.getElementById('growth')
    };
    
    // Simulate real-time data updates
    setInterval(() => {
        Object.keys(statsElements).forEach(key => {
            const element = statsElements[key];
            if (element) {
                const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
                const change = Math.floor(Math.random() * 10) - 5; // Random change between -5 and +5
                const newValue = Math.max(0, currentValue + change);
                
                if (key === 'revenue') {
                    element.textContent = `$${newValue.toLocaleString()}`;
                } else if (key === 'growth') {
                    element.textContent = `${newValue}%`;
                } else {
                    element.textContent = newValue.toLocaleString();
                }
            }
        });
    }, 5000); // Update every 5 seconds
}

/**
 * Show Notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${styles[type] || styles.info}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Utility Functions
 */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Local storage helpers
const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }
};

// Export functions for global use
window.SaasFlow = {
    showNotification,
    formatCurrency,
    formatDate,
    storage,
    debounce
};