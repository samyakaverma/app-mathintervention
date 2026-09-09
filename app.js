const screen = document.getElementById('screen');
const homeBtn = document.getElementById('homeBtn');
const STORAGE_KEY = 'mayaMathIntervention.v4';

const BOOKS = {
  '2A': {
    title: 'Primary Mathematics 2A — Standards Edition',
    id: '1o2yzhOynx5LMU2fi7GVig2fU7ItN5BIO',
    drive: 'https://drive.google.com/file/d/1o2yzhOynx5LMU2fi7GVig2fU7ItN5BIO/view',
    note: 'Printed workbook page and PDF page are the same in this scan.'
  },
  '2B': {
    title: 'Primary Mathematics 2B — Common Core Edition',
    id: '17HrcDejEt7-zzI6ZwXpKjz86HHu8lfp_',
    drive: 'https://drive.google.com/file/d/17HrcDejEt7-zzI6ZwXpKjz86HHu8lfp_/view',
    note: 'The PDF scan is two pages ahead of the printed workbook numbering.'
  }
};

const units = [
  {id:'2a-u1',book:'2A',title:'Unit 1 — Numbers to 1000',pages:'7–30',summary:'Build place value, compare numbers, and move by 1, 10 and 100.'},
  {id:'2a-u2',book:'2A',title:'Unit 2 — Addition & Subtraction',pages:'31–71',summary:'Part–whole thinking, calculation with and without renaming, and mixed problem solving.'},
  {id:'2a-u3',book:'2A',title:'Unit 3 — Length',pages:'72–82',summary:'Measure, estimate, compare, and choose sensible units.'},
  {id:'2a-u4',book:'2A',title:'Unit 4 — Weight',pages:'83–91',summary:'Read weights, choose units, compare and solve weight problems.'},
  {id:'2a-u5',book:'2A',title:'Unit 5 — Multiplication & Division',pages:'92–114',summary:'Equal groups, multiplication, two meanings of division, and inverse relationships.'},
  {id:'2a-u6',book:'2A',title:'Unit 6 — Tables of 2 and 3',pages:'115–168',summary:'Build ×2 and ×3 from patterns and use division as the inverse.'},

  {id:'2b-u6',book:'2B',title:'Unit 6 — Addition & Subtraction',pages:'WB 7–27 · PDF 9–29',summary:'Mental strategies: complements, place-value moves, chunking and compensation.'},
  {id:'2b-u7',book:'2B',title:'Unit 7 — Multiplication & Division',pages:'WB 28–65 · PDF 30–67',summary:'Build ×4, ×5 and ×10, then division and remainders.'},
  {id:'2b-u8',book:'2B',title:'Unit 8 — Money',pages:'WB 66–97 · PDF 68–99',summary:'Money notation, make $1/$10, calculation and compensation.'},
  {id:'2b-u9',book:'2B',title:'Unit 9 — Fractions',pages:'WB 98–119 · PDF 100–121',summary:'Equal parts, comparison, making a whole, and number-line fractions.'},
  {id:'2b-u10',book:'2B',title:'Unit 10 — Time',pages:'WB 120–128 · PDF 122–130',summary:'Read clocks in five-minute steps and connect past/to language.'},
  {id:'2b-u11',book:'2B',title:'Unit 11 — Tables & Graphs',pages:'WB 129–148 · PDF 131–150',summary:'Read scaled picture graphs, tables, bars and line plots.'},
  {id:'2b-u12',book:'2B',title:'Unit 12 — Geometry',pages:'WB 149–168 · PDF 151–170',summary:'Solids, composing shapes, patterns and polygons.'}
];

function L(id,unit,book,title,wb,pdf,gen,goal,materials,teach,script,model,down,parentPages=''){
  return {id,unit,book,title,wb,pdf,gen,goal,materials,teach,script,model,down,parentPages};
}

const lessons = [
  // ---------- 2A ----------
  L('2a-group','2a-u1','2A','See Tens and Hundreds','7–9','7–9','placeBuild',
    'Maya sees a quantity as organized groups rather than a long count.',
    'Base-ten blocks, bundled sticks, bead bars, or coins in groups of 10.',
    'Build the quantity in tens first, then ones. Say the grouped amount before writing the numeral.',
    '“How many full tens can you see? How many ones are left?”',
    '58 = 5 tens + 8 ones',
    'Use fewer than 50 objects and physically bundle each set of 10.','179–180'),

  L('2a-place','2a-u1','2A','Hundreds, Tens, Ones','10–23','10–23','placeValue',
    'Read and build three-digit numbers flexibly.',
    'Hundred flats, ten rods, unit cubes, and place-value cards.',
    'Build the number, separate the places, then reassemble it. Move between numeral, words, and expanded form.',
    '“What does this digit mean here?”',
    '392 = 300 + 90 + 2',
    'Return to two-digit tens-and-ones builds before adding hundreds.','179–180'),

  L('2a-compare','2a-u1','2A','Compare & Order Numbers','24–25, 28–30','24–25, 28–30','compare',
    'Compare numbers by place value rather than by guessing from digit shapes.',
    'Place-value cards or base-ten blocks; > and < cards.',
    'Compare hundreds first. Only if they tie, look at tens; then ones.',
    '“Where is the first place these numbers are different?”',
    '943 > 934 because the tens are 4 tens vs 3 tens',
    'Build both numbers side by side and compare one column at a time.','179–180'),

  L('2a-moreless','2a-u1','2A','1, 10, 100 More or Less','12–14, 26–27','12–14, 26–27','moreLess',
    'Change one place while holding the other places stable.',
    'Base-ten blocks and a place-value mat.',
    'Add or remove one unit, one ten, or one hundred and ask which place changed.',
    '“What changed? What stayed exactly the same?”',
    '563 + 10 = 573',
    'Physically add one ten rod and do not touch the hundreds or ones.','179–180'),

  L('2a-families','2a-u2','2A','Part–Whole & Fact Families','31–33','31–33','factFamily',
    'Connect addition and subtraction as inverse descriptions of the same whole and parts.',
    'Counters and a three-circle number-bond mat.',
    'Build two parts, join to make the whole, then cover a different part and reverse the operation.',
    '“If I know the whole and one part, how can I find the other part?”',
    '7 + 6 = 13 ↔ 13 − 7 = 6',
    'Use totals within 10 before moving to teen totals.','181–183'),

  L('2a-no-rename','2a-u2','2A','Add & Subtract Without Renaming','34–45','34–45','noRename',
    'Combine or remove place-value quantities without exchanging.',
    'Base-ten blocks on a hundreds–tens–ones mat.',
    'Line up places physically. Add hundreds to hundreds, tens to tens, ones to ones.',
    '“Do we have enough in each place without trading?”',
    '410 + 56 = 466',
    'Use two-digit examples with no exchange, then three-digit examples.','181–183'),

  L('2a-scale','2a-u2','2A','Same Fact, Bigger Place','38, 42','38, 42','scaleFact',
    'See 5 + 3, 50 + 30 and 500 + 300 as the same unit relationship at different place values.',
    'Unit cubes, ten rods and hundred flats.',
    'Show the three problems together only after Maya has built each one separately.',
    '“What stayed the same in these three facts? What changed?”',
    '5 + 3 = 8 → 50 + 30 = 80 → 500 + 300 = 800',
    'Keep only units and tens until she sees that 5 units + 3 units mirrors 5 tens + 3 tens.','181–183'),

  L('2a-rename-add','2a-u2','2A','Addition with Renaming','46–56','46–56','renameAdd',
    'Understand carrying as physically making a new ten or hundred, not as a written trick.',
    'Base-ten blocks and place-value mat.',
    'Add ones first. When there are 10 or more ones, physically exchange 10 ones for 1 ten. Do the same with tens.',
    '“Can these 10 ones become something easier to hold?”',
    '65 + 6: 5 ones + 6 ones = 11 ones → 1 ten + 1 one',
    'Use one exchange only. Leave the exchanged ten visibly in the tens column.','181–183'),

  L('2a-rename-sub','2a-u2','2A','Subtraction with Renaming','57–66','57–66','renameSub',
    'Understand borrowing as exchanging one larger unit for ten smaller units.',
    'Base-ten blocks and place-value mat.',
    'If there are not enough ones, exchange one ten for ten ones. Keep the exchange visible before subtracting.',
    '“We do not have enough ones. What can one ten become?”',
    '62 − 43: exchange 1 ten → 5 tens and 12 ones',
    'Use one exchange only before trying problems needing exchanges in more than one place.','181–183'),

  L('2a-mixedaddsub','2a-u2','2A','Choose Addition or Subtraction','67–71','67–71','chooseAddSub',
    'Choose the operation from the structure of the story, not from keywords.',
    'Counters/bar model strips; pencil and paper.',
    'Identify whole and parts first. Ask whether the unknown is the whole or a part.',
    '“What do we know? What is missing: the whole, or one part?”',
    '296 coffee, 158 tea; “how many more?” → compare by subtraction',
    'Act out one story and draw a part–whole bar before calculating.','181–183'),

  L('2a-length-units','2a-u3','2A','Choose a Length Unit','72–75, 78','72–75, 78','lengthUnit',
    'Choose a sensible unit based on the size of the object.',
    'Ruler, meter tape, inch ruler, yardstick if available.',
    'Estimate first, then measure. Compare what happens when the same object is measured in a smaller vs larger unit.',
    '“Would centimeters or meters give a sensible number for this?”',
    'Book → centimeters/inches; room → meters/feet',
    'Offer only two unit choices and physically show the size of one unit.','185–186'),

  L('2a-length-measure','2a-u3','2A','Measure & Compare Length','73–78','73–78','lengthMeasure',
    'Measure from zero accurately and compare differences in length.',
    'Ruler, tape measure, string.',
    'Align the object with zero; for curves, trace with string then straighten the string.',
    '“Where does measuring start? What is the difference between the two lengths?”',
    'A line 9 cm and a line 6 cm differ by 3 cm',
    'Measure straight objects first and mark the zero point physically.','185–186'),

  L('2a-weight','2a-u4','2A','Read, Estimate & Compare Weight','83–91','83–91','weight',
    'Choose weight units and compare weights meaningfully.',
    'Kitchen scale; 1 g, 1 oz, 1 lb, 1 kg reference objects where practical.',
    'Estimate by comparing to a familiar reference, then measure/check.',
    '“Would this make sense in grams or kilograms?”',
    'A bicycle is measured in pounds/kilograms, not ounces/grams',
    'Use two clearly different objects and one unit system at a time.','187–188'),

  L('2a-equalgroups','2a-u5','2A','Multiplication Means Equal Groups','92–99','92–99','equalGroups',
    'See multiplication as a number of equal groups, not just memorized facts.',
    'Counters, bowls/trays, array mat.',
    'Build equal groups and say both “groups of” language and the multiplication sentence.',
    '“How many groups? How many in each group?”',
    '4 groups of 5 = 4 × 5',
    'Use only 2–4 groups with small group sizes.','189–190'),

  L('2a-commute','2a-u5','2A','Turn the Array','96–97','96–97','commute',
    'Understand why a × b and b × a have the same total.',
    'Counters arranged in rectangular arrays.',
    'Build an array, rotate it, and recount rows/columns without moving individual counters.',
    '“Did the total change when we turned the array?”',
    '5 × 3 = 3 × 5',
    'Use a small 2 × 3 array and physically rotate the paper.','189–190'),

  L('2a-share','2a-u5','2A','Division: Share Equally','100–102, 106','100–102, 106','shareDivide',
    'Understand division when the number of groups is known and the amount in each group is unknown.',
    'Counters and bowls.',
    'Deal one counter to each bowl repeatedly until none remain.',
    '“We know how many groups. How many will each group get?”',
    '24 ÷ 3 = 8',
    'Use 10 or 12 counters and two groups.','189–190'),

  L('2a-groupdivide','2a-u5','2A','Division: Make Groups','103–106','103–106','groupDivide',
    'Understand division when the group size is known and the number of groups is unknown.',
    'Counters and small hoops/circles.',
    'Make one complete group of the requested size at a time, then count groups.',
    '“We know how many belong in each group. How many full groups can we make?”',
    '30 ÷ 6 = 5 groups',
    'Use a small exact multiple with group size 2 or 3.','189–190'),

  L('2a-inverse','2a-u5','2A','Multiplication & Division Fact Family','107–110','107–110','mulDivFamily',
    'See multiplication and division as inverse descriptions of the same equal-group model.',
    'One array or equal-group setup.',
    'Keep the same model on the table while writing two multiplication and two division sentences.',
    '“How many different true number sentences describe this same model?”',
    '3 × 6 = 18; 6 × 3 = 18; 18 ÷ 3 = 6; 18 ÷ 6 = 3',
    'Use a 2 × 4 array first.','189–190'),

  L('2a-times2','2a-u6','2A','Build the 2s Table','115–129','115–129','times2',
    'Build ×2 from repeated pairs and neighboring facts.',
    'Pairs of socks, counters in pairs, bead bars.',
    'Touch each pair while counting 2,4,6… Then show that one more pair adds exactly 2.',
    '“If you know 2 × 6, what is one more pair?”',
    '2 × 7 = 2 × 6 + 2',
    'Stay with physical pairs and skip counting before asking isolated facts.','191–192'),

  L('2a-times3','2a-u6','2A','Build the 3s Table','130–147','130–147','times3',
    'Build ×3 from repeated groups of three and neighboring facts.',
    'Counters in groups of 3, tricycle pictures/objects, triangles.',
    'Touch each group while counting 3,6,9… Add or remove one visible group to derive a neighboring fact.',
    '“What happens if we add one more group of 3?”',
    '3 × 7 = 3 × 6 + 3',
    'Keep only five or fewer groups at first.','191–192'),

  L('2a-div2','2a-u6','2A','Divide by 2','148–151','148–151','div2',
    'Connect halving, pairs, and the ×2 facts.',
    'Counters paired into twos or two sharing bowls.',
    'Alternate between “share into 2 equal groups” and “make groups of 2” so Maya notices the two division meanings.',
    '“Are we finding how many in each group, or how many groups?”',
    '16 ÷ 2 = 8',
    'Use even quantities under 12 and keep pairs visible.','191–192'),

  L('2a-div3','2a-u6','2A','Divide by 3','152–162','152–162','div3',
    'Connect division by 3 to the ×3 table and equal groups.',
    'Counters and three bowls/groups.',
    'Build the related multiplication fact first when Maya is unsure.',
    '“What ×3 fact could help us?”',
    '21 ÷ 3 = 7 because 3 × 7 = 21',
    'Use exact facts within 3 × 5 first.','191–192'),

  // ---------- 2B ----------
  L('2b-bonds','2b-u6','2B','Find the Missing Part','7–8','9–10','missingPart',
    'Use part–whole relationships to find a missing addend or part.','Counters or a number-bond mat.',
    'Build the whole, hide one part, and ask for the missing part.','“What part is hiding?”','29 + ? = 36',
    'Use totals within 10 first.'),

  L('2b-make100','2b-u6','2B','Finish 100','9–10','11–12','make100',
    'Know complements to 100 so compensation does not overload working memory.','Base-ten hundred square, ten rods, units.',
    'Make the gap to 100 physically visible.','“How much more makes exactly 100?”','63 + ? = 100',
    'Go back to complements to 10, then whole tens to 100.'),

  L('2b-addplace','2b-u6','2B','Add by Place Value','11–14','13–16','addPlace',
    'Add whole ones, tens or hundreds without changing the other places.','Base-ten blocks.',
    'Move only the changing place.','“Which place changes?”','519 + 30',
    'Use +10 or +100 only.'),

  L('2b-splitadd','2b-u6','2B','Split & Hop — Addition','15','17','splitAdd',
    'Split an addend into chunks and keep the intermediate total visible.','Open number line or base-ten blocks.',
    'Add the tens chunk, stop and label the new total, then add the ones.','“What easy chunk can you add first?”','57 + 36 → +30 → +6',
    'Keep the intermediate total written rather than lowering the mathematics.'),

  L('2b-almostadd','2b-u6','2B','Almost 100 — Addition','16–17','18–19','almostAdd',
    'Understand +99/+98 as +100 then compensate.','Base-ten blocks plus 1–2 “extra” counters.',
    'Turn 98/99 into 100 and leave the extra counters visible until paid back.','“How much extra did we add?”','246 + 98 → 346 − 2',
    'Check gap-to-100, +100, and −1/−2 separately.'),

  L('2b-subplace','2b-u6','2B','Subtract by Place Value','18–21','20–23','subPlace',
    'Subtract ones, tens or hundreds while preserving the other places.','Base-ten blocks.',
    'Remove one place-value chunk at a time.','“What are we taking away?”','748 − 90',
    'Return to removing one ten or one hundred.'),

  L('2b-splitsub','2b-u6','2B','Split & Hop — Subtraction','22–23','24–25','splitSub',
    'Split the subtrahend and preserve the intermediate total.','Open number line.',
    'Subtract tens, stop and label; subtract ones.','“What easy chunk can we take away first?”','68 − 25 → −20 → −5',
    'Write the middle number; this is a working-memory support.'),

  L('2b-almostsub','2b-u6','2B','Almost 100 — Subtraction','24–25','26–27','almostSub',
    'Understand −99/−98 as −100 then give back what was removed too much.','Base-ten blocks or number line.',
    'Take away 100 then return 1 or 2.','“Did we take too much or too little?”','467 − 98 → 367 + 2',
    'Physically remove 100 and return two counters.'),

  L('2b-times4','2b-u7','2B','Build the 4s Facts','28–35','30–37','times4',
    'Build ×4 through equal groups and neighboring facts.','Groups of 4 counters.',
    'Derive one fact from a nearby known fact by adding/removing one group of 4.','“What is one more group of 4?”','4 × 6 = 4 × 5 + 4',
    'Skip-count physically by fours.'),

  L('2b-times5','2b-u7','2B','Build the 5s Facts','42–45','44–47','times5',
    'Build ×5 from equal groups and neighboring facts.','Five-bars or counters.',
    'Add one group of 5 at a time.','“What is one more group of 5?”','5 × 7 = 5 × 6 + 5',
    'Count 5,10,15… with physical groups.'),

  L('2b-times10','2b-u7','2B','Build the 10s Facts','52–55','54–57','times10',
    'See multiplication by 10 as a number of tens.','Ten rods.',
    'Name the quantity as “n tens” before writing ×10.','“How many tens?”','8 × 10 = 80',
    'Build each fact from ten rods.'),

  L('2b-divrema','2b-u7','2B','Division & Remainders','38–41, 46–51, 56–59','40–43, 48–53, 58–61','divisionRemainder',
    'Make equal groups and interpret leftovers.','Counters and bowls.',
    'Build complete equal groups; leave leftovers outside.','“How many full groups? What is left?”','43 ÷ 5 = 8 remainder 3',
    'Use exact divisions before leftovers.'),

  L('2b-money','2b-u8','2B','Make $1 and $10','75–77','77–79','moneyComplement',
    'Use complements to find change to friendly money amounts.','Play money.',
    'Build the price and fill the gap to $1 or $10.','“What is missing to make exactly $1?”','75¢ + ? = $1',
    'Use 50¢, 75¢, 90¢ first.'),

  L('2b-moneyalmost','2b-u8','2B','Almost $1','83, 89–91','85, 91–93','moneyAlmost',
    'Use 99¢/95¢ compensation in addition and subtraction.','Play money and 1¢/5¢ markers.',
    'Change to a whole dollar and keep the adjustment visible.','“How close is this to a whole dollar?”','$2.45 + $0.99 → +$1 −1¢',
    'Return to make-$1 complements.'),

  L('2b-fraction','2b-u9','2B','Fractions: Equal Parts & Compare','98–110','100–112','fraction',
    'Read and compare fractions from equal-size wholes.','Fraction bars/circles.',
    'Keep the wholes the same size and compare the actual pieces.','“Are these wholes the same size? Which pieces are larger?”','1/4 vs 1/6',
    'Use only halves and fourths first.'),

  L('2b-wholefrac','2b-u9','2B','Fractions That Make a Whole','111–113','113–115','fractionWhole',
    'Find the missing fractional part to make 1 whole.','Fraction bars.',
    'Fill the missing physical space before writing the fraction.','“What piece completes the whole?”','3/8 + ? = 1',
    'Use halves and fourths.'),

  L('2b-time','2b-u10','2B','Read Time in 5-Minute Steps','120–128','122–130','time5',
    'Read minutes by counting five-minute intervals and connect past/to.','Analog teaching clock.',
    'Move the minute hand one number at a time and count 5s aloud.','“How many groups of 5 minutes from 12?”','7:15 = 15 minutes past 7',
    'Use :00, :15 and :30 before mixed five-minute times.'),

  L('2b-graphs','2b-u11','2B','Read Scaled Graphs','129–148','131–150','graphScale',
    'Interpret symbols/bars that represent more than one item.','Counters and a hand-drawn picture graph.',
    'Build the actual quantity, then replace equal groups with one symbol.','“What does one symbol stand for?”','1 symbol = 5 fish; 3 symbols = 15 fish',
    'Use one symbol = 2 first.'),

  L('2b-geometry','2b-u12','2B','Compose & Decompose Shapes','153–161','155–163','shapeCompose',
    'See a figure as made from simpler shapes and as a whole.','Paper shapes, tangrams, pattern blocks.',
    'Build the figure physically, then trace the internal boundaries.','“What smaller shapes could make this?”','rectangle + triangle + half-circle',
    'Use two shapes only.')
];

const state = loadState();
let currentLesson = null;
let currentQuestion = null;

function defaultProgress(){
  return Object.fromEntries(lessons.map(l => [l.id,{level:1,attempts:0,confident:0,help:0,notYet:0,last:null}]));
}
function loadState(){
  try{
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
    return {progress:{...defaultProgress(),...(raw.progress||{})},lastLesson:raw.lastLesson||null,activeBook:raw.activeBook||'2A'};
  }catch(e){ return {progress:defaultProgress(),lastLesson:null,activeBook:'2A'}; }
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rand(0,a.length-1)];}
function money(n){return '$'+n.toFixed(2);}
function firstPage(value){
  const m=String(value||'').match(/\d+/);
  return m?Number(m[0]):1;
}
function deepDriveUrl(book,page){
  const b=BOOKS[book];
  return `https://drive.google.com/uc?export=view&id=${b.id}#page=${page}`;
}
function pageRef(l){
  const b=BOOKS[l.book];
  const pp=l.wb===l.pdf?`Workbook/PDF pp. ${l.wb}`:`Workbook pp. ${l.wb} · PDF pp. ${l.pdf}`;
  const parent=l.parentPages?` · Parent “Math at Home” pp. ${l.parentPages}`:'';
  const pdfStart=firstPage(l.pdf);
  const parentStart=l.parentPages?firstPage(l.parentPages):null;
  return `<div class="card soft page-card"><div class="label">BOOK PAGES</div><strong>${pp}${parent}</strong><div class="page-actions"><a class="page-link primary" href="${deepDriveUrl(l.book,pdfStart)}" target="_blank" rel="noopener">Open at PDF p. ${pdfStart}</a>${parentStart?`<a class="page-link secondary" href="${deepDriveUrl(l.book,parentStart)}" target="_blank" rel="noopener">Parent page ${parentStart}</a>`:''}<a class="page-link quiet" href="${b.drive}" target="_blank" rel="noopener">Open whole book</a></div><div class="mini">If Google Drive ignores the page jump, the first button still opens the PDF itself; the exact page number stays shown here so you can type it into the viewer.</div></div>`;
}
function q(text,answer,hint=''){return {text,answer,hint};}

function generate(l,level){
  const g=l.gen; level=Math.max(1,Math.min(4,level||1));
  if(g==='placeBuild'){let n=level<3?rand(21,99):rand(101,999);return q(`Build ${n}`,`${Math.floor(n/100)} hundreds, ${Math.floor((n%100)/10)} tens, ${n%10} ones`,'Use blocks first; numeral second.');}
  if(g==='placeValue'){let n=rand(101,999);return q(`Show ${n} in expanded form`,`${Math.floor(n/100)*100} + ${Math.floor((n%100)/10)*10} + ${n%10}`);}
  if(g==='compare'){let a=rand(100,999),b=rand(100,999);return q(`${a}  ?  ${b}`,a>b?'>':a<b?'<':'=','Ask which place decides it.');}
  if(g==='moreLess'){let n=rand(120,879),step=pick([1,10,100]),op=Math.random()<.5?1:-1;return q(`${n} ${op>0?'+':'−'} ${step}`,n+op*step,'Ask which place should change.');}
  if(g==='factFamily'){let a=rand(2,9),b=rand(2,9),t=a+b;return q(`Make 4 facts from ${a}, ${b}, ${t}`,`${a}+${b}=${t}; ${b}+${a}=${t}; ${t}−${a}=${b}; ${t}−${b}=${a}`);}
  if(g==='noRename'){let a=rand(120,700), b=rand(11,99); while((a%10)+(b%10)>9 || Math.floor((a%100)/10)+Math.floor(b/10)>9){b=rand(11,99)} return q(`${a} + ${b}`,a+b,'No exchange should be needed.');}
  if(g==='scaleFact'){let a=rand(2,8),b=rand(1,9-a);return q(`${a}+${b}; ${a*10}+${b*10}; ${a*100}+${b*100}`,`${a+b}; ${(a+b)*10}; ${(a+b)*100}`,'Build the same relationship with units, tens, hundreds.');}
  if(g==='renameAdd'){let a=rand(24,89),b=rand(5,29); while((a%10)+(b%10)<10){b=rand(5,29)} return q(`${a} + ${b}`,a+b,'Exchange 10 ones for 1 ten.');}
  if(g==='renameSub'){let a=rand(52,98),b=rand(13,49); while(a<=b || a%10>=b%10){a=rand(52,98);b=rand(13,49)} return q(`${a} − ${b}`,a-b,'Exchange 1 ten for 10 ones.');}
  if(g==='chooseAddSub'){let a=rand(80,400),b=rand(20,a-10);return q(`Whole ${a}; known part ${b}; find the other part`,a-b,'Ask whether the unknown is a whole or a part.');}
  if(g==='lengthUnit'){return q(`Choose the better unit for a ${pick(['pencil','door height','swimming pool','book','room length'])}`,'Discuss: cm/in for small; m/ft/yd for large.');}
  if(g==='lengthMeasure'){let a=rand(5,20),b=rand(2,a-1);return q(`One object is ${a} cm. Another is ${b} cm. How much longer?`,a-b);}
  if(g==='weight'){return q(`Which is sensible for a ${pick(['cat','butterfly','watermelon','bicycle','sandwich'])}?`,'Choose g/kg or oz/lb based on size.');}
  if(g==='equalGroups'){let groups=rand(2,6),size=rand(2,8);return q(`${groups} groups of ${size}`,groups*size);}
  if(g==='commute'){let a=rand(2,6),b=rand(2,8);return q(`Build ${a} × ${b}, then turn the array`,`${a*b}; same as ${b} × ${a}`);}
  if(g==='shareDivide'){let groups=rand(2,5),each=rand(2,8),t=groups*each;return q(`Share ${t} equally into ${groups} groups`,each);}
  if(g==='groupDivide'){let size=rand(2,6),groups=rand(2,8),t=size*groups;return q(`Make groups of ${size} from ${t}`,groups);}
  if(g==='mulDivFamily'){let a=rand(2,6),b=rand(2,8),t=a*b;return q(`Make the fact family for ${a}, ${b}, ${t}`,`${a}×${b}=${t}; ${b}×${a}=${t}; ${t}÷${a}=${b}; ${t}÷${b}=${a}`);}
  if(g==='times2'){let n=rand(1,10);return q(`2 × ${n}`,2*n,'If unsure, use the previous ×2 fact +2.');}
  if(g==='times3'){let n=rand(1,10);return q(`3 × ${n}`,3*n,'If unsure, use the previous ×3 fact +3.');}
  if(g==='div2'){let n=rand(2,10),t=2*n;return q(`${t} ÷ 2`,n);}
  if(g==='div3'){let n=rand(2,10),t=3*n;return q(`${t} ÷ 3`,n);}
  if(g==='missingPart'){let whole=rand(12,60),part=rand(2,whole-2);return q(`${part} + ? = ${whole}`,whole-part);}
  if(g==='make100'){let a=level===1?pick([20,30,40,50,60,70,80,90]):rand(11,99);return q(`${a} + ? = 100`,100-a);}
  if(g==='addPlace'){let a=rand(120,799),step=pick([10,20,30,100,200]);return q(`${a} + ${step}`,a+step);}
  if(g==='subPlace'){let a=rand(250,899),step=pick([10,20,30,100,200]);return q(`${a} − ${step}`,a-step);}
  if(g==='splitAdd'){let a=rand(31,89),b=rand(12,49);return q(`${a} + ${b}`,a+b,`Try +${Math.floor(b/10)*10}, then +${b%10}.`);}
  if(g==='splitSub'){let b=rand(12,39),a=rand(b+30,99);return q(`${a} − ${b}`,a-b,`Try −${Math.floor(b/10)*10}, then −${b%10}.`);}
  if(g==='almostAdd'){let b=pick([98,99]),a=level<3?rand(21,89):rand(120,700);return q(`${a} + ${b}`,a+b,`Use +100 then −${100-b}.`);}
  if(g==='almostSub'){let b=pick([98,99]),a=rand(180,799);return q(`${a} − ${b}`,a-b,`Use −100 then +${100-b}.`);}
  if(g==='times4'){let n=rand(1,10);return q(`4 × ${n}`,4*n,'Use a nearby ×4 fact ±4.');}
  if(g==='times5'){let n=rand(1,10);return q(`5 × ${n}`,5*n,'Use a nearby ×5 fact ±5.');}
  if(g==='times10'){let n=rand(1,10);return q(`${n} × 10`,10*n,'Name it as n tens.');}
  if(g==='divisionRemainder'){let d=pick([4,5,10]),groups=rand(2,9),r=rand(0,d-1),t=d*groups+r;return q(`${t} ÷ ${d}`,r?`${groups} remainder ${r}`:groups,'Build full groups; leftovers stay outside.');}
  if(g==='moneyComplement'){let cents=pick([25,40,50,65,70,75,80,85,90,95]);return q(`${cents}¢ + ? = $1`,`${100-cents}¢`);}
  if(g==='moneyAlmost'){let a=pick([2.45,3.25,4.30,5.55]),b=pick([0.99,0.95]);return q(`${money(a)} + ${money(b)}`,money(a+b),'Use the next whole dollar, then compensate.');}
  if(g==='fraction'){let d1=pick([3,4,5,6,8]),d2=pick([3,4,5,6,8]);return q(`Compare 1/${d1} and 1/${d2}`,d1<d2?`1/${d1} is larger`:d1>d2?`1/${d2} is larger`:'equal','Use same-size fraction bars.');}
  if(g==='fractionWhole'){let d=pick([4,5,6,8,10]),n=rand(1,d-1);return q(`${n}/${d} + ? = 1`,`${d-n}/${d}`);}
  if(g==='time5'){let h=rand(1,12),m=pick([5,10,15,20,25,30,35,40,45,50,55]);return q(`Show ${h}:${String(m).padStart(2,'0')} on the clock`,`${m} minutes after ${h}`);}
  if(g==='graphScale'){let scale=pick([2,3,5,10]),symbols=rand(2,8);return q(`1 symbol = ${scale}. What do ${symbols} symbols mean?`,scale*symbols);}
  if(g==='shapeCompose'){return q(`Build a figure using ${pick(['2 rectangles','a square and 2 quarter-circles','a rectangle, triangle and half-circle'])}`,'Any correct composition.');}
  return q('Try a concrete example from the listed workbook pages.','Use the book example.');
}

function renderHome(){
  currentLesson=null;
  const active=state.activeBook||'2A';
  const bookUnits=units.filter(u=>u.book===active);
  screen.innerHTML=`<div class="eyebrow">PARENT TEACHING COACH</div><h2>Primary Mathematics</h2><p class="lead">Choose the book, then one unit. Maya stays off-screen; this is your teaching guide.</p>
  <div class="book-tabs"><button data-book="2A" class="book-tab ${active==='2A'?'active':''}">2A</button><button data-book="2B" class="book-tab ${active==='2B'?'active':''}">2B</button></div>
  <div class="unit-grid">${bookUnits.map(u=>{const ps=lessons.filter(l=>l.unit===u.id);const done=ps.filter(l=>(state.progress[l.id]||{}).mastered).length;return `<button class="unit-tile" data-unit="${u.id}"><span class="unit-number">${u.title.replace(/^Unit\s+/,'')}</span><strong>${u.title.split('—').slice(1).join('—').trim()||u.title}</strong><span>${u.pages}</span><span class="unit-progress">${done}/${ps.length} mastered</span></button>`}).join('')}</div>
  <div class="home-actions"><button id="progressBtn" class="quiet" type="button">View Maya's progress</button></div>`;
  screen.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>{state.activeBook=b.dataset.book;saveState();renderHome();});
  screen.querySelectorAll('[data-unit]').forEach(b=>b.onclick=()=>renderUnit(b.dataset.unit));
  document.getElementById('progressBtn').onclick=renderProgress;
}
function renderUnit(unitId){
  const u=units.find(x=>x.id===unitId), ls=lessons.filter(l=>l.unit===unitId);
  screen.innerHTML=`<div class="crumbs"><button class="text-link" id="backBooks">${u.book}</button><span>›</span><span>${u.title}</span></div><div class="unit-heading"><div><h2>${u.title}</h2><p class="lead">${u.summary}</p></div><span class="range">${u.pages}</span></div><div class="lesson-list">${ls.map(l=>{const p=state.progress[l.id]||{};const status=p.mastered?'Mastered':p.attempts?`Level ${p.level||1}`:'Not started';return `<button class="lesson-tile" data-lesson="${l.id}"><div><strong>${l.title}</strong><span>${l.wb===l.pdf?'pp. '+l.wb:'WB '+l.wb+' · PDF '+l.pdf}</span></div><span class="status ${p.mastered?'mastered':''}">${status}</span></button>`}).join('')}</div>`;
  document.getElementById('backBooks').onclick=renderHome;
  screen.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>openLesson(b.dataset.lesson));
}

function openLesson(id){
  const l=lessons.find(x=>x.id===id); currentLesson=l; state.lastLesson=id; saveState();
  const p=state.progress[id]||{level:1};
  screen.innerHTML=`<div class="eyebrow">${l.book} · ${units.find(u=>u.id===l.unit).title}</div><h2>${l.title}</h2>${pageRef(l)}
  <div class="card"><div class="label">TEACH ONLY THIS</div><p class="script">${l.goal}</p></div>
  <div class="card"><div class="label">PUT ON THE TABLE</div><p class="script">${l.materials}</p></div>
  <div class="card"><div class="label">DO</div><p class="script">${l.teach}</p></div>
  <div class="card soft"><div class="label">SAY</div><p class="script">${l.script}</p></div>
  <div class="card"><div class="label">BOOK IDEA TO LOOK FOR</div><p class="script">${l.model}</p></div>
  <div class="actions"><button id="questionBtn" class="primary">Give me a question</button><button id="notConfBtn" class="secondary">She is not confident yet</button></div>`;
  document.getElementById('questionBtn').onclick=()=>renderQuestion(l,p.level||1);
  document.getElementById('notConfBtn').onclick=()=>renderIntervention('notconf');
}

function renderQuestion(l,level){
  currentQuestion=generate(l,level);
  screen.innerHTML=`<div class="eyebrow">${l.title}</div>${pageRef(l)}
  <div class="question-box"><div class="label">ASK MAYA</div><div class="q">${currentQuestion.text}</div><div class="hint">${currentQuestion.hint||''}</div></div>
  <div class="card soft"><div class="label">DON'T SHOW THIS YET</div><p class="script">Answer / target: <strong>${currentQuestion.answer}</strong></p></div>
  <p class="focus">What happened?</p>
  <div class="outcomes">
    <button data-outcome="confident"><strong>Right + confident</strong><span class="mini">She understood the move and kept track.</span></button>
    <button data-outcome="help"><strong>Right, but needed help</strong></button>
    <button data-outcome="idea"><strong>Answer right, idea shaky</strong></button>
    <button data-outcome="lost"><strong>Lost track midway</strong></button>
    <button data-outcome="different"><strong>Different valid method</strong></button>
    <button data-outcome="wrong"><strong>Wrong / unsure</strong></button>
  </div>`;
  screen.querySelectorAll('[data-outcome]').forEach(b=>b.onclick=()=>renderIntervention(b.dataset.outcome));
}

function updateProgress(outcome){
  const id=currentLesson.id;
  const p=state.progress[id]||{level:1,attempts:0,confident:0,help:0,notYet:0,last:null,streak:0,mastered:false};
  p.attempts=(p.attempts||0)+1; p.last=outcome; p.level=p.level||1; p.streak=p.streak||0;
  let event='stay';
  if(outcome==='confident'){
    p.confident=(p.confident||0)+1; p.streak+=1;
    if(p.streak>=2){
      if(p.level<4){p.level+=1;p.streak=0;event='levelup';}
      else{p.mastered=true;p.streak=0;event='mastered';}
    }
  }else{
    p.streak=0;
    if(outcome==='help'||outcome==='idea'||outcome==='lost')p.help=(p.help||0)+1;
    if(outcome==='wrong'||outcome==='notconf')p.notYet=(p.notYet||0)+1;
  }
  state.progress[id]=p; saveState(); return event;
}
function nextLesson(l){
  const same=lessons.filter(x=>x.unit===l.unit); const i=same.findIndex(x=>x.id===l.id); return same[i+1]||null;
}
function renderIntervention(outcome){
  const l=currentLesson; const event=updateProgress(outcome); const p=state.progress[l.id];
  let title='',body='',tone='';
  if(outcome==='confident'){
    if(event==='mastered'){title='Mastered';body=`She has now answered confidently twice at Level 4. This strategy is mastered for now. Stop drilling it and move on; revisit later in mixed review.`;tone='good';}
    else if(event==='levelup'){title=`Move to Level ${p.level}`;body=`Two confident answers at the previous level were enough. The next question removes a little support or uses less obvious numbers.`;tone='good';}
    else{title='One confirming question';body=`That was confident. I only need one more confident answer at this level before moving her up.`;}
  }
  if(outcome==='help'){title='Stay here';body=`Use another problem from the same idea. Give one fewer prompt. Keep the manipulative and the intermediate work visible.`;}
  if(outcome==='idea'){title='Move down in representation, not mathematics';body=`Keep the same mathematical idea, but make the transformation physical. Ask only: “What changed?” and “What stayed the same?”`;tone='warn';}
  if(outcome==='lost'){title='Reduce working-memory load';body=`Do not automatically make the numbers smaller. Leave every intermediate number or physical move on the table. Maya should perform only one change at a time.`;tone='warn';}
  if(outcome==='different'){title='Keep her valid method';body=`First ask Maya to show what she changed and why it works. If the method is valid, accept it. Only then offer the book's method as another tool: “Want to see a different way?”`;}
  if(outcome==='wrong'){title='Find the exact break point';body=`Do not immediately repeat the whole procedure. Check: (1) can she represent the quantities, (2) does she understand the operation, (3) can she make the first move, (4) can she keep that result and continue? The first “no” is your intervention point.`;tone='warn';}
  if(outcome==='notconf'){title='Make it concrete';body=l.down;tone='warn';}
  const next=nextLesson(l);
  const masteryBox=p.mastered?`<div class="mastery-box"><strong>Done for today.</strong><span>No more same-skill questions are required.</span></div>`:`<div class="mastery-line"><strong>Level ${p.level}/4</strong><span>${p.streak||0}/2 confident answers at this level</span></div>`;
  const primary=p.mastered&&next?`<button id="nextLessonBtn" class="primary">Next lesson: ${next.title}</button>`:`<button id="againBtn" class="primary">${event==='levelup'?'Try Level '+p.level:'Another question'}</button>`;
  screen.innerHTML=`<div class="eyebrow">NEXT PARENT MOVE</div><h2>${title}</h2>${masteryBox}<div class="result ${tone}"><div class="route-title">${title}</div><p class="route-copy">${body}</p></div>${pageRef(l)}<div class="toolbar">${primary}${p.mastered?'<button id="againBtn" class="secondary">One more anyway</button>':'<button id="reteachBtn" class="secondary">Teaching steps</button>'}<button id="unitBtn" class="quiet">Back to unit</button></div>`;
  const again=document.getElementById('againBtn'); if(again)again.onclick=()=>renderQuestion(l,p.level||1);
  const reteach=document.getElementById('reteachBtn'); if(reteach)reteach.onclick=()=>openLesson(l.id);
  const nxt=document.getElementById('nextLessonBtn'); if(nxt)nxt.onclick=()=>openLesson(next.id);
  document.getElementById('unitBtn').onclick=()=>renderUnit(l.unit);
}

function renderProgress(){
  const rows=lessons.map(l=>{
    const p=state.progress[l.id]||{level:1,attempts:0,confident:0};
    let s=p.mastered?'Mastered':p.attempts===0?'Not tried':`Level ${p.level||1} · ${(p.streak||0)}/2`;
    return `<div class="progress-row"><div><strong>${l.book} · ${l.title}</strong><div class="mini">${l.wb===l.pdf?'pp. '+l.wb:'WB '+l.wb+' · PDF '+l.pdf} · ${p.attempts} attempts</div></div><span class="status">${s}</span></div>`;
  }).join('');
  screen.innerHTML=`<div class="eyebrow">MAYA'S TEACHING MAP</div><h2>Progress is about independence, not speed.</h2><p class="lead">A correct answer with heavy prompting is not recorded the same way as confident strategy use.</p>${rows}`;
}

homeBtn.onclick=renderHome;
renderHome();
