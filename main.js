
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
 const carousel=document.querySelector("[data-carousel]");
 if(carousel){
   const track=carousel.querySelector(".carousel-track");
   const slides=[...carousel.querySelectorAll(".featured-slide")];
   const prev=carousel.querySelector(".carousel-prev"), next=carousel.querySelector(".carousel-next"), dots=carousel.querySelector(".carousel-dots");
   let current=0,startX=0;
   const render=()=>{track.style.transform=`translateX(-${current*100}%)`; [...dots.children].forEach((d,i)=>d.classList.toggle("active",i===current));};
   slides.forEach((_,i)=>{const d=document.createElement("button");d.className="carousel-dot";d.setAttribute("aria-label",`Go to slide ${i+1}`);d.addEventListener("click",()=>{current=i;render()});dots.appendChild(d)});
   prev.addEventListener("click",()=>{current=(current-1+slides.length)%slides.length;render()});
   next.addEventListener("click",()=>{current=(current+1)%slides.length;render()});
   carousel.addEventListener("touchstart",e=>startX=e.touches[0].clientX,{passive:true});
   carousel.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45){current=dx<0?(current+1)%slides.length:(current-1+slides.length)%slides.length;render()}});
   render();
 }

});
