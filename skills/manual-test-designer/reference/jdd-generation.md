# JDD (Jeux de Données) Generation Guide

## What is JDD?

JDD = **Jeux De Données** (test data files). They externalize test input and expected output data from test scripts, making tests data-driven and maintainable.

## When to Generate JDD

- **Always** when test cases reference specific input data (form fields, selections, values)
- **Always** when expected results include exact UI text, labels, or messages
- **Optionally** when the user explicitly requests test data files

## File Naming Convention

```
fixtures/jdd/SRD-[MODULE_CODE]-[NNN].json
```

| Part | Description | Examples |
|---|---|---|
| `SRD` | Product prefix (always) | `SRD` |
| `MODULE_CODE` | Short module identifier | `FP` (Fiches plat), `NAV` (Navigation), `AUTH` (Auth) |
| `NNN` | Sequential number, zero-padded | `001`, `002`, `010` |

**Examples**: `SRD-FP-001.json`, `SRD-NAV-001.json`, `SRD-AUTH-001.json`

**Special file**: `SRD-Commun.json` — shared data used across all tests (credentials, common texts).

## JSON Structure

```json
{
  "metadata": {
    "description": "Description fonctionnelle du jeu de données",
    "version": "1.0.0",
    "lastUpdated": "YYYY-MM-DD"
  },
  "entrants": {
    // Input data — what the test enters/selects in the UI
  },
  "sortants": {
    // Expected output — what the test verifies/asserts
  }
}
```

### `metadata` — File description

| Field | Required | Description |
|---|---|---|
| `description` | Yes | What feature/test this data serves |
| `version` | Yes | Semantic version of the data set |
| `lastUpdated` | Yes | ISO date of last modification |

### `entrants` — Input data

Everything the test **types, selects, toggles, or submits** in the UI.

**Organization**: Group by logical section (form volet, screen area, step).

```json
{
  "entrants": {
    "volet_1": {
      "libelle": "Curry de poulet au lait de coco",
      "platTemoin": false,
      "famillePlat": "VVPO",
      "sousFamille": "Viande - volaille"
    },
    "volet_2": {
      "destinations": ["CHBA", "CHU", "Cité ADM"]
    }
  }
}
```

**Data type mapping**:

| UI element | JSON type | Example |
|---|---|---|
| Text input | `string` | `"Curry de poulet"` |
| Toggle/checkbox | `boolean` | `false` |
| Single-select dropdown | `string` | `"VVPO"` |
| Multi-select | `string[]` | `["CHBA", "CHU"]` |
| Numeric input | `number` | `42` |
| Date picker | `string` (ISO) | `"2026-04-17"` |

### `sortants` — Expected output

Everything the test **verifies, asserts, or checks** in the UI.

```json
{
  "sortants": {
    "texteBtnAjoutPlat": "Ajouter un plat",
    "texteFormCreationFP": "Création d'une fiche plat",
    "messageErreurLibelleVide": "Le champ Libellé est obligatoire",
    "titrePageAccueil": "Accueil"
  }
}
```

**Naming convention for sortants**:
- `texte[Element]` — expected text content: `texteFormCreationFP`
- `message[Type][Context]` — expected message: `messageErreurLibelleVide`
- `titre[Page]` — page/section title: `titrePageAccueil`
- `label[Field]` — expected label text: `labelBoutonSuivant`
- `count[Element]` — expected count: `countDestinations`

## Mapping Entrants/Sortants to Test Steps

| Test step action | Maps to | JDD section |
|---|---|---|
| Saisir "Curry de poulet" dans Libellé | `entrants.volet_1.libelle` | entrants |
| Sélectionner "VVPO" dans Famille | `entrants.volet_1.famillePlat` | entrants |
| Vérifier le titre "Création d'une fiche plat" | `sortants.texteFormCreationFP` | sortants |
| Vérifier le message d'erreur | `sortants.messageErreurLibelleVide` | sortants |

## Complete Example

For the dish creation feature (ERPPASTEST-127):

```json
{
  "metadata": {
    "description": "Jeux de données pour la création d'une fiche plat — Paramétrage",
    "version": "1.0.0",
    "lastUpdated": "2026-04-17"
  },
  "entrants": {
    "volet_1": {
      "libelle": "Curry de poulet au lait de coco",
      "platTemoin": false,
      "platCuisineAvance": false,
      "famillePlat": "VVPO",
      "sousFamille": "Viande - volaille",
      "posteDistribution": "Cuisine",
      "grpeModePreparation": "Déclinaison sel / léger"
    },
    "volet_2": {
      "destinations": ["CHBA", "CHU", "Cité ADM"]
    },
    "volet_3": {
      "regimes": ["Ordinaire", "Sans gluten", "Sans poisson"],
      "rations": ["1 part", "1/2 part"]
    },
    "volet_4": {
      "gouts": ["tomate cuite", "Volaille"]
    }
  },
  "sortants": {
    "texteBtnAjoutPlat": "Ajouter un plat",
    "texteFormCreationFP": "Création d'une fiche plat",
    "labelsVolet1": {
      "libelle": "Libellé",
      "famille": "Famille",
      "sousFamille": "Sous-famille",
      "posteDistribution": "Poste de distribution",
      "grpeModePreparation": "Groupe de modes de préparation"
    }
  }
}
```

## Anti-patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| Hardcoded data in test scripts | Changes require code edits | Extract to JDD JSON |
| Flat structure | Hard to find data for specific form section | Group by volet/section |
| Missing sortants | Tests don't verify expected results | Always include expected texts/labels |
| Duplicated common data | Credentials in every JDD file | Use `SRD-Commun.json` for shared data |
| Generic values | `"test"`, `"abc123"` | Use realistic domain data |
