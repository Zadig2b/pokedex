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

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 50): Observable<PokemonListApiResponse> {
    return this.http.get<PokemonListApiResponse>(
      `${this.apiUrl}?limit=${limit}`
    );
  }

  getPokemonDetails(name: string): Observable<PokemonDetailsApiResponse> {
    return this.http.get<PokemonDetailsApiResponse>(`${this.apiUrl}/${name}`);
  }

  getEnrichedPokemonList(): Observable<Pokemon[]> {
    return this.getPokemons().pipe(
      switchMap((res: PokemonListApiResponse) => {
        const baseList = res.results.map((p: RawPokemon, i: number) => ({
          name: p.name,
          id: i + 1,
          image: getPokemonImageUrl(i + 1),
          url: p.url,
        }));

        const details$ = baseList.map((p) => this.getPokemonDetails(p.name));

        return forkJoin(details$).pipe(
          map((details: PokemonDetailsApiResponse[]) =>
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
