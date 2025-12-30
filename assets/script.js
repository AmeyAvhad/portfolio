/* ===== Fade Animation ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("fade-visible");
  });
});
document.querySelectorAll(".fade-section").forEach(el => observer.observe(el));

/* ===== Experience Toggle ===== */
document.querySelectorAll(".exp-card").forEach(card => {
  const toggle = card.querySelector(".details-toggle");
  const details = card.querySelector(".details");
  toggle.addEventListener("click", () => {
    const isOpen = details.style.display === "block";
    details.style.display = isOpen ? "none" : "block";
    toggle.textContent = isOpen ? "More Details ▾" : "Hide ▲";
    card.classList.toggle("open", !isOpen);
  });
});

/* ===== Hamburger ===== */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => navMenu.classList.toggle("show"));
document.querySelectorAll("#nav-menu a").forEach(link =>
  link.addEventListener("click", () => navMenu.classList.remove("show"))
);

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

let savedTheme = localStorage.getItem("theme") || "dark";
if(savedTheme === "light"){
  root.classList.add("light");
  themeIcon.classList.replace("fa-sun", "fa-moon");
}

themeToggle.addEventListener("click", () => {
  const on = root.classList.toggle("light");
  themeIcon.classList.replace(on ? "fa-sun" : "fa-moon", on ? "fa-moon" : "fa-sun");
  localStorage.setItem("theme", on ? "light" : "dark");
});

/* ===== Floating Particles ===== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
for (let i = 0; i < 60; i++){
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent');
  particles.forEach(p=>{
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    p.x+=p.dx;p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();
onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

/* ===== Dynamic ~/section indicator ===== */
const navLeft = document.querySelector(".nav-left");
const sections = document.querySelectorAll("section[id]");

function updateSectionIndicator(){
  let current="";
  sections.forEach(sec=>{
    const rect=sec.getBoundingClientRect();
    if(rect.top<=innerHeight*.3 && rect.bottom>=innerHeight*.3){
      current=sec.id;
    }
  });
  navLeft.textContent = (!current || current==="home") ? "~/" : `~/${current}`;
}
addEventListener("scroll",updateSectionIndicator);
updateSectionIndicator();

/* ===== Accent Color Selector ===== */
const accentBtn = document.getElementById("accent-toggle");
const accentMenu = document.getElementById("accent-menu");
const accentDots = document.getElementById("accent-dots");
const accentName = document.getElementById("accent-name");

function setAccent(name, hex){
  document.documentElement.style.setProperty("--accent", hex);
  accentName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  localStorage.setItem("accent", JSON.stringify({name,hex}));
}

let savedAccent = localStorage.getItem("accent");
if(savedAccent){
  const {name,hex} = JSON.parse(savedAccent);
  setAccent(name,hex);
}

/* Desktop option click */
document.querySelectorAll(".accent-option").forEach(opt=>{
  opt.addEventListener("click",()=>{
    setAccent(opt.dataset.color,opt.dataset.hex);
    accentMenu.classList.remove("active");
  });
});

/* Mobile dots */
document.querySelectorAll(".dot").forEach(dot=>{
  dot.style.background = dot.dataset.hex;
  dot.addEventListener("click",()=>{
    setAccent(dot.dataset.color,dot.dataset.hex);
    document.querySelectorAll(".dot").forEach(d=>d.classList.remove("selected"));
    dot.classList.add("selected");
  });
});

/* Open dropdown (desktop) */
accentBtn.addEventListener("click",()=>accentMenu.classList.toggle("active"));
