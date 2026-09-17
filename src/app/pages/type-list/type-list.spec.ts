import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TypeList } from './type-list';

const TYPES_RESPONSE = {
  count: 3,
  next: null,
  previous: null,
  results: [
    { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
    { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
    { name: 'unknown', url: 'https://pokeapi.co/api/v2/type/10001/' },
  ],
};

describe('TypeList', () => {
  let fixture: ComponentFixture<TypeList>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeList],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should request the list of categories on creation', () => {
    fixture = TestBed.createComponent(TypeList);

    const request = httpTesting.expectOne('https://pokeapi.co/api/v2/type');
    expect(request.request.method).toBe('GET');

    request.flush(TYPES_RESPONSE);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one link per category, skipping the unknown placeholder', async () => {
    fixture = TestBed.createComponent(TypeList);

    httpTesting.expectOne('https://pokeapi.co/api/v2/type').flush(TYPES_RESPONSE);
    await fixture.whenStable();

    const links = fixture.nativeElement.querySelectorAll('.carta') as NodeListOf<HTMLAnchorElement>;

    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('fire');
    expect(links[1].textContent).toContain('water');
  });

  it('should show an error message when the request fails', async () => {
    fixture = TestBed.createComponent(TypeList);

    httpTesting
      .expectOne('https://pokeapi.co/api/v2/type')
      .flush('errore', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.avviso--errore')?.textContent).toContain('Impossibile caricare');
  });
});
