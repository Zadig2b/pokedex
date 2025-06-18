import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // pour [routerLink]
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ AJOUT ICI
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((res) => {
      this.pokemons = res.results.map((p: any, i: number) => ({
        name: p.name,
        id: i + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
      }));
      this.filteredPokemons = [...this.pokemons];
    });
  }

  sortByName(order: 'asc' | 'desc') {
    this.filteredPokemons.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

onSearch(event: Event): void {
  const target = event.target as HTMLInputElement;
  const query = target.value.trim().toLowerCase();

  this.filteredPokemons = this.pokemons.filter((p) =>
    p.name.toLowerCase().includes(query)
  );
}

}
