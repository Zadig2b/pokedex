/**
 * Point d'entrée principal de l'application Angular.
 * Ce fichier est responsable du démarrage (bootstrap) de l'application.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

/**
 * Démarre l'application Angular avec AppComponent comme composant racine.
 * Configure les providers essentiels:
 * - Le routeur pour la navigation entre les pages
 * - Le client HTTP pour les appels à l'API PokéAPI
 */
bootstrapApplication(AppComponent, {
  providers: [
    // Configure le routeur avec les routes définies dans app.routes.ts
    provideRouter(routes),

    // Configure le client HTTP avec l'API Fetch pour les requêtes réseau
    provideHttpClient(withFetch())
  ],
}).catch((err) => console.error(err));
