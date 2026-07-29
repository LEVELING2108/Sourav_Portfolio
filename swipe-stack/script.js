(() => {
  const root = document.querySelector('.scd-20');
  const deck = root.querySelector('#scd-20-deck');
  const live = root.querySelector('#scd-20-live');
  const total = deck.children.length;
  const THRESHOLD = 80;
  const paint = () => { [...deck.children].forEach((c,i) => c.style.setProperty('--d', i)); const t=deck.firstElementChild.querySelector('span'); live.textContent=(t?t.textContent:'')+''; bind(deck.firstElementChild); };
  function sendBack(card){ card.classList.add('scd-20__fly'); card.addEventListener('transitionend',()=>{ card.classList.remove('scd-20__fly'); card.style.transform=''; deck.appendChild(card); paint(); },{once:true}); }
  function bringFront(){ const last=deck.lastElementChild; deck.insertBefore(last, deck.firstElementChild); paint(); }
  function bind(card){
    if(card.dataset.b) return; card.dataset.b='1';
    let sx=0,dy=0,dx=0,drag=false;
    card.addEventListener('pointerdown',e=>{ if(card!==deck.firstElementChild) return; drag=true; sx=e.clientX; card.setPointerCapture(e.pointerId); card.classList.add('scd-20__drag'); });
    card.addEventListener('pointermove',e=>{ if(!drag) return; dx=e.clientX-sx; card.style.transform='translate3d('+dx+'px,0,0) rotate('+(dx/22)+'deg)'; });
    card.addEventListener('pointerup',()=>{ if(!drag) return; drag=false; card.classList.remove('scd-20__drag'); if(Math.abs(dx)>THRESHOLD){ card.style.transform='translate3d('+(dx>0?1:-1)*140+'%,0,0) rotate('+(dx>0?18:-18)+'deg)'; sendBack(card);} else card.style.transform=''; dx=0; });
  }
  root.querySelector('#scd-20-next').addEventListener('click',()=>{ const c=deck.firstElementChild; c.style.transform='translate3d(-140%,0,0) rotate(-16deg)'; sendBack(c); });
  root.querySelector('#scd-20-prev').addEventListener('click',bringFront);
  deck.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft'){const c=deck.firstElementChild;c.style.transform='translate3d(-140%,0,0)';sendBack(c);} if(e.key==='ArrowRight')bringFront(); });
  deck.firstElementChild.setAttribute('tabindex','0');
  paint();
})();