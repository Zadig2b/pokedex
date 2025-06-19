import { Component, effect, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { getIdFromPokemonUrl, getPokemonImageUrl } from '../../utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  private pokemonService = inject(PokemonService);

  // State
  readonly pokemons = signal<Pokemon[]>([]);
  readonly search = signal('');
  readonly selectedType = signal('');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');
  readonly types = signal<string[]>([]);

  constructor() {
    // Charger les types dès l'initialisation
    this.pokemonService.getAllTypes().subscribe((types) => {
      this.types.set(types.filter((t) => !['shadow', 'unknown'].includes(t)).sort());
    });

    // Charger les 50 premiers Pokémon initiaux
    this.pokemonService.getPokemons().subscribe((res) => {
      const simplified = res.results.map(({ name, url }) => {
        const id = getIdFromPokemonUrl(url);
        return {
          name,
          id,
          image: getPokemonImageUrl(id),
          types: [], // pas utilisé ici
        };
      });

      this.pokemons.set(simplified);
    });

    // Recharger la liste au changement de type
    effect(() => {
      const type = this.selectedType();
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

  // Liste filtrée et triée, calculée à partir des signaux
  readonly filteredPokemons = computed(() => {
    const query = this.search().toLowerCase();
    const order = this.sortOrder();
    const list = this.pokemons();

    return list
      .filter((p) => p.name.toLowerCase().includes(query))
      .sort((a, b) =>
        order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
  }

  onSort(order: 'asc' | 'desc') {
    this.sortOrder.set(order);
  }

  onTypeChange(event: Event) {
    const type = (event.target as HTMLSelectElement).value;
    this.selectedType.set(type);
  }
}
