import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonDetailsApiResponse } from '../../models/pokemon.model';
import { Router } from '@angular/router';

/**
 * Composant affichant les détails d'un Pokémon spécifique.
 * Récupère les informations détaillées d'un Pokémon à partir de son nom
 * extrait des paramètres de l'URL et les affiche dans une fiche complète.
 */
@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent {
  private router = inject(Router);

  /**
   * Service de route injecté pour accéder aux paramètres de l'URL.
   * Permet de récupérer le nom du Pokémon à partir du segment `:name` de l'URL.
   */
  private route = inject(ActivatedRoute);

  /**
   * Service Pokémon injecté pour effectuer les appels à l'API.
   * Utilisé pour récupérer les détails d'un Pokémon spécifique.
   */
  private pokemonService = inject(PokemonService);

  /**
   * Signal réactif contenant les données détaillées du Pokémon.
   * Initialisé à null et mis à jour lorsque les données sont récupérées de l'API.
   * Utilisé dans le template pour afficher les informations du Pokémon.
   */
  readonly pokemon = signal<PokemonDetailsApiResponse | null>(null);

  constructor() {
    // Utilisation d'un effet pour réagir aux changements de paramètres d'URL
    effect(() => {
      // Récupère le paramètre 'name' de l'URL (ex: /pokemon/pikachu)
      const name = this.route.snapshot.paramMap.get('name');
      if (name) {
        // Appelle le service pour récupérer les détails du Pokémon
        this.pokemonService.getPokemonDetails(name).subscribe((data) => {
          // Met à jour le signal avec les données reçues
          this.pokemon.set(data);
        });
      }
    });
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
