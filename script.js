/* ------------- site data (edit this) ------------- */
const siteData = {
    name: "Lehi Smart",
    email: "lehi@example.com",
    github: "https://github.com/LehiSmart",
    linkedin: "https://www.linkedin.com/in/lehi-smart-a98665207/",
    resume: "resume.pdf",
    projects: [
      {
        id: "cardgame",
        title: "Team Card Game (Multiplayer prototype)",
        short: "A balanced card game built with a small team — I contributed core gameplay logic, UI hooks, and playtesting fixes.",
        description: "Worked as part of a 4-person team to design and implement a card game prototype. I implemented the gameplay engine, turn system, and UI integration with the game state. Responsibilities included test-driven development for core mechanics and building tools for balancing cards.",
        stack: ["JavaScript", "Node.js", "HTML5 Canvas", "Socket.IO"],
        image: "assets/project1.png",
        repo: "https://github.com/LehiSmart/cardgame",
        demo: ""
      }
      // add more project objects here
    ]
    
  };
  
  /* ------------- DOM helpers ------------- */
  function $id(id){ return document.getElementById(id); }
  function el(tag, attrs = {}, children = []){
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k,v]) => {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else e.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (!c) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }
  
  /* ------------- Render projects ------------- */
  function renderProjects(){
    const grid = $id('projects-grid');
    grid.innerHTML = '';
    siteData.projects.forEach(proj => {
      const card = el('article', { class: 'card' });
      const title = el('h3', {}, proj.title);
      const desc = el('p', { class: 'muted small' }, proj.short);
      const stack = el('div', { class: 'muted tiny' }, 'Stack: ' + (proj.stack || []).join(', '));
      const actions = el('div', { style: 'margin-top:8px; display:flex; gap:8px' });
  
      const detailsBtn = el('button', { class: 'btn ghost' }, 'Details');
      detailsBtn.addEventListener('click', () => openModal(proj));
  
      actions.appendChild(detailsBtn);
  
      if (proj.repo) {
        const repoLink = el('a', { class: 'btn ghost', href: proj.repo, target: '_blank', rel: 'noopener' }, 'Repository');
        actions.appendChild(repoLink);
      }
      if (proj.demo) {
        const demoLink = el('a', { class: 'btn primary', href: proj.demo, target: '_blank', rel: 'noopener' }, 'Live demo');
        actions.appendChild(demoLink);
      }
  
      card.append(title, desc, stack, actions);
      grid.appendChild(card);
    });
  }
  
  /* ------------- Modal ------------- */
  function openModal(proj){
    const modal = $id('modal');
    const content = $id('modal-content');
    content.innerHTML = '';
    const title = el('h2', {}, proj.title);
    const p = el('p', { class: 'muted' }, proj.description);
    const stack = el('div', { class: 'muted small' }, 'Stack: ' + (proj.stack || []).join(', '));
    content.append(title, p, stack);
  
    if (proj.image) {
      const img = el('img', { src: proj.image, style: 'width:100%; margin-top:12px; border-radius:8px;' });
      content.appendChild(img);
    }
  
    const actions = el('div', { style: 'margin-top:12px; display:flex; gap:8px;' });
    if (proj.repo) actions.appendChild(el('a', { class: 'btn ghost', href: proj.repo, target:'_blank', rel:'noopener' }, 'Repository'));
    if (proj.demo) actions.appendChild(el('a', { class: 'btn primary', href: proj.demo, target:'_blank', rel:'noopener' }, 'Live demo'));
    content.appendChild(actions);
  
    modal.classList.remove('hidden');
    // focus trap simple
    $id('modal-close').focus();
  }
  
  function closeModal(){
    $id('modal').classList.add('hidden');
  }
  
  $id('modal-backdrop').addEventListener('click', closeModal);
  $id('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  
  /* ------------- contact form (mailto fallback) ------------- */
  function submitForm(e){
    e.preventDefault();
    const name = $id('name').value.trim();
    const email = $id('email').value.trim();
    const message = $id('message').value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
    return false;
  }
  
  function prefillEmail(){
    const name = $id('name').value.trim();
    const email = $id('email').value.trim();
    const message = $id('message').value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
  }
  
  /* ------------- nav toggle & smooth scroll ------------- */
  document.addEventListener('DOMContentLoaded', () => {
    // populate simple header info
    $id('year').textContent = new Date().getFullYear();
    $id('email-text').textContent = siteData.email;
    $id('contact-email').href = `mailto:${siteData.email}`;
    $id('contact-linkedin').href = siteData.linkedin;
    $id('contact-github').href = siteData.github;
    $id('footer-github').href = siteData.github;
    $id('footer-linkedin').href = siteData.linkedin;
    $id('github-cta').href = siteData.github;
    $id('resume-link').href = siteData.resume;
    $id('resume-link-mobile').href = siteData.resume;
  
    renderProjects();
  
    // hamburger toggle
    const ham = $id('hamburger');
    ham.addEventListener('click', () => {
      const menu = $id('mobile-menu');
      const isHidden = menu.classList.toggle('hidden');
      ham.setAttribute('aria-expanded', (!isHidden).toString());
    });
  
    // smooth scroll for same-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (ev) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          ev.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
  