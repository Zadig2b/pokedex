import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonFilterComponent } from '../../components/pokemon-filter/pokemon-filter.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-page',
  standalone: true,
  imports: [CommonModule, PokemonFilterComponent, PokemonListComponent],
  templateUrl: './pokemon-list.page.html',
})
export class PokemonListPageComponent {
  private pokemonService = inject(PokemonService);

  /** Signal réactif pour les types (utilisé par le filtre) */
  readonly types = signal<string[]>([]);

  /** Filtres déclarés comme signaux */
  readonly search = signal('');
  readonly selectedType = signal('');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  constructor() {
    this.pokemonService.getAllTypes().subscribe((allTypes) => {
      this.types.set(
        allTypes.filter((t) => !['shadow', 'unknown'].includes(t)).sort()
      );
    });
  }

  /** Mise à jour des signaux sur changement de filtre */
  onFilterChanged(event: {
    search: string;
    selectedType: string;
    sortOrder: 'asc' | 'desc';
  }) {
    this.search.set(event.search);
    this.selectedType.set(event.selectedType);
    this.sortOrder.set(event.sortOrder);
  }
}
