// Olympiad profile learner correction: Terry Chew is currently for Zara.
// Keep the existing Olympiad engine, but correct learner-facing language.

const olympiadGenBase = gen;
gen = function(ch, level){
  const result = olympiadGenBase(ch, level);
  if(result && typeof result.text === 'string') result.text = result.text.replaceAll('Maya', 'Zara');
  if(result && typeof result.hint === 'string') result.hint = result.hint.replaceAll('Maya', 'Zara');
  return result;
};

const olympiadQuestionBase = renderOlympiadQuestion;
renderOlympiadQuestion = function(c, l){
  olympiadQuestionBase(c, l);
  screen.innerHTML = screen.innerHTML
    .replaceAll('ASK MAYA', 'ASK ZARA')
    .replaceAll('Maya should', 'Zara should')
    .replaceAll('Have Maya', 'Have Zara')
    .replaceAll('Maya show', 'Zara show');
};

const olympiadInterventionBase = renderOlympiadIntervention;
renderOlympiadIntervention = function(out){
  olympiadInterventionBase(out);
  screen.innerHTML = screen.innerHTML
    .replaceAll('Maya should', 'Zara should')
    .replaceAll('Have Maya', 'Have Zara')
    .replaceAll('Maya show', 'Zara show');
};

window.renderOlympiadQuestion = renderOlympiadQuestion;
window.renderOlympiadIntervention = renderOlympiadIntervention;
