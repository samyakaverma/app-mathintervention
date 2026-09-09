// Reliable page excerpts: do not depend on Google Drive honoring #page= anchors.
// Cloudflare Pages Function /api/lesson-pdf fetches the public Drive PDF and returns only the relevant page range.

function pageRange(value){
  const nums = String(value || '').match(/\d+/g)?.map(Number) || [1];
  return { start: nums[0], end: nums[nums.length - 1] };
}

function lessonPdfUrl(book, pageSpec){
  const b = BOOKS[book];
  const {start, end} = pageRange(pageSpec);
  return `/api/lesson-pdf?id=${encodeURIComponent(b.id)}&start=${start}&end=${end}`;
}

function pageRef(l){
  const b = BOOKS[l.book];
  const pp = l.wb === l.pdf
    ? `Workbook/PDF pp. ${l.wb}`
    : `Workbook pp. ${l.wb} · PDF pp. ${l.pdf}`;
  const {start, end} = pageRange(l.pdf);
  const rangeLabel = start === end ? `p. ${start}` : `pp. ${start}–${end}`;

  return `<div class="card soft page-card">
    <div class="label">BOOK PAGES</div>
    <strong>${pp}</strong>
    <div class="page-actions">
      <a class="page-link primary" href="${lessonPdfUrl(l.book,l.pdf)}" target="_blank" rel="noopener">Open lesson pages · ${rangeLabel}</a>
      <a class="page-link quiet" href="${b.drive}" target="_blank" rel="noopener">Open whole book</a>
    </div>
    <div class="mini">The first button opens a short PDF containing only these lesson pages, so it no longer relies on Google Drive jumping to the right page.</div>
  </div>`;
}
