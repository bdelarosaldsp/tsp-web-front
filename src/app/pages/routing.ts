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
    path: 'trazability',
    loadChildren: () =>
      import('../modules/trazability/trazability.module').then((m) => m.TrazabilityModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
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
