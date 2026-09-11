// Singapore Math unit-review diagnostic cards.
// The review pages come from the actual 2A/2B Standards Edition workbooks in Drive.
// They are shown before lesson/intervention cards so the parent can test out of a unit first.

const SINGAPORE_UNIT_REVIEWS = {
  '2a-u1': {label:'Review 1', start:28, end:30},
  '2a-u2': {label:'Review 2', start:69, end:71},
  '2a-u3': {label:'Review 3', start:79, end:82},
  '2a-u4': {label:'Review 4', start:87, end:91},
  '2a-u5': {label:'Review 5', start:111, end:114},
  '2a-u6': {label:'Review 6', start:163, end:168, extra:{label:'Cumulative Review 7',start:169,end:176}},

  // The current 2B UI uses older internal unit ids, so these are keyed to the
  // existing subject cards but point to the matching review in the Drive workbook.
  '2b-u6': {label:'Review 8 · Addition & Subtraction', start:26, end:29},
  '2b-u7': {label:'Review 9 · Multiplication & Division', start:57, end:60},
  '2b-u8': {label:'Review 10 · Money', start:87, end:91},
  '2b-u9': {label:'Review 11 · Fractions', start:110, end:114},
  '2b-u10': {label:'Review 12 · Time', start:129, end:133},
  '2b-u11': {label:'Review 14 · Tables & Graphs', start:162, end:167},
  '2b-u12': {label:'Review 15 · Geometry', start:183, end:192}
};

function singaporeReviewPdf(book,start,end){
  return `/api/lesson-pdf?id=${encodeURIComponent(BOOKS[book].id)}&start=${start}&end=${end}`;
}

const singaporeRenderUnitBase = renderUnit;
renderUnit = function(unitId){
  singaporeRenderUnitBase(unitId);
  const review=SINGAPORE_UNIT_REVIEWS[unitId];
  const unit=units.find(u=>u.id===unitId);
  if(!review || !unit) return;

  const heading=screen.querySelector('.unit-heading');
  if(!heading) return;

  const extra=review.extra ? `
    <a class="review-secondary" href="${singaporeReviewPdf(unit.book,review.extra.start,review.extra.end)}" target="_blank" rel="noopener">
      ${review.extra.label} · pp. ${review.extra.start}–${review.extra.end}
    </a>` : '';

  heading.insertAdjacentHTML('afterend',`
    <section class="unit-review-card" aria-label="Unit review diagnostic">
      <div class="review-kicker">START HERE · UNIT CHECK</div>
      <h3>${review.label}</h3>
      <p>Use the review before teaching this unit. Let Maya try it without coaching first. If most of it is easy and independent, skip the unit and only open interventions for the parts that expose a gap.</p>
      <a class="review-primary" href="${singaporeReviewPdf(unit.book,review.start,review.end)}" target="_blank" rel="noopener">
        Open unit review · pp. ${review.start}–${review.end}
      </a>
      ${extra}
      <div class="review-rule"><strong>Quick decision:</strong> secure = skip; a few misses = target those skills; broad confusion = teach the unit.</div>
    </section>`);
};
