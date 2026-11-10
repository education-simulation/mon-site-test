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
