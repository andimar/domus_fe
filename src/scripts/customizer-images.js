/* global wp */
(()=>{
 wp.customize.bind('ready',()=>wp.customize.control.each(control=>{
  if(control.params.type!=='domus-images')return;
  const root=control.container[0],list=root.querySelector('[data-domus-image-list]'),count=root.querySelector('[data-domus-image-count]');
  let revision=0;
  const ids=()=>Array.isArray(control.setting.get())?control.setting.get().map(Number).filter(n=>n>0):[];
  const render=()=>{
   const selected=ids(),current=++revision;list.replaceChildren();count.textContent=selected.length+' immagini selezionate';
   selected.forEach((id,index)=>{
    const row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:6px;margin:10px 0;flex-wrap:wrap';
    const img=document.createElement('img');img.width=64;img.height=48;img.alt='Immagine '+(index+1);img.style.objectFit='cover';row.append(img);
    const attachment=wp.media.attachment(id);
    const show=()=>{if(current!==revision)return;const sizes=attachment.get('sizes');img.src=sizes?.thumbnail?.url||attachment.get('url')||'';img.alt=attachment.get('alt')||attachment.get('title')||img.alt;};
    if(attachment.get('url'))show();else attachment.fetch().then(show,()=>{img.alt='Immagine non disponibile';});
    const button=(label,text,disabled,action)=>{const b=document.createElement('button');b.type='button';b.className='button button-small';b.textContent=text;b.setAttribute('aria-label',label+' immagine '+(index+1));b.disabled=disabled;b.addEventListener('click',action);row.append(b);};
    const move=delta=>{const updated=ids();[updated[index],updated[index+delta]]=[updated[index+delta],updated[index]];control.setting.set(updated);};
    button('Sposta prima','Prima',index===0,()=>move(-1));button('Sposta dopo','Dopo',index===selected.length-1,()=>move(1));
    button('Rimuovi','Rimuovi',false,()=>control.setting.set(ids().filter(value=>value!==id)));list.append(row);
   });
  };
  root.querySelector('[data-domus-image-select]').addEventListener('click',()=>{
   const frame=wp.media({title:control.params.label,library:{type:'image'},multiple:true,button:{text:'Usa queste immagini'}});
   frame.on('open',()=>{const selection=frame.state().get('selection');ids().forEach(id=>selection.add(wp.media.attachment(id)));});
   frame.on('select',()=>control.setting.set(frame.state().get('selection').map(item=>item.id)));frame.open();
  });
  root.querySelector('[data-domus-image-reset]').addEventListener('click',()=>control.setting.set([]));
  control.setting.bind(render);render();
 }));
})();
