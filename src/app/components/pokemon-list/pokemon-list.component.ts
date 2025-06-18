import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

interface RawPokemon {
  name: string;
  url: string;
}

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
    this.pokemonService.getPokemons().subscribe((res) => {
      const baseList = (res.results as RawPokemon[]).map((p, i) => ({
        name: p.name,
        id: i + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
        url: p.url,
      }));

      const details$ = baseList.map((p) =>
        this.pokemonService.getPokemonDetails(p.name)
      );

      forkJoin(details$).subscribe((details: any[]) => {
        this.pokemons = baseList.map((p, i) => ({
          ...p,
          types: details[i].types.map((t: any) => t.type.name),
        }));
        this.filteredPokemons = [...this.pokemons];
        this.extractTypes();
      });
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase();
    this.filteredPokemons = this.pokemons.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
  }

  sortByName(order: 'asc' | 'desc') {
    this.sortOrder = order;
    this.filteredPokemons.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  extractTypes(): void {
    const allTypes = this.pokemons.flatMap((p) => p.types);
    this.availableTypes = [...new Set(allTypes)].sort();
  }

filterByType(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const type = target?.value || '';
  this.selectedType = type;

  if (type === '') {
    this.filteredPokemons = [...this.pokemons];
  } else {
    this.filteredPokemons = this.pokemons.filter((p) =>
      p.types.includes(type)
    );
  }
}

}
