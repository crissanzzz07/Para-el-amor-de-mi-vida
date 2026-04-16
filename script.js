/**
 * ============================================
 * LOVE LETTER INTERACTIVE PAGE — For Clara ❤️
 * ============================================
 */

'use strict';

// ============================================
// CONFIG
// ============================================

const CONFIG = {
  password: '09/11/2021',
  passwordAlt: ['09112021', '9/11/2021', '09-11-2021', '9-11-2021', '09.11.2021', '9.11.2021', '9/11/21', '09/11/21'],
  
  photoFolder: 'importaciones/',
  
  // Actual photo filenames found in the folder
  photos: [
    'IMG_2378.jpeg',
    'IMG_2379.jpeg',
    'IMG_3122.jpeg',
    'IMG_3229.jpeg',
    'IMG_4348.jpeg',
    'IMG_4373.jpeg',
    'IMG_4490.jpeg',
    'IMG_4803.jpeg',
    'IMG_4855.jpeg',
    'IMG_4958.jpeg',
    'IMG_4962.jpeg',
    'IMG_5093.jpeg',
    'IMG_5361.jpeg',
    'IMG_5394.jpg',
    'IMG_5408.jpeg',
    'IMG_5901.jpeg',
    'IMG_6158.jpeg',
    'IMG_7214.jpeg',
    'IMG_8347.jpeg',
    'IMG_9744.jpeg',
    'IMG_9919.jpeg',
    '1000027236.JPG',
    '1000056144.JPG',
    '1000056599.JPG',
    '1000062407.JPG',
    '1000062426.JPG',
    '1000066376.JPG',
    '1000120368.JPG',
    '1000120418.JPG',
    '1000120489.JPG',
    '1000120516.JPG'
  ],
  
  petalColors: [
    '#e63946', '#d62828', '#c1121f', '#a4161a',
    '#ff6b8a', '#ee4466', '#ff8fab', '#dc3545',
    '#b5179e', '#7209b7'
  ],
  
  flowerColors: [
    '#e63946', '#d62828', '#c1121f', '#ff6b8a', '#ee4466',
    '#dc3545', '#c92a2a', '#b5179e', '#a4161a', '#ff4d6d'
  ],
  
  petalsCount: 45,
  firefliesCount: 25,
  starsCount: 80,
  particlesCount: 25,
  flowersCount: 35,
};


// ============================================
// DOM ELEMENTS
// ============================================

const DOM = {
  passwordSection: document.getElementById('password-section'),
  mainSection: document.getElementById('main-section'),
  gallerySection: document.getElementById('gallery-section'),
  specialSection: document.getElementById('special-section'),
  
  passwordForm: document.getElementById('password-form'),
  passwordInput: document.getElementById('password-input'),
  passwordError: document.getElementById('password-error'),
  passwordParticles: document.getElementById('password-particles'),
  
  sceneTitle: document.getElementById('scene-title'),
  swordContainer: document.getElementById('sword-container'),
  petalsCanvas: document.getElementById('petals-canvas'),
  fireflies: document.getElementById('fireflies'),
  flowersLayer: document.getElementById('flowers-layer'),
  sceneBackground: document.getElementById('scene-background'),
  heroArea: document.getElementById('hero-area'),
  
  letterPanel: document.getElementById('letter-panel'),
  letterBody: document.getElementById('letter-body'),
  btnGoGallery: document.getElementById('btn-go-gallery'),
  
  galleryContainer: document.getElementById('gallery-container'),
  galleryPlaceholder: document.getElementById('gallery-placeholder'),
  btnGoSpecial: document.getElementById('btn-go-special'),
  
  specialStars: document.getElementById('special-stars'),
  btnSpotify: document.getElementById('btn-spotify'),
  spotifyContainer: document.getElementById('spotify-link-container'),
  btnBackTop: document.getElementById('btn-back-top'),
};


// ============================================
// UTILS
// ============================================

function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max)); }


// ============================================
// PASSWORD PAGE
// ============================================

function initPasswordPage() {
  createPasswordParticles();
  
  DOM.passwordInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^\d\/]/g, '');
    const digits = value.replace(/\//g, '');
    if (digits.length >= 2 && !value.includes('/')) {
      value = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    if (digits.length >= 4) {
      value = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4, 8);
    }
    e.target.value = value;
  });
  
  DOM.passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkPassword();
  });
}

function checkPassword() {
  const input = DOM.passwordInput.value.trim();
  
  if (input === CONFIG.password || CONFIG.passwordAlt.includes(input)) {
    DOM.passwordError.classList.remove('visible');
    DOM.passwordInput.style.borderColor = '#1db954';
    DOM.passwordSection.classList.add('page-transition-out');
    
    setTimeout(() => {
      DOM.passwordSection.classList.remove('active');
      DOM.mainSection.classList.add('active', 'page-transition-in');
      initMainScene();
    }, 800);
  } else {
    DOM.passwordError.classList.remove('hidden');
    DOM.passwordError.classList.add('visible');
    DOM.passwordInput.classList.add('shake');
    DOM.passwordInput.style.borderColor = 'var(--rose-400)';
    setTimeout(() => DOM.passwordInput.classList.remove('shake'), 500);
    setTimeout(() => { DOM.passwordInput.style.borderColor = ''; }, 2000);
  }
}

function createPasswordParticles() {
  for (let i = 0; i < CONFIG.particlesCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = rand(3, 8);
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = rand(0, 100) + '%';
    p.style.animationDuration = rand(8, 16) + 's';
    p.style.animationDelay = rand(0, 10) + 's';
    DOM.passwordParticles.appendChild(p);
  }
}


// ============================================
// MAIN SCENE
// ============================================

let mainInitialized = false;

function initMainScene() {
  if (mainInitialized) return;
  mainInitialized = true;
  
  // Show the background elements
  DOM.sceneBackground.style.display = 'block';
  
  initPetalsCanvas();
  createFireflies();
  createAnimatedFlowers();
  
  setTimeout(() => {
    DOM.sceneTitle.classList.add('visible');
  }, 500);
  
  // Sword click → open letter
  DOM.swordContainer.addEventListener('click', openLetter);
  
  // Sword hover → burst petals
  DOM.swordContainer.addEventListener('mouseenter', () => {
    burstPetals(15);
  });
}


// ============================================
// ANIMATED CSS FLOWERS
// ============================================

function createAnimatedFlowers() {
  const layer = DOM.flowersLayer;
  const swayAnimations = ['flowerSway', 'flowerSway2', 'flowerSway3'];
  
  for (let i = 0; i < CONFIG.flowersCount; i++) {
    const flower = document.createElement('div');
    flower.classList.add('css-flower');
    
    const x = rand(0, 100);
    const stemH = rand(40, 100);
    const headSize = rand(12, 28);
    const color = CONFIG.flowerColors[randInt(0, CONFIG.flowerColors.length)];
    const anim = swayAnimations[randInt(0, 3)];
    const duration = rand(3, 7);
    const delay = rand(0, 4);
    const zIdx = randInt(1, 10);
    
    flower.style.left = x + '%';
    flower.style.zIndex = zIdx;
    flower.style.animation = `${anim} ${duration}s ease-in-out ${delay}s infinite`;
    
    // Stem
    const stem = document.createElement('div');
    stem.classList.add('flower-stem');
    stem.style.height = stemH + 'px';
    
    // Flower head
    const head = document.createElement('div');
    head.classList.add('flower-head');
    head.style.top = '-' + (stemH - 5) + 'px';
    
    // Petals (5-8 petals per flower)
    const petalCount = randInt(5, 9);
    for (let j = 0; j < petalCount; j++) {
      const petal = document.createElement('div');
      petal.classList.add('flower-petal');
      const angle = (360 / petalCount) * j;
      const petalW = headSize * rand(0.5, 0.7);
      const petalH = headSize * rand(0.8, 1.2);
      
      petal.style.width = petalW + 'px';
      petal.style.height = petalH + 'px';
      petal.style.backgroundColor = color;
      petal.style.transform = `rotate(${angle}deg) translateY(-${headSize * 0.3}px)`;
      petal.style.transformOrigin = 'bottom center';
      petal.style.left = '50%';
      petal.style.top = '50%';
      petal.style.marginLeft = -(petalW / 2) + 'px';
      petal.style.marginTop = -(petalH / 2) + 'px';
      petal.style.borderRadius = '50% 50% 50% 0';
      petal.style.opacity = rand(0.7, 1);
      petal.style.boxShadow = `inset -2px -2px 4px rgba(0,0,0,0.15), inset 2px 2px 4px rgba(255,255,255,0.2)`;
      
      head.appendChild(petal);
    }
    
    // Center dot
    const center = document.createElement('div');
    center.style.cssText = `
      position: absolute;
      width: ${headSize * 0.3}px;
      height: ${headSize * 0.3}px;
      background: radial-gradient(circle, #ffd700, #daa520);
      border-radius: 50%;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      box-shadow: 0 0 4px rgba(255,215,0,0.5);
    `;
    head.appendChild(center);
    
    // Leaves on stem
    if (stemH > 60 && Math.random() > 0.4) {
      const leaf = document.createElement('div');
      const leafSide = Math.random() > 0.5 ? 'left' : 'right';
      leaf.style.cssText = `
        position: absolute;
        width: ${rand(10, 18)}px;
        height: ${rand(6, 10)}px;
        background: linear-gradient(to top, #2d5016, #4a7c23);
        border-radius: ${leafSide === 'left' ? '50% 0 50% 50%' : '0 50% 50% 50%'};
        ${leafSide}: -${rand(8, 14)}px;
        top: ${rand(30, 70)}%;
        transform: rotate(${leafSide === 'left' ? '-20' : '20'}deg);
        opacity: 0.8;
      `;
      stem.appendChild(leaf);
    }
    
    flower.appendChild(stem);
    flower.appendChild(head);
    layer.appendChild(flower);
  }
}


// ============================================
// PETALS CANVAS
// ============================================

let petalsCtx, petalsW, petalsH;
let petals = [];
let petalAnimId;

class Petal {
  constructor(burst = false, fromSword = false) {
    this.reset(burst, fromSword);
  }
  
  reset(burst = false, fromSword = false) {
    if (fromSword) {
      const swordRect = DOM.swordContainer.getBoundingClientRect();
      this.x = swordRect.left + swordRect.width / 2 + rand(-80, 80);
      this.y = swordRect.top + rand(-20, 20);
    } else {
      this.x = burst ? petalsW / 2 + rand(-100, 100) : rand(-50, petalsW + 50);
      this.y = burst ? petalsH / 2 + rand(-50, 50) : rand(-20, -80);
    }
    
    this.size = rand(6, 18);
    this.speedX = burst || fromSword ? rand(-4, 4) : rand(-1.5, 1.5);
    this.speedY = burst || fromSword ? rand(-5, 3) : rand(0.5, 2.5);
    this.rotation = rand(0, Math.PI * 2);
    this.rotationSpeed = rand(-0.04, 0.04);
    this.opacity = burst || fromSword ? rand(0.6, 1) : rand(0.4, 0.9);
    this.color = CONFIG.petalColors[randInt(0, CONFIG.petalColors.length)];
    this.wobble = rand(0.5, 2.5);
    this.wobbleSpeed = rand(0.01, 0.04);
    this.wobbleOffset = rand(0, Math.PI * 2);
    this.life = burst || fromSword ? rand(60, 160) : Infinity;
    this.age = 0;
  }
  
  update() {
    this.x += this.speedX + Math.sin(this.wobbleOffset) * this.wobble;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.wobbleOffset += this.wobbleSpeed;
    this.age++;
    
    if (this.life !== Infinity) {
      this.opacity = Math.max(0, this.opacity - (1 / this.life));
      this.speedY += 0.02;
    }
    
    if (this.life === Infinity && (this.y > petalsH + 20 || this.x < -60 || this.x > petalsW + 60)) {
      this.reset();
    }
    
    return this.life === Infinity || this.age < this.life;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(this.size*0.3, -this.size*0.6, this.size*0.8, -this.size*0.3, this.size, 0);
    ctx.bezierCurveTo(this.size*0.8, this.size*0.3, this.size*0.3, this.size*0.6, 0, 0);
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 0.5;
    ctx.moveTo(this.size*0.15, 0);
    ctx.lineTo(this.size*0.7, 0);
    ctx.stroke();
    
    ctx.restore();
  }
}

function initPetalsCanvas() {
  petalsCtx = DOM.petalsCanvas.getContext('2d');
  resizePetalsCanvas();
  window.addEventListener('resize', resizePetalsCanvas);
  
  for (let i = 0; i < CONFIG.petalsCount; i++) {
    const p = new Petal();
    p.y = rand(0, petalsH);
    petals.push(p);
  }
  
  animatePetals();
}

function resizePetalsCanvas() {
  petalsW = window.innerWidth;
  petalsH = window.innerHeight;
  DOM.petalsCanvas.width = petalsW;
  DOM.petalsCanvas.height = petalsH;
}

function animatePetals() {
  petalsCtx.clearRect(0, 0, petalsW, petalsH);
  
  petals = petals.filter(p => {
    const alive = p.update();
    if (alive) p.draw(petalsCtx);
    return alive;
  });
  
  petalAnimId = requestAnimationFrame(animatePetals);
}

function burstPetals(count, fromSword = false) {
  for (let i = 0; i < count; i++) {
    petals.push(new Petal(!fromSword, fromSword));
  }
}


// ============================================
// FIREFLIES
// ============================================

function createFireflies() {
  for (let i = 0; i < CONFIG.firefliesCount; i++) {
    const f = document.createElement('div');
    f.classList.add('firefly');
    f.style.left = rand(5, 95) + '%';
    f.style.top = rand(10, 90) + '%';
    f.style.animationDuration = rand(6, 15) + 's';
    f.style.animationDelay = rand(0, 8) + 's';
    
    for (let d = 1; d <= 5; d++) {
      f.style.setProperty(`--dx${d}`, rand(-60, 60) + 'px');
      f.style.setProperty(`--dy${d}`, rand(-50, 50) + 'px');
    }
    
    DOM.fireflies.appendChild(f);
  }
}


// ============================================
// LETTER (slides down from sword)
// ============================================

let letterOpened = false;

function openLetter() {
  if (letterOpened) return;
  letterOpened = true;
  
  // Fade the sword
  DOM.swordContainer.classList.add('opened');
  
  // Big burst of petals from sword
  burstPetals(25, true);
  
  // Open the letter panel (slides down)
  setTimeout(() => {
    DOM.letterPanel.classList.add('open');
    
    // Scroll to the letter
    setTimeout(() => {
      DOM.letterPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
    
    // Animate paragraphs appearing one by one
    const paragraphs = DOM.letterBody.querySelectorAll('p');
    paragraphs.forEach((p, i) => {
      setTimeout(() => {
        p.classList.add('visible');
      }, 1200 + (i * 350));
    });
  }, 400);
}


// ============================================
// NAVIGATION
// ============================================

function navigateTo(targetSection) {
  const currentSection = document.querySelector('.section.active');
  
  if (currentSection) {
    // Hide fixed background elements when leaving main section
    if (currentSection === DOM.mainSection) {
      DOM.sceneBackground.style.display = 'none';
      DOM.petalsCanvas.style.display = 'none';
      DOM.fireflies.style.display = 'none';
      document.querySelector('.sun-rays').style.display = 'none';
      if (petalAnimId) cancelAnimationFrame(petalAnimId);
    }
    
    currentSection.classList.add('page-transition-out');
    
    setTimeout(() => {
      currentSection.classList.remove('active', 'page-transition-out');
      targetSection.classList.add('active', 'page-transition-in');
      window.scrollTo(0, 0);
      
      if (targetSection === DOM.gallerySection) {
        initGallery();
      } else if (targetSection === DOM.specialSection) {
        initSpecialSection();
      } else if (targetSection === DOM.mainSection) {
        // Re-show background
        DOM.sceneBackground.style.display = 'block';
        DOM.petalsCanvas.style.display = 'block';
        DOM.fireflies.style.display = 'block';
        document.querySelector('.sun-rays').style.display = 'block';
        animatePetals();
      }
      
      setTimeout(() => targetSection.classList.remove('page-transition-in'), 800);
    }, 800);
  }
}

DOM.btnGoGallery.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo(DOM.gallerySection);
});

DOM.btnGoSpecial.addEventListener('click', () => navigateTo(DOM.specialSection));
DOM.btnBackTop.addEventListener('click', () => navigateTo(DOM.mainSection));


// ============================================
// GALLERY
// ============================================

let galleryInitialized = false;

function initGallery() {
  if (galleryInitialized) {
    reobserveGalleryItems();
    return;
  }
  galleryInitialized = true;
  
  renderPhotos(CONFIG.photos);
  createGalleryParticles();
}

function renderPhotos(photos) {
  if (photos.length === 0) {
    DOM.galleryPlaceholder.style.display = 'block';
    return;
  }
  
  DOM.galleryPlaceholder.style.display = 'none';
  
  photos.forEach((filename, index) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    
    const img = document.createElement('img');
    img.src = CONFIG.photoFolder + filename;
    img.alt = `Nuestro momento ${index + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    
    const number = document.createElement('span');
    number.classList.add('photo-number');
    number.textContent = `${index + 1} / ${photos.length}`;
    
    item.appendChild(img);
    item.appendChild(number);
    DOM.galleryContainer.appendChild(item);
  });
  
  observeGalleryItems();
}

function observeGalleryItems() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  
  document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));
}

function reobserveGalleryItems() {
  setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach(item => item.classList.add('visible'));
  }, 300);
}

function createGalleryParticles() {
  const container = document.getElementById('gallery-particles');
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = rand(2, 5);
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = rand(0, 100) + '%';
    p.style.animationDuration = rand(10, 20) + 's';
    p.style.animationDelay = rand(0, 8) + 's';
    container.appendChild(p);
  }
}


// ============================================
// SPECIAL SECTION
// ============================================

let specialInitialized = false;

function initSpecialSection() {
  if (specialInitialized) return;
  specialInitialized = true;
  
  createStars();
  
  DOM.btnSpotify.addEventListener('click', () => {
    DOM.spotifyContainer.classList.remove('hidden');
    DOM.spotifyContainer.classList.add('visible');
    
    setTimeout(() => {
      DOM.spotifyContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    
    const vinyl = document.getElementById('vinyl-disc');
    if (vinyl) vinyl.style.animationPlayState = 'running';
  });
}

function createStars() {
  for (let i = 0; i < CONFIG.starsCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = rand(0, 100) + '%';
    star.style.top = rand(0, 100) + '%';
    star.style.animationDuration = rand(2, 5) + 's';
    star.style.animationDelay = rand(0, 5) + 's';
    const size = rand(1, 3);
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    DOM.specialStars.appendChild(star);
  }
}


// ============================================
// KEYBOARD
// ============================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Nothing to close now since letter is inline
  }
});


// ============================================
// PERFORMANCE
// ============================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (petalAnimId) cancelAnimationFrame(petalAnimId);
  } else {
    if (DOM.mainSection.classList.contains('active')) {
      animatePetals();
    }
  }
});


// ============================================
// PRELOAD
// ============================================

function preloadImages() {
  const images = ['assets/sunset_background.png', 'assets/parchment_letter.png'];
  images.forEach(src => { const img = new Image(); img.src = src; });
  
  // Preload first few gallery photos
  CONFIG.photos.slice(0, 5).forEach(f => {
    const img = new Image();
    img.src = CONFIG.photoFolder + f;
  });
}


// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  initPasswordPage();
  setTimeout(() => DOM.passwordInput.focus(), 1500);
});
