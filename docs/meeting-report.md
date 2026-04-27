# Meeting Report

Génération automatique de comptes-rendus de réunion en français à partir d'une transcription Microsoft Teams.

## Contexte

Rédiger un compte-rendu de réunion prend du temps : écouter ou relire la transcription, réorganiser les échanges par sujet, extraire les décisions, identifier les actions à mener. Ce skill automatise toute la chaîne à partir du fichier `.vtt` exporté depuis Teams, avec en option le rapport de présence `.csv`.

**Agnostique par défaut, enrichi pour hexagone-monorepo.** Le skill fonctionne sur n'importe quel projet. Quand il détecte le projet **hexagone-monorepo**, il active automatiquement la classification par sous-domaine et le routage vers `docs/reports/<sous-domaine>/`. Sur tout autre projet, il écrit dans un dossier unique (`docs/reports/`, `docs/meetings/`, etc.).

## Utilisation

Déposer un ou deux chemins de fichiers dans le prompt :

```
crée un compte-rendu de cette transcription Teams /chemin/vers/reunion.vtt
génère le compte-rendu /chemin/vers/reunion.vtt /chemin/vers/attendees.csv
transforme cette transcription en rapport /chemin/vers/reunion.vtt
```

Le skill détecte les fichiers automatiquement grâce à leur extension (`.vtt` = transcription, `.csv` = présence).

## Détection du mode projet

Avant tout traitement, le skill détermine le mode en fonction du projet courant :

- **Mode `hexagone-monorepo`** activé si l'un de ces critères est vrai :
  - `docs/reports/foundation/` ET `docs/reports/interoperability/` existent
  - Le remote git mentionne `hexagone-monorepo`
  - Le `package.json` racine a un `name` contenant `hexagone-monorepo`
- **Mode générique** dans tous les autres cas.

L'utilisateur peut forcer le mode avec « mode générique » ou « mode hexagone ». Le skill annonce le mode détecté en une phrase avant de produire le compte-rendu.

## Fonctionnement

```mermaid
graph LR
    A[.vtt + .csv optionnel] --> B[Parse transcription]
    B --> M{Mode}
    M -- hexagone-monorepo --> C[Classification domaine]
    M -- générique --> G[Dossier unique]
    C --> D[Rewrite par sujet]
    G --> D
    D --> E[Extraction actions]
    E --> F[Fichier .md]
```

## Mode hexagone-monorepo

En mode hexagone-monorepo, le skill classe automatiquement le compte-rendu dans le bon sous-dossier de `docs/reports/` :

| Dossier | Contenu |
|---|---|
| `foundation/` | Réunions internes de l'équipe Foundation (sprint, rétro, point équipe, daily) |
| `core/` | Sujets transversaux, architecture, LDAP, S3A, permissions, rôles |
| `interoperability/` | Équipe Hexaflux, HL7 v2.5, FHIR, IHE PAM, segments ADT (PID, PV1, NK1, OBX), mappings, flux, brokers |
| `gap/` | Gestion Administrative Patient : admission, venue, séjour, facturation, portail patient, ROC, serveur d'actes, urgences, Diapason |
| `grh/` | Ressources humaines : MyRHConnect, RH Dossier, paie, contrats |
| `gef/` | Finance et achats : pharmacie, M21, contentieux, trésorerie, HA GHT, immobilisations |
| `ui-ux/` | Design, maquettes, ateliers UX/UI, Figma, écrans, prototypes |

Si la réunion couvre plusieurs domaines, le skill choisit le domaine **dominant** (celui avec le plus de signaux dans la transcription).

**Classement par projet, pas par équipe.** L'équipe Hexaflux fait partie de l'équipe Foundation au niveau organisationnel, mais travaille exclusivement sur le projet Hexaflux (domaine interopérabilité). Ses réunions récurrentes (hebdo, rétro, standup) sont donc classées dans `interoperability/`, jamais dans `foundation/`. Le dossier `foundation/` est réservé aux réunions de l'équipe Foundation portant sur la plateforme transverse.

**Cas particulier interop vs GAP.** Les messages HL7 véhiculent des données patient (PID, PV1, NK1…), donc les mots-clés GAP apparaissent naturellement dans une réunion d'interop. Quand des signaux HL7/interop sont présents, le skill classe en `interoperability/` — même si « patient » ou « admission » reviennent souvent — car la réunion parle d'**intégration technique**, pas de workflow métier.

## Mode générique

Aucune classification de domaine. Le skill écrit dans le premier dossier qui existe parmi :

1. `docs/reports/`
2. `docs/meetings/`
3. `meetings/`
4. `reports/`

Si aucun n'existe, il crée `docs/reports/` et l'utilise.

## Convention de nommage

| Mode | Cas | Format |
|---|---|---|
| hexagone-monorepo | Réunions Foundation | `YYYY-MM-DD.md` (date seule) |
| hexagone-monorepo | Autres domaines | `YYYY-MM-DD-<slug>.md` |
| générique | Tous | `YYYY-MM-DD-<slug>.md` |

Le nom de fichier utilise toujours le format ISO `YYYY-MM-DD`, tandis que la date dans le corps du compte-rendu est au format français `DD/MM/YYYY`.

## Format du compte-rendu

Le compte-rendu suit la même structure dans les deux modes :

- **Titre** : `# Compte-rendu — <Type> <Sujet>`
- **Métadonnées** : date (`DD/MM/YYYY`), organisateur identifié
- **Participants** : liste simple séparée par des virgules
- **Sections numérotées** par sujet, chacune avec `### Décisions` et, si pertinent, `### Point d'attention` et `### Problèmes identifiés`
- **Table `## Actions`** à la fin du document (toujours présente, avec une ligne « Aucune action identifiée » si rien n'a été repéré)
- **Diagrammes Mermaid** optionnels, uniquement si le contenu les rend utiles (workflows multi-étapes, arbres de décision)

Pas de front-matter YAML, pas de métadonnées cachées.

## Rewrite intelligent

Le skill ne recopie pas la transcription — il la **réorganise par sujet** et en extrait les décisions :

- **Accents corrigés** : les transcriptions `.vtt` Teams en français sont régulièrement incomplètes sur les accents
- **Filler supprimé** : « euh », « du coup », « en fait », répétitions, hésitations
- **Ton professionnel** en français, utilisation de « nous » ou de la voie impersonnelle
- **Emphase `**gras**`** sur les termes-clés dans les décisions
- **Longueur cible** : 800 à 1500 mots par compte-rendu

## Gestion des participants

Ordre de priorité pour identifier les participants :

1. **Fichier `.csv` de présence Teams** — le skill extrait la colonne `Name`
2. **Balises `<v Speaker Name>` dans le `.vtt`** — lecture des tags de voix si présents
3. **Demande à l'utilisateur** — si la transcription est anonyme et qu'aucun fichier de présence n'est fourni, le skill s'arrête et demande la liste des participants avant d'écrire

Le skill n'invente jamais de noms.

## Comportement

- Écrit le fichier directement à l'emplacement résolu selon le mode
- **Ne commite pas** et ne pousse pas — la revue et le commit restent manuels
- **N'écrase jamais** un compte-rendu existant ; si un fichier avec le même nom existe déjà, un suffixe numérique (`-2`, `-3`) est ajouté
- **Pas de censure** — les réunions sont considérées comme internes et sûres, les noms et contenus sont conservés tels quels

## Prérequis

- Avoir exporté la transcription `.vtt` depuis Teams
- Optionnel : avoir exporté le rapport de présence `.csv` pour enrichir la section Participants
- Mode hexagone-monorepo : le skill suppose que `docs/reports/<domaine>/` existe pour les sous-dossiers concernés (et les crée au besoin si manquants)
