// Cross-device completion state for all Math Intervention Coach profiles.
// Completion is separate from pedagogical mastery: it answers "Have we done this item?"
(function(){
  const URL='https://rlopfgywtcqhssyshvda.supabase.co';
  const KEY='sb_publishable_5EdrNZiKUPTkfYVtZwFF5g_FOmqa_77';
  const CACHE_KEY='mathInterventionCompletion.v1';
  const OUTBOX_KEY='mathInterventionCompletionOutbox.v1';
  const DEVICE_KEY='mathInterventionCompletionDevice.v1';

  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||'')||f}catch(e){return f}};
  let cache=read(CACHE_KEY,{items:{}}); if(!cache.items)cache.items={};
  let outbox=read(OUTBOX_KEY,[]); if(!Array.isArray(outbox))outbox=[];
  let current=null, syncing=false, conflicts=[];

  const uuid=()=>globalThis.crypto?.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0,v=c==='x'?r:(r&3|8);return v.toString(16)});
  let deviceId=localStorage.getItem(DEVICE_KEY); if(!deviceId){deviceId='device-'+uuid();localStorage.setItem(DEVICE_KEY,deviceId)}
  const save=()=>{localStorage.setItem(CACHE_KEY,JSON.stringify(cache));localStorage.setItem(OUTBOX_KEY,JSON.stringify(outbox))};
  const key=m=>[m.learner,m.profile,m.kind,m.id].join('|');
  const state=m=>cache.items[key(m)]||{done:false,revision:0,pending:false,conflict:false};
  const setState=(m,v)=>{cache.items[key(m)]={...state(m),...v};save()};
  const pending=m=>outbox.some(e=>key(e.meta)===key(m));
  const headers=()=>({'apikey':KEY,'Content-Type':'application/json','Accept':'application/json'});

  function titleFor(m){try{
    if(m.profile==='singapore'&&typeof units!=='undefined')return units.find(x=>x.id===m.id)?.title||m.id;
    if(m.profile==='speed_math'&&typeof SM_CHAPTERS!=='undefined')return SM_CHAPTERS.find(x=>x.id===m.id)?.title||m.id;
    if(m.profile==='olympiad'&&typeof OLY_CHAPTERS!=='undefined')return OLY_CHAPTERS.find(x=>x.id===m.id)?.title||m.id;
    if(m.profile==='discovery_calculus'&&typeof CALC_LABS!=='undefined')return CALC_LABS.find(x=>x.id===m.id)?.title||m.id;
  }catch(e){} return m.id}

  function metaFrom(el){
    if(!el)return null;
    if(el.dataset.unit)return {learner:'maya',profile:'singapore',kind:'unit',id:el.dataset.unit};
    if(el.dataset.sm)return {learner:'maya',profile:'speed_math',kind:'chapter',id:el.dataset.sm};
    if(el.dataset.oc)return {learner:'zara',profile:'olympiad',kind:'chapter',id:el.dataset.oc};
    if(el.dataset.cl)return {learner:'zara',profile:'discovery_calculus',kind:'lab',id:el.dataset.cl};
    return null;
  }

  function pill(){
    let p=document.getElementById('completionSyncPill');
    if(!p){p=document.createElement('button');p.id='completionSyncPill';p.type='button';const home=document.getElementById('homeBtn');home?.parentNode?.insertBefore(p,home);p.onclick=()=>{
      if(conflicts.length){const names=conflicts.slice(0,8).map(c=>titleFor({learner:c.learner,profile:c.profile,kind:c.item_kind,id:c.item_id}));alert(`A newer device version was kept for ${conflicts.length} conflicting change${conflicts.length===1?'':'s'}:\n\n${names.join('\n')}\n\nOpen an item and tap its Done control again if you still want to change the newer state.`)}
      else if(outbox.length)alert(`${outbox.length} change${outbox.length===1?'':'s'} waiting to sync. They are saved on this device and will retry automatically.`);
      else alert('Completion status is synced across devices.');
    }}
    let text='Synced',cls='';
    if(!navigator.onLine){text=`Offline${outbox.length?` · ${outbox.length} waiting`:''}`;cls='offline'}
    else if(syncing){text='Syncing…';cls='pending'}
    else if(conflicts.length){text=`${conflicts.length} sync conflict${conflicts.length===1?'':'s'}`;cls='conflict'}
    else if(outbox.length){text=`${outbox.length} waiting`;cls='pending'}
    if(p.textContent!==text)p.textContent=text;
    const wanted=`completion-sync-pill ${cls}`;if(p.className!==wanted)p.className=wanted;
  }

  function decorate(){
    document.querySelectorAll('[data-unit],[data-sm],[data-oc],[data-cl]').forEach(el=>{
      const m=metaFrom(el),s=state(m);let b=el.querySelector(':scope > .completion-done-badge');
      if(s.done&&!b){b=document.createElement('span');b.className='completion-done-badge';b.textContent='Done';el.appendChild(b)}
      if(!s.done&&b)b.remove();
      el.classList.toggle('completion-is-done',!!s.done);
    });
  }

  function inject(){
    const old=document.getElementById('completionControl');
    if(!current){old?.remove();return}
    const k=key(current);
    if(old&&old.dataset.key!==k)old.remove();
    let box=document.getElementById('completionControl');
    if(!box){
      const h2=screen.querySelector('h2');if(!h2)return;
      box=document.createElement('div');box.id='completionControl';box.dataset.key=k;box.className='completion-control';
      box.innerHTML='<div class="completion-copy"><strong></strong><span id="completionControlNote"></span></div><button id="completionToggle" type="button" class="completion-toggle"></button>';
      const unitHeading=screen.querySelector('.unit-heading');
      if(current.profile==='singapore'&&unitHeading)unitHeading.appendChild(box);else h2.insertAdjacentElement('afterend',box);
      box.querySelector('#completionToggle').onclick=()=>{const s=state(current),next=!s.done;if(s.done&&!confirm('Mark this as not done? The previous completion remains in sync history.'))return;queue(current,next)};
    }
    const s=state(current),strong=box.querySelector('strong'),note=box.querySelector('#completionControlNote'),btn=box.querySelector('#completionToggle');
    const a=s.done?'Done':'Have you done this?',b=s.done?'Done ✓':'Yes, we’ve done this';
    const n=s.pending?'Saved here · syncing to the other devices…':s.conflict?'A newer device change was kept. Tap again if you still want to change it.':s.done?'Synced across devices.':'Not marked done.';
    if(strong.textContent!==a)strong.textContent=a;if(btn.textContent!==b)btn.textContent=b;if(note.textContent!==n)note.textContent=n;btn.classList.toggle('done',!!s.done);
  }
  const refresh=()=>{decorate();inject();pill()};

  function queue(meta,done){const s=state(meta),ev={client_event_id:uuid(),meta:{...meta},requested_done:done,base_revision:Number(s.revision||0),device_id:deviceId,client_updated_at:new Date().toISOString()};outbox.push(ev);setState(meta,{done,pending:true,conflict:false});save();refresh();sync()}

  async function send(ev){const r=await fetch(`${URL}/rest/v1/rpc/math_intervention_apply_progress_event`,{method:'POST',headers:headers(),body:JSON.stringify({p_learner:ev.meta.learner,p_profile:ev.meta.profile,p_item_kind:ev.meta.kind,p_item_id:ev.meta.id,p_requested_done:ev.requested_done,p_base_revision:ev.base_revision,p_client_event_id:ev.client_event_id,p_device_id:ev.device_id,p_client_updated_at:ev.client_updated_at})});if(!r.ok)throw new Error(String(r.status));return r.json()}
  async function pull(){const r=await fetch(`${URL}/rest/v1/math_intervention_progress?select=learner,profile,item_kind,item_id,done,revision,updated_at,updated_by_device`,{headers:headers()});if(!r.ok)throw new Error(String(r.status));for(const x of await r.json()){const m={learner:x.learner,profile:x.profile,kind:x.item_kind,id:x.item_id};if(pending(m))continue;const l=state(m);if(Number(x.revision)>=Number(l.revision||0))setState(m,{done:x.done,revision:x.revision,updated_at:x.updated_at,updated_by_device:x.updated_by_device,pending:false,conflict:false})}}
  async function pullConflicts(){const r=await fetch(`${URL}/rest/v1/math_intervention_sync_conflicts?select=conflict_id,learner,profile,item_kind,item_id,requested_done,current_done,current_revision,created_at&resolved_at=is.null&order=created_at.desc`,{headers:headers()});if(r.ok)conflicts=await r.json()}
  async function sync(){if(syncing||!navigator.onLine){pill();return}syncing=true;pill();try{while(outbox.length&&navigator.onLine){try{const ev=outbox[0],r=await send(ev);setState(ev.meta,{done:!!r.done,revision:Number(r.revision||0),updated_at:r.updated_at||null,pending:false,conflict:!!r.conflict});outbox.shift();save();refresh()}catch(e){break}}if(navigator.onLine){await pull();await pullConflicts()}}catch(e){}finally{syncing=false;save();refresh()}}

  // Capture leaf navigation before profile-specific handlers replace the screen.
  document.addEventListener('click',e=>{const leaf=e.target.closest('[data-unit],[data-sm],[data-oc],[data-cl]');if(leaf){current=metaFrom(leaf);setTimeout(refresh,0);return}if(e.target.closest('#homeBtn,.profile-tile,#backBooks,#ob,#oh,#cb,#smb,[data-ob],[data-book],[data-lesson]')){current=null;setTimeout(refresh,0)}},true);

  // Preserve context if these public renderers are called programmatically.
  try{if(typeof renderUnit==='function'){const base=renderUnit;renderUnit=function(id){current={learner:'maya',profile:'singapore',kind:'unit',id};base(id);setTimeout(refresh,0)}}}catch(e){}
  try{if(typeof renderSMChapter==='function'){const base=renderSMChapter;renderSMChapter=function(id){current={learner:'maya',profile:'speed_math',kind:'chapter',id};base(id);setTimeout(refresh,0)};window.renderSMChapter=renderSMChapter}}catch(e){}

  // Root-only observation catches full screen rerenders without reacting to our own control text changes.
  new MutationObserver(()=>requestAnimationFrame(refresh)).observe(screen,{childList:true});
  window.addEventListener('online',sync);window.addEventListener('offline',pill);window.addEventListener('focus',()=>navigator.onLine&&sync());document.addEventListener('visibilitychange',()=>!document.hidden&&navigator.onLine&&sync());
  window.MathInterventionCompletion={syncNow:sync,get:state,mark:queue};
  refresh();sync();
})();
