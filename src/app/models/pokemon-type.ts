import { NamedApiResource } from './api';

/**
 * Relazioni di danno di un tipo: verso quali tipi infligge danno e da quali lo riceve.
 */
export interface TypeDamageRelations {
  no_damage_to: NamedApiResource[];
  half_damage_to: NamedApiResource[];
  double_damage_to: NamedApiResource[];
  no_damage_from: NamedApiResource[];
  half_damage_from: NamedApiResource[];
  double_damage_from: NamedApiResource[];
}

/**
 * Nome localizzato di un tipo (es. "Fuoco" per la lingua italiana).
 */
export interface PokemonTypeName {
  name: string;
  language: NamedApiResource;
}

/**
 * Un Pokemon che appartiene al tipo, con il relativo slot.
 */
export interface TypePokemonEntry {
  slot: number;
  pokemon: NamedApiResource;
}

/**
 * Risposta di `GET /api/v2/type/{id o nome}`: una categoria di Pokemon.
 */
export interface PokemonType {
  id: number;
  name: string;
  damage_relations: TypeDamageRelations;
  names: PokemonTypeName[];
  pokemon: TypePokemonEntry[];
}
