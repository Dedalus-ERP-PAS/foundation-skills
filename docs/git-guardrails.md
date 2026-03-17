# Git Guardrails

## Description

Le skill **git-guardrails** met en place des garde-fous pour empêcher l'agent IA (Claude Code) d'exécuter des commandes Git destructrices. Il intercepte les opérations dangereuses comme `git push`, `git reset --hard` ou `git branch -D` avant qu'elles ne soient exécutées.

## Pourquoi ce skill ?

Quand un agent IA travaille sur du code, il peut être amené à exécuter des commandes Git. Certaines de ces commandes sont irréversibles et peuvent causer des pertes de données :

- **`git push --force`** : écrase l'historique distant, potentiellement le travail d'autres développeurs
- **`git reset --hard`** : supprime toutes les modifications non commitées
- **`git clean -f`** : supprime définitivement les fichiers non suivis
- **`git branch -D`** : supprime une branche sans vérifier si elle a été fusionnée

Ce skill garantit que l'agent ne peut pas exécuter ces commandes. Si une opération dangereuse est nécessaire, l'utilisateur doit la lancer manuellement dans son terminal.

## Cas d'usage

- **Sécurisation d'un projet** : Empêcher l'agent de pousser du code non relu vers le dépôt distant
- **Protection contre les erreurs** : Bloquer les commandes qui suppriment des données de manière irréversible
- **Conformité Git Flow** : S'assurer que les push et force-push passent par un processus de revue humain

## Fonctionnement

1. L'utilisateur active le skill et choisit la portée : projet uniquement ou globale
2. Un script de hook est copié dans le répertoire `.claude/hooks/`
3. La configuration Claude Code est mise à jour pour intercepter les commandes Bash
4. Toute commande Git dangereuse est bloquée avant exécution, avec un message explicatif

## Personnalisation

Le script de blocage peut être adapté pour chaque projet :
- Ajouter des patterns supplémentaires (ex: `git stash drop`, `git tag -d`)
- Retirer des patterns si certaines commandes doivent être autorisées (ex: autoriser `git push` mais bloquer `--force`)

## Version

1.0.0
