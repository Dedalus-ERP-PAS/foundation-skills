/**
 * Hexagone Web Feature Extractor — DOCX Generator
 * 
 * Usage:
 *   node generate-docx.js --input features.json --output document.docx [--screenshots /path/to/screenshots]
 * 
 * Or: node generate-docx.js  (uses default embedded data)
 * 
 * features.json format:
 * {
 *   "space": "Structures / Nomenclatures",
 *   "features": [
 *     {
 *       "title": "Tableau de bord",
 *       "description": "Vue synthétique...",
 *       "capabilities": ["Cap 1", "Cap 2"],
 *       "businessValue": "Permet de...",
 *       "screenshots": [
 *         { "file": "01-tableau-de-bord.jpg", "caption": "Tableau de bord exercice 2026" }
 *       ]
 *     }
 *   ]
 * }
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
  // screenshotInfo: { file: "xxx.jpg", caption: "Description" }
  if (!screenshotInfo) return [];

  const img = tryLoadImage(screenshotInfo.file);

  if (img) {
    // Embedded image — scale to fit page width (9360 DXA ≈ 6.5 inches ≈ 624px at 96dpi)
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

// ─── Default data: Structures / Nomenclatures ───
const DEFAULT_DATA = {
  space: "Structures / Nomenclatures",
  features: [
    {
      title: "Tableau de bord synth\u00E9tique",
      description: "Le tableau de bord offre une vue consolid\u00E9e et imm\u00E9diate de la structure budg\u00E9taire de l\u2019\u00E9tablissement, par exercice comptable. Il affiche en un coup d\u2019\u0153il les indicateurs cl\u00E9s : nombre d\u2019entit\u00E9s juridiques, lettres budgets actives, unit\u00E9s fonctionnelles valid\u00E9es et comptes ordonnateurs. Un graphique camembert permet de visualiser la r\u00E9partition par \u00E9tablissement.",
      capabilities: [
        "Vue multi-exercice (N et N-1) avec comparaison des indicateurs cl\u00E9s",
        "Indicateur de validation de structure (pastille verte/orange) avec date et responsable",
        "Onglets d\u00E9di\u00E9s : Lettres Budgets, UF Valides, Comptes Ordonnateurs",
        "Graphique de r\u00E9partition par entit\u00E9 juridique (camembert interactif)",
        "Widget Post-its int\u00E9gr\u00E9 avec tri par importance et par \u00E9metteur",
        "Affichage du nombre total de comptes ordonnateurs par exercice",
      ],
      businessValue: "Permet aux d\u00E9cideurs et aux gestionnaires financiers de piloter la coh\u00E9rence de la structure budg\u00E9taire en temps r\u00E9el. La comparaison inter-exercices facilite le suivi de l\u2019\u00E9volution et la pr\u00E9paration des EPRD.",
      screenshots: [{ file: "01-tableau-de-bord.jpg", caption: "Tableau de bord avec exercices 2025 et 2026, graphiques de r\u00E9partition par \u00E9tablissement" }],
    },
    {
      title: "Post-its collaboratifs",
      description: "Syst\u00E8me de messagerie interne l\u00E9g\u00E8re permettant aux utilisateurs d\u2019\u00E9changer des notes contextualis\u00E9es directement dans l\u2019espace de travail. Les post-its peuvent \u00EAtre class\u00E9s par importance (Urgent, Important, Normal) et filtr\u00E9s par \u00E9metteur.",
      capabilities: [
        "Cr\u00E9ation de post-its avec niveau de priorit\u00E9 (Urgent / Important / Normal)",
        "Vue des post-its envoy\u00E9s et re\u00E7us",
        "Tri par importance ou par \u00E9metteur",
        "Compteurs synth\u00E9tiques sur le tableau de bord",
      ],
      businessValue: "Favorise la communication inter-\u00E9quipes sans quitter l\u2019application. Particuli\u00E8rement utile pour les \u00E9changes entre DAF, contr\u00F4le de gestion et cellule budg\u00E9taire lors des campagnes EPRD.",
      screenshots: [{ file: "02-post-its.jpg", caption: "\u00C9cran Mes Post-its (envoy\u00E9s) avec bouton d\u2019ajout" }],
    },
    {
      title: "Regroupement multi-entit\u00E9s juridiques (GHT)",
      description: "Cet \u00E9cran permet de configurer et de g\u00E9rer le Groupement Hospitalier de Territoire (GHT) auquel l\u2019\u00E9tablissement est rattach\u00E9. Il centralise les informations r\u00E9glementaires (date d\u2019approbation ARS, SIRET, profil acheteur) et les param\u00E8tres de gestion mutualis\u00E9e des achats.",
      capabilities: [
        "Fiche GHT compl\u00E8te : d\u00E9nomination, date ARS, SIRET, URL profil acheteur",
        "Configuration du module HA GHT : gestion centralis\u00E9e / non centralis\u00E9e / non mis en \u0153uvre",
        "Num\u00E9rotation automatique fournisseurs et produits avec compteur param\u00E9trable",
        "Liste des entit\u00E9s juridiques adh\u00E9rentes avec codes FINESS",
        "Identification du site support GHT et du SIH Hexagone",
        "Acc\u00E8s rapides vers les fiches d\u00E9taill\u00E9es de chaque EJ",
      ],
      businessValue: "R\u00E9pond aux obligations r\u00E9glementaires li\u00E9es \u00E0 la mutualisation des achats en GHT. Simplifie le param\u00E9trage initial et la gestion courante des regroupements multi-\u00E9tablissements.",
      screenshots: [{ file: "03-ght.jpg", caption: "Formulaire GHT avec entit\u00E9s juridiques adh\u00E9rentes" }],
    },
    {
      title: "Lettres budgets",
      description: "Gestion centralis\u00E9e des lettres budgets de l\u2019\u00E9tablissement pour chaque exercice comptable. Chaque lettre budget (A \u00E0 M) correspond \u00E0 un p\u00E9rim\u00E8tre fonctionnel (Budget g\u00E9n\u00E9ral, EHPAD, IFSI, Long s\u00E9jour, Centre de sant\u00E9, GHT, etc.) avec sa nomenclature comptable associ\u00E9e (M21).",
      capabilities: [
        "Liste compl\u00E8te des lettres budgets par exercice avec libell\u00E9 et nomenclature",
        "Cr\u00E9ation et param\u00E9trage de nouvelles lettres budgets",
        "D\u00E9pliage hi\u00E9rarchique pour visualiser les d\u00E9tails de chaque lettre",
        "S\u00E9lection d\u2019exercice (2025, 2026\u2026) avec statut de validation",
        "D\u00E9tection d\u2019anomalies int\u00E9gr\u00E9e",
        "Export des donn\u00E9es",
      ],
      businessValue: "Offre une vision structur\u00E9e de l\u2019ensemble des budgets annexes et du budget principal. Essentiel pour la pr\u00E9paration du Budget Initial, de l\u2019EPRD et du suivi infra-annuel dans le respect de la nomenclature M21.",
      screenshots: [{ file: "04-lettres-budgets.jpg", caption: "Liste des lettres budgets A \u00E0 M avec nomenclature M21" }],
    },
    {
      title: "D\u00E9coupages comptable",
      description: "Module de gestion du d\u00E9coupage analytique de l\u2019\u00E9tablissement, organis\u00E9 en deux axes : les unit\u00E9s fonctionnelles (UF) et les p\u00F4les / niveaux de regroupements. Ce module permet de structurer l\u2019organigramme budg\u00E9taire de l\u2019h\u00F4pital.",
      capabilities: [
        "Onglet Unit\u00E9s Fonctionnelles : recherche multi-crit\u00E8res (UF, libell\u00E9, EJ, lettre budget GHT, dates)",
        "Onglet P\u00F4les et Niveaux de Regroupements : gestion des natures et hi\u00E9rarchies",
        "Ajout d\u2019UF, de natures et de regroupements",
        "Filtrage par lettre budget GHT et entit\u00E9 juridique",
        "Export au format CSV (tableur)",
        "R\u00E9initialisation des filtres de recherche",
      ],
      businessValue: "Permet d\u2019aligner le d\u00E9coupage comptable avec l\u2019organisation m\u00E9dicale en p\u00F4les. Indispensable pour le suivi analytique par UF, la contractualisation interne et le reporting r\u00E9glementaire (RTC, SAE).",
      screenshots: [
        { file: "05a-decoupages-uf.jpg", caption: "Onglet Unit\u00E9s Fonctionnelles avec formulaire de recherche" },
        { file: "05b-decoupages-poles.jpg", caption: "Onglet P\u00F4les et Niveaux de Regroupements" },
      ],
    },
    {
      title: "Plan comptable",
      description: "Consultation et gestion du plan comptable de l\u2019\u00E9tablissement, d\u00E9coup\u00E9 en trois vues compl\u00E9mentaires : comptes de r\u00E9sultat, tableau de financement et comptes de tiers. L\u2019arborescence est organis\u00E9e par lettre budget et conforme \u00E0 la nomenclature M21.",
      capabilities: [
        "Onglet Comptes de R\u00E9sultat : arbre charges/produits par lettre budget d\u00E9pliable",
        "Onglet Tableau de Financement : vue emplois/ressources par lettre budget",
        "Onglet Comptes de Tiers : liste pagin\u00E9e (593 comptes) avec recherche par code ou libell\u00E9",
        "Filtres avanc\u00E9s : niveau ordonnateur, nature, chapitre, nomenclature, ex\u00E9cutoire",
        "Actions d\u2019\u00E9dition en ligne sur les comptes de tiers",
        "Extraction CSV et fonctions replier/d\u00E9plier",
        "Ajout de comptes de tiers",
      ],
      businessValue: "Donne aux \u00E9quipes financi\u00E8res une vision compl\u00E8te et navigable du plan comptable M21. Facilite la gestion quotidienne des imputations, la cr\u00E9ation de comptes de tiers et les contr\u00F4les de coh\u00E9rence.",
      screenshots: [
        { file: "06a-plan-comptable-resultat.jpg", caption: "Comptes de r\u00E9sultat avec arborescence par lettre budget" },
        { file: "06b-plan-comptable-financement.jpg", caption: "Tableau de financement" },
        { file: "06c-plan-comptable-tiers.jpg", caption: "Comptes de tiers avec recherche et pagination" },
      ],
    },
    {
      title: "Param\u00E9trages g\u00E9n\u00E9raux",
      description: "Hub de param\u00E9trage centralis\u00E9 organis\u00E9 en trois cat\u00E9gories th\u00E9matiques : Structures (donn\u00E9es de r\u00E9f\u00E9rence), R\u00E9cup\u00E9ration (import de donn\u00E9es externes) et Historique (suivi des \u00E9volutions budg\u00E9taires).",
      capabilities: [
        "Structures : Banques, Nationalit\u00E9s, Communes, Codes postaux, Civilit\u00E9s \u2014 chaque rubrique avec formulaire de recherche, ajout et import fichier",
        "R\u00E9cup\u00E9ration : Import de Comptes ordonnateurs, Historiques, Recettes diverses, GEF avec filtres (exercice, type, \u00E9tat d\u2019int\u00E9gration)",
        "Historique : Masse financi\u00E8re et Consommations pour le suivi pluriannuel",
        "Chaque sous-module poss\u00E8de son propre formulaire de recherche avanc\u00E9e",
        "Fonctions d\u2019int\u00E9gration avec validation",
        "Import par fichier pour chargement en masse",
      ],
      businessValue: "Centralise le param\u00E9trage de toutes les donn\u00E9es de r\u00E9f\u00E9rence n\u00E9cessaires au fonctionnement de l\u2019ERP. Les fonctions d\u2019import facilitent la reprise de donn\u00E9es et la mise \u00E0 jour en masse lors des changements r\u00E9glementaires.",
      screenshots: [
        { file: "07a-parametrages-hub.jpg", caption: "Hub de param\u00E9trage avec 3 colonnes th\u00E9matiques" },
        { file: "07b-parametrages-banques.jpg", caption: "Sous-page Banques avec formulaire de recherche" },
      ],
    },
    {
      title: "R\u00E9f\u00E9rentiel GAP",
      description: "Gestion des nomenclatures et r\u00E9f\u00E9rentiels utilis\u00E9s par le module GAP (Gestion Administrative du Patient). Trois niveaux sont distingu\u00E9s : livr\u00E9s (Dedalus), nationaux (r\u00E9glementaires) et t\u00E9l\u00E9charg\u00E9s (mis \u00E0 jour p\u00E9riodiquement).",
      capabilities: [
        "Onglet Livr\u00E9s (16 nomenclatures) : Codes proches, Lettres cl\u00E9 B2/DRE, Modes de PEC, Pi\u00E8ces justificatives, Protections civiles, Titres de praticiens, etc.",
        "Onglet Nationaux (8 r\u00E9f\u00E9rentiels) : Activit\u00E9s socioprofessionnelles, Codes GIR, Disciplines M\u00E9dico-Tarifaires, Sp\u00E9cialit\u00E9s m\u00E9dicales, etc.",
        "Onglet T\u00E9l\u00E9charg\u00E9s (10 r\u00E9f\u00E9rentiels versionn\u00E9s) : CCAM v82, NABM v93, LPP v800, GHS/GHT, UCD v715, COG, ICR, RIHN, ATU, Organismes SESAM-Vitale",
        "Filtre de recherche par nom de nomenclature",
        "Indicateur de version et date de mise \u00E0 jour pour chaque r\u00E9f\u00E9rentiel",
      ],
      businessValue: "Garantit la conformit\u00E9 r\u00E9glementaire en centralisant tous les r\u00E9f\u00E9rentiels n\u00E9cessaires \u00E0 la facturation, l\u2019identito-vigilance et la gestion du parcours patient. Le versionnement assure une tra\u00E7abilit\u00E9 compl\u00E8te des mises \u00E0 jour.",
      screenshots: [
        { file: "08a-referentiel-livres.jpg", caption: "R\u00E9f\u00E9rentiels livr\u00E9s (16 nomenclatures)" },
        { file: "08b-referentiel-nationaux.jpg", caption: "R\u00E9f\u00E9rentiels nationaux" },
        { file: "08c-referentiel-telecharges.jpg", caption: "R\u00E9f\u00E9rentiels t\u00E9l\u00E9charg\u00E9s avec versions" },
      ],
    },
  ],
};

// ─── Load data ───
const inputFile = getArg('--input');
const data = inputFile ? JSON.parse(fs.readFileSync(inputFile, 'utf-8')) : DEFAULT_DATA;

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
