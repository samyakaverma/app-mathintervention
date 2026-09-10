// Zara — Learning by Discovery: Calculus
// Source: Anita E. Solow (ed.), Learning by Discovery: A Lab Manual for Calculus.
// This profile treats the book as guided exploration. "Secure for now" means the idea is secure
// at the current exploration level; it is not a claim of formal calculus-course mastery.

const CALC_KEY='zaraDiscoveryCalculus.v1';
const CALC_BOOK={
  title:'Learning by Discovery: A Lab Manual for Calculus',
  editor:'Anita E. Solow, editor',
  id:'1J99dyqltDX_1iA9Ikpp87xYp3TS-d_4g',
  drive:'https://drive.google.com/file/d/1J99dyqltDX_1iA9Ikpp87xYp3TS-d_4g/view',
  offset:15
};

const CRAW=[
[1,'Graphing Functions',9,'graph','To become familiar with graphing functions and explore families of functions.','Beginning of first-semester calculus; exploration problem 6 refers to limits.','guided','Graphing tool; paper for sketches.','Change one parameter at a time. Predict first, graph second, then describe what moved and what stayed fixed.','What changed in the graph? What stayed invariant?'],
[2,'Introduction to Limits of Functions',13,'limits','To develop an intuitive understanding of limits and the strengths and dangers of successively closer evaluation.','Suggested just before limits are formally introduced. Exponential and logarithmic functions appear, but specific properties are not required.','guided','Graphing tool and a small table of x-values.','Approach the target x-value from both sides. Keep x and f(x) in a table; do not begin with formal limit laws.','As x gets closer, what value does f(x) appear to be approaching?'],
[3,'Zooming In',17,'zoom','To define slope at a point by zooming in and see cases where slope/derivative is not defined.','Designed as an introduction to the derivative, before derivatives are formally defined.','guided','Graphing tool with zoom; ruler/paper.','Zoom around one point until the curve looks locally straight. Estimate the local slope, then compare a smooth point with a corner/cusp.','When does a curved graph start behaving like a line?'],
[4,'Discovering the Derivative',20,'derivative','To develop the derivative at a point from secant slopes and understand when the derivative fails to exist.','Designed before derivatives are formally defined; graphing, limits and symbolic differentiation may be used.','bridge','Graphing tool, table, two-point slope calculation.','Start with a secant line through two nearby points. Move the second point closer and track the slopes.','What number are the secant slopes settling toward?'],
[5,'Investigating the Intermediate Value Theorem',25,'ivt','To discover the Intermediate Value Theorem, apply it, and understand why continuity matters.','After continuity on an interval has been discussed.','later','Graphing tool; string or drawn continuous path.','Use a continuous graph that begins below a target height and ends above it. Ask what height must be crossed, then contrast with a graph that jumps.','If a continuous path goes from below this height to above it, what must happen in between?'],
[6,'Relationship between a Function and Its Derivative',31,'fprime','Given the graph of a function, visualize the graph of its derivative.','Before discussing how the sign of the derivative controls the shape of a function; students need to be able to compute derivatives.','later','Two aligned graph grids.','Mark where the original function rises, falls, flattens, or turns. Translate those observations into positive, negative, or zero derivative values.','Where should the derivative be positive, negative, or zero?'],
[7,'Linking Up with the Chain Rule',37,'chain','To understand the Chain Rule for computing derivatives.','After the Chain Rule is introduced.','later','Nested-function cards; graphing tool.','Separate an outside function from an inside function. Track how a small change passes through the inside and then the outside.','What are the inside and outside functions, and how do their rates combine?'],
[8,'Sensitivity Analysis',41,'sensitivity','To use the derivative as a rate of change measuring how sensitively one quantity depends on another.','Supplements applied maximum/minimum problems; assumes derivatives and optimization.','later','Graph/table and two nearby input values.','Compare how much output changes when input is nudged. Then connect the local ratio of changes to derivative size.','If I change the input a tiny amount, how much does the output react?'],
[9,"Newton's Method",46,'newton','To use Newton’s Method, understand its geometry, and see why the initial guess matters.','Can be used as an application of derivatives or as an example of sequences.','bridge','Graphing tool, tangent-line sketch, calculator.','Start from a guess on the x-axis, go up to the curve, follow the tangent back to the axis, and repeat.','Why does the tangent-line intercept give a better guess?'],
[10,"Indeterminate Limits and l'Hopital's Rule",52,'lhopital','To recognize indeterminate quotient limits, understand l’Hôpital’s Rule, and appreciate why it works.','After limits and the definition of derivative.','later','Graphing tool; derivative rule card.','First identify whether the quotient is actually indeterminate. Only then compare numerator/denominator rates of change.','Is this really an indeterminate form before we use the rule?'],
[11,'Riemann Sums and the Definite Integral',58,'riemann','To approximate area under a curve with rectangle sums and develop the definite integral from that idea.','Scheduled just before the definite integral is formally introduced.','guided','Graph paper, rectangles/strips, calculator.','Cover the region under a curve with a few rectangles, estimate area, then use more/narrower rectangles and compare.','What changes when the rectangles get narrower?'],
[12,'Area Functions',65,'accumulation','To view area under a curve as a function, extend to accumulation functions, and conjecture about their derivatives.','Requires a good grasp of function/derivative relationships; intended before the Fundamental Theorem of Calculus.','later','Graphing tool; shaded-area sketches.','Let the right endpoint move. Track accumulated area as a new output. Compare how fast accumulated area grows with the height of the original graph.','What controls how quickly accumulated area is growing?'],
[13,'Average Value of a Function',69,'averagevalue','To develop average value of a continuous function and understand it geometrically.','After the Fundamental Theorem of Calculus; also uses area between curves.','later','Graph paper; equal-area rectangle sketch.','Compare the area under a varying graph with a rectangle of the same width. Adjust rectangle height until the areas match.','What constant height would give the same total area?'],
[14,'Arc Length',77,'arclength','To approximate arc length with straight segments and compute arc length using an integral.','After the theory of the definite integral.','later','String, ruler, plotted curve.','Approximate the curve by a few straight chords, add their lengths, then use more shorter chords.','Why should more, shorter segments improve the estimate?'],
[15,'A Mystery Function',84,'mystery','To investigate shrinking/stretching, define a function by area under a curve, and identify a function from its properties.','After both derivative and integral have been introduced.','later','Graphing tool; area sketches.','Treat the unknown function like a detective problem. Gather properties from transformations and accumulated area before naming it.','What properties must the mystery function satisfy?'],
[16,'Exploring Exponentials',89,'exponential','To investigate derivatives of exponential functions and define an exponential function via a limit and a series.','Any time after the derivative is defined.','later','Graphing tool; tables of repeated multiplication.','Compare several exponential bases and their local growth. Look for the special base whose rate of change matches its value.','Which exponential seems to grow at a rate equal to itself?'],
[17,'Patterns of Integrals',93,'integralpatterns','To recognize families of antiderivatives and draw conclusions from patterns of results.','After the indefinite integral is defined; uses exponential/log functions and later partial fractions.','later','Pattern table of integrands and antiderivatives.','Compute or inspect several related antiderivatives. Cover constants at first and focus on the structural pattern.','What part of the answer keeps changing in a predictable way?'],
[18,'Numerical Integration',97,'numericalint','To understand the geometry of the Trapezoid Rule and Simpson’s Rule and compare their convergence with Riemann sums.','After the integral, Riemann sums, and the Fundamental Theorem of Calculus.','later','Graph paper; trapezoid cutouts; calculator.','Approximate the same area three ways. Keep the number of subintervals fixed so only the shape of the approximation changes.','Which approximation follows the curve more faithfully, and why?'],
[19,'Becoming Secure with Sequences',106,'sequences','To think qualitatively about sequence behavior, important limits, and different rates of growth.','Just after limits of sequences are introduced.','bridge','Number cards or plotted sequence points.','Plot terms as separate points. Ask whether they settle, oscillate, or escape, then compare how quickly different sequences grow.','What is the long-term behavior: settling, oscillating, or growing without bound?'],
[20,'Getting Serious about Series',111,'series','To understand convergence through partial sums, explore p-series, harmonic growth, and rearrangement of alternating series.','Introduces or reinforces convergence of infinite series.','later','Partial-sum table; calculator.','Never start with “infinite.” Add the first few terms, then track the running total. Ask whether those totals settle.','What are the partial sums doing as we add more terms?'],
[21,'Limit Comparison Test',116,'comparison','To examine the Limit Comparison Test and its proper use.','Just after the Limit Comparison Test is introduced.','later','Two sequence tables or graphs.','Compare two positive terms by their ratio. Focus on whether that ratio approaches a finite nonzero constant.','Do these two term sizes behave like constant multiples of each other?'],
[22,'Approximating Functions by Polynomials',120,'polynomialapprox','To introduce one function approximating another and prepare for Taylor polynomials/series.','Intended before Taylor polynomials; requires familiarity with the exponential function.','bridge','Graphing tool with multiple curves.','Match a simple polynomial to a function near one point. Zoom out gradually and watch where the approximation stops being good.','Where is this polynomial a good imitation, and where does it fail?'],
[23,'Radius of Convergence for Power Series',124,'radius','To get graphical evidence for intervals/radii of convergence of power series.','After root or ratio tests for radius of convergence.','later','Graphing tool; center-and-radius sketch.','Plot partial sums near and farther from the center. Mark the boundary where behavior changes from stable approximation to failure.','How far from the center does the series keep behaving well?'],
[24,'Polar Equations',132,'polar','To connect polar graphs with angle values and develop slope/angle ideas in polar coordinates.','After polar coordinates and parametrization have been discussed.','later','Polar grid; rotating ray; graphing tool.','Build points by “turn then travel”: choose angle first, then radius. Compare how the same function rule behaves in rectangular and polar views.','At this angle, which direction do we face and how far do we travel?'],
[25,"Differential Equations and Euler's Method",137,'euler','To use differential equations as models and approximate solutions numerically with Euler’s Method.','Can reinforce differential equations or introduce their numerical solution.','later','Slope-field sketch; ruler; calculator.','Start at one known point. Use the prescribed slope for one small step, recalculate the slope, and repeat.','If the slope here is known, where should the next tiny step land?'],
[26,'Shapes of Surfaces',144,'surfaces','To understand a surface from x/y cross-sections and analyze critical-looking points graphically.','At the beginning of functions of several variables; does not require partial derivatives.','guided','Modeling clay or stacked contour/cross-section sketches; 3D grapher optional.','Slice a surface in one direction, then the other. Reconstruct the 3D shape from the family of 2D cross-sections.','What 3D shape is consistent with both sets of slices?']
];

const CALC_LABS=CRAW.map((r,i)=>{
 const [n,title,start,type,goal,timing,readiness,materials,doit,say]=r;
 const end=i<CRAW.length-1?CRAW[i+1][2]-1:152;
 return {id:`calc-${n}`,n,title,start,end,pdfStart:start+CALC_BOOK.offset,pdfEnd:end+CALC_BOOK.offset,type,goal,timing,readiness,materials,doit,say};
});

function calcLoad(){try{return JSON.parse(localStorage.getItem(CALC_KEY)||'{}')}catch(e){return {}}}
let CD=calcLoad(); if(!CD.progress)CD.progress={};
function calcSave(){localStorage.setItem(CALC_KEY,JSON.stringify(CD))}
function cp(id){return CD.progress[id]||(CD.progress[id]={level:1,attempts:0,streak:0,secure:false,last:null})}
function crand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function cpick(a){return a[crand(0,a.length-1)]}
function cq(text,answer,hint=''){return {text,answer,hint}}
function calcPdf(l){return `/api/lesson-pdf?id=${encodeURIComponent(CALC_BOOK.id)}&start=${l.pdfStart}&end=${l.pdfEnd}`}
function calcPages(l){return `Book pp. ${l.start}–${l.end} · PDF pp. ${l.pdfStart}–${l.pdfEnd}`}
function readinessLabel(r){return r==='guided'?'Good as guided preview':r==='bridge'?'Bridge / use selectively':'Later — prerequisite dependent'}

let CL=null,CQ=null;

function calcQuestion(l,level){
 level=Math.max(1,Math.min(4,level||1));
 switch(l.type){
  case 'graph': {let a=cpick([1,2,3]),b=cpick([-4,-2,0,2,4]);return cq(`Graph y = ${a}x² ${b>=0?'+ '+b:'− '+Math.abs(b)} and then change only the constant term by +2. What changes?`,'The graph shifts vertically by 2; its shape stays the same.','Predict before graphing.');}
  case 'limits': {let a=cpick([1,2,3]);return cq(`For f(x)=(x²−${a*a})/(x−${a}), what value does f(x) approach as x gets close to ${a}?`,2*a,'Use x-values just below and above the target; do not substitute the target first.');}
  case 'zoom': return cq('Open y = |x| and zoom closely around x = 0. Does the graph become one straight line at the point?','No. The left and right slopes remain different.','Compare with y=x² at x=0.');
  case 'derivative': {let x=cpick([1,2,3]),h=level<3?0.5:0.1;return cq(`For f(x)=x², estimate the secant slope from x=${x} to x=${x+h}. What slope should it approach as h→0?`,2*x,'Slope = [f(x+h)−f(x)]/h.');}
  case 'ivt': return cq('A continuous graph has f(1)=−3 and f(4)=5. Must it cross y=0 somewhere between x=1 and x=4?','Yes.','Now ask what changes if the graph has a jump.');
  case 'fprime': return cq('A smooth function is increasing, then has a local maximum, then decreases. What signs should its derivative have?','positive → 0 → negative','Reason from the motion of the original graph.');
  case 'chain': return cq('For y=(3x+1)², identify the inside function and outside function before differentiating.','Inside: 3x+1. Outside: u².','Do not compute until both layers are named.');
  case 'sensitivity': return cq('Two functions change by about 0.2 and 5 when x increases by 0.1. Which is more sensitive near that point?','The one changing by 5.','Compare output-change per same input-change.');
  case 'newton': return cq('For y=x²−2, start with x=1.5. Draw the tangent there. Should its x-intercept be closer to √2 than 1.5?','Yes; Newton’s method uses that intercept as the next guess.','The point is the geometric move, not memorizing a formula first.');
  case 'lhopital': return cq('Before doing anything else: as x→0, what form does sin x / x have by direct substitution?','0/0, an indeterminate form.','Classify first; rule second.');
  case 'riemann': {let n=cpick(level<3?[2,4]:[4,8]);return cq(`On 0≤x≤2 under y=x, split the interval into ${n} equal pieces. What happens to a rectangle-sum estimate as you use more, narrower rectangles?`,'It approaches the triangular area 2.','Focus on convergence of the estimate.');}
  case 'accumulation': return cq('Let A(x) mean area under y=t from 0 to x. Near x=3, should A(x) be growing slowly or quickly compared with near x=1?','More quickly near x=3 because the graph height is larger.','Connect accumulation rate with current height.');
  case 'averagevalue': return cq('A function is 2 for half an interval and 6 for the other half. What constant height gives the same total area?','4','Treat average value as an equal-area rectangle.');
  case 'arclength': return cq('A curved path is approximated by 3 chords, then 12 shorter chords. Which estimate should usually be closer to the true arc length?','The 12-chord estimate.','More segments follow the curve more closely.');
  case 'mystery': return cq('If an accumulated-area function A(x) is built from a positive graph, should A(x) decrease anywhere?','No; it should increase wherever the underlying graph is positive.','Use properties to identify the mystery function.');
  case 'exponential': return cq('Compare y=2^x and y=3^x near x=0. Which has the steeper local growth?','3^x','Graph first; the formal derivative can come later.');
  case 'integralpatterns': return cq('Inspect ∫x dx, ∫x² dx, ∫x³ dx. What happens to the power in each antiderivative?','The exponent increases by 1.','Ignore constant factors first and notice structure.');
  case 'numericalint': return cq('For a curved graph on the same subintervals, which uses more shape information: rectangles or trapezoids?','Trapezoids.','Explain geometrically before comparing formulas.');
  case 'sequences': {let r=cpick([0.5,0.8]);return cq(`What is the long-term behavior of 1, ${r}, ${(r*r).toFixed(2)}, ${(r*r*r).toFixed(3)}, …?`,'It converges to 0.','Describe behavior before calculating many terms.');}
  case 'series': return cq('For 1 + 1/2 + 1/4 + 1/8 + …, what do the running partial sums appear to approach?','2','Track partial sums, not isolated terms.');
  case 'comparison': return cq('If aₙ/bₙ approaches 3, do aₙ and bₙ have comparable long-term size?','Yes; they behave like constant multiples.','The key is a finite positive nonzero ratio.');
  case 'polynomialapprox': return cq('A polynomial approximation matches a function very closely near x=0 but separates farther away. Where should we trust it most?','Near the center x=0.','Zoom in and out to see the local nature of the approximation.');
  case 'radius': return cq('A power-series approximation behaves well for |x−2|<3 and poorly beyond. What is the observed radius?','3','Radius means distance from the center.');
  case 'polar': return cq('In polar coordinates, what point do r=3, θ=90° describe?','3 units straight up from the origin.','Turn first, travel second.');
  case 'euler': return cq('At a point, a differential equation says slope = 2. With step size 0.1, about how much should y change in one Euler step?','0.2','change ≈ slope × step size.');
  case 'surfaces': return cq('Every horizontal x-slice of a surface looks like an upward parabola, while y-slices do too. What familiar bowl-like surface might this suggest?','A paraboloid.','Reconstruct 3D shape from 2D slices.');
 }
 return cq('Use the next problem on the source pages and ask Zara to state a prediction before calculating.','Use the source result.');
}

function renderCalculusHome(){
 homeBtn.onclick=renderProfiles;
 const grouped=[
  ['Intuitive foundations',CALC_LABS.slice(0,5)],
  ['Derivative ideas & applications',CALC_LABS.slice(5,10)],
  ['Integral ideas',CALC_LABS.slice(10,18)],
  ['Sequences, series & approximation',CALC_LABS.slice(18,23)],
  ['Further calculus',CALC_LABS.slice(23,26)]
 ];
 screen.innerHTML=`<div class="crumbs"><button class="text-link" id="cback">Math profiles</button><span>›</span><span>Discovery Calculus</span></div>
 <div class="eyebrow">ZARA · LEARNING BY DISCOVERY</div><h2>Discovery Calculus</h2>
 <p class="lead">This book is an undergraduate calculus lab manual, not an elementary sequence. For Zara, I am using it as guided mathematical exploration: intuitive labs can be previewed now; prerequisite-heavy labs are clearly marked for later rather than being pushed prematurely.</p>
 <div class="card soft"><div class="label">HOW THIS PROFILE WORKS</div><p class="script">Notice → predict → experiment/graph → explain → generalize. The book itself is built around students discovering ideas through guided questions and technology rather than being told the result first.</p></div>
 ${grouped.map(([name,ls])=>`<div class="label" style="margin-top:18px">${name.toUpperCase()}</div><div class="lesson-list">${ls.map(l=>{let p=cp(l.id);return `<button class="lesson-tile" data-calc="${l.id}"><div><strong>${l.n}. ${l.title}</strong><span>Book pp. ${l.start}–${l.end} · ${readinessLabel(l.readiness)}</span></div><span class="status ${p.secure?'mastered':''}">${p.secure?'Secure':p.attempts?`Level ${p.level}`:'Not started'}</span></button>`}).join('')}</div>`).join('')}
 <div class="home-actions"><button id="cprogress" class="quiet">View Zara's calculus exploration</button></div>`;
 document.getElementById('cback').onclick=renderProfiles;
 document.querySelectorAll('[data-calc]').forEach(b=>b.onclick=()=>renderCalcLab(b.dataset.calc));
 document.getElementById('cprogress').onclick=renderCalcProgress;
}

function renderCalcLab(id){
 const l=CALC_LABS.find(x=>x.id===id),p=cp(id); CL=l;
 screen.innerHTML=`<div class="eyebrow">DISCOVERY CALCULUS · LAB ${l.n}</div><h2>${l.title}</h2>
 <div class="card soft page-card"><div class="label">SOURCE PAGES</div><strong>${calcPages(l)}</strong><div class="page-actions"><a class="page-link primary" href="${calcPdf(l)}" target="_blank" rel="noopener">Open only these lab pages</a><a class="page-link quiet" href="${CALC_BOOK.drive}" target="_blank" rel="noopener">Open whole book</a></div></div>
 <div class="card"><div class="label">SOURCE GOAL</div><p class="script">${l.goal}</p></div>
 <div class="card ${l.readiness==='later'?'warn':''}"><div class="label">READINESS</div><p class="script"><strong>${readinessLabel(l.readiness)}</strong></p><p class="mini" style="margin-top:6px">Book's own timing: ${l.timing}</p></div>
 <div class="card"><div class="label">SET UP</div><p class="script">${l.materials}</p></div>
 <div class="card"><div class="label">DO</div><p class="script">${l.doit}</p></div>
 <div class="card soft"><div class="label">ASK ZARA</div><p class="script">${l.say}</p></div>
 <div class="actions"><button id="ctry" class="primary">Give me a discovery question</button><button id="csource" class="secondary">Use a source problem instead</button></div>`;
 document.getElementById('ctry').onclick=()=>renderCalcQuestion(l,p.level);
 document.getElementById('csource').onclick=()=>renderCalcSourcePrompt(l);
}

function renderCalcSourcePrompt(l){
 CL=l; CQ={text:'Use the next unsolved problem on the lab pages. Before Zara calculates or graphs, ask her for a prediction and one reason.',answer:'Use the source problem/graph.',hint:'Do not reveal the lab conclusion first.'};
 renderCalcQuestionCard(l);
}
function renderCalcQuestion(l,level){CL=l;CQ=calcQuestion(l,level);renderCalcQuestionCard(l)}
function renderCalcQuestionCard(l){
 const p=cp(l.id);
 screen.innerHTML=`<div class="eyebrow">${l.title} · EXPLORATION LEVEL ${p.level}</div>
 <div class="card soft page-card"><div class="label">SOURCE</div><strong>${calcPages(l)}</strong><div class="page-actions"><a class="page-link secondary" href="${calcPdf(l)}" target="_blank">Open lab pages</a></div></div>
 <div class="question-box"><div class="label">ASK ZARA</div><div class="q" style="font-size:1.35rem">${CQ.text}</div><div class="hint">${CQ.hint||''}</div></div>
 <div class="card soft"><div class="label">PARENT CHECK</div><p class="script"><strong>${CQ.answer}</strong></p></div>
 <p class="focus">What happened?</p><div class="outcomes">
 <button data-co="confident"><strong>Got it + could explain</strong><span class="mini">She predicted/noticed the idea and could say why.</span></button>
 <button data-co="prompt"><strong>Got it after a prompt</strong></button>
 <button data-co="graph"><strong>Graph/table right, explanation shaky</strong></button>
 <button data-co="notation"><strong>Lost in the notation</strong></button>
 <button data-co="prereq"><strong>Prerequisite gap</strong></button>
 <button data-co="different"><strong>Different valid insight</strong></button>
 <button data-co="wrong"><strong>Wrong / unsure</strong></button></div>`;
 document.querySelectorAll('[data-co]').forEach(b=>b.onclick=()=>renderCalcIntervention(b.dataset.co));
}

function calcUpdate(out){
 let p=cp(CL.id),event='stay';p.attempts++;p.last=out;
 if(out==='confident'){p.streak++;if(p.streak>=2){if(p.level<4){p.level++;p.streak=0;event='levelup'}else{p.secure=true;p.streak=0;event='secure'}}}
 else p.streak=0;
 calcSave();return event;
}
function calcNext(l){let i=CALC_LABS.findIndex(x=>x.id===l.id);return CALC_LABS[i+1]||null}
function renderCalcIntervention(out){
 const l=CL,e=calcUpdate(out),p=cp(l.id),n=calcNext(l);let title='',body='',tone='';
 if(out==='confident'){
  if(e==='secure'){title='Secure for this exploration';body='Zara has explained the idea confidently twice at Level 4. Stop here. This means the discovery idea is secure for now; it does not mean she has completed a formal calculus course.';tone='good'}
  else if(e==='levelup'){title=`Move to Level ${p.level}`;body='Two confident explanations were enough. The next question asks for more prediction, explanation, or transfer—not just harder arithmetic.';tone='good'}
  else{title='One confirming question';body='Ask one more at this level. If she can explain it again without rescue, move up.'}
 }
 if(out==='prompt'){title='Stay on the same idea';body='Use a nearby example. Give the same visual/graph setup but one fewer verbal cue. The goal is for Zara to notice the structure before you name it.'}
 if(out==='graph'){title='Turn the picture into a sentence';body='Do not add more calculations. Point to the graph/table and ask: “What does this picture say in words?” Then ask for one specific piece of evidence from the picture.';tone='warn'}
 if(out==='notation'){title='Strip away notation';body='Keep the idea and remove symbolic load. Use a graph, table, motion, area, or physical sketch first. Reintroduce one symbol only after Zara can describe what is happening in ordinary language.';tone='warn'}
 if(out==='prereq'){title='Save this lab for later';body=`This lab depends on prior mathematics. The book itself places it ${l.timing.charAt(0).toLowerCase()+l.timing.slice(1)} Do not turn the prerequisite into a side lesson just to finish the page; mark it for later and choose an earlier guided-preview lab.`;tone='warn'}
 if(out==='different'){title='Keep the valid insight';body='Ask Zara to test her idea against another example. If it survives, keep it. Then compare it with what the source lab is trying to reveal.'}
 if(out==='wrong'){title='Return to observation';body='Do not explain the theorem. Ask her to generate or graph one simpler example, describe exactly what she sees, and make a new prediction. If the obstacle is prerequisite knowledge, use “Prerequisite gap” instead.';tone='warn'}
 let tracker=p.secure?`<div class="mastery-box"><strong>Done for now.</strong><span>Discovery idea secure.</span></div>`:`<div class="mastery-line"><strong>Level ${p.level}/4</strong><span>${p.streak}/2 confident explanations</span></div>`;
 screen.innerHTML=`<div class="eyebrow">NEXT PARENT MOVE</div><h2>${title}</h2>${tracker}<div class="result ${tone}"><div class="route-title">${title}</div><p class="route-copy">${body}</p></div>
 <div class="card soft page-card"><div class="label">SOURCE LAB</div><strong>${calcPages(l)}</strong><div class="page-actions"><a class="page-link secondary" href="${calcPdf(l)}" target="_blank">Open lab pages</a></div></div>
 <div class="toolbar">${p.secure&&n?`<button id="cnext" class="primary">Next lab: ${n.title}</button>`:`<button id="cagain" class="primary">${e==='levelup'?`Try Level ${p.level}`:'Another question'}</button>`}<button id="creteach" class="secondary">Teaching setup</button><button id="chome" class="quiet">Back to Discovery Calculus</button></div>`;
 let a=document.getElementById('cagain');if(a)a.onclick=()=>renderCalcQuestion(l,p.level);
 let nn=document.getElementById('cnext');if(nn)nn.onclick=()=>renderCalcLab(n.id);
 document.getElementById('creteach').onclick=()=>renderCalcLab(l.id);
 document.getElementById('chome').onclick=renderCalculusHome;
}

function renderCalcProgress(){
 screen.innerHTML=`<div class="eyebrow">ZARA · DISCOVERY CALCULUS</div><h2>Exploration map</h2><p class="lead">“Secure” means Zara can explain the discovery idea at this level. Prerequisite-heavy labs can remain untouched until the surrounding mathematics is ready.</p>${CALC_LABS.map(l=>{let p=cp(l.id);return `<div class="progress-row"><div><strong>${l.n}. ${l.title}</strong><div class="mini">${calcPages(l)} · ${readinessLabel(l.readiness)}</div></div><span class="status ${p.secure?'mastered':''}">${p.secure?'Secure':p.attempts?`Level ${p.level} · ${p.streak}/2`:'Not tried'}</span></div>`}).join('')}`;
}

window.renderCalculusHome=renderCalculusHome;
