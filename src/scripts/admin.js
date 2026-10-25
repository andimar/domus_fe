(()=>{
 document.addEventListener('click',event=>{
  if(event.target.closest('[data-domus-copy-preset]')){const data=JSON.parse(document.getElementById('domus-copy-data').textContent),preset=data[document.getElementById('domus-copy-preset').value];if(preset)Object.entries(preset.fields).forEach(([key,value])=>{const input=document.getElementById('setting-'+key);if(input)input.value=value;});return;}
  const suggest=event.target.closest('[data-domus-suggest]');if(suggest){document.getElementById(suggest.dataset.domusSuggest).value=suggest.dataset.suggestion;return;}
  const clear=event.target.closest('[data-domus-clear]');if(clear){document.getElementById(clear.dataset.domusClear).value='';document.getElementById(clear.dataset.domusClear+'-count').textContent='0 selezionate';return;}
  const picker=event.target.closest('[data-domus-media]');if(picker){const input=document.getElementById(picker.dataset.domusMedia),frame=wp.media({title:'Immagini della sezione',library:{type:'image'},multiple:true});frame.on('open',()=>{input.value.split(',').filter(Boolean).forEach(id=>frame.state().get('selection').add(wp.media.attachment(id)));});frame.on('select',()=>{const items=frame.state().get('selection').toJSON();input.value=items.map(i=>i.id).join(',');document.getElementById(input.id+'-count').textContent=items.length+' selezionate';});frame.open();return;}
  const list=document.querySelector('[data-domus-faq-list]');if(!list)return;
  if(event.target.closest('[data-domus-faq-add]')){const stamp=Date.now()+'_'+Math.random().toString(36).slice(2,7);list.insertAdjacentHTML('beforeend',document.getElementById('domus-faq-template').innerHTML.replaceAll('__INDEX__',stamp));return;}
  const row=event.target.closest('[data-domus-faq-row]');if(!row)return;
  if(event.target.closest('[data-faq-remove]'))row.remove();
  if(event.target.closest('[data-faq-up]')&&row.previousElementSibling)list.insertBefore(row,row.previousElementSibling);
  if(event.target.closest('[data-faq-down]')&&row.nextElementSibling)list.insertBefore(row.nextElementSibling,row);
 });
})();
