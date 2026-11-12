(()=>{
 const noticeStorage='domus-wp-read-notices-v1';let dismissed=[];
 try{const saved=JSON.parse(localStorage.getItem(noticeStorage)||'[]');if(Array.isArray(saved))dismissed=saved.filter(v=>typeof v==='string');}catch{}
 const banners=[...document.querySelectorAll('[data-notice-banner]')];
 const noticeCopies=[...document.querySelectorAll('[data-notice-copy]')];
 const refreshNotices=()=>{
  let shown=false;for(const banner of banners){banner.hidden=shown||dismissed.includes(banner.dataset.noticeBanner);if(!banner.hidden)shown=true;}
  noticeCopies.forEach(copy=>{copy.hidden=dismissed.includes(copy.dataset.noticeCopy);copy.classList.remove('is-last-notice');});
  document.querySelectorAll('[data-sidebar-notices]').forEach(section=>{section.hidden=[...section.querySelectorAll('[data-notice-copy]')].every(copy=>copy.hidden);});
  document.querySelectorAll('.hours-column').forEach(column=>{const visible=[...column.querySelectorAll('[data-notice-copy]')].filter(copy=>!copy.hidden);column.classList.toggle('has-notices',visible.length>0);visible.at(-1)?.classList.add('is-last-notice');});
 };
 const dismissNotice=key=>{if(!dismissed.includes(key))dismissed.push(key);dismissed=dismissed.slice(-200);try{localStorage.setItem(noticeStorage,JSON.stringify(dismissed));}catch{}refreshNotices();const status=document.querySelector('[data-notice-status]');if(status)status.textContent='Avviso chiuso. Resta disponibile nella campanella durante il periodo di validità.';};
 let noticeReturnFocus=null;
 const closeNotice=dialog=>{dialog.close();document.body.classList.remove('has-dialog');if(noticeReturnFocus?.isConnected&&!noticeReturnFocus.closest('[hidden]'))noticeReturnFocus.focus({preventScroll:true});else document.querySelector('.notification-trigger')?.focus({preventScroll:true});};
 document.querySelectorAll('[data-notice-dialog]').forEach(trigger=>trigger.addEventListener('click',event=>{
  const dialog=document.getElementById(trigger.dataset.noticeDialog);if(!dialog||typeof dialog.showModal!=='function')return;
  event.preventDefault();const previous=document.querySelector('dialog[open]');if(previous)previous.close();
  if(!trigger.closest('dialog'))noticeReturnFocus=trigger;
  dialog.showModal();document.body.classList.add('has-dialog');dialog.querySelector('[data-close-dialog]')?.focus();
 }));
 document.querySelectorAll('dialog.notification-panel,dialog.notice-modal').forEach(dialog=>{
  dialog.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>closeNotice(dialog)));
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeNotice(dialog);});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeNotice(dialog);});
  dialog.querySelector('[data-read-notice]')?.addEventListener('click',event=>{dismissNotice(event.currentTarget.dataset.readNotice);closeNotice(dialog);});
 });
 document.querySelectorAll('[data-dismiss-notice]').forEach(button=>button.addEventListener('click',()=>{dismissNotice(button.dataset.dismissNotice);document.querySelector('.notification-trigger')?.focus({preventScroll:true});}));
 window.addEventListener('storage',event=>{if(event.key===noticeStorage){try{const value=JSON.parse(event.newValue||'[]');if(Array.isArray(value)){dismissed=value;refreshNotices();}}catch{}}});
 refreshNotices();
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-navigation');
 if(menu&&nav){
  const updateMenuSpace=()=>{const bottom=document.querySelector('.site-header').getBoundingClientRect().bottom;nav.style.setProperty('--mobile-menu-space',Math.max(44,window.innerHeight-bottom-16)+'px');};
  const setMenu=open=>{menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Chiudi il menu':'Apri il menu');nav.classList.toggle('is-open',open);if(open)updateMenuSpace();};
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
  document.addEventListener('click',e=>{if(menu.getAttribute('aria-expanded')==='true'&&!e.target.closest('.site-header'))setMenu(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus();}});
  window.addEventListener('resize',updateMenuSpace);window.addEventListener('scroll',()=>{if(menu.getAttribute('aria-expanded')==='true')updateMenuSpace();},{passive:true});
 }
 const mobileDisclosure=window.matchMedia('(max-width:700px)');
 const updateDisclosure=()=>document.querySelectorAll('[data-mobile-disclosure]').forEach(details=>{details.open=!mobileDisclosure.matches;});
 updateDisclosure();mobileDisclosure.addEventListener('change',updateDisclosure);
 const cards=[...document.querySelectorAll('#pacchetti .package-card')],filters=[...document.querySelectorAll('.filter-button')],more=document.querySelector('[data-show-packages]'),counter=document.querySelector('[data-package-counter]');let group='all',expanded=false;
 function render(){const matching=cards.filter(c=>group==='all'||(c.dataset.group||'').split(' ').includes(group));cards.forEach(c=>c.hidden=true);matching.forEach((c,i)=>c.hidden=!expanded&&i>=3);if(more){const remaining=Math.max(0,matching.length-3);more.hidden=expanded||remaining===0;more.textContent=remaining===1?'Mostra 1 altro pacchetto':'Mostra gli altri '+remaining+' pacchetti';}if(counter){counter.setAttribute('aria-live','polite');counter.textContent=(expanded?matching.length:Math.min(3,matching.length))+' di '+matching.length+' pacchetti';}}
 filters.forEach(button=>button.addEventListener('click',()=>{group=button.dataset.filter||'all';expanded=false;filters.forEach(b=>{b.setAttribute('aria-pressed',String(b===button));b.classList.toggle('is-active',b===button);});render();}));more?.addEventListener('click',()=>{expanded=true;render();});if(cards.length)render();
 document.querySelectorAll('input[name="route-mode"]').forEach(input=>input.addEventListener('change',()=>{const button=document.querySelector('.route-button');if(button){const url=new URL(button.href);url.searchParams.set('travelmode',input.value);button.href=url.href;button.setAttribute('aria-label','Apri Google Maps: '+({transit:'mezzi pubblici',driving:'auto',walking:'a piedi'}[input.value]));}}));
 const data=document.querySelector('#domus-photo-data');if(data){try{const config=JSON.parse(data.textContent);let index=0;if(config.rotate){try{const stored=localStorage.getItem('domus-wp-photo-cycle');index=stored===null?0:(Number(stored)+1)%1000000;if(!Number.isInteger(index)||index<0)index=0;localStorage.setItem('domus-wp-photo-cycle',String(index));}catch{}}for(const img of document.querySelectorAll('[data-domus-photo]')){const pool=config.pools[img.dataset.domusPhoto]||[];if(pool.length){const photo=pool[index%pool.length];img.src=photo.url;img.alt=photo.alt||'';}}}catch{}}
})();
