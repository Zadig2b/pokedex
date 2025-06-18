import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    pokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonDetails']);
    pokemonService.getPokemonDetails.and.returnValue(
      of({
        name: 'pikachu',
        height: 0,
        weight: 0,
        id: 25,
        types: [],
        abilities: [],
        stats: [],
        sprites: { front_default: '' }
      })
    );

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ name: 'pikachu' }) } }
        },
        { provide: PokemonService, useValue: pokemonService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon details on init', () => {
    expect(pokemonService.getPokemonDetails).toHaveBeenCalledWith('pikachu');
    expect(component.pokemon?.name).toBe('pikachu');
  });
});
