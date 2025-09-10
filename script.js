// --- Data (small sample projects) ---
const projects = [
  {id:1,title:'Nebula Branding',type:'branding',desc:'A dreamy brand identity with nebula-inspired color system and motion.'},
  {id:2,title:'Orbit Shop',type:'web',desc:'An e-commerce demo with playful micro-interactions and smooth cart UX.'},
  {id:3,title:'Lumen Mobile',type:'mobile',desc:'A minimal health tracker prototype focusing on on-boarding and microcopy.'},
  {id:4,title:'Stellar 3D Scene',type:'3d',desc:'Lightweight 3D visual made with simple WebGL scaffolding (demo).'},
  {id:5,title:'Comet Landing',type:'web',desc:'Landing page experiments with gradients and animated SVG hero.'},
  {id:6,title:'Photon App',type:'mobile',desc:'Photo-editing micro-interactions and gesture-driven UI.'}
];

// --- Render grid ---
const grid = document.getElementById('grid');
function renderProjects(list){
  grid.innerHTML = '';
  list.forEach(p=>{
    const el = document.createElement('article');
    el.className='proj';
    el.setAttribute('tabindex','0');
    el.setAttribute('role','button');
    el.innerHTML = `<div class="tag">${p.type}</div><h3>${p.title}</h3><p>${p.desc}</p>`;
    el.addEventListener('click',()=>openModal(p));
    el.addEventListener('keydown',(e)=>{ if(e.key==='Enter') openModal(p); });
    grid.appendChild(el);
  });
}
renderProjects(projects);

// --- Filtering ---
document.querySelectorAll('.pill').forEach(p=>p.addEventListener('click',e=>{
  document.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));
  p.classList.add('active');
  const f = p.dataset.filter;
  if(f==='*') renderProjects(projects);
  else renderProjects(projects.filter(x=>x.type===f));
}));

// --- Modal with focus trap ---
const modalBack = document.getElementById('modalBack');
const closeModalBtn = document.getElementById('closeModal');
function openModal(project){
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDesc').textContent = project.desc;
  document.getElementById('modalContent').innerHTML = `<p class="muted">Example details about the project, techniques used, and a small gallery placeholder.</p>`;
  modalBack.style.display='flex';
  modalBack.setAttribute('aria-hidden','false');
  closeModalBtn.focus();
}
function closeModal(){
  modalBack.style.display='none';
  modalBack.setAttribute('aria-hidden','true');
}
closeModalBtn.addEventListener('click',closeModal);
modalBack.addEventListener('click',(e)=>{ if(e.target===modalBack) closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

// --- Theme toggle persisted ---
const themeToggle = document.getElementById('themeToggle');
const prefers = localStorage.getItem('stellar-theme') || 'dark';
if(prefers==='light') document.documentElement.style.setProperty('--bg','#fbfbff'), document.documentElement.style.setProperty('--card','#ffffff12');
themeToggle.addEventListener('click',toggle);
themeToggle.addEventListener('keydown',(e)=>{ if(e.key==='Enter') toggle(); });
function toggle(){
  const isLight = document.documentElement.style.getPropertyValue('--bg').includes('#fb');
  if(isLight){
    document.documentElement.style.setProperty('--bg','#0f1724');
    document.documentElement.style.setProperty('--card','#0b1220');
    themeToggle.innerHTML = '🌙 <span class="small">Dark</span>';
    themeToggle.setAttribute('aria-pressed','false');
    localStorage.setItem('stellar-theme','dark');
  } else {
    document.documentElement.style.setProperty('--bg','#fbfbff');
    document.documentElement.style.setProperty('--card','#ffffff');
    themeToggle.innerHTML = '☀️ <span class="small">Light</span>';
    themeToggle.setAttribute('aria-pressed','true');
    localStorage.setItem('stellar-theme','light');
  }
}
if(prefers==='light') themeToggle.innerHTML = '☀️ <span class="small">Light</span>', themeToggle.setAttribute('aria-pressed','true');

// --- Quick Tour ---
const openIntro = document.getElementById('openIntro');
openIntro.addEventListener('click',async ()=>{
  const webPill = Array.from(document.querySelectorAll('.pill')).find(x=>x.dataset.filter==='web');
  webPill.classList.add('active');
  document.querySelectorAll('.pill').forEach(x=>{ if(x!==webPill) x.classList.remove('active') });
  renderProjects(projects.filter(p=>p.type==='web'));
  await new Promise(r=>setTimeout(r,350));
  const first = grid.querySelector('.proj');
  first.animate([{transform:'scale(1)'},{transform:'scale(1.02)'},{transform:'scale(1)'}],{duration:700,iterations:1});
  setTimeout(()=>first.focus(),800);
});

// --- Hire / Contact flow ---
document.getElementById('hireBtn').addEventListener('click',()=>{
  document.getElementById('name').value='Interested Client';
  document.getElementById('message').value='Hi Rakshit — I liked your work and would like to discuss a project.';
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
  document.getElementById('email').focus();
});

// --- Contact form validation ---
const name = "Rakshit";  
const number = 100;  
const myArray = [1, 2, 3];  
const myObject = { key: "value" };  

