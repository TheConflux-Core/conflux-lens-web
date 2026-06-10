#!/usr/bin/env node
/**
 * Sync install scripts from the canonical source (conflux-lens repo) into
 * this website's public/ directory so the one-liner URLs always serve the
 * latest version.
 *
 * Source: ../conflux-lens/scripts/install.{sh,ps1}
 * Target: public/install.{sh,ps1}
 *
 * Runs automatically as `prebuild` and `predev` in package.json.
 * Can be invoked manually with: npm run sync-install-scripts
 *
 * Exits non-zero if the source scripts are missing or unreadable.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, '../../conflux-lens/scripts');
const TARGET_DIR = path.resolve(__dirname, '../public');

const SCRIPTS = ['install.sh', 'install.ps1'];

let ok = true;
for (const name of SCRIPTS) {
  const src = path.join(SOURCE_DIR, name);
  const dst = path.join(TARGET_DIR, name);
  try {
    if (!fs.existsSync(src)) {
      console.error(`[sync-install-scripts] missing source: ${src}`);
      ok = false;
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
    } else {
      console.log(`[sync-install-scripts] up to date: ${name}`);
    }
  } catch (err) {
    console.error(`[sync-install-scripts] failed to sync ${name}: ${err.message}`);
    ok = false;
  }
}

if (!ok) {
  console.error('[sync-install-scripts] one or more scripts failed to sync');
  process.exit(1);
}
