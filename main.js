
document.addEventListener("DOMContentLoaded",()=>{
 const burger=document.querySelector(".burger"), nav=document.querySelector(".nav");
 if(burger&&nav) burger.addEventListener("click",()=>nav.classList.toggle("open"));
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
 const selects=[...document.querySelectorAll("[data-filter]")], cards=[...document.querySelectorAll(".game-card")];
 if(selects.length&&cards.length) selects.forEach(s=>s.addEventListener("change",()=>{
   const values=Object.fromEntries(selects.map(x=>[x.dataset.filter,x.value]));
   cards.forEach(card=>{const ok=Object.entries(values).every(([k,v])=>v==="all"||card.dataset[k]===v);card.style.display=ok?"block":"none"});
 }));
 const form=document.querySelector(".contact-form");
 if(form) form.addEventListener("submit",e=>{e.preventDefault();alert("Thanks for your message! Connect this form to a backend or form service before publishing.");form.reset();});
});
