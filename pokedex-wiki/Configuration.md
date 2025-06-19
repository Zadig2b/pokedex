# ⚙️ Configuration de l'application

## Bootstrap (main.ts)

```ts
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

## app.config.ts

Configuration centralisée :
```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};
```

