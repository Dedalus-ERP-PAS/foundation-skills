# Test Design Techniques — When and How to Apply

## Decision Matrix

Use this table to decide which techniques to apply based on what you find in the input.

| Technique | Apply when... | Skip when... |
|---|---|---|
| Equivalence Partitioning (EP) | Any field accepts input (text, dropdown, toggle) | Field has only one valid value |
| Boundary Value Analysis (BVA) | Numeric fields, string lengths, dates, list sizes, pagination | Boolean fields, fixed dropdowns with few options |
| Decision Tables | 2+ conditions interact to produce different outcomes | Conditions are independent |
| State Transition | Multi-step workflows, status changes, wizard forms | Single-screen CRUD without state |
| Pairwise Testing | 3+ independent input parameters with multiple values each | Fewer than 3 parameters |
| Error Guessing | Always — after applying formal techniques | Never skip this |

---

## Technique 1: Equivalence Partitioning (EP)

**Principle**: Divide input values into classes where all values in a class should produce the same behavior. Test ONE value per class.

**Classes to identify**:
- Valid class(es)
- Invalid class(es): empty, wrong type, too long, special characters, injection attempts
- Boundary class(es): min, max, just below min, just above max

**SRD Example — "Libellé" field (dish name)**:

| Class | Example value | Expected behavior |
|---|---|---|
| Valid (normal) | "Curry de poulet au lait de coco" | Accepted |
| Valid (minimum) | "A" | Accepted (if 1-char allowed) |
| Empty | "" | Validation error: champ obligatoire |
| Special characters | "<script>alert('x')</script>" | Sanitized or rejected |
| Very long string | 500+ characters | Validation error or truncation |

**Rule**: One test case per class. Do NOT create 5 tests with different valid names — they're all in the same class.

---

## Technique 2: Boundary Value Analysis (BVA)

**Principle**: Bugs cluster at boundaries. Test the exact boundary values: min, min+1, max-1, max, min-1, max+1.

**Apply to**:
- Numeric fields (quantities, prices, ages)
- String length limits
- Date ranges (start date, end date)
- List sizes (minimum selections, maximum selections)
- Pagination (first page, last page, page 0, page beyond max)

**SRD Example — "Destinations" multi-select (Volet 2)**:

| Boundary | Value | Expected |
|---|---|---|
| None selected | 0 destinations | Validation error or allowed (depends on business rule) |
| One selected | 1 destination ("CHBA") | Accepted |
| All selected | All destinations via "Sélectionner tout" | Accepted |
| Deselect all after selecting | 0 after having N | State returns to empty |

---

## Technique 3: Decision Tables

**Principle**: When multiple conditions combine to determine the outcome, enumerate all meaningful combinations.

**When to build one**:
- Login with valid/invalid username × valid/invalid password
- Form submission with combination of mandatory fields filled/empty
- Access control: role × module × action

**SRD Example — Login conditions**:

| # | Username | Password | Expected |
|---|---|---|---|
| 1 | Valid | Valid | Connexion réussie → page d'accueil |
| 2 | Valid | Invalid | Message d'erreur |
| 3 | Invalid | Valid | Message d'erreur |
| 4 | Invalid | Invalid | Message d'erreur |
| 5 | Empty | Empty | Validation: champs obligatoires |
| 6 | Valid | Empty | Validation: mot de passe obligatoire |
| 7 | Empty | Valid | Validation: identifiant obligatoire |

**Rule**: Collapse rows that produce identical outcomes (rows 2-4 could be one test if the error message is the same). Keep them separate if the error messages differ.

---

## Technique 4: State Transition

**Principle**: Model the system as states + transitions. Test each valid transition, invalid transitions, and sequences.

**Apply to**:
- Multi-step wizard forms (Volet 1 → 2 → 3 → 4)
- Status workflows (Draft → Submitted → Approved → Published)
- Session states (Logged out → Logged in → Timed out)
- UI states (Sidebar collapsed → expanded)

**SRD Example — Multi-volet dish creation form**:

```
States: [V1: Informations] → [V2: Destinations] → [V3: Régimes/Rations] → [V4: Goûts/Validation]

Valid transitions:
  V1 → V2 (click "Suivant" with all required fields)
  V2 → V3 (click "Suivant")
  V3 → V4 (click "Suivant")
  V4 → Saved (click "Valider")
  V2 → V1 (navigate back)
  V3 → V2 (navigate back)
  V4 → V3 (navigate back)

Invalid transitions:
  V1 → V2 (click "Suivant" with empty required fields → blocked, error shown)
  V4 → Saved (click "Valider" with missing data → blocked)
```

**Test cases to generate**:
1. Happy path: V1 → V2 → V3 → V4 → Saved
2. Back navigation preserves data: V1 → V2 → V1 (data still present)
3. Blocked transition: V1 → V2 with empty "Libellé" → error
4. Full round-trip: V1 → V2 → V3 → V2 → V1 → V2 → V3 → V4 → Saved

---

## Technique 5: Pairwise Testing

**Principle**: When testing all combinations is impractical (N parameters × M values = explosion), test all pairs of parameter values. Covers most interaction bugs with far fewer tests.

**Apply when**: 3+ independent parameters each have 2+ possible values.

**SRD Example — Volet 1 fields**:

Parameters: Famille (3 values), Sous-famille (4 values), Poste de distribution (3 values), Groupe modes préparation (2 values)

Full combinatorial: 3 × 4 × 3 × 2 = 72 tests
Pairwise: ~12 tests covering all pairs

**How to construct**: Use an orthogonal array or pairwise generation tool. List all parameter values, then select a minimal set of combinations that covers every pair.

---

## Technique 6: Error Guessing

**Principle**: Based on experience, probe areas where defects commonly hide. Apply AFTER formal techniques.

**Common error-prone areas**:
- Empty/null/whitespace-only inputs
- Copy-paste with hidden characters
- Double-click / double-submit
- Browser back button during multi-step forms
- Session timeout mid-form
- Concurrent modifications (two users editing same record)
- Special characters in search fields: `' " < > & / \`
- Very fast repeated actions (race conditions)
- Network interruption during save

**SRD-specific error guessing**:
- Loader/progress bar doesn't disappear after save
- Sidebar state lost after navigation
- Multi-select "Sélectionner tout" then individual deselect — count mismatch
- Creating a dish with a name that already exists (uniqueness constraint)
- Navigating away during "Chargement du module en cours..."

---

## Risk-Based Prioritization

After generating test cases, assign priorities using this risk assessment:

| Risk factor | High risk (P0) | Medium risk (P1) | Low risk (P2) |
|---|---|---|---|
| Business impact | Data loss, financial, compliance | Workflow blocked, workaround exists | Cosmetic, convenience |
| Usage frequency | Used by all users daily | Used regularly by subset | Rarely used |
| Complexity | Complex integrations, calculations | Moderate logic | Simple display |
| Defect history | Known buggy area | Some past issues | Stable area |
| Visibility | Customer-facing, demo path | Internal users | Admin-only |

**Rule of thumb for test distribution**:
- P0: ~20% of tests (critical path, smoke)
- P1: ~50% of tests (core functional, regression)
- P2: ~30% of tests (edges, boundaries, comfort)
