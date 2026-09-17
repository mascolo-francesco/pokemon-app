import { Routes } from '@angular/router';

import { TypeDetail } from './pages/type-detail/type-detail';
import { TypeList } from './pages/type-list/type-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'types' },
  { path: 'types', component: TypeList, title: 'Tipi di Pokémon' },
  {
    path: 'types/:typeName',
    component: TypeDetail,
    title: (route) => `${route.paramMap.get('typeName')} · Pokémon App`,
  },
  { path: '**', redirectTo: 'types' },
];
