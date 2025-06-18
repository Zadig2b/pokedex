import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonDetailsApiResponse } from '../../models/pokemon.model';

/**
 * Composant d'affichage du détail d'un Pokémon.
 * Il récupère le paramètre "name" dans l'URL et
 * interroge le service pour obtenir les informations
 * complètes du Pokémon correspondant.
 */

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit {
  /**
   * Données du Pokémon affiché.
   */
  pokemon!: PokemonDetailsApiResponse;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    // On lit le paramètre "name" de la route actuelle
    const name = this.route.snapshot.paramMap.get('name');

    // Si un nom est présent, on demande les détails au service
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        // Mise à jour de la propriété qui sera affichée dans le template
        this.pokemon = data;
      });
    }
  }
}
