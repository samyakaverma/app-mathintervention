// Page-link hotfix: open Drive viewer, never the direct download endpoint.
// Also keep optional Math at Home appendix references out of the main teaching flow.
function deepDriveUrl(book, page){
  const b = BOOKS[book];
  return `https://drive.google.com/file/d/${b.id}/view#page=${page}`;
}

function pageRef(l){
  const b = BOOKS[l.book];
  const pp = l.wb === l.pdf
    ? `Workbook/PDF pp. ${l.wb}`
    : `Workbook pp. ${l.wb} · PDF pp. ${l.pdf}`;
  const pdfStart = firstPage(l.pdf);

  return `<div class="card soft page-card">
    <div class="label">BOOK PAGES</div>
    <strong>${pp}</strong>
    <div class="page-actions">
      <a class="page-link primary" href="${deepDriveUrl(l.book,pdfStart)}" target="_blank" rel="noopener">Open PDF viewer · p. ${pdfStart}</a>
      <a class="page-link quiet" href="${b.drive}" target="_blank" rel="noopener">Open whole book</a>
    </div>
    <div class="mini">This opens Google Drive's viewer, not a download. If Drive does not honor the page jump on your phone, the exact PDF page is shown above.</div>
  </div>`;
}
