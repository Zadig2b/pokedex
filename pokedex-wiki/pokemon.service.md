# 📘 Documentation du Service `PokemonService`

Ce service Angular centralise les appels HTTP vers l'API publique [PokéAPI](https://pokeapi.co). Il fournit des méthodes pour :

* récupérer la liste des Pokémon,
* accéder aux détails d'un Pokémon spécifique,
* filtrer les Pokémon par type,
* obtenir la liste des types existants.

---

## 🔧 Résumé des méthodes

| Méthode                     | Description                                   |
| --------------------------- | --------------------------------------------- |
| `getPokemons(limit)`        | Récupère une liste de Pokémon avec nom + URL  |
| `getPokemonDetails(name)`   | Récupère les détails d’un Pokémon spécifique  |
| `getPokemonEntriesByType()` | Donne les Pokémon liés à un type (name + url) |
| `getAllTypes()`             | Liste les noms de tous les types Pokémon      |

---

## 📈 Diagramme Mermaid.js du Service

```mermaid
flowchart TD
    A[PokemonService] --> B[getPokemons(limit)]
    A --> C[getPokemonDetails(name)]
    A --> D[getPokemonEntriesByType(type)]
    A --> E[getAllTypes()]

    B --> F[GET /pokemon?limit=]
    C --> G[GET /pokemon/:name]
    D --> H[GET /type/:type]
    E --> I[GET /type]
```

---

## 🧪 Notes techniques

* Toutes les méthodes retournent des `Observable`, compatibles avec `async` pipe dans les templates.
* Les transformations via `.pipe(map(...))` permettent d’extraire uniquement les données pertinentes des réponses JSON.
* L’API PokéAPI ne retourne pas de données enrichies directement (image, types), elles doivent être construites via `getPokemonDetails()`.

---

## 🧠 Exemple d'utilisation dans un composant

```ts
@Component({...})
export class PokemonListComponent implements OnInit {
  pokemons$ = this.pokemonService.getPokemons();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // ou gérer l'abonnement manuellement si besoin
  }
}
```

---

## ✅ Résumé

Ce service est une couche d’abstraction propre et centralisée pour consommer la PokéAPI. Il est injectable globalement (`providedIn: 'root'`) et facilite la maintenance du code client.
