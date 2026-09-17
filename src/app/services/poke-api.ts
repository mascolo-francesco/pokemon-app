import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiListResponse, NamedApiResource, PokemonType } from '../models';

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
   */
  getTypes(): Observable<ApiListResponse<NamedApiResource>> {
    return this.http.get<ApiListResponse<NamedApiResource>>(`${API_BASE_URL}/type`);
  }

  /**
   * Dettaglio di una categoria, con l'elenco dei Pokémon che ne fanno parte:
   * `GET /type/{nome o id}`.
   */
  getType(name: string): Observable<PokemonType> {
    return this.http.get<PokemonType>(`${API_BASE_URL}/type/${name}`);
  }
}
