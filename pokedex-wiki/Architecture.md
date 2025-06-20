# 🏗️ Architecture

Le projet suit les recommandations Angular modernes avec :

- **Standalone Components**
- Organisation par **domaines fonctionnels** :
  - `components/`
  - `pages/`
  - `services/`
  - `models/`
  - `utils/`

## Structure des fichiers

```
src/
├── app/
│   ├── components/       # Composants réutilisables
│   ├── pages/            # Pages avec logique globale
│   ├── services/         # Communication avec l’API externe
│   ├── models/           # Interfaces TypeScript
│   └── utils/            # Fonctions utilitaires
```

# 🧬 Schéma d’architecture Angular Pokédex

> Ce diagramme présente l’architecture de l’application Angular Pokédex : composants, service, routing, modèles et relations.

```mermaid
flowchart TD
    A[PokemonListPageComponent] --> B[PokemonFilterComponent]
    A --> C[PokemonListComponent]
    B --> C
    C --> D[Angular Router: /pokemon/:name]
    D --> E[PokemonDetailComponent]

    C --> F[PokemonService.getPokemons()]
    E --> G[PokemonService.getPokemonDetails(name)]
    B --> H[PokemonService.getPokemonEntriesByType(type)]
    B --> I[PokemonService.getAllTypes()]

    F --> J[GET /pokemon?limit=]
    G --> K[GET /pokemon/:name]
    H --> L[GET /type/:type]
    I --> M[GET /type]
```
