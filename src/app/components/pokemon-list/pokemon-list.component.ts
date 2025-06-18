import { Component, OnInit } from '@angular/core';
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
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  availableTypes: string[] = [];
  selectedType: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // Charger tous les types pour le sélecteur
    this.pokemonService.getAllTypes().subscribe((types) => {
      this.availableTypes = types
        .filter((t) => !['shadow', 'unknown'].includes(t))
        .sort();
    });

    // Charger la liste par défaut (50 premiers Pokémon)
    this.pokemonService.getPokemons().subscribe((res) => {
      const simplified = res.results.map(({ name, url }) => {
        const id = getIdFromPokemonUrl(url);
        return {
          name,
          id,
          image: getPokemonImageUrl(id),
          types: [], // non utilisé ici
        };
      });

      this.pokemons = simplified;
      this.filteredPokemons = [...simplified];
      this.sortByName(this.sortOrder);
    });
  }

  filterByType(event: Event): void {
    const type = (event.target as HTMLSelectElement).value;
    this.selectedType = type;

    if (!type) {
      this.pokemons = [];
      this.filteredPokemons = [];
      return;
    }

    this.pokemonService.getPokemonEntriesByType(type).subscribe((entries) => {
      const simplified = entries.slice(0, 50).map(({ name, url }) => {
        const id = getIdFromPokemonUrl(url);
        return {
          name,
          id,
          image: getPokemonImageUrl(id),
          types: [], // pas utilisés ici
        };
      });

      this.pokemons = simplified;
      this.filteredPokemons = [...simplified];
      this.sortByName(this.sortOrder);
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
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
}
