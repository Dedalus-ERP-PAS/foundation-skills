# GitLab Issue

Création, consultation, mise à jour et gestion des issues GitLab avec intégration de contexte et workflows structurés.

## Configuration

**Instance GitLab utilisée :** https://gitlab-erp-pas.dedalus.lan

Cette compétence est configurée pour fonctionner avec l'instance GitLab auto-hébergée de Dedalus. Tous les projets, identifiants et références doivent utiliser cette instance.

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
Ajoute le label "priority::high" à l'issue #45
```

## Prérequis

- Serveur MCP GitLab configuré (`gitlab-mcp`)
- Accès à l'instance GitLab auto-hébergée : https://gitlab-erp-pas.dedalus.lan
- Identifiants et permissions appropriés sur les projets GitLab concernés

## Types d'issues

### Bug Report

```markdown
## Description du bug
[Description claire du problème]

## Environnement
- Version : [version]
- OS : [système d'exploitation]
- Navigateur : [si applicable]

## Étapes pour reproduire
1. [Première étape]
2. [Deuxième étape]
3. [Observer l'erreur]

## Comportement attendu
[Ce qui devrait se passer]

## Comportement actuel
[Ce qui se passe réellement]
```

### Feature Request

```markdown
## Description de la fonctionnalité
[Description claire de la fonctionnalité demandée]

## Problème à résoudre
[Quel problème cela résout ?]

## Solution proposée
[Comment cela devrait fonctionner ?]

## Critères d'acceptation
- [ ] [Critère 1]
- [ ] [Critère 2]
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
Création de l'issue dans groupe/projet :

Titre : [BUG] Login OAuth échoue après expiration de session
Labels : bug, priority::high, auth

Description :
## Description du bug
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

#142 - [BUG] Timeout API sur gros fichiers
       Labels: bug, priority::medium
       Créé le: 15/01/2024

#138 - [BUG] Graphiques non affichés sur Safari
       Labels: bug, frontend, priority::low
       Créé le: 12/01/2024

#125 - [BUG] Notifications email retardées
       Labels: bug, priority::high
       Créé le: 08/01/2024
```

### Fermeture d'une issue

```
Utilisateur : Ferme l'issue #142, corrigé dans la v2.4.0

Assistant :
Issue #142 "[BUG] Timeout API sur gros fichiers" fermée.
```

## Bonnes pratiques

### Titres efficaces

- Concis mais descriptifs
- Préfixe par type : [BUG], [FEATURE], [TASK], [DOCS]
- Mentionner le composant affecté si pertinent

### Descriptions structurées

- Utiliser le formatage Markdown
- Inclure tout le contexte nécessaire
- Ajouter des captures d'écran ou logs si utile
- Lier les issues, MR ou documentation connexes

### Labels

- Utiliser des labels scopés : `priority::high`, `status::in-progress`
- Combiner type (`bug`, `feature`) et domaine (`frontend`, `api`)
- Maintenir une taxonomie cohérente

### Workflow

- Assigner les issues à des personnes spécifiques
- Utiliser les milestones pour la planification
- Mettre à jour le statut au fur et à mesure
- Fermer avec référence à la MR : "Closes #XX"
