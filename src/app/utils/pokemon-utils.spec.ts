import { extractTypesFromList, getPokemonImageUrl } from './pokemon-utils';

describe('pokemon-utils', () => {
  it('should build image url', () => {
    expect(getPokemonImageUrl(1)).toContain('/1.png');
  });

  it('should extract unique types sorted', () => {
    const types = extractTypesFromList([
      { types: ['grass', 'poison'] },
      { types: ['fire'] },
      { types: ['grass'] }
    ]);
    expect(types).toEqual(['fire', 'grass', 'poison']);
  });
});
