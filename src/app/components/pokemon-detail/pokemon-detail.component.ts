import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonDetailsApiResponse } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  // Signal réactif pour stocker les données du Pokémon
  readonly pokemon = signal<PokemonDetailsApiResponse | null>(null);

  constructor() {
    // Réagit à chaque changement du paramètre "name" dans l'URL
    effect(() => {
      const name = this.route.snapshot.paramMap.get('name');
      if (name) {
        this.pokemonService.getPokemonDetails(name).subscribe((data) => {
          this.pokemon.set(data);
        });
      }
    });
  }
}
