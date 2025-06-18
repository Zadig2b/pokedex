/**
 * Construit l'URL de l'image d'un Pokémon à partir de son identifiant.
 */
export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/**
 * Extrait l'identifiant numérique d'un Pokémon à partir de son URL complète.
 *
 * Exemple d'URL :
 *   "https://pokeapi.co/api/v2/pokemon/4/"
 *
 * Résultat :
 *   4
 *
 * @param url L'URL complète du Pokémon retournée par l'API
 * @returns L'identifiant du Pokémon (nombre entier)
 */
export function getIdFromPokemonUrl(url: string): number {
  // Découpe l'URL en segments (par les "/"), puis filtre les chaînes vides
  // Résultat : ["https:", "pokeapi.co", "api", "v2", "pokemon", "4"]
  const parts = url.split('/').filter(Boolean);

  // Récupère le dernier élément (généralement l'ID), puis le convertit en nombre entier
  return parseInt(parts[parts.length - 1], 10);
}
