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
  // Injecte le service
  private pokemonService = inject(PokemonService);

  // Signal pour stocker la liste des types
  readonly types = signal<string[]>([]);

  // Données de filtre envoyées aux composants enfants
  filters = {
    search: '',
    selectedType: '',
    sortOrder: 'asc' as 'asc' | 'desc',
  };

  constructor() {
    // Charge les types à l'initialisation
    this.pokemonService.getAllTypes().subscribe((allTypes) => {
      this.types.set(
        allTypes.filter((t) => !['shadow', 'unknown'].includes(t)).sort()
      );
    });
  }

  // Met à jour les filtres depuis le composant filtre
  onFilterChanged(event: typeof this.filters) {
    this.filters = event;
  }
}
