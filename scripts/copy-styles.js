const fs = require("fs");
const path = require("path");

const source = path.join("src", "styles", "styles.css");
const targetDir = path.join("dist", "src", "styles");

fs.mkdirSync(targetDir, { recursive: true });
fs.copyFileSync(source, path.join(targetDir, "styles.css"));

stripCssImports("dist");

function stripCssImports(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      stripCssImports(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".d.ts")) {
      continue;
    }
    const sourceText = fs.readFileSync(fullPath, "utf8");
    const withoutCssImport = sourceText.replace(/^import\s+["'][^"']+\.css["'];\r?\n/gm, "");
    if (withoutCssImport !== sourceText) {
      fs.writeFileSync(fullPath, withoutCssImport);
    }
  }
}
