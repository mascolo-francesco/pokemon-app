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
});
