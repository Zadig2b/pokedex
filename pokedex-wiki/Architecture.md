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
A[PokemonListPageComponent (wrapper)]
B[PokemonFilterComponent (filtres)]
C[PokemonListComponent (liste)]
D[PokemonDetailComponent (fiche détaillée)]

%% Service
S[PokemonService: getPokemons, getPokemonDetails, getAllTypes]

%% Navigation
R[Angular Router (/pokemon/:name)]

%% Modèles et outils
M[Models (Pokemon, RawPokemon)]
U[Utils (getIdFromUrl, getImageUrl)]

%% Relations internes
A --> B
A --> C
B -->|@Input| C
C -->|click| R
R --> D

%% Service utilisé
B -->|filtrage| S
C -->|getPokemons()| S
D -->|getPokemonDetails()| S

%% Support
S --> M
C --> U
D --> U
