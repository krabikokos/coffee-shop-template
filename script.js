/**
 * THEME TOGGLE
 * Handles dark/light mode switching and persistence via localStorage.
 */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlRoot = document.documentElement;
const themeStorageKey = 'beanology-site-theme';

// Function to apply theme and update icon
function applyTheme(theme) {
  if (theme === 'dark') {
    htmlRoot.classList.add('dark');
    themeToggleBtn.textContent = '☀️'; // Show sun icon when dark
    themeToggleBtn.setAttribute('aria-label', 'Включить светлую тему');
  } else {
    htmlRoot.classList.remove('dark');
    themeToggleBtn.textContent = '🌙'; // Show moon icon when light
    themeToggleBtn.setAttribute('aria-label', 'Включить темную тему');
  }
}

// Initialize theme based on saved preference or system setting
const savedTheme = localStorage.getItem(themeStorageKey);
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

// Event listener for toggle button
themeToggleBtn.addEventListener('click', () => {
  const isDarkNow = htmlRoot.classList.contains('dark');
  const newTheme = isDarkNow ? 'light' : 'dark';
  localStorage.setItem(themeStorageKey, newTheme);
  applyTheme(newTheme);
});


/**
 * MOBILE NAVIGATION TOGGLE
 * Toggles the visibility of the nav menu on smaller screens using CSS classes.
 */
const navToggleBtn = document.querySelector('.nav-toggle');
const navWrapper = document.querySelector('.nav-wrapper');
const navLinks = document.querySelectorAll('.nav-list a');

if (navToggleBtn && navWrapper) {
  navToggleBtn.addEventListener('click', () => {
    // Toggle the class that shows/hides the menu via CSS
    const isOpen = navWrapper.classList.toggle('is-open');
    
    // Update ARIA attribute for accessibility
    navToggleBtn.setAttribute('aria-expanded', isOpen.toString());
    navToggleBtn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    
    // Change hamburger icon to "X" (optional, simple text replacement)
    navToggleBtn.querySelector('.hamburger').textContent = isOpen ? '✕' : '☰';
  });

  // Close menu when a link is clicked (important for on-page anchors)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navWrapper.classList.contains('is-open')) {
        navToggleBtn.click(); // Simulate click to close
      }
    });
  });
}


/**
 * BOOKING FORM HANDLER
 * Simulates form submission with visual feedback.
 */
const bookingForm = document.getElementById('bookingForm');
const bookingSuccessMsg = document.getElementById('bookingSuccess');
const submitBtn = bookingForm?.querySelector('button[type="submit"]');

if (bookingForm && bookingSuccessMsg && submitBtn) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1. Disable button and show loading state (optional text change)
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';

    // 2. Simulate server request delay (e.g., 1.5 seconds)
    setTimeout(() => {
      // 3. Reset form and show success message
      bookingForm.reset();
      bookingSuccessMsg.hidden = false;
      
      // 4. Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;

      // 5. Hide success message after 5 seconds
      setTimeout(() => {
        bookingSuccessMsg.hidden = true;
      }, 5000);
    }, 1500);
  });
}