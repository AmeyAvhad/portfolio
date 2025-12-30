// ==== MOBILE NAV ====
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  hamburger.addEventListener("click",()=>{
    mobileNav.classList.toggle("show");
  });

  document.querySelectorAll(".mobile-nav a").forEach(link=>{
    link.addEventListener("click",()=>{
      mobileNav.classList.remove("show");
    });
  });
});


// ==== BREADCRUMB ~/ ====
document.addEventListener("DOMContentLoaded",()=>{
  const navLabel=document.querySelector(".nav-left");
  const sections=document.querySelectorAll("section");
  const links=document.querySelectorAll(".desktop-nav a, .mobile-nav a");

  function setLabel(id){
    navLabel.textContent = id==="home" ? "~/" : `~/${id.toLowerCase()}`;
  }

  window.addEventListener("scroll",()=>{
    let y=window.scrollY+140;
    sections.forEach(sec=>{
      if(y>=sec.offsetTop && y<sec.offsetTop+sec.offsetHeight){
        setLabel(sec.id);
      }
    });
  });

  links.forEach(a=>a.addEventListener("click",()=>{
    setLabel(a.getAttribute("href").replace("#",""));
  }));
});


// ==== EXPERIENCE TOGGLE ====
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


// ==== FADE-IN ON SCROLL ====
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("fade-visible");
  });
},{threshold:0.2});
document.querySelectorAll(".fade-section").forEach(el=>observer.observe(el));


// ==== HERO ON-LOAD FADE ====
document.addEventListener("DOMContentLoaded",()=>{
  const hero=document.querySelector(".hero-container");
  if(hero) setTimeout(()=>hero.classList.add("fade-visible"),150);
});
