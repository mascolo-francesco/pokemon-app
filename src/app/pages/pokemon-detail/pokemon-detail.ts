import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { Pokemon } from '../../models';
import { PokeApi } from '../../services/poke-api';

const STAT_LABELS: Record<string, string> = {
  hp: 'PS',
  attack: 'Attacco',
  defense: 'Difesa',
  'special-attack': 'Attacco Speciale',
  'special-defense': 'Difesa Speciale',
  speed: 'Velocità',
};

/** Valore massimo teorico di una statistica base nella PokeAPI. */
const MAX_BASE_STAT = 255;

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail {
  private readonly pokeApi = inject(PokeApi);

  /** Parametro di rotta `:pokemonName`, collegato grazie a `withComponentInputBinding()`. */
  readonly pokemonName = input.required<string>();

  protected readonly pokemonResource = rxResource({
    params: () => this.pokemonName(),
    stream: ({ params }) => this.pokeApi.getPokemon(params),
  });

  private readonly decimalFormat = new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  /** L'altezza arriva in decimetri: convertita in metri. */
  protected heightInMetres(pokemon: Pokemon): string {
    return this.decimalFormat.format(pokemon.height / 10);
  }

  /** Il peso arriva in ettogrammi: convertito in chilogrammi. */
  protected weightInKg(pokemon: Pokemon): string {
    return this.decimalFormat.format(pokemon.weight / 10);
  }

  /** Tipo principale, usato per colorare la scheda. */
  protected primaryType(pokemon: Pokemon): string {
    return pokemon.types[0]?.type.name ?? 'unknown';
  }

  /** Preferisce l'artwork ufficiale, con lo sprite classico come riserva. */
  protected artworkUrl(pokemon: Pokemon): string | null {
    return (
      pokemon.sprites.other?.['official-artwork']?.front_default ?? pokemon.sprites.front_default
    );
  }

  protected statLabel(name: string): string {
    return STAT_LABELS[name] ?? name;
  }

  /** Frazione 0-1 usata per la lunghezza della barra. */
  protected statRatio(baseStat: number): string {
    return String(Math.min(1, baseStat / MAX_BASE_STAT));
  }
}
