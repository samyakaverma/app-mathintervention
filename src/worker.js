import { PDFDocument } from "pdf-lib";

function extractDriveId(value) {
  const raw = String(value || "").trim();
  const m = raw.match(/\/d\/([^/]+)/) || raw.match(/[?&]id=([^&]+)/);
  return m ? m[1] : raw;
}

async function lessonPdf(request) {
  const url = new URL(request.url);
  const id = extractDriveId(url.searchParams.get("id"));
  const start = Number(url.searchParams.get("start"));
  const end = Number(url.searchParams.get("end"));

  if (!id || !Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end - start > 40) {
    return new Response("Invalid PDF request.", { status: 400 });
  }

  const candidates = [
    `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}&confirm=t`
  ];

  let sourceResponse = null;
  for (const candidate of candidates) {
    const res = await fetch(candidate, { redirect: "follow" });
    const type = res.headers.get("content-type") || "";
    if (res.ok && (type.includes("pdf") || type.includes("octet-stream"))) {
      sourceResponse = res;
      break;
    }
  }

  if (!sourceResponse) return new Response("Could not fetch the public Google Drive PDF.", { status: 502 });

  const bytes = await sourceResponse.arrayBuffer();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = src.getPageCount();
  if (start > total) return new Response(`Start page ${start} is beyond the PDF's ${total} pages.`, { status: 400 });

  const safeEnd = Math.min(end, total);
  const out = await PDFDocument.create();
  const indexes = [];
  for (let p = start; p <= safeEnd; p++) indexes.push(p - 1);
  const copied = await out.copyPages(src, indexes);
  copied.forEach(page => out.addPage(page));
  const pdf = await out.save();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="math-pages-${start}-${safeEnd}.pdf"`,
      "Cache-Control": "private, max-age=300"
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/lesson-pdf") return lessonPdf(request);
    return env.ASSETS.fetch(request);
  }
};
