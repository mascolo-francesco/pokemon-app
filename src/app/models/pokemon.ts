import { NamedApiResource } from './api';

/**
 * Abilità posseduta da un Pokemon.
 */
export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedApiResource;
}

/**
 * Valore di una statistica base del Pokemon (hp, attack, speed, ...).
 */
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

/**
 * Tipo associato al Pokemon (es. "ground").
 */
export interface PokemonTypeSlot {
  slot: number;
  type: NamedApiResource;
}

/**
 * URL degli sprite del Pokemon.
 */
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  } | null;
}

/**
 * Versione audio del verso del Pokemon.
 */
export interface PokemonCries {
  latest: string | null;
  legacy: string | null;
}

/**
 * Risposta di `GET /api/v2/pokemon/{id o nome}`: i dettagli di un Pokemon.
 */
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  cries: PokemonCries;
}
