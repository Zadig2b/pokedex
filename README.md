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

- Utilisation exclusive des **composants standalone** (aucun `NgModule` requis)
- Centralisation des **types** dans `models/` (`Pokemon`, `RawPokemon`, etc.)
- Regroupement des **fonctions utilitaires** (`getPokemonImageUrl`, `getIdFromPokemonUrl`, etc.) dans `utils/`
- Service `PokemonService` unique pour tous les appels à l’API :
  - `getPokemons(limit)` : liste initiale des Pokémon
  - `getPokemonDetails(name)` : données complètes d’un Pokémon
  - `getAllTypes()` : récupération dynamique des types
  - `getPokemonEntriesByType(type)` : Pokémon associés à un type, sans détails superflus

### 🔀 Architecture des composants principaux

- **`PokemonFilterComponent`** : gère la logique de recherche, tri et filtrage côté interface
- **`PokemonListComponent`** : gère l’affichage de la liste des Pokémon en fonction des filtres appliqués
- **`PokemonListPageComponent`** : agit comme *wrapper* entre le composant de filtre et celui de la liste pour une séparation claire des responsabilités et une meilleure maintenabilité

---

## 📁 Arborescence simplifiée

```
src/
 ├── app/
 │   ├── components/
 │   │   ├── pokemon-list/        ← liste principale
 │   │   ├── pokemon-detail/      ← page de détail d’un Pokémon
 │   │   └── pokemon-filter/      ← filtre (type, recherche, tri)
 │   ├── pages/
 │   │   └── pokemon-list/        ← page wrapper : filtre + liste
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