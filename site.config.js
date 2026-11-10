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
  accueil: "adhesifs",

  // Le menu : une liste de rubriques, chacune avec ses pages.
  menu: [
    {
      rubrique: "Simulations",
      pages: [
        { id: "adhesifs", titre: "🩹 Adhésifs", fichier: "pages/simulations.html" },
        { id: "module-masse-volumique", titre: "↳ ⚖️ Masse volumique", fichier: "pages/module-masse-volumique.html" },
        { id: "module-extrait-sec", titre: "↳ 🔥 Extrait sec", fichier: "pages/module-extrait-sec.html" },
        { id: "module-bille-anneau", titre: "↳ 🟠 Bille-anneau", fichier: "pages/module-bille-anneau.html" },
        { id: "module-dpu", titre: "↳ ⏳ DPU", fichier: "pages/module-dpu.html" },
      ],
    },
  ],
};
