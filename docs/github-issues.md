# GitHub Issues

Création, consultation, mise à jour et gestion des issues GitHub avec intégration de contexte et workflows structurés.

## Utilisation

### Créer une issue

```
Crée une issue pour le bug de connexion
```

```
Nouvelle feature request pour le mode sombre
```

```
Crée une tâche pour mettre à jour la documentation
```

### Consulter des issues

```
Montre-moi l'issue #42
```

```
Liste les bugs ouverts
```

```
Quelles issues me sont assignées ?
```

### Mettre à jour une issue

```
Ferme l'issue #123
```

```
Ajoute le label "priority-high" à l'issue #45
```

### Rechercher des issues

```
Recherche les issues contenant "authentification"
```

```
Trouve les bugs créés cette semaine
```

## Prérequis

- Serveur MCP GitHub configuré (`github-mcp`)
- Accès au repository GitHub concerné

## Types d'issues

### Bug Report

```markdown
## Description
[Description claire du problème]

## Étapes pour reproduire
1. [Première étape]
2. [Deuxième étape]
3. [Observer l'erreur]

## Comportement attendu
[Ce qui devrait se passer]

## Comportement actuel
[Ce qui se passe réellement]

## Environnement
- Version : [version]
- OS : [système d'exploitation]
- Navigateur : [si applicable]

## Captures d'écran/Logs
[Fichiers pertinents]
```

### Feature Request

```markdown
## Résumé
[Description en une ligne de la fonctionnalité]

## Motivation
[Pourquoi cette fonctionnalité est-elle nécessaire ?]

## Solution proposée
[Comment cela devrait fonctionner ?]

## Critères d'acceptation
- [ ] [Critère 1]
- [ ] [Critère 2]

## Alternatives considérées
[Autres approches envisagées]
```

### Task

```markdown
## Description de la tâche
[Ce qui doit être fait]

## Contexte
[Pourquoi est-ce nécessaire ?]

## Définition de "terminé"
- [ ] [Critère 1]
- [ ] [Critère 2]

## Dépendances
[Issues liées, bloqueurs]
```

## Exemples

### Création d'un bug

```
Utilisateur : Crée une issue pour le bug de login OAuth

Assistant : Pour créer cette issue, j'ai besoin de quelques informations :
- Quel est le comportement actuel ?
- Quelles sont les étapes pour reproduire ?
- Quelle version est concernée ?

Utilisateur : Quand la session expire, on ne peut plus se reconnecter 
avec Google. Ça affiche "Invalid state parameter".

Assistant : 
Création de l'issue dans owner/repo :

Titre : [Bug] Login OAuth échoue après expiration de session
Labels : bug

Description :
## Description
Les utilisateurs ne peuvent pas se reconnecter via OAuth2 (Google) 
après expiration de leur session.

## Étapes pour reproduire
1. Se connecter avec OAuth2 (Google)
2. Attendre l'expiration de session (ou effacer les cookies)
3. Tenter de se reconnecter
4. Observer l'erreur : "Invalid state parameter"

## Comportement attendu
L'utilisateur devrait être redirigé vers le fournisseur OAuth 
et se connecter avec succès.

Confirmer la création ?
```

### Liste des issues

```
Utilisateur : Montre-moi les bugs ouverts qui me sont assignés

Assistant :
3 bugs ouverts vous sont assignés :

#142 - [Bug] Timeout API sur gros fichiers
       Labels: bug, priority-medium
       Créé le: 15/01/2024

#138 - [Bug] Graphiques non affichés sur Safari
       Labels: bug, frontend
       Créé le: 12/01/2024

#125 - [Bug] Notifications email retardées
       Labels: bug, priority-high
       Créé le: 08/01/2024
```

### Fermeture d'une issue

```
Utilisateur : Ferme l'issue #142, corrigé dans la v2.4.0

Assistant :
Ajout du commentaire : "Corrigé dans la v2.4.0. Fermeture de l'issue."
Issue #142 "[Bug] Timeout API sur gros fichiers" fermée.
```

### Recherche d'issues

```
Utilisateur : Recherche les issues sur l'authentification

Assistant :
5 issues trouvées pour "authentification" :

#156 - [Feature] Support authentification SAML
       État: ouvert | Labels: enhancement
       
#142 - [Bug] Token d'authentification expiré trop tôt
       État: fermé | Labels: bug

#138 - [Task] Documenter le flux d'authentification
       État: ouvert | Labels: documentation

#125 - [Bug] Erreur authentification 2FA
       État: ouvert | Labels: bug, priority-high

#98 - [Feature] Authentification par empreinte digitale
       État: fermé | Labels: enhancement, wontfix
```

## Labels courants

| Label | Utilisation |
|-------|-------------|
| `bug` | Quelque chose ne fonctionne pas |
| `enhancement` | Nouvelle fonctionnalité ou amélioration |
| `documentation` | Mise à jour de documentation |
| `good first issue` | Bon pour les débutants |
| `help wanted` | Attention supplémentaire nécessaire |
| `question` | Information supplémentaire requise |
| `wontfix` | Ne sera pas traité |
| `duplicate` | Existe déjà |

## Bonnes pratiques

### Titres efficaces

- Concis mais descriptifs
- Préfixe par type : [Bug], [Feature], [Task], [Docs]
- Mentionner le composant affecté si pertinent
- Garder sous 72 caractères

### Descriptions structurées

- Utiliser le formatage Markdown
- Inclure tout le contexte nécessaire
- Ajouter des captures d'écran ou logs si utile
- Lier les issues, PRs ou documentation connexes
- Utiliser des listes de tâches pour le suivi

### Labels

- Combiner type (`bug`, `enhancement`) et domaine (`frontend`, `api`)
- Utiliser des labels de priorité si nécessaire
- Maintenir une taxonomie cohérente

### Workflow

- Assigner les issues à des personnes spécifiques
- Utiliser les milestones pour la planification
- Mettre à jour le statut au fur et à mesure
- Fermer avec référence à la PR : "Fixes #XX"
