// ========== LOADING SPINNER ==========
window.addEventListener('load', () => {
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (loadingSpinner) {
    setTimeout(() => {
      loadingSpinner.classList.add('hidden');
    }, 500); // Hide after 500ms of page load
  }
});

// ========== ANIMATED TITLES IN HERO SECTION (HORIZONTAL SLIDE SHOW) ==========
const titles = [
  'Flutter Developer',
  'UI/UX Designer',
  'IT Student'
];

let titleIndex = 0;
const swipeText = document.getElementById('swipeText');

// Horizontal Slide Show Animation
function horizontalSlideAnimation() {
  if (!swipeText) return;

  // Set initial text
  swipeText.textContent = titles[titleIndex];

  setInterval(() => {
    // 1. Slide out to the left
    swipeText.classList.add('slide-out');

    setTimeout(() => {
      // 2. Advance to next title
      titleIndex = (titleIndex + 1) % titles.length;

      // 3. Move instantly to right offscreen
      swipeText.classList.remove('slide-out');
      swipeText.classList.add('slide-in-prep');
      swipeText.textContent = titles[titleIndex];

      // Force reflow
      void swipeText.offsetWidth;

      // 4. Slide in smoothly to center
      swipeText.classList.remove('slide-in-prep');
    }, 550); // Matches CSS transition duration
  }, 2800); // Rotates every 2.8 seconds
}

// Start animation when page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', horizontalSlideAnimation);
} else {
  horizontalSlideAnimation();
}

// ========== NAVBAR SCROLL BEHAVIOR ==========
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
 // Get the height of the hero section
 const heroHeight = heroSection ? heroSection.offsetHeight : 100;
 
 // Show navbar only after scrolling past the hero section
 if (window.scrollY > heroHeight - 100) {
   navbar.classList.add('show');
 } else {
   navbar.classList.remove('show');
 }
});

// ========== SECTION ANIMATIONS ==========
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 }
 });
}, {
 threshold: 0.1
});

sections.forEach(section => {
 observer.observe(section);
});

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('.nav-section-link, .nav-brand').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== LIGHT / DARK THEME TOGGLE WITH IMAGE SWAPPING & TRANSITION ==========
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const navImg = document.getElementById('navImg');
const heroImg = document.getElementById('heroImg');

const DARK_IMAGE = 'Githubph-emara.jpg';
const LIGHT_IMAGE = 'Githubph-emara2.jpg';

// Smooth image swapping with fallback handling
function updateImagesForTheme(isLight) {
  const targetImage = isLight ? LIGHT_IMAGE : DARK_IMAGE;

  [navImg, heroImg].forEach(img => {
    if (!img) return;
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = targetImage;
      img.onerror = () => {
        // Fallback to default image if Githubph-emara2.jpg isn't uploaded yet
        img.src = DARK_IMAGE;
      };
      img.style.opacity = '1';
    }, 200);
  });
}

function setTheme(theme, isUserClick = false) {
  const isLight = theme === 'light';
  
  if (isLight) {
    document.body.classList.add('light-mode');
    if (themeIcon) {
      themeIcon.className = 'fas fa-moon';
    }
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) {
      themeIcon.className = 'fas fa-sun';
    }
  }

  if (isUserClick && themeToggleBtn) {
    themeToggleBtn.classList.add('rotating');
    setTimeout(() => themeToggleBtn.classList.remove('rotating'), 500);
  }

  updateImagesForTheme(isLight);
  localStorage.setItem('portfolio-theme', theme);
}

// Initial theme setup on page load
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
setTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyLight = document.body.classList.contains('light-mode');
    setTheme(isCurrentlyLight ? 'dark' : 'light', true);
  });
}

