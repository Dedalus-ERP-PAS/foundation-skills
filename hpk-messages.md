Agfa HealthCare Enterprise Solutions - S.A. au capital de 10 135 567,70 euros - Siret N° 414 599 00028 - R.C.S. Bordeaux 414 599 589 B – APE 722 C
Siège Social : 4 avenue de l'Église Romane - 33 370 Artigues–prés-Bordeaux – Tél. : +33 5 56 38 58 58 – Fax : +33 5 56 38 52 06

Recherche et développement
HIS- Noyau.s
Service Echange

Référence Messages HPK.docx © p. 2 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Maîtrise du document
Rédacteurs Fonctions
P. LAUNAY Responsable Unité de développement^

Date de création Date de mise à jour
27/08/1999 22/01/

Date Opérations et commentaires Révision Diffusion
1.0 27/08/99 P. Launay: Création (^) (^)
1.1 15/09/99 C. Madrid: Modification (^)
2.1 27/09/99 P. Launay: Prise en compte des messages utilisateurs (^)
2.2 27/09/99 C. Madrid: Modification (individu) (^)
2.3 11/10/99 P. Launay: Spécification des structures de données (^)
2.4 12/10/99 P. Launay: Spécification des Services et modification des
règles de nommage des entités (^)
3.1 13/10/99 P. Launay: Ajout des tables d'administration des
évènements (^)
3.2 26/10/99 P. Launay: Aojut de nouveaux champs dans les
descriptifs de table (^)
4.1 29/11/99 P. Launay: Ajout des demandes d'examens (^)
4.2 25/05/00 P. Launay: Ajout des minutes de naissance au message
ID, MA (Page 15) (^)
5.0 25/10/00 R. Gill: Mise à jour pour Hexagone v7 b. (^)
5.2 22/05/01 P. Launay : Ajout des messages d'actes en NGAP et en
CDAM (^)
6.1 04/01/02 P. Launay : Modification de messages et ajout de
messages (ID M1 page 15, IY M1, page 17, MV M2 page
19, MV M3 page 20, MV M6 page 22, MV M7 page 23,
MV M8 page 24 et MV M9 page 25) (^)
6.2 23/01/02 P. Launay : Modification du message IY page 17. (^)
6.3 24/01/02 R. Gill: Ajout de la description de table HNDGHL7, et de
la communication par IHE/HL (^)
6.4 25/01/02 R. Gill: Ajout du champ Uf précédente dans le message
M (^)
7.0 27/02/02 P.Launay : Ajout des messages UF (^)
7.1 29/04/02 P.Launay : Ajouts des messages Produits (^)
7.2 22/07/02 C. Madrid : Ajout dans le message M8 du motif de
l’absence (^)

Référence Messages HPK.docx © p. 3 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

7.3 25/10/02 I.Ravet : Modification des messages Utilisateurs (^)
7.4 13/11/02 P. Launay : Modification des messages Actes (^)
7.5 15/11/02 I.Ravet : Mise à jour des messages Utilisateurs v7.c (^)
7.6 28/11/
02
C. Alphand : Ajout des messages ST/EJ et ST/EG
(^)
7.7 02/01/03 P. Launay : Mise en page par domaine (^)
7.8 04/03/03 V. Amorin : Ajout n°Finess dans les messages UF (p20) (^)
7.9 15/04/03 JM Gio : Ajout identifiant cps et liste des uf et des finess
dans les messages création et modification Praticiens et
modification message suppression (^)
7.10 10/02/
04
C.Alphand : Nouveau message ID M
C.Alphand : Message ID M1 rajout sipprentot (^)
8.01 05/03/04 Mise a jour charte graphique, et Elite.S (^)
8.02 23/09/04 JP. Pereira : Messages Elite.S disponibles à partir de la
version D.
Ajout message PR M7, SO LI -Modifications messages PR
M0, PR M1, PR M3,PR M4, FO M3, CO CE, CO CL. (^)
8.03 14/04/

26/05/
C.Alphand : Message ID|M1 ajout des zones télécom
(D03), des autres adresses (D03), modification identité
protégée (D03.1)
Message CV ajout du type, numéro de dossier, zone
prévisionnel (D03)
A la fin du message ID|M1 (position 45) ajout de l’ipp du
patient à garder si c’est une fusion de patient sinon vide
(disponible en D04).
A la fin du message MV|M4 (position 10) ajout de F si
c’est une fusion de patient sinon vide (disponible en
D04). (^)
8.04 14/09/05 C.Alphand : Message ID|M1 ajout des zones (En D04) :
Cp du lieu de naissance, pays de naissance, VIP, Identité
à valider (^)
8.05 12/10/05 Philippe LAUNAY : Ajout des messages propres aux Box
Urgences.
(^)
8.06 02/01/06 C.Alphand : Ajout à la fin du message NO|PR (praticiens)
du nom et prénom (disponible en D03.7)
C.Alphand N.Gaillard : (disponible en D03.8)

nouveaux messages Structure (Bâtiment, Etage,
Pièce, Pièce/UF, Lit, Service)
ajout etab juridique à la fin du message ST|EG
C.Alphand (disponibles en D03.8) nouveau message
NO|ET (^)
8.07 11/01/06 X.DELOIRE : Ajout des messages de fin de séance et de
fin de venue (^)

Référence Messages HPK.docx © p. 4 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

9.00 02/03/06 C.Alphand (disponible en D03.9) :
Ajout message ST|B1 structure Box
Ajout type + étage dans le message ST|LI
Ajout type dans le message ST|UP
Modif message ID`M1 M lors d’une fusion
Modif message ID M1 ajout de l’AQS + modif pour les
pièces justifiants l’identité
Ajout message UF|U1 : type de séjour et type de pmsi
Message ID|M1 : les autres adresses d’un patient
sont séparées par ^ (suppression du retour chariot
pour séparées 2 adresses)
Nouveaux messages : Zones (ST|ZO), secteurs (ST|SC)
- Modification du message CV|M^
10.00 13/06/06 XDeloire (disponible en D03.10) :
Ajout message MV|L1 Libération lits pour fin de
séances et venues
Ajout message MV|FX de fin de consultation
C.Alphand (disponible en D03.10)
Ajout dans le message ID M1 : identité usurpée,
ressortissant, niveau d’étude, pays des adresses au
format code iso, pays de naissances (format code iso)
Message ST|B1 : ajout Zone et secteur
Message NO|NA (nationalités) suppression du code
langue et longueur cp dans le message de création et
modification (ces données sont désormais à prendre
dans la table des pays)
- Nouveau message NO|PA : pays^
12/09/06 M. Dupont : Modification des messages UF U1 C et UF
U1 M concernant hxunite : secana sur 10 caractères au
lieu de 8.^
11.00 07/12/06 C.Alphand (disponible en D03.11)
Ajout dans le message ID M1 : heure de décès,
minute de décès, personnel hospitalier
Ajout dans le message ST|EJ : IBAN et BIC
Nouveau message ID|MT : Médecin traitant
Ajout message No|OR date de fin de validité +
nouveau code organisme^
11.00 07/02/07 Ajout de la date de sortie des urgences pour M
(D03.10.5)^
11.00 09/03/07 XD : Ajout du chrono du mode de placement dans les
messages IY. Ajout des anciens et nouveaux motif de
venue et UF dans les messages M3.^
12.00 31/01/08 CA (disponible en D03.12) :
ajout dans NO|ET (nomenclature statut du parcours) :
Origine de prescription et saisie médecin
- Message des praticiens (ajout civilité, Titre, RPPS)^
Référence Messages HPK.docx © p. 5 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

12.00 16/02/08 RG : Ajout Date de saisie d’origine sur le M3 pour
traiter un problème de re-génération.^
13.00 09/03/09 CA : Ajout RPSS dans le message ID|MT (^)
14.00 17/05/11 CA : Ajout INSC et CLEINSC dans le message ID|M (^)
07/11/11 CA : Nouveau message ID|CE (DMP) (^)
31/01/13 CA : Ajout date de fin de validité du praticien message

NO|PR^
02/05/13 CA : Ajout code insee message NO|PA (^)
05/02/14 RG : Ajout contexte de modification sur le MV|M (^)
31/11/16 CAL : Ajout IPP fédérateur (PATNUMREG) – Mess ID (^)
04/01/18 CAL : Ajout secteur et contrat pour le praticien – Mess

NO|PR^
04/05/18 CAL : Ajout NUMPASS et passage sur message MV (^)
04/09/18 CAL : Ajout DOSNUMA sur message MV (^)
12/04/19 CAL : Ajout NIR assuré, Date de naissance bénéficiaire,
rand de naissance bénéficiaire, et quantité du

bénéficiaire sur message ID|CE^
09/04/20 CAL : Ajout NIR bénéficiaire sur message ID|CE (^)
15.00 14/09/22 PGR : Messages ressources humaines (^)

Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,
Référence Messages HPK.docx © p. 6 /
MAITRISE DU DOCUMENT SSSooommmmmmaaaiiirrreee
SERVICE ECHANGE
INTRODUCTION ET PRESENTATION DU DOCUMENT
➢ Généralités
TERMINOLOGIE
➢ Composants
➢ Propriétés
MECANISME DE COMMUNICATION
➢ Fonctionnement
Processus de communication
Schéma de communication :
Format des messages :
Normes à respecter lors de la constitution de messages :
Description des fonctions du service échange :
MESSAGES RESSOURCES HUMAINES
➢ Bulletins de salaire
Mise au coffre-fort Digiposte d’un bulletin de salaire
MESSAGES STRUCTURES ET NOMENCLATURES
➢ Nomenclature : Utilisateur
Création d'un Utilisateur
Modification d'un Utilisateur
Suppression d'un Utilisateur
➢ Structure : Etablissement juridique
Création ou modification d’un établissement juridique
Suppression d’un établissement juridique
➢ Structure : Etablissements géographiques
Création d’un établissement géographique
Modification d’un établissement géographique
Suppression d’un établissement géographique
➢ Structure : Bâtiment
Création d'un bâtiment
Modification d'un bâtiment
Suppression d'un bâtiment
➢ Structure : Etage
Création d'un étage
Modification d'un étage
Suppression d'un étage
➢ Structure : Pièces
Création d'une pièce
Modification d'une pièce
Suppression d'une pièce
➢ Structure : Pièces/UF
Création d'un lien Pièce/UF
Référence Messages HPK.docx © p. 7 /
- Modification d'un lien Pièce/UF Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,
- Suppression Pièces/UF
➢ Structure : Lit
Création d'un lit
Modification d'un lit
Suppression d'un lit
➢ Structure Box
➢ Structure Zone
➢ Structure Secteur
➢ Structure : Services
Création d'un service
Modification d'un service
Suppression d'un service
➢ Structure : Unités fonctionnelles
Création d'une Unité fonctionnelle (UF)
Modification d'une Unité fonctionnelle (UF)
Mise hors service d'une Unité fonctionnelle (UF)
➢ Structure : Centres de responsabilité
Création d’un centre de responsabilité
Modification d’un centre de responsabilité
Mise hors service d’un centre de responsabilité
➢ Nomenclature : Civilités
Création d’une civilité
Modification d’une civilité
Mise hors service d’une civilité
Mise hors service d’une version
➢ Nomenclature : Situations Familiales
Création d’une situation familiale
Modification d’une situation familiale
Mise hors service d’une situation familiale
Mise hors service d’une version
➢ Nomenclature : Nationalité
Création d’une nationalité
Modification d’une nationalité
Mise hors service d’une nationalité
Mise hors service d’une version
➢ Nomenclature : Pays
Création d’un pays
Modification d’un pays
Mise hors service d’un pays
Mise hors service d’une version
➢ Nomenclature : Spécialités Médicales
Création d’une spécialité médicale
Modification d’une spécialité médicale
Mise hors service d’une spécialité médicale......................................................................................
Mise hors service d’une version de spécialités médicales
➢ Nomenclature : Langues Maternelles
Référence Messages HPK.docx © p. 8 /
- Création d’une langue maternelle Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,
- Modification d’une langue maternelle
- Mise hors service d’une langue maternelle
- Mise hors service d’une version de langue maternelle
- ➢ Nomenclature : Pièces justificatives
- Création d’une pièce justificative
- Modification d’une pièce justificative
- Mise hors service d’une pièce justificative
- Mise hors service d’une version des pièces justificatives....................................................................
- ➢ Nomenclature : Catégories Socioprofessionnelles
- Création d’une catégorie socioprofessionnelle
- Modification d’une catégorie socioprofessionnelle
- Mise hors service d’une catégorie socioprofessionnelle
- Mise hors service d’une version des catégories socioprofessionnelles
- ➢ Nomenclature : Situations Professionnelles
- Création d’une situation professionnelle
- Modification d’une situation professionnelle
- Mise hors service d’une situation professionnelle
- Mise hors service d’une version des situations professionnelles
- ➢ Nomenclature : Statuts de parcours
- Création d’un statut de parcours
- Modification d’un statut de parcours
- Mise hors service d’un statut de parcours
- Mise hors service d’une version des statuts de parcours
- ➢ Nomenclature : Praticiens
- Création d’un praticien
- Modification d’un praticien
- Suppression d’un praticien
- ➢ Nomenclature : Organismes
- Création d’un organisme
- Modification d’un organisme
- Suppression d’un organisme
- ➢ Nomenclature : Gestion des contrats
- Création d’un contrat
- Modification d’un contrat
- Suppression d’un contrat
- ➢ Nomenclature : Produits
- Création d’un Produit :
- ▪ Modification sur produit
- ▪ Suppression d'un produit
- ➢ Nomenclature : Fournisseurs :
- ▪ Création / Modification / Suppression d'un fournisseur
- ▪ Modification Fournisseurs
- ▪ Suppression fournisseur :
- ➢ Nomenclature : Liens Produits / Fournisseurs :
- Création / Modification / Suppression d'un lien
MESSAGES PATIENT
Référence Messages HPK.docx © p. 9 /
- ➢ Serveur d'Identité, Mouvements, Actes : Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,
- Création / Modification / Suppression d'Identité Patient (ID M1)
- Création / Modification / Suppression d’un médecin traitant d’un patient (ID MT)
- Création / Modification du consentement éclairé d’un patient (ID CE)
- MPI (ID M5)
- Message M1 IY : descriptions des informations psy (Nouveau message version c.06)
- Admission d'un Patient (M2)
- Changement de Statut du Séjour (M3)
- Changement de Rattachement du Séjour (M4)
- Entrée du Patient dans l'Unité de Soins (M6)
- Changement des Conditions de Séjour du Patient (M7)
- Sortie du Patient de l'Unité de Soins (M8)
- Sortie du Patient de l'Hôpital (M9)
- Couverture d’un patient (CV|M1)
- Libération de lit pour les séances (MV|L1)
- Libération de lit pour les venues (MV|L1)
- ➢
- Libération de fin de consultation externe (MV|FX)
- ➢ Messages mouvements d’urgence
- Mouvements de box B1
- ➢ Mouvements temporaires aux urgences MT
- Message M6 (Arrivée dans un emplacement temporaire)
- Message M8 (sortie d’un emplacement temporaire)
- ➢ Actes
- Message d’envoi de la codification NGAP (Actes)
- Messages d’envoi de la codification CDAM (Actes)
- ➢ Examens
- Demande d'Examen (A1)
MESSAGES RESSOURCES ECONOMIQUES ET FINANCIERES.............................................................................
➢ Marchés :
Création d’un marché dans ELITE.S
▪ Transmission des consommations des produits
➢ Marchés validés dans ELITE.S:
Création d’un marché
▪ Modification de Marché
▪ Suppression De Marché :
➢ Demandes d’approvisionnements :
Création d’une demande
➢ Commandes :
Création d’une commande
▪ Modification de Commande
▪ Suppression de Commande :
➢ Livraisons provenant de l’extérieur :
Création d’une livraison externe.....................................................................................................
▪ Modification de lignes de Livraison.........................................................................................
➢ Réceptions :
Création d’une réception
Référence Messages HPK.docx © p. 10 /
- ▪ Modification de Réception Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,
- ▪ Suppression de Réception :
- ➢ Factures Externes :
- Création d’une facture externe.......................................................................................................
- ➢ Mouvements de stocks internes:
- Création d’un Mouvement de stock interne
- ▪ Envoi des liste pré établies
- ➢ Recettes diverses:
- Création d’un Mouvement de recettes diverses
- ➢ Inventaires pour les biens immobilisés:
- Création d’un Mouvement d’inventaire
EXEMPLES D’EVENEMENTS ET MESSAGES ASSOCIES :
- Arrivée aux urgences :
- Hospitalisation suite urgence :
- Confirmation de suite hospitalisation :
- Consultation externe suite urgence :
- Confirmation de suite consultation :
- Autres suites urgence
- Entrée directe
- Mutation après une entrée directe
- Mutation insérée entre deux mouvements
- Sortie définitive
- Pré admission
- Confirmation d’une pré admission
- Nouveau né hospitalisé :
- Changement de chambre :
- Suppression d’un dossier :
- Suppression d’un patient avec n dossiers
- Fusion de deux patients
➢ Admission aux urgences
Arrivée aux urgences sans localisation
Arrivée aux urgences et mis en salle d’attente
Arrivée aux urgences et mise en box
➢ Mouvements possibles aux urgences
Passage d’un BOX vers la radio
Changement de box
Retour au box suite à une radio
Passage de salle d’attente vers la radio
Passage de la radio vers le scanner
Le patient est dans un box suite Hospitalisation ou consultation externe
Le patient est dans un box il est hospitalisé en lit porte mais reste dans le box
CAS PARTICULIERS DE DEMANDES FAITES AUX SERVEURS
➢ Serveur d'Identité
➢ Serveur d'Actes
SPECIFICATIONS DU SERVICE ECHANGE
➢ Schéma Fonctionnel
➢ Spécificités Fonctionnelles
Référence Messages HPK.docx © p. 11 /
- Structure de l’accusé de réception Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,
- Informations à répercuter vers les autres applications......................................................................
- Structure des tables du Service Echange
➢ Composants Externes
Service de demande de création d'IPP.
Référence Messages HPK.docx © p. 12 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

SERVICE ECHANGE
INTRODUCTION ET PRESENTATION DU DOCUMENT
➢ Généralités
Ce document est destiné à toutes les personnes chargées du développement et de l'intégration des
procédures de communication entre le S.I.H. HEXAGONE et toute application communicante, autour
des serveurs d'accréditation, de mouvements, d'identité, et d'actes.
L'objectif est de décrire le fonctionnement du Service Echange, les structures utilisées pour ce
service, son implantation, ses fonctionnalités, ainsi que la liste des messages véhiculés à ce jour.

L’écriture initiale du document fait suite à l'analyse des besoins exprimés par les sites quant à la
communication des diverses applications, notamment le C.H. Région Annecienne.
Ce document est transmis aux sociétés désirant utiliser les messages pour assurer l'intégrité des
informations dans le cadre du S.I.H..
Le document est découpé en deux grandes parties :

Le descriptif du Service Echange.
La liste des messages gérés à ce jour.
TERMINOLOGIE
➢ Composants
La communication entre les diverses applications s'appuie sur l'utilisation de divers types de
composants, répartis comme suit :
Procédure C UNIX Ces procédures permettent un déclenchement sur des serveurs
de type UNIX.
Dll / Com / DCom Ces fichiers contiennent des fonctions ou objets qui sont appelés
uniquement dans un environnement WINDOWS.
Procédure stockée Il s'agit d'une procédure ORACLE , compilée dans la base de
données et activée avec les paramètres adéquats.
Exécutable / Script shell Fichiers exécutables dans un environnement WINDOWS , ou
fichiers de script shell dans un environnement UNIX , avec passage
de paramètres.
Fichier Texte Il s'agit de fichiers plats générés par les applications. Ce type est
celui de plus bas niveau et ne permet pas de faire de la
communication en temps réel.
Fichiers IHE/HL7 La communication peut se faire par fichiers texte ou directement
par ports réseaux, avec le standard HL7 en suivant les
préconisations IHE.

Référence Messages HPK.docx © p. 13 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Propriétés
Les divers composants utilisés pour la communication sont activés comme décrit par le document,
par le Service Echange. Ils sont fournis par la société destinatrice, en respectant les normes des
messages, ceci afin de permettre à chaque société de dialoguer sur une même base tout en gardant
le respect des données privées de chaque application.

Le Service Echange activera les composants destinataires, mais en aucun cas mettra à jour ou inscrira
des données dans les bases de données des diverses applications.

MECANISME DE COMMUNICATION
➢ Fonctionnement
Chaque événement concernant un utilisateur pour le serveur d'accréditation ou d'un patient pour les
serveurs d'identité, de mouvement ou d'acte est enregistré dans la base de données HEXAGONE, et
génère un message dans la base ORACLE HEXAGONE.

Ce message est pris en charge par le Service Echange qui a en charge l'envoi de ce message aux
autres applications (celles qui seront référencées dans le Service Echange). Ce service se charge
suivant le message envoyé d'activer le composant qui nous sera fourni pour chacune des applications
et qui sera en mesure de comprendre et de traiter ce message.

Chaque application reçoit le message et renvoie un accusé de réception au Service Echange. Cette
information servira en cas d'interruption de la communication pour savoir quels sont les messages
qui n'ont jamais été reçus et le cas échéant de les renvoyer.

Processus de communication
Il existe deux type de processus :

L'envoi de messages liés à des évènements détectés dans la base HEXAGONE.
Dans ce cas de figure, l'évènement détecté active le Service Echange, pour la prise en charge du
message. Ce dernier renvoie un accusé de réception pour indiquer la prise en charge et laisse
l'application continuer.
Un processus permanent sur le serveur scrute en permanence les messages stockés par le
Service Echange. Pour chaque message détecté, la liste des messages par destinataire est créée
en prenant en compte le composant de communication. Un processus par destinataire est
chargé de gérer l'expédition pour chaque destinataire, ceci permettant de limiter le temps de
communication pour chaque application au temps d'exécution du composant de cette même
application.
Le composant appelé renvoie ou non un accusé de réception suivant ces fonctionnalités propres.
Les messages sont mis en historiques et épurés en fonction du paramétrage du Service Echange.
De même, en cas de non réponse des composants externes, la communication sera
automatiquement interrompue après un nombre de tentatives paramétré, et le ou les
administrateurs sont prévenus par courrier électronique.
Référence Messages HPK.docx © p. 14 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,
Il est aussi possible de planifier des arrêts de la communication pour la maintenance, ou de faire
des arrêts immédiats.
Les demandes de création des applications externes.
La demande est prise en compte en mode synchrone, et l'information de type IPP est retourné
en temps réel. L'application HEXAGONE génère des évènements et les gère selon le principe
évoqué ci-dessus, mais en gérant un niveau de priorité maximal pour ce type de message.
Schéma de communication :
HexagoneHexagone
ServiceServiceEchangeEchange
Base de
données
Hexagone
Base de
données
Hexagone
Applications ExtérieuresApplications Extérieures
Processus par
application
Légende :

: Activation de la demande de création d'IPP.
: Accusé de réception de la demande de création d'IPP.
: Message Hexagone.
: Accusé de réception du message.
: Stockage du message dans la table des messages du Service Echange.
: Stockage de l'accusé de réception dans la tables des messages du Service Echange.
: Demande de création d'IPP.
: Activation du composant de l'application extérieure pour traitement du message.
: Accusé de réception de l'application Extérieure.
: Accusé de réception de la demande de création de l'IPP.

Référence Messages HPK.docx © p. 15 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Référence Messages HPK.docx © p. 16 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Format des messages :
Rubrique Long. Format Oblig. Commentaires
Type 2 S O UT = Utilisateur
AC = Accréditation
ID = Identification patient
MV = Mouvements patients
KA = Actes patients
Message 2 S O Ce message sera fonction du type de
message. Dans la documentation vous
trouverez le détail des messages ID et MV.
Mode 1 S O Création, Modification, Suppression, Lecture.
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
nn, est un chrono permettant d’identifier des
messages émis dans la même seconde.
Individu 50 S O Individu au sens S3A qui a généré le message.
Le reste est fonction du message vous trouverez le détail des messages MV et ID.

Normes à respecter lors de la constitution de messages :
Il faut impérativement que la partie constante du message (c’est à dire les 6 premières zones) soit en
MAJUSCULES.
Le caractère séparateur des zones est le “ | ” (pipe). Les longueurs indiquées sont des longueurs
maximales. Si le nom du patient est sur 10 caractères on aura :
|NOMPATIENT|
Quand une information n’est pas connue on met le “ | ” séparateur de champ sans aucune
information. Par exemple, si la date de naissance n’est pas connue on aura :

...|IPP_ATIENT|NOM|PRENOM|||D|Mr|...
Des champs peuvent être rajoutés par Symphonie On Line à la fin des
messages, sans gêner la communication. Les applications destinataires
ne doivent donc pas se baser sur le nombre de champs dans le
message, mais uniquement sur les champs connus.
A t t e n t i o n
Référence Messages HPK.docx © p. 17 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Description des fonctions du service échange :
ENVOI :
Cette fonction traite les messages en provenance d’HEXAGONE et à destination des applications
externes. Elle stocke le message reçu dans la table des messages en attente et envoie un accusé
de réception à HEXAGONE
RECEPTION :
Cette fonction traite les messages en provenance des applications externes et à destination
d’HEXAGONE. Elle stocke le message reçu dans la table des messages en attente et envoie un
accusé de réception à l’application externe expéditrice, avec les informations clés nécessaire (N°
IPP, par exemple).
ACCUSE DE RECEPTION :
Cet accusé de réception du Service Echange consiste en trois paramètres.
Prend les valeurs :
0 Reçu et pris en charge par le Service Echange.
1 Nombre de paramètres envoyés dans le message incorrects.
2 Problème lors du stockage dans la base.
50 Problème mais demande de ré-envoi
Statut
Contexte de l’erreur survenue dans le Service Echange. Cette erreur pourra ou non être
traitée par l’application qui a envoyé le message. Dans tous les cas, un fichier texte (d'extension
.log) sera alimenté lors de la détection d’une erreur par le Service Echange.
MOTEUR DE GESTION DES MESSAGES :
Cette fonction consiste en une application autonome qui tourne en permanence, qui scrute la
table des messages en attente dans l’ordre chronologique d’émission, qui génère par
destinataire les messages choisis, et qui active le composant sachant analyser et intégrer le
message. Ensuite il supprime ou tope “à traiter” (suivant paramétrage) les messages dans la
table des messages en attente.
Le moteur essaiera de traiter toutes les demandes qu’il recevra. Dans le cas où il ne pourrait
pas lancer le composant paramétré comme destinataire, le message sera laissé en attente, ou la
communication sera désactivée suivant le paramétrage. Quand le Service Echange devra
renvoyer un autre message à ce destinataire il renverra tous les messages antérieurs en attente
(dont ceux qui n’auront pu être traités) afin d’assurer l’intégrité de la chronologie.
Exemple : il ne faut pas qu’une application reçoive un message M6 d’entrée dans une unité de
soin si le message M1 de création du patient n’a pu être traité par cette même application.
Dans le cas d'envoi d'informations au Service Echange (retour), il n’est pas nécessaire d’avoir
le composant du destinataire sur tous les postes. Par contre, il peut être intéressant, pour des
questions de performance de faire tourner ce composant sur plusieurs postes différents. Ceci est
vrai dans le cas où les composants appelés ne fonctionnent que dans un environnement
Windows. Si ce n'est pas le cas, les composants sont directement activés depuis le serveur.
Le run-time HEXAGONE doit être déployé sur tous les postes des applications communicantes
s’il n’y a pas de poste dédié à la communication. Et aux seuls postes faisant des demandes au
serveur dans le cas contraire.
Référence Messages HPK.docx © p. 18 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

MESSAGES RESSOURCES HUMAINES
➢ Bulletins de salaire
Mise au coffre-fort Digiposte d’un bulletin de salaire
Ce message est envoyé lorsqu’un bulletin est archivé à la clôture mensuelle de la paie.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
RH = Ressources humaine.
Code 2 S O BS (Bulletin de salaire)
Mode 1 S O (C) création
Emetteur 15 S O HEXAGONE
Poste 20 S O Poste de travail ou ip
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISS
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Metadata 255 S N
Message
ARCHID 20 S O AGENTDOC
ARCHETAT 1 S O O
ARCHV1 100 S O Matricule de l’agent
ARCHV2 100 S O BULLETIN
ARCHV5 100 S O Année bulletin (YYYY)
ARCHV6 100 S O Mois bulletin [1-12]

Référence Messages HPK.docx © p. 19 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

MESSAGES STRUCTURES ET NOMENCLATURES
➢ Nomenclature : Utilisateur
Création d'un Utilisateur
Ce message est envoyé dès qu’un nouvel utilisateur est créé dans le S.I.H. HEXAGONE.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
UT = Identification.
Message 2 S O A
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Id Personne 20 S N Numéro Identifiant personne (Unique)
Code Utilisateur
(Individu créé)

50 S O Code Utilisateur (Unique)
Mot de passe 50 S O Mot de passe de l'utilisateur.
Attention :
Le code utilisateur est transmis en clair pour
permettre à chaque destinataire d'utiliser sa
procédure de cryptage privée. Par contre les
messages stockés, le sont avec le mot de
passe crypté.
Libellé complet 50 S N Libellé complet de l'utilisateur.
Libellé court 25 S N Libellé court de l'utilisateur.
Durée de validité
du mot de passe

3 N O Durée de vie du mot de passe de l'utilisateur.
La valeur est à 999 pour un mot de passe qui
n'expire jamais.
Adresse
Electronique

50 S N Adresse E-mail de l'utilisateur
Type 1 S O U Utilisateur
P Profil
Profil 50 S N Renseigné que si l’utilisateur appartient à un
profil
Date de fin de
validité d’un
utilisateur

10 Date N Date de fin de validité d’un utilisateur.
Format YYYYMMDD
Activé ou
désactivé

1 S N La connexion à l’application peut-être
désactivée temporairement.
Matricule 10 S N Matricule de l'utilisateur (Ref : agent)
ID CPS 50 S N Identifiant CPS

Référence Messages HPK.docx © p. 20 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d'un Utilisateur
Ce message est envoyé dès qu’une information de l'utilisateur est modifiée (libellé, mot de passe,
adresse E-mail, etc..)

Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
UT = Identification.
Message 2 S O A
Mode 1 S O Modification
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Id Personne 20 S N Numéro Identifiant personne (Unique)
Code Utilisateur
(individu modifié)

50 S O Code Utilisateur (Unique)l
Mot de passe 50 S O Mot de passe de l'utilisateur.
Attention :
Le code utilisateur est transmis en clair pour
permettre à chaque destinataire d'utiliser sa
procédure de cryptage privée. Par contre les
messages stockés, le sont avec le mot de
passe crypté.
Libellé complet 50 S N Libellé complet de l'utilisateur.
Libellé court 25 S N Libellé court de l'utilisateur.
Durée de validité
du mot de passe

3 N O Durée de validitéie du mot de passe de
l'utilisateur. La valeur est à 999 pour un mot
de passe qui n'expire jamais.
Adresse
Electronique

50 S N Adresse E-mail de l'utilisateur
Type 1 S O U Utilisateur
P Profil
Profil 50 S N Renseigné que si l’utilisateur appartient à un
profil
Date de fin de
validité d’un
utilisateur

10 Date N Date de fin de validité d’un utilisateur.
Format YYYYMMDD
Activé ou
désactivé

1 S N La connexion à l’application peut-être
désactivée temporairement.
Matricule 10 S N Matricule de l'utilisateur (Ref : agent)
ID CPS 50 S N Identifiant CPS

Référence Messages HPK.docx © p. 21 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d'un Utilisateur
Ce message est envoyé dès qu'un individu HEXAGONE est supprimé.

Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
UT = Identification.
Message 2 S O A1
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Id Personne 20 S N Numéro Identifiant personne (Unique)
Code Utilisateur
(individu
supprimé)

50 S O Code Utilisateur (Unique)l
Référence Messages HPK.docx © p. 22 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Etablissement juridique
L’établissement juridique est émis à la première mise a jour en création (ou en synchronisation de
démarrage). Ensuite, il n’y a que des messages de modifications.

Création ou modification d’un établissement juridique
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structures.
Message 2 S O EJ (Etablissement Juridique)
Mode 1 S O C(création) ou M (modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
établissement

3 N O Numéro identifiant l’établissement juridique
Libelle 50 S N Libelle de l’établissement
Adresse 1 32 S N Adresse 1 de l’établissement
Adresse 2 32 S N Adresse 2 de l’établissement
Ville 32 S N
Code postal 5 N N Code postal de l’établissement
Bureau
distributeur

27 S N
Cedex 10 S N Code cedex de l’établissement
Département 3 S N Code département INSEE de l’établissement
Commune 3 S N Code commune INSEE de l’établissement
Région 3 S N Code région INSEE de l’établissement
Comptable
assignataire

50 S N Nom du comptable assignataire de
l’établissement (Mr Le Receveur, M. Le
trésorier, M. Le comptable en chef etc.)
Compte CCP 11 S N N° du compte de l’établissement postal.
Agence 24 S N Nom de l’agence
FINESS 9 N N N° FINESS de l’établissement
SIREN 9 S N N° SIREN de l’établissement
APE 4 S N Code APE
Catégorie 3 S N Catégorie d’établissement
Statut juridique 2 S N

PSIH 1 S N (^1) pour les PSIH
2 pour les PSPH
3 pour les Centres de santé
4 pour les Cliniques
PSPH 1 S N (Réservé)

Référence Messages HPK.docx © p. 23 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Secteur Sanitaire 3 S N
INSEE 5 S N
Horaire de
référence

10.2 N N Nombres d’heures de références
Code URSSAF 4 S N
Adresse 1 URSSAF 32 S N
Adresse 2 URSSAF 32 S N
Code postal
URSSAF

5 N N
Ville URSSAF 32 S N
Bureau
distributeur
URSSAF

27 S N
Code banque 5 N N
Code guichet 5 N N
Clé RIB 2 N N
Telephone 16 S N N° de téléphone de l’établissement
Télex 16 S N N° de télex de l’établissement
Fax 16 S N N° de Fax de l’établissement
E-mail 50 S N Adresse E-mail de l’établissement (Ex :
info@etablissement.fr)
Site web 50 S N Adresse de site web (URL)
Date de mise en
oeuvre

8 D N YYYYMMDD
IBAN 32 S N IBAN = International Bank Account Number
BIC 11 S N BIC = Bank Identifier Code

Suppression d’un établissement juridique
Il n’existe pas de message de suppression d’un établissement juridique. Il ne peut y avoir qu’un seul
établissement juridique, créé une fois, et ensuite uniquement modifié.

Référence Messages HPK.docx © p. 24 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Etablissements géographiques
Création d’un établissement géographique
Ce message est envoyé lors de la création d’un établissement géographique.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structures.
Message 2 S O EG (Etablissement géographique)
Mode 1 S O C (création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
établissement
géographique

2 N O
Libelle
établissement
géographique

50 S N
Adresse 1 32 S N Adresse 1 de l’établissement géographique
Adresse 2 32 S N Adresse 2 de l’établissement géographique.
Ville 32 S N
Code postal 5 N N Code postal de l’établissement géographique
Bureau
distributeur

27 S N
FINESS 9 N N N° FINESS
SIRET 14 S N N° SIRET
Nombre de lits
ouverts

5 N N
Etablissement
complémentaire

1 S O T/F valeur booléenne
Budget global 1 S O T/F valeur booléenne, établissement au
budget global.
Date de début de
validité

8 D O YYYYMMDD
Date de fin de
validité

8 D N YYYYMMDD
Etablissement
juridique

3 N O Code établissement juridique
Référence Messages HPK.docx © p. 25 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d’un établissement géographique
Ce message est envoyé pour chaque modification d’un établissement géographique.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structures.
Message 2 S O EG (Etablissement géographique)
Mode 1 S O M (modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
établissement
géographique

2 N O
Libelle
établissement
géographique

50 S N
Adresse 1 32 S N Adresse 1 de l’établissement géographique
Adresse 2 32 S N Adresse 2 de l’établissement géographique.
Ville 32 S N
Code postal 5 N N Code postal de l’établissement géographique
Bureau
distributeur

27 S N
FINESS 9 N N N° FINESS
SIRET 14 S N N° SIRET
Nombre de lits
ouverts

5 N N
Etablissement
complémentaire

1 S O T/F valeur booléenne
Budget global 1 S O T/F valeur booléenne, établissement au
budget global.
Date de début de
validité

8 D O YYYYMMDD
Date de fin de
validité

8 D N YYYYMMDD
Etablissement
juridique

3 N O Code établissement juridique
Suppression d’un établissement géographique
Il n’existe pas de message de suppression d’établissement géographique. La mise hors service est
réalisée avec les dates de fin de validité.

Référence Messages HPK.docx © p. 26 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Bâtiment
Création d'un bâtiment
Ce message est émis à chaque création d’un nouveau bâtiment.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O BA
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Bâtiment 8 S O Code bâtiment
Nom de bâtiment 35 S N Nom du bâtiment
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Etablissement
juridique

3 N O Code établissement juridique
Modification d'un bâtiment
Ce message est émis à chaque modification d’un bâtiment.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O BA
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Bâtiment 8 S O Code bâtiment
Nom de bâtiment 35 S N Nom du bâtiment
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Etablissement
juridique

3 N O Code établissement juridique
Référence Messages HPK.docx © p. 27 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d'un bâtiment
Ce message est émis à chaque suppression d’un bâtiment.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O BA
Mode 1 S O S (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Bâtiment 8 S O Code bâtiment
Nom de bâtiment 35 S N Nom du bâtiment
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Etablissement
juridique

3 N O Code établissement juridique
Référence Messages HPK.docx © p. 28 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Etage
Création d'un étage
Ce message est émis à chaque création d’un nouvel étage.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O ET
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Etage 8 S O Etage
Nom de l’étage 35 S N Nom de l’étage
Bâtiment 8 S O Code bâtiment
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Modification d'un étage
Ce message est émis à chaque modification d’un étage.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O ET
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Etage 8 S O Etage
Nom de l’étage 35 S N Nom de l’étage
Bâtiment 8 S O Code bâtiment
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Référence Messages HPK.docx © p. 29 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d'un étage
Ce message est émis à chaque suppression d’un étage.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O ET
Mode 1 S O S (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Etage 8 S O Etage
Nom de l’étage 35 S N Nom de l’étage
Bâtiment 8 S O Code bâtiment
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Référence Messages HPK.docx © p. 30 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Pièces
Création d'une pièce
Ce message est émis à chaque création d’une nouvelle pièce.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O CH
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code pièce 6 S O Code pièce
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgences
Etage 8 S N Etage
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
NB lit 4 N N Nombre de lit

Référence Messages HPK.docx © p. 31 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d'une pièce
Ce message est émis à chaque modification d’une pièce
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O CH
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code pièce 6 S O Code pièce
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgences
Etage 8 S N Etage
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
NB lit 4 N N Nombre de lit

Référence Messages HPK.docx © p. 32 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d'une pièce
Ce message est émis à chaque suppression d’une pièce.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O CH
Mode 1 S O S (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code pièce 6 S O Code pièce
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgences
Etage 8 S N Etage
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
NB lit 4 N N Nombre de lit

Référence Messages HPK.docx © p. 33 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Pièces/UF
Création d'un lien Pièce/UF
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O UP
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code pièce 6 S O Code pièce
Etage 8 S N Etage
Exercice 4 N N Exercice
**Liste d’UF *** S N Liste d’UF séparées par des ~ (Ex : 2203~2204)
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgence Box

Référence Messages HPK.docx © p. 34 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d'un lien Pièce/UF
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O UP
Mode 1 S O M (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code pièce 6 S O Code pièce
Etage 8 S N Etage
Exercice 4 N N Exercice
**Liste d’UF *** S N Liste d’UF séparées par des ~ (Ex : 2203~2204)
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgence Box

Référence Messages HPK.docx © p. 35 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression Pièces/UF
Ce message est émis à chaque fois qu’une pièce n’est plus rattachée à aucune UF.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O UP
Mode 1 S O S (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code pièce 6 S O Code pièce
Etage 8 S N Etage
Exercice 4 N N Exercice
**Liste d’UF *** S N = « «
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgence Box

Référence Messages HPK.docx © p. 36 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Lit
Création d'un lit
Ce message est émis à chaque création d’un nouveau lit.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O LI
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Lit 1 S O Lit
Chambre 6 S N Chambre
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
Etage 8 S N Etage
Téléphone 20 S N Téléphone
Lit sup 1 S N Lit supprimé O/N
Etage 8 S N Etage
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgence Box

Référence Messages HPK.docx © p. 37 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d'un lit
Ce message est émis à chaque modification d’un lit.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O LI
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Lit 1 S O Lit
Chambre 6 S N Chambre
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
Etage 8 S N Etage
Téléphone 20 S N Téléphone
Lit sup 1 S N Lit supprimé O/N
Etage 8 S N Etage
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgence Box

Référence Messages HPK.docx © p. 38 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d'un lit
Ce message est émis à chaque suppression d’un lit.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O LI
Mode 1 S O S (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Lit 1 S O Lit
Chambre 6 S N Chambre
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
Etage 8 S N Etage
Téléphone 20 S N Téléphone
Lit sup 1 S N Lit supprimé O/N
Etage 8 S N Etage
Type 1 S N Type : C = Chambre
T = en attente
S = Salle
B = Bureau
X = Examen
U = Urgence Box

Référence Messages HPK.docx © p. 39 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure Box
Ce message est envoyé lors d’une création, modification ou suppression d’un box.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O B1
Mode 1 S O C (création) ou M (modification) ou S (suppression)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Box 1 S O Box
Salle d’urgence 6 S N Salle d’urgence
Etablissement
juridique

3 N O Code établissement juridique
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché le
bâtiment
Bâtiment 8 S O Code bâtiment
Etage 8 S N Etage
Accueil illimité B Boolean N Accueil illimité
Nombre de
patient

3 N N Nombre de patient
Type de patient 1 S N Type de patient :

C (Consultant)
H (Hospitalisés)
T (Tous)
Zone 10 S N Zone à laquelle appartient le box
Secteur 10 S N Secteur auquel appartient le box
Référence Messages HPK.docx © p. 40 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure Zone
Ce message est envoyé lors d’une création, modification ou suppression d’une zone.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O ZO
Mode 1 S O C (création) ou M (modification) ou S (suppression)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Zone 10 S O Zone
Libellé long 30 S N Libellé long
Libellé court 15 S N Libellé court

➢ Structure Secteur
Ce message est envoyé lors d’une création, modification ou suppression d’un secteur.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O SC
Mode 1 S O C (création) ou M (modification) ou S (suppression)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Zone 10 S O Zone à laquelle est rattachée le secteur
Secteur 10 S O Secteur
Libellé 15 S N Libellé
Type 1 S N Type de secteur :
C = Chambre
P = Visualisation radio
U = Salle d’urgence
T = Attente
L = Localisation
Localisation 10 S N Localisation à renseigner uniquement si type = L

Référence Messages HPK.docx © p. 41 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Services
Création d'un service
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O SV
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Service 4 N O Service
Libellé long 35 S N Libellé long
Libellé court 20 S N Libellé court
Exercice 4 N N Exercice
Lettre budget 1 S N Lettre budget
Discipline
d'équipement

3 S O Discipline d'équipement
Type d'activité 2 S O Type d'activité
Nbre de lits
ouverts

5 N N Nbre de lits ouverts
Etablissement
juridique

3 N O Code établissement juridique
Modification d'un service
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O SV
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Service 4 N O Service
Libellé long 35 S N Libellé long
Libellé court 20 S N Libellé court
Exercice 4 N N Exercice
Lettre budget 1 S N Lettre budget
Discipline
d'équipement

3 S O Discipline d'équipement
Type d'activité 2 S O Type d'activité

Référence Messages HPK.docx © p. 42 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Nbre de lits
ouverts

5 N N Nbre de lits ouverts
Etablissement
juridique

3 N O Code établissement juridique
Référence Messages HPK.docx © p. 43 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d'un service
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
ST = Structure.
Message 2 S O SV
Mode 1 S O S (Suppression)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Service 4 N O Service
Libellé long 35 S N Libellé long
Libellé court 20 S N Libellé court
Exercice 4 N N Exercice
Lettre budget 1 S N Lettre budget
Discipline
d'équipement

3 S O Discipline d'équipement
Type d'activité 2 S O Type d'activité
Nbre de lits
ouverts

5 N N Nbre de lits ouverts
Etablissement
juridique

3 N O Code établissement juridique
Référence Messages HPK.docx © p. 44 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Unités fonctionnelles
Création d'une Unité fonctionnelle (UF)
Les unités fonctionnelles ne sont émises qu’après avoir été validées dans le S.I.H. Hexagone. Un
message de création d’Unité Fonctionnelle est émis lors du changement d’exercice toujours après
validation de ce nouvel exercice. A ce jour, ce message n’est disponible qu’en émission.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
UF = Unité fonctionnelle.
Message 2 S O U1
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable de validité de l’UF
UF 4 N O Code Unité fonctionnelle (Unique pour un exercice
comptable)
Libelle 30 S N Libellé de l’unité fonctionnelle.
Libellé court 15 S N Libellé court de l’unité fonctionnelle.
Lettre budget 1 S O Lettre correspondant au budget de l’unité
fonctionnelle.
Centre de
responsabilité

4 N O Centre de responsabilité auquel est rattaché l’UF.
Code magasin 1 S O UF magasin O Magasin principal
A Magasin Auxiliaire
N Non magasin.
Unité médicale 4 N N Unité médicale de rattachement si elle existe.
UF Médicale 1 S O UF médicale (oui ou Non)
Service Médical 4 N N S’il s’agit d’une UF médicale, alors le service
médical est renseigné dans cette zone.
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché
l’UF
Section d’analyse 10 S N Section analytique a objectif de comptabilité
analytique.
Type d’activité 2 S N Type d’activité de l’UF
Discipline
d’équipement

3 S N Code discipline d’équipement de l’UF
UF d’urgence 1 S O L’UF est une UF d’URGENCE (Oui Non)
Séjour consécutif 1 S O L’UF gère des séjours consécutifs (Oui Non)
Venue 1 S O L’UF gère des venue (Oui Non)
Séance 1 S O L’UF gère des séances (Oui Non)
Productrice
d’actes

1 S O L’UF produit des actes (Oui Non)
Prestation 1 S O L’UF produit des prestations Hôtelière (Oui Non).

Référence Messages HPK.docx © p. 45 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Hôtelière
Nombre de lits
ouverts

5 N N Nombre de lits ouverts pour cette UF.
N° Finess 9 N N N° finess

Type de séjour 1 N N (^1) : Séjour de courte durée (CS)
2 : Soins de suite (MS)
3 : Soins longue durée (LS/MR)
4 : Psychiatrie
5 : Externes
6 : Hospit de jour
7 : Hospit de nuit
8 : Séances
Type de PMSI 3 S N (^) Le type de PMSI est déduit du type de séjour.
Type séjour = 1,6,7,8 → MCO
=2 → SSR
= 4 → PSY
Pour le HAD : Si le type d’activité =06 on envoie
en type PMSI : HAD
Dans tous les autres cas on envoie la valeur nul.

Référence Messages HPK.docx © p. 46 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d'une Unité fonctionnelle (UF)
Ce message n’est disponible qu’en émission. Il sera émis a chaque modification d’une UF, et
uniquement si cette modification porte sur des UF validées dans le S.I.H. Hexagone v7.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
UF = Unité fonctionnelle.
Message 2 S O U1
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable de validité de l’UF
UF 4 N O Code Unité fonctionnelle (Unique pour un exercice
comptable)
Libelle 30 S N Libellé de l’unité fonctionnelle.
Libellé court 15 S N Libellé court de l’unité fonctionnelle.
Lettre budget 1 S O Lettre correspondant au budget de l’unité
fonctionnelle.
Centre de
responsabilité

4 N O Centre de responsabilité auquel est rattaché l’UF.
Code magasin 1 S O UF magasin O Magasin proncipal
A Magasin Auxiliaire
N Non magasin.
Unité médicale 4 N N Unité médicale de rattachement si elle existe.
UF Médicale 1 S O UF médicale (oui ou Non)
Service Médical 4 N N S’il s’agit d’une UF médicale, alors le service
médical est renseigné dans cette zone.
Etablissement
géographique

2 N O Etablissement géographique auquel est rattaché
l’UF
Section d’analyse 10 S N Section analytique a objectif de comptabilité
analytique.
Type d’activité 2 S N Type d’activité de l’UF
Discipline
d’équipement

3 S N Code discipline d’équipement de l’UF
UF d’urgence 1 S O L’UF est une UF d’URGENCE (Oui Non)
Séjour consécutif 1 S O L’UF gère des séjours consécutifs (Oui Non)
Venue 1 S O L’UF gère des venue (Oui Non)
Séance 1 S O L’UF gère des séances (Oui Non)
Productrice
d’actes

1 S O L’UF produit des actes (Oui Non)
Prestation
Hôtelière

1 S O L’UF produit des prestations Hôtelière (Oui Non).
Nombre de lits
ouverts

5 N N Nombre de lits ouverts pour cette UF.
N° Finess 9 N N N° finess
(Alimenté dés que la comptabilité est géré par
Sigale)

Référence Messages HPK.docx © p. 47 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Type de séjour 1 N N (^1) : Séjour de courte durée (CS)
2 : Soins de suite (MS)
3 : Soins longue durée (LS/MR)
4 : Psychiatrie
5 : Externes
6 : Hospit de jour
7 : Hospit de nuit
8 : Séances
Type de PMSI 3 S N (^) Le type de PMSI est déduit du type de séjour.
Type séjour = 1,6,7,8 → MCO
=2 → SSR
= 4 → PSY
Pour le HAD : Si TAACC.HXUNITE=06 on envoie
en TYPE PMSI : HAD
Dans tous les autres cas on envoie la valeur nul.

Mise hors service d'une Unité fonctionnelle (UF)
Ce message n’est émis que si une UF est annulée logiquement (mise hors service). Ce message peut
être émis en prévisionnel, il faut donc regarder la date de mise hors service.. A ce jour, ce message
n’est disponible qu’en émission.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
UF = Unité fonctionnelle.
Message 2 S O U1
Mode 1 S O S (Mise hors service
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable de validité de l’UF
UF 4 N O Code Unité fonctionnelle (Unique pour un exercice
comptable)
Date d’annulation 8 D N Ce code indique a compter de quelle date l’UF sera
annulée. Le format est YYYYMMDD.

Référence Messages HPK.docx © p. 48 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Structure : Centres de responsabilité
Création d’un centre de responsabilité
Rubrique Long. Format Oblig. Commentaires

Type 2 S O ST = Structure

Message 2 S O CR (Centres de responsabilités)
Mode 1 S O C (Création)^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable
Centre de
responsabilité

4 N O Centre de reponsabilité
Libellé 30 S O Libellé
Responsable 30 S N Nom du responsable
Lettre budget 1 S O Lettre budget
Date de début
de validité

8 D O YYYYMMDD
Date de fin de
validité

8 D N YYYYMMDD
Modification d’un centre de responsabilité
Rubrique Long. Format Oblig. Commentaires

Type 2 S O ST = Structure

Message 2 S O CR (Centres de responsabilités)
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable^
Centre de
responsabilité

4 N O Centre de responsabilité
Libellé 30 S O Libellé
Responsable 30 S N Nom du responsable
Lettre budget 1 S O Lettre budget
Date de début 8 D O YYYYMMDD

Référence Messages HPK.docx © p. 49 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

de validité
Date de fin de
validité

8 D N YYYYMMDD
Référence Messages HPK.docx © p. 50 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’un centre de responsabilité
Rubrique Long. Format Oblig. Commentaires

Type 2 S O ST = Structure

Message 2 S O CR (Centres de responsabilités)
Mode 1 S O S (Mise hors service)^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable
Centre de
responsabilité

4 N O Centre de responsabilité
Date de fin de
validité

8 D O YYYYMMDD
Référence Messages HPK.docx © p. 51 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Civilités
Création d’une civilité
Ce message est émis à chaque création d’un nouveau code civilité ou un code pour une nouvelle
version.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O CI
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 4 S O Code civilité
Version 5 S O Version
Libellé 40 S O Libellé
Type de civilité 1 S O M civilité masculine
F civilité féminine
A autre type
Actif 1 B O T/F
Valeur
précédente

4 S N Code dans la version précédente
Modification d’une civilité
Ce message est émis à chaque modification d’un nouveau code civilité pour toute version en service.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O CI
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 4 S O Code civilité
Version 5 S O Version
Libellé 40 S O Libellé
Type de civilité 1 S O M civilité masculine
F civilité féminine

Référence Messages HPK.docx © p. 52 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

A autre type
Actif 1 B O T/F
Valeur
précédente

4 S N Code dans la version précédente
Référence Messages HPK.docx © p. 53 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une civilité
Ce message mise hors service d’un item civilité.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O CI
Mode 1 S O S^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 4 S O Code civilité
Version 5 S O Version

Mise hors service d’une version
Ce message n’est émis que pour une mise hors service d’une version complète.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O CI
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version au format YYYYMMDD

Si la version n’est pas une version encore en production, il est
nécessaire d’envoyer un message de mise hors service pour chaque
civilité de la version en plus du message de mise hors service de la
version.
 R e m a r q u e

Référence Messages HPK.docx © p. 54 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Situations Familiales
Création d’une situation familiale
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O SI
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 1 S O Code situation de famille
Version 5 S O Version
Libellé 40 S O Libellé
Actif 1 B O T/F
Valeur
précédente

1 S N Code dans la version précédente
Modification d’une situation familiale
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O SI
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 1 S O Code situation de famille
Version 5 S O Version
Libellé 40 S O Libellé
Actif 1 B O T/F
Valeur
précédente

1 S N Code dans la version précédente
Référence Messages HPK.docx © p. 55 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une situation familiale
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O SI
Mode 1 S O S^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 1 S O Code situation de famille
Version 5 S O Version

Mise hors service d’une version
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O SI
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version

Si la version n’est pas une version encore en production, il est
nécessaire d’envoyer un message de mise hors service pour chaque
civilité de la version en plus du message de mise hors service de la
version.
 R e m a r q u e

Référence Messages HPK.docx © p. 56 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Nationalité
Création d’une nationalité
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O NA
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 1 S O Code nationalité
Version 5 S O Version
Libellé 40 S O Libellé
Actif 1 B O T/F
Valeur
précédente

1 S N Code dans la version précédente
Modification d’une nationalité
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O NA
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 1 S O Code nationalité
Version 5 S O Version
Libellé 40 S O Libellé
Actif 1 B O T/F
Valeur
précédente

1 S N Code dans la version précédente
Référence Messages HPK.docx © p. 57 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une nationalité
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O NA
Mode 1 S O S^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 1 S O Code nationalité
Version 5 S O Version

Mise hors service d’une version
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O NA
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version

Si la version n’est pas une version encore en production, il est
nécessaire d’envoyer un message de mise hors service pour chaque
code nationalité de la version en plus du message de mise hors service
de la version.
 R e m a r q u e

Référence Messages HPK.docx © p. 58 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Pays
Création d’un pays
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O PA
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 2 S O Code pays
Version 5 S O Version
Libellé 100 S O Libellé
Code langue 10 S N Code langue par défaut (doit appartenir à la table
HXLANG)
Long IBAN 2 N N Longueur IBAN
Actif 1 B O T/F
Valeur
précédente

1 S N Code dans la version précédente
Long CP 2 N N Longueur de code postal
Code insee 3 S N Code insee du pays

Modification d’un pays
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O PA
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 2 S O Code pays
Version 5 S O Version
Libellé 100 S O Libellé
Code langue 10 S N Code langue par défaut (doit appartenir à la table
HXLANG)
Long IBAN 2 N N Longueur IBAN
Actif 1 B O T/F
Valeur 1 S N Code dans la version précédente

Référence Messages HPK.docx © p. 59 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

précédente
Long CP 2 N N Longueur de code postal
Code insee 3 S N Code insee du pays

Référence Messages HPK.docx © p. 60 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’un pays
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O PA
Mode 1 S O S^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 2 S O Code pays
Version 5 S O Version

Mise hors service d’une version
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O PA
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version

Si la version n’est pas une version encore en production, il est
nécessaire d’envoyer un message de mise hors service pour chaque
code pays de la version en plus du message de mise hors service de la
version.
 R e m a r q u e

Référence Messages HPK.docx © p. 61 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Spécialités Médicales
Création d’une spécialité médicale
Ce message est émis à chaque création d’un nouveau code spécialité médicale ou un code pour une
nouvelle version.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO = Nomenclature
Message 2 S O SP (spécialité médicale)
Mode 1 S O C (Création)^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code spécialité 2 S O Code spécialité médicale
Version 5 S O Version
Libellé 40 S O Libellé
Libellé titre 30 S N Libellé pour les titres (éditions)
Anesthésiste 1 S N O : Oui
N : Non
Actif 1 B O T/F
Valeur
précédente

4 S N Code dans la version précédente
Modification d’une spécialité médicale
Ce message est émis à chaque modification d’un nouveau code spécialité médicale.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO = Nomenclature

Message 2 S O SP (spécialité médicale)
Mode 1 S O M (Modification)^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code spécialité 2 S O Code spécialité médicale
Version 5 S O Version
Libellé 40 S O Libellé
Libellé titre 30 S N Libellé pour les titres (éditions)
Anesthésiste 1 S N O : Oui
N : Non
Actif 1 B O T/F

Référence Messages HPK.docx © p. 62 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Valeur
précédente

4 S N Code dans la version précédente
Référence Messages HPK.docx © p. 63 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une spécialité médicale......................................................................................
Ce message est émis à chaque mise hors service d’une code spécialité médicale.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO = Nomenclature
Message 2 S O SP (spécialité médicale)
Mode 1 S O S (mise hors service)^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code spécialité 2 S O Code spécialité médicale
Version 5 S O Version

Mise hors service d’une version de spécialités médicales
Ce message est émis à chaque mise hors service d’une version complète de spécialités médicales.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO = Nomenclature

Message 2 S O SP (spécialité médicale)
Mode 1 S O V (mise hors service d’une version)^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version au format YYYYMMDD

Si la version n’est pas une version encore en production, il est
nécessaire d’envoyer un message de mise hors service pour chaque
spécialité médicale de la version en plus du message de mise hors
service de la version.
 R e m a r q u e

Référence Messages HPK.docx © p. 64 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Langues Maternelles
Création d’une langue maternelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O LG
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 10 S O Code langue
Version 5 S O Version
Libellé court 20 S O Libellé court
Libellé long 40 S O Libellé long
Actif 1 B O T/F
Valeur
précédente

10 S N Code dans la version précédente
Modification d’une langue maternelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O LG
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 10 S O Code langue
Version 5 S O Version
Libellé court 20 S O Libellé court
Libellé long 40 S O Libellé long
Actif 1 B O T/F
Valeur
précédente

10 S N Code dans la version précédente
Référence Messages HPK.docx © p. 65 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une langue maternelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O LG
Mode 1 S O S^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 10 S O Code langue
Version 5 S O Version

Mise hors service d’une version de langue maternelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O LG
Mode 1 S O V^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format^ : YYYYMMDDHHMISSnn^
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version

Si la version n’est pas une version encore en production, il est
nécessaire d’envoyer un message de mise hors service pour chaque
langue maternelle de la version en plus du message de mise hors
service de la version.
 R e m a r q u e

Référence Messages HPK.docx © p. 66 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Pièces justificatives
Création d’une pièce justificative
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O PI
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 4 S O Code pièce
Version 5 S O Version
Libellé 30 S O Libellé
Justifie l’identité 1 S N T/F (True ou False)

Actif 1 B O T/F
Valeur
précédente

4 S N Code dans la version précédente
Modification d’une pièce justificative
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O PI
Mode 1 S O M^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 4 S O Code pièce
Version 5 S O Version
Libellé 30 S O Libellé
Justifie l’identité 1 S N T/F (True ou False)

Actif 1 B O T/F
Valeur 4 S N Code dans la version précédente

Référence Messages HPK.docx © p. 67 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

précédente

Mise hors service d’une pièce justificative
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O PI
Mode 1 S O S^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 4 S O Code pièce
Version 5 S O Version

Mise hors service d’une version des pièces justificatives....................................................................
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O PI
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version au format
YYYYMMDD

Référence Messages HPK.docx © p. 68 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Catégories Socioprofessionnelles
Création d’une catégorie socioprofessionnelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O CS
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 2 S O Code catégorie socioprofessionnelle
Version 5 S O Version
Libellé 95 S O Libellé
Actif 1 B O T/F
Valeur
précédente

2 S N Code dans la version précédente
Modification d’une catégorie socioprofessionnelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O CS
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 2 S O Code catégorie socioprofessionnelle
Version 5 S O Version
Libellé 95 S O Libellé
Actif 1 B O T/F
Valeur
précédente

2 S N Code dans la version précédente
Référence Messages HPK.docx © p. 69 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une catégorie socioprofessionnelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O CS
Mode 1 S O S^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 2 S O Code catégorie socioprofessionnelle
Version 5 S O Version

Mise hors service d’une version des catégories socioprofessionnelles
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O CS
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version

Référence Messages HPK.docx © p. 70 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Situations Professionnelles
Création d’une situation professionnelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O SF
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 3 S O Code situation professionnelle
Version 5 S O Version
Libellé 90 S O Libellé
Actif 1 B O T/F
Valeur
précédente

3 S N Code dans la version précédente
Modification d’une situation professionnelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O SF
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 3 S O Code situation professionnelle
Version 5 S O Version
Libellé 90 S O Libellé
Actif 1 B O T/F
Valeur
précédente

3 S N Code dans la version précédente
Référence Messages HPK.docx © p. 71 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une situation professionnelle
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O SF
Mode 1 S O S^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 3 S O Code situation professionnelle
Version 5 S O Version

Mise hors service d’une version des situations professionnelles
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O SF
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version

Référence Messages HPK.docx © p. 72 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Statuts de parcours
Création d’un statut de parcours
Ce message est émis à chaque création d’un nouveau code statut de parcours ou un code pour une
nouvelle version.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O ET
Mode 1 S O C^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 2 S O Code statut de parcours
Version 5 S O Version
Libellé 200 S O Libellé
Code B2 3 S N Code à transférer en B2
Indicateur 1 S N Indicateur parcours de soin B2
Taux 1 S N Taux hors parcours O/N
Actif 1 B N Code est Actif
Valeur
précédente

2 S N Code dans la version précédente
Origine de
prescription

1 S N Code origine de prescription (code appartenant
à la table HXOPRS)
Saisie médecin 1 B N Saisie du médecin obligatoire suivant le code

Référence Messages HPK.docx © p. 73 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d’un statut de parcours
Ce message est émis à chaque modification d’un statut de parcours.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O ET
Mode 1 S O M^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code 2 S O Code statut de parcours
Version 5 S O Version
Libellé 200 S O Libellé
Code B2 3 S N Code à transférer en B2
Indicateur 1 S N Indicateur parcours de soin B2
Taux 1 S N Taux hors parcours O/N
Actif 1 B N Code est Actif
Valeur
précédente

2 S N Code dans la version précédente
Origine de
prescription

1 S N Code origine de prescription (code appartenant
à la table HXOPRS)
Saisie médecin 1 B N Saisie du médecin obligatoire suivant le code

Mise hors service d’un statut de parcours
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O ET
Mode 1 S O S^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Code 2 S O Code statut du parcours
Version 5 S O Version

Référence Messages HPK.docx © p. 74 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Mise hors service d’une version des statuts de parcours
Ce message est émis à chaque mise hors service d’une version complète des statuts de parcours.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O ET
Mode 1 S O V^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le
message.
Version 5 S O Version
Date de fin 16 D O Date de fin de la version

➢ Nomenclature : Praticiens
Création d’un praticien
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O PR
Mode 1 S O C (Création)
Emetteur 15 S O HEXAGONE
Date de
l’envoi

16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
Code
praticien

7 S O Code PRAACC de HRPRA
Type de
praticien

2 S O P = praticien interne
PX = praticien externe
Nom
praticien

20 S O Nom du praticien
FINESS 9 N O No FINESS : c’est le n° ADELI
Adresse
ligne1

40 N N Première ligne adresse
Adresse
ligne2

40 N N Deuxième ligne adresse
Code postal 5 N N
Ville 40 N N
Spécialité 2 N N Référencé dans HXSPEC

Référence Messages HPK.docx © p. 75 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Anesthésiste 1 S N Anesthésiste O/N
Tel 40 S N 40 premiers caractères de PRATEL , zone
téléphonique.
Tarif 2 S N Code tarif édité sur la feuille de soin
Convention 1 S N Code convention édité sur la feuille de soin.
Zone ISD 2 S N Zone ISD édité sur la feuille de soin.
IK 2 S N IK édité sur la feuille de soin
Activité
libérale

1 S N Activité libérale O/N
Dep.
Honoraires

1 S N Pratique le dépassement d’honoraires^
(O/N)
Identifiant
carte
professionnel
le de santé

31 S N
Liste des UF-
Finess

* S N Champ de la forme
UF~FINESS^UF~FINESS^UF~FINESS......
Liste des
spécialités

* S N Champ de la forme^
SPE1^SPE2^SPE3......
E-mail 50 S N e-mail du praticien^
Prod. Actes 1 S N Producteur d’actes O/N^
Nom 50 S N Nom du praticien^
Prénom 50 S N Prénom du praticien^
Civilité 4 S N Civilité du praticien (pointe sur HXCIV)^
Titre 6 S N Titre du praticien (pointe sur HXTIPRA)^
RPPS 11 S N N° RPPS^
Date de fin
de validité

8 Date N Date de fin de validité du praticien au format
AAAAMMJJ
Secteur 3 S N Secteur du praticien^
Secteur 1 : 1
Secteur 2 : 2
Non conventionné: NC
Secteur 1DP : 1DP
Contrat 10 S N Contrat du praticien^
Contrat OPTAM
Contrat OPTAM-CO

Référence Messages HPK.docx © p. 76 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d’un praticien
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O PR
Mode 1 S O M (Modification)
Emetteur 15 S O HEXAGONE
Date de
l’envoi

16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
Code
praticien

7 S O Code PRAACC de HRPRA
Type de
praticien

2 S O P = praticien interne
PX = praticien externe
Nom
praticien

20 S O Nom du praticien
FINESS 9 N O No FINESS : c’est le n° ADELI
Adresse
ligne1

40 N N Première ligne adresse
Adresse
ligne2

40 N N Deuxième ligne adresse
Code postal 5 N N
Ville 40 N N
Spécialité 2 N N Référencé dans HXSPEC
Anesthésiste 1 S N Anesthésiste O/N
Tel 40 S N 40 premiers caractères de PRATEL , zone
téléphonique.
Tarif 2 S N Code tarif édité sur la feuille de soin
Convention 1 S N Code convention édité sur la feuille de soin.
Zone ISD 2 S N Zone ISD édité sur la feuille de soin.
IK 2 S N IK édité sur la feuille de soin
Activité
libérale

1 S N Activité libérale O/N
Dep.
Honoraires

1 S N Pratique le dépassement d’honoraires^
(O/N)
Identifiant
carte
professionnel
le de santé

31 S N
Liste des UF-
Finess

* S N Champ de la forme
UF~FINESS^UF~FINESS^UF~FINESS......
Liste des
spécialités

* S N Champ de la forme^
SPE1^SPE2^SPE3......
E-mail 50 S N e-mail du praticien^

Référence Messages HPK.docx © p. 77 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Prod. Actes 1 S N Producteur d’actes O/N^
Nom 50 S N Nom du praticien^
Prénom 50 S N Prénom du praticien^
Civilité 4 S N Civilité du praticien (pointe sur HXCIV)^
Titre 6 S N Titre du praticien (pointe sur HXTIPRA)^
RPPS 11 S N N° RPPS^
Date de fin
de validité

8 Date N Date de fin de validité du praticien au format
AAAAMMJJ
Secteur 3 S N Secteur du praticien^
Secteur 1 : 1
Secteur 2 : 2
Non conventionné: NC
Secteur 1DP : 1DP
Contrat 10 S N Contrat du praticien^
Contrat OPTAM
Contrat OPTAM-CO

Suppression d’un praticien
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO

Message 2 S O PR
Mode 1 S O S (Suppression)
Emetteur 15 S O HEXAGONE
Date de
l’envoi

16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
Code
praticien

7 S O Code PRAACC de HRPRA
Type de
praticien

2 S O P = praticien interne
PX = praticien externe
Nom
praticien

20 S O Nom du praticien
FINESS 9 N O No FINESS : c’est le n° ADELI
Identifiant
carte
professionnel
le de santé

31 S N
Date de mise
hors service

14 Date O Date de la mise hors service auformat :
YYYYMMDDHHMISS
Prod. Actes 1 S N Producteur d’actes O/N^
Nom 50 S N Nom du praticien^
Prénom 50 S N Prénom du praticien^
Civilité 4 S N Civilité du praticien (pointe sur HXCIV)^
Titre 6 S N Titre du praticien (pointe sur HXTIPRA)^

Référence Messages HPK.docx © p. 78 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

RPPS 11 S N N° RPPS^
Date de fin
de validité

8 Date N Date de fin de validité du praticien au format
AAAAMMJJ
Secteur 3 S N Secteur du praticien^
Secteur 1 : 1
Secteur 2 : 2
Non conventionné: NC
Secteur 1DP : 1DP
Contrat 10 S N Contrat du praticien^
Contrat OPTAM
Contrat OPTAM-CO

Référence Messages HPK.docx © p. 79 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Organismes
Création d’un organisme
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O OR
Mode 1 S O C (Création )
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
Type organisme 1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code organisme 10 S O Code orgacc de HRORG
Nom organisme 35 S O Libellé
Adresse ligne1 40 N N Première ligne adresse
Adresse ligne2 40 N N Deuxième ligne adresse
Code postal 5 N N
Ville 40 N N
Téléphone 50 S N Zone Télécom non structurée
Grand régime 2 S N Code grand régime
Code caisse 3 S N
Code centre 3 S N
Clé 1 S N Clé de la combinaison grand
régime+caisse+centre
Régime Local 1 S N Régime Alsace/Moselle (O/N)
CMU 1 S N O/N
Transfert norme
NOE

1 S N T ou F
Transfert norme B2 1 S N Transfert norme B2 O/N
Infos
complémentaires

3 S N Info complémentaires
Transfert IS 1 S N Transfert informations de séjour
(O/N)
Transfert B615 1 S N Transfert B615
Transfert CX 1 S N Transfert sécu pour les consultations externes^
Compte de tiers 7 N N Compte de tiers associé^
Accord tacite 1 S N Accord tacite après délai^
Délai nbre jours 3 N N Nombre de jours avant la génération de l’accord tacite^
Organisme
destinataire

10 S N Code organisme destinataire des émissions^
Organisme 1 S N Indique s’il s’agit d’un organisme mutualiste ou non

Référence Messages HPK.docx © p. 80 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

mutualiste (O/N)^
Org div 1 S N D=Divers (ROD)/ '' = régime obligatoire standard^
Date de fin de
validité

16 Date N Date de fin de validité de l’organisme au format
YYYMMDD
Organisme
remplaçant

10 S N Nouveau code organisme (Héxagone) qui remplace celui
qui n’est plus valide.
Référence Messages HPK.docx © p. 81 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Modification d’un organisme
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O OR
Mode 1 S O M ( Modification )
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
Type organisme 1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code organisme 10 S O Code orgacc de HRORG
Nom organisme 35 S O Libellé
Adresse ligne1 40 N N Première ligne adresse
Adresse ligne2 40 N N Deuxième ligne adresse
Code postal 5 N N
Ville 40 N N
Téléphone 50 S N Zone Télécom non structurée
Grand régime 2 S N Code grand régime
Code caisse 3 S N
Code centre 3 S N
Clé 1 S N Clé de la combinaison grand
régime+caisse+centre
Régime Local 1 S N Régime Alsace/Moselle (O/N)
CMU 1 S N O/N
Transfert norme
NOE

1 S N T ou F
Transfert norme B2 1 S N Transfert norme B2 O/N
Infos
complémentaires

3 S N Infos complémentaires
Transfert IS 1 S N Transfert informations de séjour
(O/N)
Transfert B615 1 S N Transfert B615
Transfert CX 1 S N Transfert sécu pour les consultations externes^
Compte de tiers 7 N N Compte de tiers associé^
Accord tacite 1 S N Accord tacite après délai^
Délai nbre jours 3 N N Nombre de jours avant la génération de l’accord tacite^
Organisme
destinataire

10 S N Code organisme destinataire des émissions^
Organisme
mutualiste

1 S N Indique s’il s’agit d’un organisme mutualiste ou non
(O/N)
Org div 1 S N D=Divers (ROD)/ '' = régime obligatoire standard^
Date de fin de 16 Date N Date de fin de validité de l’organisme au format
YYYMMDD

Référence Messages HPK.docx © p. 82 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

validité
Organisme
remplaçant

10 S N Nouveau code organisme (Héxagone) qui remplace celui
qui n’est plus valide.
Référence Messages HPK.docx © p. 83 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d’un organisme
Rubrique Long. Format Oblig. Commentaires

Type 2 S O NO
Message 2 S O OR
Mode 1 S O S (Suppression )
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
Type organisme 1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code organisme 10 S O Code orgacc de HRORG
Nom organisme 35 S O Libellé
Adresse ligne1 40 N N Première ligne adresse
Adresse ligne2 40 N N Deuxième ligne adresse
Code postal 5 N N
Ville 40 N N
Téléphone 50 S N Zone Télécom non structurée
Grand régime 2 S N Code grand régime
Code caisse 3 S N
Code centre 3 S N
Clé 1 S N Clé de la combinaison grand
régime+caisse+centre
Régime Local 1 S N Régime Alsace/Moselle (O/N)
CMU 1 S N O/N
Transfert norme
NOE

1 S N T ou F
Transfert norme B2 1 S N Transfert norme B2 O/N
Infos
complémentaires

3 S N Infos complémentaires
Transfert IS 1 S N Transfert informations de séjour
(O/N)
Transfert B615 1 S N Transfert B615
Transfert CX 1 S N Transfert sécu pour les consultations externes^
Compte de tiers 7 N N Compte de tiers associé^
Accord tacite 1 S N Accord tacite après délai^
Délai nbre jours 3 N N Nombre de jours avant la génération de l’accord tacite^
Organisme
destinataire

10 S N Code organisme destinataire des émissions^
Organisme
mutualiste

1 S N Indique s’il s’agit d’un organisme mutualiste ou non
(O/N)
Org div 1 S N D=Divers (ROD)/ '' = régime obligatoire standard^
Date de fin de 16 Date N Date de fin de validité de l’organisme au format
YYYMMDD

Référence Messages HPK.docx © p. 84 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

validité
Organisme
remplaçant

10 S N Nouveau code organisme (Héxagone) qui remplace celui
qui n’est plus valide.
Référence Messages HPK.docx © p. 85 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Gestion des contrats
Chaque contrat (message NO/CT) peut contenir une ou plusieurs lignes de prestations (message
NO/CP). Le contrat auquel appartient la prestations est défini par la codification de ce contrat (Type
d’organisme, Code organisme).

Création d’un contrat
Table des contrats :
Rubrique Long. Format Oblig. Commentaires
Type 2 S O NO
Message 2 S O CT
Mode 1 S O C (Création )
Emetteur 15 S O HEXAGONE
Date de
l’envoi
16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré
le message.
Type
organisme
1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code
organisme
10 S O Code orgacc de HRORG
Nom du
contrat
35 S O Nom du contrat
Code contrat 10 S O Code contrat
Début
validité
10 D O Date de début de validité
(YYYYMMDD)
Fin validité 10 D O Date de fin de validité
Détail des prestations prises en charge par le contrat :
Rubrique Long. Format Oblig. Commentaires
Type 2 S O NO
Message 2 S O CP
Mode 1 S O C (Création)^
Emetteur 15 S O HEXAGONE
Date de
l’envoi
16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a
généré le message.
Type
organisme
1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code 10 S O Code orgacc de HRORG
Référence Messages HPK.docx © p. 86 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

organisme
Nom du
contrat
35 S O Nom du contrat
Code contrat 10 S O Code contrat
Type de pec 1 S O P=prestation K=acte
Code
prestation
10 S N Code prestation ou code acte
référencés respectivement dans
les tables HRPRS et HRACT
Consultant 1 S O Consultant externe O/N
Demande ou
accord
1 S O D/A Demande à faire ou accord
avec la complémentaire
Prise en
charge
4 S O T+% T + pourcentage
TM Ticket modérateur
OUI Le code prestation est
p.e.c.
NON le code prest. N’est pas
PEC
REST Par rapport à ce que
prend la sécu
FORF Complémentaire prend
en charge un forfait
APL
PART Une participation
PARTJ Une participation
journalière
Nombre de
jours de
carence
3 N N Nbr de jours avant PEC
Durés de la
PEC
3 N N Nbre de jours de PEC
Tarif limité 10,2 N N Montant max remboursé
Modification d’un contrat
Table des contrats :
Rubrique Long. Format Oblig. Commentaires
Type 2 S O NO
Message 2 S O CT
Mode 1 S O M ( Modification )
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le
message.
Type organisme 1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS

Référence Messages HPK.docx © p. 87 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Code organisme 10 S O Code orgacc de HRORG
Nom du contrat 35 S O Nom du contrat
Code contrat 10 S O Code contrat
Début validité 10 D O Date de début de validité (YYYYMMDD)^
Fin validité 10 D O Date de fin de validité

Référence Messages HPK.docx © p. 88 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Détail des prestations prises en charge par le contrat :
Rubrique Long. Format Oblig. Commentaires
Type 2 S O NO
Message 2 S O CP
Mode 1 S O M ( Modification )
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le
message.
Type organisme 1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code organisme 10 S O Code orgacc de HRORG
Nom du contrat 35 S O Nom du contrat
Code contrat 10 S O Code contrat
Type de pec 1 S O P=prestation K=acte
Code prestation 10 S N Code prestation ou code acte référencés
respectivement dans les tables HRPRS et
HRACT
Consultant 1 S O Consultant externe O/N
Demande ou accord 1 S O D/A Demande à faire ou accord avec la
complémentaire
Prise en charge 4 S O T+% T + pourcentage
TM Ticket modérateur
OUI Le code prestation est p.e.c.
NON le code prest. N’est pas PEC
REST Par rapport à ce que prend la
sécu
FORF Complémentaire prend en charge un
forfait
APL
PART Une participation
PARTJ Une participation journalière
Nombre de jours de
carence
3 N N Nbr de jours avant PEC
Durés de la PEC 3 N N Nbre de jours de PEC
Tarif limité 10,2 N N Montant max remboursé

Référence Messages HPK.docx © p. 89 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Suppression d’un contrat
Table des contrats :
Rubrique Long. Format Oblig. Commentaires
Type 2 S O NO
Message 2 S O CT
Mode 1 S O S (Suppression )
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le
message.
Type organisme 1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code organisme 10 S O Code orgacc de HRORG
Nom du contrat 35 S O Nom du contrat
Code contrat 10 S O Code contrat
Début validité 10 D O Date de début de validité (YYYYMMDD)
Fin validité 10 D O Date de fin de validité

Détail des prestations prises en charge par le contrat :
Rubrique Long. Format Oblig. Commentaires
Type 2 S O NO
Message 2 S O CP
Mode 1 S O S (Suppression )
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O^ Individu au sens S3A qui a généré le
message.
Type organisme 1 S O A = Sécu
C = Complémentaire
D = DAS / DDASS
Code organisme 10 S O Code orgacc de HRORG
Nom du contrat 35 S O Nom du contrat
Code contrat 10 S O Code contrat
Type de pec 1 S O P=prestation K=acte
Code prestation 10 S N Code prestation ou code acte référencés
respectivement dans les tables HRPRS et
HRACT
Consultant 1 S O Consultant externe O/N
Demande ou accord 1 S O D/A Demande à faire ou accord avec la

Référence Messages HPK.docx © p. 90 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

complémentaire
Prise en charge 4 S O T+% T + pourcentage
TM Ticket modérateur
OUI Le code prestation est p.e.c.
NON le code prest. N’est pas PEC
REST Par rapport à ce que prend la
sécu
FORF Complémentaire prend en charge un
forfait
APL
PART Une participation
PARTJ Une participation journalière
Nombre de jours de
carence

3 N N Nbr de jours avant PEC
Durés de la PEC 3 N N Nbre de jours de PEC
Tarif limité 10,2 N N Montant max remboursé

Référence Messages HPK.docx © p. 91 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Produits
Création d’un Produit :
Uniquement prévu en envoi d’Hexagone vers un autre logiciel.

Message 0 : Données générales du produit.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits
Message 2 S O M0
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Libellé Court
produit

40 S O Libellé produit (Unique)
Date début 8 S O Date de création du produit :
YYYYMMDD
Date de fin 8 S N Date de fin d’utilisation du produit
Code pharmacie 1 S O Oui si géré par la pharmacie, N sinon
Code CIP 7 N N Code CIP associé au produit
Code ATC 7 N N Rattachement à la codification ATC
Code UCD 7 N N Code Unité commune dispensation Obligatoire si type
Médicament
Code
Médicament

1 S N Plus utilisé depuis la version D.02
Niveau ATC de
rattachement

1 N N Obligatoire si Code ATC renseigné. Niveau
d’arborescence :
2 si Usage thérapeutique
3 si sous groupe thérapeutique
4 si sous groupe chimique
5 si substance chimique
Code Matériel 1 S N Plus utilisé depuis la version D.02
Type produit 3 S N Type de produit : MED = Médicament
MAT = Matériel Médical
DM = Dispositif Médical
FIL = Film Radiologie

Référence Messages HPK.docx © p. 92 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

PCO = Produits de contraste
Champ vide pour autres produits.
Libellé Long 150 S O Libellé long du produit.

Message 1 : Informations produit pharmacie

Emis si « Code pharmacie » est à O

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits.
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Code Tableau 4 S N Code liste valeurs possibles : 1, 2, STUP ou champ Vide
Code forme 8 S N Plus utilisé à partir de la version D.03
Catégorie
thérapeutique

4 S N Classification interne de l’établissement pour états de
consommations
Code RUH 1 S O Code Réservé à l’usage hospitalier, valeurs T pour Vrai, F
pour Faux
Conditionnemen
t Unitaire

1 S O Valeurs T pour Vrai, F pour Faux
Agréé
Collectivité

1 S O Valeurs T pour Vrai, F pour Faux
Usage Unique 1 S O Matériel à usage unique :
Valeurs T pour Vrai, F pour Faux
Code condition
Stérilité

1 S N Code condition de conservation
Remboursé SS 1 S O Plus utilisé à partir de la version D.03
Taux
allopathique

7 N N Obligatoire si Produit Rétrocédé est égal à T. Valeurs
autorisées : 35%, 65% et 100%
Attestation 1 S O Plus utilisé à partir de la version D.03
Code
Fractionable

1 S O Valeurs T pour Vrai, F pour Faux
Taux de
Majoration

1 N N Obligatoire si produit rétrocédé. Valeurs :
2 si 35%, 4 si 65% et 5 si 100%
Prix
Rétrocession

14 N N Obligatoire si produit rétrocédé. Le prix est TTC
Code édition
Livret

1 S O Code édition sur le livret thérapeutique ou non.
Valeurs T pour Vrai, F pour Faux
Référence Messages HPK.docx © p. 93 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Code Véhicule 1 S O Produit pouvant être utilisé comme véhicule pour les
perfusions. T pour vrai, F pour Faux
Code diluable 1 S O Produit pouvant être dilué. T pour Vrai, F pour Faux
Code Mono
malade

1 S O Produit ne pouvant être dispensé à plusieurs patients. T
pour Vrai, F pour Faux
Produit de
dilution

1 S O Produit pouvant être utiliser dans les perfusions : T pour
Vrai, F pour Faux
MDS 1 S O Médicament dérivé du sang. Ne peut être à T que si
médicament = T. Valeurs T pour Vrai, F pour Faux
DMI 1 S O Dispositif médical Implantable. T pour Vrai, F pour Faux
Code Rétrocédé 1 S O Produit pouvant être rétrocédé ; T pour Vrai, F pour
Faux

Gestion des lots 1 S O (^) Gestion des lots et dates de péremption dans ELITE.S.
T pour Vrai, F pour Faux
Durée
prescription
3 N N Durée du traitement par défaut
Code Norme B2 5 S N Obligatoire si produit Rétrocédé
Message 2 : Informations pour édition livret thérapeutique
Emis uniquement si code Edition livret thérapeutique est à T sur message précédent (message 1)
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
PR = Produits.
Message 2 S O M2
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)
50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Exercice 4 S O Exercice de référence
Code DCI 6 S N Code DCI du livret thérapeutique
Code Regroupé 7 S N Ne peut être renseigné que si le code DCI est renseigné,
correspond au dernier niveau du livret thérapeutique.

Référence Messages HPK.docx © p. 94 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message 3 : Informations comptables pour Gestion Economique.

Emis si le domaine gestion économique ELITE.S est installé.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits.
Message 2 S O M3
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Exercice en
cours

4 N O (^) Exercice comptable en cours dans ELITE.S
Code
regroupement
comptable Ex
8 S O Code regroupement comptable de l’exercice en cours
Compte d’achat
Ex
10 S O Compte d’achat de l’exercice en cours
format Lettre budget+Numéro
Exercice + 1 4 N O (^) Exercice comptable + 1 dans ELITE.S
Code
regroupement
comptable EX+1
8 S O Code regroupement comptable sde Exercice +1
Compte d’achat
EX+1
10 S O Compte d’achat de l’exercice +1
format Lettre budget+Numéro
Code CMP Ex 10 S O Code nomenclature code des marchés public exercice
en cours
Code CMP Ex + 1 10 S O Code nomenclature code des marchés public exercice +
1

Référence Messages HPK.docx © p. 95 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message 4 : Informations générales pour Gestion Economique.

Emis si le domaine gestion économique ELITE.S est installé.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits.
Message 2 S O M4
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Code Famille 5 S O Famille de rattachement du produit
Code E/S 1 S O Code Entrée / Sortie simultanée : Valeur O ou N
Code TVA 2 N O Code TVA associé au produit, le taux associé est dans la
table HXTVA
Code Unité de
gestion

5 S O Code Unité de gestion de stock, existe dans Table
HEUNDIST
Stock minimum 14 N N Plus utilisé en Version D.01 : report sur Magasin
Stock maximum 14 N N Plus utilisé en Version D.01 : report sur Magasin
Seuil de
commande

14 N N Plus utilisé en Version D.01 : report sur Magasin
Dernier PU
facturé Hors
taxe

13 N N Décimalisé à 4
Pourcentage
alerte

6 N N Pourcentage d’alerte sur le PU facturé. Décimalisé à 2
PMP 13 N N Dernier prix moyen pondéré connu. Décimalisé à 4
Code gratuit 1 S O Produit gratuit ou pas. Valeurs O pour Vrai, N pour faux.
Code décimalisé 1 S O Quantité pouvant être décimalisée ou pas. Valeurs : O
pour Vrai, N pour Faux
Code Stock 1 S O Code produit stocké O/N
Date fin
commande

8 Date N Date d’arrêt de saisie de commande. Format
YYYYMMDD
Code fabriqué 1 S O Code produit Fabriqué. T pour Vrai, F pour Faux
Code
préconisation

1 S O Produit à utiliser dans la préconisation de commande.
Valeur O pour Vrai, N pour Faux
Qté
consommation
forcée

14 N N Quantité de consommation forcée pour préconisation.
Décimalisée à 3
Référence Messages HPK.docx © p. 96 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Famille article 27 4 N N Plus utilisé à partir de la version D.0 2

Code Unité de
transfert

5 S F Code de l’unité de réapprovisionnement des armoires
ou magasins annexes.
Nombre d’unités
de Gestion pour
l’unité de
Transfert

3 N F Equivalent en Nombre d’unités de gestion dans l’unité
de transfert.
Message 5 : Informations sur les magasins par produit.

Emis si le domaine gestion Economique ELITE.S est installé.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits.
Message 2 S O M5
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Exercice
comptable

4 N O Exercice de gestion
UF Magasin 4 N O UF magasin de stockage
Armoire 4 S N Code armoire de l’UF de stockage
Code transfert 1 S O Code produit autorisé pour les transferts entre
magasins. Valeurs T pour Vrai, F pour Faux
Nombre jours
couverture

3 N N Nombre de jours de couverture ( préconisation)
Nombre de jours
de sécurité

3 N N Nombre de jours de sécurité (préconisation)
Quantité en
dotation

14 N N Quantité de dotation fixée pour alimentation des
magasins annexes ou armoires. Décimalisée à 3
Lieu de stockage 10 S N Identification du lieu de stockage dans le magasin
Stock minimum 14 N N Quantité stock mini ( préconisation si magasin principal
ou réapprovisionnement si annexe). Décimalisé à 3
Stock maximum 14 N N Quantité en stock maximum. Décimalisé à 3
Quantité seuil
de commande

14 N N Quantité à commander ( si préconisation en quantité)
Nombre de jours
mini de stock

3 N N Nombre de jours minimum de stock avant
réapprovisionnement
Référence Messages HPK.docx © p. 97 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

pour réappro.
Nombre de jours
de réappro.

3 N N Nombre de jours de réapprovisionnement.
Gestion produit
Plein/vide

1 S N Produit géré en plein/vide : T si gestion produit en
Plein/vide
Gestion
Quantité/Valeur

1 S N Pour magasin principal, préconisation en Jours ou en
Quantité (J ou Q), pour les annexes
réapprovisionnement en Jours ou Quantité (J ou Q)
Message 6 : Informations sur les conditions de prescription.

Message facultatif.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits.
Message 2 S O M6
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Code Unité de
prescription

12 S O Code de l’unité de prescription
Code par défaut 1 S O Valeur T pour Vrai, F pour Faux. Identifie la valeur du
code unité de prescription par défaut
Qté en Unité de
gestion

14 N O Nombres d’unités correspondantes dans une unité de
gestion. Décimalisée à 3
Code calcul
réapprovisionne
ment

1 S O Code pour gérer les approvisionnements de la
pharmacie vers le service en nombre correct d’unité par
rapport à la quantité prescrite. Valeurs autorisées E
entier, D pour décimalisé
Nb d’unités
prescrites Soir

14 N O Nombre d’unités de la sous forme prescrit par défaut le
soir Décimalisé à 3
Nb d’unités
prescrites Matin

14 N O Nombre d’unités de la sous forme prescrit par défaut le
Matin Décimalisé à 3
Nb d’unités
prescrites A.
Midi

14 N O Nombre d’unités de la sous forme prescrit par défaut
l’après midi Décimalisé à 3
Nb d’unités
prescrites
Coucher

14 N O Nombre d’unités de la sous forme prescrit par défaut au
coucher Décimalisé à 3
Fréquence
journalière

3 S N Code sélectionné dans une liste de valeurs
Référence Messages HPK.docx © p. 98 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Commentaire 250 S N

Référence Messages HPK.docx © p. 99 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message 7 : Informations sur les formes associées aux médicaments.

Message facultatif.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits.
Message 2 S O M7
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Médicament Hexagone
Code Forme 8 S O Code forme du médicament

▪ Modification sur produit
Mêmes messages que les message de création dès qu’une information est modifiée avec un mode
« MODIFICATION ». Seul le message sur lequel une modification est apportée est émis.

▪ Suppression d'un produit
Message émis lors de la saisie d’une date de fin sur le produit

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
PR = Produits.
Message 2 S O M1
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code Produit 8 S O Numéro Identifiant Produit(Unique)
Date de fin 8 Date O Date de fin d’utilisation du produit YYYYMMDD

Référence Messages HPK.docx © p. 100 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Fournisseurs :
▪ Création / Modification / Suppression d'un fournisseur
Uniquement prévu en envoi d’Hexagone vers un autre logiciel.

Message 1 : Informations générales liées au fournisseur.

Message obligatoire en création de fournisseur.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
FO : Fournisseur.
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
Fournisseur

6 S O Numéro Identifiant Fournisseur (Unique)
Code divers
(O/N)

1 S O Code permettant de regrouper des fournisseurs
occasionnels sous un même code divers. Dans ce cas,
toutes les informations utiles dans la pièce comptable
associée à ce code sont obligatoirement transmises.
Valeurs autorisées : O pour divers, N pour fournisseur
identifié.
Raison sociale 35 S O Raison sociale du fournisseur en Majuscules
Adresse 1 32 S N Adresse 1 fournisseur
Adresse 2 32 S N Suite Adresse fournisseur
Code postal 5 N O Code postal
Ville 32 S O Obligatoire majuscule
Bureau
distributeur

27 S O
No téléphone 16 S N No téléphone du fournisseur
No de Fax 16 S N No de Fax
No de client 10 S N No de client de l’établissement chez le fournisseur
Compte tiers
exploit.

8 N O No de compte de tiers pour les factures sur la section
d’exploitation.
No de SIRET 14 S N No de SIRET du fournisseur
Compte de tiers
investissement

8 N O No de compte de tiers pour les factures sur la section
d’investissement
Référence Messages HPK.docx © p. 101 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Code APE 4 S N Code APE du fournisseur
Délai de
paiement

3 N N Nombre de jours pour le délai de paiement des factures
de ce fournisseur
Date de début 8 Date O Date de début d’utilisation de ce fournisseur. Format
YYYYMMDD
Date de fin 8 Date N Date de fin d’utilisation de ce fournisseur. Format
YYYYMMDD
Code
regroupement
facture

1 S O Code permettant d’indiquer si on peut regrouper
plusieurs factures sur les mandats pour ce fournisseur..
Valeurs T pour Vrai, F pour faux
Code
concurrentiel

1 S O Code fournisseur concurrentiel ou pas. T pour Vrai, F
pour faux
Adresse EMAIL 50 S N Adresse EMAIL de la Maison Mère

Message 2 : Domiciliations bancaires liées au fournisseur.

Il existe au minimum une domiciliation bancaire par fournisseur, sauf
pour les fournisseurs divers.
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
FO : Fournisseur.
Message 2 S O M2
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
Fournisseur

6 S O Numéro Identifiant Fournisseur (Unique)
No de
domiciliation

2 N O Numéro de domiciliation bancaire de 01 à 99
Clé RIB 2 N O Clé RIB associée à la domiciliation bancaire 2 Chiffres
No de compte
bancaire

11 S O No du compte bancaire. Lettres uniquement si CCP
Code banque 5 N O 5 chiffres obligatoires.
Code guichet 5 N O 5 chiffres obligatoires.
Libellé agence 24 S N Libellé de l’agence bancaire

 R e m a r q u e

Référence Messages HPK.docx © p. 102 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Titulaire 24 S O Titulaire du compte bancaire. Majuscules
Mode de
règlement

1 S O Mode de règlement de la domiciliation, existe dans la
table HXFOUREG
Nature 1 S O E pour domiciliation Etrangère, F pour française
Date de fin 8 Date N Date de fin de validité de la domiciliation bancaire

Message 3 : Points de commande liés au fournisseur.

Il existe au minimum un point de commande par fournisseur, sauf pour
les fournisseurs divers.
Rubrique Lon
g.

Format Oblig. Commentaires
Type 2 S O Type du message :
FO : Fournisseur.
Message 2 S O M3
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu (émetteur
du message)

50 S O Individu au sens S3A qui a généré le message.
Code Fournisseur 6 S O Numéro Identifiant Fournisseur (Unique)
No de point de cde 2 N O Numéro de point de commande 01 à 99
Dénomination 35 S O Majuscules. Dénomination du point de commande
Adresse 1 32 S N Adresse 1 du point de commande
Adresse 2 32 S N Suite adresse
Ville 32 S N Ville du point de commande
Code postal 5 N O Code postal du point de commande. 5 chiffres
obligatoires
Bureau
distributeur

27 S N Bureau distributeur point de commande
Nom contact 35 S N Nom du représentant
No téléphone 16 S N No de téléphone associé
No fax 16 S N No de fax associé
Franco de Port 13 N N Décimalisé à 2, montant franco de port
Adresse EMAIL 50 S N Adresse EMAIL du point de commande
Code Robot EDI 3 S N Obligatoire si EDI liaison avec HOSPITALIS

▪ Modification Fournisseurs
Mêmes messages que les messages de création dès qu’une information est modifiée avec un mode
« MODIFICATION »

 R e m a r q u e

Référence Messages HPK.docx © p. 103 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Référence Messages HPK.docx © p. 104 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

▪ Suppression fournisseur :
Message 1 : suppression d’un fournisseur

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
FO : Fournisseur.
Message 2 S O M1
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
Fournisseur

6 S O Numéro Identifiant Fournisseur (Unique)
Date de fin 8 Date O Date de fin d’utilisation du fournisseur format
YYYYMMDD

Message 2 : Suppression d’une domiciliation bancaire.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
FO : Fournisseur.
Message 2 S O M2
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
Fournisseur

6 S O Numéro Identifiant Fournisseur (Unique)
No de
domicilation

3 N O No de domiciliation bancaire supprimée
Date de fin 8 Date O Date de fin d’utilisation de la domiciliation bancaire
format YYYYMMDD

Référence Messages HPK.docx © p. 105 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Nomenclature : Liens Produits / Fournisseurs :
Création / Modification / Suppression d'un lien
Uniquement prévu en envoi d’Hexagone vers un autre logiciel

Message 1 : Informations générales liées au lien:

Message existant si le lien Produit / Fournisseur est saisi dans le domaine Gestion Economique ELITE.S

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
FP : Fournisseur / Produit.
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Code
Fournisseur

6 S O Numéro Identifiant Fournisseur (Unique)
Code produit 8 S O Code identifiant produit
Date de création 8 Date O Format YYYYMMDD
PU Hors taxe
Fixé

13 N N Prix fixé fournisseur hors marché. Décimalisée à 4
Quantité
minimum de
commande

14 N N Quantité minimum à commander. Décimalisée à 3
Code Unité de
conditionnemen
t

5 S N Code unité de conditionnement du fournisseur, existe
dans la table HEUNDIST
Nombre d’unités 14 N N Nombre d’unités de gestion dans l’unité de
conditionnement du fournisseur. Décimalisé à 3
Délai de
livraison

3 N N Nombre de jours pour délai de livraison.
Code fournisseur
principal

1 S O Fournisseur principal du produit. Valeurs T pour Vrai, F
pour Faux.
No de point de
commande

2 N O Par défaut 01. Point de commande habituel pour le
produit.
Référence du
produit chez le
fournisseur

1024 S N Texte permettant l’identification du produit chez le
fournisseur, il sera repris sur les bons de commande
Référence Messages HPK.docx © p. 106 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

MESSAGES PATIENT
➢ Serveur d'Identité, Mouvements, Actes :
Création / Modification / Suppression d'Identité Patient (ID M1)
Evènements déclenchant l’émission de ce message:
Création d’un patient: Dès qu’un nouvel IPP est affecté dans l’établissement un message est
envoyé. Dans le cas de la dé-fusion d’un patient qui réactivera un IPP
supprimé.
Modification: Dès qu’une information liée au patient est modifiée.
Suppression: Dès qu’une suppression d’IPP ou une fusion de deux IPP est réalisée dans
l’établissement.
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
ID = Identification.
Message 2 S O M1
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
No IPP 20 S O No identifiant permanent du patient.
Nom 50 S N Nom usuel
Prénom 50 S N Prénom usuel
Date naissance 8 Date N Au format : YYYYMMDD
Nom jeune fille 50 S N Nom patronymique n’est renseigné que dans le cas
de femmes mariées.
Statut 1 S O Qualifie l’identité :
P Provisoire
D Définitive
N Non qualifiée
Civilité 4 S N Abréviation recensée dans la table des civilités
HEXAGONE (HRCIV).
Situation fam. 1 S N Situation de famille abrégée recensée dans la table
HEXAGONE (HRSFA).
Nbre d’enfants 2 N N
Nationalité 3 S N Nomenclature INSEE
Lieu de naiss. 64 S N Lieu de naissance
Adresse :
Ligne 1
Ligne 2
Code postal
Ville
Canton

40
40
5
40
5
S
S
N
S
N
N
N
N
N
N
Première ligne adresse
Deuxième ligne adresse
Code postal
Ville
Code canton
Zone téléphone 100 S N Zone libre de 100 caractères pour indiquer un ou
plusieurs no de téléphones.
Médecin traitant 35 S N Médecin traitant en cours (Nom prénom du

Référence Messages HPK.docx © p. 107 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

médecin)
N.B : Cette zone ne devrait plus être utilisée car il
existe un nouveau message relatif au médecin
ID|MT
Catég. Socio p 3 S N Catégorie socio professionnelle Nomenclature
INSEE
Activ. Socio. P 3 S N Activité socio professionnelle Nomenclature INSEE
Date cess. Act 8 Date N Date de cessation d’activité au format :
YYYYMMDD
Rubrique Long. Format Oblig. Commentaires
Poids de naiss. 7 9999.99 N Poids à la naissance
Taille naiss. 6 999.99 N Taille à la naissance
Heure naiss. 2 N N Heure de naissance
Sexe 1 S N Sexe du patient
Minutes naiss. 2 N N Minutes de naissance
IPP Mère 10 S N Ipp de la mère dans le cas ou l’identité concerne un
nouveau né
Patient DCD 1 S N Patient DCD (Oui :Non)
Date du décès 16 Date N Date de l’envoi au format :
YYYYMMDDHHMISSnn
Identité
confirmée

1 S N Identité Confirmée (Oui :Non)
Pièces
justificatives

* S N Pièces présentées à l’admission pour justifier
l’identité du patient.
Format :
Patpi1^dtpi1^numpi1~ Patpi2^dtpi2^numpi2.....
Avec Patpi = code pièce dont les valeurs sont
référencée dans la table HXPI (Noyau)
Dtpi = date de présentation de la pièce
(YYYYMMDDHHMMSS)
Numpi=Numéro de la pièce
Langue
maternelle

10 S N Langue maternelle (HXLANG)
No sécurité social 16 S N Numéro de sécurité sociale
Pays 3 S N le pays pour l’adresse principale (HXNAT).
Liste des prénoms 200 S N Liste des prénoms séparés par des « , ».
Le premier prénom de la liste doit correspondre au
prénom usuel
**Téléphones *** S N Champ de la forme :
PATTELD~PATTELP~PATFAXD~PATFAXP~
PATEMAILD~PATEMAILP~PATBEEPERD~
PATBEEPERP~PATTELCD~PATTELCP~
PATADID~PATADIP~PATPORTD~PATPORTP
Avec :
PATTELD : Téléphone domicile
PATTELP : Téléphone profesionnel
PATFAXD : Fax du domicile
PATFAXP : Fax professionel

Référence Messages HPK.docx © p. 108 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

PATEMAILD : Email personnel
PATEMAILP : Email professionel
PATBEEPERD : Beeper personnel
PATBEEPERP : Beeper professionel
PATTELCD : Téléphone cellulaire personnel
PATTELCP : Téléphone cellulaire professionel
PATADID : Adresse internet personelle
PATADIP : Adresse internet professionelle
PATPORTD : Portable personnel
PATPORTP : Portable professionnel
**Autres adresses *** S N Zone de la forme :
Ad1num~Ad1DateDeb~Ad1Type~Ad1Etat~Ad1L1~A
d1L2~Ad1CP~Ad1Ville~Ad1Pays~Ad1Tel~Ad1Fax~A

d1Datefin ^ Ad2num~Ad2DateDeb~Ad2Type~Ad2Et
at~Ad2L1~Ad2L2~Ad2CP~Ad2Ville~Ad2Pays~Ad2Te
l~Ad2Fax~Ad2Datefin ^....
Avec :
Num : Numéro d’ordre
DateDeb : Date d’effet
Type : Type d’adresse
Etat : Etat (C en cours ou H en historique)
L1 : première ligne adresse
L2 : 2ième ligne d’adresse
CP : Code postal
Ville : Ville
Pays : Pays (HXNAT)
Tel : Téléphone
Fax : Fax
Datefin : Date de fin de validité
Pays (code iso) : Pays (HXPAYS)
Identité protégée 1 S (booléen) N Les valeurs envoyées sont :

pas de création/modif sur l'identité protégée : F
création/modif sur identité protégée et normale:
T
création/modif sur identité protégée seulement:
P
Fusion de patient 20 S N Valeurs possibles :

Si le message envoyé est ID M1 M (message de
fusion pour le patient à garder)
=Ipp du patient à supprimer
Si le message envoyé est ID M1 S (message de
fusion pour le patient à supprimer)
=Ipp du patient à garder
Dans tous les autres cas cette zone sera vide
Code postal du 5 S N Code postal du lieu de naissance

Référence Messages HPK.docx © p. 109 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

lieu de naissance
Pays du lieu de
naissance

3 S N Pays de naissance (HXNAT)
VIP 1 B N VIP (T ou F)
Identité à valider 1 B N Identité à valider (T ou F)
Adresse Qualité
Santé

11 S N Adresse Qualité Santé (AQS)
Identité usurpée 1 B N Identité usurpée (T ou F)
Ressortissant 1 N N Ressortissant (HXEXTRES)
1 : Français
2 : CEE
3 : Hors CEE
Niveau d’étude 2 N N Niveau d’étude (HXNIVET)
0 : Non scolarisé
1 : Primaire
2 : Collège, BEP, CAP
3 : Lycée enseignement général ou technique
4 : Enseignement supérieur (> terminale)
Pays (code iso) 2 S N le pays au format code iso pour l’adresse principale
(HXPAYS).
Pays du lieu de
naissance (code
iso)

2 S N Pays de naissance au format code iso (HXPAYS)
Heure de décès 2 N N Heure de décès
Minute de décès 2 N N Minute de décès
Personnel
hospitalier

1 B N Personnel hospitalier
INSC 20 S N INSC du patient
CLEINSC 2 S N CLE INSC du patient
PATNUMREG 40 S N Ipp fédérateur ( Serveur régional)

Référence Messages HPK.docx © p. 110 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Création / Modification / Suppression d’un médecin traitant d’un patient (ID MT)
Evènements déclenchant l’émission de ce message:

Création d’un médecin traitant :
Dès qu’un médecin est affecté à un patient (qui n’en avait pas) le message est
envoyé.
Modification : 2 cas :
Cas 1 : Changement de médecin traitant
Exemple : Cas où le patient avait MED1 pour médecin et a changé pour MED2.
Dans ce cas, 2 messages sont envoyés

ID|MT|M...MED1 avec une date de fin de renseignée (différente de 31/12/2999)
ID|MT|M...MED2 avec date de fin = 31/12/2999 et ancien médecin = MED1
Cas 2 : Modification du médecin traitant (suite à une erreur de saisie par
exemple)
Exemple : Cas où le patient avait MED1 pour médecin et est modifié par MED2.
Dans ces cas, 2 messages sont envoyés

ID|MT|S...MED1 avec une date de fin de renseignée (différente de 31/12/2999)
ID|MT|M...MED2 avec date de fin = 31/12/2999 (si c’est le médecin en cours)
et ancien médecin = MED1
Suppression : Dès qu’on supprime un médecin lié à un patient.
Référence Messages HPK.docx © p. 111 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Rubrique Long. Format Oblig. Commentaires

Type 2 S O ID

Message 2 S O MT
Mode 1 S O C ou M ou S^
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° IPP du patient
Code du
médecin

9 S O Code héxagone du médecin (praacc.hrpra)
Nom 50 S O Nom du médecin traitant
Prénom 50 S O Prénom du médecin traitant
N° Adéli 9 N N N° Adéli
Date de création 8 Date N Date de création dans hexagone au format
YYYYMMDD
Date de
modification

8 Date N Date de modification au format YYYYMMDD
Date de début
de validité

8 Date N Date au format YYYYMMDD
Date de début d’assignation dans hexagone du
médecin.
Cette date doit être égale à la date de fin du
précédent médecin.
Si pas de médecin précédent, cette date sera
initialisée pas défaut au 01/01/1900 (soit

Date de fin de
validité

8 Date N Date de fin de validité dans hexagone au
format YYYYMMDD
Si = ‘29991231’ cela signifie que c’est le
médecin traitant en cours du patient
Code de l’ancien
médecin traitant

9 S N Code héxagone de l’ancien médecin traitant à
envoyer uniquement s’il s’agit d’un
changement de médecin traitant
N° Adéli de
l’ancien médecin
traitant

9 N N N° Adéli de l’ancien médecin traitant à envoyer
uniquement s’il s’agit d’un changement de
médecin traitant.
N° RPPS du
médecin traitant

11 S N N° RPPS du médecin traitant
N° RPPS de
l’ancien médecin
traitant

11 S N N° RPPS de l’ancien médecin traitant à envoyer
uniquement s’il s’agit d’un changement de
médecin traitant.
Référence Messages HPK.docx © p. 112 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Création / Modification du consentement éclairé d’un patient (ID CE)
Evènements déclenchant l’émission de ce message:

Création :
Pour un séjour, dès que le recueil du consentement a été saisi pour la première fois, le message
est envoyé.
Modification
Pour un séjour, si l’une des informations suivantes a été modifiée :
Le consentement
Opposition au mode d’accès bris de glace
Opposition en mode ‘centre de régulation’
Activation, réinitialisation ou déblocage de l’accès internet du patient (passage False à
True seulement
Modification des canaux OTP (passage de personnel à professionnel et vice-versa)
Rubrique Long. Format Oblig. Commentaires

Type 2 S O ID

Message 2 S O CE
Mode 1 S O C ou M^
Emetteur 15 S O HEXAGONE^
Date de l’envoi 16 Date^ O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° IPP du patient
N° Finess
juridique

9 N O N° Finess juridique de l’établissement
Libellé
utilisateur

50 S O Signature sinon Libellé long sinon Libellé court
sinon identifiant local
Profession S O 1.2.250.1213.1.1.4.6^SECRETARIAT_MEDICAL
Spécialité N Vide
Date du recueil
du
consentement

8 D N Au format^ : YYYYMMDD^
Consentement
éclairé

1 B N T ou F^
Opposition au
mode d’accès
bris de glace

1 B N T ou F^
Opposition au 1 B N T ou F^

Référence Messages HPK.docx © p. 113 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

mode d’accès
régulation
Création/Réactiv
ation du compte
internet

1 B N F ou T
Si ce champ est à false, les canaux OTP ne sont
pas renseignés
No du mobile
canal OTP SMS

50 S N S’il y en a un : N° portable qui sert de canal OTP
Adresse Mail du
canal OTP email

200 S N S’il y en a un : Email qui sert de canal OTP
Code du Proche
représentant
légal

10 S N S’il y en a un : Code proche du représentant
légal
NIR de l’assuré 16 S N NIR de l’assuré
Date naissance
du bénéficiaire

8 S N Date de naissance de bénéficiaire au
format YYYMMDD
Rang de
naissance du
bénéficiaire

1 S N Rang de naissance du bénéficiaire
Qualité du
bénéficiaire

3 S N Qualité du bénéficiaire
NIR du
bénéficiaire

16 S N NIR du bénéficiaire
Référence Messages HPK.docx © p. 114 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

MPI (ID M5)
Evènements déclenchant l’émission de ce message (uniquement si le module MPI.S est installé):
Création d’une référence croisée:Dès qu’un nouvel IPP est affecté dans l’établissement et que le
traitement de rapprochement à rapprocher des IPP avec celui créé, le
message est envoyé.
Modification d’une référence croisée: Dès qu’une information liée au patient est modifiée qui a
impliqué une modification du niveau de rapprochement entre cet IPP et un
autre.
Suppression d’une référence croisée :Dès qu’une suppression d’IPP ou une fusion de deux IPP est
réalisée dans l’établissement.
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
ID = Identification.
Message 2 S O M5
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IDP1 20 S O Identifiant1 rapproché à identifiant2
AANSP1 20 S O Domaine de l’identifiant1
AAUUI1 20 S O Identifiant universel de l’identifiant1
AAUUIT1 20 S O Type d’identifiant de l’identifiant1
IDP2 20 S O Identifiant2 rapproché à identifiant1
AANSP2 20 S O Domaine de l’identifiant2
AAUUI2 20 S O Identifiant universel de l’identifiant2
AAUUIT2 20 S O Type d’identifiant de l’identifiant2
NIVRAP 2 N Niveau de rapprochement renseigné en
création ou modification

Référence Messages HPK.docx © p. 115 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message M1 IY : descriptions des informations psy (Nouveau message version c.06)
Ce message ne sera envoyé que si le du séjour est de la psychiatrie, il sera précédé par un M1 ID
uniquement pour le cas de modification du code secteur, numéro file active ou code protection civile.
Les informations de mode d’hospitalisation et mode d’admission sont associées à un séjour mais pas
à un mouvement. De ce fait toute modification de ce mouvement donnera lieu à l’émission d’un
message M1 IY seul, il est inutile d’envoyer un message M1 IY alors qu’il est certain qu’aucune
modification n’est intervenu sur l’identité.

Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
IY = Informations PSY
Message 2 S O M1
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
No IPP 20 S N No identifiant permanent du patient.
No file active 16 S N No de file active saisie libre
Code protection
civile

1 S N Référencé dans la table HRPROTC
T Mise sous tutelle
C Mise sous curatelle
S Mise sous sauvegarde de justice
Code secteur 3 S N Secteur géographique psy référencé dans
HRCPSY
Type de mode
d’hospitalisation

2 S N Type d’hospitalisation. Un mode
d’hospitalisation se compose du type
HO Hospit. D’office
HL Hospit. Libre
HDT Hospit. Demandée par un tiers
Mode
d’hospitalisation

4 S N Mode référencés dans la table HRPLA
Date 16 Date N Date de prise en compte de ce mode
d’hospitalisation.
N° de mode de
placement

4 N O Numéro de mode de placement
Médecin
responsable

9 S N Code du médecin responsable (champ
PRAACC de la table des praticiens
Référence Messages HPK.docx © p. 116 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Admission d'un Patient (M2)
Evènements déclenchant l’émission de ce message:
Nouvelle venue d’un patient: Dès qu’un n° de séjour (de dossier) est affecté dans l’établissement; qu’il
s’agisse d’une arrivée aux urgences, d’une hospitalisation de jour ou complète,
d’une consultation ou d’une pré admission.
Modification: Modification d’une information portant sur cette entrée directe
(UF, date, mode d’entrée ...)
Suppression: Suppression d’une venue, ce qui revient à la suppression d’un
dossier.

Rubrique (^) Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O M2
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Date d’entrée 14 Date et
heure
O Date au format :
YYYYMMDDHHMISS
Type d’arrivée 2 S O AU Arrivée aux urgences
HU Hosp. suite urgence non confirmée
CU Consult. suite urgence non confirmée
ED Entrée Directe
EX Consultation externe.
Uf 4 N O UF d’entrée : les UF sont recensées dans la table
du noyau HEXAGONE (HXUNITE)
Pré admission 1 S O S’agit-il d’une pré admission O/N
Catégorie de
séjour
1 S O H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions Hospi
T Psychiatriques programmés
Q Résidents programmés
Mode d’entrée 4 S O Mode d’entrée dont la nomenclature est libre
pour l’établissement et recensée dans la table
HEXAGONE (HREAS).
Transporteur 7 S N Transporteur dont la nomenclature est libre pour
l’établissement et recensée dans la table
HEXAGONE (HRPRA)

Référence Messages HPK.docx © p. 117 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Référence Messages HPK.docx © p. 118 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Rubrique (^) Long. Format Oblig. Commentaires
Etablissement 7 S N Etablissement antérieur dont la nomenclature est
libre pour l’établissement et recensée dans la
table HEXAGONE (HRPRA)
Date antérieure 8 D N Date d’hospitalisation antérieure au format
YYYYMMDD.
Chambre 6 S N Chambre
Lit 1 S N Lit
Localisation 10 S N Si la chambre est renseignée. Ces localisations
sont référencées dans le noyau HEXAGONE (HXLO)
UF HEB. 4 N N L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.
N° d’ordre du
mouvement
4 N O No d’ordre pour avoir une clé unique dans le cas
de la modification.
No dossier Mère 9 S N Pour les nouveaux nés
Statut du séjour 1 S O Catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Code PMSI 2 N N Celui associé au mode d’entrée
0 par transfert provisoire
6 en provenance d’une autre UM
7 depuis une autre établissement
8 depuis le domicile
N° FINESS du
transporteur
9 N N Référencé dans la table (HRPRA)
N° FINESS de
l’établissement
d’origine
9 N N Référencé dans la table (HRPRA)
Type
d’hospitalisation
1 S N Valeurs :
V Venues
S Séances
Pour les hospis complètes ou les CX (Vide
ou blanc)
Date de sortie des
urgences
16 Date N Date de sortie des urgences
Date du
mouvement avant
modification
16 Date O Date du mouvement avant modification (présent
seulement en modification)
Contexte de
modification du
mouvement
10 S N Contexte pour lequel la modification du
mouvement intervient. Valeurs :
MOTIF Changement de motif de venue
Autres cas (Vide ou blanc)

Référence Messages HPK.docx © p. 119 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Médecin
responsable

9 S N Code du médecin responsable (champ PRAACC de
la table des praticiens
N° de passage 20 S N = N° de dossier du premier dossier d'hospit d'un
patient du moment où il entre dans une entité
juridique jusqu'au moment où il en sort.
No de dossier créé
à la sortie

9 S N No de dossier créé à la sortie suite à un transfert
vers une autre entité géo ou suite à une mutation
vers un autre champ PMSI
No de dossier
antérieur

9 S N No de dossier antérieur qui a généré la création
du dossier.
Changement de Statut du Séjour (M3)
Evènements déclenchant l’émission de ce message:
Passage d’un dossier d’un état à un autre:

Urgence en hospitalisation
Urgence en consultant externe
Hospitalisé en consultant
Consultant en hospitalisé
Nouveau né vers Hospitalisé
Dans l’application des serveurs, ce message ne sera jamais généré seul. Il s’accompagnera d’un
message M6 (entrée dans une unité de soin).

Rubrique (^) Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O M3
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O No IPP
No dossier 9 S O
Nouveau statut 1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Ancien statut du
séjour
1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents

Référence Messages HPK.docx © p. 120 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Date de fin de
suite donnée

16 Date N Uniquement dans le cas changement de type
de dossier lié à une suite
Motif de venue
d’origine

10 S O Motif de la venue d’origine
UF d’origine 4 N O UF d’origine
Nouveau motif de
venue

10 S O Nouveau motif de la venue
Nouvelle UF 4 N O Nouvelle UF
Date d’origine de
saisie

14 Date N Dans le cas d’une re-génération, date réelle
de saisie de la suite donnée (depuis les
urgences) au format YYYYMMDDHHMISS.
Date du
mouvement avant
modification

16 Date O Date du mouvement avant modification
(présent seulement en modification)
Médecin
responsable

9 S N Code du médecin responsable (champ
PRAACC de la table des praticiens)
N° de passage 20 S N = N° de dossier du premier dossier d'hospit
d'un patient du moment où il entre dans une
entité juridique jusqu'au moment où il en
sort.
No de dossier créé
à la sortie

9 S N No de dossier créé à la sortie suite à un
transfert vers une autre entité géo ou suite à
une mutation vers un autre champ PMSI
No de dossier
antérieur

9 S N No de dossier antérieur qui a généré la
création du dossier.
Référence Messages HPK.docx © p. 121 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Changement de Rattachement du Séjour (M4)
Evènements déclenchant l’émission de ce message:
Lorsqu'on modifie le rattachement d’IPP d’un dossier. Il s’agit d’une transaction qui permet après un
certain nombre de vérification de rattacher automatiquement un séjour à un autre IPP.

Rubrique (^) Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O M4
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
Nouvel IPP 20 S O Nouveau No IPP
No dossier 9 S O No de séjour
Ancien IPP 20 S O Ancien rattachement.
Fusion de patient 1 S N Valeurs possibles :

F si c’est une fusion de patient (F pour
Fusion et non pas pour False)
« « (vide) sinon
Date du
mouvement avant
modification
16 Date O Date du mouvement avant modification
(présent seulement en modification)
Médecin
responsable

9 S N Code du médecin responsable (champ
PRAACC de la table des praticiens)
N° de passage 20 S N = N° de dossier du premier dossier d'hospit
d'un patient du moment où il entre dans une
entité juridique jusqu'au moment où il en
sort.
No de dossier créé
à la sortie

9 S N No de dossier créé à la sortie suite à un
transfert vers une autre entité géo ou suite à
une mutation vers un autre champ PMSI
No de dossier
antérieur

9 S N No de dossier antérieur qui a généré la
création du dossier.
Référence Messages HPK.docx © p. 122 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Entrée du Patient dans l'Unité de Soins (M6)
Evénements déclenchant l’émission de ce message:

Une entrée directe dans l’établissement provoque en plus du message M2 un message M6.
Une confirmation de pré admission
Une entrée par mutation
Une confirmation de pré admission
Une suppression de mouvement
Une modification de la date du mouvement
Rubrique (^) Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O M6
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O No d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Date d’entrée 14 Date et heure O Date au format :
YYYYMMDDHHMISS
Type de
mouvement
2 S O ED Entrée Directe
EM Entrée par mutation
M mutation
R Retour d’absence.
V Venue
S Séance
Uf 4 N O UF du mouvement : les UF sont recensées
dans la table du noyau HEXAGONE (HXUNITE)
Prévision 1 S O S’agit-il d’un mouvement de prévision (O/N)
Chambre 6 S N Chambre
Lit 1 S N Lit
Localisation 10 S N Si la chambre est renseignée. Ces
localisations sont référencées dans le noyau
HEXAGONE (HXLO)
UF HEB. 4 N N L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.
N° d’ordre du
mouvement
4 N O No d’ordre pour avoir une clé unique dans le
cas de la modification.
Statut du séjour 1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants

Référence Messages HPK.docx © p. 123 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Uf d'origine 4 N N UF précédente de mouvement, uniquement
pour les mutations et les retours d'absence si
l'UF de retour est différente de l'UF de
départ.
Code PMSI 2 N N 0
6 depuis une autre unité médicale
7 depuis un autre établissement
8 depuis le domicile
Date du
mouvement avant
modification

16 Date O Date du mouvement avant modification
(présent seulement en modification)
Flag demi-venue 1 Booléen N = T si demi-venue
Médecin
responsable

9 S N Code du médecin responsable (champ
PRAACC de la table des praticiens)
N° de passage 20 S N = N° de dossier du premier dossier d'hospit
d'un patient du moment où il entre dans une
entité juridique jusqu'au moment où il en
sort.
No de dossier créé
à la sortie

9 S N No de dossier créé à la sortie suite à un
transfert vers une autre entité géo ou suite à
une mutation vers un autre champ PMSI
No de dossier
antérieur

9 S N No de dossier antérieur qui a généré la
création du dossier.
Référence Messages HPK.docx © p. 124 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Changement des Conditions de Séjour du Patient (M7)
Evènements déclenchant l’émission de ce message:

Changement de prestation (passage de régime commun à régime particulier ou inversement)
Changement de chambre ou de lit
Changement d’uf d’hébergement
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O M7
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Date du mvt. 14 Date et heure O Date au format :
YYYYMMDDHHMISS
Type de
mouvement

2 S O C Changement de chambre
L Changement de lit
P Changement de prestation
Uf 4 N O UF du mouvement : les UF sont recensées
dans la table du noyau HEXAGONE (HXUNITE)
Prévision 1 S O S’agit-il d’un mouvement de prévision (O/N)
Chambre 6 S N Chambre
Lit 1 S N Lit
Localisation 10 S N Si la chambre est renseignée. Ces
localisations sont référencées dans le noyau
HEXAGONE (HXLO)
UF HEB. 4 N N L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.
N° d’ordre du
mouvement

4 N O No d’ordre pour avoir une clé unique dans le
cas de la modification.
Statut du séjour 1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Date du
mouvement avant

16 Date O Date du mouvement avant modification
(présent seulement en modification)
Référence Messages HPK.docx © p. 125 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

modification
Médecin
responsable

9 S N Code du médecin responsable (champ
PRAACC de la table des praticiens)
N° de passage 20 S N = N° de dossier du premier dossier d'hospit
d'un patient du moment où il entre dans une
entité juridique jusqu'au moment où il en
sort.
No de dossier créé
à la sortie

9 S N No de dossier créé à la sortie suite à un
transfert vers une autre entité géo ou suite à
une mutation vers un autre champ PMSI
No de dossier
antérieur

9 S N No de dossier antérieur qui a généré la
création du dossier.
Référence Messages HPK.docx © p. 126 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Sortie du Patient de l'Unité de Soins (M8)
Evènements déclenchant l’émission de ce message:

Une Sortie définitive de l’hôpital
Une sortie par mutation
Une absence
Une Mutation
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message : MV = Identification.
Message 2 S O M8
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans l’établissement
jusqu’à la sortie définitive.
Date de sortie 14 Date et heure O Date au format : YYYYMMDDHHMISS
Type de
mouvement
2 S O SD Sortie définitive
M Mutation
SM Sortie par Mutation
A Absence
Uf de présence 4 N O UF du mouvement : les UF sont recensées dans la
table du noyau HEXAGONE (HXUNITE)
Chambre 6 S N Chambre
Lit 1 S N Lit
Localisation 10 S N Si la chambre est renseignée. Ces localisations sont
référencées dans le noyau HEXAGONE (HXLO)
UF HEB. 4 N N L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.
Uf dest. 4 N N UF de destination : les UF sont recensées dans la
table du noyau HEXAGONE (HXUNITE)
Prévision 1 S O S’agit-il d’un mouvement de prévision (O/N)
N° d’ordre du
mouvement

4 N O No d’ordre pour avoir une clé unique dans le cas de la
modification.
Statut du séjour 1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Code PMSI 2 N N 0 sorti pour transfert provisoire
6 sorti vers une autre unité médicale
7 vers un autre établissement

Référence Messages HPK.docx © p. 127 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

8 depuis le domicile
9 sorti par décès
Mode absence 4 S N Motif absence dont la nomenclature est libre pour
l’établissement et recensée dans la table HEXAGONE
Date du
mouvement avant
modification

16 Date O Date du mouvement avant modification (présent
seulement en modification)
Date de retour
prévisionnel

16 Date O Date de retour prévisionnel (présente seulement
quand un nombre de jours prévu d’absence a été
saisi).
Médecin
responsable

9 S N Code du médecin responsable (champ PRAACC de la
table des praticiens)
N° de passage 20 S N = N° de dossier du premier dossier d'hospit d'un
patient du moment où il entre dans une entité
juridique jusqu'au moment où il en sort.
No de dossier créé
à la sortie

9 S N No de dossier créé à la sortie suite à un transfert vers
une autre entité géo ou suite à une mutation vers un
autre champ PMSI
No de dossier
antérieur

9 S N No de dossier antérieur qui a généré la création du
dossier.
Sortie du Patient de l'Hôpital (M9)
Evènements déclenchant l’émission de ce message:

Sortie définitive
Saisie d’un nombre de jours pour la durée prévisionnelle du séjour. Envoi d’un mouvement de
type prévisionnel dans ce cas
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O M9
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Date de sortie 14 Date et heure O Date au format :YYYYMMDDHHMISS
Correspond à la date de fin de suite donnée
pour M9|S
Type de
mouvement
2 S O SD Sortie définitive
SU Urgence sans suite
Uf de présence 4 N O UF du mouvement : les UF sont recensées
dans la table du noyau HEXAGONE (HXUNITE)
Chambre 6 S N Chambre
Lit 1 S N Lit
Localisation 10 S N Si la chambre est renseignée. Ces
localisations sont référencées dans le noyau

Référence Messages HPK.docx © p. 128 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

HEXAGONE (HXLO)
UF HEB. 4 N N L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.
Mode de sortie 4 S O Mode de sortie dont la nomenclature est
libre pour l’établissement et recensée dans la
table HEXAGONE (HREAS).
Circonstance de
sortie

2 S N Circonstance de sortie dont la nomenclature
est libre pour l’établissement et recensée
dans la table HEXAGONE (HRCIR)
Prévision 1 S O S’agit-il d’un mouvement de prévision (O/N).
N° d’ordre du
mouvement

4 N O No d’ordre pour avoir une clé unique dans le
cas de la modification.
Statut du séjour 1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Code PMSI 2 N N 6 sorti vers une autre unité médicale
7 vers un autre établissement
8 depuis le domicile
9 sorti par décès
Etablissement 9 S N Etablissement
Date du
mouvement avant
modification

16 Date O Date du mouvement avant modification
(présent seulement en modification)
Médecin
responsable

9 S N Code du médecin responsable (champ
PRAACC de la table des praticiens)
N° de passage 20 S N = N° de dossier du premier dossier d'hospit
d'un patient du moment où il entre dans une
entité juridique jusqu'au moment où il en
sort.
No de dossier créé
à la sortie

9 S N No de dossier créé à la sortie suite à un
transfert vers une autre entité géo ou suite à
une mutation vers un autre champ PMSI
No de dossier
antérieur

9 S N No de dossier antérieur qui a généré la
création du dossier.
Le code PMSI est déduit de la table HREAS dans le cas de l’ED et de la SD, par contre il est déduit par
programme dans le cas des absences et mutations.

Référence Messages HPK.docx © p. 129 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Couverture d’un patient (CV|M1)
Rubrique Long
.

Format Oblig. Commentaires
Type 2 S O Type du message :
CV
Message 2 S O M1
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format : YYYYMMDDHHMISSnn
TTY 50 S N TTY
No IPP 20 S O No identifiant permanent du patient.
Type dossier 1 S O Type de dossier
Numéro dossier 9 S O Numéro de dossier
Prévisionnel 1 S N Valeur O(ui) ou N(on)
Type de couverture 1 S O Type de couverture :
A = Assurance maladie
C = Complémentaire
D = Ddass
P = Particulier
E = Employeur
Numéro de
couverture

2 N O Numéro de couverture
Organisme 10 S O Code Organisme de la couverture
Si type de couverture = P les valeurs possibles sont :
PATIENT ou ASSURE ou Code PROCHE (PERE,
MERE....table HXCPER)
Numéro
d’immatriculation

16 S N Numéro d’immatriculation du patient auprès de
l’organisme
Date de début de
validité

8 D N Date de début de validité (YYYYMMDD)
Date de fin de
validité

8 D N Date de fin de validité (YYYYMMDD)
Bénéficiaire 2 S N Code bénéficiaire (code déduit de la table HRBEN)
01 Assure(e)
02 Conjoint(e)
09 Concubin(e)
10 Enfant
11 1er enfant
12 2eme enfant
13 3eme enfant
30 Autre ayant droit
50 Rang non précise
14 4eme enfant
15 5eme enfant
16 6eme enfant
Rang laser 1 S N Rang laser
Grand régime 2 S N Code grand régime (organisme)

Référence Messages HPK.docx © p. 130 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Code caisse 3 S N Code caisse de l’organisme
Code centre 3 S N Code centre de l’organisme
Clé code organisme 1 S N Clé code organisme
Code pièce 4 S O Code pièce présentée à l'admission
Nom 50 S N Nom de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou Nom de l’employeur (si type = E)
ou Nom du proche (si type = P et organisme = Code proche
)
ou Nom du patient (si type = P et organisme = PATIENT )
Prénom 50 S N Prénom de l’assuré (si type = A ou (type = P et organisme =
ASSURE)
ou Prénom du proche (si type = P et organisme = Code
proche )
ou Prénom du patient (si type = P et organisme = PATIENT
)
Nom de famille de
l’assuré

50 S N Nom de fammile :
de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou du patient (si type = P et organisme = PATIENT )
Date de naissance 8 D N Date de naissance
de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou du proche (si type = P et organisme = Code proche )
ou du patient (si type = P et organisme = PATIENT )
Civilité 4 S N Civilité
de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou du proche (si type = P et organisme = Code proche )
ou du patient (si type = P et organisme = PATIENT )
Adresse1 40 S N Première ligne d’adresse
de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou de l’employeur (si type = E)
ou du proche (si type = P et organisme = Code proche )
ou du patient (si type = P et organisme = PATIENT )
Adresse2 40 S N Deuxième ligne d’adresse
de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou l’employeur (si type = E)
ou du proche (si type = P et organisme = Code proche )
ou du patient (si type = P et organisme = PATIENT )
Code postal 5 N N Code postal
de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou de l’employeur (si type = E)
ou du proche (si type = P et organisme = Code proche )
ou du patient (si type = P et organisme = PATIENT )
Ville 40 S N Ville
de l’assuré (si type = A ou (type = P et organisme = ASSURE)
ou de l’employeur (si type = E)
ou du proche (si type = P et organisme = Code proche )
ou du patient (si type = P et organisme = PATIENT )
Code risque 2 S N Code risque (dossier)
Etat (PEC) 1 S O Etat
P : Présomption
D : Demande
A : Accord
N : Demande non tacite

Référence Messages HPK.docx © p. 131 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

R : Refus
T : Tacite
S : Suspendu
U : Dec Urg
C : Contest
L : Prolongation
H : Hypothèse
F : Accord forcé
Date de début de
PEC

8 D N Date de début de PEC (YYYYMMDD)
Date de fin de PEC 8 D N Date de fin de PEC (YYYYMMDD)
Valeur taux PEC 4 S N Valeur du taux de PEC
Numéro d'accident 9 S N Numéro d'accident (dossier)
Date d'accident 8 D N Date d’accident (YYYYMMDD)
Code contrat pour
l’organisme
complémentaire

10 S N Code contrat pour l’organisme complémentaire
No validité contrat 2 N N No validité contrat (organisme complémentaire)

Référence Messages HPK.docx © p. 132 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Libération de lit pour les séances (MV|L1)
Evènements déclenchant l’émission de ce message:

Libération du lit pour une séance (en création de mouvement).
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O L1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Type de libération 2 SE O « SE » : type de mouvement de la libération
du lit. Attention, différent du typdacc. SE
pour séance car sert pour les autres
libérations.
Bureau 10 S O Bureau sur lequel a été faite la modification
Date de début du
mvt.

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Date de fin du
mvt.

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Type de
mouvement

2 S O S Séance
Date de libération
du lit

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Uf 4 N O UF d’appartenance du mouvement : les UF
sont recensées dans la table du noyau
HEXAGONE (HXUNITE)
Prévision 1 S O S’agit-il d’un mouvement de prévision (O/N)
Etablissement 3 N O Etablissement de la chambre
Code
établissement
géographique

2 N O Code établissement géographique de la
chambre
Bâtiment 8 S O Bâtiment de la chambre
Chambre 6 S O Chambre : peut être vide
Lit 1 S O Lit : peut être vide
Localisation 10 S O Si la chambre est renseignée. Ces
localisations sont référencées dans le noyau
HEXAGONE (HXLO)
UF HEB. 4 N O L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.
N° d’ordre du
mouvement

4 N O No d’ordre pour avoir une clé unique dans le
cas de la modification.
Statut du séjour 1 S O Nouvelle catégorie de dossier :

Référence Messages HPK.docx © p. 133 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Type de séjour 1 S O Type de séjour : typdacc.HVMVT
Mode
d’entrée/sortie/n
ature du
mouvement

4 S N Mode d’entrée/sortie/nature du mouvement
Prescripteur 9 S N Médecin prescripteur
Transporteur 9 S N Transporteur
Etablissement
d’origine

9 S N Etablissement d’origine
Date d’hospi.
Antérieure

8 Date N Date de l’envoi au format :
YYYYMMDD
Coef./Montant
acquis

8.2 N N Coefficient ou montant acquis par les
hospitalisations antérieures
Motif de la venue 10 S N Motif de la venue
Protocole
d’évènement

10 S N Protocole d’évènement
Indicateur de
dernier
mouvement

1 S N Indicateur de dernier mouvement du dossier
Indicateur de
venue ou séance

1 S O Indicateur de venue ou séance
UF d’origine 4 N N UF d’origine (en cas de mutation)
Circonstance de
sortie

2 S N Circonstance de sortie
UF de transfert 4 N N UF de transfert
Indicateur
d’itérativité

1 S N Ne sert que pour les CX : valeurs : ‘O’, ‘N’, ‘D’
(dernière)
Durée du
mouvement de
prévision

3 N N Durée du mouvement de prévision
Séjour
confidentiel

1 B N True ou False
Exercice du
mouvement

4 N N Exercice du mouvement
Durée normale du
séjour

3 N N Durée normale du séjour
Nombre de
séances/venues

3 N N Nombre de séances/venues
Référence Messages HPK.docx © p. 134 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Libération de lit pour les venues (MV|L1)
Evènements déclenchant l’émission de ce message:

Libération du lit pour une venue (en création modification).
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O L1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Type de libération 2 S O « VE » : type de mouvement de la libération
du lit. Attention, différent du typdacc. VE
pour séance car sert pour les autres
libérations.
Bureau 10 S O Bureau sur lequel a été faite la modification
Date de début du
mvt.

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Date de fin du
mvt.

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Type de
mouvement

2 VE O VE pour venue car sert pour les autres
libérations
Date de libération
du lit

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Uf 4 N O UF d’appartenance du mouvement : les UF
sont recensées dans la table du noyau
HEXAGONE (HXUNITE)
Prévision 1 S O S’agit-il d’un mouvement de prévision (O/N)
Etablissement 3 N O Etablissement de la chambre
Code
établissement
géographique

2 N O Code établissement géographique de la
chambre
Bâtiment 8 S O Bâtiment de la chambre
Chambre 6 S O Chambre : peut être vide
Lit 1 S O Lit : peut être vide
Localisation 10 S O Si la chambre est renseignée. Ces
localisations sont référencées dans le noyau
HEXAGONE (HXLO)
UF HEB. 4 N O L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.
N° d’ordre du
mouvement

4 N O No d’ordre pour avoir une clé unique dans le
cas de la modification.
Référence Messages HPK.docx © p. 135 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Statut du séjour 1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Type de séjour 1 S O Type de séjour : typdacc.HVMVT
Mode
d’entrée/sortie/n
ature du
mouvement

4 S N Mode d’entrée/sortie/nature du mouvement
Prescripteur 9 S N Médecin prescripteur
Transporteur 9 S N Transporteur
Etablissement
d’origine

9 S N Etablissement d’origine
Date d’hospi.
Antérieure

8 Date N Date de l’envoi au format :
YYYYMMDD
Coef./Montant
acquis

8.2 N N Coefficient ou montant acquis par les
hospitalisations antérieures
Motif de la venue 10 S N Motif de la venue
Protocole
d’évènement

10 S N Protocole d’évènement
Indicateur de
dernier
mouvement

1 S N Indicateur de dernier mouvement du dossier
Indicateur de
venue ou séance

1 S O Indicateur de venue ou séance
UF d’origine 4 N N UF d’origine
Circonstance de
sortie

2 S N Circonstance de sortie
UF de transfert 4 N N UF de transfert
Indicateur
d’itérativité

1 S N Ne sert que pour les CX : valeurs : ‘O’, ‘N’, ‘D’
(dernière)
Durée du
mouvement de
prévision

3 N N Durée du mouvement de prévision
Séjour
confidentiel

1 B N True ou False
Exercice du
mouvement

4 N N Exercice du mouvement
Durée normale du
séjour

3 N N Durée normale du séjour
Nombre de
séances/venues

3 N N Nombre de séances/venues
➢
Référence Messages HPK.docx © p. 136 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Libération de fin de consultation externe (MV|FX)
Evènements déclenchant l’émission de ce message:

Sélection de la coche de fin de consultation non itérative (en création).
Saisie de la date de dernière consultation itérative (en création).
Validation de facturation d’une consultation non itérative (en création).
Modification de la date du dossier d’une consultation non itérative (en modification).
Modification de la date de dernière consultation itérative (en modification).
Suppression de la date de dernière consultation itérative (en suppression).
Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MV = Identification.
Message 2 S O FX
Mode 1 S O Création (C), Modification (M), Suppression
(S)
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Date de fin de
consultation

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Bureau 10 S O Bureau sur lequel a été faite la modification
Date de début du
mvt.

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Date de fin du
mvt.

14 Date et heure O Date au format :
YYYYMMDDHHMISS
Type de
mouvement

2 S O CX: consultation externe
Uf 4 N O UF d’appartenance du mouvement : les UF
sont recensées dans la table du noyau
HEXAGONE (HXUNITE)
Prévision 1 S N S’agit-il d’un mouvement de prévision (O/N)
Etablissement 3 N N Etablissement de la chambre
Code
établissement
géographique

2 N N Code établissement géographique de la
chambre
Bâtiment 8 S N Bâtiment de la chambre
Chambre 6 S N Chambre : peut être vide
Lit 1 S N Lit : peut être vide
Localisation 10 S N Si la chambre est renseignée. Ces
localisations sont référencées dans le noyau
HEXAGONE (HXLO)
UF HEB. 4 N N L’uf d’hébergement ne sera envoyée que si la
chambre est renseignée.

Référence Messages HPK.docx © p. 137 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

N° d’ordre du
mouvement

4 N O No d’ordre pour avoir une clé unique dans le
cas de la modification.
Statut du séjour 1 S O Nouvelle catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Type de séjour 1 S O Type de séjour : typdacc.HVMVT
Mode
d’entrée/sortie/n
ature du
mouvement

4 S N Mode d’entrée/sortie/nature du mouvement
Prescripteur 9 S N Médecin prescripteur
Transporteur 9 S N Transporteur
Etablissement
d’origine

9 S N Etablissement d’origine
Date d’hospi.
Antérieure

8 Date N Date de l’envoi au format :
YYYYMMDD
Coef./Montant
acquis

8.2 N N Coefficient ou montant acquis par les
hospitalisations antérieures
Motif de la venue 10 S N Motif de la venue
Protocole
d’évènement

10 S N Protocole d’évènement
Indicateur de
dernier
mouvement

1 S N Indicateur de dernier mouvement du dossier
Indicateur de
venue ou séance

1 S N Indicateur de venue ou séance
UF d’origine 4 N N UF d’origine
Circonstance de
sortie

2 S N Circonstance de sortie
UF de transfert 4 N N UF de transfert
Indicateur
d’itérativité

1 S N Ne sert que pour les CX : valeurs : ‘O’, ‘N’, ‘D’
(dernière)
Durée du
mouvement de
prévision

3 N N Durée du mouvement de prévision
Séjour
confidentiel

1 B N True ou False
Exercice du
mouvement

4 N N Exercice du mouvement
Durée normale du
séjour

3 N N Durée normale du séjour
Nombre de
séances/venues

3 N N Nombre de séances/venues
Référence Messages HPK.docx © p. 138 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Messages mouvements d’urgence
Le but est d’envoyer au service échange les mouvements de box, en se rapprochant de la forme de
message HL7 qui veut que dans un message on envoie toujours la localisation origine du patient et sa
localisation destination.
En HL7 on distingue deux types de localisation, Temporaires (les plateaux techniques, salles
d’attentes ...) et définitives (Box).

Mouvements de box B1
Un seul message MU / B1 envoyé pour identifier les évènements suivants :
Arrivée aux urgences et mise en box directe
Changement de box (passage d’un box à un autre)
Sortie des urgences si le patient était dans un box.

Rubrique (^) Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MU = Identification.
Message 2 S O B1
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O No d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Statut du séjour 1 S O catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Date d’entrée
dans le BOX
14 Date et heure O Date au format :
YYYYMMDDHHMISS
UF responsabilité 4 N O UF de responsabilité : les UF sont recensées
dans la table du noyau HEXAGONE (HXUNITE)
Zone d’urgence de
la localisation de
départ.
10 S N La localisation aux urgences est composée de
quatre champs Zone d’urgence, le secteur, le
box, no de box. Dans certains cas les quatre
champs de la localisation de départ peuvent
être nuls, à l’arrivée du patient par exemple.
Les Zones d’urgence sont référencées dans le
noyau HEXAGONE (HXUZONE)
Secteur de départ 10 S N Une zones d’urgence est composée de

Référence Messages HPK.docx © p. 139 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

secteurs typés (Box, Plateaux techniques,
localisation, attentes...) Les secteurs sont
référencées dans le noyau HEXAGONE
(HXUSEC)
BOX de départ 6 S N Dans un secteur de type Box on retrouve les
emplacements Box référencées dans le noyau
HEXAGONE (HXCH avec le champ chtype=’B’)
N° de Box de
départ

1 S N N° d’un Box référencés dans le noyau
HEXAGONE (HXBOX)
Zone d’urgence de
la localisation de
destination.

10 S N La localisation aux urgences est composée de
quatre champs Zone d’urgence, le secteur, le
box, no de box.
Su nul, les quatre champs de la localisation
destinatrice peuvent être nuls, cas de la
sortie des urgences par exemple.
Les Zones d’urgence sont référencées dans le
noyau HEXAGONE (HXUZONE)
Secteur de
destination

10 S N Une zones d’urgence est composée de
secteurs typés (Box, Plateaux techniques,
localisation, attentes...) Les secteurs sont
référencées dans le noyau HEXAGONE
(HXUSEC)
BOX de
destination

6 S N Dans un secteur de type Box on retrouve les
emplacements Box référencés dans le noyau
HEXAGONE (HXCH avec le champ chtype=’B’)
N° de Box de
destination

1 S N N° d’un Box référencés dans le noyau
HEXAGONE (HXBOX)
N° ordre du
mouvement
d’urgence

4 N O C’est un n° interne permettant d’avoir une clé
unique dans HEXAGONE pour les
mouvements d’urgences (part de 1 et on
incrémente à chaque mouvement, attention
quand le patient est hospitalisé le compteur
de mouvement repart à 1 pour la séquence
d’hospitalisation).
Ancienne date du
mouvement

16 Date N Dans le cas de la modification ou la
suppression on aura l’ancienne date du
mouvement
Référence Messages HPK.docx © p. 140 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Mouvements temporaires aux urgences MT
Trois messages distincts sont envoyés pour identifier les évènements suivants :
Départ d’un emplacement temporaire, quelque soit l’emplacement de destination même un
Box.
Arrivée dans un emplacement temporaire, quelque soit l’emplacement de départ même un
Box.
Changement d’emplacement temporaire.

Message M6 (Arrivée dans un emplacement temporaire)
Rubrique (^) Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MT = Identification.
Message 2 S O M6
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O No d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Statut du séjour 1 S O catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Date d’entrée ds
l’emplacement
temporaire
14 Date et heure O Date au format :
YYYYMMDDHHMISS
UF responsabilité 4 N O UF de responsabilité : les UF sont recensées
dans la table du noyau HEXAGONE (HXUNITE)
Zone d’urgence de
la localisation de
départ.
10 S N La localisation aux urgences est composée de
quatre champs Zone d’urgence, le secteur, le
box, no de box. Dans certains cas les quatre
champs de la localisation de départ peuvent
être nuls, à l’arrivée du patient par exemple.
Les Zones d’urgence sont référencées dans le
noyau HEXAGONE (HXUZONE)
Secteur de départ 10 S N Une zones d’urgence est composée de
secteurs typés (Box, Plateaux techniques,
localisation, attentes...) Les secteurs sont

Référence Messages HPK.docx © p. 141 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

référencées dans le noyau HEXAGONE
(HXUSEC)
Emplacement de
départ (exemple
BOX)

10 S N Si type d’emplacement Box, on a le code Box
(sur 6 positions) on retrouve les
emplacements Box référencés dans le noyau
HEXAGONE (HXCH avec le champ chtype=’B’)
Si type Salle d’attente , on a le code salle (sur
6 positions) on retrouve les emplacements
salle d’attente référencés dans le noyau
HEXAGONE (HXCH avec le champ chtype=’T’)
Si type plateaux technique, on peut avoir le
code plateau technique (sur 10 positions)
référencé dans HEXAGONE (HXPLT). Mais
attention la référence aux plateaux
techniques n’est pas obligatoire dans
HEXAGONE auquel cas ce champ est vide.
N° emplacement
de départ

6 S N Si type d’emplacement Box , on a le n° de box
(sur 1 position)
Si type d’emplacement Salle d’attente ce
champ est vide.
Si type plateaux technique, on peut avoir le
code de la salle d’examen (sur 6 positions)
référencé dans HEXAGONE (HXCHPLT). Mais
attention la référence aux salles d’examen
n’est pas obligatoire dans HEXAGONE auquel
cas ce champ est vide.
Type
d’emplacement
destination

1 S O S= Salle d’attente
P= Plateau technique
Zone d’urgence de
la localisation
destination.

10 S O La localisation aux urgences est composée de
quatre champs Zone d’urgence, le secteur, le
box, no de box. Dans certains cas les quatre
champs de la localisation de départ peuvent
être nuls, à l’arrivée du patient par exemple.
Les Zones d’urgence sont référencées dans le
noyau HEXAGONE (HXUZONE)
Secteur
destination

10 S O Une zones d’urgence est composée de
secteurs typés (Box, Plateaux techniques,
localisation, attentes...) Les secteurs sont
référencées dans le noyau HEXAGONE
(HXUSEC)
Emplacement
temporaire
destination

10 S N Si type Salle d’attente , on a le code salle (sur
6 positions) on retrouve les emplacements
salle d’attente référencés dans le noyau
HEXAGONE (HXCH avec le champ chtype=’T’)
Si type plateaux technique, on peut avoir le
code plateau technique (sur 10 positions)
référencé dans HEXAGONE (HXPLT). Mais
attention la référence aux plateaux
techniques n’est pas obligatoire dans
Référence Messages HPK.docx © p. 142 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

HEXAGONE auquel cas ce champ est vide.
N° emplacement
temporairement
destination

6 S N Si type d’emplacement Salle d’attente ce
champ est vide.
Si type plateaux technique, on peut avoir le
code de la salle d’examen (sur 6 positions)
référencé dans HEXAGONE (HXCHPLT). Mais
attention la référence aux salles d’examen
n’est pas obligatoire dans HEXAGONE auquel
cas ce champ est vide.
N° ordre du
mouvement
d’urgence

4 N O C’est un n° interne permettant d’avoir une clé
unique dans HEXAGONE pour les
mouvements d’urgences (part de 1 et on
incrémente à chaque mouvement, attention
quand le patient est hospitalisé le compteur
de mouvement repart à 1 pour la séquence
d’hospitalisation).
Ancienne date du
mouvement

16 Date N Dans le cas de la modification ou la
suppression on aura l’ancienne date du
mouvement
Ce message est envoyé à chaque fois que le patient est mis dans un emplacement temporaire.

Référence Messages HPK.docx © p. 143 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message M8 (sortie d’un emplacement temporaire)
Rubrique (^) Long. Format Oblig. Commentaires
Type 2 S O Type du message :
MT = Identification.
Message 2 S O M8
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O No d’IPP
N° de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
Statut du séjour 1 S O catégorie de dossier :
H Hospitalisés
R Résidents
U Urgences
S Psychiatriques
X Consultants
N Nouveaux nés
P Pré admissions
T Psychiatriques programmés
Q Résidents programmés
Date de sortie de
l’emplacement
temporaire
14 Date et heure O Date au format :
YYYYMMDDHHMISS
UF responsabilité 4 N O UF de responsabilité : les UF sont recensées
dans la table du noyau HEXAGONE (HXUNITE)
Type
d’emplacement
de départ
1 S O S= Salle d’attente
P= Plateau technique
Zone d’urgence de
la localisation de
départ.
10 S O La localisation aux urgences est composée de
quatre champs Zone d’urgence, le secteur, le
box, no de box. Dans certains cas les quatre
champs de la localisation de départ peuvent
être nuls, à l’arrivée du patient par exemple.
Les Zones d’urgence sont référencées dans le
noyau HEXAGONE (HXUZONE)
Secteur de départ 10 S O Une zones d’urgence est composée de
secteurs typés (Box, Plateaux techniques,
localisation, attentes...) Les secteurs sont
référencées dans le noyau HEXAGONE
(HXUSEC)
Emplacement de
départ (exemple
BOX )
10 S N Si type Salle d’attente, on a le code salle (sur
6 positions) on retrouve les emplacements
salle d’attente référencés dans le noyau
HEXAGONE (HXCH avec le champ chtype=’T’)
Si type plateaux technique, on peut avoir le

Référence Messages HPK.docx © p. 144 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

code plateau technique (sur 10 positions)
référencé dans HEXAGONE (HXPLT). Mais
attention la référence aux plateaux
techniques n’est pas obligatoire dans
HEXAGONE auquel cas ce champ est vide.
N° emplacement
de départ

6 S N Si type d’emplacement Salle d’attente ce
champ est vide.
Si type plateaux technique, on peut avoir le
code de la salle d’examen (sur 6 positions)
référencé dans HEXAGONE (HXCHPLT). Mais
attention la référence aux salles d’examen
n’est pas obligatoire dans HEXAGONE auquel
cas ce champ est vide.
Type
d’emplacement
destination

1 S N = B, Box (on pourra faire évoluer ce type
d’emplacement par la suite et suivant les
besoins futurs)
= nul, les quatre champs suivants seront nuls
également car cela signifie que le patient
n’était pas localisé.
S= Salle d’attente
P= Plateau technique
Zone d’urgence de
la localisation
destination.

10 S N La localisation aux urgences est composée de
quatre champs Zone d’urgence, le secteur, le
box, no de box. Dans certains cas les quatre
champs de la localisation de départ peuvent
être nuls, à l’arrivée du patient par exemple.
Les Zones d’urgence sont référencées dans le
noyau HEXAGONE (HXUZONE)
Secteur
destination

10 S N Une zones d’urgence est composée de
secteurs typés (Box, Plateaux techniques,
localisation, attentes...) Les secteurs sont
référencées dans le noyau HEXAGONE
(HXUSEC)
Emplacement
temporaire
destination

10 S N Si type d’emplacement Box, on a le code Box
(sur 6 positions) on retrouve les
emplacements Box référencés dans le noyau
HEXAGONE (HXCH avec le champ chtype=’B’)
Si type Salle d’attente, on a le code salle (sur
6 positions) on retrouve les emplacements
salle d’attente référencés dans le noyau
HEXAGONE (HXCH avec le champ chtype=’T’)
Si type plateaux technique, on peut avoir le
code plateau technique (sur 10 positions)
référencé dans HEXAGONE (HXPLT). Mais
attention la référence aux plateaux
techniques n’est pas obligatoire dans
HEXAGONE auquel cas ce champ est vide.
N° emplacement
temporairement
destination

6 S N Si type d’emplacement Box, on a le n° de box
(sur 1 position)
Si type d’emplacement Salle d’attente ce
champ est vide.
Référence Messages HPK.docx © p. 145 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Si type plateaux technique, on peut avoir le
code de la salle d’examen (sur 6 positions)
référencé dans HEXAGONE (HXCHPLT). Mais
attention la référence aux salles d’examen
n’est pas obligatoire dans HEXAGONE auquel
cas ce champ est vide.
N° ordre du
mouvement
d’urgence

4 N O C’est un n° interne permettant d’avoir une clé
unique dans HEXAGONE pour les
mouvements d’urgences (part de 1 et on
incrémente à chaque mouvement, attention
quand le patient est hospitalisé le compteur
de mouvement repart à 1 pour la séquence
d’hospitalisation).
Ancienne date du
mouvement

16 Date N Dans le cas de la modification ou la
suppression on aura l’ancienne date du
mouvement
Ce message est envoyé à chaque fois que le patient sort d’un emplacement temporaire.

Référence Messages HPK.docx © p. 146 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Actes
Message d’envoi de la codification NGAP (Actes)
On envoie un message par code NGAP, Donc plusieurs messages par bon de saisie. Les codes NGAP
sont toujours présents, il est donc possible de connaître l'exhaustivité des actes en NGAP.
Rubrique Long. Format Oblig. Commentaires
Type 2 S O MK
Message 2 S O K1 (NGAP)
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn (nn=no ligne)
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
No de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
No bon 10 N O No de bon de saisie dans hexagone
Provenance 20 S O HEXAGONE
Produit 20 S O SERVACT
N° de la demande 10 S N No demande (Interne) généré par le Service
Echange uniquement pour les retours d’
actes en provenance de l’extérieur.
Lettre clé
O Codification NGAP

Codification
NABM

4 N N Codification NABM
Date de l’acte 14 Date et heure O Format de la date :
YYYYMMDDHHMISS
Nombre d’actes
2 99 N Si rien on prendra 1

Coefficient de
l’acte

7 9999.99 N Coefficient brut de l’acte. Si rien on prendra 1
Coefficient majoré N A USAGE FUTUR.
Majoration 26 S N (ex : ERF....) concaténation des codes
circonstances génériques des circonstances
appliquées à cet acte dont la correspondance
se trouve dans HVKCP.
Uf demandeuse 4 9999 N
Uf productrice 4 9999 O
Praticien 9 N N No Finess du praticien du bon (= null si pas de
finess dans HRPRA).
Acte nommé 10 S N
Libérale 1 S N =O si l’acte a été pratiqué dans le cadre de
l’activité libérale.
Gratuit 1 S N =0 Acte gratuit
Plateau technique 10 S N Code plateau technique
Salle d’examen 6 S N Code Salle d’examen
Appareil utilisé 8 S N Code Appareillage utilisé

Référence Messages HPK.docx © p. 147 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Référence Messages HPK.docx © p. 148 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Messages d’envoi de la codification CDAM (Actes)
On envoie un message par code CDAM , Donc plusieurs messages par bon de saisie. Les messages en
CDAM ne sont pas forcément disponibles pour tous les actes (par exemple, NABM ), et ils nécessite au
préalable un paramétrage des actes nommés dans le serveur d'actes avec la codification CDAM.

Rubrique Long. Format Oblig. Commentaires
Type 2 S O MK
Message 2 S O K2 (CDAM)
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn (où nn=no de ligne
pour gérer unicité)
Individu 50 S O Individu au sens S3A qui a généré le message.
IPP 20 S O N° d’IPP
No de dossier 9 S O N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie définitive.
No bon 10 N O No de bon de saisie dans hexagone
Provenance 20 S O HEXAGONE
Produit 20 S O SERVACT
No de la Demande 10 S N No de la demande (No Interne généré par le
Serv.Echang / uniquement pour les retours
d’actes en provenance de l’exterieur)
Code CDAM 4 S O Code CDAM
Date de l’acte 14 Date et heure O Format de la date YYYYMMDDHHMISS
Acte nommé 10 S N

Lors de la mise en œuvre de la CCAM , un nouveau message K3 sera
mis en œuvre.
A t t e n t i o n
Référence Messages HPK.docx © p. 149 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Examens
Les demandes d'examens permettent de transmettre sous format HPRIM 1.2 ou 2.1, les demandes
aux divers laboratoires, et d'intégrer le retour toujours sous ce même format HPRIM. Ces messages
ne sont pas transmissibles vers l'extérieur.

Demande d'Examen (A1)
Evènements déclenchant l’émission de ce message:
Création d’une demande d'examen: Lors de la validation d'une demande d'examen, dans le module
Unités de soins.

Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
DE = Identification.
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Poste 16 S O Poste de travail sur lequel la demande a été
saisie.
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Numéro de
demande

10 N O Numéro de la demande
Localisation 10 S O Localisation dans laquelle la demande a été
saisie.

Référence Messages HPK.docx © p. 150 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

MESSAGES RESSOURCES ECONOMIQUES ET FINANCIERES.............................................................................
➢ Marchés :
Création d’un marché dans ELITE.S
Ces enregistrements sont uniquement envoyés par un logiciel de Gestion de Marchés dans ELITE.S.
Les fournisseurs doivent obligatoirement exister dans Hexagone : si tel n’est pas le cas, le marché
sera rejeté.

Message 1 : Entête de Marché

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MT : Marchés Transmis
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O Nom de l’émetteur ( ex : EPICURE)
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de marché 8 S O No de marché attribué par le logiciel émetteur.
ATTENTION dans Elite.S : No sur 6 en numérique avec
les 2 premiers correspondants à l’exercice ( exemple sur
2003, no 030001)
Code fournisseur 6 S O Doit exister dans Hexagone
Raison sociale 35 S O Doit exister dans Hexagone
Code banque 5 N O Doit exister dans les domiciliations bancaires fournisseur
Code guichet 5 N O Doit exister dans les domiciliations bancaires fournisseur
No du compte
bancaire

11 S O Doit exister dans les domiciliations bancaires fournisseur
Clé RIB 2 N O Doit exister dans les domiciliations bancaires fournisseur
Délai de
Paiement

3 N N Nombre de jours. Compris entre 001 et 999
Date de
Consultation

8 Date O Date de lancement de la consultation du marché.
Format YYYYMMDD
Date de
Notification

8 Date O Date de notification au titulaire. Format YYYYMMDD
Date début de
marché

8 Date O Format YYYYMMDD
Date de fin 8 Date O Format YYYYMMDD

Référence Messages HPK.docx © p. 151 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

marché

Marché alloti 1 S O T : pour marché alloti, F sinon
Nbre de lots 2 N N Si marché alloti, donne le nombre de lots associés
Marché à bon de
commande

1 S O Valeurs F pour Non, T pour Oui
Reconductible 1 S O Valeurs F pour Non, T pour Oui
Nbre de
reconductions

3 N O Obligatoire sir code « Reconductible » est à T. Compris
entre 001 et 999.
Gestion Interne 1 S O Valeur F pour Non , T pour Oui.
Pourcentage
maxi de blocage

5 N N Décimalisé à 2.
Type de marché 1 S O Permet d’identifier les contrôles associés. Valeurs
autorisées :
M : Mixte
C : Négocié sans concurrence
T : Travaux
A : Article 30
U : Besoin unique
N : Autres
Nature 1 S O Obligatoire si type = ‘T’ ( Travaux). Valeurs autorisées :
T : Opération de Travaux
O : Ouvrage
Si type de marché différent de ‘T’ : valeur N
Code CMP
dominant

10 S F Obligatoire si type marché = ‘M’.
Groupement
d’achat

1 S O T si marché dans le cadre d’un groupement d’achat, F si
marché propre à l’établissement.
Taux des
Intérêts
moratoires

5 N F Numérique décimalisé à 2. Taux spécifique pour le
marché
Si le marché porte sur plusieurs fournisseurs, on aura autant
d’enregistrements que de fournisseurs différents avec le même
numéro de marché.
 R e m a r q u e

Référence Messages HPK.docx © p. 152 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message 2 : Lignes de Marché transmises

Si le code produit et le compte n’existe pas, la procédure de génération de marchés dans ELITE.S
permettra la saisie sur ces lignes d’un code produit ou d’un compte (hors consommables). Le produit
doit alors avoir été créé dans Hexagone, pour pouvoir être associé à la ligne de marché.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MT : Marchés Transmis
Message 2 S O M2
Mode 1 S O Création
Emetteur 15 S O Nom de l’émetteur : (Ex EPICURE)
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de marché 8 S O No de marché attribué par le logiciel émetteur
ATTENTION dans Elite.S : No sur 6 en numérique avec
les 2 premiers correspondants à l’exercice ( exemple sur
2003, no 030001)
No ligne de
marché

3 N O No de ligne
No de lot 4 N N Obligatoire si marché alloti^
Type de besoin 1 S N pour normal, U pour marché de type besoin unique. Cette valeur
est associée au lot
Code produit 8 S N Obligatoirement renseigné si ligne sur produit
Compte
ordonnateur

10 S N Obligatoirement renseigné si ligne sur compte (marché
hors consommables)
Quantité
minimum
retenue

14 N N Quantité minimum pour les marchés à bon de
commande Décimalisée à 3
Quantité
moyenne

14 N N Quantité moyenne. Décimalisée à 3. Non utilisée dans
ELITE
Quantité
maximum
retenue

14 N N Quantité maximum pour les marchés à bon de
commande Décimalisée à 3. Non utilisée dans ELITE
PU Hors taxe 13 N N Prix unitaire Hors taxe ligne Décimalisé à 4
Date révision
prix

8 Date N Date de révision éventuelle du prix format YYYYMMDD
Taux de TVA
ligne

5 N O Le taux de TVA est obligatoire. Il doit exister dans les
tables d’HEXAGONE Décimalisé à 2
Taux Taxe
supplémentaire

5 N N Si un taux est indiqué, le taux de TVA+le taux de Taxe
doit exister sans les tables des taux Hexagone.
Référence Messages HPK.docx © p. 153 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Décimalisé à 2
Désignation
ligne

70 S O Désignation de la ligne
Code CMP 10 S O Obligatoire code nomenclature du nouveau code des
marchés publics.
Quantité
minimum
livrable

14 N N Décimalisée à 3. Permettra d’alimenter le lien
produit/fournisseur si information présente
Quantité unités
gratuites

14 N N Décimalisée à 3.
Code Interne ou
Externe

1 S N Obligatoire si quantité unités gratuites renseignée.
Valeur I si la quantité gratuite est comprise dans la
quantité négociée. Valeur E si la quantité gratuite non
comprise dans la quantité négociée.
Quantité
négociée

14 N O Quantité négociée sur la ligne.
▪ Transmission des consommations des produits
Ces enregistrements sont uniquement envoyés par ELITE.S pour un logiciel extérieur.
Ces messages sont notamment destinés à alimenter les logiciels de gestion des marchés avec les
consommations des produits stockés constatées dans Hexagone, pour un magasin donné, sur une
période donnée.

Message 1 : Consommations par produit

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MC : Consommations des produits stockés
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
UF Magasin 4 N O Code UF magasin sélectionné lors de l’extraction
Code produit 8 S O Code du produit dans HEXAGONE
Libellé produit 40 S O Libellé du produit dans Hexagone
Unité de gestion 5 S O Ex : BTE, CP, UN ; CARTON. Dans Hexagone table de
paramétrage propre au site.
Quantité
consommée sur

14 N O Décimalisée à 3.
Référence Messages HPK.docx © p. 154 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

la période
Nombre de mois
d’historique

2 N O Nombre de mois sélectionné lors de l’extraction
Code fournisseur
du marché

6 S N Si marché en cours sur ce produit lors de l’extraction, le
code fournisseur est transmis. C’est le code Hexagone
Raison sociale 35 S N Raison sociale du fournisseur du marché
PU HT du
produit

13 N N Prix unitaire du marché, Décimalisé en 4.
Référence Messages HPK.docx © p. 155 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Marchés validés dans ELITE.S:
Création d’un marché
Les marchés peuvent être uniquement envoyés d’ELITE.S vers un autre destinataire.

Message 1 : Entête de Marché

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MA : Marchés
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable de saisie
No de marché 6 N O No de marché attribué par l’établissement
Code du titulaire 6 S O Code Hexagone du fournisseur titulaire du marché
No de
domiciliation
bancaire

3 N O Numéro de domiciliation bancaire du titulaire. Pour
règlement.
Délai de
Paiement

3 N F Nombre de jours. Compris entre 001 et 999
Date de
Consultation

8 Date O Date de lancement de la consultation du marché.
Format YYYYMMDD
Date de
Notification

8 Date O Date de notification au titulaire. Format YYYYMMDD
Date début de
marché

8 Date O Format YYYYMMDD
Date de fin
marché

8 Date O Format YYYYMMDD
Marché alloti 1 S O T : pour marché alloti, F sinon
Nbre de lots 2 N F Si marché alloti, donne le nombre de lots associés
Multi
fournisseurs

1 S O O : si marché multi fournisseur, N si mono fournisseur
Montant Initial 15 N O Montant Initial TTC marché ( décimalisé à 2)
Montant
avenants

15 N O Montant cumulé des avenants ( décimalisé à 2)
A bon de cde 1 S O Valeurs F pour Non, T pour Oui

Référence Messages HPK.docx © p. 156 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Reconductible 1 S O Valeurs F pour Non, T pour Oui
Nbre de
reconductions

3 N O Obligatoire sir code « Reconductible » est à T. Compris
entre 001 et 999.
Gestion Interne 1 S O Valeur F pour Non , T pour Oui.
Pourcentage
maxi de blocage

5 N N Décimalisé à 2.
Type de marché 1 S O Permet d’identifier les contrôles associés. Valeurs
autorisées :
M : Mixte
C : Négocié sans concurrence
T : Travaux
A : Article 30
N : Autres
Nature 1 S O Obligatoire si type = ‘T’ ( Travaux). Valeurs autorisées :
T : Opération de Travaux
O : Ouvrage
Si type de marché différent de ‘T’ : valeur N
Code CMP 10 S F Obligatoire si type marché = ‘M’. Code nomenclature
cadre des marchés publics
Groupement
d’achat

1 S O T si marché dans le cadre d’un groupement d’achat, F si
marché propre à l’établissement.
Taux des
Intérêts
moratoires

5 N F Numérique décimalisé à 2. Taux spécifique pour le
marché
Message 2 : Lignes de Marché

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MA : Marchés
Message 2 S O M2
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de marché 6 N O No de marché attribué par l’établissement
No ligne de
marché

3 N O No de ligne
No de lot 2 N N Obligatoire si marché alloti
Type de besoin 1 S N pour normal, U pour marché de type besoin unique.
Cette valeur est associée au lot
Code produit 8 S N Obligatoirement renseigné si ligne sur produit

Référence Messages HPK.docx © p. 157 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Compte
ordonnateur

10 S N Obligatoirement renseigné si ligne sur compte (sans
produit)
Qté initiale 14 N N Quantité initiale ligne de marché Décimalisée à 3
PU Hors taxe 13 N N Prix unitaire Hors taxe ligne Décimalisé à 4
Date révision
prix

8 Date N Date de révision éventuelle du prix format YYYYMMDD
Code TVA ligne 2 N N Code TVA à appliquer sur la ligne. Code Hexagone, doit
exister dans HXTVA
Montant TTC
ligne

15 N N Montant TTC ligne. Décimalisé à 2
Désignation
ligne

40 S O Désignation de la ligne
Code CMP 10 S O Obligatoire code nomenclature du nouveau code des
marchés publics.

Message 3 : Fournisseurs par marché

Uniquement si marché multi fournisseurs et/ou marché alloti

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MA : Marchés
Message 2 S O M3
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de marché 6 N O No de marché attribué par l’établissement
No de lot 2 N O No de lot associé au fournisseur
Code fournisseur 6 S O Code fournisseur Hexagone associé
No de
domiciliation
bancaire

2 N O No de domiciliation bancaire du fournisseur, pour
gestion des règlements.
Date début 8 Date O Format YYYYMMDD
Date de fin 8 Date O Format YYYYMMDD

▪ Modification de Marché
Mêmes messages que les messages de création dès qu’une information est modifiée avec un mode
« MODIFICATION »

Référence Messages HPK.docx © p. 158 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

▪ Suppression De Marché :
Message 1 : Arrêt d’un marché

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MA : Marchés
Message 2 S O M1
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de marché 6 N O No de marché attribué par l’établissement
Code clôturée 1 S O O : pour marché clôturé

Message 2 : Arrêt d’une ligne de marché

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
MA : Marchés
Message 2 S O M2
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de marché 6 N O No de marché attribué par l’établissement
No ligne marché 3 N O No de ligne clôturée.
Code produit 8 S N Obligatoirement renseigné si ligne sur produit
Compte
ordonnateur

10 S N Obligatoirement renseigné si ligne sur compte
Code CMP 10 S O Obligatoire code nomenclature du nouveau code des
marchés publics.
No de lot 2 N N Obligatoire si marché alloti
Code clôturée 1 S O O : pour ligne de marché clôturée

Référence Messages HPK.docx © p. 159 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Demandes d’approvisionnements :
Création d’une demande
Les demandes sont envoyées d’un destinataire vers ELITE.S. Elles permettent de générer des
commandes après contrôles dans GREF. Les commandes générées dans GREF pourront alors être
récupérées par l’émetteur de la demande.

Message 1 : Entête de demande d’approvisionnement

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
DA : Demandes d’approvisionnements
Message 2 S O DE
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Date de
demande

8 Date O Format YYYYMMDD
No de demande 10 N O No de la demande propre à l’émetteur
UF de gestion 4 N O Code UF de gestion de la commande
Code
Fournisseur

6 S O Code fournisseur Hexagone de la commande.
Code point de
commande

2 N O Point de commande sur lequel on doit générer la
commande. Par défaut la valeur est 01
Objet demande 40 S N Objet de demande
Date de livraison 8 Date N Date de livraison souhaitée. Doit être supérieure ou
égale à la date de demande. Format YYYYMMDD
Nature
commande

1 S O P : demande sur produits, C : demande sur comptes.
Code à
Réceptionner

1 S O O si type de demande Produits ou Compte à
réceptionner dans ELITE (donc saisie d’une livraison
avant la facture)
N : Si demande sur compte sans saisie obligatoire de
réception.
Type de
demande

1 S O Permet d’identifier les cas particuliers pour le CMP :
N : demande Normale
T : demande de travaux
U : demande de type Besoin unique
Exercice 4 N O Exercice comptable d’imputation des engagements

Référence Messages HPK.docx © p. 160 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

d’imputation

Référence Messages HPK.docx © p. 161 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message 2 : Lignes de demande d’approvisionnement externe

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
DA : Demandes d’approvisionnements.
Message 2 S O DL
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Date de
demande

8 Date O Format YYYYMMDD
No de demande 10 S O
No de ligne 3 N O No de ligne de demande : 001 à 999 maximum.
Code produit 8 S O Obligatoire si demande de type Produits, Vide sinon.
Code produit d’Hexagone
Compte
ordonnateur

10 S O Obligatoire si demande de type Comptes : Format Lettre
budget + No de compte
No de Marché 6 N N Obligatoire si l’établissement gère les marchés : indiquer
le numéro de marché hexagone .Sinon mettre 0
No ligne marché 3 N N Obligatoire si No de marché renseigné
No de lot
marché

2 N N Obligatoire si marché renseigné et marché géré avec des
lots.
Quantité
demandée

14 N O Décimalisée à 3. Quantité > 0, si ligne produit doit être
exprimée dans l’unité de gestion associée au message 4
du produit
PU Hors taxe 13 N N Obligatoire pour demande sur compte. Décimalisé à 4.
Montant Hors
taxe

16 N N Obligatoire pour demande sur compte. Montant ligne
en Hors taxe. Décimalisé à 2
Code TVA 2 N N Obligatoire pour demande sur compte. Code TVA
appliqué à la ligne. Le code donne le taux associé dans
HEXAGONE. Doit exister dans HXTVA
Code CMP 10 S O Obligatoire si produit et/ou commande service
No projet 6 N N Envoyer un numéro de projet géré dans Hexagone.
Ligne de texte 1 256 S N Ligne de texte associée à la demande destinée au
fournisseur
Ligne de texte 2 256 S N Suite de la ligne de texte 1
Code Dépense
Imprévisible

1 S O T pour Oui, F pour Non.
Plus utilisé à partir de la version D.02
Les demandes envoyées sont considérées comme valides.

Référence Messages HPK.docx © p. 162 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

La modification ou suppression d’une demande implique la suppression ou modification de la
commande dans ELITE.S qui renvoie les modifications ou suppression de commande.

Référence Messages HPK.docx © p. 163 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Commandes :
Création d’une commande
Les commandes sont envoyées d’ELITE.S vers un autre destinataire.

Message 1 : Entête de commande

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
CO : Commande
Message 2 S O CE
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable d’imputation de la commande
No de
commande
Hexagone

8 N O No de commande d’ELITE.S
No de demande 10 S O No de demande de l’émetteur si commande générée à
partir d’une demande externe
Nom émetteur
dde

15 S N Renseigné si commande générée par une demande
externe.
UF de gestion 4 N O Code UF de gestion de la commande
Code
Fournisseur

6 S O Code fournisseur de la commande.
Code point de
commande

2 N O Point de commande auquel on destine la commande.
Objet
commande

40 S N Objet de commande
Date de
commande

8 Date O Format YYYYMMDD
Date de livraison 8 Date N Date de livraison. Format YYYYMMDD
Montant TTC de
la commande

16 N O Correspond au cumul TTC des lignes de commande
associées. Décimalisé à 2.
Nature
commande

1 S O P : commande sur produits,
C : commande sur comptes.
Code lieu de
livraison

8 S N Code lieu de livraison.
Référence Messages HPK.docx © p. 164 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Code lieu de
facturation

8 S N Code lieu de facturation
Observations 100 S N Zone d’observations destinées au fournisseur
Code à
Réceptionner

1 S O Valeurs transmises :
O si type de commande Produits ou Compte à
réceptionner (donc saisie d’une livraison avant la
facture)
N : Si commande sur compte sans saisie obligatoire de
réception.
Code à Faxer 1 S O Commande à faxer par HEXAGONE : T pour Oui, F pour
Non
Type de
Commande

1 S O Permet d’identifier les cas particuliers pour le CMP :
T : Commande de travaux
Code générée
O/N

1 S O Générée par bordereau de livraison O(Oui) / N(Non)
Raison sociale
Four

40 S O Raison sociale du fournisseur
No Fax 16 S F No de Fax du point de commande
Code robot EDI 5 S F Code identifiant fournisseur pour EDI
Envoi EDI 1 S O Code commande transmise par EDI : T pour Vrai, F pour
Faux
Transférée EDI 1 S O Code déjà transférée EDI : T pour vrai, F pour Faux
Individu
transfert EDI

50 S N Renseigné si transfert EDI déjà fait. Référence de
l’utilisateur ayant lancé le transfert EDI.
Message 2 : Lignes de commande

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
CO : Commande.
Message 2 S O CL
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable d’imputation de la commande
No Commande
Hexagone

8 N O No de commande d’ELITE.S
No de ligne cde 3 N O No de ligne de commande : 001 à 999 maximum.
Code produit 8 S O Obligatoire si Commande de type Produits, Vide si
commande de type Comptes. Code Hexagone

Référence Messages HPK.docx © p. 165 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Compte
ordonnateur

10 S O Obligatoire si Commande de type Comptes : Format
Lettre budget + No de compte
No de Marché 6 N N Obligatoire si l’établissement gère les marchés : numéro
de marché hexagone
No ligne marché 3 N N Obligatoire si No de marché renseigné
No de lot
marché

2 N N Obligatoire si marché renseigné et marché géré avec des
lots.
UF
d’engagement

4 N O UF d’engagement comptable.
Quantité
commandée

14 N O Décimalisée à 3. Quantité > 0, pour ligne produit est
exprimée dans l’unité de conditionnement fournisseur
PU Hors taxe 13 N O Décimalisé à 4.
Montant Hors
taxe

16 N O Montant ligne en Hors taxe. Décimalisé à 2
Pourcentage de
remise

5 N N Pourcentage de remise appliqué sur le Hors taxe.
Décimalisé à 2
Code TVA 2 N O Code TVA appliqué à la ligne.
Montant TTC
Ligne

16 N O Montant TTC de la ligne après calcul de la remise et de
la TVA. Décimalisé à 2
Code CMP 10 S O Obligatoire si produit et/ou commande service
No projet 6 N N
Ligne de texte 1 256 S N Ligne de texte associée à la commande destinée au
fournisseur
Ligne de texte 2 256 S N Suite de la ligne de texte 1
Code Dépense
Imprévisible

1 S O T pour Oui, F pour Non.
Libellé long
produit

150 S N Renseigné si code produit présent
Type produit 3 D N Type de produit : MED = Médicament
MAT = Matériel Médical
DM = Dispositif Médical
FIL = Film Radiologie
PCO = Produits de contraste
Champ vide pour autres produits.
Code UCD 7 N N Envoyé si champ renseigné dans la fiche produit
Quantité en
unité de gestion

14 N O Décimalisée à 3. Quantité > 0, pour ligne produit est
exprimée dans l’unité de gestion du produit dans
l’établissement
▪ Modification de Commande
Mêmes messages que les messages de création dès qu’une information est modifiée avec un mode
« MODIFICATION »

Référence Messages HPK.docx © p. 166 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

▪ Suppression de Commande :
Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
CO : Commande
Message 2 S O CL
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O Exercice comptable d’imputation de la commande
No de
commande
Hexagone

8 N O (^) Si émetteur = HEXAGONE : No de commande d’ELITE.S
Sinon : 0
No de ligne
annulée
3 N O No de ligne de commande : 001 à 999 maximum.
Code produit 8 S O Obligatoire si Commande de type Produits, Vide si
commande de type Comptes. Code Hexagone
Compte
ordonnateur
10 S O Obligatoire si Commande de type Comptes : Format
Lettre budget + No de compte
Quantité
commandée
annulée
14 N O Décimalisée à 3. Quantité > 0, si ligne produit doit être
exprimée dans l’unité de gestion associée au message 4
du produit

Référence Messages HPK.docx © p. 167 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Livraisons provenant de l’extérieur :
Création d’une livraison externe.....................................................................................................
Elles sont envoyées par un autre émetteur dans ELITE.S, le nom de l’émetteur doit être renseigné et il
sera stocké dans la réception ELITE.S qui sera générée si tous les contrôles sont corrects.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
LI : Livraisons externes
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date^ O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Date de livraison 8 Date O Format YYYYMMDD
No de réception
de l’émetteur

10 S O No de réception de l’émetteur
No de
commande de
l’émetteur

10 S O No de commande de l’émetteur
No de
commande
Hexagone

8 N O A préciser si la commande a déjà été générée dans
ELITE.s
No de ligne cde
Hexagone

3 N O No de ligne de commande : 001 à 999 maximum.
Permet de faire le lien avec le numéro de ligne de
commande associée la ligne de livraison
No de Bordereau
de livraison

10 S N No du BL du fournisseur
Code fournisseur 6 S O Fournisseur Hexagone effectuant la livraison
UF magasin de
réception

4 N O Doit exister dans Hexagone et être associée comme UF
magasin principale sur les produits
Code produit 8 S N Obligatoire si ligne sur produit
Compte
ordonnateur

10 S N Obligatoire si ligne sur compte
Quantité livrée 14 N O Décimalisée à 3. Quantité > 0, doit être exprimée dans l’unité de
gestion de stock du magasin. (CF message 4 du produit )
Code ligne de
cde soldée

1 S O Valeurs autorisées : O pour Oui, N pour Non. Valeur à O
permet de savoir si la ligne de commande est soldée en
livraison (cas ou la quantité livrée est strictement
inférieure à la quantité commandée et pas de livraison
du solde prévue).
Référence Messages HPK.docx © p. 168 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

No Marché 6 N N Uniquement renseigné si ligne porte sur un marché
No Lot 2 N N Uniquement si marché alloti
Code CMP 10 S O Obligatoire si produit et/ou commande service
No projet 6 N N Numéro de projet si gestion des projets dans ELITE.S^
Code Dépense
Imprévisible

1 S O T pour Oui, F pour Non
Point de cde
Four.

2 N N Peut être renseigné si réception sans référence à une
commande Hexagone. Sera utilisé pour générer la
commande.
No de ligne
Marché

8 N N No de ligne du marché : Obligatoire si no de marché
transmis
Message 2 : Lignes de Livraison sur produit avec gestion de lot

Ces messages ne sont reçus que pour les lignes de produits ayant un code Gestion des lots et date de
péremption positionné à T. La gestion des lots n’est pas implémentée dans ELITE.S pour les versions
en cours. Ces messages seront traitées dès que le fonctionnel associé sera géré.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
LI : Livraisons externes
Message 2 S O M2
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Date de livraison 8 Date O Format YYYYMMDD
No de réception
de l’émetteur

10 S O No de réception de l’émetteur
No de
commande de
l’émetteur

10 S O No de commande de l’émetteur
No de
commande
Hexagone

8 N O Si la commande a déjà été générée dans ELITE.s
No de ligne cde
Hexagone

3 N O No de ligne de commande : 001 à 999 maximum.
Permet de faire le lien avec le numéro de ligne de
commande associée la ligne de livraison
Code produit 8 S O Code produit Hexagone concerné
No de lot 12 S O No du lot
Date de
péremption

8 Date O Date de péremption du lot reçu
Référence Messages HPK.docx © p. 169 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Quantité reçue 14 N O Le total des lignes par produit doit être égal à la
quantité totale reçue. Décimalisée à 3. Quantité > 0

▪ Modification de lignes de Livraison.........................................................................................
Mêmes messages que les message de création dès qu’une ligne est modifiée avec un code mode à
« M » pour « MODIFICATION »

Pour des rectifications de quantités envoyer la nouvelle valeur à prendre en compte.
Pour une remise à zéro d’une ligne mettre la quantité à zéro. Attention au code’ ligne de commande
soldée’
Si code = O la ligne de commande sera considérée dans GREF comme soldée en livraison et
donc ne pourra plus être associée a une autre réception.
Si code = N La ligne de commande reste en attente de livraison pour la différence entre la
quantité commandée et le cumul des quantités livrées (si ce cumul est inférieur à la quantité en
commande).

Référence Messages HPK.docx © p. 170 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Réceptions :
Création d’une réception
Les réceptions sont envoyées d’ELITE.S vers un autre destinataire.

Message 1 : Lignes de Réception

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
RO : Réceptions
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoie au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice
comptable

4 N O Exercice comptable d’imputation
No réception
Hexagone

8 N O (^) No de réception d’ELITE.S
No de réception
de l’expéditeur
10 S N Si réception générée par une livraison externe, alimenté
avec le numéro transmis par l’expéditeur
Code expéditeur 15 S N Si réception générée par une livraison externe, alimenté
avec la référence transmise dans le message de
l’expéditeur
No de ligne
réception
3 N O No de ligne de réception : 001 à 999 maximum.
Type de
Réception
1 S O Permet d’identifier les cas particuliers pour le CMP :
N : Réception Normale
No de
commande
Hexagone
8 N O (^) No de commande d’ELITE.S associé à la réception
No de ligne cde 3 N O No de ligne de commande : 001 à 999 maximum.
No de Bordereau
de livraison
10 S N No du BL du fournisseur
Code fournisseur 6 S O Fournisseur Hexagone effectuant la livraison
Date de livraison 8 Date O Format YYYYMMDD
UF magasin de
réception
4 N O Doit exister dans Hexagone et être associée comme UF
magasin principale sur les produits
Code produit 8 S N Obligatoire si ligne sur produit
Compte 10 S N Obligatoire si ligne sur compte

Référence Messages HPK.docx © p. 171 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

ordonnateur

Quantité livrée 14 N O Décimalisée à 3. Quantité > 0, est exprimée dans l’unité
de gestion de stock du magasin. (CF message 4 du
produit)
Code ligne de
cde soldée

1 S O Valeurs autorisées : O pour Oui, N pour Non. Valeur à O
permet de savoir si la ligne de commande est soldée en
livraison (cas ou la quantité livrée est strictement
inférieure à la quantité commandée et pas de livraison
du solde prévue).
No Marché 6 N N Uniquement renseigné si ligne porte sur un marché
No Lot 2 N N Uniquement si marché alloti
Code CMP 10 S O Obligatoire si produit et/ou commande service
Code projet 6 N N Numéro du projet
Code Dépense
Imprévisible

1 S O T pour Oui, F pour Non
Message 2 : Lignes de Réception sur produit avec gestion de lot

Ces messages ne sont générés que pour les lignes de produits ayant un code Gestion des lots et date
de péremption positionnée à T. La gestion des lots n’est pas implémentée dans ELITE.S pour les
versions en cours. Ces messages seront traitées dès que le fonctionnel associé sera géré.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
RO : Réceptions
Message 2 S O M2

Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice
comptable

4 N O Exercice comptable d’imputation
No réception
Hexagone

8 N O No de réception d’ELITE.S
No de réception
de l’expéditeur

10 S N Si réception générée par une livraison externe, alimenté
avec le numéro transmis par l’expéditeur
Code Expéditeur 15 S N Si réception générée par une livraison externe, alimenté
avec la référence transmise dans le message de
l’expéditeur

Référence Messages HPK.docx © p. 172 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

No de ligne
réception

3 N O No de ligne de réception : 001 à 999 maximum.
Code produit 8 S O Code produit Hexagone concerné
No de lot 12 S O No du lot
Date de
péremption

8 Date O Date de péremption du lot reçu
Quantité reçue 14 N O Le total des lignes par produit doit être égal à la
quantité totale reçue. Décimalisée à 3. Quantité > 0

▪ Modification de Réception
Mêmes messages que les messages de création dès qu’une information est modifiée avec un mode
« MODIFICATION »

▪ Suppression de Réception :
La suppression concerne soit la totalité de la réception, soit toutes les lignes associées à une
commande.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
RO : Réceptions
Message 2 S O M1
Mode 1 S O Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoie au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice
comptable

4 N O Exercice comptable d’imputation
No réception
Hexagone

8 N O No de réception d’ELITE.S
No de réception
de l’expéditeur

10 S O No de réception de l’expéditeur
Ligne réception 3 N O No de ligne de réception : 001 à 999 maximum.
No de
commande
Hexagone

8 N O No de commande d’ELITE.S
No de
commande de
l’expéditeur

10 S O No de commande de l’expéditeur
Référence Messages HPK.docx © p. 173 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Factures Externes :
Création d’une facture externe.......................................................................................................
Les factures peuvent être envoyées par un autre émetteur dans ELITE.S. Dans ce cas le nom de
l’émetteur doit être renseigné et stocké dans la liquidation ELITE.S qui sera générée si tous les
contrôles sont corrects.

Message 1 : Entête de Facture

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message : FA : Liquidations (factures)
Message 2 S O FE
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoie au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de
liquidation de
l’expéditeur

10 S O No de liquidation de l’émetteur
Type de
Liquidation

1 S O Permet d’identifier les cas particuliers pour le CMP :
N : Réception Normale
Exercice 4 N O Exercice comptable d’imputation de la facture
No de facture 10 S F No de la facture du fournisseur
Code
Fournisseur

6 S O Code fournisseur Hexagone émetteur de la facture.
Code Créancier 6 S O Code fournisseur Hexagone auquel l’établissement doit
payer la facture.
No de
domiciliation

2 N O Obligatoire doit exister dans Hexagone
Délai de
paiement

3 N O Nombre de jours
Objet de la
facture

40 S N Texte
Date facture
fournisseur

8 Date O Date de l’émission de la facture par le fournisseur
Format YYYYMMDD
Date limite de
paiement

8 Date O Format YYYYMMDD Doit être supérieure à la date de
réception de la facture
Date de
réception de la
facture

8 Date O Format YYYYMMDD. Doit être supérieure ou égale à la
date de facture
Référence Messages HPK.docx © p. 174 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Date de saisie de
la facture

8 Date O Format YYYYMMDD. Doit être supérieure ou égale à la
date de réception de la facture
Montant Net à
payer

16 N O Montant TTC net à payer. Positif , doit être égal à la
somme des lignes TTC. Décimalisé à 2
Montant port et
emballage HT

16 N N Montant Hors taxe du port et emballage. Décimalisé à 2.
Code TVA du
Port et
emballage

2 N N Code TVA à appliquer sur le montant Hors taxe du port
et emballage
Pourcentage de
remise global

5 N N Pourcentage de remise global appliqué sur le montant
hors taxe de chaque ligne de facture. Décimalisé à 2
Montant des
avoirs à déduire
de la liquidation

16 N N Montant TTC à déduire. Doit être inférieur au net à
payer. Doit correspondre à la somme des montants des
avoirs TTC à déduire des lignes de factures. Décimalisé à
2
Référence Messages HPK.docx © p. 175 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message 2 : Lignes de facture

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :FA : Liquidations (factures)
Message 2 S O FL
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date^ O Date de l’envoie au format :YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de liquidation
de l’expéditeur

10 S O No de liquidation de l’émetteur
No ligne de
liquidation

3 N O No ligne de liquidation de 001 à 999
No de commande
Hexagone

8 N N Permet le rapprochement des factures et des
commandes. Pour les lignes produits, il faudra avoir
valider les réceptions associées aux commandes pour
valider la facture
No de ligne cde 3 N N No de ligne de commande : 001 à 999 maximum.
Permet de faire le lien avec le numéro de ligne de
commande associée la ligne de facture
Code Produit 8 S N Obligatoire si ligne de facture sur produit
Compte
budgétaire

10 S N Obligatoire si ligne de facture directe sur compte,
Format Lettre Budget+no de compte
No Marché 6 N N Obligatoire si ligne de facture à rapprocher d’un marché.
Si commande, doit être identique sur la ligne de
commande.
No ligne de
marché

3 N N Obligatoire si No marché renseigné
No de lot 2 N N Obligatoire si marché et marché alloti.
Code CMP 10 S N Obligatoire si produit et/ou commande service
Code TVA 2 N O Code TVA à appliquer sur la ligne. Doit exister dans
HEXAGONE : Table HXTVA
Quantité
Facturée

14 N O Positive décimalisée à 3, si commande et produit doit être <= à la
quantité livrée non facturée et être exprimée dans l’unité de gestion
associée au message 4 du produit
Montant Hors
taxe

16 N O Montant hors taxe de la ligne. Décimalisé à 2
Pourcentage
remise

5 N N Pourcentage de remise à appliquer à la ligne de facture.
Décimalisé à 2
Montant du port
et emballage

16 N N Décimalisé à 2. Le total des lignes doit être égal au
montant port et emballage de l’entête.
Montant TTC 16 N O Montant TTC de la ligne : Le total des lignes doit être
égal au montant net à payer de l’entête. Décimalisé à 2

Référence Messages HPK.docx © p. 176 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Montant avoir à
déduire

16 N N Montant de l’avoir à déduire de la ligne. : Le total des
lignes doit être égal au montant des avoirs de l’entête.
Décimalisé à 2
Code
récupération de
TVA

1 S O Valeurs autorisées :
N : TVA non récupérable
P : TVA partiellement récupérable
T : TVA totalement récupérable
Taux TVA à
récupérer

5 N N Obligatoire si Code récupération est à ‘P’ et gestion de
Taux différents de récupération. Si taux unique, on
prend celui paramétré dans Hexagone
Montant TVA à
récupérer

16 N N Obligatoire si code récupération différent de N.
Décimalisé à 2
UF d’affectation 4 N O Code UF de l’affectation de la ligne de facture.
Si produit stocké non entrée/sortie doit être une UF de
magasin principal.

No de projet 6 N N (^) Doit exister dans ELITE.S
Code Dépense
imprévisible
1 S O T pour Oui, F pour Non
Toutes les factures transmises et générées dans ELITE.S ne pourront
pas être renvoyées en modification ou suppression. Ces manipulations
devront être faites dans ELITE.S directement.
A t t e n t i o n

Référence Messages HPK.docx © p. 177 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Mouvements de stocks internes:
Création d’un Mouvement de stock interne
Ces mouvements sont transmis par un autre émetteur dans ELITE.S, ou par un système de lecture
code barre, dans ce cas le nom de l’émetteur doit être renseigné et stocké dans les pièces générées
dans ELITE.S si tous les contrôles sont corrects.

Ces messages concernent uniquement les produits gérés en stock et non gérés en entrées/sorties
simultanées:
Les sorties de stock classiques des magasins et / ou armoires de service :
Consommations de produits par les services, et gestion des retours de service. Dans ce cas, 2
possibilités sont offertes :
Soit les mouvements transmis sont déjà valorisés par le système émetteur,
dans ce cas la valorisation du mouvement sera comptabilisée telle quelle dans
ELITE.S. L’intégration de ce mouvement génère un bon de régularisation de sortie
de stock.
(Message de type SO, code Message S1 avec champ Valeur de la sortie renseignée)
Soit les mouvements transmis sont uniquement quantitatifs, dans ce cas la
valorisation sera effectuée dans ELITE.S lors de l’arrêté de balance définitive :
L’intégration de ces mouvements génère des bons de sorties normaux..
(Message de type SO, code Message S1 avec champ Valeur de la sortie non
renseignée)
Les inventaires de stock par magasin et / ou armoire de service:
Ces mouvements permettront de générer un état d’inventaire qui sera rapproché du stock
géré dans ELITE.S dans les procédure de gestion des inventaires des stocks. Ces messages sont
purement quantitatif.
(Message de type SO, code Message I1 avec champ Valeur de la sortie non
renseignée)
Les transferts entre magasins de l ‘établissement
Ces mouvements permettront de gérer dans ELITE.S les mouvements entre magasins et / ou
armoires de service à l’intérieur de l’établissement. Ces mouvements ne rentrent pas dans la
comptabilisation des consommations.
(Message de type SO, code Message T1 avec champ Valeur de la sortie non
renseignée)

Référence Messages HPK.docx © p. 178 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Message 1 : Mouvements de stock

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
SO : Mouvements de stock
Message 2 S O S1 ou I1 ou T1
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoie au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Date
Mouvement

8 Date O Date du mouvement : format YYYYMMDD
Code UF
magasin

4 N O Pour tous les types de codes Messages :
Code de l’ UF magasin effectuant la sortie de stock ou
l’inventaire ou le transfert
Code armoire 4 S N Pour tous les types de codes Messages et si gestion des
armoires dans ELITE.S : Code de l’armoire associée à l’
UF magasin effectuant la sortie de stock ou l’inventaire
ou le transfert
No de bon 10 S N No de bon attribué par le système émetteur.
Code UF
destinatrice

4 N O Pour les messages S1 : UF destinatrice de la sortie ou
faisant le retour
Pour les messages I1 : Mettre 0000
Pour les messages T1 : UF magasin réceptionnant le
produit transféré
Code Armoire de
l’ UF destinatrice

4 S N Uniquement renseigné si gestion des armoires dans
ELITE.S.
Pour les messages S1 : Code armoire associé à UF
destinatrice de la sortie ou faisant le retour
Pour les messages I1 : Mettre 0000
Pour les messages T1 : Code armoire de l’ UF magasin
réceptionnant le produit transféré
Code produit 8 S O Identifiant du produit dans ELITE.S : peut être soit le
code produit soit le code CIP paramétré sur la fiche
produit.
Quantité produit 14 N O Décimalisée à 3. Peut être négative dans le cas d’un
message S1 (retour ). Elle doit être exprimée dans
l’unité de gestion associée au message 4 du produit
Valeur produit 16 N N Peut être renseignée uniquement si message S1 et peut
être négative.
Décimalisée à 2
Numéro du lot 12 S N Obligatoire uniquement si produit codé avec gestion des

Référence Messages HPK.docx © p. 179 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

lots et dates de péremption
No dossier
Patient

9 S N No dossier patient HEXAGONE si connu
▪ Envoi des liste pré établies
Les listes Pré établies sont envoyées d’ELITE.S vers un autre destinataire.
Elles sont élaborées par Magasin pour chaque UF cliente et elles donnent la liste des produits
disponibles avec éventuellement les quantités de dotations préconisées

Message 1 : Listes pré établies

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
SO : Sorties
Message 2 S O L1 : liste pré établie
Mode 1 S O Création
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoie au format : YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Exercice 4 N O
UF Magasin 4 N O UF magasin émetteur
Code Armoire 4 S N Code armoire ( si pas de gestion des armoires 0000)
UF cliente 4 N O UF cliente associée à la liste
Code Armoire
Cliente

4 S N Code de l’armoire associée à l’UF cliente. Si pas de
gestion des armoires valeur 0000
Code liste 8 S O Nom de la liste
Code produit 8 S O Code produit
No de ligne 3 N O No de ligne de la liste
Libellé produit 40 S O
Quantité
dotation

12 N F Décimalisé à 3. Quantité de dotation calculée ou saisie
Consommation
Moyenne

12 N F Consommation moyenne journalière calculée si
génération par le calcul de dotation
Nombre de
lignes de sortie

8 N F Nombre de lignes de sorties prise en compte dans le
calcul de dotation
Référence Messages HPK.docx © p. 180 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Recettes diverses:
Création d’un Mouvement de recettes diverses
Ces mouvements sont transmis par un autre émetteur dans HEXAGONE. Dans ce cas le nom de
l’émetteur doit être renseigné et stocké dans les pièces générées dans HEXAGONE si tous les
contrôles sont corrects.

Message 1 : Entête de pièce

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
RD : Pièce de recettes diverses
Message 2 S O E1
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de pièce de
l’expéditeur

10 S O No d’identifiant unique de la pièce
Exercice 4 N O Exercice comptable d’imputation de la pièce
Code débiteur 6 S O Code débiteur destinataire du titre à émettre.
Majuscules uniquement
Nom Débiteur 35 S O Dénomination du débiteur : Majuscules
Adresse 1 40 S N Adresse 1 du débiteur
Adresse 2 40 S N Suite adresse
Code postal 5 N O Code postal débiteur
Ville 40 S N Ville débiteur
Compte de tiers 7 N O Compte de tiers associé au débiteur
Type débiteur 1 N O Valeurs autorisées :
1 & 2 : Sécurité sociale
3 & 4 : Mutuelle
5 & 6 : DDASS
7 : Particulier
8 : Débiteur en instance
Code transfert
HTITRE débiteur

4 S N Obligatoire si type débiteur différent de 7 et 8
Montant TTC
pièce

16 N O Obligatoirement positif. Décimalisé à 2, doit être égal au
cumul des montants TTC lignes
Code soumis à
reversement de
TVA

1 N O Valeurs autorisées :
O = Pièce soumise reversement de TVA
N = Pièce non soumise à reversement TVA
Référence Messages HPK.docx © p. 181 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Objet 100 S N Objet de la pièce
Type de recette 1 N O Valeurs autorisées :
0 : Titre à recouvrer
1 : Perçue avant émission
2 Opération d’Ordre
Date de pièce 8 Date O YYYYMMDD
Code Avis des
sommes à payer

1 S O Code édition d’un avis des sommes à payer en plus du
titre : O pour Oui, N pour Non
Message 1 : Lignes de pièce

Rubrique Long. Forma
t

Oblig
.
Commentaires
Type 2 S O Type du message :
RD : Pièce de recettes diverses
Message 2 S O L1
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoie au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
No de pièce de
l’expéditeur

10 S O No d’identifiant unique de la pièce
No de ligne 3 N O Numéro de ligne 001 à 999
Compte
budgétaire

10 S O Format Lettre budget + No compte
Code UF 4 N O Code UF d’affectation de la recette, doit appartenir
au même établissement géographique que les
autres lignes de cette pièce
Quantité 11 N N Quantité de la ligne. Décimalisé à 3
PU Hors taxe 16 N O Montant Hors taxe si le code reversement TVA de
l’entête est positionné à O et ligne soumise à
reversement de TVA. Montant TTC sinon.
Décimalisé à 4
Code TVA 2 N N Obligatoire si code reversement TVA de l’entête est
positionné et ligne soumise à reversement de TVA.
Doit exister dans HEXAGONE, Table HXTVA
Montant TTC
ligne

16 N O Le cumul des TTC lignes doit correspondre au TTC
de l’entête. Décimalisé à 2
Référence Messages HPK.docx © p. 182 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Désignation 31 S F Désignation de la ligne de pièce qui est reprise sur
les titres.

Référence Messages HPK.docx © p. 183 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Inventaires pour les biens immobilisés:
Création d’un Mouvement d’inventaire
Ces mouvements sont transmis par un autre émetteur dans HEXAGONE.
Dans ce cas le nom de l’émetteur doit être renseigné et stocké dans les pièces générées dans
HEXAGONE si tous les contrôles sont corrects.

Rubrique Long. Format Oblig. Commentaires

Type 2 S O Type du message :
IM : Mouvements d’inventaire
Message 2 S O M1
Mode 1 S O Création
Emetteur 15 S O NOM EMETTEUR
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu
(émetteur du
message)

50 S O Individu au sens S3A qui a généré le message.
Date inventaire 8 Date O Date : YYYYMMDD
Code UF 4 N O Code de l’ UF pour lequel l’inventaire est fait
Exercice Fiche 4 N O Exercice de la fiche
No de fiche 5 N O No de fiche
No d’ inventaire 3 N O No de l’inventaire ( la combinaison exercice+no
de fiche+ no d’inventaire est l’identifiant code
barre).
Nombre de
composants

1 N N Nombre de composants associé à l’identifiant du
bien immobilisé.
Référence Messages HPK.docx © p. 184 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

EXEMPLES D’EVENEMENTS ET MESSAGES ASSOCIES :
Arrivée aux urgences :
Type Message Mode Commentaire
MV M2 C Arrivée dans l’établissement
MV M6 C Entrée dans l’unité de soins des urgences

Hospitalisation suite urgence :
Type Message Mode Commentaire
MV M3 C Changement de statut du dossier qui
passe de dossier d’urgence à dossier
d’hospitalisation. Cette manipulation est
saisie par les urgences.

Confirmation de suite hospitalisation :
Type Message Mode Commentaire
MV M6 C Entrée dans l’unité de soins effective.
C’est soit l’unité de soin qui confirme
l’information à la vue du patient ou
quand il veut le mettre dans un lit. Soit
les services administratifs qui récupèrent
le dossier pour le compléter.

Consultation externe suite urgence :
Type Message Mode Commentaire
MV M3 C Changement de statut du dossier qui
passe de dossier d’urgence à dossier
d’hospitalisation. Cette manipulation est
saisie par les urgences.

Confirmation de suite consultation :
Type Message Mode Commentaire
MV M6 C C’est soit l’unité de soin qui confirme
l’information au moment de saisir les
actes. Soit les services administratifs qui
récupèrent le dossier pour le compléter.

Autres suites urgence
Type Message Mode Commentaire

Référence Messages HPK.docx © p. 185 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

MV M8 C Sortie de l’uf d’urgence
MV M9 C Sortie de l’établissement

Référence Messages HPK.docx © p. 186 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Entrée directe
Type Message Mode Commentaire
MV M2 C Arrivée dans l’établissement
MV M6 C Entrée dans l’unité de soins

Mutation après une entrée directe
Type Message Mode Commentaire
MV M8 C Sortie unité d’origine
MV M6 C Entrée dans l’unité de soins de la
mutation.

Mutation insérée entre deux mouvements
(Insertion d’un mouvement de mutation MV1bis entre deux mutations MV1 et MV2)
Type Message Mode Commentaire
MV M6 C Entrée dans l’unité de soin de la
mutation
Mouvement Mvbis.
MV M8 C Sortie de l’uf de mutation (MV1bis)
MV M6 M Modification de l’uf origine du
mouvement MV2.

Sortie définitive
Type Message Mode Commentaire
MV M8 C Sortie unité de soin
MV M9 C Sortie de l’établissement

Pré admission
Type Message Mode Commentaire
MV M2 C Saisie d’une arrivée prévue à l’hôpital
MV M6 C Entrée prévue dans une unité de soin.

Confirmation d’une pré admission
Type Message Mode Commentaire
MV M2 M Saisie d’une arrivée effective à l’hôpital
MV M6 M Confirmation de l’entrée dans une unité
de soin.

Nouveau né hospitalisé :
Type Message Mode Commentaire
MV M3 C Changement de statut du dossier qui

Référence Messages HPK.docx © p. 187 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

passe de nouveau-né à hospitalisé
MV M8 C Sortie de la pouponnière.
MV M6 C Entrée dans l’uf d’hospit.

Référence Messages HPK.docx © p. 188 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Changement de chambre :
Type Message Mode Commentaire
MV M7 C Changementt de chambre

Suppression d’un dossier :
Type Message Mode Commentaire
MV M2 S Suppression du séjour par la transaction
spécifique ou suppression du dernier
mouvement si celui ci est une entrée
directe.

Suppression d’un patient avec n dossiers
Type Message Mode Commentaire
MV M2 S Suppression dossier 1
MV M2 S Suppression dossier n
ID M1 S Suppression patient.

Fusion de deux patients
Type Message Mode Commentaire
MV M4 C Suppression dossier 1
MV M4 C Suppression dossier n
ID M1 S Suppression patient.

➢ Admission aux urgences
Arrivée aux urgences sans localisation
Dans un premier temps le patient est enregistré

Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MV M2 C Arrivée dans
l’établissement
MV M6 C Entrée dans l’unité de
soins des urgences

Dans un second temps le patient est mis en box ou en salle d’attente

Mise en box

Type Message Mode Emplacement départ Emplacement Commentaire

Référence Messages HPK.docx © p. 189 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

destination
MU B1 C Néant Zone|Secteur|box|n° Entrée dans le box

Mise en salle d’attente

Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MT M6 C Néant S|Zone|Secteur|salle Entrée dans un
emplacement
temporaire

Arrivée aux urgences et mis en salle d’attente
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MV M2 C Arrivée dans
l’établissement
MV M6 C Entrée dans l’unité de
soins des urgences
MT M6 C Néant S|Zone|Secteur|salle Entrée dans un
emplacement
temporaire

Arrivée aux urgences et mise en box
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MV M2 C Arrivée dans
l’établissement
MV M6 C Entrée dans l’unité de
soins des urgences
MU B1 C Néant Zone|Secteur|box|n° Entrée dans le box

➢ Mouvements possibles aux urgences
Passage d’un BOX vers la radio
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MT M6 C B|Zone|Secteur|box P|Zone|Secteur|salle Entrée dans un
emplacement
temporaire

Changement de box
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MU B1 C Zone|Secteur|box|n° Zone|Secteur|box|n° Changement de box

Référence Messages HPK.docx © p. 190 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Retour au box suite à une radio
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MT M8 C P|Zone|secteur|salle
d’examen

B|Zone|Secteur|box|
n°
Sortie d’un
emplacement
temporaire
Passage de salle d’attente vers la radio
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MT M8 C S|Zone|Secteur|salle P|Zone|secteur|salle
d’examen

Sortie d’un
emplacement
temporaire
MT M6 C S|Zone|Secteur|salle P|Zone|secteur|salle
d’examen

Entrée dans un
emplacement
temporaire
Passage de la radio vers le scanner
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MT M8 C P|Zone|secteur|salle
de radio

P|Zone|secteur|salle
de scaner
Sortie d’un
emplacement
temporaire
MT M6 C P|Zone|secteur|salle
de radio

P|Zone|secteur|salle
de scaner
Entrée dans un
emplacement
temporaire
Sortie des urgences
Le patient est dans un box suite Hospitalisation ou consultation externe
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MU B1 C Zone|Secteur|box|n° Sortie du box
MV M3 C Changement de
statut du dossier qui
passe de dossier
d’urgence à dossier
d’hospit.

Le patient est dans un box il est hospitalisé en lit porte mais reste dans le box
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MV M3 C Changement de
statut du dossier qui

Référence Messages HPK.docx © p. 191 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

passe de dossier
d’urgence à dossier
d’hospit.
Référence Messages HPK.docx © p. 192 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Quand le patient sera hébergé réellement dans une chambre de la localisation lit porte
Type Message Mode Emplacement départ Emplacement
destination

Commentaire
MV M6 C Confirmation entrée
aux lits porte.
MU B1 C Zone|Secteur|box|n° Sortie du box
MV M2 M Modification ED pour
mise en lit
MV M6 M Mise en lit

Référence Messages HPK.docx © p. 193 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

CAS PARTICULIERS DE DEMANDES FAITES AUX SERVEURS
Il serait préférable d'utiliser pour ce faire le module HEXAHUB.

➢ Serveur d'Identité
On peut faire au serveur d’identité une demande de création d’IPP provisoire. Pour se faire il faut
envoyer un message de type M1 dont la structure est décrite en page 5. Dans ce message, seules les
informations connues seront envoyées. Le n° IPP ne devra pas être envoyé, s’il l’est il sera ignoré.
Ce message sera pris en charge par le Service Echange qui activera le composant HEXAGONE chargé
de créer cet IPP et qui reverra le no IPP à l’application demandeuse. Par la suite le message M1
(création d’un IPP) sera envoyé à toutes les applications externes par la procédure normale de
création d’un patient dans le serveur. Cet IPP sera “ topé ” comme provisoire jusqu’à ce qu’un
utilisateur aille valider les informations du patient.

Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
DD = Identification.
Message 2 S O M1
Mode 1 S O Création (seule la création est autorisée).
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le
message.
Nom 50 S O Nom usuel
Prénom 50 S N Prénom(s)
Date naissance 8 Date N Au format : YYYYMMDD
Nom jeune fille 50 S N Nom patronymique n’est renseigné que
dans le cas de femmes mariées.
Civilité 4 S N Abréviation recensée dans la table des
civilités HEXAGONE (HRCIV).
Situation fam. 1 S N Situation de famille abrégée recensée
dans la table HEXAGONE (HRSFA).
Nbre d’enfants 2 N N
Nationalité 3 S N Nomenclature INSEE
Lieu de naiss. 64 S N Lieu de naissance
Adresse :
Ligne 1
Ligne 2
Code postal
Ville
Canton

40
40
5
40
5
S
S
N
S
N
N
N
N
N
N
Première ligne adresse
Deuxième ligne adresse
Code postal
Ville
Code canton
Référence Messages HPK.docx © p. 194 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

Zone téléphone 100 S N Zone libre de 100 caractères pour
indiquer un ou plusieurs no de
téléphones.
Médecin traitant 35 S N Médecin traitant

Rubrique Long. Format Oblig. Commentaires
Catég. Socio p 3 S N Catégorie socio professionnelle
Nomenclature INSEE
Activ. Socio. P 3 S N Activité socio professionnelle
Nomenclature INSEE
Date cess. Act 8 Date N Date de cessation d’activité au format :
YYYYMMDD
Poids de naiss. 7 9999.99 N Poids à la naissance
Taille naiss. 6 999.99 N Taille à la naissance
Heure naiss. 2 N N Heure de naissance
Sexe 1 S N Sexe du patient

Référence Messages HPK.docx © p. 195 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

➢ Serveur d'Actes
On peut envoyer au serveur d’acte des messages contenant des actes à intégrer dans le serveur
d’actes et qui remonteront dans le dossier du patient.
Ils devront avoir le format suivant:

Rubrique Long. Format Oblig. Commentaires
Type 2 S O Type du message :
DD = Demande création actes.
Message 2 S O K1
Mode 1 S O Création, Modification, Suppression
Emetteur 15 S O HEXAGONE
Date de l’envoi 16 Date O Date de l’envoi au format :
YYYYMMDDHHMISSnn
Individu 50 S O Individu au sens S3A qui a généré le
message.
IPP 10 S O N° d’IPP
No de dossier 9 S O^ N° du séjour stable de l’entrée dans
l’établissement jusqu’à la sortie
définitive.
N° de la
demande

10 N O Correspondra au numéro de bon dans
HEXAGONE
Lettre clé
O Codification NGAP

Date de l’acte 14 Date et heure O Format de la date :
YYYYMMDDHHMISS
Nombre d’actes
2 99 N Si rien on prendra 1

Coefficient de
l’acte

7 9999.99 N Si rien on prendra 1
Coefficient
majoré

N Si rien on considère qu’il n’y a pas de
majoration.
Majoration 1 S N F férié
D Dimanche
N Nuit
Montant 11 99999999.99 N Montant valorisé
Circonstance 15 S N Plâtre
Au pied du lit ...
Uf demandeuse 4 9999 N
Uf productrice 4 9999 O
Praticien 7 S N Si rien, on prendra celui par défaut
paramétré dans hexagone pour uf et le
code NGAP.
Acte nommé 10 S N

Référence Messages HPK.docx © p. 196 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

SPECIFICATIONS DU SERVICE ECHANGE
➢ Schéma Fonctionnel
SGBD
HNRMES
SGBD
HNRMES
SGBD
HNEMISDES
SGBD
HNEMISDES
ServiceEchange

1
SCRUTE (MODE ASYNCHRONE)
2
TOP DE PRISE DE CHARGE
3
GENERATION DE LA TABLE DES
MESSAGES EMIS PAR DESTINATAIRE.
ACTIVATION DES COMPOSANTS
FOURNIS PAR LES APPLICATIONS
➢ Spécificités Fonctionnelles
Le Service Echange fait l’objet d’un module spécifique HN.
Les composants du Service Echange sont paramétrables par message et application.
Un service, composant, prend en charge le message et renvoie un accusé de réception.
Des compte-rendus de la communication sont générés. Cela permet une exploitation statistique des
déroulement des communications.

Structure de l’accusé de réception
Accusé de Réception Booléen prenant les valeurs T (True) ou F (False)
Code Retour 0, 1, 2, 3 ou 50
Statut Code d'erreur en cas de retour d'erreur (code retour différent de 0)
Libellé Géré par l’application qui a reçu le message. Ce code peut par
exemple contenir le numéro d'IPP dans le cas d'une demande de
création d'identité ou le libellé d'une éventuelle erreur. Il ne doit

Référence Messages HPK.docx © p. 197 / 197
Toute reproduction, même partielle, tout transfert à un tiers sous quelque forme que ce soit,

pas dépasser 50 caractères.
Informations à répercuter vers les autres applications......................................................................
Mettre en place une nomenclature des composants / destinataires afin de pouvoir éventuellement
les “ dispatcher ” facilement sur des machines différentes pour des raisons de performances ou les
déclarer dans le fichier d'assignation du Service Echange.

Structure des tables du Service Echange
La liste des tables du module service échange de Hub.s, est disponible sur le CDROM et en
téléchargement.
Elle se nomme mcd_echange.pdf, et est remise a jour a chaque livraison de version.

➢ Composants Externes
Service de demande de création d'IPP.
DLL livrée dans le répertoire outil d'Hexagone.

Signature de l'opération:
long __declspec(dllimport) OP_HN_CREIPP(
char* pszCompte,
char* pszMessage,
long* plCodeRetour,
long* plStatus,
char* pszLibelle);

Description des paramètres:
pszCompte
Etablissement dans lequel il faut créer l'IPP. Ce paramètre doit être sous la forme KALAMxx où xx
correspond au numéro d'établissement.
pszMessage
Message ID, M1, C sous la forme décrite à la page 15.
plCodeRetour
Code retour renvoyé par le Service Echange (0, 1 ou 2).
plStatus
Statut d'erreur en cas de code retour différent de 0.
pszLibelle
Si le traitement s'est bien passé, ce paramètre contient le numéro d'IPP; sinon, il contient le libellé
de l'erreur retournée.

Il est préférable d’utiliser les fonctions de HUB.s (hexahub), pour ce type de fonction.