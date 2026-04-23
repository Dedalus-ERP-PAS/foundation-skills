---
name: manual-test-designer
description: "Generate Xray-compatible manual test cases (CSV) and optional JDD test data (JSON) from user stories, feature descriptions, or acceptance criteria. Use when the user wants to create manual test cases, generate test scenarios, design functional tests, produce Xray CSV imports, or create JDD test data files."
version: 1.0.0
---

# Manual Test Designer

Generate structured, non-redundant manual test cases ready for Xray import, with optional JDD test data.

## Workflow

### Step 1 — Analyze Input

Read the user story, feature description, or acceptance criteria. Identify:
- Testable requirements and acceptance criteria
- Input fields, workflows, business rules
- Risk areas (data integrity, security, UX)
- Ambiguities to flag

### Step 2 — Select Techniques

Apply techniques based on what the input contains. See [test design techniques](reference/test-design-techniques.md).

| Input characteristic | Technique |
|---|---|
| Any input field | Equivalence Partitioning |
| Numeric/date/length fields | Boundary Value Analysis |
| Multiple conditions combined | Decision Tables |
| Multi-step workflow or statuses | State Transition |
| 3+ independent parameters | Pairwise Testing |
| Past defects, common failures | Error Guessing |

### Step 3 — Design Test Cases

For each requirement, generate test cases covering: **nominal**, **boundary**, **invalid input**, **error handling**, and **business rules**. Deduplicate aggressively — quality over quantity.

### Step 4 — Generate CSV

Output a semicolon-separated CSV table. See [CSV format guide](reference/csv-format-guide.md) and [examples](reference/examples.md).

**Columns** (9): `Test ID;Summary;Description;Repository;Preconditions;Test Steps;Expected Results;Priority;Labels`

### Step 5 — Generate JDD (optional)

When test data is complex or the user requests it, generate a JDD JSON file. See [JDD generation guide](reference/jdd-generation.md).

## Defaults (overridable)

| Setting | Default |
|---|---|
| Language | French |
| CSV separator | `;` (semicolon) |
| Test ID format | `TC-[MODULE]-[NNN]` |
| Test name format | `TC_[PRODUCT]_[MODULE]_[FEATURE]_[ID]_[NAME]` |
| Priority levels | P0 = blocker/smoke, P1 = functional/regression, P2 = comfort/edge |
| Repository path | `[Module]/[SousModule]/[Fonctionnalité]/` |

## Priority Definitions

- **P0** — Blocking path. If this fails, the feature is unusable. Smoke tests, critical business rules.
- **P1** — Core functional. Regression-worthy scenarios, main error handling, key validations.
- **P2** — Edge cases, cosmetic validations, comfort features, boundary exploration.

## Constraints

- ALL test content in **French**
- No duplicate test cases — merge overlapping scenarios
- No vague steps — every step has a concrete action and observable expected result
- Use realistic test data (domain-appropriate values, not "test123")
- Each test traces to a requirement or acceptance criterion

## Integration

The CSV output can feed into the `qa-automation` skill to scaffold automated Playwright tests.
