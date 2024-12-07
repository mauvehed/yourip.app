import { writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const version = new Date().toISOString();
const outputPath = resolve(__dirname, "../build-version.json");

writeFileSync(outputPath, JSON.stringify({ version }, null, 2));

console.log(`Build version generated: ${version}`);
