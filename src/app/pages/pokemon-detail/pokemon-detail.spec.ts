import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PokemonDetail } from './pokemon-detail';

const POKEMON_RESPONSE = {
  id: 28,
  name: 'sandslash',
  height: 10,
  weight: 295,
  base_experience: 158,
  abilities: [{ is_hidden: false, slot: 1, ability: { name: 'sand-veil', url: '' } }],
  sprites: {
    front_default: 'https://example.com/28.png',
    front_shiny: null,
    back_default: null,
    back_shiny: null,
    other: {
      'official-artwork': {
        front_default: 'https://example.com/28-artwork.png',
        front_shiny: null,
      },
    },
  },
  stats: [{ base_stat: 75, effort: 0, stat: { name: 'hp', url: '' } }],
  types: [{ slot: 1, type: { name: 'ground', url: '' } }],
  cries: { latest: 'https://example.com/28.ogg', legacy: null },
};

describe('PokemonDetail', () => {
  let fixture: ComponentFixture<PokemonDetail>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetail],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should request the selected pokemon and render its details', async () => {
    fixture = TestBed.createComponent(PokemonDetail);
    fixture.componentRef.setInput('pokemonName', 'sandslash');
    fixture.detectChanges();

    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/sandslash').flush(POKEMON_RESPONSE);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('sandslash');
    expect(element.querySelector('.numero')?.textContent).toContain('28');
    expect(element.querySelector('.misura dd')?.textContent).toBe('1,0 m');
    expect(element.querySelector('.tipo')?.textContent).toContain('ground');
    expect(element.querySelector('.statistica__nome')?.textContent).toContain('PS');
    expect(element.querySelector('.statistica__valore')?.textContent).toContain('75');
  });

  it('should prefer the official artwork for the picture', async () => {
    fixture = TestBed.createComponent(PokemonDetail);
    fixture.componentRef.setInput('pokemonName', 'sandslash');
    fixture.detectChanges();

    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/sandslash').flush(POKEMON_RESPONSE);
    await fixture.whenStable();

    const image = (fixture.nativeElement as HTMLElement).querySelector('.arte__sprite');
    expect(image?.getAttribute('src')).toBe('https://example.com/28-artwork.png');
  });

  it('should link each type back to the list of its category', async () => {
    fixture = TestBed.createComponent(PokemonDetail);
    fixture.componentRef.setInput('pokemonName', 'sandslash');
    fixture.detectChanges();

    httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/sandslash').flush(POKEMON_RESPONSE);
    await fixture.whenStable();

    const typeLink = (fixture.nativeElement as HTMLElement).querySelector('a.tipo');
    expect(typeLink?.getAttribute('href')).toBe('/types/ground');
  });

  it('should show an error message when the request fails', async () => {
    fixture = TestBed.createComponent(PokemonDetail);
    fixture.componentRef.setInput('pokemonName', 'sandslash');
    fixture.detectChanges();

    httpTesting
      .expectOne('https://pokeapi.co/api/v2/pokemon/sandslash')
      .flush('errore', { status: 404, statusText: 'Not Found' });
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.avviso--errore')).not.toBeNull();
  });
});
