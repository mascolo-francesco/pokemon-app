import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NamedApiResource } from '../../models';
import { PokeApi } from '../../services/poke-api';

@Component({
  selector: 'app-type-list',
  imports: [RouterLink],
  templateUrl: './type-list.html',
  styleUrl: './type-list.css',
})
export class TypeList {
  private readonly pokeApi = inject(PokeApi);

  protected readonly types = signal<NamedApiResource[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  /** Card fantasma mostrate durante il caricamento. */
  protected readonly placeholders = Array.from({ length: 12 }, (_, index) => index);

  constructor() {
    this.pokeApi.getTypes().subscribe({
      next: (response) => {
        // "unknown" è un segnaposto senza Pokémon associati: non è una categoria reale.
        this.types.set(response.results.filter((type) => type.name !== 'unknown'));
        this.loading.set(false);
      },
      error: () => {
        this.error.set(
          'Impossibile caricare le categorie. Verifica la connessione e ricarica la pagina.',
        );
        this.loading.set(false);
      },
    });
  }
}
