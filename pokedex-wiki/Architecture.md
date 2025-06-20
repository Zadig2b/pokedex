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
graph TD

%% Composants
A[PokemonListPageComponent\n(wrapper entre filtre et liste)]
B[PokemonFilterComponent\n(input: search, type, sort)]
C[PokemonListComponent\n(affiche la liste filtrée)]
D[PokemonDetailComponent\n(affiche les détails du pokémon sélectionné)]

%% Service
S[PokemonService\n - getPokemons()\n - getPokemonDetails(name)\n - getAllTypes()\n - getPokemonEntriesByType(type)]

%% Navigation
R[Angular Router\n(/pokemon/:name)]

%% Modèles et outils
M[Models (Pokemon, RawPokemon...)]
U[Utils (getIdFromUrl, getImageUrl)]

%% Relations internes
A --> B
A --> C
B -->|@Input| C
C -->|click| R
R --> D

%% Communication avec le service
B -->|filtrage dynamique| S
C -->|getPokemons()| S
D -->|getPokemonDetails(name)| S

%% Support
S --> M
C --> U
D --> U
