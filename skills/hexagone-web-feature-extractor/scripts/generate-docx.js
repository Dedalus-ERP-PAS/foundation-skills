/**
 * Hexagone Web Feature Extractor — DOCX Generator
 *
 * Usage:
 *   node generate-docx.js --input features.json --output document.docx [--screenshots /path/to/screenshots]
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
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, PageNumber
} = require('docx');

// ─── Config ───
const DEDALUS_TEAL = "00838F";
const DEDALUS_ORANGE = "F57C00";
const LIGHT_GRAY = "F5F5F5";
const DARK_TEXT = "212121";
const MID_GRAY = "757575";
const PLACEHOLDER_BG = "ECEFF1";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// ─── Parse args ───
const args = process.argv.slice(2);
const getArg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const SCREENSHOT_DIR = getArg('--screenshots') || '/home/claude/screenshots';
const OUTPUT_PATH = getArg('--output') || '/home/claude/hexagone-features.docx';

// ─── Input validation ───
function validateInput(data, filePath) {
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
function tryLoadImage(filename) {
  if (!filename) return null;
  const fullPath = path.join(SCREENSHOT_DIR, filename);
  if (fs.existsSync(fullPath)) {
    try {
      const data = fs.readFileSync(fullPath);
      const ext = path.extname(filename).toLowerCase().replace('.', '');
      const type = ext === 'jpg' ? 'jpeg' : ext;
      return { data, type };
    } catch (e) {
      console.warn(`Warning: Could not read ${fullPath}: ${e.message}`);
      return null;
    }
  }
  return null;
}

function screenshotParagraph(screenshotInfo) {
  if (!screenshotInfo) return [];

  const img = tryLoadImage(screenshotInfo.file);

  if (img) {
    return [
      new Paragraph({
        spacing: { before: 120, after: 40 },
        alignment: AlignmentType.CENTER,
        children: [new ImageRun({
          type: img.type,
          data: img.data,
          transformation: { width: 620, height: 310 },
          altText: {
            title: screenshotInfo.caption || "Screenshot",
            description: screenshotInfo.caption || "Capture d'écran Hexagone Web",
            name: screenshotInfo.file || "screenshot"
          }
        })],
      }),
      new Paragraph({
        spacing: { after: 160 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({
          text: screenshotInfo.caption || "",
          italics: true, size: 18, color: MID_GRAY
        })],
      }),
    ];
  }

  // Fallback: placeholder box
  return [
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [9360],
      rows: [new TableRow({
        height: { value: 2400, rule: "atLeast" },
        children: [new TableCell({
          borders: {
            top: { style: BorderStyle.SINGLE, size: 2, color: DEDALUS_TEAL },
            bottom: { style: BorderStyle.SINGLE, size: 2, color: DEDALUS_TEAL },
            left: { style: BorderStyle.SINGLE, size: 2, color: DEDALUS_TEAL },
            right: { style: BorderStyle.SINGLE, size: 2, color: DEDALUS_TEAL },
          },
          width: { size: 9360, type: WidthType.DXA },
          shading: { fill: PLACEHOLDER_BG, type: ShadingType.CLEAR },
          margins: { top: 300, bottom: 300, left: 300, right: 300 },
          verticalAlign: "center",
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 80 },
              children: [new TextRun({
                text: "CAPTURE D\u2019\u00C9CRAN",
                bold: true, size: 24, color: DEDALUS_TEAL
              })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({
                text: screenshotInfo.caption || "Ins\u00E9rer la capture correspondante",
                italics: true, size: 20, color: MID_GRAY
              })],
            }),
          ],
        })],
      })],
    }),
    new Paragraph({ spacing: { after: 160 }, children: [] }),
  ];
}

// ─── Feature section builder ───
function featureSection(feature, index) {
  const children = [];

  // Title
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text: `${index}. ${feature.title}` })],
  }));

  // Description
  children.push(new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: feature.description, size: 22, color: DARK_TEXT })],
  }));

  // Screenshots
  if (feature.screenshots && feature.screenshots.length > 0) {
    for (const ss of feature.screenshots) {
      children.push(...screenshotParagraph(ss));
    }
  }

  // Key capabilities
  if (feature.capabilities && feature.capabilities.length > 0) {
    children.push(new Paragraph({
      spacing: { before: 160, after: 80 },
      children: [new TextRun({ text: "Fonctionnalit\u00E9s cl\u00E9s", bold: true, size: 22, color: DEDALUS_TEAL })],
    }));

    const rows = feature.capabilities.map((cap, i) =>
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 400, type: WidthType.DXA },
            shading: { fill: DEDALUS_TEAL, type: ShadingType.CLEAR },
            margins: cellMargins,
            verticalAlign: "center",
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `${i + 1}`, bold: true, color: "FFFFFF", size: 20 })]
            })],
          }),
          new TableCell({
            borders,
            width: { size: 8960, type: WidthType.DXA },
            shading: { fill: i % 2 === 0 ? LIGHT_GRAY : "FFFFFF", type: ShadingType.CLEAR },
            margins: cellMargins,
            children: [new Paragraph({
              children: [new TextRun({ text: cap, size: 21, color: DARK_TEXT })]
            })],
          }),
        ],
      })
    );

    children.push(new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [400, 8960],
      rows,
    }));
  }

  // Business value
  if (feature.businessValue) {
    children.push(new Paragraph({
      spacing: { before: 160, after: 80 },
      children: [new TextRun({ text: "Valeur m\u00E9tier", bold: true, size: 22, color: DEDALUS_ORANGE })],
    }));
    children.push(new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: feature.businessValue, size: 21, color: DARK_TEXT })],
    }));
  }

  // Page break after each feature
  children.push(new Paragraph({ children: [new PageBreak()] }));

  return children;
}

// ─── Load and validate data ───
const inputFile = getArg('--input');
if (!inputFile) {
  console.error('Error: --input argument is required.');
  console.error('Usage: node generate-docx.js --input features.json --output document.docx [--screenshots /path/to/screenshots]');
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

const validationErrors = validateInput(data, inputFile);
if (validationErrors.length > 0) {
  console.error('Input validation failed:');
  validationErrors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
}

console.log(`Generating document for space: ${data.space}`);
console.log(`Features: ${data.features.length}`);

// ─── Build document ───
const allFeatureChildren = [];
data.features.forEach((f, i) => {
  allFeatureChildren.push(...featureSection(f, i + 1));
});
// Remove last page break
allFeatureChildren.pop();

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22, color: DARK_TEXT } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: DEDALUS_TEAL },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: DEDALUS_ORANGE },
        paragraph: {
          spacing: { before: 280, after: 160 }, outlineLevel: 1,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: DEDALUS_ORANGE, space: 4 } }
        },
      },
    ]
  },
  sections: [
    // ─── COVER ───
    {
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
      },
      children: [
        new Paragraph({ spacing: { before: 3000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER, spacing: { after: 200 },
          children: [new TextRun({ text: "HEXAGONE WEB", size: 52, bold: true, color: DEDALUS_TEAL })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: `Espace ${data.space}`, size: 36, color: DEDALUS_ORANGE })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: DEDALUS_TEAL, space: 8 } },
          spacing: { after: 400 }, children: [],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: "Pr\u00E9sentation des fonctionnalit\u00E9s", size: 28, color: MID_GRAY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: "Documentation orient\u00E9e Product Owner", size: 24, color: MID_GRAY, italics: true })],
        }),
        new Paragraph({ spacing: { before: 2000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Dedalus Healthcare France", size: 24, bold: true, color: DEDALUS_TEAL })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }), size: 22, color: MID_GRAY })],
        }),
      ],
    },
    // ─── CONTENT ───
    {
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: DEDALUS_TEAL, space: 4 } },
            children: [
              new TextRun({ text: "Hexagone Web ", bold: true, size: 18, color: DEDALUS_TEAL }),
              new TextRun({ text: `| ${data.space}`, size: 18, color: MID_GRAY }),
            ],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Dedalus Healthcare France \u2013 Page ", size: 16, color: MID_GRAY }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MID_GRAY }),
            ],
          })],
        }),
      },
      children: [
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: `Fonctionnalit\u00E9s de l\u2019espace ${data.space}` })],
        }),
        ...allFeatureChildren,
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log(`Document generated: ${OUTPUT_PATH} (${(buffer.length / 1024).toFixed(1)} KB)`);
  console.log(`Screenshots directory: ${SCREENSHOT_DIR}`);
  const found = fs.existsSync(SCREENSHOT_DIR) ? fs.readdirSync(SCREENSHOT_DIR).length : 0;
  console.log(`Screenshots found: ${found}`);
  if (found === 0) {
    console.log('Note: Using placeholder boxes. Transfer screenshots to ' + SCREENSHOT_DIR + '/ to embed them.');
  }
});
