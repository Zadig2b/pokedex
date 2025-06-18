import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

/**
 * Tests unitaires du service PokemonService
 */
describe('PokemonService', () => {
  let service: PokemonService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should retrieve pokemon list', () => {
    service.getPokemons(2).subscribe(res => {
      expect(res.results.length).toBe(2);
    });

    const req = http.expectOne('https://pokeapi.co/api/v2/pokemon?limit=2');
    expect(req.request.method).toBe('GET');
    req.flush({ results: [{ name: 'a', url: 'u1' }, { name: 'b', url: 'u2' }] });
  });

  it('should retrieve pokemon details', () => {
    service.getPokemonDetails('pikachu').subscribe(res => {
      expect(res.id).toBe(25);
    });

    const req = http.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 25, name: 'pikachu', types: [], height: 0, weight: 0, abilities: [], stats: [], sprites: { front_default: '' } });
  });

  it('should return enriched pokemon list', () => {
    service.getEnrichedPokemonList().subscribe(list => {
      expect(list.length).toBe(2);
      expect(list[0].types[0]).toBe('grass');
    });

    const listReq = http.expectOne('https://pokeapi.co/api/v2/pokemon?limit=50');
    listReq.flush({ results: [{ name: 'bulbasaur', url: 'url1' }, { name: 'charmander', url: 'url2' }] });

    const detailReq1 = http.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    const detailReq2 = http.expectOne('https://pokeapi.co/api/v2/pokemon/charmander');

    detailReq1.flush({ types: [{ slot: 1, type: { name: 'grass', url: '' } }], height:0, weight:0, id:1, name:'bulbasaur', abilities:[], stats:[], sprites:{ front_default:'' } });
    detailReq2.flush({ types: [{ slot: 1, type: { name: 'fire', url: '' } }], height:0, weight:0, id:4, name:'charmander', abilities:[], stats:[], sprites:{ front_default:'' } });
  });
});
