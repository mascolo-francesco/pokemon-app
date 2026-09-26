import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiListResponse, NamedApiResource, Pokemon, PokemonType } from '../models';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Client HTTP verso la PokeAPI (https://pokeapi.co).
 */
@Injectable({
  providedIn: 'root',
})
export class PokeApi {
  private readonly http = inject(HttpClient);

  /**
   * Elenco delle categorie (tipi) disponibili: `GET /type`.
   * Senza `limit` l'API restituisce solo 20 risultati per volta, lasciando fuori
   * categorie reali (es. "shadow"): il limite alto le raccoglie tutte in una richiesta.
   */
  getTypes(): Observable<ApiListResponse<NamedApiResource>> {
    return this.http.get<ApiListResponse<NamedApiResource>>(`${API_BASE_URL}/type?limit=100`);
  }

  /**
   * Dettaglio di una categoria, con l'elenco dei Pokémon che ne fanno parte:
   * `GET /type/{nome o id}`.
   */
  getType(name: string): Observable<PokemonType> {
    return this.http.get<PokemonType>(`${API_BASE_URL}/type/${name}`);
  }

  /**
   * Dettagli di un Pokémon: `GET /pokemon/{nome o id}`.
   */
  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${API_BASE_URL}/pokemon/${name}`);
  }
}
