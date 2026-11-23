/**
 * Jigar Gadhiya - Interactive Professional Journey & Executive Presentation
 * Interactive Logic, Particle Canvas & Dynamic Lens Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBackgroundCanvas();
  initDynamicRole();
  initLensSwitcher();
  initViewModeSwitcher();
  initSkillsFilter();
  initTerminalPalette();
  initCopyButtons();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('jg-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jg-theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  } else {
    icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

/* ==========================================================================
   2. Perspective Lens Switcher (Architecture vs Leadership)
   ========================================================================== */
function initLensSwitcher() {
  const lensButtons = document.querySelectorAll('.lens-btn');
  const techHighlights = document.querySelectorAll('.lens-highlight-tech');
  const leadHighlights = document.querySelectorAll('.lens-highlight-lead');
  const lensCards = document.querySelectorAll('.lens-card');

  function applyLens(lens) {
    lensButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lens === lens);
    });

    lensCards.forEach(card => {
      card.classList.toggle('active-lens', card.dataset.lens === lens);
    });

    if (lens === 'architecture') {
      techHighlights.forEach(el => {
        el.style.display = 'flex';
        el.style.opacity = '1';
      });
      leadHighlights.forEach(el => {
        el.style.display = 'none';
        el.style.opacity = '0';
      });
    } else {
      techHighlights.forEach(el => {
        el.style.display = 'none';
        el.style.opacity = '0';
      });
      leadHighlights.forEach(el => {
        el.style.display = 'flex';
        el.style.opacity = '1';
      });
    }
  }

  lensButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lens;
      applyLens(selected);
      showToast(`Switched perspective to: ${selected === 'architecture' ? 'Architecture & Deep Tech' : 'Leadership & Impact'}`);
    });
  });

  // Default to architecture lens
  applyLens('architecture');
}

/* ==========================================================================
   3. View Mode Switcher (Interactive Journey vs Executive ATS Resume)
   ========================================================================== */
function initViewModeSwitcher() {
  const toggleBtn = document.getElementById('view-mode-toggle');
  const journeySection = document.getElementById('journey-view-section');
  const resumeSection = document.getElementById('resume-view-section');

  if (!toggleBtn || !journeySection || !resumeSection) return;

  toggleBtn.addEventListener('click', () => {
    const isResumeMode = resumeSection.classList.contains('active-mode');

    if (isResumeMode) {
      resumeSection.classList.remove('active-mode');
      journeySection.classList.remove('hidden-mode');
      toggleBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Resume View`;
      showToast('Switched to Interactive Story Mode');
    } else {
      resumeSection.classList.add('active-mode');
      journeySection.classList.add('hidden-mode');
      toggleBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Journey Mode`;
      showToast('Switched to Executive Resume Mode');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   4. Dynamic Hero Roles Cycling
   ========================================================================== */
function initDynamicRole() {
  const el = document.getElementById('dynamic-role');
  if (!el) return;

  const roles = [
    'Full-Stack Architect',
    'Microservices Specialist',
    'Decentralized Data Engineer',
    'Cloud Systems Lead',
    'AI-Augmented Developer'
  ];

  let index = 0;
  setInterval(() => {
    index = (index + 1) % roles.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = roles[index];
      el.style.opacity = '1';
    }, 200);
  }, 2600);
}

/* ==========================================================================
   5. Interactive Skills Filter & Search
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('skills-search-input');
  const categoryCards = document.querySelectorAll('.skill-category-card');
  const chips = document.querySelectorAll('.skill-chip');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      categoryCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      chips.forEach(chip => {
        const text = chip.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          chip.style.opacity = '1';
          chip.style.transform = 'scale(1)';
        } else {
          chip.style.opacity = '0.2';
          chip.style.transform = 'scale(0.95)';
        }
      });
    });
  }
}

/* ==========================================================================
   6. Command Palette / Terminal Drawer (Cmd+K / Ctrl+K)
   ========================================================================== */
function initTerminalPalette() {
  const modal = document.getElementById('terminal-modal');
  const openBtn = document.getElementById('terminal-open-btn');
  const closeBtn = document.getElementById('terminal-close-btn');
  const input = document.getElementById('terminal-input');
  const commands = document.querySelectorAll('.terminal-command-item');

  function openTerminal() {
    if (!modal) return;
    modal.classList.add('open');
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  function closeTerminal() {
    if (!modal) return;
    modal.classList.remove('open');
  }

  if (openBtn) openBtn.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? closeTerminal() : openTerminal();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeTerminal();
    }
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTerminal();
    });
  }

  commands.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      executeCommand(action);
      closeTerminal();
    });
  });

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        if (val === 'resume' || val === 'download') executeCommand('download-resume');
        else if (val === 'journey') executeCommand('goto-journey');
        else if (val === 'skills') executeCommand('goto-skills');
        else if (val === 'contact' || val === 'email') executeCommand('copy-email');
        else if (val === 'github') executeCommand('goto-github');
        else if (val === 'linkedin') executeCommand('goto-linkedin');
        else showToast(`Command "${val}" not recognized. Type "help"`);
        closeTerminal();
      }
    });
  }
}

function executeCommand(action) {
  switch (action) {
    case 'download-resume':
      window.open('assets/Jigar_Gadhiya_Resume.pdf', '_blank');
      showToast('Opening Resume PDF...');
      break;
    case 'goto-journey':
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'goto-skills':
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'goto-cases':
      document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'copy-email':
      navigator.clipboard.writeText('jigar.gadhiya@gmail.com');
      showToast('Copied jigar.gadhiya@gmail.com to clipboard!');
      break;
    case 'goto-linkedin':
      window.open('https://www.linkedin.com/in/jigargadhiya/', '_blank');
      break;
    case 'goto-github':
      window.open('https://github.com/jigargadhiya', '_blank');
      break;
  }
}

/* ==========================================================================
   7. Copy to Clipboard & Toast
   ========================================================================== */
function initCopyButtons() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('jigar.gadhiya@gmail.com').then(() => {
        showToast('Email (jigar.gadhiya@gmail.com) copied to clipboard!');
      });
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   8. Navigation ScrollSpy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   9. Lightweight Background Mesh Canvas Animation
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 42;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const dotColor = isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(79, 70, 229, 0.25)';
    const lineColor = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(79, 70, 229, 0.06)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}
