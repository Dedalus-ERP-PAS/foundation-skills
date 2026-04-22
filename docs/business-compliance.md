# Business Compliance

Audit automatique de conformité aux règles métier du domaine Hexagone pour un écran ou un composant.

## Description

Ce skill analyse le code d'une page ou d'un composant de l'application Hexagone Web, extrait les entités et le bounded context concernés, matche ces éléments contre les règles métier documentées dans `docs/domain/`, et produit un rapport structuré des violations détectées.

**Mode report-only strict** : le skill ne modifie jamais de fichiers. En contexte santé, les règles métier ont un impact clinique et réglementaire direct — toute correction doit être validée par un expert du domaine (PO clinique, responsable conformité).

## Utilisation

```bash
# Par URL
/business-compliance http://localhost:5173/hexagone-etab/vue/prescriptions/123

# Par nom de composant
/business-compliance PrescriptionEditor

# Par nom de page (route)
/business-compliance Prescriptions

# Sans argument (demande quoi analyser)
/business-compliance
```

## Relation avec `design-compliance`

Les deux skills sont **complémentaires mais séparés** :

| | `design-compliance` | `business-compliance` |
|---|---|---|
| Couche auditée | Présentation / visuel | Domaine / règles métier |
| Source de vérité | `hexagone-preset.js`, CLAUDE.md, règles design | `docs/domain/` (Markdown structuré DDD) |
| Mode | Auto-fix des violations | **Report-only, aucune correction auto** |
| Risque | Faible (cosmétique) | Élevé (sécurité patient, réglementaire) |
| Reviewer | Devs frontend | Experts domaine, PO clinique, conformité |

Les lancer séparément selon le besoin. Une commande unifiée `/compliance-all` n'est pas prévue en v1.

## Prérequis : `docs/domain/` structuré

Le skill exige que les fichiers de règles dans `docs/domain/` respectent un schéma Markdown + YAML strict. Sans ce schéma, le skill refuse d'auditer et produit une checklist de migration.

Voir [`skills/business-compliance/reference/rule-schema.md`](../skills/business-compliance/reference/rule-schema.md) pour le schéma complet.

Résumé du schéma :

```markdown
---
bounded_context: prescriptions
entities: [Prescription, AllergyCheck]
api_prefixes: [/api/prescriptions, /api/allergies]
---

## Rule: PRESC-001 — Allergy check required before validation

- **severity:** P1
- **layer:** both
- **applies_to:** Prescription.validate action
- **status:** active

### Invariant
[Déclaration canonique de la règle]

### Preconditions / Forbidden transitions / Required fields / ...
[Au moins une section structurée]

### Rationale
[Justification clinique / réglementaire / workflow]

### Source
[Références internes et réglementaires]
```

## Les 5 catégories de violations

1. **Précondition manquante** — action exposée sans la vérification requise en amont
2. **Transition d'état interdite exposée** — bouton ou handler permettant un changement d'état que le domaine proscrit
3. **Champ requis absent** — invariant exigeant un champ qui n'est pas collecté/affiché/validé
4. **Invariant inter-entités non appliqué** — règle couvrant plusieurs entités, le code n'en gère qu'une
5. **Rupture de workflow** — étape documentée dans le domaine sans surface UI correspondante

## Classification de sévérité

| Sévérité | Signification | Escalade |
|----------|---------------|----------|
| **P1** | Sécurité patient — risque direct (allergies, doses, identité, signature) | Bloque le merge. Sign-off PO clinique requis. |
| **P2** | Conformité réglementaire — HDS, MDR, CNIL, traçabilité | Bloque le merge. Sign-off conformité requis. |
| **P3** | Intégrité workflow clinique — machines à états, orphelins, ruptures | Bloque le merge. Waiver possible par PO clinique avec justification écrite. |
| **P4** | Qualité de données / interop — segments optionnels, code systems, labels | Avertit. Ne bloque pas. Waiver dev possible. |

**P1 et P2 ne peuvent être waivés par un développeur seul.** Le rapport exige un reviewer clinique ou conformité nommé.

## Fonctionnement

1. **Validation du schéma** — lecture de `docs/domain/`, vérification du frontmatter et de la structure des règles. Si échec → abandon de l'audit + checklist de migration.
2. **Résolution des fichiers cibles** — glob ou recherche dans le routeur, puis parcours récursif de l'arbre de composants.
3. **Extraction des artefacts de l'écran** — route, stores Pinia, endpoints API, types TypeScript, validations de formulaires, handlers d'actions.
4. **Matching déterministe** — filtre par `api_prefixes` (bounded context) → intersection par entités → shortlist de règles applicables.
5. **Analyse statique** — pour chaque règle applicable, vérification des 5 catégories de violations. Preuves obligatoires (rule_id + doc:line + code:line).
6. **Gestion de l'incertitude** — findings ambigus marqués `NEEDS_CLINICAL_REVIEW` avec question structurée pour le reviewer.
7. **Règles non évaluables** — listées explicitement (dynamic dispatch, code non tracable) pour ne pas confondre "0 violation" et "non audité".
8. **Rapport terminal** — structuré par sévérité, avec citations complètes et signaux de drift.

## Comportement

- **Autonome** — aucune question pendant l'exécution (sauf si pas d'argument)
- **Report-only** — aucune modification de fichier, jamais
- **Citation obligatoire** — chaque finding cite rule_id + emplacement doc + emplacement code
- **Tune pour sensibilité** — en santé, un faux négatif est pire qu'un faux positif
- **Drift signals** — règles obsolètes et règles orphelines signalées

## Principes de design

1. **Pas d'auto-fix, ni en v1 ni en v2** — les règles métier ont un impact clinique ; la correction est une décision humaine.
2. **Schema-first** — si `docs/domain/` n'est pas structuré, le skill refuse de deviner.
3. **Matching déterministe avant LLM** — l'IA raisonne uniquement sur les règles shortlistées par filtrage mécanique.
4. **Pilote sur un bounded context** — démarrer sur un domaine (ex : prescriptions) avant d'étendre. Valider le ratio signal/bruit.
5. **P1/P2 inescalables** — sécurité patient et réglementaire exigent un sign-off nommé.

## Remplace

Aucun skill existant. Complète `design-compliance` (conformité visuelle) avec la conformité métier.

## Sortie

Le rapport est affiché dans la conversation. Aucun fichier n'est créé, modifié ou commité. Le développeur et l'expert domaine appliquent manuellement les corrections après revue.
