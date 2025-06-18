import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  PokemonListApiResponse,
  PokemonDetailsApiResponse,
} from '../models/pokemon.model';

/**
 * Service centralisant tous les appels à l'API PokéAPI.
 * Il fournit des méthodes pour récupérer la liste des Pokémon,
 * les détails d'un Pokémon et une liste enrichie avec image et types.
 */

@Injectable({ providedIn: 'root' })
export class PokemonService {
  /** URL de base de l'API PokéAPI */
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des Pokémon (nom + URL) en limitant le nombre de résultats.
   */
  getPokemons(limit: number = 50): Observable<PokemonListApiResponse> {
    return this.http.get<PokemonListApiResponse>(
      `${this.apiUrl}?limit=${limit}`
    );
  }

  /**
   * Récupère les détails d'un Pokémon à partir de son nom.
   */
  getPokemonDetails(name: string): Observable<PokemonDetailsApiResponse> {
    return this.http.get<PokemonDetailsApiResponse>(`${this.apiUrl}/${name}`);
  }

  /**
   * Récupère la liste des Pokémon associés à un type donné (ex: "fire", "water").
   * Chaque entrée contient le nom et l'URL du Pokémon.
   * Utilise l'endpoint https://pokeapi.co/api/v2/type/{type}
   *
   * @param type Le nom du type (ex: "fire", "grass", "electric")
   * @returns Un Observable d'un tableau d'objets { name, url }
   */
  getPokemonEntriesByType(
    type: string
  ): Observable<{ name: string; url: string }[]> {
    return (
      this.http
        // Appel GET à l’API de type, qui retourne un tableau 'pokemon[]'
        .get<{ pokemon: { pokemon: { name: string; url: string } }[] }>(
          `https://pokeapi.co/api/v2/type/${type}`
        )
        .pipe(
          // Transformation du résultat pour ne garder que { name, url }
          map((res) => res.pokemon.map((entry) => entry.pokemon))
        )
    );
  }

  /**
   * Récupère la liste des noms de tous les types de Pokémon disponibles dans l'API.
   * Utilise l'endpoint https://pokeapi.co/api/v2/type
   *
   * @returns Un Observable contenant un tableau de strings (ex: ["fire", "water", ...])
   */
  getAllTypes(): Observable<string[]> {
    return (
      this.http
        // Appel GET à l’endpoint /type qui retourne { results: [{ name, url }] }
        .get<{ results: { name: string }[] }>('https://pokeapi.co/api/v2/type')
        .pipe(
          // On extrait uniquement le nom de chaque type
          map((res) => res.results.map((t) => t.name))
        )
    );
  }
}
