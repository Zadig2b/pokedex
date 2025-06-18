import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import {
  Pokemon,
  RawPokemon,
  PokemonListApiResponse,
  PokemonDetailsApiResponse,
} from '../models/pokemon.model';
import { getPokemonImageUrl } from '../utils/pokemon-utils';

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
   * Récupère la liste des Pokémon avec leurs types et l'URL de leur sprite.
   * Cette méthode combine plusieurs appels HTTP afin de renvoyer des
   * objets directement exploitables par les composants.
   */
  getEnrichedPokemonList(): Observable<Pokemon[]> {
    return this.getPokemons().pipe(
      switchMap((res: PokemonListApiResponse) => {
        // Construction d'une liste de base avec l'image et l'ID
        const baseList = res.results.map((p: RawPokemon, i: number) => ({
          name: p.name,
          id: i + 1,
          image: getPokemonImageUrl(i + 1),
          url: p.url,
        }));

        // Récupération en parallèle des détails de chaque Pokémon
        const details$ = baseList.map((p) => this.getPokemonDetails(p.name));

        return forkJoin(details$).pipe(
          map((details: PokemonDetailsApiResponse[]) =>
            // Fusion des informations de base avec les types retournés
            baseList.map((p, i) => ({
              ...p,
              types: details[i].types.map((t) => t.type.name),
            }))
          )
        );
      })
    );
  }
}
