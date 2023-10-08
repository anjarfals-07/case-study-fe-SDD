import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
  },
  {
    path: 'dashboard',
    component: ChartComponent,
  },

  {
    path: 'info',
    loadChildren: () => import('info/Module').then((m) => m.InfoModule),
  },
  {
    path: 'users',
    loadChildren: () => import('users/Module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
