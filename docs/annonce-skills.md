# Nouvelle ressource disponible : Foundation Skills pour les assistants IA

Chers développeurs,

Nous avons le plaisir de vous annoncer la mise à disposition d'une nouvelle bibliothèque de **skills spécialisés** pour vos assistants IA de développement (GitHub Copilot, Claude, Cursor, Windsurf, etc.).

## Qu'est-ce qu'un skill ?

Les skills sont des instructions et ressources que les agents IA chargent dynamiquement pour réaliser des tâches spécialisées de manière reproductible et professionnelle. Ils suivent le standard ouvert [Agent Skills](https://agentskills.io), garantissant une compatibilité maximale avec vos outils.

## Installation simple

Une seule commande suffit pour installer ou mettre à jour l'ensemble des skills :

```bash
npx add-skill Dedalus-ERP-PAS/foundation-skills -g -y
```

## Catalogue des skills disponibles

### 🛠️ Skills de développement

La bibliothèque comprend **15 skills de développement** couvrant vos besoins quotidiens :

**Architecture et patterns**
- **backend-patterns** : Patterns d'architecture backend (API RESTful, repository pattern, caching, authentification)
- **coding-standards** : Standards de code universels avec principes SOLID et conventions
- **react-best-practices** : Guide complet React/Next.js avec optimisations et patterns modernes
- **vue-best-practices** : Best practices Vue.js 3/Nuxt avec Composition API

**Qualité et sécurité**
- **gitlab-code-review** : Revue de code approfondie des merge requests GitLab
- **security-review** : Audit de sécurité complet (OWASP Top 10, gestion secrets, validation)
- **playwright-skill** : Tests et automatisation web avec Playwright

**Gestion de projet**
- **github-issues** : Gestion complète des issues GitHub (création, recherche, mise à jour)
- **gitlab-issue** : Gestion des issues pour instances GitLab auto-hébergées
- **changelog-generator** : Génération automatique de changelogs professionnels

**Design et UI/UX**
- **frontend-design** : Création d'interfaces de qualité production évitant les designs génériques
- **web-design-guidelines** : Audit complet UI/UX avec corrections automatiques
- **create-design-system-rules** : Génération de règles de design system pour workflows Figma-to-code

**Infrastructure et données**
- **postgres** : Exécution sécurisée de requêtes SQL avec support multi-bases
- **mcp-builder** : Guide complet pour créer des serveurs MCP en Python ou TypeScript

### 📄 Skills de traitement de documents

**6 skills spécialisés** pour manipuler tous types de documents :

- **docx** : Création et édition complètes de documents Word (tracked changes, commentaires)
- **pdf** : Manipulation complète de PDF (extraction, création, fusion, formulaires)
- **pptx** : Création et édition de présentations PowerPoint avec animations
- **xlsx** : Création et analyse de fichiers Excel avec formules complexes
- **article-extractor** : Extraction du contenu principal d'articles web
- **toxic-manager-translator** : Transformation de messages émotionnels en réponses professionnelles

## Avantages pour votre workflow

✅ **Gain de temps** : Instructions préstructurées pour des tâches répétitives  
✅ **Qualité constante** : Standards et best practices intégrés  
✅ **Reproductibilité** : Résultats cohérents à chaque utilisation  
✅ **Évolutivité** : Mises à jour régulières avec nouvelles fonctionnalités  
✅ **Compatibilité** : Fonctionne avec tous les assistants IA majeurs  
✅ **Standard ouvert** : Basé sur Agent Skills pour une interopérabilité maximale

## Utilisation avec Ralph (bonus)

Le repository inclut également **Ralph for Claude Code**, un système d'orchestration permettant des cycles de développement autonomes avec :
- Détection intelligente de sortie
- Protection contre les boucles infinies
- Rate limiting configurables
- Circuit breaker intégré
- 310 tests validant la stabilité

## Documentation complète

Chaque skill dispose d'une documentation détaillée accessible via :
- Documentation en ligne : Dossier `docs/` du repository
- Guide d'utilisation complet : [comment-utiliser.md](comment-utiliser.md)
- Exemples d'utilisation dans chaque fichier SKILL.md

## Support et contributions

- **Repository** : [Dedalus-ERP-PAS/foundation-skills](https://github.com/Dedalus-ERP-PAS/foundation-skills)
- **Issues** : Signalez les problèmes ou proposez des améliorations via GitHub Issues
- **Contributions** : Les contributions sont les bienvenues selon le guide CONTRIBUTING.md

## Pour commencer

1. Installez les skills avec la commande npx ci-dessus
2. Consultez le guide [comment-utiliser.md](comment-utiliser.md)
3. Testez avec un skill simple comme `changelog-generator` ou `coding-standards`
4. Explorez les skills avancés selon vos besoins

## Questions fréquentes

**Q : Les skills fonctionnent-ils avec mon assistant IA préféré ?**  
R : Oui, ils sont compatibles avec GitHub Copilot, Claude, Cursor, Windsurf et tout assistant supportant le standard Agent Skills.

**Q : Puis-je utiliser uniquement certains skills ?**  
R : Oui, chaque skill est indépendant et peut être utilisé séparément.

**Q : Les skills sont-ils maintenus ?**  
R : Oui, le repository est activement maintenu avec des mises à jour régulières.

**Q : Comment contribuer ou proposer un nouveau skill ?**  
R : Consultez le fichier CONTRIBUTING.md du repository et ouvrez une issue pour discuter de votre proposition.

---

Nous espérons que ces skills amélioreront significativement votre productivité et la qualité de vos développements. N'hésitez pas à partager vos retours d'expérience !

L'équipe Foundation Skills
