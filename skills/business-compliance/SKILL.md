---
name: business-compliance
description: "Audit automatique de conformité aux règles métier du domaine Hexagone (docs/domain/). Analyse le code d'un écran et les API appelées, matche contre les invariants, transitions et validations documentés, et produit un rapport structuré avec citations. Mode report-only — aucune modification automatique sur des règles métier en contexte santé."
version: 1.0.0
license: MIT
metadata:
  author: Foundation Skills
  argument-hint: <url-or-component-or-page-name>
---

# Business Compliance

Run a fully autonomous domain compliance audit on a page or component of the Hexagone Web application. The skill discovers documented business rules in `docs/domain/`, extracts the entities and bounded context of the target screen, matches applicable rules, detects violations of domain invariants, and prints a structured report with mandatory citations — without modifying any files. **This is a report-only skill.** It never auto-fixes business rule violations because the semantic and patient-safety impact is too high for machine judgment.

## When to Use This Skill

Activate when the user:
- Says "business-compliance" followed by a URL, component name, or page name
- Asks to audit domain rules, business rules, or invariants on a screen
- Says "check the business logic", "audit the domain rules", "business review"
- Wants to verify that a screen enforces the documented invariants from `docs/domain/`

## Relation to `design-compliance`

`design-compliance` and `business-compliance` are **complementary but separate** skills:

| | `design-compliance` | `business-compliance` |
|---|---|---|
| Audits | Visual / presentation layer | Domain / business logic layer |
| Source of truth | `hexagone-preset.js`, CLAUDE.md, design rules | `docs/domain/` (DDD structured Markdown) |
| Mode | Auto-fix all violations | **Report only, never fix** |
| Risk profile | Low (cosmetic) | High (patient safety, regulatory) |
| Reviewer | Frontend devs | Domain experts, clinical PO, compliance |

Do **not** merge them. Run both separately when needed. A unified `screen-compliance` aggregator is out of scope for v1.

## Core Principles

### 1. Full Autonomy
- The entire pipeline runs without asking questions during execution
- If no argument is provided, ask the user what to review — then run autonomously
- **No files are modified.** The report is printed to the terminal only

### 2. Report-Only — No Auto-Fix
Auto-fixing a business rule violation is categorically unsafe in healthcare software. A machine "fix" could:
- Turn a warning into a block (halting legitimate care)
- Turn a block into a warning (industrializing the shortcut anti-pattern)
- Silently change clinical semantics without human review

The skill **surfaces, documents, and cites** — a human (developer + domain expert) decides the fix.

### 3. Schema-First
The skill requires `docs/domain/` to follow a structured rule schema (see `reference/rule-schema.md`). If the schema is not respected, the skill **refuses to audit** and emits a migration checklist. Garbage in → hallucinated findings out. This is non-negotiable.

### 4. Deterministic Matching Pipeline
Matching a rule to a screen is done in a deterministic pipeline before any LLM reasoning:
1. **Screen extraction** (deterministic) — route, Pinia stores, API endpoints, TypeScript types
2. **Bounded context pre-filter** (deterministic) — via `api_prefixes` in rule frontmatter
3. **Entity lookup** (deterministic) — match extracted types against rule `entities:` lists
4. **Rule reasoning** (LLM) — confined to the shortlisted rules

LLM is used only in step 4. Steps 1-3 are mechanical.

### 5. Sensitivity Over Specificity
In healthcare, **false negatives are catastrophic, false positives are annoying**. The skill tunes for sensitivity: when uncertain, it reports with status `NEEDS_CLINICAL_REVIEW` rather than dropping the rule silently.

### 6. Citation-Mandatory
Every finding MUST cite:
- The exact rule file + line (or heading anchor) in `docs/domain/`
- The exact code file + line for the violation
- The stable `rule_id` (e.g., `ADM-001`, `PRESC-014`)

A finding without all three citations is rejected from the report. No citation = no finding.

## Source of Truth (Priority Order)

1. **Rule files in `docs/domain/`** — the only source of authoritative business rules
2. **Rule schema** — `reference/rule-schema.md` (this skill's contract for rule structure)
3. **Ubiquitous language** — `UBIQUITOUS_LANGUAGE.md` if present, used to reconcile entity naming

The skill does NOT invent rules. If a rule is not documented in `docs/domain/`, it does not exist for this skill.

## Input Modes

Same three input modes as `design-compliance`:

### URL Mode
```
/business-compliance http://localhost:5173/hexagone-etab/vue/prescriptions/123
```
1. Use the URL to resolve the route in the router config
2. Find the component file for that route
3. Recursively resolve the component tree

### Component Name Mode
```
/business-compliance PrescriptionEditor
```
1. Glob for matching files: `**/PrescriptionEditor.vue`, `**/prescription-editor.vue`
2. Resolve the route (if any) for bounded-context inference
3. Recursively resolve the component tree

### Page Name Mode
```
/business-compliance Prescriptions
```
1. Search router config for route name or path match
2. Find the assigned component
3. Recursively resolve the component tree

### No Argument
```
/business-compliance
```
Ask the user what to audit. Do not assume.

## Workflow

### Step 1: Validate Rule Schema

Before doing anything else, validate that `docs/domain/` follows the required schema:

1. **Locate `docs/domain/`** in the project. If it does not exist, abort with:
   > "No `docs/domain/` directory found. `business-compliance` requires documented domain rules. See `reference/rule-schema.md` for the required format."

2. **Parse each `.md` file** in `docs/domain/` and verify the frontmatter:
   - Required fields: `bounded_context`, `entities`, `api_prefixes` (can be empty list), `rule_id` OR a list of rules with `rule_id` each, `severity`, `layer`
   - Acceptable values for `severity`: `P1`, `P2`, `P3`, `P4`
   - Acceptable values for `layer`: `client`, `server`, `both`

3. **If any file fails validation**, abort the audit and emit a migration checklist:
   ```
   docs/domain/ schema violations — audit aborted
   
   | File | Missing fields | Action |
   |------|----------------|--------|
   | docs/domain/prescriptions.md | severity, layer | Add frontmatter fields |
   | ... | ... | ... |
   
   Fix the rule files before re-running. See skills/business-compliance/reference/rule-schema.md.
   ```

4. **If all files validate**, build the normalized in-memory rule index:
   - Keyed by `(bounded_context, entity, rule_id)`
   - Each entry holds: rule text, severity, layer, api_prefixes, source file + line

### Step 2: Resolve Target Files

Same resolution strategy as `design-compliance`:

1. **Parse the user's input** to determine the mode (URL, component name, page name)
2. **Find the entry-point file(s)**:
   - URL → parse path, search router files (`**/router/**/*.{js,ts}`, `**/router.{js,ts}`) for matching route, get component
   - Component name → glob for `**/<name>.vue`, `**/<name-kebab>.vue`, `**/<Name>/**`
   - Page name → search router config for route name or path match
3. **Recursively resolve the component tree**:
   - Read each `.vue` file
   - Extract all local imports (skip `primevue/*`, `vue`, `vue-router`, `pinia`, `node_modules`, `@hexagone/shared`)
   - Follow each import, repeat until no new local components
4. **Report the discovered tree** to the user

### Step 3: Extract Screen Artifacts

For each file in the component tree, extract the artifacts needed for rule matching:

1. **Route information**:
   - Route path (e.g., `/prescriptions/:id`)
   - API prefix derived from the route (e.g., `/api/prescriptions`)

2. **Pinia stores**:
   - `import { usePrescriptionStore } from '...'`
   - Store names are strong hints for bounded context

3. **API endpoints**:
   - Grep for `axios.*`, `fetch('...')`, `useFetch(...)`, `$api.*`
   - Capture full URLs and HTTP methods
   - Capture error handling: `catch (err)` blocks, 4xx/5xx handlers

4. **TypeScript types**:
   - Types imported from `@/types/`, `@hexagone/shared/types`, or local `types.ts`
   - Focus on entity-like types: `Prescription`, `Admission`, `Patient`, `Order`, etc.

5. **Form fields and bindings**:
   - `v-model` bindings
   - Form validation rules (`required`, `rules`, `schema`, Zod/Yup/Valibot schemas)
   - `:disabled`, `v-if`, `v-show` on action buttons (state machine signals)

6. **Action handlers**:
   - Click handlers on buttons whose label matches a state transition (`save`, `validate`, `discharge`, `sign`, `cancel`)
   - Capture what state change they trigger via the API

Output a per-file extraction summary:
```
PrescriptionEditor.vue:
  route: /prescriptions/:id
  api_prefixes: [/api/prescriptions, /api/allergies]
  stores: [usePrescriptionStore, usePatientStore]
  types: [Prescription, AllergyCheck, Patient]
  actions: [save, validate, sign]
```

### Step 4: Match Rules to Screen

For each file's extracted artifacts, match applicable rules:

1. **Bounded context filter**: for each `api_prefix` in the screen, collect rules whose `api_prefixes` frontmatter overlaps
2. **Entity filter**: intersect with rules whose `entities` list contains any extracted TS type name
3. **Ubiquitous language reconciliation**: if `UBIQUITOUS_LANGUAGE.md` exists, use it to map code-level names to domain-level names before matching (e.g., `Rx` → `Prescription`)

Output the rule shortlist per file:
```
PrescriptionEditor.vue: 7 applicable rules
  - PRESC-001 (P1) — Allergy check required before validation
  - PRESC-002 (P1) — Electronic signature required on save
  - PRESC-014 (P2) — Signature requires audit log entry
  - ADM-008 (P3) — Patient must have active admission
  - ...
```

### Step 5: Static Analysis — Detect Violations

For each (file, applicable rule) pair, check the 5 violation categories:

#### Category 1: Missing Precondition Check
- Rule states a precondition that must hold before an action (`X requires Y verified`)
- Check: does the UI guard the action (via `:disabled`, `v-if`, form validation, or API precondition)?
- Evidence required: code location of the action + absence of the guard
- Severity inherits from the rule

#### Category 2: Forbidden Transition Exposed
- Rule states a state transition is forbidden (`Discharged cannot return to Active`)
- Check: does the UI expose a button/action that can trigger the forbidden transition?
- Evidence: button handler + API call that would cause the forbidden state change

#### Category 3: Required Field Absent
- Rule mandates a field must be collected/displayed (e.g., "INS mandatory for clinical action")
- Check: is the field present in the form template + bound via v-model + enforced by validation?
- Evidence: template search + validation schema inspection

#### Category 4: Cross-Entity Invariant Unenforced
- Rule spans entities (e.g., "Prescription must reference active AllergyCheck")
- Check: does the screen load/reference both entities, and does it gate the action on the cross-entity condition?
- Evidence: both stores/types present + conditional on the cross-entity relationship

#### Category 5: Workflow Gap
- Rule defines a workflow step (e.g., "Verbal order requires countersignature within 24h")
- Check: is the step surfaced in the UI, even as a reminder or follow-up action?
- Evidence: presence or absence of the UI artifact mapped to the workflow step

#### Server-Side Rule Handling

When a rule has `layer: server` or `layer: both`:
- The UI is NOT expected to fully enforce the rule
- The UI IS expected to **handle the server rejection gracefully** (catch 409/422, show user-visible error)
- Check: does the API call site include a proper error handler?
- A missing error handler on a server-enforced rule is itself a violation (Category 1 — missing precondition handling)

### Step 6: Handle Uncertainty

When the skill cannot confidently determine if a rule applies or is violated:

1. **Do not drop the rule silently**
2. Emit a finding with status `NEEDS_CLINICAL_REVIEW`
3. Include a structured question for the reviewer:
   ```
   NEEDS_CLINICAL_REVIEW — PRESC-007
   Rule: Prescriptions require electronic signature.
   Screen: PrescriptionEditor.vue uses usePrescriptionStore.save() but signature step not clearly detected.
   
   Please confirm:
   (a) Rule applies, step missing → fix required
   (b) Rule applies, step present but undetected → add code annotation or test anchor
   (c) Rule does not apply → document why in commit message or rule exclusion
   ```

### Step 7: Track Non-Evaluable Rules

After analysis, list any rule that was in the shortlist but could NOT be evaluated (e.g., code too complex, dynamic dispatch, external library call). This prevents "no violations found" from being confused with "not audited":

```
Non-evaluable rules (5):
  - PRESC-022 — dynamic dispatch on action name, cannot trace
  - ADM-014 — relies on backend orchestration not visible in screen code
  - ...
```

### Step 8: Generate Report

Print a structured report to the terminal:

```markdown
## Business Compliance Report

**Target:** [component/page name or URL]
**Files analyzed:** [count]
**Rules indexed:** [count from docs/domain/]
**Rules applicable to target:** [count]
**Violations detected:** [count]
**Uncertain findings (NEEDS_CLINICAL_REVIEW):** [count]
**Non-evaluable rules:** [count]

### Rule Index Summary
| Bounded Context | Rules | Files |
|-----------------|-------|-------|
| prescriptions   | 14    | docs/domain/prescriptions.md |
| admissions      | 8     | docs/domain/admissions.md |
| ...             | ...   | ... |

### Files in Component Tree
| # | File | Applicable Rules | Violations |
|---|------|------------------|------------|
| 1 | `frontend/gap-mf/src/views/PrescriptionEditor.vue` | 7 | 2 |
| 2 | `frontend/gap-mf/src/components/AllergyBanner.vue` | 2 | 0 |
| ... | ... | ... | ... |

### Violations by Severity

#### P1 — Patient Safety ([count])
- **PRESC-001** — Allergy check required before validation
  - Rule source: `docs/domain/prescriptions.md:42`
  - Code location: `frontend/gap-mf/src/views/PrescriptionEditor.vue:118`
  - Category: Missing precondition check
  - Evidence: `validate()` handler calls `prescriptionStore.validate()` without prior check on `allergyCheckStore.verified`.
  - Suggested action (NOT applied): add `:disabled="!allergyChecked"` to the Validate button, or guard inside the handler.

#### P2 — Regulatory / Compliance ([count])
...

#### P3 — Clinical Workflow Integrity ([count])
...

#### P4 — Data Quality / Interoperability ([count])
...

### NEEDS_CLINICAL_REVIEW ([count])
- **PRESC-007** — [structured question as in Step 6]

### Non-Evaluable Rules ([count])
- **PRESC-022** — dynamic dispatch on action name, static trace impossible

### Drift Signals
- Rule files unchanged in > 6 months while referenced entities evolved: [list]
- Rules with no applicable screen in this audit: [list]

### Summary
- **Total violations:** [count] (P1: [n], P2: [n], P3: [n], P4: [n])
- **Waivable by developer alone:** [count] (P3 + P4)
- **Require clinical / compliance sign-off:** [count] (P1 + P2)
- **No files modified.** Review the report, discuss with domain experts, apply fixes manually.
```

## Violation Reference

### 5 Violation Categories

| # | Category | Typical Rule Phrasing | Evidence Required |
|---|----------|----------------------|-------------------|
| 1 | Missing precondition check | "X requires Y verified" | Action handler + absence of guard |
| 2 | Forbidden transition exposed | "Cannot transition from A to B" | Action handler + forbidden state change |
| 3 | Required field absent | "Field F is mandatory" | Template + validation schema |
| 4 | Cross-entity invariant unenforced | "X must reference Y" | Both entities present + conditional |
| 5 | Workflow gap | "Step S must occur within T" | UI artifact for step S |

### Severity Classification

| Severity | Meaning | Escalation |
|----------|---------|------------|
| **P1** | Patient safety — direct harm pathway (allergy, dose, wrong-patient, signature bypass) | Blocks merge. Clinical PO sign-off required. |
| **P2** | Regulatory / compliance — HDS, MDR, CNIL, audit log, traceability | Blocks merge. Compliance officer sign-off required. |
| **P3** | Clinical workflow integrity — state machine, orphan entities, workflow gaps | Blocks merge. Waivable by clinical PO with written justification. |
| **P4** | Data quality / interoperability — optional fields, code systems, labels | Warns. Does not block. Dev may waive. |

**P1 and P2 cannot be waived by a developer alone.** The skill must require a named clinical or compliance reviewer in the waiver metadata when such a waiver is requested.

### Healthcare Rule Examples (Hexagone Context)

See `reference/rule-schema.md` for concrete examples. Common rule categories in Hexagone:
- **Safety interlocks**: allergy / contraindication / dose range / drug-drug interaction
- **Identity**: INS (Identité Nationale de Santé) verification before clinical action
- **Prescription integrity**: electronic signature, modification audit trail, verbal order countersignature
- **State machines**: admission/discharge flow, order/result flow, care pathway steps
- **Interoperability**: HL7/FHIR/PAM message completeness, segment ordering (Hexaflux domain)
- **Regulatory**: audit log on writes, break-glass justification, data retention
- **Billing cascades**: act codes blocking discharge, GHS requiring main diagnosis

## Edge Cases

### `docs/domain/` Does Not Exist
Abort audit. Emit:
> "No `docs/domain/` directory found. This skill requires documented domain rules following the schema in `reference/rule-schema.md`. Create the directory and add rule files before running."

### `docs/domain/` Exists but Schema Fails
Abort audit. Emit a migration checklist of schema violations per file (see Step 1.3). Do not attempt partial audit — partial data leads to false confidence.

### Rule References an Unknown Entity
If a rule's `entities:` list contains a name not found anywhere in the codebase:
- Keep the rule in the index
- Flag in the drift signals section of the report: "Rule X references entity Y, but no usage found in codebase"
- This indicates either stale docs or a server-only entity

### Screen Matches No Rules
Report "0 applicable rules" — explicitly state that this is not the same as "compliant". The screen may operate on an undocumented bounded context (which is itself a drift signal to report).

### Conflicting Rules
If two rules in the index share the same `rule_id` or make contradictory claims about the same entity:
- Report the conflict in the Drift Signals section
- Do not attempt to resolve it — this is a domain expert decision

### Dev Server Not Running
This skill does NOT require a dev server. It is a static analysis + doc-parsing skill. Visual inspection is out of scope — business rules are about code behavior, not rendering.

### Large Component Tree (20+ files)
Process all files. Organize report by file for readability. Use parallel sub-agents only if the tree exceeds 10 files AND the rule index exceeds 30 rules, to keep LLM reasoning context manageable.

### Mixed Micro-Frontends
Apply the same rule index to all files regardless of MF. Note MF membership per file in the report.

### Waiver Requested
The skill does NOT manage waivers. If a finding must be waived, the developer does so in the PR description or a dedicated waiver log outside this skill's scope. The skill always re-reports the finding on next run — it's not the skill's job to remember waivers (memory of waivers is a human-process concern).

## Important Notes

- **This skill does NOT modify files.** It is strictly report-only. If the user says "fix them", explain that business rule violations are not mechanically fixable — the report provides suggested actions that a human must apply.
- **Every finding cites rule_id + doc:line + code:line.** A finding without all three is a bug in the skill — do not emit it.
- **P1 / P2 violations require named sign-off** from a clinical or compliance reviewer. The skill calls this out in the report.
- **Tune for sensitivity, not specificity.** Better to raise 10 possible findings and let the team dismiss 9 than to miss 1 P1.
- **Uncertain findings → `NEEDS_CLINICAL_REVIEW`.** Never silently drop a rule.
- **Drift signals are first-class.** Rules that haven't been touched while their entities have changed → surface in the report. Rules referencing unknown entities → surface.
- **Non-evaluable rules are first-class.** "No violations found" must not be confused with "not audited". Always list non-evaluable rules explicitly.
- **No auto-fix. Ever. No v2 auto-fix.** If requested, push back: healthcare semantic changes require human judgment.
- **Pilot first.** In a fresh rollout, start with ONE bounded context (suggest: prescriptions — highest stakes, clearest invariants) before expanding. Validate signal-to-noise on that pilot before adding domains.
