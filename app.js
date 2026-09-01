const screen = document.getElementById('screen');
const homeBtn = document.getElementById('homeBtn');
const STORAGE_KEY = 'mayaMathIntervention.v2';

const units = [
  {id:'u6',title:'Unit 6 — Addition & Subtraction',wb:'7–27',pdf:'9–29',summary:'Number bonds, place-value moves, split-and-hop, and compensation around 100.'},
  {id:'u7',title:'Unit 7 — Multiplication & Division',wb:'28–65',pdf:'30–67',summary:'Build ×4, ×5 and ×10 from skip counting and known facts; connect division and remainders.'},
  {id:'u8',title:'Unit 8 — Money',wb:'66–97',pdf:'68–99',summary:'Read money, convert cents/dollars, make $1/$10, and calculate with friendly-money strategies.'},
  {id:'u9',title:'Unit 9 — Fractions',wb:'98–119',pdf:'100–121',summary:'Equal parts, fraction language, comparison, complements to a whole, and number-line placement.'},
  {id:'u10',title:'Unit 10 — Time',wb:'120–128',pdf:'122–130',summary:'Read time in 5-minute steps and connect “past” and “to” language.'},
  {id:'u11',title:'Unit 11 — Tables & Graphs',wb:'129–148',pdf:'131–150',summary:'Read tally, picture, bar and line-plot data, including scaled symbols and comparisons.'},
  {id:'u12',title:'Unit 12 — Geometry',wb:'149–168',pdf:'151–170',summary:'Solids and surfaces, composing shapes, patterns, and polygon attributes.'}
];

const lessons = [
  {id:'u6-bonds',unit:'u6',title:'Find the Missing Part',wb:'7–8',pdf:'9–10',gen:'missingPart',goal:'See addition and subtraction as part–whole relationships, not isolated facts.',materials:'Counters, bead bars, or a number-bond mat.',teach:'Build the whole. Hide one part. Ask Maya to identify the missing part before writing anything.',script:'“I know the whole and one part. What part is hiding?”',model:'29 + ? = 36',down:'Use a whole of 10 with visible counters. Let her physically cover and uncover the missing part.'},
  {id:'u6-make100',unit:'u6',title:'Finish 100',wb:'9–10',pdf:'11–12',gen:'make100',goal:'Know complements to 100 and subtract from 100 efficiently.',materials:'Base-ten hundred square, ten-bars, and units.',teach:'Build 100, then remove/show a part. Keep the missing space visible.',script:'“How much does this number need to become 100?”',model:'63 + ? = 100',down:'Go first to complements to 10, then whole tens to 100, then mixed tens and ones.'},
  {id:'u6-add-place',unit:'u6',title:'Add by Place Value',wb:'11–14',pdf:'13–16',gen:'addPlace',goal:'Add ones, tens, or hundreds as one place-value move.',materials:'Base-ten blocks or place-value cards.',teach:'Change only one place at a time. Keep the untouched places physically still.',script:'“Which place is changing? Which places stay the same?”',model:'519 + 30',down:'Use only +10 or +100 until the changed place is visually obvious.'},
  {id:'u6-split-add',unit:'u6',title:'Split & Hop — Addition',wb:'15',pdf:'17',gen:'splitAdd',goal:'Split an addend into easy chunks and keep every intermediate total visible.',materials:'Open number line on paper or base-ten blocks.',teach:'Split the second addend into tens and ones. Make one move, stop, then make the next.',script:'“What is the biggest easy chunk you can add first?”',model:'57 + 36 → +30 → +6',down:'Do not simplify the final numbers automatically. Write the intermediate total on a card so Maya does not have to hold it mentally.'},
  {id:'u6-almost-add',unit:'u6',title:'Almost 100 — Addition',wb:'16–17',pdf:'18–19',gen:'almostAdd',goal:'Understand +99/+98 as +100 followed by a small compensation.',materials:'Base-ten blocks plus 1–2 loose counters kept in an “extra” pile.',teach:'Physically turn 98 or 99 into 100. Leave the extra counters visible until they are paid back.',script:'“How much extra did we add to make 100?”',model:'246 + 98 → 346 − 2',down:'Check three prerequisites separately: gap to 100, +100, then −1/−2.'},
  {id:'u6-sub-place',unit:'u6',title:'Subtract by Place Value',wb:'18–21',pdf:'20–23',gen:'subPlace',goal:'Subtract ones, tens, or hundreds while preserving the other places.',materials:'Base-ten blocks or place-value cards.',teach:'Remove one place-value chunk at a time and name what did not change.',script:'“What are we taking away: ones, tens, or hundreds?”',model:'748 − 90',down:'Return to subtracting one whole ten or one whole hundred from a built quantity.'},
  {id:'u6-split-sub',unit:'u6',title:'Split & Hop — Subtraction',wb:'22–23',pdf:'24–25',gen:'splitSub',goal:'Split the subtrahend into manageable chunks without losing the intermediate total.',materials:'Open number line or base-ten blocks; keep both hops visible.',teach:'Take away the tens first, pause, label the result, then take away the ones.',script:'“What easy chunk can we take away first?”',model:'68 − 25 → −20 → −5',down:'If she loses the middle number, keep it written. That is a working-memory support, not easier mathematics.'},
  {id:'u6-almost-sub',unit:'u6',title:'Almost 100 — Subtraction',wb:'24–25',pdf:'26–27',gen:'almostSub',goal:'Understand −99/−98 as −100 followed by giving back what was removed too much.',materials:'Base-ten blocks or number line; mark 1–2 counters to return.',teach:'Take 100 away, then visibly return 1 or 2.',script:'“We took away 100, but we only meant to take away 98. Did we take too much or too little?”',model:'467 − 98 → 367 + 2',down:'Separate the sign logic physically: remove 100, then return two counters.'},

  {id:'u7-count4',unit:'u7',title:'Build the 4s Facts',wb:'28–35',pdf:'30–37',gen:'times4',goal:'See ×4 as equal groups and derive nearby facts by adding or subtracting one group of 4.',materials:'Counters in groups of 4, bead bars, or four-item bundles.',teach:'Build several groups. Move from 4×5 to 4×6 by adding one visible group of 4.',script:'“If you know five groups of 4, what changes when we add one more group?”',model:'4 × 6 is 4 more than 4 × 5',down:'Skip-count physically by 4s while touching each group.'},
  {id:'u7-mul4-word',unit:'u7',title:'See ×4 in a Story',wb:'36–37',pdf:'38–39',gen:'mulStory4',goal:'Recognize equal-group situations as multiplication by 4.',materials:'Four trays/rows and counters.',teach:'Act out the story first. Ask what repeats and how many times.',script:'“What is the equal group? How many groups are there?”',model:'4 rows × 5 trees',down:'Build the exact story with objects before writing a multiplication sentence.'},
  {id:'u7-div4',unit:'u7',title:'Division by 4 & Remainders',wb:'38–41',pdf:'40–43',gen:'div4',goal:'See division as sharing equally or making equal groups; interpret leftovers.',materials:'Counters and 4 bowls/loops.',teach:'Deal counters one at a time into 4 groups. Keep leftovers outside the groups.',script:'“Can every counter go into an equal group? What is left?”',model:'26 shared in groups of 4 → 6 each, 2 left',down:'Use quantities divisible by 4 first, then add one or two leftovers.'},
  {id:'u7-count5',unit:'u7',title:'Build the 5s Facts',wb:'42–45',pdf:'44–47',gen:'times5',goal:'Build ×5 facts from skip counting and nearby known facts.',materials:'Five-bars, hands, nickels, or groups of 5 counters.',teach:'Use the fact that every new group adds exactly 5; compare neighboring facts.',script:'“What is one more group of 5?”',model:'5 × 7 is 5 more than 5 × 6',down:'Count 5,10,15… with physical groups before asking facts.'},
  {id:'u7-muldiv5',unit:'u7',title:'Multiply & Divide by 5',wb:'46–51',pdf:'48–53',gen:'mulDiv5',goal:'Connect ×5 and ÷5 as inverse equal-group relationships, including leftovers.',materials:'Groups of 5 counters or five equal trays.',teach:'For multiplication, build groups. For division, undo them.',script:'“If 5 groups make this total, what happens when we share the total back into 5 groups?”',model:'5 × 8 = 40 ↔ 40 ÷ 5 = 8',down:'Stay with exact facts before introducing remainders.'},
  {id:'u7-count10',unit:'u7',title:'Build the 10s Facts',wb:'52–55',pdf:'54–57',gen:'times10',goal:'See ×10 as groups of ten and notice the structure of multiples of 10.',materials:'Ten-bars/base-ten rods.',teach:'Build each fact from ten-bars, then compare 4×10 and 10×4 as the same array rearranged.',script:'“How many tens do you have? What number is that?”',model:'8 × 10 = 80',down:'Name numbers as “8 tens” before using multiplication notation.'},
  {id:'u7-div10',unit:'u7',title:'Divide by 10 & Remainders',wb:'56–59',pdf:'58–61',gen:'div10',goal:'Group quantities into tens and identify leftovers.',materials:'Base-ten rods and unit cubes.',teach:'Exchange every possible 10 units for a ten-bar; units that cannot exchange are the remainder.',script:'“How many full tens can we make? What cannot join a full ten?”',model:'94 ÷ 10 → 9 tens, 4 left',down:'Use exact multiples of 10 before mixed quantities.'},
  {id:'u7-review',unit:'u7',title:'Choose ×4, ×5, ×10 or Division',wb:'60–65',pdf:'62–67',gen:'factChoice',goal:'Recognize the operation and fact family from the structure of the problem.',materials:'Manipulatives available but not automatically placed out.',teach:'Before calculating, ask Maya to identify equal groups, group size, total, and what is unknown.',script:'“What do we know: number of groups, size of each group, or total?”',model:'43 people, boats hold 5 → division with a remainder',down:'Return to acting out one story and label the three quantities.'},

  {id:'u8-readmoney',unit:'u8',title:'Build & Read Money Amounts',wb:'66–72',pdf:'68–74',gen:'moneyRead',goal:'Connect coins/bills, words, and decimal notation.',materials:'Real or play coins and bills.',teach:'Build the amount first, then write dollars and cents. Keep the decimal as the separator between dollars and cents.',script:'“How many whole dollars? How many cents?”',model:'$5.45 = 5 dollars 45 cents',down:'Use only dollars and one coin type before mixing denominations.'},
  {id:'u8-convert',unit:'u8',title:'Cents ↔ Dollars',wb:'73–74',pdf:'75–76',gen:'moneyConvert',goal:'Understand 100 cents = 1 dollar and regroup cents into dollars.',materials:'100 pennies/counters, dimes, and dollar representations.',teach:'Physically exchange each full set of 100 cents for one dollar.',script:'“How many full hundreds of cents can we trade for dollars?”',model:'240¢ = $2.40',down:'Practice 100¢, 200¢, 300¢ before amounts with leftover cents.'},
  {id:'u8-make1',unit:'u8',title:'Make $1 and $10',wb:'75–77',pdf:'77–79',gen:'moneyComplement',goal:'Use complements to find change from $1 or $10.',materials:'Play money and a $1/$10 mat.',teach:'Lay down the price and physically fill the empty amount to the target.',script:'“What is missing to make exactly $1?”',model:'75¢ + ? = $1',down:'Use coin-friendly amounts first: 50¢, 75¢, 90¢.'},
  {id:'u8-addmoney',unit:'u8',title:'Add Money',wb:'80–82',pdf:'82–84',gen:'moneyAdd',goal:'Add dollars and cents while preserving place value.',materials:'Play money or place-value money mat.',teach:'Combine cents with cents and dollars with dollars; exchange 100 cents for $1 when needed.',script:'“Which parts are cents? Which parts are dollars?”',model:'$2.60 + $3.25',down:'Add amounts with no cent regrouping first.'},
  {id:'u8-almost-add',unit:'u8',title:'Almost $1 — Addition',wb:'83',pdf:'85',gen:'moneyAlmostAdd',goal:'Use +$0.99/+ $1.99 or +$0.95 as friendly-money compensation.',materials:'Play money; keep the extra 1¢ or 5¢ visibly aside.',teach:'Turn 99¢ into $1, or 95¢ into $1, and pay back the extra cents.',script:'“How close is this amount to the next whole dollar?”',model:'$2.45 + $0.99 → +$1 −1¢',down:'Return to Make $1 until the missing cents are immediate.'},
  {id:'u8-submoney',unit:'u8',title:'Subtract Money',wb:'86–88',pdf:'88–90',gen:'moneySub',goal:'Subtract dollar-and-cent amounts while tracking exchanges.',materials:'Play money.',teach:'Physically exchange a dollar when there are not enough cents to remove.',script:'“Do we have enough cents to take these cents away? If not, what can one dollar become?”',model:'$6.80 − $2.50',down:'Use subtraction with no exchange first.'},
  {id:'u8-almost-sub',unit:'u8',title:'Almost $1 — Subtraction',wb:'89–91',pdf:'91–93',gen:'moneyAlmostSub',goal:'Subtract $0.99/$1.99/$2.99 or $0.95/$5.95 by taking a friendly whole amount then giving back the difference.',materials:'Play money; mark the cents to return.',teach:'Subtract the next whole-dollar amount, then return 1¢ or 5¢.',script:'“If we subtract a whole dollar instead, how much too much did we take?”',model:'$4.30 − $0.99 → $3.30 + $0.01',down:'Physically do the change with a dollar and penny before writing it.'},

  {id:'u9-equalparts',unit:'u9',title:'Fractions Are Equal Parts',wb:'98–101',pdf:'100–103',gen:'fractionParts',goal:'Understand that fractions name equal parts of the same whole.',materials:'Fraction circles/bars, paper folding, or identical food models.',teach:'Make equal and unequal partitions side by side. Ask which can legitimately be called halves/thirds/fourths.',script:'“Are all the parts the same size?”',model:'3 wholes contain 6 halves',down:'Fold one paper exactly in half; compare with an obviously unequal cut.'},
  {id:'u9-readfrac',unit:'u9',title:'Read the Fraction',wb:'102–107',pdf:'104–109',gen:'fractionRead',goal:'Connect shaded parts, numerator, denominator, and “x out of y equal parts.”',materials:'Fraction bars/circles.',teach:'Always identify total equal parts first, then shaded/selected parts.',script:'“How many equal parts in all? How many are we talking about?”',model:'7 out of 10 equal parts = 7/10',down:'Keep denominator fixed at 4 until the language is secure.'},
  {id:'u9-compare',unit:'u9',title:'Compare Fractions Visually',wb:'108–110',pdf:'110–112',gen:'fractionCompare',goal:'Compare fractions using same-size wholes and visual bars, not rule memorization.',materials:'Fraction bars/circles of identical whole size.',teach:'Overlay or align fractions. For unit fractions, emphasize that more equal pieces means each piece is smaller.',script:'“Same whole. Which amount reaches farther?”',model:'1/4 > 1/6',down:'Compare only unit fractions with physical pieces first.'},
  {id:'u9-whole',unit:'u9',title:'Finish the Whole',wb:'111–112',pdf:'113–114',gen:'fractionWhole',goal:'Find complementary fractions that make one whole.',materials:'Fraction circles/bars.',teach:'Fill the missing portion of a whole with matching denominator pieces.',script:'“What fraction is missing to complete the whole?”',model:'3/8 + ? = 1',down:'Use halves and fourths before sixths/eighths/tenths.'},
  {id:'u9-numberline',unit:'u9',title:'Fractions on a Number Line',wb:'113',pdf:'115',gen:'fractionLine',goal:'See fractions as numbers with positions between 0 and 1.',materials:'String or drawn number line plus equal interval markers.',teach:'Partition 0–1 into equal spaces before placing the fraction.',script:'“If the whole journey from 0 to 1 is split into equal steps, which step is this fraction?”',model:'3/4 is the third of four equal steps',down:'Walk a floor number line physically with halves, then fourths.'},
  {id:'u9-transfer',unit:'u9',title:'Fraction Sense — Mixed',wb:'114–119',pdf:'116–121',gen:'fractionMixed',goal:'Move flexibly among representation, comparison, remaining fraction, and number line.',materials:'Fraction pieces available as needed.',teach:'Ask Maya to show, build, compare, or locate before asking for symbolic answers.',script:'“Can you show me what the fraction means?”',model:'5 slices eaten → eaten fraction and fraction left',down:'Return to the representation involved in the error rather than repeating symbolic questions.'},

  {id:'u10-five',unit:'u10',title:'Minutes Move in 5s',wb:'120–124',pdf:'122–126',gen:'clockRead',goal:'Connect each clock number to another 5 minutes.',materials:'Teaching clock with movable hands.',teach:'Move the minute hand one number at a time while counting 5,10,15…',script:'“Each number is another 5 minutes. Where have we landed?”',model:'minute hand on 5 → 25 minutes past',down:'Ignore the hour hand and practice only minute-hand positions.'},
  {id:'u10-pastto',unit:'u10',title:'Past and To',wb:'125–126',pdf:'127–128',gen:'clockPastTo',goal:'Describe the same clock time using minutes past or minutes to the next hour.',materials:'Teaching clock.',teach:'Physically trace minutes from the hour for “past,” then the remaining arc to the next hour for “to.”',script:'“Are we counting from the hour we passed, or toward the hour coming next?”',model:'6:45 = 15 minutes to 7',down:'Use only quarter past and quarter to before arbitrary 5-minute intervals.'},
  {id:'u10-ampm',unit:'u10',title:'A.M./P.M. & Daily Time',wb:'127–128',pdf:'129–130',gen:'ampm',goal:'Connect clock times to morning/afternoon/evening context.',materials:'Simple daily routine cards.',teach:'Place events on a morning-to-night timeline.',script:'“Would this usually happen before noon or after noon?”',model:'breakfast 7:00 a.m.',down:'Use obvious anchors: wake, lunch, dinner, bedtime.'},

  {id:'u11-pict',unit:'u11',title:'Read Tally & Picture Graphs',wb:'129–132',pdf:'131–134',gen:'graphBasic',goal:'Read categories, counts, most/least, and differences from simple data displays.',materials:'Counters and a hand-made tally/picture graph.',teach:'Point to title/category/key before reading quantities.',script:'“What does one mark or one picture stand for?”',model:'1 picture = 2 toys',down:'Use a key of 1 before scaled picture graphs.'},
  {id:'u11-scale',unit:'u11',title:'Scaled Picture Graphs',wb:'133–136',pdf:'135–138',gen:'graphScale',goal:'Interpret one symbol as 3,4,5 or 10 items.',materials:'Counters grouped into equal bundles matching the graph key.',teach:'Put the key physically beside each symbol: each symbol is a bundle, not one object.',script:'“How many are hiding inside each symbol?”',model:'4 symbols × 5 fish = 20 fish',down:'Use two symbols with a scale of 2 before larger scales.'},
  {id:'u11-bar',unit:'u11',title:'Tables & Bar Graphs',wb:'137–141',pdf:'139–143',gen:'graphCompare',goal:'Read values, compare categories, total data, and interpret “times as many.”',materials:'Build a bar graph from linking cubes.',teach:'Make each bar physically, then compare heights by subtraction or grouping.',script:'“What does the bar height mean? What question are we being asked about the bars?”',model:'Group B has twice as many as Group A',down:'Compare just two bars and ask only “how many more?”'},
  {id:'u11-lineplot',unit:'u11',title:'Line Plots',wb:'142–148',pdf:'144–150',gen:'linePlot',goal:'Read frequency from repeated marks and identify most common values/ranges.',materials:'Sticky notes or counters placed above a number line.',teach:'Place one counter for each observation above its value.',script:'“Each mark is one observation. How many are stacked here?”',model:'Most common age = tallest stack',down:'Use only 3 possible values and physically stack counters.'},

  {id:'u12-solids',unit:'u12',title:'Solids & Their Surfaces',wb:'149–152',pdf:'151–154',gen:'solid',goal:'Recognize solid shapes and distinguish flat from curved surfaces.',materials:'Real sphere, cube, cuboid, cylinder, cone if available.',teach:'Touch every surface. Try rolling and stacking to make curved/flat properties physical.',script:'“Can your finger stay flat on this surface, or does it curve?”',model:'cylinder: 2 flat circular surfaces + 1 curved surface',down:'Compare only cube vs sphere first.'},
  {id:'u12-compose',unit:'u12',title:'Compose Shapes',wb:'153–154',pdf:'155–156',gen:'compose',goal:'See a larger figure as made from repeated smaller shapes.',materials:'Pattern blocks, square tiles, tangram-like pieces.',teach:'Build the target physically, then draw the dividing lines afterward.',script:'“What smaller pieces could make this whole shape?”',model:'4 squares can form a rectangle',down:'Give the exact pieces and let Maya fit them without drawing.'},
  {id:'u12-decompose',unit:'u12',title:'Straight, Curved & Composite Shapes',wb:'155–159',pdf:'157–161',gen:'shapeParts',goal:'Analyze figures by line type and decompose composite figures into named shapes.',materials:'Shape cut-outs including half/quarter circles.',teach:'Trace the boundary first; then place pieces over the composite figure.',script:'“Where could one shape end and the next begin?”',model:'rectangle + half circle',down:'Use composites of only two very distinct shapes.'},
  {id:'u12-pattern',unit:'u12',title:'Find the Repeating Unit',wb:'160–161',pdf:'162–163',gen:'pattern',goal:'Identify the repeating unit in a regular shape pattern and predict what comes next.',materials:'Pattern blocks.',teach:'Physically bracket one repeat, then copy it.',script:'“What smallest chunk keeps repeating?”',model:'circle, square, triangle / circle, square, triangle…',down:'Use AB patterns before ABC or AAB patterns.'},
  {id:'u12-polygon',unit:'u12',title:'Polygons: Sides & Angles',wb:'162–168',pdf:'164–170',gen:'polygon',goal:'Identify polygons and connect names to number of straight sides and angles.',materials:'Geoboard, craft sticks, or string.',teach:'Build closed straight-sided figures. Count sides and corners by touching each once.',script:'“Is it closed? Are all its sides straight? How many sides and angles?”',model:'hexagon → 6 sides, 6 angles',down:'Sort shapes first into polygon/not polygon without naming them.'}
];

const lessonById = Object.fromEntries(lessons.map(x=>[x.id,x]));
const unitById = Object.fromEntries(units.map(x=>[x.id,x]));

function defaultState(){ return {lastLesson:null,progress:Object.fromEntries(lessons.map(l=>[l.id,{level:1,streak:0,attempts:0,confident:0,help:0,notYet:0,last:null}]))}; }
function loadState(){ try{ const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); const d=defaultState(); return {lastLesson:x.lastLesson||null,progress:{...d.progress,...(x.progress||{})}}; }catch(e){return defaultState();} }
function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
const state=loadState();
let currentUnit=null,currentLesson=null,currentQuestion=null;

function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function pick(a){return a[rand(0,a.length-1)]}
function money(n){return '$'+n.toFixed(2)}
function frac(n,d){return `${n}/${d}`}

function generate(l,level){
  level=Math.max(1,Math.min(4,level||1));
  switch(l.gen){
    case 'missingPart': {const whole=level<3?rand(10,60):rand(50,150),part=rand(2,whole-2);return {q:`${part} + ? = ${whole}`,a:whole-part,h:'Ask her to build the whole and one known part.'};}
    case 'make100': {if(level===1){const a=pick([10,20,30,40,50,60,70,80,90]);return {q:`${a} + ? = 100`,a:100-a,h:'Whole tens only.'};}const a=rand(level===2?51:12,98);return Math.random()<.5?{q:`${a} + ? = 100`,a:100-a,h:'Find the gap to 100.'}:{q:`100 − ${a}`,a:100-a,h:'Think of the missing part.'};}
    case 'addPlace': {const base=level<3?rand(21,89):rand(120,780),add=level===1?pick([10,20,30]):level===2?pick([20,30,40,50,60,70,80,90]):pick([100,200,300]);return {q:`${base} + ${add}`,a:base+add,h:'Name the place that changes.'};}
    case 'splitAdd': {const a=level<3?rand(31,89):rand(120,699),b=level===1?rand(11,29):level===2?rand(21,49):rand(31,89);return {q:`${a} + ${b}`,a:a+b,h:`Try ${a} + ${Math.floor(b/10)*10}, then +${b%10}.`};}
    case 'almostAdd': {const b=pick([98,99]),a=level===1?rand(2,20):level===2?rand(21,89):rand(120,799);return {q:`${a} + ${b}`,a:a+b,h:`Use +100, then −${100-b}.`};}
    case 'subPlace': {const a=level<3?rand(50,99):rand(200,899),b=level===1?pick([10,20,30,40]):level===2?pick([20,30,40,50,60,70,80,90]):pick([100,200,300,400]); if(b>=a)return generate(l,level); return {q:`${a} − ${b}`,a:a-b,h:'Name the place-value chunk being removed.'};}
    case 'splitSub': {const b=level===1?rand(11,29):level===2?rand(21,49):rand(31,89),a=level<3?rand(Math.max(55,b+15),99):rand(Math.max(150,b+60),899);return {q:`${a} − ${b}`,a:a-b,h:`Try −${Math.floor(b/10)*10}, then −${b%10}.`};}
    case 'almostSub': {const b=pick([98,99]),a=level===1?pick([200,300,400,500]):rand(150,899);if(a<=b)return generate(l,level);return {q:`${a} − ${b}`,a:a-b,h:`Use −100, then +${100-b}.`};}
    case 'times4': {const n=rand(2,10);return {q:`4 × ${n}`,a:4*n,h:n>2?`Use 4 × ${n-1}, then add 4.`:'Build groups of 4.'};}
    case 'mulStory4': {const each=rand(2,10);return {q:`4 equal groups of ${each}. How many altogether?`,a:4*each,h:'Build 4 groups before writing ×.'};}
    case 'div4': {const each=rand(2,9),rem=level<3?0:rand(0,3),total=4*each+rem;return {q:`Share ${total} into 4 equal groups.`,a:rem?`${each} each, ${rem} left`:`${each} each`,h:'Deal one counter to each group in turn.'};}
    case 'times5': {const n=rand(2,10);return {q:`5 × ${n}`,a:5*n,h:n>2?`One more group than 5 × ${n-1}.`:'Count by 5s.'};}
    case 'mulDiv5': {if(Math.random()<.5){const n=rand(2,10);return {q:`5 × ${n}`,a:5*n,h:'Think in equal groups of 5.'};}const each=rand(2,10),rem=level<3?0:rand(0,4),total=5*each+rem;return {q:`${total} shared into 5 equal groups`,a:rem?`${each} each, ${rem} left`:`${each} each`,h:'Undo groups of 5.'};}
    case 'times10': {const n=rand(2,10);return {q:`${n} × 10`,a:n*10,h:`Think “${n} tens.”`};}
    case 'div10': {const tens=rand(2,9),rem=level<3?0:rand(0,9),total=tens*10+rem;return {q:`Group ${total} into tens.`,a:rem?`${tens} tens, ${rem} left`:`${tens} tens`,h:'Trade every 10 units for one ten.'};}
    case 'factChoice': {const family=pick([4,5,10]),groups=rand(2,10);return Math.random()<.5?{q:`${family} groups of ${groups}`,a:family*groups,h:'Ask what repeats and how many groups.'}:{q:`${family*groups} shared into ${family} equal groups`,a:groups,h:'Ask which quantity is unknown.'};}
    case 'moneyRead': {const d=rand(0,9),c=pick([5,10,15,20,25,30,40,45,50,60,70,75,80,90,95]);return {q:`Build ${money(d+c/100)}`,a:`${d} dollars ${c} cents`,h:'Use real/play money, then say it in words.'};}
    case 'moneyConvert': {const cents=level===1?pick([100,200,300,400,500]):rand(105,995);return {q:`${cents}¢ = ? dollars`,a:money(cents/100),h:'Trade each 100 cents for $1.'};}
    case 'moneyComplement': {const target=level<3?1:10;const cents=target===1?pick([20,25,40,50,60,65,70,75,80,85,90,95]):rand(100,950);const start=cents/100;return {q:`${money(start)} + ? = ${money(target)}`,a:money(target-start),h:`Physically fill the gap to ${money(target)}.`};}
    case 'moneyAdd': {const a=rand(100,650)/100,b=rand(50,350)/100;return {q:`${money(a)} + ${money(b)}`,a:money(a+b),h:'Combine cents with cents; exchange 100¢ if needed.'};}
    case 'moneyAlmostAdd': {const b=pick([.95,.99,1.99,2.99]),a=rand(150,600)/100;return {q:`${money(a)} + ${money(b)}`,a:money(a+b),h:`Use a friendly whole dollar, then pay back ${Math.round((Math.ceil(b)-b)*100)}¢.`};}
    case 'moneySub': {const b=rand(50,400)/100,a=rand(Math.ceil((b+1)*100),900)/100;return {q:`${money(a)} − ${money(b)}`,a:money(a-b),h:'Exchange $1 for 100¢ if needed.'};}
    case 'moneyAlmostSub': {const b=pick([.95,.99,1.99,2.99,5.95]),a=rand(Math.ceil((b+1)*100),1000)/100;return {q:`${money(a)} − ${money(b)}`,a:money(a-b),h:'Subtract the next whole-dollar amount, then give back the cents.'};}
    case 'fractionParts': {const d=pick([2,3,4,5]),w=rand(1,4);return {q:`How many ${d===2?'halves':d===3?'thirds':d===4?'fourths':'fifths'} are in ${w} whole${w>1?'s':''}?`,a:w*d,h:'Build each whole from equal fraction pieces.'};}
    case 'fractionRead': {const d=pick([3,4,5,6,8,10]),n=rand(1,d-1);return {q:`${n} shaded out of ${d} equal parts. What fraction?`,a:frac(n,d),h:'Total equal parts first; selected parts second.'};}
    case 'fractionCompare': {const d1=pick([2,3,4,5,6,8]),d2=pick([2,3,4,5,6,8].filter(x=>x!==d1));return {q:`Which is larger: 1/${d1} or 1/${d2}?`,a:d1<d2?`1/${d1}`:`1/${d2}`,h:'Use pieces from same-size wholes.'};}
    case 'fractionWhole': {const d=pick([2,3,4,5,6,8,10]),n=rand(1,d-1);return {q:`${n}/${d} + ? = 1`,a:`${d-n}/${d}`,h:'Fill the missing part with same-denominator pieces.'};}
    case 'fractionLine': {const d=pick([2,3,4,5,6,8]),n=rand(1,d-1);return {q:`Place ${n}/${d} between 0 and 1.`,a:`step ${n} of ${d} equal steps`,h:`Split 0–1 into ${d} equal intervals first.`};}
    case 'fractionMixed': {const d=pick([4,5,6,8]),n=rand(1,d-1);return {q:`If ${n}/${d} is used, what fraction is left?`,a:`${d-n}/${d}`,h:'Build the whole and remove the used part.'};}
    case 'clockRead': {const hour=rand(1,12),mins=pick([5,10,15,20,25,30,35,40,45,50,55]);return {q:`Show ${hour}:${String(mins).padStart(2,'0')} on the clock.`,a:`minute hand at ${mins/5}`,h:'Count around the clock by 5s.'};}
    case 'clockPastTo': {const hour=rand(1,11),mins=pick([10,15,20,25,35,40,45,50]);return mins<=30?{q:`${hour}:${String(mins).padStart(2,'0')} = ? minutes past ${hour}`,a:mins,h:'Count from the hour just passed.'}:{q:`${hour}:${mins} = ? minutes to ${hour+1}`,a:60-mins,h:'Count forward to the next hour.'};}
    case 'ampm': {const events=[['wake up',7,'a.m.'],['eat lunch',1,'p.m.'],['eat dinner',7,'p.m.'],['go to bed',9,'p.m.'],['early swim practice',6,'a.m.']];const e=pick(events);return {q:`Maya would usually ${e[0]} at ${e[1]}:00 — a.m. or p.m.?`,a:e[2],h:'Place it on a morning-to-night timeline.'};}
    case 'graphBasic': {const vals=[rand(2,8),rand(2,8),rand(2,8)];return {q:`A graph shows A=${vals[0]}, B=${vals[1]}, C=${vals[2]}. Which is greatest?`,a:['A','B','C'][vals.indexOf(Math.max(...vals))],h:'Read the key first, then compare.'};}
    case 'graphScale': {const scale=pick([2,3,4,5,10]),symbols=rand(2,6);return {q:`Each symbol = ${scale}. There are ${symbols} symbols. How many items?`,a:scale*symbols,h:'Treat every symbol as one bundle.'};}
    case 'graphCompare': {const a=rand(5,20),b=rand(5,20);return {q:`Bar A=${a}, Bar B=${b}. How many more does the larger bar show?`,a:Math.abs(a-b),h:'Build both bars and compare the excess.'};}
    case 'linePlot': {const vals=Array.from({length:10},()=>rand(1,5));const counts={};vals.forEach(v=>counts[v]=(counts[v]||0)+1);const mode=Object.keys(counts).sort((x,y)=>counts[y]-counts[x])[0];return {q:`Data: ${vals.join(', ')}. What value appears most often?`,a:mode,h:'Stack one counter above each value.'};}
    case 'solid': {const x=pick([{q:'Which rolls most freely: cube or sphere?',a:'sphere'},{q:'How many flat faces does a cube have?',a:6},{q:'Does a sphere have a flat surface?',a:'no'},{q:'How many flat circular surfaces does a cylinder have?',a:2}]);return {...x,h:'Handle the real solid while answering.'};}
    case 'compose': {const n=pick([2,3,4,6,8]);return {q:`Use ${n} equal squares to make a larger figure.`,a:'Any valid composed figure',h:'Build first; draw dividing lines afterward.'};}
    case 'shapeParts': {const pair=pick([['rectangle','half circle'],['square','triangle'],['rectangle','triangle'],['square','two quarter circles']]);return {q:`Build one figure from: ${pair.join(' + ')}`,a:'Any valid composite',h:'Place the pieces first, then trace the whole.'};}
    case 'pattern': {const pats=[['○','□'],['△','○','□'],['○','○','△'],['□','△','△']];const p=pick(pats),seq=[...p,...p,...p.slice(0,p.length-1)];return {q:`What comes next? ${seq.join(' ')}`,a:p[p.length-1],h:'Circle the smallest repeating unit.'};}
    case 'polygon': {const sides=pick([3,4,5,6,8]),names={3:'triangle',4:'quadrilateral',5:'pentagon',6:'hexagon',8:'octagon'};return {q:`A closed polygon has ${sides} straight sides. What is it called?`,a:names[sides],h:'Build it and count sides/corners by touching each once.'};}
  }
  return {q:l.model,a:'Discuss with manipulatives',h:l.teach};
}

function renderHome(){
  currentLesson=null; currentUnit=null;
  screen.innerHTML=`<div class="eyebrow">SINGAPORE PRIMARY MATHEMATICS 2B</div><h2>Teach from the book</h2><p class="lead">Choose a unit. Each lesson gives you the workbook page, PDF page, materials, a short script, diagnostic routing, and as many fresh questions as Maya needs.</p><div class="stack">${units.map(u=>`<button class="unit-button" data-unit="${u.id}"><strong>${u.title}</strong><span>Workbook pp. ${u.wb} · PDF pp. ${u.pdf}<br>${u.summary}</span></button>`).join('')}</div><div class="home-actions">${state.lastLesson?`<button id="resumeBtn" class="secondary">Resume last lesson</button>`:''}<button id="progressBtn" class="quiet">View progress</button></div><p class="note">Page numbers shown are the printed workbook pages first. Because the PDF includes two scan/front pages before the workbook numbering, the PDF page is two pages later.</p>`;
  document.querySelectorAll('[data-unit]').forEach(b=>b.onclick=()=>renderUnit(b.dataset.unit));
  if(document.getElementById('resumeBtn'))document.getElementById('resumeBtn').onclick=()=>renderLesson(state.lastLesson);
  document.getElementById('progressBtn').onclick=renderProgress;
}

function renderUnit(id){
  currentUnit=id; const u=unitById[id], list=lessons.filter(l=>l.unit===id);
  screen.innerHTML=`<div class="crumbs"><span>Book map</span><span>›</span><span>${u.title}</span></div><div class="unit-heading"><div><h2>${u.title}</h2><p class="lead">${u.summary}</p></div><span class="range">Workbook ${u.wb}<br>PDF ${u.pdf}</span></div><div class="stack">${list.map(l=>{const p=state.progress[l.id];return `<button class="lesson-button" data-lesson="${l.id}"><strong>${l.title}</strong><span>Workbook pp. ${l.wb} · PDF pp. ${l.pdf} · Level ${p.level}/4<br>${l.goal}</span></button>`}).join('')}</div><div class="toolbar"><button id="backHome" class="quiet">Back to book map</button></div>`;
  document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>renderLesson(b.dataset.lesson));
  document.getElementById('backHome').onclick=renderHome;
}

function renderLesson(id){
  const l=lessonById[id]; if(!l)return renderHome(); currentLesson=id; currentUnit=l.unit; state.lastLesson=id; saveState(); const p=state.progress[id];
  screen.innerHTML=`<div class="crumbs"><span>${unitById[l.unit].title}</span><span>›</span><span>${l.title}</span></div><div class="book-ref">Workbook pp. ${l.wb} · PDF pp. ${l.pdf}</div><h2>${l.title}</h2><p class="lead">${l.goal}</p><div class="card"><div class="label">PUT ON THE TABLE</div><p class="script">${l.materials}</p></div><div class="card soft"><div class="label">TEACH THIS ONE IDEA</div><p class="script">${l.teach}</p></div><div class="card"><div class="label">SAY</div><p class="script">${l.script}</p></div><div class="card"><div class="label">BOOK IDEA</div><p class="script">${l.model}</p></div><div class="actions"><button id="tryQuestion" class="primary">Give me a question</button><button id="notConfident" class="secondary">She is not confident yet</button><button id="bookRefs" class="quiet">Show where this sits in the book</button></div><p class="note">Current support level: ${p.level}/4. The coach moves the level only after repeated confident responses.</p>`;
  document.getElementById('tryQuestion').onclick=()=>renderQuestion(id);
  document.getElementById('notConfident').onclick=()=>renderNotConfident(id);
  document.getElementById('bookRefs').onclick=()=>renderBookReference(id);
}

function renderQuestion(id,forcedLevel){
  const l=lessonById[id],p=state.progress[id],level=forcedLevel||p.level; currentQuestion=generate(l,level);
  screen.innerHTML=`<div class="book-ref">Workbook pp. ${l.wb} · PDF pp. ${l.pdf}</div><div class="eyebrow">${l.title} · LEVEL ${level}/4</div><div class="question-box"><div class="label">ASK MAYA</div><div class="q">${currentQuestion.q}</div><div class="hint">${currentQuestion.h}</div></div><div class="card"><div class="label">FOR YOU</div><p class="script">Expected: <strong>${currentQuestion.a}</strong></p><p class="mini">Do not show her the answer. Watch the route she uses.</p></div><div class="outcomes"><button data-outcome="confident"><strong>Right + confident</strong>She understood the move and could explain it.</button><button data-outcome="help"><strong>Right, but needed help</strong>She could do it with prompting or manipulatives.</button><button data-outcome="idea"><strong>Answer right, idea shaky</strong>She got the result but could not explain the transformation.</button><button data-outcome="lost"><strong>Lost track midway</strong>She understood the start but lost an intermediate quantity.</button><button data-outcome="different"><strong>Different valid method</strong>She solved it another way.</button><button data-outcome="wrong"><strong>Wrong / unsure</strong>We need to find the break point.</button></div>`;
  document.querySelectorAll('[data-outcome]').forEach(b=>b.onclick=()=>handleOutcome(id,b.dataset.outcome));
}

function updateProgress(id,outcome){
  const p=state.progress[id]; p.attempts++;p.last=outcome;
  if(outcome==='confident'){p.confident++;p.streak++;if(p.streak>=2&&p.level<4){p.level++;p.streak=0;}}
  else if(outcome==='help'){p.help++;p.streak=0;}
  else {p.notYet++;p.streak=0;}
  saveState();
}

function handleOutcome(id,outcome){
  const l=lessonById[id]; updateProgress(id,outcome); const p=state.progress[id];
  let title='',copy='',tone='';
  if(outcome==='confident'){title=p.level===4?'Keep mixing it in':'Move up a little';copy=`Good. Do not add more explanation. Give another question at level ${p.level}/4. If she stays confident, let the representation fade naturally.`;}
  if(outcome==='help'){title='Stay here';copy='Same concept, new numbers. Keep the same manipulatives and say less this time. Give her time to make the move herself.';}
  if(outcome==='idea'){title='Move down in representation';tone='warn';copy=`Keep the mathematics, but make the change physical again. ${l.down}`;}
  if(outcome==='lost'){title='Reduce memory load';tone='warn';copy='Do not automatically make the arithmetic easier. Leave the intermediate number or quantity physically visible. Ask for one change only, stop, label it, then continue.';}
  if(outcome==='different'){title='Accept her mathematics first';copy='If her route is valid and she can explain what changed, accept it. Ask her to show her route with materials. Only then offer the book strategy as another useful tool, not as a correction.';}
  if(outcome==='wrong'){return renderDiagnostic(id);}
  screen.innerHTML=`<div class="book-ref">Workbook pp. ${l.wb} · PDF pp. ${l.pdf}</div><div class="card ${tone}"><div class="route-title">${title}</div><p class="route-copy">${copy}</p></div><div class="actions"><button id="another" class="primary">Another question</button><button id="easier" class="secondary">Give me an easier one</button><button id="teachAgain" class="quiet">Show teaching steps again</button></div>`;
  document.getElementById('another').onclick=()=>renderQuestion(id);
  document.getElementById('easier').onclick=()=>renderQuestion(id,Math.max(1,p.level-1));
  document.getElementById('teachAgain').onclick=()=>renderLesson(id);
}

function diagnosticQuestions(l){
  return [
    {q:'Can she represent the quantity correctly with the manipulatives?',no:'Build the quantity together without calculating. Name what each piece represents.'},
    {q:'Can she explain what the operation is asking her to do?',no:'Act out the operation only: combine, remove, share, group, compare, or partition.'},
    {q:'Can she do the first single move of the strategy?',no:l.down},
    {q:'Can she keep the result of that first move visible and continue?',no:'Write or place the intermediate result on a card. Do not ask her to hold it mentally yet.'}
  ];
}

function renderDiagnostic(id,index=0){
  const l=lessonById[id],probes=diagnosticQuestions(l),pr=probes[index];
  screen.innerHTML=`<div class="book-ref">Workbook pp. ${l.wb} · PDF pp. ${l.pdf}</div><div class="eyebrow">FIND THE BREAK POINT · ${index+1}/${probes.length}</div><h2>Ask just this</h2><p class="focus">${pr.q}</p><div class="outcomes"><button id="yes"><strong>Yes</strong>She can do this part.</button><button id="no"><strong>No / not securely</strong>This is where we intervene.</button></div>`;
  document.getElementById('yes').onclick=()=>{if(index===probes.length-1)renderDiagnosticReady(id);else renderDiagnostic(id,index+1)};
  document.getElementById('no').onclick=()=>renderIntervention(id,pr.no);
}

function renderIntervention(id,fix){
  const l=lessonById[id];
  screen.innerHTML=`<div class="book-ref">Workbook pp. ${l.wb} · PDF pp. ${l.pdf}</div><div class="card warn"><div class="route-title">Work here first</div><p class="route-copy">${fix}</p></div><p class="lead">You can stay here for as many questions as Maya needs. Confidence comes before removing the scaffold.</p><div class="actions"><button id="easyQ" class="primary">Give me a very easy question</button><button id="again" class="secondary">Redo the diagnostic</button><button id="teach" class="quiet">Back to teaching steps</button></div>`;
  document.getElementById('easyQ').onclick=()=>renderQuestion(id,1);document.getElementById('again').onclick=()=>renderDiagnostic(id);document.getElementById('teach').onclick=()=>renderLesson(id);
}
function renderDiagnosticReady(id){screen.innerHTML=`<div class="card good"><div class="route-title">The pieces are there</div><p class="route-copy">She can perform the component moves. The difficulty may be coordinating them or confidence rather than missing prerequisite knowledge. Keep the trail visible and give several same-level questions without timing.</p></div><div class="actions"><button id="same" class="primary">Give me another same-level question</button><button id="teach" class="quiet">Back to lesson</button></div>`;document.getElementById('same').onclick=()=>renderQuestion(id);document.getElementById('teach').onclick=()=>renderLesson(id);}

function renderNotConfident(id){
  const l=lessonById[id];
  screen.innerHTML=`<div class="book-ref">Workbook pp. ${l.wb} · PDF pp. ${l.pdf}</div><h2>If she is hesitant, don't test harder</h2><div class="card warn"><div class="label">FIRST MOVE</div><p class="script">${l.down}</p></div><div class="callout">Keep the concept the same whenever possible. Move from mental → written/visible → manipulative before moving to much smaller numbers.</div><div class="actions"><button id="diag" class="primary">Walk me through what she knows</button><button id="easy" class="secondary">Give me easy questions here</button><button id="back" class="quiet">Back to lesson</button></div>`;
  document.getElementById('diag').onclick=()=>renderDiagnostic(id);document.getElementById('easy').onclick=()=>renderQuestion(id,1);document.getElementById('back').onclick=()=>renderLesson(id);
}

function renderBookReference(id){
  const l=lessonById[id],u=unitById[l.unit];
  screen.innerHTML=`<div class="crumbs"><span>${u.title}</span><span>›</span><span>${l.title}</span></div><h2>Book reference</h2><div class="card"><div class="label">PRINTED WORKBOOK</div><p class="script">Pages <strong>${l.wb}</strong></p></div><div class="card"><div class="label">UPLOADED PDF</div><p class="script">PDF pages <strong>${l.pdf}</strong></p></div><div class="card soft"><div class="label">WHAT TO LOOK FOR</div><p class="script">${l.model}</p></div><p class="note">The workbook page number is two less than the PDF page in this scan. Use the printed page number if you are holding/printing the workbook.</p><div class="actions"><button id="back" class="primary">Back to teaching</button></div>`;
  document.getElementById('back').onclick=()=>renderLesson(id);
}

function renderProgress(){
  screen.innerHTML=`<div class="eyebrow">PARENT VIEW</div><h2>Maya's teaching map</h2><p class="lead">This is not a score. It records how much support each idea currently needs.</p>${units.map(u=>`<div class="card"><h3>${u.title}</h3>${lessons.filter(l=>l.unit===u.id).map(l=>{const p=state.progress[l.id];const status=p.attempts===0?'Not tried':p.level===4&&p.confident>=2?'Independent':p.help>p.confident?'With support':`Level ${p.level}/4`;return `<div class="progress-row"><div><strong>${l.title}</strong><div class="mini">WB ${l.wb} · ${p.attempts} attempts</div></div><span class="status">${status}</span></div>`}).join('')}</div>`).join('')}<div class="actions"><button id="home" class="primary">Back to book map</button></div>`;
  document.getElementById('home').onclick=renderHome;
}

homeBtn.onclick=renderHome;
renderHome();
