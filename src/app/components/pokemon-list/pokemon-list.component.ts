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

/**
 * Composant d'affichage de la liste des Pokémons.
 * Applique les filtres reçus du parent (nom, type, tri).
 * Récupère les données depuis l'API via PokemonService.
 */
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnChanges {
  /** Service pour accéder aux données Pokémon (injecté). */
  private pokemonService = inject(PokemonService);

  /** Terme de recherche sur le nom (fourni par le parent). */
  @Input() search = '';

  /** Type de Pokémon sélectionné pour filtrer (fourni par le parent). */
  @Input() selectedType = '';

  /** Ordre de tri : 'asc' ou 'desc' (fourni par le parent). */
  @Input() sortOrder: 'asc' | 'desc' = 'asc';

  /** Liste des Pokémons affichés (données filtrées). */
  readonly pokemons = signal<Pokemon[]>([]);

  /** Signal local pour le terme de recherche. */
  private searchSignal = signal(this.search);

  /** Signal local pour le type sélectionné. */
  private selectedTypeSignal = signal(this.selectedType);

  /** Signal local pour l'ordre de tri. */
  private sortOrderSignal = signal(this.sortOrder);

  /**
   * Initialise la liste avec les Pokémons par défaut
   * et met en place un effet pour surveiller les changements de type.
   */
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

  /**
   * Gère les changements des @Input et met à jour les signaux internes.
   * @param changes Objet contenant les propriétés modifiées
   */
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

  /**
   * Charge les 50 premiers Pokémons par défaut (sans filtre de type).
   */
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

  /**
   * Liste des Pokémons filtrée et triée selon le nom et l'ordre défini.
   * Utilise les signaux `searchSignal` et `sortOrderSignal`.
   */
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
