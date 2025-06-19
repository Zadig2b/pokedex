import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListPageComponent } from './pages/pokemon-list/pokemon-list.page'; // ← nouvelle page standalone

export const routes: Routes = [
  {
    path: '',
    component: PokemonListPageComponent, 
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailComponent,
  },
];
