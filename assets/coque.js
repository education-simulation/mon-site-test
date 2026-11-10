// Moteur du site : lit site.config.js, dessine le menu, affiche la page demandée.
// L'adresse de chaque page est de la forme  …/#/identifiant  : un rafraîchissement
// (Cmd+R / F5) ramène donc toujours sur la même page.
(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const toutes = S.menu.flatMap((r) => r.pages);

  document.documentElement.style.setProperty("--accent", S.couleur || "#aa3bff");
  document.title = S.titre;
  $("titre").textContent = S.titre;
  $("sous-titre").textContent = S.sousTitre || "";
  $("pied").textContent = "© " + new Date().getFullYear() + " " + (S.auteur || "");

  // Bandeau « aperçu » : visible seulement dans le Codespace (adresse en .app.github.dev),
  // jamais sur le site publié. Il dit au prof où il est et comment revenir à son atelier.
  if (/\.app\.github\.dev$/.test(location.hostname) || location.hostname === "localhost") {
    const b = document.createElement("div");
    b.className = "bandeau-apercu";
    b.innerHTML =
      "<strong>👀 Ceci est l'aperçu de ton site.</strong> Toi seul le vois, et seulement pendant que ton atelier est ouvert." +
      "<br>Pour le modifier, <strong>retourne sur l'onglet « RASF — Atelier … »</strong> de ton navigateur et parle à Mistral." +
      " Ensuite, reviens ici et appuie sur <strong>Cmd + R</strong> (Mac) ou <strong>Ctrl + R</strong> (Windows) pour voir le changement.";
    document.body.prepend(b);

    // Volet « Les étapes de ton site » : le parcours, au cas où la conversation est perdue.
    // Les étapes cochées viennent de PROGRESSION.md (tenu à jour par Mistral).
    const ETAPES = [
      ["Faire confiance au dossier", "Dans l'atelier : « Approuver le dossier et continuer », puis dans Mistral « Dossier non approuvé » → « Faire confiance au dossier »."],
      ["Faire connaissance", "Écris « bonjour » à Mistral et réponds à ses 4 questions."],
      ["Personnaliser le site", "Mistral change le titre et la couleur. Toi : recharge cet onglet (Cmd + R)."],
      ["Enregistrer dans GitHub", "Mistral s'en charge. Toi : « Autoriser pour le reste de cette session » dans la petite fenêtre."],
      ["Mettre en ligne (une seule fois)", "Sur GitHub, dans ton dépôt : Settings → Pages → Source : « GitHub Actions ». Ne clique sur aucun « Configure ». Le dépôt doit être Public. GitHub peut demander un code sur ton téléphone (application GitHub Mobile)."],
      ["Voir le site en ligne", "Onglet Actions du dépôt : un rond orange tourne pendant environ 1 minute, patiente jusqu'à la coche verte. Puis ouvre https://ton-pseudo.github.io/nom-du-depot/"],
      ["Ajouter ta première page", "Dis à Mistral le sujet de ta page."],
    ];
    const v = document.createElement("details");
    v.className = "volet-etapes";
    try { v.open = localStorage.getItem("coque.voletEtapes") === "1"; } catch (e) {}
    v.addEventListener("toggle", () => { try { localStorage.setItem("coque.voletEtapes", v.open ? "1" : "0"); } catch (e) {} });
    const dessiner = (faites) => {
      v.innerHTML = "<summary>📋 Les étapes de ton site (clique pour ouvrir ou fermer)</summary><ol start='0'>" +
        ETAPES.map((e, i) => "<li class='" + (faites.has(i) ? "faite" : "") + "'><strong>" + (faites.has(i) ? "✅ " : "") + e[0] + "</strong><br><span>" + e[1] + "</span></li>").join("") +
        "</ol>";
    };
    dessiner(new Set());
    b.after(v);
    fetch("PROGRESSION.md", { cache: "no-cache" })
      .then((r) => (r.ok ? r.text() : ""))
      .then((t) => {
        const faites = new Set([0]); // la confiance est forcément donnée si Mistral a écrit ce fichier
        if (!t) return;
        t.split("\n").forEach((l) => { const m = l.match(/\[x\]\s*Étape\s*(\d+)/i); if (m) faites.add(+m[1]); });
        dessiner(faites);
      })
      .catch(() => {});
  }

  // Menu
  $("menu").innerHTML = S.menu
    .map((r) =>
      "<h2>" + r.rubrique + "</h2>" +
      r.pages.map((p) => '<a href="#/' + p.id + '" data-id="' + p.id + '">' + p.titre + "</a>").join("")
    )
    .join("");
  $("burger").onclick = () => $("menu").classList.toggle("ouvert");

  async function afficher() {
    const id = location.hash.replace(/^#\/?/, "") || S.accueil;
    const page = toutes.find((p) => p.id === id);
    document.querySelectorAll(".menu a").forEach((a) => a.classList.toggle("actif", a.dataset.id === id));
    $("menu").classList.remove("ouvert");

    if (!page) {
      $("contenu").innerHTML = '<p class="erreur">Page « ' + id + " » introuvable. Vérifie son id dans site.config.js.</p>";
      return;
    }
    if (page.fichier.endsWith(".html")) {
      // Page interactive : affichée dans un cadre, elle garde ses propres scripts.
      $("contenu").innerHTML = "<h1>" + page.titre + '</h1><iframe src="' + page.fichier + '" title="' + page.titre + '"></iframe>';
      const f = $("contenu").querySelector("iframe");
      f.onload = () => { try { f.style.height = f.contentDocument.body.scrollHeight + 40 + "px"; } catch (e) {} };
      return;
    }
    try {
      const r = await fetch(page.fichier, { cache: "no-cache" });
      if (!r.ok) throw new Error(r.status);
      $("contenu").innerHTML = marked.parse(await r.text());
    } catch (e) {
      $("contenu").innerHTML = '<p class="erreur">Impossible de lire ' + page.fichier + " (" + e.message + ").</p>";
    }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", afficher);
  afficher();
})();
