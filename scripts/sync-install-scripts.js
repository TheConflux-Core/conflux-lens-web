#!/usr/bin/env node
/**
 * Sync install scripts from the canonical source (conflux-lens repo) into
 * this website's public/ directory so the one-liner URLs always serve the
 * latest version.
 *
 * Source: ../conflux-lens/scripts/install.{sh,ps1}  (when available)
 * Target: public/install.{sh,ps1}                    (always committed)
 *
 * Runs automatically as `prebuild` and `predev` in package.json.
 * Can be invoked manually with: npm run sync-install-scripts
 *
 * Behavior:
 * - On a dev machine with the sibling `conflux-lens` repo checked out
 *   alongside this one, syncs the latest scripts into public/ so the
 *   website always serves fresh copies.
 * - On a fresh clone (e.g. Vercel's build environment), the sibling
 *   repo is not present — in that case we WARN and SKIP, never fail.
 *   The committed public/install.{sh,ps1} files deploy as-is.
 *
 * This script never exits non-zero, because failing the build when the
 * sibling repo is missing is wrong — the public/ copies are good enough.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, '../../conflux-lens/scripts');
const TARGET_DIR = path.resolve(__dirname, '../public');

const SCRIPTS = ['install.sh', 'install.ps1'];

// Bail out cleanly if the canonical source directory doesn't exist.
// This is the Vercel case — only the website repo is checked out.
if (!fs.existsSync(SOURCE_DIR)) {
  console.log(
    `[sync-install-scripts] sibling source not found at ${SOURCE_DIR} — using committed copies in public/`
  );
  console.log(
    `[sync-install-scripts] (this is normal on CI; run \`npm run sync-install-scripts\` locally to refresh)`
  );
  process.exit(0);
}

let synced = 0;
let upToDate = 0;
for (const name of SCRIPTS) {
  const src = path.join(SOURCE_DIR, name);
  const dst = path.join(TARGET_DIR, name);
  try {
    if (!fs.existsSync(src)) {
      console.warn(`[sync-install-scripts] WARNING: source missing: ${src} — skipping`);
      continue;
    }
    const sourceStat = fs.statSync(src);
    let shouldCopy = true;
    if (fs.existsSync(dst)) {
      const destStat = fs.statSync(dst);
      if (destStat.size === sourceStat.size && destStat.mtimeMs >= sourceStat.mtimeMs) {
        shouldCopy = false;
      }
    }
    if (shouldCopy) {
      fs.copyFileSync(src, dst);
      console.log(`[sync-install-scripts] synced ${name} (${sourceStat.size} bytes)`);
      synced += 1;
    } else {
      console.log(`[sync-install-scripts] up to date: ${name}`);
      upToDate += 1;
    }
  } catch (err) {
    console.warn(`[sync-install-scripts] WARNING: failed to sync ${name}: ${err.message} — skipping`);
  }
}

console.log(`[sync-install-scripts] done (${synced} synced, ${upToDate} up to date)`);
process.exit(0);
