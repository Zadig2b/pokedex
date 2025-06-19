# 📘 Pokédex Angular

Mini application Angular moderne qui consomme l’API [PokeAPI](https://pokeapi.co) pour afficher une liste de Pokémon avec recherche, tri, filtrage par type et fiche détaillée.

---

## 🚀 Fonctionnalités

- ⚡️ Affichage initial des 50 premiers Pokémon (nom + image uniquement)
- 🔍 Recherche en direct dans la liste visible
- ↕️ Tri A → Z / Z → A sur le nom
- 📂 Filtrage dynamique par type (feu, eau, etc.) via `GET /type/{type}`
  - ⚠️ Lors du filtrage, on n’utilise que `name` et `url`, sans appeler les détails
- 🔗 Navigation vers `/pokemon/:name` et affichage d’une fiche de détail avec :
  - Nom, ID, Image, Types, Taille, Poids
  - Statistiques de base
  - Capacités

---

## 🧑‍💻 Technologies utilisées

- ✅ Angular 17+ avec composants **standalone**
- ✅ Routing moderne via `app.routes.ts`
- ✅ RxJS : `Observable`, `map`
- ✅ Bootstrap 5 pour un design responsive simple
- ✅ API REST officielle : [https://pokeapi.co](https://pokeapi.co)

---

## 📦 Installation

```bash
git clone https://github.com/ton-utilisateur/angular-pokedex.git
cd angular-pokedex
npm install
```

---

## ▶️ Lancer l'application en local

```bash
ng serve
```

Accès via navigateur : [http://localhost:4200](http://localhost:4200)

---

## 🧪 Lancer les tests unitaires

```bash
ng test
```

> ✅ Préconfiguré pour `ChromeHeadless` via Karma

---

## 🧩 Détails d’architecture

- Tous les composants sont **standalone** (pas de `NgModule`)
- Les types (`Pokemon`, `RawPokemon`, etc.) sont définis dans `models/`
- Les fonctions utilitaires (`getPokemonImageUrl`, `getIdFromPokemonUrl`) sont centralisées dans `utils/`
- Le service `PokemonService` fournit :
  - `getPokemons(limit)` → pour la liste initiale
  - `getPokemonDetails(name)` → pour les fiches
  - `getAllTypes()` → pour le filtrage dynamique
  - `getPokemonEntriesByType(type)` → pour récupérer les noms par type sans surcharge

---

## 📁 Arborescence simplifiée

```
src/
 ├── app/
 │   ├── components/
 │   │   ├── pokemon-list/        ← liste principale avec tri + filtre
 │   │   └── pokemon-detail/      ← page de détail d’un Pokémon
 │   ├── services/
 │   │   └── pokemon.service.ts   ← appels API centralisés
 │   ├── models/
 │   │   └── pokemon.model.ts     ← interfaces partagées
 │   └── utils/
 │       └── pokemon-utils.ts     ← helpers : getIdFromUrl, getImageUrl...
```

---

## 📝 Auteurs

**Romain Dugeay** — [portfolio](https://contes-et-legendes.com/romain) 
**Christopher Perez** —  [github](https://github.com/Chr1stopherPEREZ)