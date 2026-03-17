# Write a Skill

## Description

Le skill **write-a-skill** guide l'agent IA dans la creation d'un nouveau skill pour le depot foundation-skills. Il garantit le respect de toutes les conventions du projet : structure de fichiers, frontmatter YAML, versioning, et documentation.

Adapte du skill original de [Damien Battistella](https://github.com/DamienBattistella/skills).

## Cas d'usage

- **Creation de skill** : Scaffolder un nouveau skill complet (SKILL.md + documentation)
- **Respect des conventions** : S'assurer que chaque skill respecte le format et la structure du depot
- **Onboarding** : Aider un nouveau contributeur a creer son premier skill

## Declenchement

Ce skill s'active quand l'utilisateur :
- Demande a creer un nouveau skill
- Veut ajouter un skill au depot
- Utilise les phrases : **"write a skill"** / **"create a skill"** / **"new skill"** / **"scaffold a skill"**

## Fonctionnement

L'agent va :
1. Recueillir les besoins aupres de l'utilisateur (domaine, cas d'usage, declencheurs)
2. Choisir un nom en kebab-case et verifier qu'il n'existe pas deja
3. Creer `skills/<nom>/SKILL.md` avec le frontmatter obligatoire (`name`, `description`, `version` au niveau racine)
4. Creer les fichiers de reference dans `reference/` si le contenu depasse 100 lignes
5. Creer `docs/<nom>.md` en francais
6. Verifier le respect de toutes les conventions via une checklist de revue

## Conventions appliquees

| Regle | Detail |
|-------|--------|
| Frontmatter | `name`, `description`, `version` obligatoires, au niveau racine |
| Description | Max 1024 caracteres, inclut les declencheurs ("Use when...") |
| SKILL.md | Moins de 100 lignes, en anglais |
| Documentation | `docs/<nom>.md`, en francais |
| Version | Demarre a `1.0.0`, suit les regles semver (patch/minor/major) |
| Structure | Un repertoire par skill sous `skills/`, materiaux de reference dans `reference/` |

## Exemples

**English:**
```
User: "I want to create a new skill for generating changelogs"

Agent: [Activates write-a-skill]
- What specific use cases should this skill handle?
- What triggers should activate it?
- Any reference materials?
-> Creates skills/changelog-generator/SKILL.md
-> Creates docs/changelog-generator.md
-> Runs review checklist
```

**Francais:**
```
Utilisateur: "Je veux creer un nouveau skill pour la revue de code"

Agent: [Active le skill write-a-skill]
- Quels cas d'usage ce skill doit-il couvrir ?
- Quels declencheurs doivent l'activer ?
- Des materiaux de reference ?
-> Cree skills/code-review/SKILL.md
-> Cree docs/code-review.md
-> Execute la checklist de revue
```

## Version

1.0.0
