# Meeting

Simule une réunion structurée avec des experts virtuels pour analyser un sujet sous différents angles, débattre des options et converger vers une recommandation avant toute implémentation.

## Quand l'utiliser

- Avant de prendre une décision technique ou produit importante
- Pour explorer les compromis d'une architecture, migration ou refactoring
- Pour challenger une idée avec des points de vue diversifiés
- Quand une issue GitLab/GitHub nécessite une analyse multi-perspectives

## Comment l'utiliser

Demandez simplement à votre agent IA de lancer une réunion :

```
Lance une réunion pour savoir si on doit utiliser GraphQL ou REST pour la nouvelle API
```

```
Fais une réunion sur l'issue #234 - migration vers des microservices
```

```
Discutons avec des personas : doit-on ajouter des notifications temps réel ?
```

## Ce que le skill fait

1. **Comprend le sujet** — Lit le contexte (prompt, issue, code concerné)
2. **Suggère 3-5 personas** — Sélection automatique par heuristiques, vous confirmez ou ajustez
3. **Anime la réunion** — 3 tours : positions initiales, débat, convergence pondérée
4. **Évalue la confiance** — Niveau élevé, moyen ou faible selon le consensus et les dissidences
5. **Produit une analyse en français** — Recommandation, risques, alternatives, points non résolus, prochaines étapes
6. **Attend votre validation** — Rien n'est implémenté sans votre accord
7. **Réunion de suivi** — Si vous voulez approfondir un point, une réunion ciblée produit une analyse delta
8. **Implémente après validation** — Choix entre implémentation rapide (MR/PR automatique) ou guidée (pas à pas)
9. **Poste sur l'issue** — Si demandé, l'analyse est ajoutée en commentaire sur l'issue liée

## Personas disponibles

| Persona | Rôle | Ce qui compte pour elle |
|---------|------|------------------------|
| Alex | Ingénieur Backend Senior | Qualité de code, maintenabilité |
| Sarah | Product Owner | Valeur utilisateur, rapidité de livraison |
| Shug | Ingénieur Sécurité (certifié OWASP) | Surface d'attaque, sécurité web (OWASP Top 10), standards d'authentification, pentest |
| Priya | Ingénieure DevOps/SRE | Opérabilité, déploiement, scalabilité |
| Mohammed | Ingénieur Frontend | Expérience utilisateur, performance, Vue.js 2 & 3, React, shadcn/ui, PrimeVue LTS |
| Didier | Tech Lead / Architecte | Vision long terme, capacité de l'équipe |
| Nicolas | Ingénieur QA | Testabilité, cas limites, régression, tests E2E (Playwright), tests unitaires/intégration (Vitest) |
| Isabelle | Ingénieure Base de Données Senior (spécialiste Oracle) | Administration et optimisation Oracle (11.2 à 19c+), PL/SQL, tuning, RAC, Data Guard, migration inter-versions |
| Jean-Baptiste | Ingénieur Data | Intégrité des données, migrations |
| Santiago | PO Interopérabilité Senior | Standards (HL7, FHIR, HPK), intégration inter-systèmes |
| Gilles | Développeur Fullstack Senior (spécialiste Uniface) | Développement Uniface, modernisation de systèmes legacy, patterns 4GL/RAD, stratégies de migration. [Documentation Uniface](https://erp-pas.gitlab-pages-erp-pas.dedalus.lan/hexagone/uniface/) |
| Victor | Développeur Fullstack Interopérabilité Senior | Intégration bout-en-bout, parsing de messages (HL7, FHIR, HPK), connecteurs et transformation de données |

Des personas spécialisées (santé, finance, juridique) sont créées automatiquement si le sujet le nécessite.

## Nouveautés

| Amélioration | Description |
|---|---|
| **Heuristiques de sélection** | Table de suggestions automatiques selon le domaine (backend, frontend, sécurité, etc.) — vous confirmez avant le lancement |
| **Convergence pondérée** | Les positions sont pondérées par pertinence d'expertise. Un DBA pèse plus qu'un frontend sur une question de migration Oracle |
| **Niveau de confiance** | Chaque analyse inclut un niveau (élevé / moyen / faible). Si faible, une réunion de suivi est recommandée plutôt qu'une recommandation forcée |
| **Réunion de suivi** | Approfondir un point non résolu avec un panel ajusté. Produit une analyse delta, pas une ré-analyse complète |
| **Chemin vers l'implémentation** | Après validation : choix entre implémentation rapide (branche + MR/PR automatique) ou guidée (pas à pas avec validation) |

## Exemple de résultat

L'analyse produite contient :
- La question posée et les participants
- La synthèse de la discussion avec les tensions clés
- Le **niveau de confiance** de la recommandation
- La recommandation avec justification
- Les **points non résolus** (le cas échéant)
- Les risques identifiés et mitigations
- Les alternatives considérées
- Les prochaines étapes concrètes
