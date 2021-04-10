import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMapComponent } from './main-map/main-map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NistkastenDetailsComponent } from './nistkasten-details/nistkasten-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMapComponent,
    DashboardComponent,
    NistkastenDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
