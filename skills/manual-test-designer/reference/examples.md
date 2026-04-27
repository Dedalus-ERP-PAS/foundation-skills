# Examples — Input → Output

Three real-world examples showing user story input and the generated CSV + JDD output.

---

## Example 1: Authentication (Simple — Login/Logout)

### Input (User Story excerpt)

> En tant qu'utilisateur SRD, je veux me connecter et me déconnecter de l'application afin d'accéder de manière sécurisée à mes fonctionnalités.
>
> **AC1**: Connexion avec identifiants valides → redirection vers page d'accueil
> **AC2**: Connexion avec identifiant invalide → message d'erreur
> **AC3**: Connexion avec mot de passe invalide → message d'erreur
> **AC4**: Connexion avec champs vides → validation
> **AC5**: Déconnexion → retour à la page de connexion

### Techniques Applied

- **EP**: Valid/invalid/empty credentials
- **Decision Table**: username × password combinations
- **Error Guessing**: "Se souvenir de moi", session timeout

### Generated CSV Output

```csv
Test ID;Summary;Description;Repository;Preconditions;Test Steps;Expected Results;Priority;Labels
;Connexion réussie avec identifiants valides;Vérifier qu'un utilisateur peut se connecter avec des identifiants valides;Auth/Connexion/;"- Application SRD accessible
- Utilisateur valide (admin/mdp) existant
- Navigateur ouvert";"1. Ouvrir l'URL de l'application SRD
2. Vérifier que la page de connexion s'affiche
3. Saisir l'identifiant ""admin"" dans le champ Identifiant
4. Saisir le mot de passe ""mdp"" dans le champ Mot de passe
5. Cliquer sur le bouton ""Connexion""";"1. La page de connexion affiche le logo SRD et le formulaire de connexion
2. Le titre de la page contient ""SRD""
3. Le champ accepte la saisie
4. Le champ mot de passe masque les caractères
5. L'utilisateur est redirigé vers la page d'accueil, le message ""Chargement du module en cours..."" puis ""Chargement des données en mémoire"" s'affichent";High;smoke,auth,positive
;Connexion échouée avec identifiant invalide;Vérifier le comportement avec un identifiant inexistant;Auth/Connexion/;"- Application SRD accessible
- Navigateur ouvert";"1. Ouvrir l'URL de l'application SRD
2. Saisir un identifiant invalide ""utilisateur_inconnu""
3. Saisir un mot de passe valide
4. Cliquer sur le bouton ""Connexion""";"1. La page de connexion s'affiche
2. Le champ accepte la saisie
3. Le champ accepte la saisie
4. Un message d'erreur s'affiche indiquant des identifiants incorrects";High;auth,negative,security
;Connexion avec champs vides;Vérifier la validation lorsque les champs sont vides;Auth/Connexion/;"- Application SRD accessible
- Navigateur ouvert";"1. Ouvrir l'URL de l'application SRD
2. Laisser les champs Identifiant et Mot de passe vides
3. Cliquer sur le bouton ""Connexion""";"1. La page de connexion s'affiche
2. Les champs restent vides
3. Un message de validation s'affiche pour les champs obligatoires";Medium;auth,negative,validation
;Déconnexion réussie;Vérifier qu'un utilisateur connecté peut se déconnecter;Auth/Déconnexion/;"- Utilisateur connecté à l'application SRD";"1. Cliquer sur l'icône du Compte utilisateur (barre de navigation)
2. Vérifier que le panneau utilisateur s'affiche
3. Cliquer sur le bouton ""Se déconnecter""";"1. Le panneau affiche les informations utilisateur (groupe, profil)
2. Le bouton ""Se déconnecter"" est visible
3. L'utilisateur est déconnecté et redirigé vers la page de connexion";High;smoke,auth,positive
```

**Techniques visible**: EP (valid/invalid/empty = 3 classes), Decision Table (username × password reduced to meaningful rows), Error Guessing (empty fields).

---

## Example 2: Navigation (Parameterized — Multiple Modules)

### Input (User Story excerpt)

> En tant qu'utilisateur SRD, je veux accéder à tous les modules de l'application via le panneau Applications et naviguer dans les sous-menus via la sidebar.
>
> **Modules**: Consommateur, Collective, Exploitation, Paramétrage, Administration, Stock & achat, Production, Statistiques, Interop
>
> **AC1**: Ouvrir le panneau Applications et voir tous les modules
> **AC2**: Naviguer vers chaque module
> **AC3**: Sidebar expansion/réduction

### Techniques Applied

- **EP**: One test per module (each module = equivalence class for navigation)
- **State Transition**: Sidebar collapsed ↔ expanded
- **Error Guessing**: Fast module switching, sidebar animation timing

### Generated CSV Output

```csv
Test ID;Summary;Description;Repository;Preconditions;Test Steps;Expected Results;Priority;Labels
;Accès au panneau des Applications;Vérifier l'ouverture du panneau présentant tous les modules;Navigation/Panneau Applications/;"- Utilisateur connecté à l'application SRD";"1. Localiser l'icône Applications dans la barre de navigation horizontale
2. Cliquer sur l'icône Applications";"1. L'icône Applications est visible dans la barre
2. Un panneau s'ouvre présentant les 9 modules : Consommateur, Collective, Exploitation, Paramétrage, Administration, Stock & achat, Production, Statistiques, Interop. Chaque module est cliquable";High;smoke,navigation
;Navigation vers module Consommateur;Vérifier l'accès au module Consommateur depuis le panneau Applications;Navigation/Modules/Consommateur/;"- Utilisateur connecté
- Panneau Applications accessible";"1. Ouvrir le panneau Applications
2. Cliquer sur le module ""Consommateur""";"1. Le panneau affiche tous les modules
2. Le module Consommateur se charge, la sidebar affiche les sous-menus correspondants";High;smoke,navigation,consommateur
;Expansion de la sidebar;Vérifier que la sidebar peut être étendue depuis le mode minifié;Navigation/Sidebar/;"- Utilisateur connecté
- Sidebar en mode minifié (icônes uniquement)";"1. Observer la sidebar à gauche (mode minifié par défaut)
2. Cliquer sur le bouton d'expansion de la sidebar
3. Vérifier que les libellés des sous-menus apparaissent";"1. La sidebar affiche uniquement des icônes
2. La sidebar s'étend avec une animation fluide
3. Les libellés textuels des sous-menus sont visibles à côté des icônes";High;smoke,navigation
;Réduction de la sidebar;Vérifier que la sidebar peut être réduite vers le mode minifié;Navigation/Sidebar/;"- Utilisateur connecté
- Sidebar en mode étendu";"1. Vérifier que la sidebar est en mode étendu
2. Cliquer sur le bouton de réduction
3. Vérifier que seules les icônes sont visibles";"1. La sidebar affiche les libellés et icônes
2. La sidebar se réduit avec une animation fluide
3. Seules les icônes sont visibles, les libellés sont masqués";Medium;navigation,functional
```

**Note**: The remaining 8 module navigation tests (Collective through Interop) follow the same pattern as "Navigation vers module Consommateur" — in practice, use parameterized tests in automation rather than 9 separate CSV rows.

---

## Example 3: Multi-Volet Form (Complex — Dish Creation)

### Input (User Story excerpt)

> En tant que gestionnaire de la restauration, je veux créer une nouvelle fiche plat dans le module Paramétrage afin de référencer un plat.
>
> **Navigation**: Paramétrage → Fiches plat (contexte : Plat)
>
> **AC1**: Accès au formulaire de création via bouton FAB
> **AC2**: Volet 1 — Informations générales (Libellé, Famille, Sous-famille, Poste, Groupe modes préparation)
> **AC3**: Volet 2 — Destinations (multi-select avec "Sélectionner tout")
> **AC4**: Volet 3 — Régimes et Rations
> **AC5**: Volet 4 — Goûts + Validation finale
> **AC6**: Gestion des erreurs et navigation entre volets

### Techniques Applied

- **State Transition**: 4-volet wizard flow (V1 → V2 → V3 → V4 → Saved, back navigation)
- **EP**: Valid/empty/invalid for each field type
- **BVA**: Multi-select boundaries (0, 1, all)
- **Decision Table**: Required fields filled/empty × "Suivant" action
- **Error Guessing**: Back button preserves data, progress bar behavior, duplicate libellé

### Generated CSV Output

```csv
Test ID;Summary;Description;Repository;Preconditions;Test Steps;Expected Results;Priority;Labels
;Accès au formulaire de création de fiche plat;Vérifier l'ouverture du formulaire via le bouton d'ajout;Paramétrage/Fiches plat/Création/;"- Utilisateur connecté avec droits Paramétrage
- Navigation : Paramétrage > Fiches plat > contexte Plat";"1. Naviguer vers Paramétrage > Fiches plat (contexte Plat)
2. Vérifier la présence du bouton d'ajout (icône +)
3. Cliquer sur le bouton d'ajout
4. Cliquer sur ""Ajouter un plat"" dans le sous-menu";"1. La liste des fiches plat existantes s'affiche
2. Le bouton d'ajout (FAB) est visible
3. Un sous-menu apparaît avec l'option ""Ajouter un plat""
4. Le formulaire s'ouvre avec le titre ""Création d'une fiche plat""";High;smoke,parametrage,positive
;Création fiche plat — parcours complet (happy path);Vérifier la création complète d'une fiche plat en remplissant les 4 volets;Paramétrage/Fiches plat/Création/;"- Utilisateur connecté avec droits Paramétrage
- Formulaire de création ouvert
- Aucune fiche plat ""Curry de poulet au lait de coco"" existante";"1. Saisir ""Curry de poulet au lait de coco"" dans Libellé
2. Rechercher et sélectionner ""VVPO"" dans Famille
3. Rechercher et sélectionner ""Viande - volaille"" dans Sous-famille
4. Rechercher et sélectionner ""Cuisine"" dans Poste de distribution
5. Rechercher et sélectionner ""Déclinaison sel / léger"" dans Groupe modes de préparation
6. Cliquer sur ""Suivant""
7. Désactiver ""Sélectionner tout"" puis sélectionner ""CHBA"", ""CHU"", ""Cité ADM""
8. Cliquer sur ""Suivant""
9. Sélectionner les régimes ""Ordinaire"", ""Sans gluten"", ""Sans poisson""
10. Sélectionner les rations ""1 part"", ""1/2 part""
11. Cliquer sur ""Suivant""
12. Sélectionner les goûts ""tomate cuite"", ""Volaille""
13. Cliquer sur ""Valider""";"1. Le champ Libellé accepte la saisie
2-5. Les valeurs sont sélectionnées dans les champs respectifs
6. Navigation vers le Volet 2 — Destinations
7. Les 3 destinations apparaissent sélectionnées
8. Navigation vers le Volet 3 — Régimes et Rations
9. Les 3 régimes sont sélectionnés
10. Les 2 rations sont sélectionnées
11. Navigation vers le Volet 4 — Goûts
12. Les 2 goûts sont sélectionnés
13. Une barre de progression s'affiche, puis disparaît. La fiche plat apparaît dans le panneau de détails avec toutes les informations saisies";High;regression,parametrage,positive
;Validation champ obligatoire — Libellé vide;Vérifier que le Volet 1 bloque la navigation si le Libellé est vide;Paramétrage/Fiches plat/Création/;"- Formulaire de création ouvert (Volet 1)";"1. Laisser le champ Libellé vide
2. Remplir les autres champs obligatoires (Famille, Sous-famille, etc.)
3. Cliquer sur ""Suivant""";"1. Le champ Libellé reste vide
2. Les autres champs acceptent les valeurs
3. Un message d'erreur indique que le champ Libellé est obligatoire. La navigation vers le Volet 2 est bloquée";High;parametrage,negative,validation
;Navigation retour entre volets — conservation des données;Vérifier que les données saisies sont conservées lors de la navigation retour;Paramétrage/Fiches plat/Création/;"- Formulaire de création ouvert
- Volet 1 rempli, navigation effectuée jusqu'au Volet 3";"1. Depuis le Volet 3, naviguer en arrière vers le Volet 2
2. Vérifier les destinations sélectionnées
3. Naviguer en arrière vers le Volet 1
4. Vérifier les valeurs du Volet 1";"1. Le Volet 2 s'affiche
2. Les destinations précédemment sélectionnées sont toujours cochées
3. Le Volet 1 s'affiche
4. Toutes les valeurs saisies (Libellé, Famille, etc.) sont conservées";Medium;parametrage,positive,functional
;Destinations — sélectionner tout puis désélectionner individuellement;Vérifier le comportement du sélecteur tout/individuel pour les destinations;Paramétrage/Fiches plat/Création/;"- Formulaire de création ouvert
- Navigation au Volet 2";"1. Activer ""Sélectionner tout""
2. Vérifier que toutes les destinations sont cochées
3. Désélectionner une destination individuellement (ex: ""CHBA"")
4. Vérifier l'état de ""Sélectionner tout""";"1. Toutes les destinations sont sélectionnées
2. Chaque case est cochée
3. ""CHBA"" est désélectionné
4. ""Sélectionner tout"" est automatiquement décoché (état indéterminé ou décoché)";Medium;parametrage,boundary,functional
;Destinations — aucune sélection;Vérifier le comportement lorsqu'aucune destination n'est sélectionnée;Paramétrage/Fiches plat/Création/;"- Formulaire au Volet 2
- ""Sélectionner tout"" désactivé";"1. S'assurer qu'aucune destination n'est sélectionnée
2. Cliquer sur ""Suivant""";"1. Toutes les cases sont décochées
2. Selon la règle métier : soit navigation vers Volet 3 autorisée, soit message de validation affiché";Medium;parametrage,boundary,negative
```

### Generated JDD Output (`SRD-FP-001.json`)

```json
{
  "metadata": {
    "description": "Jeux de données pour la création d'une fiche plat — Paramétrage > Fiches plat",
    "version": "1.0.0",
    "lastUpdated": "2026-04-17"
  },
  "entrants": {
    "volet_1": {
      "libelle": "Curry de poulet au lait de coco",
      "platTemoin": false,
      "platCuisineAvance": false,
      "famillePlat": "VVPO",
      "sousFamille": "Viande - volaille",
      "posteDistribution": "Cuisine",
      "grpeModePreparation": "Déclinaison sel / léger"
    },
    "volet_2": {
      "destinations": ["CHBA", "CHU", "Cité ADM"]
    },
    "volet_3": {
      "regimes": ["Ordinaire", "Sans gluten", "Sans poisson"],
      "rations": ["1 part", "1/2 part"]
    },
    "volet_4": {
      "gouts": ["tomate cuite", "Volaille"]
    }
  },
  "sortants": {
    "texteBtnAjoutPlat": "Ajouter un plat",
    "texteFormCreationFP": "Création d'une fiche plat",
    "labelsVolet1": {
      "libelle": "Libellé",
      "famille": "Famille",
      "sousFamille": "Sous-famille",
      "posteDistribution": "Poste de distribution",
      "grpeModePreparation": "Groupe de modes de préparation"
    },
    "navigation": {
      "boutonSuivant": "Suivant",
      "boutonValider": "Valider"
    }
  }
}
```
