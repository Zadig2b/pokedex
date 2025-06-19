# 🏗️ Architecture

Le projet suit les recommandations Angular modernes avec :

- **Standalone Components**
- Organisation par **domaines fonctionnels** :
  - `components/`
  - `pages/`
  - `services/`
  - `models/`
  - `utils/`

## Structure des fichiers

```
src/
├── app/
│   ├── components/       # Composants réutilisables
│   ├── pages/            # Pages avec logique globale
│   ├── services/         # Communication avec l’API externe
│   ├── models/           # Interfaces TypeScript
│   └── utils/            # Fonctions utilitaires
```

