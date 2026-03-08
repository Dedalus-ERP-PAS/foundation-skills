# Fast Meeting

Réunion rapide et autonome avec personas IA : analyse, décision, implémentation, et création de MR/PR — le tout sans intervention humaine.

## Quand l'utiliser

- Quand vous voulez une décision ET une implémentation automatique sans interruption
- Pour des décisions techniques ou produit où vous faites confiance à l'analyse IA
- Quand vous voulez aller vite : un seul prompt déclenche l'analyse, le code et la MR/PR

## Différence avec meeting

| | meeting | fast-meeting |
|---|---|---|
| **Personas** | Sélection manuelle ou suggérée | Sélection automatique selon le contexte |
| **Tours de réunion** | 3 tours (positions, débat, convergence) | 2 tours (positions, synthèse directe) |
| **Validation utilisateur** | Obligatoire avant implémentation | Aucune — tout est automatique |
| **Implémentation** | Après validation explicite | Immédiate après la réunion |
| **MR/PR** | Non incluse | Créée automatiquement (GitLab ou GitHub) |
| **Description MR/PR** | N/A | En français, avec analyse complète |

## Comment l'utiliser

Demandez simplement à votre agent IA de lancer un fast meeting :

```
fast-meeting : est-ce qu'on doit utiliser GraphQL ou REST pour la nouvelle API
```

```
fast-meeting sur l'issue #42 - les notifications ne s'affichent pas
```

```
fast-meeting : refactorer le module d'authentification pour OAuth2
```

## Ce que le skill fait

1. **Comprend le sujet** — Lit le contexte (prompt, issue, code concerné)
2. **Détecte le remote** — GitLab ou GitHub pour la création de MR/PR
3. **Sélectionne 3-4 personas automatiquement** — Selon le domaine du sujet
4. **Anime une réunion rapide** — 1 tour de positions parallèles + synthèse
5. **Produit une analyse concise** — Recommandation, risques, plan d'implémentation
6. **Implémente la recommandation** — Code, tests, modifications de fichiers
7. **Crée une branche, commit et push** — Branche `fast-meeting/<sujet>`
8. **Crée la MR/PR** — Avec description complète en français
9. **Poste sur l'issue** — Si applicable, ajoute un lien vers la MR/PR

## Personas disponibles

| Persona | Rôle | Ce qui compte pour elle |
|---------|------|------------------------|
| Alex | Ingénieur Backend Senior | Qualité de code, maintenabilité |
| Sarah | Product Owner | Valeur utilisateur, rapidité de livraison |
| Shug | Ingénieur Sécurité (certifié OWASP) | Surface d'attaque, sécurité web, standards d'authentification |
| Priya | Ingénieure DevOps/SRE | Opérabilité, déploiement, scalabilité |
| Mohammed | Ingénieur Frontend | Expérience utilisateur, Vue.js, React, PrimeVue |
| Didier | Tech Lead / Architecte | Vision long terme, capacité de l'équipe |
| Nicolas | Ingénieur QA | Testabilité, cas limites, Playwright, Vitest |
| Isabelle | Ingénieure Base de Données Senior (Oracle) | Administration Oracle, PL/SQL, tuning |
| Jean-Baptiste | Ingénieur Data | Intégrité des données, migrations |
| Santiago | PO Interopérabilité Senior | Standards HL7, FHIR, HPK |
| Gilles | Développeur Fullstack Senior (Uniface) | Modernisation legacy, patterns 4GL/RAD |
| Victor | Développeur Fullstack Interopérabilité Senior | Intégration bout-en-bout, parsing de messages |

La sélection est automatique selon le contexte. Des personas spécialisées sont créées si le sujet le nécessite.

## Exemple de résultat

Le skill produit :
- Une **analyse affichée** dans la conversation (question, participants, recommandation, risques)
- Une **branche** `fast-meeting/<sujet>` avec le code implémenté
- Une **MR/PR** avec description complète en français incluant l'analyse et les changements
- Un **commentaire sur l'issue** (si applicable) avec lien vers la MR/PR
