import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TypeDetail } from './type-detail';

const TYPE_RESPONSE = {
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
    { slot: 1, pokemon: { name: 'vulpix', url: 'https://pokeapi.co/api/v2/pokemon/37/' } },
  ],
};

describe('TypeDetail', () => {
  let fixture: ComponentFixture<TypeDetail>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeDetail],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should request the selected category and list its pokemon', async () => {
    fixture = TestBed.createComponent(TypeDetail);
    fixture.componentRef.setInput('typeName', 'fire');
    fixture.detectChanges();

    httpTesting.expectOne('https://pokeapi.co/api/v2/type/fire').flush(TYPE_RESPONSE);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.pokemon').length).toBe(2);
    expect(element.textContent).toContain('charmander');
  });

  it('should build the sprite url from the pokemon resource url', () => {
    fixture = TestBed.createComponent(TypeDetail);

    expect(
      fixture.componentInstance['spriteUrl']('https://pokeapi.co/api/v2/pokemon/37/'),
    ).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png');
  });

  it('should show an error message when the request fails', async () => {
    fixture = TestBed.createComponent(TypeDetail);
    fixture.componentRef.setInput('typeName', 'fire');
    fixture.detectChanges();

    httpTesting
      .expectOne('https://pokeapi.co/api/v2/type/fire')
      .flush('errore', { status: 404, statusText: 'Not Found' });
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.avviso--errore')).not.toBeNull();
  });
});
