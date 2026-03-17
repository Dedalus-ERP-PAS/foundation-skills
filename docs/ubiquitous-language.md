# Ubiquitous Language

## Description

Le skill **ubiquitous-language** permet à l'agent IA d'extraire et de formaliser la terminologie métier à partir d'une conversation, en suivant l'approche du **Domain-Driven Design (DDD)**. Il produit un glossaire structuré sauvegardé dans un fichier `UBIQUITOUS_LANGUAGE.md`.

Ce skill est adapté du skill [ubiquitous-language de Damien Battistella](https://github.com/DamienBattistella/skills), enrichi pour le contexte santé et le bilinguisme français/anglais.

## Cas d'usage

- **Harmonisation du vocabulaire** : Établir un langage commun entre développeurs, experts métier et PO
- **Domaine santé** : Clarifier les termes HL7, FHIR, HPK, IHE qui se recoupent entre standards
- **Détection d'ambiguïtés** : Identifier quand un même mot désigne des concepts différents
- **Élimination des synonymes** : Choisir un terme canonique et lister les alternatives à éviter
- **Support bilingue** : Cartographier les termes français et anglais côte à côte

## Déclenchement

Ce skill s'active quand l'utilisateur :
- Souhaite définir des termes métier ou construire un glossaire
- Mentionne **"ubiquitous language"**, **"langage ubiquitaire"**, **"glossaire"**, **"DDD"** ou **"domain model"**
- Veut durcir la terminologie d'un projet

## Fonctionnement

L'agent va :
1. Scanner la conversation pour identifier noms, verbes et concepts liés au domaine
2. Détecter les problèmes terminologiques :
   - **Ambiguïtés** : un même mot utilisé pour des concepts différents
   - **Synonymes** : des mots différents pour un même concept
   - **Termes vagues** : mots trop génériques ou surchargés
3. Proposer un glossaire canonique avec des choix tranchés
4. Écrire le fichier `UBIQUITOUS_LANGUAGE.md` avec des tables groupées par sous-domaine
5. Afficher un résumé dans la conversation

## Format de sortie

Le fichier `UBIQUITOUS_LANGUAGE.md` contient :
- **Tables groupées** par sous-domaine avec colonnes : Term | Terme français | Definition | Aliases to avoid
- **Relations** entre termes avec cardinalités
- **Dialogue d'exemple** montrant l'usage précis des termes
- **Ambiguïtés signalées** avec recommandations

## Spécificités santé

Ce skill est particulièrement adapté au contexte santé où la terminologie varie entre standards :
- Un même concept peut s'appeler différemment en HL7v2, FHIR, HPK ou IHE
- Les conséquences d'un malentendu terminologique sont coûteuses et potentiellement dangereuses en milieu clinique
- Le glossaire permet d'ancrer le vocabulaire de l'équipe sur des définitions partagées

## Support bilingue

- Le terme **canonique** est choisi selon la langue la plus naturelle pour l'équipe
- Une colonne **Terme français** accompagne chaque définition
- Quand un standard impose un terme anglais (ex : "Encounter", "Observation"), celui-ci est préféré comme canonique avec l'équivalent français en regard

## Mise à jour incrémentale

Lorsque le skill est invoqué à nouveau dans la même conversation :
- Les termes existants sont conservés et mis à jour si nécessaire
- Les entrées modifiées sont marquées **(updated)**
- Les nouvelles entrées sont marquées **(new)**
- Les nouvelles ambiguïtés sont signalées
- Le dialogue d'exemple est rafraîchi

## Exemples

**English:**
```
User: "Let's build a ubiquitous language for our patient management module."

Agent: [Scans conversation, extracts terms, writes UBIQUITOUS_LANGUAGE.md]
- Identifies key terms: Encounter, Admission, Patient, Prescription...
- Flags ambiguities: "séjour" used for both Encounter and Hospitalization
- Groups terms by subdomain: Patient lifecycle, Clinical concepts...
- Writes example dialogue showing precise term usage
```

**Français:**
```
Utilisateur: "Construisons un glossaire pour notre module de gestion des patients."

Agent: [Scanne la conversation, extrait les termes, écrit UBIQUITOUS_LANGUAGE.md]
- Identifie les termes clés : Encounter, Admission, Patient, Prescription...
- Signale les ambiguïtés : "séjour" utilisé à la fois pour Encounter et Hospitalization
- Groupe les termes par sous-domaine : Cycle de vie patient, Concepts cliniques...
- Écrit un dialogue d'exemple montrant l'usage précis des termes
```

## Version

1.0.0
