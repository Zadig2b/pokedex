import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { extractTypesFromList } from '../../utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  availableTypes: string[] = [];
  selectedType: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // Récupération des Pokémon enrichis via le service
    this.pokemonService.getEnrichedPokemonList().subscribe((list) => {
      this.pokemons = list;
      this.filteredPokemons = [...list];
      this.availableTypes = extractTypesFromList(list);
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase();

    this.filteredPokemons = this.pokemons.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
  }

  sortByName(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    this.filteredPokemons.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  filterByType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const type = target?.value || '';
    this.selectedType = type;

    this.filteredPokemons = type
      ? this.pokemons.filter((p) => p.types.includes(type))
      : [...this.pokemons];
  }
}
