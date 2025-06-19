# 📘 Pokédex Angular

Bienvenue dans le Wiki du projet **Pokédex Angular** !  
Cette application Angular permet de découvrir des Pokémon à partir de l’API publique [PokeAPI](https://pokeapi.co), avec une interface moderne, responsive et pédagogique.

---

## 🎯 Objectifs du projet

Ce projet a été conçu dans un but pédagogique pour :

- 🎓 Apprendre à consommer une API REST avec Angular
- ⚙️ Comprendre l’architecture moderne Angular Standalone (v17+)
- 🧠 Utiliser les **signals** pour la gestion d’état réactive
- 🧭 Naviguer entre les pages avec le **Router** (et paramètres dynamiques)
- 🔍 Implémenter une **recherche**, un **tri** et un **filtrage**
- 📁 Structurer proprement une application en composants/pages/services

---

## 🧱 Stack et architecture

- **Angular 17+** (standalone components + signals)
- **Bootstrap 5** (design responsive)
- **RxJS** pour les appels réseau
- **PokeAPI** (https://pokeapi.co)

📁 Structure :
```
src/
├── app/
│   ├── components/     # Composants réutilisables (liste, filtre, détail)
│   ├── pages/          # Composants pages (ex: liste principale)
│   ├── services/       # Intégration API
│   ├── models/         # Interfaces TypeScript
│   └── utils/          # Fonctions utilitaires (image, ID, etc.)
```

---

## ✨ Fonctionnalités principales

- ✅ Liste des 50 premiers Pokémon avec nom et image
- 🔍 Recherche instantanée par nom
- ↕️ Tri alphabétique (A → Z ou Z → A)
- 🧪 Filtrage dynamique par type (`/type`)
- 🧾 Fiche détaillée pour chaque Pokémon :
  - Image officielle, nom, ID
  - Types, taille, poids
  - Statistiques de base
  - Capacités

---

## 🚀 Lancer l’application

```bash
git clone https://github.com/<ton-repo>/angular-pokedex.git
cd angular-pokedex
npm install
ng serve
```

Accès à l’application : [http://localhost:4200](http://localhost:4200)

---

## 🧪 Tests & CI

- `ng test` : exécution des tests unitaires avec Karma


---

## 🔗 Ressources

- [Documentation Angular](https://angular.io/docs)
- [Documentation PokeAPI](https://pokeapi.co/docs/v2)