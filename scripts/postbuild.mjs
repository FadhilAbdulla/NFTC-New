// Runs after `next build`. Removes the placeholder news route (see app/news/[slug]/page.tsx)
// and fails the build if anything that must never be deployed ended up in out/.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
for (const entry of fs.readdirSync(path.join(out, "news"))) {
  if (entry.startsWith("_placeholder")) fs.rmSync(path.join(out, "news", entry), { recursive: true, force: true });
}

const forbidden = ["ntfc_final", ".env", ".dev.vars", "node_modules"];
const leaked = forbidden.filter((name) => fs.existsSync(path.join(out, name)));
if (leaked.length) {
  console.error(`postbuild: refusing to continue, out/ contains ${leaked.join(", ")}`);
  process.exit(1);
}
console.log("postbuild: out/ is ready to deploy");
