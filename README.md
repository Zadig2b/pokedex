# 📘 Pokédex Angular

Mini application Angular qui consomme l’API [PokeAPI](https://pokeapi.co) pour afficher une liste de Pokémon avec recherche, tri et fiches de détails.

---

## 🚀 Fonctionnalités

- ⚡️ Affichage des 50 premiers Pokémon (nom + image)
- 🔍 Recherche en direct par nom
- ↕️ Tri A → Z / Z → A
- 📂 Filtrage par type (feu, eau, etc.)
- 🔗 Navigation vers une fiche de détail avec :
  - Nom, ID, image
  - Types
  - Taille / Poids
  - Statistiques
  - Capacités

---

## 🧑‍💻 Technologies utilisées

- Angular (standalone components)
- RxJS (`forkJoin`, `switchMap`, `Observable`)
- Bootstrap 5 pour le design responsive
- API REST : [https://pokeapi.co](https://pokeapi.co)

---

## 📦 Installation

```bash
git clone https://github.com/ton-utilisateur/angular-pokedex.git
cd angular-pokedex
npm install
```

---

## ▶️ Lancer l'application

```bash
ng serve
```

Puis ouvrir : [http://localhost:4200](http://localhost:4200)

---

## 🧪 Tester l'application

```bash
ng test
```

> ⚠️ Nécessite Chrome (ou ChromeHeadless si configuré dans `codex.json`)

---

## 🤖 Configuration Codex (CI/test auto)

Fichier `codex.json` inclus à la racine avec :

- Setup automatique (`npm install`)
- Build avec Angular CLI
- Tests via Karma + ChromeHeadless

---

## 📁 Structure simplifiée

```
src/
 ├── app/
 │   ├── components/
 │   │   ├── pokemon-list/
 │   │   └── pokemon-detail/
 │   ├── services/
 │   ├── models/
 │   └── utils/
```

---

## 📝 Auteur

Romain Dugeay – [portfolio](https://contes-et-legendes.com/romain)