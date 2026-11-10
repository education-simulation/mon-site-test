// ============================================================
//  site.config.js — LE SEUL FICHIER À MODIFIER POUR TON SITE
// ============================================================
//  - Le titre, les couleurs et le menu viennent tous d'ici.
//  - Pour ajouter une page : crée un fichier dans pages/
//    puis ajoute une ligne { id, titre, fichier } dans le menu.
//  - Un fichier .md est une page de texte (Markdown).
//    Un fichier .html est une page interactive (simulation, outil).
// ============================================================

window.SITE = {
  titre: "Formu au labo",
  sousTitre: "Chimie — BTS Métiers de la chimie",
  auteur: "Marco Reula",

  // Couleur principale (boutons, liens, menu actif). Code couleur au format #RRGGBB.
  couleur: "#1f9d55",

  // Page affichée à l'ouverture du site.
  accueil: "accueil",

  // Le menu : une liste de rubriques, chacune avec ses pages.
  menu: [
    {
      rubrique: "Cours",
      pages: [
        { id: "accueil", titre: "Accueil", fichier: "pages/accueil.md" },
        { id: "exemple-cours", titre: "Exemple de cours", fichier: "pages/exemple-cours.md" },
      ],
    },
    {
      rubrique: "Outils",
      pages: [
        { id: "convertisseur", titre: "Convertisseur d'unités", fichier: "pages/convertisseur.html" },
      ],
    },
  ],
};
