# Guide d'installation

Ce guide explique comment installer les skills de l'équipe sur votre poste de développement.

## Prérequis

- Node.js 18+ installé
- Git configuré avec accès au GitLab interne
- Un agent IA supporté (Copilot, Cursor, Claude Code, etc.)

## Installation rapide

### Méthode 1 : Via add-skill (recommandée)

```bash
# Cloner le repo et installer en une commande
git clone https://gitlab-erp-pas.dedalus.lan/erp-pas/foundation/foundation-skills.git /tmp/foundation-skills
npx add-skill /tmp/foundation-skills -g -y
```

### Méthode 2 : Installation manuelle

1. **Cloner le repository**
```bash
git clone https://gitlab-erp-pas.dedalus.lan/erp-pas/foundation/foundation-skills.git
cd foundation-skills
```

2. **Copier les skills vers votre agent**

Pour **GitHub Copilot** :
```bash
cp -r skills/* ~/.copilot/skills/
```

Pour **Cursor** :
```bash
cp -r skills/* ~/.cursor/skills/
```

Pour **Claude Code** :
```bash
cp -r skills/* ~/.claude/skills/
```

## Installation par projet

Si vous préférez installer les skills au niveau d'un projet spécifique :

```bash
# Dans votre projet
npx add-skill /chemin/vers/foundation-skills --skill react-best-practices --skill webapp-testing
```

Ou manuellement :
```bash
# Pour Copilot
mkdir -p .github/skills
cp -r /chemin/vers/foundation-skills/skills/react-best-practices .github/skills/

# Pour Cursor
mkdir -p .cursor/skills
cp -r /chemin/vers/foundation-skills/skills/react-best-practices .cursor/skills/
```

## Vérification de l'installation

### GitHub Copilot (VS Code)

1. Ouvrez VS Code
2. Ouvrez le chat Copilot (Ctrl+Shift+I)
3. Tapez : "List available skills"
4. Les skills installés devraient apparaître

### Cursor

1. Ouvrez Cursor
2. Ouvrez le chat (Ctrl+L)
3. Demandez : "What skills do you have available?"

### Claude Code

1. Lancez Claude Code
2. Tapez : `/skills list`

## Mise à jour des skills

Pour obtenir les dernières versions :

```bash
cd /chemin/vers/foundation-skills
git pull
npx add-skill . -g -y
```

## Dépannage

### Les skills ne sont pas détectés

1. Vérifiez que les fichiers sont au bon endroit :
```bash
ls ~/.copilot/skills/  # Pour Copilot
ls ~/.cursor/skills/   # Pour Cursor
```

2. Redémarrez votre IDE

3. Vérifiez que chaque skill contient un fichier `SKILL.md`

### Erreur de permission

```bash
chmod -R 755 ~/.copilot/skills/
```

### Le skill postgres ne fonctionne pas

Installez les dépendances Python :
```bash
pip install psycopg2-binary
```

Créez le fichier de configuration :
```bash
cp ~/.copilot/skills/postgres/connections.example.json ~/.copilot/skills/postgres/connections.json
# Éditez connections.json avec vos credentials
```

## Support

En cas de problème, contactez l'équipe Foundation ou ouvrez une issue sur GitLab.
