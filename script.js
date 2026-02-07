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

const noBtn = document.getElementById('noBtn');

function moveNoButton(e) {
    if (e && e.type === 'touchstart') e.preventDefault();
    
    // Ensure button acts elusive within safe bounds
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(50, Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000'; // Make sure it stays on top
    
    // Change button text
    const texts = [
        'Batau abhi 😒', 
        'Yes pe click karo 💕', 
        'Pakka? 🥺', 
        'Dobara socho... 🤔', 
        'Na ji Na 😤', 
        'Try again 🤭',
        'Aise kaise? 🤨'
    ];
    noBtn.textContent = texts[Math.floor(Math.random() * texts.length)];
}

// Add event listeners for both desktop (mouse) and mobile (touch)
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);


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
    const start = RELATIONSHIP_START_DATE;

    // Calculate basic differences
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();
    
    // Adjust negative values by borrowing from larger units
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    
    if (hours < 0) {
        hours += 24;
        days--;
    }
    
    if (days < 0) {
        // Get days in the previous month to borrow
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    
    if (months < 0) {
        months += 12;
        years--;
    }
    
    // Update DOM elements with zero-padding for all digits
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = String(months).padStart(2, '0');
    document.getElementById('days').textContent = String(days).padStart(2, '0');
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

    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = 0.5; // Set volume level (0.0 to 1.0)
        
        // 1. Try to play immediately (often blocked by browsers)
        audio.play().catch(error => {
            console.log("Autoplay blocked. Waiting for interaction.");
        });

        // 2. Ensure it plays on the very first click anywhere on the page
        document.body.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            }
        }, { once: true });
    }
});