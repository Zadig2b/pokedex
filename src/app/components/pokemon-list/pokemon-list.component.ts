import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { extractTypesFromList } from '../../utils/pokemon-utils';

/**
 * Composant responsable de l'affichage de la liste des Pokémon.
 * Il gère la recherche, le tri et le filtrage par type.
 */

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  /** Liste complète récupérée depuis l'API */
  pokemons: Pokemon[] = [];

  /** Liste filtrée affichée dans le template */
  filteredPokemons: Pokemon[] = [];

  /** Tous les types disponibles pour le filtrage */
  availableTypes: string[] = [];

  /** Type sélectionné par l'utilisateur */
  selectedType: string = '';

  /** Ordre de tri courant */
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // Récupération des Pokémon enrichis via le service
    this.pokemonService.getEnrichedPokemonList().subscribe((list) => {
      // Liste initiale
      this.pokemons = list;
      // Copie pour l'affichage filtré
      this.filteredPokemons = [...list];
      // Préparation des types disponibles pour la liste déroulante
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
    // Mémorisation de l'ordre souhaité
    this.sortOrder = order;

    // Tri in-place de la liste filtrée
    this.filteredPokemons.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  filterByType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const type = target?.value || '';

    // Sauvegarde du type sélectionné
    this.selectedType = type;

    // Application du filtre ou réinitialisation
    this.filteredPokemons = type
      ? this.pokemons.filter((p) => p.types.includes(type))
      : [...this.pokemons];
  }
}
