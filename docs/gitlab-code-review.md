# GitLab Code Review

Revue de code complète des merge requests GitLab avec analyse de la qualité, sécurité, performance et bonnes pratiques.

## Utilisation

Demandez une revue de code en mentionnant la merge request :

```
Review !123
```

```
Code review de la MR 456
```

```
Revue de code pour l'issue #789
```

```
Montre-moi les MR ouvertes à reviewer
```

## Prérequis

- Serveur MCP GitLab configuré (`gitlab-mcp`)
- Accès au projet GitLab concerné

## Fonctionnalités

### Identification de la Merge Request

- Par numéro de MR : `review !123`
- Par issue liée : `review #456`
- Liste des MR ouvertes : `review` ou `liste les MR`

### Analyse complète

- **Qualité du code** : style, nommage, organisation, principes DRY
- **Revue technique** : logique, gestion d'erreurs, edge cases
- **Sécurité** : validation des entrées, injections SQL, XSS
- **Performance** : implications sur les performances
- **Bonnes pratiques** : patterns, SOLID, tests, documentation

### Rapport structuré

Le rapport de revue inclut :

1. **Résumé exécutif** : vue d'ensemble des changements
2. **Statistiques** : fichiers modifiés, lignes ajoutées/supprimées
3. **Points forts** : ce qui est bien fait
4. **Problèmes par priorité** :
   - 🔴 Critique : à corriger avant merge
   - 🟡 Important : à adresser
   - 🟢 Suggestions : améliorations optionnelles
5. **Revue sécurité** : considérations de sécurité
6. **Recommandations de tests** : tests à ajouter

## Style de feedback

Les retours sont formulés sous forme de questions pour encourager le dialogue :

✅ **Bon** :
- "Serait-il possible de simplifier avec un early return ?"
- "Que se passe-t-il si cet appel API échoue ?"

❌ **À éviter** :
- "Tu devrais utiliser un early return"
- "Ajoute une gestion d'erreur"

## Exemples

### Revue d'une MR spécifique

```
Utilisateur : Review !42 dans groupe/projet

Assistant :
# Code Review : !42 - "Ajout authentification utilisateur"

## Résumé
Cette MR ajoute un système d'authentification JWT...

## Statistiques
| Métrique | Nombre |
|----------|--------|
| Fichiers modifiés | 8 |
| Lignes ajoutées | +245 |
| Lignes supprimées | -12 |

## Points forts
- Bonne séparation des responsabilités
- Tests unitaires complets

## Problèmes trouvés
### 🔴 Critique
Aucun

### 🟡 Important
- Le token JWT n'a pas d'expiration configurée

### 🟢 Suggestions
- Envisager l'utilisation de refresh tokens

Souhaitez-vous que j'ajoute ces commentaires sur la MR ?
```

### Liste des MR à reviewer

```
Utilisateur : Montre-moi les MR ouvertes

Assistant :
MR ouvertes dans groupe/projet :

!45 - "Fix: Correction bug de pagination"
     Auteur: @alice | Pipeline: ✅ Passed

!43 - "Feature: Export CSV"
     Auteur: @bob | Pipeline: ⏳ Running

!42 - "Refactor: Module authentification"
     Auteur: @charlie | Pipeline: ❌ Failed

Quelle MR souhaitez-vous reviewer ?
```

## Notes importantes

- Seuls les changements de la MR sont analysés (pas le code existant)
- Les commentaires ne sont ajoutés qu'avec votre confirmation
- Le statut du pipeline est vérifié avant de conclure la revue
