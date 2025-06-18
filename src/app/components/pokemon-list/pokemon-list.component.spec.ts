import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    pokemonService = jasmine.createSpyObj('PokemonService', ['getEnrichedPokemonList']);
    pokemonService.getEnrichedPokemonList.and.returnValue(
      of([
        { id: 1, name: 'bulbasaur', image: '', types: ['grass'] },
        { id: 4, name: 'charmander', image: '', types: ['fire'] }
      ])
    );

    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [{ provide: PokemonService, useValue: pokemonService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter pokemons with search', () => {
    const event = { target: { value: 'bulb' } } as unknown as Event;
    component.onSearch(event);
    expect(component.filteredPokemons.length).toBe(1);
    expect(component.filteredPokemons[0].name).toBe('bulbasaur');
  });

  it('should sort pokemons by name', () => {
    component.sortByName('desc');
    expect(component.filteredPokemons[0].name).toBe('charmander');
  });

  it('should filter by type', () => {
    const event = { target: { value: 'fire' } } as unknown as Event;
    component.filterByType(event);
    expect(component.filteredPokemons.length).toBe(1);
    expect(component.filteredPokemons[0].types).toContain('fire');
  });
});
