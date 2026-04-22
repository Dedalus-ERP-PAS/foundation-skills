# docs/domain/ Rule Schema

This file defines the schema that all rule files in `docs/domain/` MUST follow for the `business-compliance` skill to audit them. Files that do not conform cause the skill to abort the audit and emit a migration checklist.

## Rationale

The schema exists because:
- **Deterministic matching** requires structured metadata (bounded context, entities, API prefixes)
- **Stable rule IDs** enable referenceable findings and tractable diffs over time
- **Layer metadata** tells the skill whether to audit client enforcement, server contract, or both
- **Severity metadata** enforces the P1/P2/P3/P4 classification consistently

Without this schema, the skill becomes an LLM hallucination factory. We refuse that.

## File-Level Frontmatter (Required)

Every `.md` file in `docs/domain/` must start with YAML frontmatter:

```yaml
---
bounded_context: prescriptions
entities: [Prescription, AllergyCheck, Dose]
api_prefixes:
  - /api/prescriptions
  - /api/allergies
---
```

### Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `bounded_context` | Yes | string | The DDD bounded context this file belongs to (e.g., `prescriptions`, `admissions`, `billing`, `interop`). Used for grouping and filtering. |
| `entities` | Yes | list of strings | The domain entities this file's rules govern. Must match TypeScript type names in the codebase (or be reconciled via `UBIQUITOUS_LANGUAGE.md`). |
| `api_prefixes` | Yes (can be `[]`) | list of strings | URL prefixes of backend APIs that manipulate these entities. Used by the skill to match rules to screens via the API calls a screen makes. An empty list means the rules are UI-only or pure domain invariants. |

## Rule-Level Structure (One or More Rules per File)

Each rule inside the file MUST start with a heading in this exact format, followed by a metadata block and a body:

```markdown
## Rule: PRESC-001 — Allergy check required before validation

- **severity:** P1
- **layer:** both
- **applies_to:** Prescription.validate action
- **status:** active

### Invariant
A prescription cannot be validated unless the patient's allergy check has been verified within the last 24 hours.

### Preconditions
- AllergyCheck.verified === true
- AllergyCheck.verifiedAt > now() - 24h

### Forbidden transitions
- Prescription.status: Draft → Validated when AllergyCheck.verified === false

### Rationale
Administering medication without an up-to-date allergy check is a P1 patient-safety risk (anaphylaxis, adverse reactions). Mandated by internal clinical protocol CP-012 and aligned with HAS recommendations on prescription safety.

### Source
- Internal: clinical-protocol/CP-012
- Regulatory: HAS "Sécurité de la prescription médicamenteuse" (2021)
```

### Required Rule Fields

| Field | Required | Type | Acceptable values |
|-------|----------|------|-------------------|
| `rule_id` (from heading) | Yes | string | Stable identifier, pattern `^[A-Z]{2,5}-\d{3,4}$` (e.g., `PRESC-001`, `ADM-014`, `HL7PAM-007`) |
| `severity` | Yes | string | `P1`, `P2`, `P3`, `P4` (see below) |
| `layer` | Yes | string | `client`, `server`, `both` |
| `applies_to` | Yes | string | Free-text description of which entity/action the rule governs |
| `status` | Yes | string | `active`, `draft`, `deprecated` — the skill only audits `active` rules |

### Required Rule Sections

- `### Invariant` — the canonical statement of the rule
- At least ONE of: `### Preconditions`, `### Forbidden transitions`, `### Required fields`, `### Workflow step`, `### Cross-entity constraint`
- `### Rationale` — why the rule exists (clinical / regulatory / workflow justification)
- `### Source` — external or internal references (protocols, standards, regulations)

## Severity Classification

| Severity | Meaning | Examples |
|----------|---------|----------|
| **P1** | Patient safety — direct harm pathway | Allergy check, dose range, wrong-patient risk, signature bypass, contraindication |
| **P2** | Regulatory / compliance | HDS, MDR, CNIL, audit log requirements, data retention, e-signature legal validity |
| **P3** | Clinical workflow integrity | State machine violations, orphan entities, workflow gaps (discharge before results) |
| **P4** | Data quality / interoperability | Optional HL7 segments, code system consistency, label quality |

**P1 and P2 violations cannot be waived by a developer alone.** The skill flags them as requiring named clinical or compliance sign-off.

## Layer Semantics

| Layer | Meaning | Audit behavior |
|-------|---------|----------------|
| `client` | UI is the sole enforcer | Violation if the screen doesn't guard the action |
| `server` | Backend is the sole enforcer | Violation if the screen doesn't handle the rejection gracefully (catch 409/422, user-visible error) |
| `both` | Dual enforcement (client UX + server contract) | Violation if EITHER layer is missing on the screen |

## Rule ID Naming Convention

Rule IDs must be:
- **Stable** — once assigned, never renamed (break references)
- **Prefixed by bounded context** — use a 2-5 letter uppercase prefix (`PRESC`, `ADM`, `BILL`, `INTEROP`, `HL7PAM`)
- **Sequential** — use 3-4 digit numbers (`001`, `0014`)
- **Unique across the repository** — no two rules share an ID

Deprecated rules keep their ID forever (do not reuse). Set `status: deprecated` instead.

## Example: Minimal Valid Rule File

```markdown
---
bounded_context: admissions
entities: [Admission, Stay]
api_prefixes:
  - /api/admissions
  - /api/stays
---

## Rule: ADM-001 — No reactivation of Discharged admissions

- **severity:** P3
- **layer:** both
- **applies_to:** Admission.status transitions
- **status:** active

### Invariant
Once an admission has reached status `Discharged`, it cannot return to `Active` or any earlier state.

### Forbidden transitions
- Admission.status: Discharged → Active
- Admission.status: Discharged → Admitted
- Admission.status: Discharged → PendingAdmission

### Rationale
Admission state must reflect the real-world patient flow. Re-activating a discharged stay corrupts audit trails, billing cycles, and clinical documentation. If a patient returns, a new admission is created — this is both a process rule and a legal traceability requirement.

### Source
- Internal: admissions-workflow/AW-003
- Regulatory: traceability obligations under HDS certification
```

## Migration Checklist (For Existing `docs/domain/` Files)

When a file fails the schema check, the skill emits a per-file migration checklist:

- [ ] Add frontmatter with `bounded_context`, `entities`, `api_prefixes`
- [ ] Convert each documented rule to the `## Rule: <ID> — <title>` format
- [ ] Assign a stable `rule_id` following the naming convention
- [ ] Add the 5 required metadata lines (`severity`, `layer`, `applies_to`, `status`) — plus `rule_id` via heading
- [ ] Write `### Invariant` clearly as a single declarative sentence
- [ ] Add at least one of: `### Preconditions`, `### Forbidden transitions`, `### Required fields`, `### Workflow step`, `### Cross-entity constraint`
- [ ] Write `### Rationale` explaining clinical/regulatory/workflow justification
- [ ] Write `### Source` with at least one reference

Once all files validate, re-run the skill.

## FAQ

**Q: Can a single file contain rules from multiple bounded contexts?**
A: No. One bounded context per file. Split into multiple files if needed.

**Q: What about rules that span bounded contexts (cross-context invariants)?**
A: Place the rule in the bounded context of the entity that owns the invariant. Reference the other context via the `entities` list. Cross-context rules almost always have a primary owner.

**Q: What if a rule applies to every screen (e.g., audit log)?**
A: Use a dedicated `bounded_context: cross-cutting` file with broad `api_prefixes` (empty list or `["/api"]`). The skill will match it against every screen.

**Q: Can rules be auto-generated from HL7/FHIR specs or from code annotations?**
A: Yes in principle, but the output must still conform to this schema to be audited. Auto-generation is out of scope for this skill — another skill could produce valid files as input.

**Q: What about rules in languages other than English?**
A: The skill parses structure, not prose. Rule bodies may be in French. Keep field names (`severity`, `layer`, etc.) in English for tool compatibility.
