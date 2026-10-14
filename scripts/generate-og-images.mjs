import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");

const pages = [
  {
    name: "og-home.png",
    html: `
      <div style="width:1200px;height:630px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0c0e14 0%,#131620 40%,#1a1d2a 100%);font-family:system-ui,-apple-system,sans-serif;color:white;padding:60px;">
        <div style="display:flex;flex-direction:column;gap:16px;max-width:900px;">
          <div style="font-size:22px;color:#60a5fa;font-weight:600;letter-spacing:2px;text-transform:uppercase;">tylerpreisser.com</div>
          <div style="font-size:64px;font-weight:800;line-height:1.1;letter-spacing:-2px;">Tyler Preisser</div>
          <div style="font-size:30px;color:#94a3b8;font-weight:400;line-height:1.4;">Chief Product Officer at <span style="color:#60a5fa;font-weight:600;">R Squared AI</span></div>
          <div style="font-size:22px;color:#64748b;margin-top:8px;">AI Systems &bull; Automation &bull; Product Strategy &bull; Operations</div>
        </div>
      </div>`,
  },
  {
    name: "og-projects.png",
    html: `
      <div style="width:1200px;height:630px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0c0e14 0%,#131620 40%,#1a1d2a 100%);font-family:system-ui,-apple-system,sans-serif;color:white;padding:60px;">
        <div style="display:flex;flex-direction:column;gap:16px;max-width:900px;">
          <div style="font-size:22px;color:#60a5fa;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Tyler Preisser</div>
          <div style="font-size:64px;font-weight:800;line-height:1.1;letter-spacing:-2px;">Projects</div>
          <div style="font-size:26px;color:#94a3b8;font-weight:400;line-height:1.5;">R Squared AI &bull; Preisser Solutions &bull; BIA &bull; SkySprayers &bull; Wife Supply Co &bull; Yard Inventory &bull; Iron &amp; Oak Podcast</div>
          <div style="font-size:20px;color:#64748b;margin-top:8px;">12+ ventures spanning AI, automation, engineering, media, and entrepreneurship</div>
        </div>
      </div>`,
  },
  {
    name: "og-resume.png",
    html: `
      <div style="width:1200px;height:630px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0c0e14 0%,#131620 40%,#1a1d2a 100%);font-family:system-ui,-apple-system,sans-serif;color:white;padding:60px;">
        <div style="display:flex;flex-direction:column;gap:16px;max-width:900px;">
          <div style="font-size:22px;color:#60a5fa;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Tyler Preisser</div>
          <div style="font-size:64px;font-weight:800;line-height:1.1;letter-spacing:-2px;">Resume</div>
          <div style="font-size:30px;color:#94a3b8;font-weight:400;line-height:1.4;">Chief Product Officer, Inventor &amp; Builder</div>
          <div style="font-size:22px;color:#64748b;margin-top:8px;">R Squared AI &bull; Fort Hays State University &bull; Hays, Kansas</div>
        </div>
      </div>`,
  },
];

async function generate() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
  });

  for (const page of pages) {
    const p = await context.newPage();
    await p.setContent(page.html, { waitUntil: "load" });
    await p.screenshot({
      path: path.join(publicDir, page.name),
      type: "png",
    });
    await p.close();
    const size = (await fs.stat(path.join(publicDir, page.name))).size;
    console.log(`Generated ${page.name} (${size} bytes)`);
  }

  await browser.close();
}

generate().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
