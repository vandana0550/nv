// ========== CONFIGURATION ==========
// ⚠️ IMPORTANT: Change this date to your actual relationship start date!
const RELATIONSHIP_START_DATE = new Date('2024-05-05T00:42:54'); // Format: YYYY-MM-DDTHH:MM:SS

// ========== FLOATING HEARTS ANIMATION ==========
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 300);
}

// ========== CARD NAVIGATION SYSTEM ==========
let currentCard = 0;
const cards = ['heroSection', 'card1', 'card2', 'card3', 'card4', 'card5'];

function showCard(cardIndex) {
    // Hide all cards
    cards.forEach((cardId, index) => {
        const element = document.getElementById(cardId);
        if (index === cardIndex) {
            element.classList.add('active');
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            element.classList.remove('active');
        }
    });
}

// ========== BUTTON EVENT LISTENERS ==========
document.getElementById('startBtn').addEventListener('click', () => {
    currentCard = 1;
    showCard(currentCard);
});

document.getElementById('nextBtn1').addEventListener('click', () => {
    currentCard = 2;
    showCard(currentCard);
});

document.getElementById('nextBtn2').addEventListener('click', () => {
    currentCard = 3;
    showCard(currentCard);
    startCountdown(); // Start the countdown timer
});

document.getElementById('nextBtn3').addEventListener('click', () => {
    currentCard = 4;
    showCard(currentCard);
});

// Add new button event listener
document.getElementById('nextBtn4').addEventListener('click', () => {
    currentCard = 5;
    showCard(currentCard);
});

// ========== PROPOSAL BUTTONS ==========
document.getElementById('yesBtn').addEventListener('click', () => {
    document.getElementById('finalMessage').classList.add('show');
    document.querySelector('.proposal-buttons').style.display = 'none';
    
    // Create confetti effect
    createConfetti();
});

document.getElementById('noBtn').addEventListener('click', () => {
    // Move the "No" button randomly on the screen (playful interaction)
    const noBtn = document.getElementById('noBtn');
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Change button text
    const texts = ['Batau abhi 😒', 'Yes pe click karo chup chap 💔', 'Please? 🙏', 'Abhi bhi moka hai maan jao 💕'];
    noBtn.textContent = texts[Math.floor(Math.random() * texts.length)];
});

// ========== REALTIME COUNTDOWN TIMER ==========
let countdownInterval;

function startCountdown() {
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Update countdown immediately
    updateCountdown();
    
    // Update every second
    countdownInterval = setInterval(updateCountdown, 1000);
}


function updateCountdown() {
    const now = new Date();
    const diff = now - RELATIONSHIP_START_DATE;
    
    // Calculate time components
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    // Calculate years and months
    let years = now.getFullYear() - RELATIONSHIP_START_DATE.getFullYear();
    let months = now.getMonth() - RELATIONSHIP_START_DATE.getMonth();
    let days = now.getDate() - RELATIONSHIP_START_DATE.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate current time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Update DOM elements with zero-padding for single digits
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}



// ========== CONFETTI EFFECT ==========
function createConfetti() {
    const colors = ['#ff4d6d', '#ff8fab', '#ffd700', '#ff69b4'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    showCard(0); // Show hero section initially
});