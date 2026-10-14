import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "out");
const version = new Date().toISOString().replace(/[-:.TZ]/g, "");
const textExtensions = new Set([".html", ".js", ".css", ".txt", ".json"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const target = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(target);
      continue;
    }

    if (!textExtensions.has(path.extname(entry.name))) {
      continue;
    }

    let contents = fs.readFileSync(target, "utf8");

    contents = contents
      .replace(/\/assets\/([A-Za-z0-9._-]+\.(?:js|css))(?:\?v=[A-Za-z0-9]+)?/g, `/assets/$1?v=${version}`)
      // Vite lazy-chunk manifest references chunks as bare "assets/X.js" (no leading slash);
      // version those too so immutable-cached chunks refetch after a content change.
      .replace(/(?<![/.\w])assets\/([A-Za-z0-9._-]+\.(?:js|css))(?:\?v=[A-Za-z0-9]+)?/g, `assets/$1?v=${version}`)
      .replace(/\.\/([A-Za-z0-9._-]+\.(?:js|css))(?:\?v=[A-Za-z0-9]+)?/g, `./$1?v=${version}`)
      .replace(/\/Resume_Tyler_Preisser\.pdf(?:\?v=[A-Za-z0-9]+)?/g, `/Resume_Tyler_Preisser.pdf?v=${version}`);

    fs.writeFileSync(target, contents);
  }
}

walk(root);

console.log(`Static cache-bust version applied: ${version}`);
