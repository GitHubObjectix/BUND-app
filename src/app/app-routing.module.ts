import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainMapComponent } from './main-map/main-map.component';
import { SetPositionComponent } from './set-position/set-position.component';
import { NistkastenDetailsComponent } from './nistkasten-details/nistkasten-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'all', component: MainMapComponent },
  { path: 'set-position', component: SetPositionComponent },
  { path: 'details', component: NistkastenDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
