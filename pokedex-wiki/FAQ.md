# ❓ FAQ

### Pourquoi utiliser des standalone components ?
Cela permet d'éviter les `NgModules` et d’avoir une architecture plus moderne, modulaire et simple à tester.

### Pourquoi abandonner `forkJoin` ?
Car on affiche uniquement les données de base (nom, image, ID) dans la liste. Les détails sont récupérés uniquement en cas de besoin dans la page de détails.

### Pourquoi `withFetch()` ?
Pour améliorer les performances et la compatibilité SSR.

