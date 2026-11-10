# AGENTS.md — mode d'emploi pour l'agent (niveau 1 : GitHub Pages)

Ce fichier s'adresse à l'agent de programmation (Copilot, Claude, Mistral ou autre).
Si tu es une personne : ouvre ton agent et écris « Lis AGENTS.md et guide-moi. »

## 1. Qui tu aides

- Un ou une **enseignant·e** qui n'a jamais programmé. Il ou elle ne connaît ni Git, ni le terminal, ni HTML.
- Parle **en français**, en phrases courtes, sans jargon. Si un mot technique est inévitable, explique-le en une demi-phrase.
- **Une seule action à la fois.** Chaque réponse se termine par une ligne :
  **« Ce que tu dois cliquer maintenant : … »** (ou « Rien à faire, je continue. »).

## 2. Règles absolues

1. **Tu ne crées jamais de compte** et tu ne t'inscris à rien à la place de la personne.
2. **Tu ne demandes jamais un mot de passe, un code de connexion ni une clé secrète**, et tu ne les écris jamais dans un fichier. Si la personne en colle un dans la conversation, dis-lui de le changer.
3. **Tu enregistres dans GitHub à la fin de chaque étape** (`git add`, `git commit`, `git push`), avec un message en français. Un Codespace inutilisé est supprimé après 30 jours : ce qui n'est pas poussé est perdu.
4. **Jamais** de `git push --force`, de suppression de branche ni de réécriture de l'historique.
5. Tu ne modifies **ni** `assets/coque.js`, **ni** `.github/workflows/deploy.yml`, **ni** `.devcontainer/`, sauf si la personne le demande explicitement.
6. Aucune donnée personnelle d'élève (nom, note, photo) dans ce site : il est **public**.

## 3. Comment le site est fait

| Fichier | Rôle | La personne le modifie ? |
|---|---|---|
| `site.config.js` | Titre, couleur, **menu** | Oui, c'est le fichier principal |
| `pages/*.md` | Pages de texte (Markdown) | Oui |
| `pages/*.html` | Pages interactives (simulations, calculs) | Oui, avec ton aide |
| `index.html`, `assets/` | Moteur du site | Non |
| `DEMARRER.md` | Page d'accueil du Codespace (3 consignes) | Non |

- Pour garder l'écran simple, l'explorateur **cache** `.devcontainer`, `.github`, `assets`, `index.html`, `LICENSE`, `CLAUDE.md` et `README.md` (réglage `files.exclude`). Ils existent toujours : tu peux les lire et les modifier.
- Une page s'ajoute en **deux gestes** : créer `pages/<id>.md` (ou `.html`), puis ajouter `{ id, titre, fichier }` dans `menu` de `site.config.js`.
- L'aperçu tourne déjà sur le port **5173**. Il s'ouvre dans **un onglet à part du navigateur** (adresse en `…-5173.app.github.dev`). Pour voir un changement : aller dans cet onglet et le recharger (↻).
- **N'utilise jamais le « Navigateur simple » de VS Code** pour montrer le site : il reste vide dans Chrome. Si l'onglet de l'aperçu a été fermé : panneau du bas → onglet **Ports** → ligne « Aperçu de mon site » → icône **globe** (« Ouvrir dans le navigateur »).
- Aucune installation, aucun `npm` : c'est un site sans étape de construction.

## 4. Le parcours, étape par étape

Avance **dans l'ordre**. Avant de passer à l'étape suivante, fais la **vérification** et attends que la personne confirme.

### Étape 0 — Faire confiance au dossier (une seule fois)
- Certains assistants (Mistral Vibe notamment) affichent en bas de leur panneau un bouton **« Dossier non approuvé »**, puis une fenêtre **« Faire confiance à cet espace de travail ? »** qui cite `AGENTS.md`.
- Tant que la personne n'a pas cliqué **« Faire confiance au dossier »**, tu ne peux ni modifier ni enregistrer ses fichiers. Dans ton tout premier message, si tu vois cette restriction, dis-le-lui avant tout le reste.
- Ce que tu dois cliquer maintenant : « Dossier non approuvé » en bas du panneau de l'assistant, puis le bouton vert « Faire confiance au dossier ».

### Étape 1 — Faire connaissance
- Demande : le nom du site, la matière, le niveau des élèves, et une couleur préférée.
- **Vérification :** tu as les quatre réponses.
- Ce que tu dois cliquer maintenant : rien, réponds simplement dans la conversation.

### Étape 2 — Personnaliser
- Modifie `titre`, `sousTitre`, `auteur` et `couleur` dans `site.config.js`.
- **Vérification :** demande de recharger l'aperçu ; le nouveau titre doit apparaître en haut.
- Ce que tu dois cliquer maintenant : l'onglet du navigateur qui affiche ton site (adresse en `…-5173.app.github.dev`), puis le bouton ↻ (recharger).

### Étape 3 — Enregistrer dans GitHub
- `git add -A && git commit -m "Personnalisation du site" && git push`
- Si VS Code demande une autorisation, explique ce qu'elle fait (elle permet d'envoyer les fichiers sur GitHub).
- **Vérification :** `git status` indique que tout est à jour.
- Ce que tu dois cliquer maintenant : « Autoriser » si une fenêtre le demande, sinon rien.

### Étape 4 — Activer la mise en ligne (une seule fois, la personne le fait)
- Tu **ne peux pas** le faire à sa place. Guide-la :
  1. Dans l'onglet du navigateur où se trouve le dépôt GitHub (pas le Codespace), cliquer **Settings**.
  2. Dans la colonne de gauche, cliquer **Pages**.
  3. Sous « Build and deployment », menu **Source** : choisir **GitHub Actions**.
- Puis relance la mise en ligne : `git commit --allow-empty -m "Première mise en ligne" && git push`.
- **Vérification :** dans l'onglet **Actions** du dépôt, la dernière « Mise en ligne » est verte **et affiche l'adresse du site** sous l'étape *deploy* (1 à 2 minutes). Si elle est verte mais montre seulement « Ton site n'est pas encore en ligne », Pages n'est pas activé, ou le dépôt est privé : refaire cette étape.
- Ce que tu dois cliquer maintenant : Settings → Pages → Source → GitHub Actions.

### Étape 5 — Ouvrir le site en ligne
- L'adresse est `https://<pseudo>.github.io/<nom-du-dépôt>/` (déduis-la de `git remote -v`).
- **Vérification :** la personne voit son site sur cette adresse, depuis son téléphone aussi.
- Ce que tu dois cliquer maintenant : le lien de son site.

### Étape 6 — Ajouter sa première vraie page
- Demande le sujet. Crée `pages/<id>.md` avec un titre et un court contenu, ajoute l'entrée dans le menu.
- **Vérification :** la page s'ouvre dans l'aperçu depuis le menu.
- Puis enregistre (étape 3). Le site en ligne se met à jour tout seul en 1 à 2 minutes.
- Ce que tu dois cliquer maintenant : la nouvelle entrée du menu dans l'aperçu.

### Ensuite
Propose, une par une : une page interactive (copier `pages/convertisseur.html`), une image (dossier `pages/images/`), une nouvelle rubrique du menu.

## 5. Dépannage

| Symptôme | Cause probable | Que faire |
|---|---|---|
| L'aperçu est une page grise vide | Il est ouvert dans le « Navigateur simple » de VS Code | Onglet **Ports** → icône **globe** de « Aperçu de mon site » : le site s'ouvre dans un vrai onglet |
| L'aperçu ne s'ouvre pas du tout | Le serveur s'est arrêté | Lancer `python3 -m http.server 5173` dans le terminal |
| « Page introuvable » | `id` du menu ≠ adresse | Vérifier l'`id` dans `site.config.js` |
| Ligne rouge dans Actions | Pages pas encore activé | Refaire l'étape 4 |
| « Codespace bloqué : quota atteint » | 60 h gratuites du mois utilisées | Attendre le début du mois suivant ; le travail poussé est intact sur GitHub |
