import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PokeApi } from './poke-api';

describe('PokeApi', () => {
  let service: PokeApi;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PokeApi);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request the list of pokemon types', () => {
    let typeNames: string[] = [];

    service.getTypes().subscribe((response) => {
      typeNames = response.results.map((type) => type.name);
    });

    const request = httpTesting.expectOne('https://pokeapi.co/api/v2/type');
    expect(request.request.method).toBe('GET');

    request.flush({
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
        { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
      ],
    });

    expect(typeNames).toEqual(['fire', 'water']);
  });

  it('should request a single type by name', () => {
    let pokemonNames: string[] = [];

    service.getType('fire').subscribe((response) => {
      pokemonNames = response.pokemon.map((entry) => entry.pokemon.name);
    });

    const request = httpTesting.expectOne('https://pokeapi.co/api/v2/type/fire');
    expect(request.request.method).toBe('GET');

    request.flush({
      id: 10,
      name: 'fire',
      damage_relations: {
        no_damage_to: [],
        half_damage_to: [],
        double_damage_to: [],
        no_damage_from: [],
        half_damage_from: [],
        double_damage_from: [],
      },
      names: [],
      pokemon: [
        { slot: 1, pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' } },
      ],
    });

    expect(pokemonNames).toEqual(['charmander']);
  });
});
