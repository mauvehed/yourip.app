import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");
const outputPath = resolve(__dirname, "../build-version.json");

// Get git information
const getGitInfo = () => {
  try {
    const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .trim();
    const isDirty =
      execSync("git status --porcelain").toString().trim().length > 0;
    return { commitHash, branch, isDirty };
  } catch (error) {
    console.warn("Could not get git information:", error.message);
    return { commitHash: "unknown", branch: "unknown", isDirty: false };
  }
};

// Check if we need to update the version
const shouldUpdateVersion = () => {
  if (!existsSync(outputPath)) return true;

  try {
    const currentVersion = JSON.parse(readFileSync(outputPath, "utf-8"));
    const { commitHash, isDirty } = getGitInfo();

    // Update if:
    // 1. The commit hash has changed
    // 2. There are uncommitted changes
    // 3. The file doesn't exist
    return currentVersion.commitHash !== commitHash || isDirty;
  } catch (error) {
    console.warn("Could not read current version:", error.message);
    return true;
  }
};

// Only generate new version if needed
if (shouldUpdateVersion()) {
  const { commitHash, branch, isDirty } = getGitInfo();
  const timestamp = new Date().toISOString();
  const version = {
    timestamp,
    commitHash,
    branch,
    isDirty,
    version: `${branch}-${commitHash}${isDirty ? "-dirty" : ""}-${timestamp.split("T")[0]}`,
  };

  writeFileSync(outputPath, JSON.stringify(version, null, 2));
  console.log(`Build version generated: ${version.version}`);
} else {
  console.log("Using existing build version");
}
