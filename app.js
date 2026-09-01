const screen = document.getElementById('screen');
const homeBtn = document.getElementById('homeBtn');

const STORAGE_KEY = 'mayaMathIntervention.v1';

const strategies = {
  finish100: {
    title: 'Finish the Friendly Number',
    short: 'Know what a number needs to reach 10 or 100.',
    source: 'Core prerequisite',
    maxLevel: 4,
    goal: 'Maya sees 100 as a landmark and can find the missing part without counting every unit.',
    manip: 'Base-ten blocks or bead bars. Build 100. Cover or remove part of it so the missing amount is physically visible.',
    script: '“Here is 100. This part is already here. What is missing?”',
    model: '63 + ? = 100',
    why: 'This is the foundation for +99, +98, −99 and −98. If the complement itself is effortful, compensation overloads working memory.',
    probes: [
      {q:'Can she tell you what 9 needs to make 10?', fix:'Return to complements to 10 with bead bars or counters. Build 10, cover part, and ask only for the missing part.'},
      {q:'Can she tell you what 90 needs to make 100?', fix:'Use ten-bars only. Show ten tens as 100 and remove one or more tens.'},
      {q:'Can she see 63 as 60 + 3?', fix:'Pause complements and work on breaking numbers into tens and ones.'}
    ]
  },
  break: {
    title: 'Break It',
    short: 'See a number as useful parts without changing its value.',
    source: 'Core prerequisite',
    maxLevel: 4,
    goal: 'Maya can flexibly rename a number: 35 is 30 + 5; 73 is 70 + 3; 256 is 200 + 50 + 6.',
    manip: 'Base-ten blocks. Build the number, then physically separate hundreds, tens and ones into small groups.',
    script: '“Can you crack this number into parts that are easier to use?”',
    model: '73 → 70 + 3',
    why: 'Singapore’s split-and-hop work depends on Maya being able to decompose the second number while keeping its total unchanged.',
    probes: [
      {q:'Can she name the tens and ones in a two-digit number?', fix:'Build only two-digit numbers with tens and ones. Do not calculate yet.'},
      {q:'Can she rebuild the original number after splitting it?', fix:'Physically push the parts apart and back together while saying “same amount, different arrangement.”'},
      {q:'Can she split a number in more than one valid way?', fix:'Try 35 as 30+5, 20+15, and 25+10. Keep it concrete.'}
    ]
  },
  splitAdd: {
    title: 'Split & Hop — Addition',
    short: 'Add a number in manageable chunks.',
    source: 'Singapore 2B Unit 6',
    maxLevel: 4,
    goal: 'Maya keeps the starting number stable, splits the addend, and makes one visible hop at a time.',
    manip: 'Open number line on paper, or base-ten blocks. Leave every intermediate number visible.',
    script: '“Don’t do the whole number. What is the biggest easy chunk you can add first?”',
    model: '57 + 36 → +30 → +6',
    why: 'The written decomposition becomes mental only after the intermediate result is easy to retain. We deliberately keep the trail visible first.',
    probes: [
      {q:'Can she split the second number into tens and ones?', fix:'Return to Break It. Ask her to build and split the addend without doing the addition.'},
      {q:'Can she add the tens chunk accurately?', fix:'Practice only +10, +20, +30 and so on from varied starting numbers.'},
      {q:'Does she remember the intermediate total for the final hop?', fix:'Write or place a card with the intermediate total. This is a working-memory support, not easier mathematics.'}
    ]
  },
  splitSub: {
    title: 'Split & Hop — Subtraction',
    short: 'Subtract tens first, then ones, while keeping the trail visible.',
    source: 'Singapore 2B Unit 6',
    maxLevel: 4,
    goal: 'Maya sees 25 as 20 + 5 and can remove those chunks sequentially without losing the intermediate total.',
    manip: 'Open number line or base-ten blocks. Keep both subtraction hops physically visible.',
    script: '“What easy chunk can we take away first?”',
    model: '68 − 25 → −20 → −5',
    why: 'This matches the workbook’s decomposition structure but reduces the invisible working-memory burden.',
    probes: [
      {q:'Can she split the number being subtracted into tens and ones?', fix:'Return to Break It with the subtrahend only.'},
      {q:'Can she subtract the tens chunk?', fix:'Practice subtracting whole tens from two-digit and three-digit numbers.'},
      {q:'Does she lose the result before subtracting the ones?', fix:'Leave the intermediate result on a card or number line. Ask for only one change at a time.'}
    ]
  },
  almostAdd: {
    title: 'Almost 100 — Addition',
    short: 'Use +100, then pay back the extra 1 or 2.',
    source: 'Singapore 2B Unit 6',
    maxLevel: 4,
    goal: 'Maya understands compensation: changing 98 to 100 adds 2 extra, so those 2 must be removed afterward.',
    manip: 'Base-ten blocks. Build 98, then add 2 loose units to make 100. Keep the two extra units visibly off to the side as an “owe back” pile.',
    script: '“98 is nearly 100. How much did we add to make it 100? Keep that amount where we can see it.”',
    model: '246 + 98 → 246 + 100 → 346 − 2',
    why: 'The key idea is not the rule “+98 means +100−2.” It is seeing exactly why the compensation is necessary.',
    probes: [
      {q:'Does she instantly know how far 98 or 99 is from 100?', fix:'Return to Finish the Friendly Number. Do not teach compensation until the complement is easy.'},
      {q:'Can she add 100 to the starting number?', fix:'Practice +100 separately with base-ten blocks or place-value cards.'},
      {q:'Can she explain why 2 must come back after changing 98 to 100?', fix:'Keep two physical counters in an “extra” pile. Ask only: “Are these really part of 98?”'},
      {q:'Can she subtract the compensation from the intermediate total?', fix:'Keep the intermediate total written down. Practice the final −1 or −2 step separately.'}
    ]
  },
  almostSub: {
    title: 'Almost 100 — Subtraction',
    short: 'Use −100, then give back the extra 1 or 2 removed.',
    source: 'Singapore 2B Unit 6',
    maxLevel: 4,
    goal: 'Maya understands that subtracting 100 instead of 98 removes 2 too many, so 2 must be restored.',
    manip: 'Base-ten blocks or a number line. Show the −100 move first, with 1 or 2 counters visibly marked to be returned.',
    script: '“If we take away 100 instead of 98, did we take too much or too little?”',
    model: '467 − 98 → 467 − 100 → 367 + 2',
    why: 'This is the subtraction mirror of compensation in addition. The “give back” must remain concrete before it becomes mental.',
    probes: [
      {q:'Does she know 98 is 2 less than 100?', fix:'Return to Finish the Friendly Number.'},
      {q:'Can she subtract 100 from the starting number?', fix:'Practice −100 separately with place-value materials.'},
      {q:'Can she explain why the final adjustment is +2 rather than −2?', fix:'Physically remove 100, then return two counters. Ask: “Did we remove too many?”'},
      {q:'Can she add back the 1 or 2 accurately?', fix:'Keep the intermediate total visible and isolate the final tiny adjustment.'}
    ]
  },
  moveOver: {
    title: 'Move Some Over',
    short: 'Redistribute between addends to make a friendly number.',
    source: 'Extension strategy',
    maxLevel: 4,
    goal: 'Maya sees that one addend can gain exactly what the other loses, so the total does not change.',
    manip: 'Two trays of base-ten blocks. Move blocks from one tray to the other. Never combine them until Maya has seen that the grand total stayed fixed.',
    script: '“This number is close to a friendly number. Can we move some from the other pile to finish it?”',
    model: '182 + 139 → 200 + 121',
    why: 'This is redistribution, not compensation. Maya should physically see that the total is invariant while the two parts change.',
    probes: [
      {q:'Can she see how much the first addend needs to reach the next hundred?', fix:'Return to Finish the Friendly Number using the gap to the next hundred.'},
      {q:'Can she remove that same amount from the second addend?', fix:'Use two trays. Move the exact blocks physically rather than describing the move verbally.'},
      {q:'Can she explain what stayed the same?', fix:'Count or label the grand total before and after the move. Repeat: “parts changed; total did not.”'}
    ]
  },
  choose: {
    title: 'Choose the Move',
    short: 'Recognize which strategy makes a particular calculation easier.',
    source: 'Transfer / mixed practice',
    maxLevel: 4,
    goal: 'Maya chooses a valid efficient strategy herself rather than waiting for a named procedure.',
    manip: 'Keep manipulatives available but do not place them out automatically. Let Maya request or choose them.',
    script: '“Before you calculate: what do you notice about these numbers?”',
    model: '183 + 99 → “99 is almost 100.”',
    why: 'This is where procedures become number sense. We accept different valid routes and compare efficiency only after understanding is secure.',
    probes: [
      {q:'Can she name anything special about the numbers before calculating?', fix:'Return to strategy recognition with only two choices: one obvious Almost-100 problem and one ordinary split problem.'},
      {q:'Does she choose a valid method even if it is not the one you expected?', fix:'Accept valid routes. Ask her to show what changed and what stayed the same before offering another method.'},
      {q:'Can she compare two routes without becoming confused?', fix:'Do not compare yet. Secure one route at a time, then revisit comparison later.'}
    ]
  }
};

const state = loadState();
let currentStrategy = null;
let currentQuestion = null;
let currentProbe = 0;
let lastOutcome = null;

function defaultProgress(){
  return Object.fromEntries(Object.keys(strategies).map(id => [id,{level:1,streak:0,attempts:0,confident:0,help:0,notYet:0,last:null}]));
}

function loadState(){
  try{
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {progress:{...defaultProgress(),...(raw.progress||{})},lastStrategy:raw.lastStrategy||null};
  }catch(e){
    return {progress:defaultProgress(),lastStrategy:null};
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}

function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(arr){ return arr[rand(0,arr.length-1)]; }
function fmt(a,op,b){ return `${a} ${op} ${b}`; }

function generateQuestion(id, level){
  level = Math.max(1,Math.min(level,strategies[id].maxLevel));
  if(id==='finish100'){
    if(level===1){ const a=pick([10,20,30,40,50,60,70,80,90]); return {text:`${a} + ? = 100`,answer:100-a,skill:'complement to 100'}; }
    if(level===2){ const a=rand(51,97); return {text:`${a} + ? = 100`,answer:100-a,skill:'complement to 100'}; }
    if(level===3){ const a=rand(1,97); return {text:`100 − ${a}`,answer:100-a,skill:'subtract from 100'}; }
    const a=rand(11,99); return Math.random()<.5 ? {text:`${a} + ? = 100`,answer:100-a,skill:'mixed complement'} : {text:`100 − ${a}`,answer:100-a,skill:'mixed complement'};
  }
  if(id==='break'){
    if(level===1){ const n=rand(21,98); return {text:`Break ${n}`,answer:`${Math.floor(n/10)*10} + ${n%10}`,skill:'tens and ones'}; }
    if(level===2){ const n=rand(120,989); const h=Math.floor(n/100)*100,t=Math.floor((n%100)/10)*10,o=n%10; return {text:`Break ${n}`,answer:[h,t,o].filter(Boolean).join(' + '),skill:'hundreds tens ones'}; }
    if(level===3){ const n=rand(31,89); const k=pick([10,20,30]); return {text:`Find another split for ${n}`,answer:`Example: ${k} + ${n-k}`,skill:'flexible decomposition'}; }
    const n=rand(120,989); return {text:`How could you split ${n} to make it useful?`,answer:'Any equivalent decomposition',skill:'choose a useful decomposition'};
  }
  if(id==='splitAdd'){
    if(level===1){ const a=rand(21,79), b=pick([10,20,30,40]); return {text:fmt(a,'+',b),answer:a+b,skill:'add whole tens'}; }
    if(level===2){ const a=rand(21,79), b=rand(11,39); return {text:fmt(a,'+',b),answer:a+b,skill:'split tens then ones'}; }
    if(level===3){ const a=rand(48,89), b=rand(21,49); return {text:fmt(a,'+',b),answer:a+b,skill:'split across a ten'}; }
    const a=rand(120,789), b=rand(21,89); return {text:fmt(a,'+',b),answer:a+b,skill:'three-digit plus two-digit'};
  }
  if(id==='splitSub'){
    if(level===1){ const a=rand(50,99), b=pick([10,20,30,40]); return {text:fmt(a,'−',b),answer:a-b,skill:'subtract whole tens'}; }
    if(level===2){ const b=rand(11,39), a=rand(Math.max(45,b+15),99); return {text:fmt(a,'−',b),answer:a-b,skill:'split tens then ones'}; }
    if(level===3){ const b=rand(21,49), a=rand(Math.max(61,b+12),99); return {text:fmt(a,'−',b),answer:a-b,skill:'split subtraction'}; }
    const b=rand(21,89), a=rand(Math.max(150,b+60),899); return {text:fmt(a,'−',b),answer:a-b,skill:'three-digit minus two-digit'};
  }
  if(id==='almostAdd'){
    if(level===1){ const b=pick([98,99]), a=rand(2,12); return {text:fmt(b,'+',a),answer:a+b,skill:'see 98/99 near 100'}; }
    if(level===2){ const b=pick([98,99]), a=rand(21,79); return {text:fmt(a,'+',b),answer:a+b,skill:'two-digit compensation'}; }
    if(level===3){ const b=pick([98,99]), a=rand(120,699); return {text:fmt(a,'+',b),answer:a+b,skill:'three-digit compensation'}; }
    const b=pick([98,99]), a=rand(201,899); return {text:fmt(a,'+',b),answer:a+b,skill:'independent compensation'};
  }
  if(id==='almostSub'){
    if(level===1){ const b=pick([98,99]), a=pick([200,300,400,500,600,700,800,900]); return {text:fmt(a,'−',b),answer:a-b,skill:'friendly hundred minus 98/99'}; }
    if(level===2){ const b=pick([98,99]), a=rand(150,499); return {text:fmt(a,'−',b),answer:a-b,skill:'compensate subtraction'}; }
    if(level===3){ const b=pick([98,99]), a=rand(300,899); return {text:fmt(a,'−',b),answer:a-b,skill:'three-digit compensation'}; }
    const b=pick([98,99]), a=rand(201,999); return {text:fmt(a,'−',b),answer:a-b,skill:'independent subtraction compensation'};
  }
  if(id==='moveOver'){
    const base = level<=2 ? 100 : 200;
    const hundreds = level<=2 ? rand(1,4) : rand(1,6);
    const target = (hundreds+1)*base;
    const gap = level===1 ? pick([5,10,15,20]) : rand(8,28);
    const a = target-gap;
    const b = rand(gap+30,Math.min(gap+180,399));
    return {text:fmt(a,'+',b),answer:a+b,skill:'redistribute to a friendly number',note:`Possible move: transfer ${gap} to make ${target}.`};
  }
  if(id==='choose'){
    const options=['almostAdd','almostSub','splitAdd','splitSub','moveOver'];
    const target=pick(options);
    const q=generateQuestion(target,Math.min(level,3));
    return {...q,skill:'choose a strategy',targetStrategy:target,note:`Parent key: a useful route is “${strategies[target].title}.” Another valid route is acceptable.`};
  }
}

function showHome(){
  currentStrategy=null;
  const items=Object.entries(strategies).map(([id,s])=>{
    const p=state.progress[id];
    return `<button class="strategy-button" data-strategy="${id}" type="button"><strong>${s.title}</strong><span>${s.short} · Level ${p.level}</span></button>`;
  }).join('');
  screen.innerHTML=`<div class="eyebrow">MENTAL MATH INTERVENTION</div><h2>What are you teaching today?</h2><p class="lead">Choose one idea. The site will coach you, not Maya.</p><div class="stack">${items}</div><div class="home-actions">${state.lastStrategy?'<button id="resumeBtn" class="secondary" type="button">Resume last lesson</button>':''}<button id="progressBtn" class="quiet" type="button">View Maya's progress</button></div>`;
  screen.querySelectorAll('[data-strategy]').forEach(b=>b.addEventListener('click',()=>openStrategy(b.dataset.strategy)));
  const resume=screen.querySelector('#resumeBtn'); if(resume) resume.onclick=()=>openStrategy(state.lastStrategy);
  screen.querySelector('#progressBtn').onclick=showProgress;
}

function openStrategy(id){
  currentStrategy=id; state.lastStrategy=id; saveState();
  const s=strategies[id], p=state.progress[id];
  screen.innerHTML=`<div class="eyebrow">${s.source} · LEVEL ${p.level}</div><h2>${s.title}</h2><p class="lead">${s.goal}</p><div class="card"><div class="label">PUT ON THE TABLE</div><p class="script">${s.manip}</p></div><div class="card soft"><div class="label">SAY ONLY THIS</div><p class="script">${s.script}</p></div><div class="card"><div class="label">MODEL ONCE</div><div class="problem">${s.model}</div><p class="mini">${s.why}</p></div><div class="actions"><button id="tryBtn" class="primary" type="button">Give Maya one question</button><button id="practiceBtn" class="secondary" type="button">I need a bank of practice questions</button></div>`;
  screen.querySelector('#tryBtn').onclick=()=>askQuestion(id);
  screen.querySelector('#practiceBtn').onclick=()=>practiceMode(id);
}

function askQuestion(id, q=null){
  currentStrategy=id;
  const p=state.progress[id];
  currentQuestion=q||generateQuestion(id,p.level);
  const note=currentQuestion.note?`<div class="note">${currentQuestion.note}</div>`:'';
  screen.innerHTML=`<div class="eyebrow">${strategies[id].title} · LEVEL ${p.level}</div><h2>Ask Maya this</h2><div class="question-box"><div class="q">${currentQuestion.text}</div><div class="hint">Do not time her. Let her use the materials.</div></div>${note}<div class="card soft"><div class="label">YOUR PROMPT</div><p class="script">“Show me what you notice. You can move things if you need to.”</p></div><div class="actions"><button id="triedBtn" class="primary" type="button">We've tried it</button><button id="newQBtn" class="quiet" type="button">Give me another like this</button></div>`;
  screen.querySelector('#triedBtn').onclick=accuracyCheck;
  screen.querySelector('#newQBtn').onclick=()=>askQuestion(id);
}

function accuracyCheck(){
  screen.innerHTML=`<div class="eyebrow">ONE DECISION</div><h2>Was Maya's answer correct?</h2><p class="lead">Choose what actually happened. We will decide the intervention after this.</p><div class="outcomes"><button data-a="yes"><strong>Yes</strong>She reached a correct answer.</button><button data-a="no"><strong>No</strong>The answer was wrong or she got stuck.</button><button data-a="different"><strong>She used a different method</strong>I want to check whether to accept it.</button><button data-a="start"><strong>She wasn't confident enough to start</strong>She froze, guessed, or immediately asked for help.</button></div>`;
  screen.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{
    if(b.dataset.a==='yes') confidenceCheck();
    if(b.dataset.a==='no') beginDiagnosis();
    if(b.dataset.a==='different') differentMethodCheck();
    if(b.dataset.a==='start') confidenceIntervention();
  });
}

function confidenceCheck(){
  screen.innerHTML=`<div class="eyebrow">ONE DECISION</div><h2>How secure was the thinking?</h2><div class="outcomes"><button data-o="confident"><strong>Confident</strong>She could do it and explain what changed.</button><button data-o="help"><strong>Needed a prompt or two</strong>The idea was there, but not independent yet.</button><button data-o="answerOnly"><strong>Right answer, shaky idea</strong>She could not really explain why the move worked.</button><button data-o="lost"><strong>She lost track midway</strong>She understood the move but dropped an intermediate number or adjustment.</button></div>`;
  screen.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>routeOutcome(b.dataset.o));
}

function updateProgress(outcome){
  const p=state.progress[currentStrategy];
  p.attempts++;
  p.last={question:currentQuestion?.text||'',outcome,date:new Date().toISOString()};
  if(outcome==='confident'){
    p.confident++; p.streak++;
    if(p.streak>=2 && p.level<strategies[currentStrategy].maxLevel){ p.level++; p.streak=0; }
  }else if(outcome==='help'){
    p.help++; p.streak=0;
  }else{
    p.notYet++; p.streak=0;
  }
  saveState();
}

function routeOutcome(outcome){
  lastOutcome=outcome; updateProgress(outcome);
  const id=currentStrategy, p=state.progress[id];
  let title='', copy='', klass='';
  if(outcome==='confident'){
    title=p.streak===0 && p.level>1?'Move up one level':'Another independent example';
    copy='Keep the representation available, but do not put it in front of her automatically. Ask one new problem. If she again chooses and explains the move, keep advancing.';
    klass='good';
  }
  if(outcome==='help'){
    title='Stay at this level';
    copy='Give another very similar problem. Use the same materials, but remove one verbal prompt. We want the same idea with slightly less adult support.';
  }
  if(outcome==='answerOnly'){
    title='Move down in representation, not in mathematics';
    copy='Keep the same problem. Make the transformation physically. Ask only: “What changed?” and “What stayed the same?” Do not add a second strategy yet.';
    klass='warn';
  }
  if(outcome==='lost'){
    title='Reduce working-memory load';
    copy='Keep every intermediate result on the table or paper. One move at a time. Do not make the numbers smaller unless the arithmetic fact itself is the problem.';
    klass='warn';
  }
  const next=generateQuestion(id,p.level);
  screen.innerHTML=`<div class="eyebrow">YOUR NEXT MOVE</div><div class="card ${klass}"><div class="route-title">${title}</div><p class="route-copy">${copy}</p></div><div class="question-box"><div class="label">NEXT QUESTION</div><div class="q">${next.text}</div></div><div class="actions"><button id="askNext" class="primary" type="button">Use this question</button><button id="moreLike" class="secondary" type="button">Give me another like this</button><button id="teachAgain" class="quiet" type="button">Show the teaching setup again</button></div>`;
  screen.querySelector('#askNext').onclick=()=>askQuestion(id,next);
  screen.querySelector('#moreLike').onclick=()=>askQuestion(id);
  screen.querySelector('#teachAgain').onclick=()=>openStrategy(id);
}

function beginDiagnosis(){
  currentProbe=0;
  showProbe();
}

function showProbe(){
  const s=strategies[currentStrategy];
  const probe=s.probes[currentProbe];
  if(!probe){
    showArithmeticSlip(); return;
  }
  screen.innerHTML=`<div class="eyebrow">FIND THE BREAK POINT · ${currentProbe+1}/${s.probes.length}</div><h2>Ask just this</h2><div class="card soft"><p class="script">${probe.q}</p></div><p class="lead">Do not explain yet. Let this tiny question tell us where the chain breaks.</p><div class="outcomes"><button data-p="yes"><strong>Yes</strong>She can do this part.</button><button data-p="no"><strong>No</strong>This part is not secure.</button><button data-p="unsure"><strong>Not confidently</strong>She can sometimes do it, but it is effortful.</button></div>`;
  screen.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
    if(b.dataset.p==='yes'){ currentProbe++; showProbe(); }
    else probeIntervention(probe,b.dataset.p==='unsure');
  });
}

function probeIntervention(probe, unsure){
  updateProgress('notYet');
  const easier=generateQuestion(currentStrategy,Math.max(1,state.progress[currentStrategy].level-1));
  screen.innerHTML=`<div class="eyebrow">INTERVENE HERE</div><div class="card warn"><div class="route-title">${unsure?'Make this prerequisite confident first':'This is the break point'}</div><p class="route-copy">${probe.fix}</p></div><div class="question-box"><div class="label">AFTER YOU MODEL IT</div><div class="q">${easier.text}</div></div><div class="actions"><button id="useEasy" class="primary" type="button">Try this easier diagnostic</button><button id="moreEasy" class="secondary" type="button">Another question at this level</button><button id="restartTeach" class="quiet" type="button">Back to the teaching setup</button></div>`;
  screen.querySelector('#useEasy').onclick=()=>askQuestion(currentStrategy,easier);
  screen.querySelector('#moreEasy').onclick=()=>{ const q=generateQuestion(currentStrategy,Math.max(1,state.progress[currentStrategy].level-1)); askQuestion(currentStrategy,q); };
  screen.querySelector('#restartTeach').onclick=()=>openStrategy(currentStrategy);
}

function showArithmeticSlip(){
  updateProgress('notYet');
  const next=generateQuestion(currentStrategy,state.progress[currentStrategy].level);
  screen.innerHTML=`<div class="eyebrow">DIAGNOSIS</div><div class="card"><div class="route-title">The strategy chain seems intact</div><p class="route-copy">She passed the prerequisite checks. Treat this as an arithmetic slip or overload rather than reteaching the whole strategy. Repeat with the intermediate numbers left visible.</p></div><div class="question-box"><div class="q">${next.text}</div></div><div class="actions"><button id="retry" class="primary" type="button">Retry with the trail visible</button><button id="teach" class="quiet" type="button">Show the teaching setup</button></div>`;
  screen.querySelector('#retry').onclick=()=>askQuestion(currentStrategy,next);
  screen.querySelector('#teach').onclick=()=>openStrategy(currentStrategy);
}

function differentMethodCheck(){
  screen.innerHTML=`<div class="eyebrow">CHECK HER ROUTE</div><h2>Was Maya's method mathematically valid?</h2><p class="lead">Ignore whether it matches the method you intended to teach. Ask whether each move preserved the mathematics and led to the correct result.</p><div class="outcomes"><button data-v="yes"><strong>Yes</strong>Her route works and she can show what she did.</button><button data-v="no"><strong>No / I'm not sure</strong>I cannot follow the route or something changed incorrectly.</button></div>`;
  screen.querySelector('[data-v="yes"]').onclick=()=>acceptDifferentMethod();
  screen.querySelector('[data-v="no"]').onclick=()=>beginDiagnosis();
}

function acceptDifferentMethod(){
  updateProgress('confident');
  screen.innerHTML=`<div class="eyebrow">ACCEPT THE THINKING</div><div class="card good"><div class="route-title">Keep her method</div><p class="route-copy">Say: “That works. Show me what changed and what stayed the same.” Do not correct a valid route simply because it was not the target strategy.</p></div><div class="card soft"><div class="label">OPTIONAL COMPARISON</div><p class="script">“Want to see another way that can be handy for these particular numbers?”</p></div><div class="actions"><button id="compare" class="primary" type="button">Show me how to compare the two methods</button><button id="another" class="secondary" type="button">Give another problem</button></div>`;
  screen.querySelector('#compare').onclick=()=>openStrategy(currentStrategy);
  screen.querySelector('#another').onclick=()=>askQuestion(currentStrategy);
}

function confidenceIntervention(){
  updateProgress('notYet');
  const q=generateQuestion(currentStrategy,Math.max(1,state.progress[currentStrategy].level-1));
  screen.innerHTML=`<div class="eyebrow">CONFIDENCE FIRST</div><div class="card warn"><div class="route-title">Remove the demand to perform</div><p class="route-copy">Model one yourself with the manipulatives. Then give Maya only one tiny job: move the blocks, point to the missing amount, or choose which of two numbers is friendlier. Do not ask for the whole calculation yet.</p></div><div class="card soft"><div class="label">SAY</div><p class="script">“You don't have to solve the whole thing. Just show me the first move.”</p></div><div class="question-box"><div class="label">LOWER-PRESSURE QUESTION</div><div class="q">${q.text}</div></div><div class="actions"><button id="useQ" class="primary" type="button">Try this</button><button id="moreQ" class="secondary" type="button">Give me another easy one</button><button id="modelAgain" class="quiet" type="button">Show the model again</button></div>`;
  screen.querySelector('#useQ').onclick=()=>askQuestion(currentStrategy,q);
  screen.querySelector('#moreQ').onclick=()=>{const q2=generateQuestion(currentStrategy,Math.max(1,state.progress[currentStrategy].level-1));askQuestion(currentStrategy,q2)};
  screen.querySelector('#modelAgain').onclick=()=>openStrategy(currentStrategy);
}

function practiceMode(id){
  currentStrategy=id;
  const p=state.progress[id];
  const q=generateQuestion(id,p.level);
  screen.innerHTML=`<div class="eyebrow">QUESTION BANK · LEVEL ${p.level}</div><h2>${strategies[id].title}</h2><p class="lead">Use as many as you need. Stop before fatigue. Accuracy and understanding come before speed.</p><div class="question-box"><div class="q" id="practiceQ">${q.text}</div><div class="hint" id="practiceKey">Tap “Parent key” only if you need it.</div></div><div class="toolbar"><button id="easier" class="quiet" type="button">Easier</button><button id="same" class="secondary" type="button">Another like this</button><button id="harder" class="quiet" type="button">Harder</button></div><div class="actions"><button id="keyBtn" class="quiet" type="button">Parent key</button><button id="coachBtn" class="primary" type="button">Coach me through this question</button></div>`;
  let localLevel=p.level, localQ=q;
  const qEl=screen.querySelector('#practiceQ'), key=screen.querySelector('#practiceKey');
  function refresh(level){ localLevel=Math.max(1,Math.min(level,strategies[id].maxLevel)); localQ=generateQuestion(id,localLevel); qEl.textContent=localQ.text; key.textContent='Tap “Parent key” only if you need it.'; }
  screen.querySelector('#easier').onclick=()=>refresh(localLevel-1);
  screen.querySelector('#same').onclick=()=>refresh(localLevel);
  screen.querySelector('#harder').onclick=()=>refresh(localLevel+1);
  screen.querySelector('#keyBtn').onclick=()=>{ key.textContent=`Parent key: ${localQ.answer}${localQ.note?' · '+localQ.note:''}`; };
  screen.querySelector('#coachBtn').onclick=()=>askQuestion(id,localQ);
}

function showProgress(){
  const rows=Object.entries(strategies).map(([id,s])=>{
    const p=state.progress[id];
    const status=p.attempts===0?'Not started':p.confident>=2?'Building independence':p.help>0||p.notYet>0?'In progress':'Started';
    return `<div class="progress-row"><div><strong>${s.title}</strong><div class="mini">Level ${p.level} · ${p.attempts} attempts</div></div><span class="status">${status}</span></div>`;
  }).join('');
  screen.innerHTML=`<div class="eyebrow">PARENT VIEW</div><h2>Maya's mental-math map</h2><p class="lead">This tracks teaching decisions, not speed. A higher level means she has shown the idea confidently more than once.</p>${rows}<hr><div class="actions"><button id="resetBtn" class="quiet" type="button">Reset progress data</button></div>`;
  screen.querySelector('#resetBtn').onclick=()=>{
    if(confirm('Reset all locally stored Maya Math Coach progress?')){
      state.progress=defaultProgress(); state.lastStrategy=null; saveState(); showProgress();
    }
  };
}

homeBtn.addEventListener('click',showHome);
showHome();
