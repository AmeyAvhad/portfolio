// Breadcrumb dynamic label
document.addEventListener("DOMContentLoaded", () => {
  const navLabel = document.querySelector(".nav-left");
  const navLinks = document.querySelectorAll(".nav-right a");
  const sections = document.querySelectorAll("section");

  function setLabel(id){
    navLabel.textContent = id === "home" ? "~/" : `~/${id.toLowerCase()}`;
  }

  window.addEventListener("scroll",()=>{
    let pos = window.scrollY + 160;
    sections.forEach(sec=>{
      if(pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight){
        setLabel(sec.id);
      }
    });
  });

  navLinks.forEach(a=>a.addEventListener("click",()=>{
    const id = a.getAttribute("href").replace("#","");
    setLabel(id);
  }));
});

// Expand / Hide Experience Details
document.addEventListener("click",e=>{
  if(e.target.classList.contains("more-btn")){
    const card = e.target.closest(".exp-card");
    card.querySelector(".details").style.display="block";
    e.target.style.display="none";
  }
  if(e.target.classList.contains("hide-btn")){
    const card = e.target.closest(".exp-card");
    card.querySelector(".details").style.display="none";
    card.querySelector(".more-btn").style.display="inline-block";
  }
});

// Fade-in Scroll Animation
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("fade-visible");
  });
},{threshold:0.2});

document.querySelectorAll(".fade-section").forEach(el=>observer.observe(el));
