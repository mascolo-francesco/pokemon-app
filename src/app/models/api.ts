/**
 * Risorsa generica della PokeAPI: ogni collegamento tra risorse è espresso
 * tramite nome e URL (es. gli elementi di `results`, `pokemon[].pokemon`, `types[].type`).
 */
export interface NamedApiResource {
  name: string;
  url: string;
}

/**
 * Risposta paginata standard delle API PokeAPI (es. `GET /api/v2/type`).
 */
export interface ApiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
