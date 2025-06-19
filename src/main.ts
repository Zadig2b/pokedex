/**
 * @file main.ts
 * @description Point d’entrée principal de l’application Angular.
 * Utilise la fonction `bootstrapApplication` pour démarrer l’application
 * avec `AppComponent` comme composant racine, et une configuration centralisée via `appConfig`.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/**
 * Initialise l’application Angular avec la configuration définie dans `app.config.ts`.
 * Gère également la capture des erreurs de démarrage.
 *
 * @function bootstrapApplication
 * @param {Type<unknown>} AppComponent - Le composant racine de l'application.
 * @param {ApplicationConfig} appConfig - Configuration globale de l'application (providers, router, http...).
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
