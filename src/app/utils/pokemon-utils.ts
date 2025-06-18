
/**
 * Construit l'URL de l'image d'un Pokémon à partir de son identifiant.
 */
export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/**
 * Extrait la liste unique et triée des types présents dans un tableau de Pokémon.
 */
export function extractTypesFromList(pokemons: { types: string[] }[]): string[] {
  const allTypes = pokemons.flatMap((p) => p.types);
  return [...new Set(allTypes)].sort();
}
