import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");
const pdfName = "Resume_Tyler_Preisser.pdf";
const tempPdfPath = path.join(root, ".tmp-resume.pdf");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveFilePath(urlPath) {
  const pathname = decodeURIComponent(new URL(urlPath, "http://127.0.0.1").pathname);
  const relativePath = pathname.endsWith("/")
    ? `${pathname}index.html`
    : path.extname(pathname)
      ? pathname
      : `${pathname}/index.html`;
  const filePath = path.resolve(outDir, `.${relativePath}`);

  if (!filePath.startsWith(outDir)) {
    throw new Error(`Refused to serve path outside build output: ${pathname}`);
  }

  return filePath;
}

async function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const filePath = resolveFilePath(req.url || "/");
      const body = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();

      res.writeHead(200, {
        "Content-Type": contentTypes[ext] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });

  return server;
}

async function generateResumePdf() {
  await fs.access(path.join(outDir, "resume", "index.html"));

  const server = await startServer();
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Failed to start local build server for PDF export.");
  }

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 1400, height: 1800 },
      colorScheme: "light",
    });

    await page.emulateMedia({ media: "screen" });
    await page.goto(`http://127.0.0.1:${address.port}/resume/?overlay=false&pdf=true`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(async () => {
      await document.fonts?.ready;

      document.documentElement.style.background = "#ffffff";
      document.body.style.background = "#ffffff";

      // Tighten padding for PDF output so resume fits on fewer pages
      const pdfStyle = document.createElement("style");
      pdfStyle.textContent = `
        /* Kill the huge internal padding on the resume page */
        #root > div > div > div { padding: 8px 0 !important; }
        /* Reduce gaps throughout */
        .MuiStack-root { gap: 12px !important; }
        [class*="MuiContainer"] { padding-left: 0 !important; padding-right: 0 !important; max-width: 100% !important; }
        header { gap: 0 !important; margin-bottom: 4px !important; }
        /* Tighten skill chips */
        .MuiChip-root { height: 22px !important; font-size: 10.5px !important; padding: 0 6px !important; }
        /* Compact fonts for print density */
        h2 { font-size: 1.5rem !important; margin: 0 !important; line-height: 1.2 !important; }
        h6 { font-size: 0.8rem !important; margin: 0 !important; line-height: 1.3 !important; }
        [class*="body2"] { font-size: 11.5px !important; line-height: 1.4 !important; }
        [class*="body1"] { font-size: 12.5px !important; line-height: 1.4 !important; }
        /* Reduce divider/section spacing */
        .MuiDivider-root { margin: 2px 0 !important; }
        /* Company logos smaller for density */
        .MuiAvatar-sizeLg { width: 36px !important; height: 36px !important; }
        .MuiAvatar-sizeLg img { width: 36px !important; height: 36px !important; }
        /* Section headings compact */
        .MuiAvatar-sizeSm { width: 28px !important; height: 28px !important; }
      `;
      document.head.appendChild(pdfStyle);

      for (const element of document.querySelectorAll("*")) {
        const style = window.getComputedStyle(element);

        if (style.position === "fixed") {
          element.setAttribute("data-pdf-hidden", "true");
        }
      }

      for (const element of document.querySelectorAll('[data-pdf-hidden="true"]')) {
        element.remove();
      }

      // Freeze the React app: replace #root's innerHTML with a static
      // snapshot so React can no longer reconcile or re-render while we
      // restructure the DOM for PDF export.
      const rootEl = document.getElementById("root");
      if (rootEl) {
        rootEl.innerHTML = rootEl.innerHTML;
      }

      // Work around Chromium print bug: images inside nested flex-column
      // layouts fail to paint during PDF generation.  Restructure every
      // avatar-plus-content flex row into a table so the company/school
      // logo images render correctly in the exported PDF.
      //
      // We target MuiAvatar-sizeLg avatars (the 48px company/school logos)
      // and skip the small MuiAvatar-sizeSm ones used as section-heading
      // decorators (e.g. the briefcase icon next to "Work experience").
      const avatarImageCache = new Map();

      for (const img of [...document.querySelectorAll("img")]) {
        const avatar = img.closest(".MuiAvatar-sizeLg");
        if (!avatar) continue;

        const row = avatar.parentElement;
        const contentSibling = Array.from(row.children).find(
          (child) => child !== avatar,
        );
        if (!contentSibling) continue;

        // Inline the image as a data-URL so the PDF embeds it directly.
        const src = img.src;
        let dataUrl = avatarImageCache.get(src);

        if (!dataUrl) {
          try {
            const resp = await fetch(src);
            const blob = await resp.blob();
            dataUrl = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
            avatarImageCache.set(src, dataUrl);
          } catch {
            continue;
          }
        }

        // Build a table-based replacement for the flex row.
        const table = document.createElement("table");
        table.style.cssText =
          "border-collapse:collapse;width:100%;table-layout:fixed";

        const tr = document.createElement("tr");

        const tdImg = document.createElement("td");
        tdImg.style.cssText = "width:60px;vertical-align:top;padding:0 12px 0 0";

        const newImg = document.createElement("img");
        newImg.src = dataUrl;
        newImg.alt = img.alt || "";
        newImg.style.cssText =
          "width:48px;height:48px;object-fit:contain;border-radius:12px;" +
          "border:1px solid #ddd;background:#f5f5f5;display:block";
        tdImg.appendChild(newImg);

        const tdContent = document.createElement("td");
        tdContent.style.cssText = "vertical-align:top";

        // Move the content column's children into the table cell.
        while (contentSibling.firstChild) {
          tdContent.appendChild(contentSibling.firstChild);
        }

        tr.appendChild(tdImg);
        tr.appendChild(tdContent);
        table.appendChild(tr);
        row.replaceWith(table);
      }
    });

    await page.pdf({
      path: tempPdfPath,
      format: "Letter",
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: "0.25in",
        right: "0.25in",
        bottom: "0.25in",
        left: "0.25in",
      },
    });
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  await fs.copyFile(tempPdfPath, path.join(publicDir, pdfName));
  await fs.copyFile(tempPdfPath, path.join(outDir, pdfName));
  await fs.rm(tempPdfPath, { force: true });

  console.log(`Resume PDF exported to /${pdfName}`);
}

generateResumePdf().catch(async (error) => {
  console.error(error);
  await fs.rm(tempPdfPath, { force: true });
  process.exitCode = 1;
});
