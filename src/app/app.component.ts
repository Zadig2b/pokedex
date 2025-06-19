import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Composant racine de l'application.
 * Sert de conteneur principal pour tous les autres composants.
 * Utilise le RouterOutlet pour afficher le composant correspondant à la route active.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * Titre de l'application utilisé pour le titre de la page dans le navigateur.
   */
  title = 'angular-pokedex';
}
