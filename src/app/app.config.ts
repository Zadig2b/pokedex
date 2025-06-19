import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Active l'optimisation des événements pour Zone.js
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Active la relecture d'événements côté client après SSR
    provideClientHydration(withEventReplay()),

    // Fournit le routing Angular
    provideRouter(routes),

    // Fournit HttpClient avec compatibilité SSR via fetch()
    provideHttpClient(withFetch())
  ]
};
