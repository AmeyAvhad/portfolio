// mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mobileNav");
  btn.addEventListener("click",()=>nav.classList.toggle("show"));
  document.querySelectorAll(".mobile-nav a").forEach(a=>{
    a.addEventListener("click",()=>nav.classList.remove("show"));
  });
});

// breadcrumb ~/
document.addEventListener("DOMContentLoaded",()=>{
  const navLabel=document.querySelector(".nav-left");
  const secs=document.querySelectorAll("section");
  const links=document.querySelectorAll(".desktop-nav a,.mobile-nav a");
  function setLabel(id){
    navLabel.textContent=id==="home"?"~/":`~/${id.toLowerCase()}`;
  }
  window.addEventListener("scroll",()=>{
    let y=window.scrollY+130;
    secs.forEach(s=>{
      if(y>=s.offsetTop && y<s.offsetTop+s.offsetHeight){
        setLabel(s.id);
      }
    });
  });
  links.forEach(a=>a.addEventListener("click",()=>setLabel(a.getAttribute("href").replace("#",""))));
});

// expand cards
document.addEventListener("click",e=>{
  if(e.target.classList.contains("more-btn")){
    const card=e.target.closest(".exp-card");
    card.querySelector(".details").style.display="block";
    e.target.style.display="none";
  }
  if(e.target.classList.contains("hide-btn")){
    const card=e.target.closest(".exp-card");
    card.querySelector(".details").style.display="none";
    card.querySelector(".more-btn").style.display="inline-block";
  }
});

// fade in on scroll
const obs=new IntersectionObserver(es=>{
  es.forEach(x=>{
    if(x.isIntersecting)x.target.classList.add("fade-visible");
  });
},{threshold:0.2});
document.querySelectorAll(".fade-section").forEach(el=>obs.observe(el));

// hero load fade
document.addEventListener("DOMContentLoaded",()=>{
  const hero=document.querySelector(".hero-container");
  if(hero) setTimeout(()=>hero.classList.add("fade-visible"),120);
});
