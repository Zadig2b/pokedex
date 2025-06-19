import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListPageComponent } from './pages/pokemon-list/pokemon-list.page'; // ← nouvelle page standalone

/**
 * Configuration des routes de l'application.
 * Définit les correspondances entre les URL et les composants à afficher.
 */
export const routes: Routes = [
  {
    path: '',
    component: PokemonListPageComponent, 
    // Route racine: affiche la liste des Pokémon
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailComponent,
    // Route avec paramètre dynamique 'name': affiche les détails d'un Pokémon spécifique
    // Exemple: /pokemon/pikachu affichera les détails de Pikachu
  },
];
