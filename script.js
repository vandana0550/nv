// Romantic Messages Array
const messages = [
  { nickname: "Mera Baccha", text: "vandana, tum meri life ki sabse beautiful feeling ho." },
  { nickname: "Meri Jaan", text: "Tumhari smile mera favourite moment hai, babu." },
  { nickname: "Babu", text: "Tumhare bina sab kuch adhoora lagta hai, meri jaan." },
  { nickname: "Mera Baccha", text: "Tum sirf meri girlfriend nahi, meri happiness ho." },
  { nickname: "Meri Jaan", text: "Jab bhi tumhe dekhta hu, dil automatically smile karne lagta hai." }
];

let currentMessageIndex = 0;
let musicPlaying = false;
let currentStep = 0;
const totalSteps = 5;

// Animation control - prevents memory leaks
let animationIntervals = {
  hearts: null,
  sparkles: null,
  petals: null
};

// Performance optimization - pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseBackgroundAnimations();
  } else {
    resumeBackgroundAnimations();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  try {
    createCarouselDots();
    startCountdown();
    startBackgroundAnimations(); // Single controller
    updateProgressIndicator();
    makeProgressDotsClickable();
    console.log('✅ All initialization complete!');
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
});

// Navigation - now uses CSS classes instead of inline styles
function nextSection() {
  if (currentStep < totalSteps - 1) {
    const currentSection = document.querySelector(`[data-step="${currentStep}"]`);
    
    if (!currentSection) {
      console.error('❌ Current section not found');
      return;
    }
    
    // Use CSS class for fade-out
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
      currentSection.classList.add('hidden');
      currentSection.classList.remove('fade-out');
      
      currentStep++;
      const nextSectionElement = document.querySelector(`[data-step="${currentStep}"]`);
      
      if (!nextSectionElement) {
        console.error('❌ Next section not found');
        currentStep--;
        currentSection.classList.remove('hidden');
        return;
      }
      
      // Use CSS class for fade-in
      nextSectionElement.classList.remove('hidden');
      nextSectionElement.classList.add('fade-in');
      
      // Smooth scroll with mobile optimization
      requestAnimationFrame(() => {
        nextSectionElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' // Better for mobile
        });
      });
      
      // Clean up animation class
      setTimeout(() => {
        nextSectionElement.classList.remove('fade-in');
      }, 600);
      
      updateProgressIndicator();
      
      // Trigger surprise effects
      if (currentStep === 4) {
        setTimeout(() => {
          createConfetti();
          createHeartExplosion();
        }, 800);
      }
    }, 400);
  }
}

// Go to specific section - optimized
function goToStep(step) {
  if (step >= 0 && step < totalSteps && step !== currentStep) {
    const currentSection = document.querySelector(`[data-step="${currentStep}"]`);
    
    if (!currentSection) return;
    
    currentSection.classList.add('fade-out');
    
    setTimeout(() => {
      currentSection.classList.add('hidden');
      currentSection.classList.remove('fade-out');
      
      currentStep = step;
      const targetSection = document.querySelector(`[data-step="${currentStep}"]`);
      
      if (!targetSection) return;
      
      targetSection.classList.remove('hidden');
      targetSection.classList.add('fade-in');
      
      requestAnimationFrame(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      
      setTimeout(() => targetSection.classList.remove('fade-in'), 600);
      
      updateProgressIndicator();
      
      if (currentStep === 4) {
        setTimeout(() => {
          createConfetti();
          createHeartExplosion();
        }, 800);
      }
    }, 400);
  }
}

// Make progress dots clickable
function makeProgressDotsClickable() {
  const dots = document.querySelectorAll('.progress-dot');
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToStep(index));
    dot.title = `Go to step ${index + 1}`;
  });
}

// Update progress indicator
function updateProgressIndicator() {
  const dots = document.querySelectorAll('.progress-dot');
  
  dots.forEach((dot, index) => {
    if (index <= currentStep) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Message Carousel
function changeMessage(direction) {
  currentMessageIndex += direction;
  if (currentMessageIndex < 0) currentMessageIndex = messages.length - 1;
  if (currentMessageIndex >= messages.length) currentMessageIndex = 0;
  
  const messageEl = document.getElementById('carouselMessage');
  const nicknameEl = document.querySelector('.nickname');
  const heartIcon = document.querySelector('.heart-icon');
  
  if (!messageEl || !nicknameEl || !heartIcon) return;
  
  // Use CSS transitions
  messageEl.classList.add('fade-out-text');
  nicknameEl.classList.add('fade-out-text');
  heartIcon.classList.add('scale-down');
  
  setTimeout(() => {
    messageEl.textContent = messages[currentMessageIndex].text;
    nicknameEl.textContent = messages[currentMessageIndex].nickname;
    
    messageEl.classList.remove('fade-out-text');
    nicknameEl.classList.remove('fade-out-text');
    heartIcon.classList.remove('scale-down');
    
    updateDots();
  }, 300);
}

// Create carousel dots
function createCarouselDots() {
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!dotsContainer) return;
  
  dotsContainer.innerHTML = '';
  
  messages.forEach((message, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToMessage(index);
    dot.title = message.nickname;
    dotsContainer.appendChild(dot);
  });
}

// Update carousel dots
function updateDots() {
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  dots.forEach((dot, index) => {
    if (index === currentMessageIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Go to specific message
function goToMessage(index) {
  if (index >= 0 && index < messages.length) {
    const direction = index > currentMessageIndex ? 1 : -1;
    currentMessageIndex = index - direction;
    changeMessage(direction);
  }
}

// Countdown Timer - optimized
function startCountdown() {
  const startDate = new Date('2024-05-05T00:42:54').getTime();
  
  // Check if elements exist
  const elements = ['days', 'hours', 'minutes', 'seconds'];
  const allExist = elements.every(id => document.getElementById(id));
  
  if (!allExist) return;
  
  function updateCountdown() {
    const now = Date.now();
    const distance = now - startDate;
    
    // Handle negative time
    if (distance < 0) return;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    animateValue('days', days);
    animateValue('hours', hours);
    animateValue('minutes', minutes);
    animateValue('seconds', seconds);
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Animate value changes - now uses CSS
function animateValue(id, newValue) {
  const element = document.getElementById(id);
  
  if (!element) return;
  
  const currentValue = parseInt(element.textContent) || 0;
  
  if (currentValue !== newValue) {
    element.classList.add('scale-up');
    element.textContent = newValue;
    
    setTimeout(() => {
      element.classList.remove('scale-up');
    }, 200);
  }
}

// Music Toggle - fixed to prevent multiple fade intervals
let musicFadeInterval = null;

function toggleMusic() {
  const music = document.getElementById('bgMusic');
  const btn = document.querySelector('.music-toggle');
  
  if (!music || !btn) return;
  
  // Clear any existing fade interval
  if (musicFadeInterval) {
    clearInterval(musicFadeInterval);
    musicFadeInterval = null;
  }
  
  if (musicPlaying) {
    let volume = 1.0;
    musicFadeInterval = setInterval(() => {
      volume -= 0.1;
      if (volume <= 0) {
        music.volume = 0;
        music.pause();
        clearInterval(musicFadeInterval);
        musicFadeInterval = null;
      } else {
        music.volume = volume;
      }
    }, 50);
    
    btn.classList.remove('playing');
    btn.textContent = '🎵';
    musicPlaying = false;
  } else {
    music.volume = 0;
    music.play().then(() => {
      let volume = 0;
      musicFadeInterval = setInterval(() => {
        volume += 0.1;
        if (volume >= 1.0) {
          music.volume = 1.0;
          clearInterval(musicFadeInterval);
          musicFadeInterval = null;
        } else {
          music.volume = volume;
        }
      }, 50);
      
      btn.classList.add('playing');
      btn.textContent = '🎶';
      musicPlaying = true;
    }).catch(() => {
      alert('Click the music button to enable background music 🎵');
    });
  }
}

// Centralized animation controller - prevents memory leaks
function startBackgroundAnimations() {
  // Floating Hearts - optimized creation
  animationIntervals.hearts = setInterval(() => {
    createFloatingElement('❤️💕💖💗💓💝💞'.charAt(Math.floor(Math.random() * 7)), 'rise');
  }, 800); // Reduced frequency
  
  // Sparkles - optimized
  animationIntervals.sparkles = setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.className = 'sparkle-element';
    sparkle.innerHTML = "✨";
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    
    const container = document.querySelector(".sparkles");
    if (container) {
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 2500);
    }
  }, 1500); // Reduced frequency
  
  // Rose Petals - optimized
  animationIntervals.petals = setInterval(() => {
    createFloatingElement('🌹', 'petalFall');
  }, 2500); // Reduced frequency
}

// Helper function to create floating elements efficiently
function createFloatingElement(symbol, animationName) {
  const element = document.createElement("div");
  element.className = 'floating-element';
  element.innerHTML = symbol;
  element.style.cssText = `
    left: ${Math.random() * 100}vw;
    animation: ${animationName} ${5 + Math.random() * 3}s linear;
  `;
  
  document.body.appendChild(element);
  setTimeout(() => element.remove(), 8000);
}

// Pause animations when tab hidden - saves battery/CPU
function pauseBackgroundAnimations() {
  Object.keys(animationIntervals).forEach(key => {
    if (animationIntervals[key]) {
      clearInterval(animationIntervals[key]);
    }
  });
}

// Resume animations when tab visible
function resumeBackgroundAnimations() {
  startBackgroundAnimations();
}

// Confetti - optimized to reuse CSS animations
function createConfetti() {
  const symbols = ["🎉", "🎊", "💝", "💖", "✨", "⭐"];
  const fragment = document.createDocumentFragment(); // Performance optimization
  
  for (let i = 0; i < 50; i++) { // Reduced from 100
    const confetti = document.createElement("div");
    confetti.className = 'confetti-element';
    confetti.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
    confetti.style.animationDelay = (i * 0.03) + 's';
    
    fragment.appendChild(confetti);
  }
  
  document.body.appendChild(fragment);
  
  setTimeout(() => {
    document.querySelectorAll('.confetti-element').forEach(el => el.remove());
  }, 5000);
}

// Heart Explosion - reuses CSS animation instead of creating styles
function createHeartExplosion() {
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 30; i++) { // Reduced from 40
    const heart = document.createElement("div");
    heart.className = 'explosion-heart';
    heart.innerHTML = "💖";
    heart.style.setProperty('--angle', (i / 30) * 360 + 'deg');
    heart.style.setProperty('--velocity', (5 + Math.random() * 10) + 'px');
    
    fragment.appendChild(heart);
  }
  
  document.body.appendChild(fragment);
  
  setTimeout(() => {
    document.querySelectorAll('.explosion-heart').forEach(el => el.remove());
  }, 2500);
}

console.log('✅ Optimized script loaded!');