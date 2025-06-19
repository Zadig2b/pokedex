import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

/**
 * Configuration des routes de l'application.
 * Définit les correspondances entre les URL et les composants à afficher.
 */
export const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent,
    // Route racine: affiche la liste des Pokémon
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailComponent,
    // Route avec paramètre dynamique 'name': affiche les détails d'un Pokémon spécifique
    // Exemple: /pokemon/pikachu affichera les détails de Pikachu
  },
];
