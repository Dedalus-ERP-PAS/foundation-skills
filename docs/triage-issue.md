# Triage Issue

Investigation approfondie d'un bug avec analyse de cause racine et creation d'issue avec plan de correction TDD.

## Description

Le skill **triage-issue** permet a l'agent IA d'investiguer un probleme signale par l'utilisateur, de trouver la cause racine dans le code, puis de creer automatiquement une issue (GitLab ou GitHub) avec un plan de correction structure en cycles TDD (RED-GREEN).

Adapte du skill [triage-issue de Damien Battistella](https://github.com/DamienBattistella/skills/tree/main/triage-issue), avec support multi-plateforme GitLab/GitHub.

## Cas d'usage

- **Triage de bug** : Investiguer un bug signale et creer une issue documentee avec plan de correction
- **Analyse de cause racine** : Explorer le code pour comprendre pourquoi un comportement inattendu se produit
- **Planification TDD** : Definir un plan de correction par cycles RED-GREEN avant de coder
- **Documentation d'issue** : Creer une issue durable qui reste pertinente meme apres des refactors importants

## Declenchement

Ce skill s'active quand l'utilisateur :
- Signale un bug ou un comportement inattendu
- Utilise les mots : **"triage"** / **"investigate"** / **"diagnostique"**
- Veut creer une issue apres avoir rencontre un probleme
- Demande d'analyser la cause racine d'un bug

## Fonctionnement

Le workflow se deroule en 5 phases, largement autonomes :

1. **Capture du probleme** : L'agent demande une breve description si necessaire (une seule question maximum)
2. **Exploration et diagnostic** : Investigation approfondie du code -- fichiers sources, tests existants, historique git, patterns similaires
3. **Strategie de correction** : Identification du changement minimal necessaire pour corriger la cause racine
4. **Plan TDD** : Elaboration d'une liste ordonnee de cycles RED-GREEN (test qui echoue, puis correction minimale)
5. **Creation de l'issue** : Detection automatique de la plateforme (GitLab ou GitHub) et creation de l'issue avec le template structure

## Detection de plateforme

L'agent detecte automatiquement la plateforme cible :
- **GitLab** : Presence de `.gitlab-ci.yml` ou URL distante contenant `gitlab`
- **GitHub** : Presence du repertoire `.github/` ou URL distante contenant `github.com`
- **Ambiguite** : Si les deux sont detectes ou aucun, l'agent demande a l'utilisateur

## Principes cles

- **Investiguer d'abord, demander ensuite** : L'agent explore le code lui-meme au lieu de poser des questions
- **Pas de chemins de fichiers dans les issues** : Les chemins deviennent obsoletes apres un refactor. L'issue decrit des modules, comportements et contrats
- **Plan TDD obligatoire** : Chaque correction est decrite comme une sequence de cycles RED-GREEN
- **Durabilite** : Une bonne issue se lit comme une specification comportementale, pas comme un diff

## Exemples

**English:**
```
User: "The search API returns 500 when the query contains special characters. Triage this."

Agent: [Activates triage-issue skill]
- Investigates search endpoint, input validation, query parsing
- Finds root cause: unescaped regex characters in search query
- Creates issue with TDD fix plan:
  1. RED: Test search with special chars returns results
     GREEN: Escape regex metacharacters in query parser
  2. RED: Test search with empty query returns empty list
     GREEN: Add empty-string guard in search handler
- Posts issue URL and root cause summary
```

**Francais:**
```
Utilisateur: "L'API de recherche retourne une 500 quand la requete contient des caracteres speciaux. Triage."

Agent: [Active le skill triage-issue]
- Investigue l'endpoint de recherche, la validation des entrees, le parsing
- Trouve la cause racine : caracteres regex non echappes dans la requete
- Cree une issue avec plan de correction TDD :
  1. RED: Tester la recherche avec caracteres speciaux
     GREEN: Echapper les metacaracteres regex dans le parser
  2. RED: Tester la recherche avec requete vide
     GREEN: Ajouter un guard pour les chaines vides
- Affiche l'URL de l'issue et un resume de la cause racine
```

## Version

1.0.0
