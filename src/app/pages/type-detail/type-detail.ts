import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { PokeApi } from '../../services/poke-api';

const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

@Component({
  selector: 'app-type-detail',
  imports: [RouterLink],
  templateUrl: './type-detail.html',
  styleUrl: './type-detail.css',
})
export class TypeDetail {
  private readonly pokeApi = inject(PokeApi);

  /** Parametro di rotta `:typeName`, collegato grazie a `withComponentInputBinding()`. */
  readonly typeName = input.required<string>();

  protected readonly typeResource = rxResource({
    params: () => this.typeName(),
    stream: ({ params }) => this.pokeApi.getType(params),
  });

  /** Card fantasma mostrate durante il caricamento. */
  protected readonly placeholders = Array.from({ length: 12 }, (_, index) => index);

  /** Ricava l'id dal link della risorsa per costruire l'URL dello sprite. */
  protected spriteUrl(resourceUrl: string): string {
    const segments = resourceUrl.split('/').filter(Boolean);
    return `${SPRITE_BASE_URL}/${segments.at(-1)}.png`;
  }
}
