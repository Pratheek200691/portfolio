
import { ScrollController } from './scrollController';
import { RobotAssistant } from './robotAssistant';
import { SpeechController } from './speechController';
import { AnimationController } from './animations';
import { ContactForm } from './contactForm';
import { SECTIONS, TECH_BADGES, SKILL_CATEGORIES, FEATURED_PROJECTS, OTHER_PROJECTS, LEARNING_TIMELINE } from './data/portfolioData';
import { SOCIAL_LINKS } from './data/config';



function initCustomCursor(): void {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  };
  animateRing();

  
  document.addEventListener('mouseover', e => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [data-cursor="pointer"], .skill-card, .project-card, .nav-item')) {
      ring.classList.add('cursor-ring--hover');
    }
  });
  document.addEventListener('mouseout', e => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [data-cursor="pointer"], .skill-card, .project-card, .nav-item')) {
      ring.classList.remove('cursor-ring--hover');
    }
  });
}



function initGears(): void {
  const container = document.getElementById('gears-container');
  if (!container) return;

  const gearConfigs = [
    { size: 280, x: -80, y: -60, speed: 18, dir: 1, opacity: 0.06, blur: 2, teeth: 12 },
    { size: 180, x: 15, y: 60, speed: 12, dir: -1, opacity: 0.09, blur: 1, teeth: 8 },
    { size: 120, x: 70, y: -20, speed: 8, dir: 1, opacity: 0.12, blur: 0, teeth: 6 },
    { size: 350, x: 60, y: 50, speed: 25, dir: -1, opacity: 0.04, blur: 4, teeth: 16 },
    { size: 90, x: 30, y: 70, speed: 6, dir: 1, opacity: 0.15, blur: 0, teeth: 5 },
    { size: 200, x: -5, y: 20, speed: 15, dir: 1, opacity: 0.07, blur: 3, teeth: 10 },
    { size: 140, x: 80, y: 80, speed: 10, dir: -1, opacity: 0.10, blur: 1, teeth: 7 },
    { size: 400, x: 45, y: -10, speed: 35, dir: 1, opacity: 0.03, blur: 6, teeth: 20 },
  ];

  gearConfigs.forEach((cfg, i) => {
    const gearEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    gearEl.setAttribute('viewBox', '0 0 100 100');
    gearEl.style.cssText = `
      position: absolute;
      width: ${cfg.size}px;
      height: ${cfg.size}px;
      left: ${cfg.x}%;
      top: ${cfg.y}%;
      opacity: ${cfg.opacity};
      filter: blur(${cfg.blur}px);
      animation: gear-rotate-${cfg.dir > 0 ? 'cw' : 'ccw'} ${cfg.speed}s linear infinite;
      transform-origin: center;
      pointer-events: none;
    `;

    const path = generateGearPath(cfg.teeth);
    gearEl.innerHTML = `<path d="${path}" fill="none" stroke="rgba(0,212,255,0.8)" stroke-width="1.5"/>`;
    container.appendChild(gearEl);
  });
}

function generateGearPath(teeth: number): string {
  const cx = 50, cy = 50;
  const outerR = 42, innerR = 30, rootR = 35, toothW = 0.7;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const angle1 = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const angle2 = ((i + toothW) / teeth) * Math.PI * 2 - Math.PI / 2;
    const angle3 = ((i + 0.5) / teeth) * Math.PI * 2 - Math.PI / 2;
    const midAngle = ((i + 0.5 * toothW) / teeth) * Math.PI * 2 - Math.PI / 2;

    if (i === 0) {
      d += `M ${cx + rootR * Math.cos(angle1)} ${cy + rootR * Math.sin(angle1)} `;
    }
    d += `L ${cx + outerR * Math.cos(angle1)} ${cy + outerR * Math.sin(angle1)} `;
    d += `L ${cx + outerR * Math.cos(angle2)} ${cy + outerR * Math.sin(angle2)} `;
    d += `L ${cx + rootR * Math.cos(angle2)} ${cy + rootR * Math.sin(angle2)} `;
    // Root arc
    const nextAngle1 = ((i + 1) / teeth) * Math.PI * 2 - Math.PI / 2;
    d += `A ${innerR} ${innerR} 0 0 1 ${cx + rootR * Math.cos(nextAngle1)} ${cy + rootR * Math.sin(nextAngle1)} `;
  }
  d += 'Z';
  
  d += ` M ${cx + 8} ${cy} A 8 8 0 1 0 ${cx - 8} ${cy} A 8 8 0 1 0 ${cx + 8} ${cy}`;
  return d;
}



function initParticles(): void {
  const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number; opacity: number;
  }

  const particles: Particle[] = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  };
  animate();
}



async function runBootSequence(): Promise<void> {
  const bootScreen = document.getElementById('boot-screen');
  const bootLines = document.getElementById('boot-lines');
  const enterBtn = document.getElementById('enter-btn');
  if (!bootScreen || !bootLines || !enterBtn) return;

  const animCtrl = new AnimationController();
  const lines = [
    'INITIALIZING SYSTEM...',
    '',
    'MECHANICAL CORE ........... OK',
    'ROBOT ASSISTANT ........... ONLINE',
    'PROJECT DATABASE .......... LOADED',
    'DEVELOPER PROFILE ......... LOADED',
    'SPEECH MODULE ............. READY',
    '',
    '▌ WELCOME, USER.',
    '',
    'PRATHEEK D JAIN'
  ];

  await animCtrl.bootSequence(lines, bootLines, 280);

  
  setTimeout(() => {
    enterBtn.style.opacity = '1';
    enterBtn.style.transform = 'translateY(0)';
  }, 400);
}



function updateNavigation(index: number): void {
  
  const navCounter = document.getElementById('nav-counter');
  const navTitle = document.getElementById('nav-title');
  const navProgress = document.getElementById('nav-progress-fill');

  if (navCounter) navCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(SECTIONS.length).padStart(2, '0')}`;
  if (navTitle) navTitle.textContent = SECTIONS[index]?.title ?? '';
  if (navProgress) {
    const pct = ((index) / (SECTIONS.length - 1)) * 100;
    navProgress.style.height = `${pct}%`;
  }

  // Update nav dots
  document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.classList.toggle('nav-dot--active', i === index);
  });

  
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');
  if (prevBtn) prevBtn.classList.toggle('btn-nav--disabled', index === 0);
  if (nextBtn) nextBtn.classList.toggle('btn-nav--disabled', index === SECTIONS.length - 1);
}



let currentWordSpans: HTMLElement[] = [];
let fallbackCleanup: (() => void) | null = null;

function setupWordReveal(speechController: SpeechController, animCtrl: AnimationController): void {
  speechController.setOnWordBoundary(event => {
    if (currentWordSpans.length > 0) {
      animCtrl.revealWord(currentWordSpans, event.wordIndex);
    }
  });
}



function getSectionEl(id: string): HTMLElement | null {
  return document.getElementById(`section-${id}`);
}

let currentSectionEl: HTMLElement | null = null;

function showSection(
  index: number,
  direction: 'forward' | 'backward',
  animCtrl: AnimationController,
  speechController: SpeechController,
  robotAssistant: RobotAssistant
): void {
  const section = SECTIONS[index];
  if (!section) return;

  const nextEl = getSectionEl(section.id);
  if (!nextEl) return;

  const prevEl = currentSectionEl;
  currentSectionEl = nextEl;

  
  speechController.stop();
  if (fallbackCleanup) { fallbackCleanup(); fallbackCleanup = null; }

  
  const speechContainer = nextEl.querySelector('.speech-text-container') as HTMLElement;
  const textToSpeak = section.speechText;

  if (speechContainer) {
    const words = textToSpeak.trim().split(/\s+/);
    currentWordSpans = animCtrl.animateWords(speechContainer, words);
  }

  
  animCtrl.transition(prevEl, nextEl, direction, () => {
    
    const staggerEls = Array.from(nextEl.querySelectorAll('[data-stagger]')) as HTMLElement[];
    animCtrl.staggerIn(staggerEls, 60);

    
    setTimeout(() => {
      robotAssistant.onSpeakStart();

      
      const supportsBoundary = 'onboundary' in SpeechSynthesisUtterance.prototype;
      speechController.speak(textToSpeak);

      if (!supportsBoundary && speechContainer) {
        fallbackCleanup = speechController.startTimedWordReveal(textToSpeak, 160);
      }
    }, 300);
  });

  updateNavigation(index);
}



async function init(): Promise<void> {
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  
  initCustomCursor();
  initParticles();

  if (!prefersReducedMotion) {
    initGears();
  }

  
  await runBootSequence();

  
  await new Promise<void>(resolve => {
    const enterBtn = document.getElementById('enter-btn');
    enterBtn?.addEventListener('click', () => resolve(), { once: true });
  });

  
  const bootScreen = document.getElementById('boot-screen');
  const mainApp = document.getElementById('main-app');
  if (bootScreen) {
    bootScreen.style.opacity = '0';
    bootScreen.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
      bootScreen.style.display = 'none';
    }, 800);
  }
  if (mainApp) {
    mainApp.style.display = 'flex';
    setTimeout(() => { mainApp.style.opacity = '1'; }, 50);
  }

  
  const animCtrl = new AnimationController();
  const speechController = new SpeechController();
  const robotAssistant = new RobotAssistant('#robot-container');

  
  setupWordReveal(speechController, animCtrl);

  
  speechController.setOnStateChange(speaking => {
    if (speaking) {
      robotAssistant.onSpeakStart();
    } else {
      robotAssistant.onSpeakEnd();
    }
  });

  
  SECTIONS.forEach((section, i) => {
    const el = getSectionEl(section.id);
    if (!el) return;
    if (i === 0) {
      el.style.display = 'flex';
      el.style.opacity = '1';
      currentSectionEl = el;
    } else {
      el.style.display = 'none';
      el.style.opacity = '0';
    }
  });

  
  const scrollCtrl = new ScrollController({
    totalSections: SECTIONS.length,
    debounceMs: 900,
    onSectionChange: (index, direction) => {
      showSection(index, direction, animCtrl, speechController, robotAssistant);
    },
  });

  
  document.getElementById('nav-prev')?.addEventListener('click', () => scrollCtrl.navigate('backward'));
  document.getElementById('nav-next')?.addEventListener('click', () => scrollCtrl.navigate('forward'));

  
  document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => scrollCtrl.goToSection(i));
  });

  
  // Language toggle removed

  
  const voiceToggle = document.getElementById('voice-toggle');
  if (voiceToggle) {
    voiceToggle.addEventListener('click', () => {
      const enabled = speechController.toggle();
      voiceToggle.classList.toggle('voice-toggle--off', !enabled);
      voiceToggle.setAttribute('aria-label', enabled ? 'Voice ON' : 'Voice OFF');
      const icon = voiceToggle.querySelector('.voice-icon');
      if (icon) icon.textContent = enabled ? '🔊' : '🔇';
      const label = voiceToggle.querySelector('.voice-label');
      if (label) label.textContent = enabled ? 'Voice ON' : 'Voice OFF';
    });
  }

  
  document.getElementById('replay-btn')?.addEventListener('click', () => {
    speechController.replay();
  });

  
  try {
    new ContactForm('#contact-form');
  } catch (e) {
    console.warn('Contact form init failed:', e);
  }

  
  updateNavigation(0);
  robotAssistant.greet();

  
  setTimeout(() => {
    const firstSection = SECTIONS[0];
    if (firstSection) {
      const textToSpeak = firstSection.speechText;
      const speechContainer = document.querySelector(`#section-${firstSection.id} .speech-text-container`) as HTMLElement;
      if (speechContainer) {
        const words = textToSpeak.trim().split(/\s+/);
        currentWordSpans = animCtrl.animateWords(speechContainer, words);
      }
      speechController.speak(textToSpeak);
    }
  }, 1200);

  
  const githubLinks = document.querySelectorAll('[data-social="github"]');
  const linkedinLinks = document.querySelectorAll('[data-social="linkedin"]');
  githubLinks.forEach(el => el.setAttribute('href', SOCIAL_LINKS.GITHUB));
  linkedinLinks.forEach(el => el.setAttribute('href', SOCIAL_LINKS.LINKEDIN));
}


document.addEventListener('DOMContentLoaded', init);
