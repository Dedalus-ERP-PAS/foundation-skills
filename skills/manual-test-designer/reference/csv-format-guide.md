# CSV Format Guide — Xray Import

## Column Specification

The CSV uses **semicolon (`;`)** as separator for French locale compatibility with Excel.

**9 columns, in this exact order**:

| # | Column | Xray field | Description |
|---|---|---|---|
| 1 | Test ID | Test Key | Leave empty for new tests. Xray assigns keys on import (e.g., `ERPPASTEST-NNN`). For updates, provide existing key. |
| 2 | Summary | Summary | Concise title in French. Format: `[Action principale] — [contexte/variante]`. Max ~120 chars. |
| 3 | Description | Description | Brief functional description (1-3 sentences). What this test validates and why. |
| 4 | Repository | Test Repository Path | Hierarchical path using `/`. Example: `Auth/Connexion/`, `Paramétrage/Fiches plat/Création/` |
| 5 | Preconditions | Precondition | Bulleted list using `- `. State required BEFORE the test starts. |
| 6 | Test Steps | Test Steps | Numbered steps: `1. Action\n2. Action`. Each step = one user action. |
| 7 | Expected Results | Expected Result | Numbered results matching steps: `1. Result\n2. Result`. Observable, verifiable. |
| 8 | Priority | Priority | `High` (P0), `Medium` (P1), or `Low` (P2) |
| 9 | Labels | Labels | Comma-separated tags: `smoke,auth,positive` or `regression,negative,validation` |

## CSV Header Row

```csv
Test ID;Summary;Description;Repository;Preconditions;Test Steps;Expected Results;Priority;Labels
```

## Step Writing Rules

### DO

```
1. Ouvrir l'URL de l'application SRD
2. Saisir l'identifiant "admin" dans le champ Identifiant
3. Saisir le mot de passe dans le champ Mot de passe
4. Cliquer sur le bouton "Connexion"
```

- Start each step with an **action verb**: Ouvrir, Saisir, Cliquer, Vérifier, Sélectionner, Naviguer
- Include **concrete data** inline: `"admin"`, `"VVPO"`, `"CHBA"`
- One action per step — never combine two actions

### DON'T

```
❌ "Remplir le formulaire" (too vague — which fields?)
❌ "Se connecter à l'application" (what steps exactly?)
❌ "Vérifier que tout fonctionne" (what specifically?)
❌ "L'utilisateur fait des trucs" (non-actionable)
```

## Expected Result Writing Rules

### DO

```
1. La page de connexion affiche le logo SRD et le formulaire
2. Le champ accepte la saisie
3. Le champ mot de passe masque les caractères (●●●)
4. L'utilisateur est redirigé vers la page d'accueil
```

- Each result is **observable** — what the user sees or can verify
- Match the numbering to the corresponding step
- Be specific: mention exact UI elements, messages, behaviors

### DON'T

```
❌ "Le système fonctionne correctement" (how do you verify?)
❌ "Pas d'erreur" (what should happen instead?)
❌ "OK" (not a result)
```

## Preconditions Format

```
- Application SRD accessible sur l'environnement de test
- Utilisateur "adminsrd" existant avec droits Paramétrage
- Navigateur Chrome/Firefox ouvert
- Aucune fiche plat avec le libellé "Curry de poulet" existante
```

- Use `- ` bullet prefix
- State the system's required state, not actions to perform
- Include test data prerequisites (existing records, clean state)

## Repository Path Convention

The repository path creates the folder hierarchy in Xray.

```
[Module]/[SousModule]/[Fonctionnalité]/
```

**Examples**:

| Feature | Repository path |
|---|---|
| Login | `Auth/Connexion/` |
| Logout | `Auth/Déconnexion/` |
| Module navigation | `Navigation/Modules/[Module]/` |
| Sidebar | `Navigation/Sidebar/` |
| Dish creation | `Paramétrage/Fiches plat/Création/` |
| Dish modification | `Paramétrage/Fiches plat/Modification/` |

## Labels Convention

Use lowercase, no spaces. Combine as needed.

| Category | Labels |
|---|---|
| Test type | `smoke`, `regression`, `functional`, `exploratory` |
| Scenario polarity | `positive`, `negative` |
| Concern | `validation`, `security`, `accessibility`, `performance` |
| Module | `auth`, `navigation`, `parametrage`, `consommateur`, `collective` |
| Special | `boundary`, `error-handling`, `business-rule`, `data-integrity` |

## Priority Mapping

| CSV value | Xray Priority | Skill level | Meaning |
|---|---|---|---|
| `High` | Highest/High | P0 | Blocking path — feature unusable if this fails |
| `Medium` | Medium | P1 | Core functional — regression-worthy |
| `Low` | Low | P2 | Edge case, comfort, boundary exploration |

## Multi-line Content in CSV

When steps or preconditions contain multiple lines, wrap the cell content in **double quotes** and use `\n` (literal newline) inside:

```csv
TC-AUTH-001;"Connexion réussie avec identifiants valides";"Vérifier qu'un utilisateur peut se connecter";"Auth/Connexion/";"- Application accessible\n- Utilisateur valide existant";"1. Ouvrir l'URL\n2. Saisir identifiant\n3. Cliquer Connexion";"1. Page de connexion affichée\n2. Champ accepte la saisie\n3. Redirection vers accueil";High;smoke,auth,positive
```

## Anti-patterns to Avoid

| Anti-pattern | Problem | Fix |
|---|---|---|
| Duplicate tests | Same scenario tested with trivially different data | Merge into one test, mention data variations in description |
| Missing preconditions | Test fails because required state was not set up | Always specify auth state, data prerequisites, UI state |
| Vague expected results | "Should work correctly" — untestable | Specify exactly what the tester should see/verify |
| Too many steps | 15+ steps in one test case | Split into smaller, focused test cases |
| Technical jargon | "Verify the DOM contains element .btn-fab" | Use user-visible language: "Le bouton 'Ajouter un plat' est visible" |
| Test data as "test123" | Unrealistic, doesn't catch real-world issues | Use domain-appropriate data: "Curry de poulet au lait de coco" |
