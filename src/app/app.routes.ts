import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home.routes').then((m) => m.default),
  },
];

export default routes;
