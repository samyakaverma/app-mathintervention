// Cross-device completion state for all Math Intervention Coach profiles.
// Completion is separate from pedagogical mastery. It answers: "Have we done this item?"
(function(){
  const SUPABASE_URL='https://rlopfgywtcqhssyshvda.supabase.co';
  const SUPABASE_KEY='sb_publishable_5EdrNZiKUPTkfYVtZwFF5g_FOmqa_77';
  const CACHE_KEY='mathInterventionCompletion.v1';
  const OUTBOX_KEY='mathInterventionCompletionOutbox.v1';
  const DEVICE_KEY='mathInterventionCompletionDevice.v1';

  function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'')||fallback}catch(e){return fallback}}
  let cache=readJSON(CACHE_KEY,{items:{}}); if(!cache.items)cache.items={};
  let outbox=readJSON(OUTBOX_KEY,[]); if(!Array.isArray(outbox))outbox=[];
  let current=null;
  let syncing=false;
  let conflicts=[];
  let lastMessage='';

  function uuid(){
    if(globalThis.crypto&&crypto.randomUUID)return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0,v=c==='x'?r:(r&3|8);return v.toString(16)});
  }
  let deviceId=localStorage.getItem(DEVICE_KEY);
  if(!deviceId){deviceId='device-'+uuid();localStorage.setItem(DEVICE_KEY,deviceId)}

  function save(){localStorage.setItem(CACHE_KEY,JSON.stringify(cache));localStorage.setItem(OUTBOX_KEY,JSON.stringify(outbox))}
  function k(m){return [m.learner,m.profile,m.kind,m.id].join('|')}
  function row(m){return cache.items[k(m)]||{done:false,revision:0,updated_at:null,pending:false,conflict:false}}
  function setRow(m,v){cache.items[k(m)]={...row(m),...v};save()}
  function hasPending(m){const key=k(m);return outbox.some(e=>k(e.meta)===key)}
  function headers(extra={}){return {'apikey':SUPABASE_KEY,'Content-Type':'application/json',...extra}}

  function titleFor(meta){
    try{
      if(meta.profile==='singapore'&&typeof units!=='undefined')return (units.find(x=>x.id===meta.id)||{}).title||meta.id;
      if(meta.profile==='speed_math'&&typeof SM_CHAPTERS!=='undefined')return (SM_CHAPTERS.find(x=>x.id===meta.id)||{}).title||meta.id;
      if(meta.profile==='olympiad'&&typeof OLY_CHAPTERS!=='undefined')return (OLY_CHAPTERS.find(x=>x.id===meta.id)||{}).title||meta.id;
      if(meta.profile==='discovery_calculus'&&typeof CALC_LABS!=='undefined')return (CALC_LABS.find(x=>x.id===meta.id)||{}).title||meta.id;
    }catch(e){}
    return meta.id;
  }

  function metaFromElement(el){
    if(!el)return null;
    if(el.dataset.unit)return {learner:'maya',profile:'singapore',kind:'unit',id:el.dataset.unit};
    if(el.dataset.sm)return {learner:'maya',profile:'speed_math',kind:'chapter',id:el.dataset.sm};
    if(el.dataset.oc)return {learner:'zara',profile:'olympiad',kind:'chapter',id:el.dataset.oc};
    if(el.dataset.cl)return {learner:'zara',profile:'discovery_calculus',kind:'lab',id:el.dataset.cl};
    return null;
  }

  function statusPill(){
    let pill=document.getElementById('completionSyncPill');
    if(!pill){
      pill=document.createElement('button');pill.id='completionSyncPill';pill.type='button';pill.className='completion-sync-pill';
      const home=document.getElementById('homeBtn');if(home&&home.parentNode)home.parentNode.insertBefore(pill,home);
      pill.onclick=()=>{
        if(conflicts.length){
          const names=conflicts.slice(0,8).map(c=>titleFor({learner:c.learner,profile:c.profile,kind:c.item_kind,id:c.item_id}));
          alert(`Sync kept the newer database version for ${conflicts.length} conflicting change${conflicts.length===1?'':'s'}:\n\n${names.join('\n')}\n\nOpen the item and tap its Done control again if you still want to change the newer state.`);
        }else if(outbox.length){alert(`${outbox.length} change${outbox.length===1?'':'s'} waiting to sync. They remain saved on this device until the connection returns.`)}
        else alert('Completion status is synced across devices.');
      };
    }
    let text='Synced',cls='';
    if(!navigator.onLine){text=`Offline${outbox.length?` · ${outbox.length} waiting`:''}`;cls='offline'}
    else if(syncing){text='Syncing…';cls='pending'}
    else if(conflicts.length){text=`${conflicts.length} sync conflict${conflicts.length===1?'':'s'}`;cls='conflict'}
    else if(outbox.length){text=`${outbox.length} waiting`;cls='pending'}
    pill.textContent=text;pill.className=`completion-sync-pill ${cls}`;
  }

  function completionBadge(el,meta){
    let badge=el.querySelector(':scope > .completion-done-badge');
    const s=row(meta);
    if(s.done){if(!badge){badge=document.createElement('span');badge.className='completion-done-badge';badge.textContent='Done';el.appendChild(badge)}}
    else if(badge)badge.remove();
    el.classList.toggle('completion-is-done',!!s.done);
  }

  function decorateLists(){
    document.querySelectorAll('[data-unit],[data-sm],[data-oc],[data-cl]').forEach(el=>{const m=metaFromElement(el);if(m)completionBadge(el,m)});
  }

  function injectCurrentControl(){
    const old=document.getElementById('completionControl');
    if(!current){if(old)old.remove();return}
    if(old&&old.dataset.key===k(current)){updateCurrentControl();return}
    if(old)old.remove();

    const h2=screen.querySelector('h2');if(!h2)return;
    const s=row(current);
    const box=document.createElement('div');box.id='completionControl';box.dataset.key=k(current);box.className='completion-control';
    box.innerHTML=`<div class="completion-copy"><strong>${s.done?'Done':'Have you done this?'}</strong><span id="completionControlNote"></span></div><button id="completionToggle" type="button" class="completion-toggle ${s.done?'done':''}">${s.done?'Done ✓':'Yes, we’ve done this'}</button>`;

    const unitHeading=screen.querySelector('.unit-heading');
    if(current.profile==='singapore'&&unitHeading)unitHeading.appendChild(box);
    else h2.insertAdjacentElement('afterend',box);

    box.querySelector('#completionToggle').onclick=async()=>{
      const now=row(current),next=!now.done;
      if(now.done&&!confirm('Mark this as not done? The previous completion remains in sync history.'))return;
      queueChange(current,next);
    };
    updateCurrentControl();
  }

  function updateCurrentControl(){
    if(!current)return;
    const box=document.getElementById('completionControl');if(!box)return;
    const s=row(current),btn=box.querySelector('#completionToggle'),copy=box.querySelector('.completion-copy strong'),note=box.querySelector('#completionControlNote');
    copy.textContent=s.done?'Done':'Have you done this?';
    btn.textContent=s.done?'Done ✓':'Yes, we’ve done this';btn.classList.toggle('done',!!s.done);
    if(s.pending)note.textContent='Saved here · syncing to the other devices…';
    else if(s.conflict)note.textContent='A newer device change was kept. Tap again if you still want to change it.';
    else note.textContent=s.done?'Synced across devices.':'Not marked done.';
  }

  function refreshUI(){decorateLists();injectCurrentControl();statusPill()}

  function queueChange(meta,requested){
    const s=row(meta);
    const ev={client_event_id:uuid(),meta:{...meta},requested_done:requested,base_revision:Number(s.revision||0),device_id:deviceId,client_updated_at:new Date().toISOString()};
    outbox.push(ev);
    setRow(meta,{done:requested,pending:true,conflict:false,local_updated_at:ev.client_updated_at});
    save();refreshUI();syncNow();
  }

  async function postEvent(ev){
    const res=await fetch(`${SUPABASE_URL}/rest/v1/rpc/math_intervention_apply_progress_event`,{
      method:'POST',headers:headers({'Accept':'application/json'}),body:JSON.stringify({
        p_learner:ev.meta.learner,p_profile:ev.meta.profile,p_item_kind:ev.meta.kind,p_item_id:ev.meta.id,
        p_requested_done:ev.requested_done,p_base_revision:ev.base_revision,p_client_event_id:ev.client_event_id,
        p_device_id:ev.device_id,p_client_updated_at:ev.client_updated_at
      })
    });
    if(!res.ok)throw new Error(`sync ${res.status}`);
    return await res.json();
  }

  async function fetchProgress(){
    const res=await fetch(`${SUPABASE_URL}/rest/v1/math_intervention_progress?select=learner,profile,item_kind,item_id,done,revision,updated_at,updated_by_device`,{headers:headers({'Accept':'application/json'})});
    if(!res.ok)throw new Error(`progress ${res.status}`);
    const rows=await res.json();
    for(const r of rows){
      const m={learner:r.learner,profile:r.profile,kind:r.item_kind,id:r.item_id};
      if(hasPending(m))continue;
      const local=row(m);
      if(Number(r.revision)>=Number(local.revision||0))setRow(m,{done:r.done,revision:r.revision,updated_at:r.updated_at,updated_by_device:r.updated_by_device,pending:false,conflict:false});
    }
  }

  async function fetchConflicts(){
    const res=await fetch(`${SUPABASE_URL}/rest/v1/math_intervention_sync_conflicts?select=conflict_id,learner,profile,item_kind,item_id,requested_done,current_done,current_revision,created_at&resolved_at=is.null&order=created_at.desc`,{headers:headers({'Accept':'application/json'})});
    if(res.ok)conflicts=await res.json();
  }

  async function syncNow(){
    if(syncing||!navigator.onLine){statusPill();return}
    syncing=true;statusPill();
    try{
      while(outbox.length&&navigator.onLine){
        const ev=outbox[0];
        try{
          const r=await postEvent(ev);
          const m=ev.meta;
          setRow(m,{done:!!r.done,revision:Number(r.revision||0),updated_at:r.updated_at||null,pending:false,conflict:!!r.conflict});
          if(r.conflict)lastMessage='A newer synced change was kept.';
          outbox.shift();save();refreshUI();
        }catch(err){break}
      }
      if(navigator.onLine){await fetchProgress();await fetchConflicts()}
    }catch(e){
      lastMessage='Sync will retry automatically.';
    }finally{syncing=false;save();refreshUI()}
  }

  function contextFromId(kind,id){
    if(kind==='unit')return {learner:'maya',profile:'singapore',kind:'unit',id};
    if(kind==='speed')return {learner:'maya',profile:'speed_math',kind:'chapter',id};
    return null;
  }

  // Capture navigation into private IIFE renderers before their click handlers replace the screen.
  document.addEventListener('click',e=>{
    const leaf=e.target.closest('[data-unit],[data-sm],[data-oc],[data-cl]');
    if(leaf){current=metaFromElement(leaf);setTimeout(refreshUI,0);return}
    if(e.target.closest('#homeBtn,.profile-tile,#backBooks,#ob,#oh,#cb,#smb,[data-ob],[data-book],[data-lesson]')){current=null;setTimeout(refreshUI,0)}
  },true);

  // Global renderers can also be opened programmatically; preserve context there too.
  try{
    if(typeof renderUnit==='function'){
      const baseUnit=renderUnit;
      renderUnit=function(id){current=contextFromId('unit',id);baseUnit(id);setTimeout(refreshUI,0)};
    }
  }catch(e){}
  try{
    if(typeof renderSMChapter==='function'){
      const baseSM=renderSMChapter;
      renderSMChapter=function(id){current=contextFromId('speed',id);baseSM(id);setTimeout(refreshUI,0)};
      window.renderSMChapter=renderSMChapter;
    }
  }catch(e){}

  // Re-add the compact completion control after Learning/Practice screens rerender.
  const observer=new MutationObserver(()=>requestAnimationFrame(refreshUI));
  observer.observe(screen,{childList:true,subtree:true});

  window.addEventListener('online',syncNow);
  window.addEventListener('offline',statusPill);
  window.addEventListener('focus',()=>{if(navigator.onLine)syncNow()});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&navigator.onLine)syncNow()});

  window.MathInterventionCompletion={syncNow,get:(m)=>row(m),mark:(m,done)=>queueChange(m,done)};
  refreshUI();syncNow();
})();
