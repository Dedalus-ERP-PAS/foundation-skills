# Guide d'utilisation - HPK Parser & HL7 PAM Parser

Guide complet pour utiliser les skills de parsing des messages de santé HPK et HL7 IHE PAM.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [HPK Parser](#hpk-parser)
3. [HL7 PAM Parser](#hl7-pam-parser)
4. [Cas d'usage courants](#cas-dusage-courants)
5. [Workflows combinés](#workflows-combinés)
6. [Exemples pratiques](#exemples-pratiques)
7. [Dépannage](#dépannage)

## Vue d'ensemble

Ces deux skills permettent de parser et expliquer les messages de santé utilisés dans les systèmes d'information hospitaliers français :

- **hpk-parser** : Format propriétaire HPK (Healthcare Protocol Kernel) - messages avec délimiteur pipe (`|`)
- **hl7-pam-parser** : Standard international HL7 v2.5 IHE PAM (Patient Administration Management)

### Quand utiliser chaque skill ?

| Situation | Skill à utiliser |
|-----------|------------------|
| Message avec délimiteurs `\|` et champs fixes | `hpk-parser` |
| Message commençant par `MSH\|^~\&` | `hl7-pam-parser` |
| Format propriétaire français (HPK/GEF) | `hpk-parser` |
| Standard HL7 v2.5 international | `hl7-pam-parser` |
| Identifier un message inconnu | Les deux (l'agent choisira) |

## HPK Parser

### Description

Parse et explique les messages HPK - format propriétaire français utilisé dans les systèmes hospitaliers (Hexaflux, HPrim, etc.).

### Types de messages supportés

#### Messages d'identité (ID|*)
- **ID|M1** - Identité patient (démographie)
- **ID|MT** - Médecin traitant
- **ID|CE** - Consentement éclairé

#### Messages de mouvements (MV|*)
- **MV|M2** - Admission hospitalière
- **MV|M3** - Changement de statut
- **MV|M6** - Transfert inter-unités
- **MV|M8** - Sortie d'unité
- **MV|M9** - Sortie d'hospitalisation
- **MV|B1** - Mouvement box urgences
- **MV|MT** - Mouvement temporaire

#### Messages de couverture (CV|*)
- **CV|M1** - Couverture sociale/mutuelle

### Exemples d'utilisation

#### Exemple 1 : Parser un message patient

```
Prompt : "Parse ce message HPK :
ID|M1|C|HEXAGONE|20260122120000|USER001|PAT12345|DUPONT|JEAN|19750315|M|15 RUE DE LA PAIX|75001|PARIS|FRA|0612345678||||||||||||||||||||||||||||||"
```

**Résultat attendu** :
```
Type de message : Identité patient (ID|M1)
Mode : Création (C)
Système émetteur : HEXAGONE
Horodatage : 22/01/2026 12:00:00

Patient :
- IPP : PAT12345
- Nom : DUPONT JEAN
- Date de naissance : 15/03/1975
- Sexe : Masculin
- Adresse : 15 RUE DE LA PAIX, 75001 PARIS, France
- Téléphone : 06 12 34 56 78

Contexte métier :
Création d'un nouveau dossier patient dans le système HEXAGONE.
```

#### Exemple 2 : Expliquer un message d'admission

```
Prompt : "Explique ce message HPK d'admission :
MV|M2|C|HEXAGONE|20260122140000|USER001|PAT12345|VIS20260122001|20260122140000|URGENCE|CHU_PARIS|CARDIO|UF_CARDIO_01|LIT_001|PR_MARTIN|||||||"
```

**Résultat attendu** :
```
Type de message : Admission hospitalière (MV|M2)
Mode : Création (C)

Patient : PAT12345
Visite : VIS20260122001
Date/heure admission : 22/01/2026 14:00:00

Détails admission :
- Mode d'entrée : URGENCE (Entrée par les urgences)
- Établissement : CHU_PARIS
- Service : CARDIO (Cardiologie)
- Unité fonctionnelle : UF_CARDIO_01
- Lit : LIT_001
- Médecin responsable : PR_MARTIN

Contexte métier :
Admission d'un patient via les urgences dans le service de cardiologie.
Le patient est affecté au lit LIT_001 de l'unité fonctionnelle UF_CARDIO_01.
```

#### Exemple 3 : Valider un message

```
Prompt : "Valide ce message HPK et identifie les erreurs éventuelles :
MV|M6|C|HEXAGONE|20260123|USER002|PAT12345|VIS20260122001|..."
```

**Résultat attendu** :
```
✗ Erreur de format détectée

Champ Date/Heure (position 4) :
- Valeur fournie : "20260123"
- Format attendu : YYYYMMDDHHmmss (14 caractères)
- Erreur : Date incomplète - manque heures, minutes, secondes

Correction suggérée :
MV|M6|C|HEXAGONE|20260123000000|USER002|...
```

## HL7 PAM Parser

### Description

Parse et explique les messages HL7 v2.5 IHE PAM - standard international pour l'administration des patients.

### Types de messages supportés

#### Messages ADT (Admit, Discharge, Transfer)
- **ADT^A01** - Admission / Enregistrement
- **ADT^A02** - Transfert patient
- **ADT^A03** - Sortie d'hospitalisation
- **ADT^A04** - Pré-admission
- **ADT^A08** - Mise à jour démographie
- **ADT^A11** - Annulation admission
- **ADT^A12** - Annulation transfert
- **ADT^A13** - Annulation sortie

### Exemples d'utilisation

#### Exemple 1 : Parser un message ADT^A01 (Admission)

```
Prompt : "Parse ce message HL7 d'admission :
MSH|^~\&|HEXAFLUX|CHU_PARIS|TARGET|DEST|20260122140000||ADT^A01^ADT_A01|MSG001|P|2.5
EVN|A01|20260122140000|||USER001
PID|1||PAT12345^^^CHU_PARIS^PI||DUPONT^JEAN^^M.||19750315|M|||15 RUE DE LA PAIX^^PARIS^^75001^FRA||(33)612345678
PV1|1|I|CHU_PARIS^CARDIO^LIT_001^CHU_PARIS||||PR_MARTIN^MARTIN^SOPHIE|||CARDIO||||||||||VIS20260122001|||||||||||||||||||||||||20260122140000"
```

**Résultat attendu** :
```
Message Type : ADT^A01 (Admission/Visit Notification)
Event Code : A01
Version HL7 : 2.5
Message Control ID : MSG001

MSH - En-tête de message :
- Application émettrice : HEXAFLUX
- Établissement émetteur : CHU_PARIS
- Horodatage : 22/01/2026 14:00:00
- Processing ID : P (Production)

EVN - Type d'événement :
- Code événement : A01 (Admission)
- Date/heure enregistrement : 22/01/2026 14:00:00
- Opérateur : USER001

PID - Identification patient :
- ID Patient : PAT12345
- Nom : DUPONT JEAN (M.)
- Date de naissance : 15/03/1975
- Sexe : Masculin
- Adresse : 15 RUE DE LA PAIX, 75001 PARIS, France
- Téléphone : (33) 6 12 34 56 78

PV1 - Visite patient :
- Classe patient : I (Inpatient - Hospitalisé)
- Localisation : CHU_PARIS, Service CARDIO, Lit LIT_001
- Médecin référent : Dr. MARTIN SOPHIE
- Numéro de visite : VIS20260122001
- Date/heure admission : 22/01/2026 14:00:00

Conformité IHE PAM 2.10 : ✓ Conforme
- Segments requis : ✓ MSH, EVN, PID, PV1
- Champs obligatoires : ✓ Tous présents
```

#### Exemple 2 : Expliquer un transfert (ADT^A02)

```
Prompt : "Explique ce transfert HL7 :
MSH|^~\&|HEXAFLUX|CHU_PARIS|TARGET|DEST|20260123090000||ADT^A02^ADT_A02|MSG002|P|2.5
EVN|A02|20260123090000|||USER002
PID|1||PAT12345^^^CHU_PARIS^PI||DUPONT^JEAN^^M.||19750315|M
PV1|1|I|CHU_PARIS^NEURO^LIT_102^CHU_PARIS||||PR_DURAND^DURAND^PAUL|||NEURO||||||||||VIS20260122001
PV2||||||||||||||||||||||CHU_PARIS^CARDIO^LIT_001^CHU_PARIS"
```

**Résultat attendu** :
```
Message Type : ADT^A02 (Transfer Patient)
Event : Transfert inter-service

Patient : JEAN DUPONT (PAT12345)
Visite : VIS20260122001
Date/heure transfert : 23/01/2026 09:00:00

Transfert :
- DE : Service CARDIO, Lit LIT_001 (PV2-1 : Prior Location)
- VERS : Service NEURO, Lit LIT_102 (PV1-3 : Assigned Location)
- Nouveau médecin : Dr. DURAND PAUL

Contexte clinique :
Transfert du patient depuis le service de cardiologie vers
le service de neurologie, avec changement de médecin référent.
Le patient reste dans la même visite/séjour (VIS20260122001).
```

#### Exemple 3 : Valider la conformité IHE PAM

```
Prompt : "Valide ce message HL7 contre les spécifications IHE PAM 2.10 :
MSH|^~\&|APP|FAC|REC|DEST|20260122||ADT^A01|MSG001|P|2.5
PID|1||PAT001||DOE^JOHN||19800101|M
PV1|1|O"
```

**Résultat attendu** :
```
Conformité IHE PAM 2.10 : ✗ Non conforme

Erreurs détectées :

1. Segment EVN manquant
   ✗ Requis pour tous les messages ADT
   → Ajouter : EVN|A01|[DateTime]

2. MSH-7 (Date/Time of Message) incomplet
   ✗ Valeur : "20260122"
   ✓ Format attendu : YYYYMMDDHHmmss
   → Correction : 20260122000000

3. PV1-3 (Assigned Patient Location) manquant
   ✗ Requis pour ADT^A01 (Admission)
   → Ajouter localisation : Facility^Service^Bed

4. PV1-19 (Visit Number) manquant
   ✗ Requis pour ADT^A01
   → Ajouter numéro de visite unique

Message corrigé :
MSH|^~\&|APP|FAC|REC|DEST|20260122120000||ADT^A01^ADT_A01|MSG001|P|2.5
EVN|A01|20260122120000
PID|1||PAT001^^^FAC^PI||DOE^JOHN||19800101|M
PV1|1|O|FAC^SERVICE^BED001|||||||||||||||||||VISIT001
```

## Cas d'usage courants

### 1. Comprendre un message inconnu

```
Prompt : "J'ai reçu ce message, peux-tu m'expliquer ce que c'est ?
ID|M1|C|HEXAGONE|20260122120000|..."
```

L'agent va :
1. Identifier automatiquement qu'il s'agit d'HPK
2. Utiliser `hpk-parser`
3. Expliquer le type, les champs, le contexte

### 2. Déboguer un problème d'intégration

```
Prompt : "Notre interface reçoit ce message HL7 mais l'admission échoue.
Peux-tu identifier le problème ?
MSH|^~\&|APP|FAC|..."
```

L'agent va :
1. Parser le message avec `hl7-pam-parser`
2. Valider contre IHE PAM 2.10
3. Identifier les champs manquants/incorrects
4. Suggérer les corrections

### 3. Documenter des flux d'intégration

```
Prompt : "Génère une documentation pour ces messages d'intégration HPK :
1. Message patient
2. Message admission
3. Message sortie"
```

L'agent va :
1. Parser chaque message avec `hpk-parser`
2. Générer une documentation structurée
3. Expliquer les mappings de champs
4. Ajouter des exemples annotés

### 4. Comparer HPK et HL7

```
Prompt : "Compare ce message HPK avec son équivalent HL7 :
HPK : MV|M2|C|HEXAGONE|...
HL7 : MSH|^~\&|HEXAFLUX|..."
```

L'agent va :
1. Parser les deux messages
2. Identifier les correspondances de champs
3. Expliquer les différences
4. Documenter le mapping

## Workflows combinés

### Workflow 1 : Transformation HPK → HL7

```
Prompt : "J'ai ce message HPK d'admission :
MV|M2|C|HEXAGONE|20260122140000|USER001|PAT12345|VIS001|20260122140000|URGENCE|CHU|CARDIO|UF01|L001|DR001

Génère le message HL7 IHE PAM équivalent (ADT^A01)"
```

L'agent va :
1. Parser le HPK avec `hpk-parser`
2. Mapper les champs vers HL7
3. Générer le message ADT^A01 conforme
4. Valider avec `hl7-pam-parser`

### Workflow 2 : Validation croisée

```
Prompt : "Valide que ce message HL7 correspond bien au message HPK source :
HPK : ID|M1|C|...
HL7 : MSH|^~\&|..."
```

L'agent va :
1. Parser les deux messages
2. Comparer les données patient
3. Identifier les incohérences
4. Suggérer les corrections

### Workflow 3 : Génération de tests

```
Prompt : "Génère des cas de test pour valider notre transformation HPK→HL7 :
- Cas nominal
- Cas avec champs optionnels
- Cas d'erreur"
```

L'agent va :
1. Créer des messages HPK de test
2. Générer les messages HL7 attendus
3. Documenter les règles de validation
4. Créer les assertions de test

## Exemples pratiques

### Exemple 1 : Analyser un lot de messages

```
Prompt : "Analyse ces 3 messages et identifie le workflow patient :

Message 1 :
ID|M1|C|HEXAGONE|20260122120000|USER001|PAT12345|DUPONT|JEAN|19750315|M|...

Message 2 :
MV|M2|C|HEXAGONE|20260122140000|USER001|PAT12345|VIS001|20260122140000|URGENCE|CHU|CARDIO|...

Message 3 :
MV|M9|C|HEXAGONE|20260125180000|USER003|PAT12345|VIS001|20260125180000|DOMICILE||AMELIORE|..."
```

**Résultat attendu** :
```
Workflow patient identifié : Parcours complet d'hospitalisation

Étape 1 (22/01/2026 12:00) - Création dossier patient
- Message : ID|M1|C
- Patient : DUPONT JEAN (PAT12345), né 15/03/1975
- Action : Enregistrement des données démographiques

Étape 2 (22/01/2026 14:00) - Admission aux urgences
- Message : MV|M2|C
- Visite : VIS001
- Mode : URGENCE
- Service : CARDIO
- Action : Admission en hospitalisation

Étape 3 (25/01/2026 18:00) - Sortie d'hospitalisation
- Message : MV|M9|C
- Destination : DOMICILE
- État : AMELIORE
- Action : Fin du séjour, patient rentré à domicile

Durée du séjour : 3 jours
Statut final : Patient amélioré
```

### Exemple 2 : Créer un guide de mapping

```
Prompt : "Crée un guide de mapping complet entre HPK MV|M2 et HL7 ADT^A01
avec tous les champs et leurs correspondances"
```

**Résultat attendu** :
```
Guide de mapping : HPK MV|M2 → HL7 ADT^A01

Segments HL7 générés :
- MSH (Message Header)
- EVN (Event Type)
- PID (Patient Identification)
- PV1 (Patient Visit)

Correspondances de champs :

HPK → HL7
====================================

En-tête message :
MV|M2|C → MSH-9: ADT^A01^ADT_A01
[3] Emetteur → MSH-3: Sending Application
[4] Date → MSH-7: Date/Time of Message
[4] Date → EVN-2: Recorded Date/Time
C → EVN-1: A01 (Mode C=Création → Event A01=Admission)

Identification patient :
[6] IPP → PID-3: Patient Identifier
Nécessite données démographiques d'un message ID|M1 précédent pour :
- PID-5: Patient Name
- PID-7: Date of Birth
- PID-8: Sex

Visite patient :
[7] Numéro séjour → PV1-19: Visit Number
[8] Date/heure entrée → PV1-44: Admit Date/Time
[9] Mode d'entrée → PV1-4: Admission Type (URGENCE=E)
[10] Établissement → PV1-3.1: Point of Care
[11] Service → PV1-3.2: Room
[11] Service → PV1-10: Hospital Service
[12] Unité fonctionnelle → Commentaire dans message
[13] Lit → PV1-3.3: Bed
[14] Médecin → PV1-7: Attending Doctor
I (Inpatient) → PV1-2: Patient Class

Règles métier :
1. Mode C (Création) → Event A01 (Admission)
2. Mode M (Modification) → Event A08 (Update)
3. Mode D (Suppression) → Event A11 (Cancel Admit)
4. Mode entrée URGENCE → Admission Type E
5. Mode entrée MUTATION → Admission Type R
```

### Exemple 3 : Audit de conformité

```
Prompt : "Audite ces 10 messages HL7 et génère un rapport de conformité IHE PAM 2.10"
```

**Résultat attendu** :
```
Rapport d'audit IHE PAM 2.10
Date : 22/01/2026

Résumé :
- Messages audités : 10
- Conformes : 7 (70%)
- Non conformes : 3 (30%)

Détails des non-conformités :

Message MSG003 (ADT^A01) :
✗ Segment EVN manquant
✗ PV1-19 (Visit Number) vide
Criticité : HAUTE

Message MSG007 (ADT^A02) :
✗ PV2-1 (Prior Location) manquant pour transfert
Criticité : MOYENNE

Message MSG009 (ADT^A03) :
✗ PV1-45 (Discharge DateTime) format incorrect
Criticité : HAUTE

Recommandations :
1. Implémenter validation systématique du segment EVN
2. Générer automatiquement les Visit Numbers
3. Valider les formats de dates (YYYYMMDDHHmmss)
4. Pour les transferts (A02), toujours inclure PV2-1

Taux de conformité cible : 100%
Actions correctives : 3 messages à corriger
```

## Dépannage

### Problème : Message non reconnu

**Symptôme** : L'agent ne sait pas quel skill utiliser

**Solution** :
```
Prompt : "Utilise hpk-parser pour analyser ce message :
[votre message]"
```

ou

```
Prompt : "Utilise hl7-pam-parser pour analyser ce message :
[votre message]"
```

### Problème : Parsing incomplet

**Symptôme** : Certains champs ne sont pas extraits

**Solution** : Demandez une analyse détaillée
```
Prompt : "Parse ce message champ par champ avec toutes les positions :
[votre message]"
```

### Problème : Validation échoue

**Symptôme** : Le message est déclaré invalide mais vous pensez qu'il est correct

**Solution** : Demandez la spécification exacte
```
Prompt : "Selon quelle spécification ce message est-il invalide ?
Cite les références IHE PAM 2.10 exactes"
```

### Problème : Format de date incorrect

**Symptôme** : Erreur sur les dates

**Solution** : Vérifiez les formats
- HPK : YYYYMMDDHHmmss (14 caractères)
- HL7 : YYYYMMDDHHmmss ou YYYYMMDD (selon le champ)

### Problème : Délimiteurs mal interprétés

**Symptôme** : Les champs sont mal séparés

**Solution HPK** :
```
HPK utilise uniquement | (pipe)
Pas de ^ ni de ~ dans HPK standard
```

**Solution HL7** :
```
HL7 v2.5 utilise :
| = champs
^ = composants
~ = répétitions
\ = échappement
& = sous-composants
```

## Support et Ressources

### Documentation de référence

- [HPK Parser Documentation](hpk-parser.md)
- [HL7 PAM Parser Documentation](hl7-pam-parser.md)
- [IHE PAM 2.10 Specification](https://github.com/Interop-Sante/ihe.iti.pam.fr)
- [HL7 v2.5 Standard](http://www.hl7.eu/HL7v2x/v25/std25/ch02.html)

### Exemples de fixtures

Les fixtures de test sont disponibles dans :
- `skills/hpk-parser/fixtures/` - Exemples HPK
- `skills/hl7-pam-parser/fixtures/adt/` - Exemples HL7 ADT

### Obtenir de l'aide

Pour des questions ou problèmes :
1. Consultez d'abord les fixtures d'exemples
2. Vérifiez la documentation de référence
3. Ouvrez une issue GitHub si le problème persiste

## Bonnes pratiques

### 1. Soyez spécifique sur le format

❌ "Parse ce message"
✅ "Utilise hpk-parser pour ce message HPK"

### 2. Fournissez le message complet

❌ "Parse MV|M2|C|..."
✅ "Parse MV|M2|C|HEXAGONE|20260122140000|USER001|PAT12345|VIS001|..."

### 3. Demandez la validation

✅ "Parse et valide contre IHE PAM 2.10"
✅ "Parse et identifie les champs manquants"

### 4. Documentez le contexte

✅ "Ce message vient de notre système HPK Hexaflux
et doit être transformé en HL7 pour l'interopérabilité"

### 5. Utilisez les exemples comme référence

✅ "Parse ce message comme dans l'exemple a01_admission.json"
