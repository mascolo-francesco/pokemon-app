import { Routes } from '@angular/router';

import { TypeList } from './pages/type-list/type-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'types' },
  { path: 'types', component: TypeList, title: 'Tipi di Pokémon' },
  { path: '**', redirectTo: 'types' },
];
