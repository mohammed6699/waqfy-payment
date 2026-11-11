import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((c) => c.Home),
      },
      {
        path: 'quick-payment',
        loadComponent: () => import('./features/quick-payment/quick-payment').then(c => c.QuickPayment)
      }
    ],
  },
];
