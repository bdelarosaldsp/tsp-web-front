import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      //import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'appsnet',
    loadChildren: () =>
      import('../modules/appsnet/appsnet.module').then((m) => m.AppsnetModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('../modules/report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'images',
    loadChildren: () =>
      import('../modules/images/images.module').then((m) => m.ImagesModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
