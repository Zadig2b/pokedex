// Représente un Pokémon enrichi pour l'affichage dans la liste ou le détail
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

// Résultat brut retourné par l'API `/pokemon?limit=...`
export interface RawPokemon {
  name: string;
  url: string;
}

// Structure de la réponse pour `/pokemon?limit=50`
export interface PokemonListApiResponse {
  results: RawPokemon[];
}

// Structure de la réponse d’un Pokémon détaillé
export interface PokemonDetailsApiResponse {
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  // Autres champs utiles (pour page de détails)
  height: number;
  weight: number;
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}
