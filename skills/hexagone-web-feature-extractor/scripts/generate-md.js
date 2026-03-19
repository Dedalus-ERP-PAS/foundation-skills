/**
 * Hexagone Web Feature Extractor — Markdown Generator
 *
 * Usage:
 *   node generate-md.js --input features.json --output document.md [--screenshots /path/to/screenshots]
 *
 * The --input argument is REQUIRED. The input file must be a JSON file with this structure:
 * {
 *   "space": "Space Name",
 *   "features": [
 *     {
 *       "title": "Feature title",
 *       "description": "PO-oriented description",
 *       "capabilities": ["Cap 1", "Cap 2"],
 *       "businessValue": "Business value text",
 *       "screenshots": [
 *         { "file": "screenshot.jpg", "caption": "Caption text" }
 *       ]
 *     }
 *   ]
 * }
 *
 * A sample input file is available at: reference/default-structures-nomenclatures.json
 */

const fs = require('fs');
const path = require('path');

// ─── Parse args ───
const args = process.argv.slice(2);
const getArg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const SCREENSHOT_DIR = getArg('--screenshots') || '/home/claude/screenshots';
const OUTPUT_PATH = getArg('--output') || '/home/claude/hexagone-features.md';

// ─── Input validation ───
function validateInput(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    errors.push('Input must be a JSON object');
    return errors;
  }

  if (!data.space || typeof data.space !== 'string') {
    errors.push('Missing or invalid "space" field (must be a non-empty string)');
  }

  if (!Array.isArray(data.features) || data.features.length === 0) {
    errors.push('Missing or empty "features" array (must contain at least one feature)');
    return errors;
  }

  data.features.forEach((feature, i) => {
    const prefix = `features[${i}]`;

    if (!feature.title || typeof feature.title !== 'string') {
      errors.push(`${prefix}.title is missing or not a string`);
    }

    if (!feature.description || typeof feature.description !== 'string') {
      errors.push(`${prefix}.description is missing or not a string`);
    }

    if (feature.capabilities !== undefined && !Array.isArray(feature.capabilities)) {
      errors.push(`${prefix}.capabilities must be an array of strings`);
    } else if (Array.isArray(feature.capabilities)) {
      feature.capabilities.forEach((cap, j) => {
        if (typeof cap !== 'string') {
          errors.push(`${prefix}.capabilities[${j}] must be a string`);
        }
      });
    }

    if (feature.screenshots !== undefined && !Array.isArray(feature.screenshots)) {
      errors.push(`${prefix}.screenshots must be an array`);
    } else if (Array.isArray(feature.screenshots)) {
      feature.screenshots.forEach((ss, j) => {
        if (!ss.file || typeof ss.file !== 'string') {
          errors.push(`${prefix}.screenshots[${j}].file must be a string`);
        }
        if (ss.caption !== undefined && typeof ss.caption !== 'string') {
          errors.push(`${prefix}.screenshots[${j}].caption must be a string`);
        }
      });
    }
  });

  return errors;
}

// ─── Screenshot helper ───
function screenshotExists(filename) {
  if (!filename) return false;
  return fs.existsSync(path.join(SCREENSHOT_DIR, filename));
}

function screenshotRelativePath(filename) {
  const outputDir = path.dirname(path.resolve(OUTPUT_PATH));
  const screenshotPath = path.resolve(path.join(SCREENSHOT_DIR, filename));
  return path.relative(outputDir, screenshotPath);
}

// ─── Markdown generation ───
function generateMarkdown(data) {
  const lines = [];
  const date = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  // Cover / title
  lines.push(`# HEXAGONE WEB — Espace ${data.space}`);
  lines.push('');
  lines.push('> Présentation des fonctionnalités — Documentation orientée Product Owner');
  lines.push('');
  lines.push(`**Dedalus Healthcare France** — ${date}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Table of contents
  lines.push('## Sommaire');
  lines.push('');
  data.features.forEach((f, i) => {
    const anchor = `${i + 1}-${f.title.toLowerCase().replace(/[^a-zà-ÿ0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    lines.push(`${i + 1}. [${f.title}](#${anchor})`);
  });
  lines.push('');
  lines.push('---');
  lines.push('');

  // Features
  data.features.forEach((f, i) => {
    lines.push(`## ${i + 1}. ${f.title}`);
    lines.push('');
    lines.push(f.description);
    lines.push('');

    // Screenshots
    if (f.screenshots && f.screenshots.length > 0) {
      for (const ss of f.screenshots) {
        const caption = ss.caption || 'Capture d\'écran Hexagone Web';
        if (screenshotExists(ss.file)) {
          const relPath = screenshotRelativePath(ss.file);
          lines.push(`![${caption}](${relPath})`);
        } else {
          lines.push(`> **[CAPTURE D'ÉCRAN MANQUANTE]** — ${caption}`);
        }
        lines.push('');
      }
    }

    // Capabilities
    if (f.capabilities && f.capabilities.length > 0) {
      lines.push('### Fonctionnalités clés');
      lines.push('');
      f.capabilities.forEach((cap, j) => {
        lines.push(`${j + 1}. ${cap}`);
      });
      lines.push('');
    }

    // Business value
    if (f.businessValue) {
      lines.push('### Valeur métier');
      lines.push('');
      lines.push(f.businessValue);
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  });

  return lines.join('\n');
}

// ─── Load and validate data ───
const inputFile = getArg('--input');
if (!inputFile) {
  console.error('Error: --input argument is required.');
  console.error('Usage: node generate-md.js --input features.json --output document.md [--screenshots /path/to/screenshots]');
  console.error('');
  console.error('A sample input file is available at: reference/default-structures-nomenclatures.json');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
} catch (e) {
  console.error(`Error: Failed to parse JSON from ${inputFile}: ${e.message}`);
  process.exit(1);
}

const validationErrors = validateInput(data);
if (validationErrors.length > 0) {
  console.error('Input validation failed:');
  validationErrors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
}

console.log(`Generating document for space: ${data.space}`);
console.log(`Features: ${data.features.length}`);

const markdown = generateMarkdown(data);
fs.writeFileSync(OUTPUT_PATH, markdown, 'utf-8');

console.log(`Document generated: ${OUTPUT_PATH} (${(Buffer.byteLength(markdown) / 1024).toFixed(1)} KB)`);
console.log(`Screenshots directory: ${SCREENSHOT_DIR}`);
const found = fs.existsSync(SCREENSHOT_DIR) ? fs.readdirSync(SCREENSHOT_DIR).length : 0;
console.log(`Screenshots found: ${found}`);
if (found === 0) {
  console.log('Note: Screenshot placeholders used. Transfer screenshots to ' + SCREENSHOT_DIR + '/ to embed them.');
}
