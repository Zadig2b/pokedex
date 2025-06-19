import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  effect,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import {
  getIdFromPokemonUrl,
  getPokemonImageUrl,
} from '../../utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnChanges {
  private pokemonService = inject(PokemonService);

  // Filtres en entrée (liés au parent)
  @Input() search = '';
  @Input() selectedType = '';
  @Input() sortOrder: 'asc' | 'desc' = 'asc';

  // Signaux internes
  readonly pokemons = signal<Pokemon[]>([]);
  private searchSignal = signal(this.search);
  private selectedTypeSignal = signal(this.selectedType);
  private sortOrderSignal = signal(this.sortOrder);

  constructor() {
    this.loadDefaultPokemons();

    effect(() => {
      const type = this.selectedTypeSignal();
      if (!type) return;
      this.pokemonService.getPokemonEntriesByType(type).subscribe((entries) => {
        const simplified = entries.slice(0, 50).map(({ name, url }) => {
          const id = getIdFromPokemonUrl(url);
          return {
            name,
            id,
            image: getPokemonImageUrl(id),
            types: [],
          };
        });
        this.pokemons.set(simplified);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search']) {
      this.searchSignal.set(this.search);
    }
    if (changes['selectedType']) {
      this.selectedTypeSignal.set(this.selectedType);
      if (!this.selectedType) {
        this.loadDefaultPokemons();
      }
    }
    if (changes['sortOrder']) {
      this.sortOrderSignal.set(this.sortOrder);
    }
  }

  private loadDefaultPokemons(): void {
    this.pokemonService.getPokemons().subscribe((res) => {
      const simplified = res.results.map(({ name, url }) => {
        const id = getIdFromPokemonUrl(url);
        return {
          name,
          id,
          image: getPokemonImageUrl(id),
          types: [],
        };
      });
      this.pokemons.set(simplified);
    });
  }

  readonly filteredPokemons = computed(() => {
    const query = this.searchSignal().toLowerCase();
    const order = this.sortOrderSignal();
    const list = this.pokemons();

    return list
      .filter((p) => p.name.toLowerCase().includes(query))
      .sort((a, b) =>
        order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  });
}
