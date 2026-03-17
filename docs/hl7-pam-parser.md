# hl7-pam-parser

Parsing et explication des messages HL7 v2.5 IHE PAM (Patient Administration Management) — le format standard d'interopérabilité pour l'administration des patients.

## Quand utiliser ce skill

Utilisez ce skill pour :
- Comprendre le contenu d'un message HL7 ADT
- Débugger des problèmes d'interopérabilité HL7
- Valider la structure d'un message selon les spécifications IHE PAM 2.10
- Documenter des exemples de messages HL7
- Former des développeurs aux spécifications HL7/IHE PAM

## Ce que fait le skill

- **Parse** les messages HL7 ADT et identifie le type/code événement
- **Extrait** tous les segments (MSH, EVN, PID, PV1, PV2) avec les libellés des champs
- **Valide** la structure selon IHE PAM 2.10
- **Explique** le message en langage humain compréhensible
- **Documente** les règles métier et la conformité IHE PAM

## Types de messages supportés

### Messages ADT (Admission, Transfert, Sortie)

| Code | Description |
|------|-------------|
| **ADT^A01** | Notification d'admission (entrée du patient) |
| **ADT^A02** | Transfert de patient (changement d'unité/chambre) |
| **ADT^A03** | Sortie du patient (sortie d'hospitalisation) |
| **ADT^A04** | Enregistrement patient (pré-admission/ambulatoire) |
| **ADT^A05** | Pré-admission d'un patient |
| **ADT^A06** | Passage ambulatoire → hospitalisation |
| **ADT^A07** | Passage hospitalisation → ambulatoire |
| **ADT^A08** | Mise à jour des informations patient |
| **ADT^A11** | Annulation d'admission |
| **ADT^A12** | Annulation de transfert |
| **ADT^A13** | Annulation de sortie |
| **ADT^A21** | Permission de sortie (absence temporaire) |
| **ADT^A22** | Retour de permission de sortie |

## Exemple d'utilisation

**Message en entrée** :
```
MSH|^~\&|HEXAFLUX|CHU_PARIS|TARGET|DEST|20260122140000||ADT^A01^ADT_A01|MSG001|P|2.5
EVN|A01|20260122140000|||USER001
PID|1||PAT12345^^^CHU_PARIS^PI||DUPONT^JEAN^^M.||19750315|M|||15 RUE DE LA PAIX^^PARIS^^75001^FRA||(33)612345678
PV1|1|I|CHU_PARIS^CARDIO^LIT_001^CHU_PARIS||||PR_MARTIN^MARTIN^SOPHIE|||CARDIO||||||||||VIS20260122001|||||||||||||||||||||||||20260122140000
```

**Résultat** :
```
Type : ADT^A01 (Notification d'admission)
Événement : A01 — Admission en hospitalisation
Patient : JEAN DUPONT, né le 15/03/1975, Masculin (ID : PAT12345)
Séjour : VIS20260122001
Admission : 22/01/2026 14:00:00
Localisation : CHU_PARIS, Cardiologie, Lit LIT_001
Médecin : Dr. MARTIN SOPHIE
Classe patient : Hospitalisé
```

## Structure d'un message HL7

Tous les messages HL7 v2.5 utilisent ces délimiteurs :

| Caractère | Rôle |
|-----------|------|
| `\|` | Séparateur de champs |
| `^` | Séparateur de composants |
| `~` | Séparateur de répétitions |
| `\` | Caractère d'échappement |
| `&` | Séparateur de sous-composants |

## Segments principaux

| Segment | Rôle | Obligatoire |
|---------|------|-------------|
| **MSH** | En-tête du message (routage, métadonnées) | Oui |
| **EVN** | Type d'événement (code, horodatage, déclencheur) | Oui |
| **PID** | Identification patient (identité, démographie, contact) | Oui |
| **PV1** | Visite patient (classe, localisation, séjour, médecin) | Oui |
| **PV2** | Informations complémentaires de visite (motif, sortie prévue) | Non |

## Conformité IHE PAM 2.10

Le parser valide les champs obligatoires :
- **MSH** : Application émettrice, établissement, date, type message, ID contrôle, version
- **EVN** : Code événement, date d'enregistrement
- **PID** : ID patient, nom, date de naissance, sexe
- **PV1** : Classe patient, localisation, numéro de séjour (pour les admissions)

## Références

- [Spécification IHE PAM 2.10](https://github.com/Interop-Sante/ihe.iti.pam.fr) (français)
- [Profil IHE PAM](https://profiles.ihe.net/ITI/TF/Volume1/ch-14.html) (international)
- [Standard HL7 v2.5](http://www.hl7.eu/HL7v2x/v25/std25/ch02.html)
- [SKILL.md](../skills/hl7-pam-parser/SKILL.md) — Structures détaillées des segments et champs

## Skills connexes

- **hpk-parser** — Parse les messages HPK (format propriétaire français souvent mappé vers HL7)
- Les formats HPK et HL7 sont souvent utilisés ensemble dans les flux d'interopérabilité santé en France
