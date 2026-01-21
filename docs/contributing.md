# Guide de contribution

Ce guide explique comment ajouter ou modifier des skills dans le repository.

## Structure d'un skill

Chaque skill est un dossier contenant au minimum un fichier `SKILL.md` :

```
skills/
└── mon-nouveau-skill/
    ├── SKILL.md              # Obligatoire
    ├── scripts/              # Optionnel - scripts exécutables
    ├── examples/             # Optionnel - exemples d'utilisation
    └── reference/            # Optionnel - documentation supplémentaire
```

## Format du fichier SKILL.md

```markdown
---
name: mon-skill
description: Description claire de ce que fait le skill ET quand l'utiliser.
---

# Titre du Skill

Instructions détaillées que l'IA suivra...

## Quand utiliser ce skill

- Cas d'usage 1
- Cas d'usage 2

## Instructions

1. Étape 1
2. Étape 2
...
```

### Champs obligatoires

| Champ | Description |
|-------|-------------|
| `name` | Identifiant unique, en minuscules avec tirets (ex: `mon-skill`) |
| `description` | Description complète incluant les cas d'utilisation. L'IA utilise ce champ pour décider quand activer le skill. |

### Bonnes pratiques pour la description

La description est **critique** - c'est elle qui détermine quand l'IA active le skill.

**Bonne description :**
```yaml
description: Guide pour créer des tests unitaires avec Jest. Utiliser quand l'utilisateur demande d'écrire des tests, de tester un composant, ou de configurer Jest.
```

**Mauvaise description :**
```yaml
description: Tests Jest
```

## Ajouter un nouveau skill

### 1. Créer le dossier

```bash
mkdir -p skills/mon-nouveau-skill
```

### 2. Créer le SKILL.md

```bash
cat > skills/mon-nouveau-skill/SKILL.md << 'EOF'
---
name: mon-nouveau-skill
description: Description détaillée du skill et de ses cas d'utilisation.
---

# Mon Nouveau Skill

## Quand utiliser

- Cas d'usage 1
- Cas d'usage 2

## Instructions

Instructions que l'IA doit suivre...

## Exemples

### Exemple 1
...

EOF
```

### 3. Tester localement

```bash
# Installer le skill localement
npx add-skill . -g --skill mon-nouveau-skill

# Tester avec votre agent IA
```

### 4. Commit et push

```bash
git add skills/mon-nouveau-skill/
git commit -m "feat: ajout du skill mon-nouveau-skill"
git push
```

## Types de skills

### 1. Skills de type "Guidelines"

Instructions et bonnes pratiques (pas de code exécutable).

```
skills/coding-standards/
└── SKILL.md
```

### 2. Skills de type "Toolkit"

Inclut des scripts que l'IA peut exécuter.

```
skills/database-queries/
├── SKILL.md
├── scripts/
│   └── query.py
└── requirements.txt
```

### 3. Skills de type "Reference"

Documentation en plusieurs fichiers avec progressive disclosure.

```
skills/architecture-guide/
├── SKILL.md
└── reference/
    ├── microservices.md
    ├── api-design.md
    └── security.md
```

## Ajouter des scripts

Si votre skill inclut des scripts :

1. Placez-les dans un dossier `scripts/`
2. Rendez-les exécutables : `chmod +x scripts/*.py`
3. Documentez leur usage dans `SKILL.md`
4. Ajoutez un `requirements.txt` si nécessaire

**Important :** Conseillez dans le SKILL.md d'utiliser `--help` avant de lire le code source :

```markdown
**Toujours lancer avec `--help` d'abord** pour voir l'usage.
Ne pas lire le code source sauf si absolument nécessaire.
```

## Ajouter des exemples

Les exemples aident l'IA à comprendre les patterns attendus :

```
skills/mon-skill/
├── SKILL.md
└── examples/
    ├── exemple-simple.py
    └── exemple-avance.py
```

Référencez-les dans le SKILL.md :
```markdown
## Exemples

Voir le dossier `examples/` pour des exemples de code :
- `exemple-simple.py` - Cas d'usage basique
- `exemple-avance.py` - Cas complexe avec gestion d'erreurs
```

## Conventions de nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Dossier skill | kebab-case | `react-best-practices` |
| Fichier SKILL.md | Exactement `SKILL.md` | `SKILL.md` |
| Scripts | snake_case | `run_tests.py` |
| Champ `name` | kebab-case | `react-best-practices` |

## Review checklist

Avant de soumettre une PR :

- [ ] Le skill a un `SKILL.md` avec `name` et `description`
- [ ] La description explique clairement **quand** utiliser le skill
- [ ] Les instructions sont claires et actionables
- [ ] Les scripts (si présents) fonctionnent et ont un `--help`
- [ ] Les dépendances sont listées (requirements.txt, etc.)
- [ ] Le skill a été testé localement avec un agent IA

## Modifier un skill existant

1. Faites vos modifications
2. Testez localement
3. Commitez avec un message descriptif :
```bash
git commit -m "fix(react-best-practices): correction de l'exemple de memo"
```

## Supprimer un skill

Attention : la suppression affecte tous les utilisateurs.

1. Prévenez l'équipe
2. Supprimez le dossier
3. Commitez :
```bash
git rm -r skills/skill-obsolete/
git commit -m "chore: suppression du skill obsolète skill-obsolete"
```
