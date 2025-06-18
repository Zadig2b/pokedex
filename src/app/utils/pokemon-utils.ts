
export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function extractTypesFromList(pokemons: { types: string[] }[]): string[] {
  const allTypes = pokemons.flatMap((p) => p.types);
  return [...new Set(allTypes)].sort();
}
