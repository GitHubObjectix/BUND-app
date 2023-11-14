import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { MainMapComponent } from './main-map/main-map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NistkastenDetailsComponent } from './nistkasten-details/nistkasten-details.component';
import { NistkastenService } from './nistkasten.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SetPositionComponent } from './set-position/set-position.component';
import { NistkastenCommentsComponent } from './nistkasten-comments/nistkasten-comments.component'

export function appInit(nistkastenService: NistkastenService) {
  return () => nistkastenService.loadNistkaesten();
}

@NgModule({
  declarations: [
    AppComponent,
    MainMapComponent,
    DashboardComponent,
    NistkastenDetailsComponent,
    SetPositionComponent,
    NistkastenCommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonToggleModule
  ],
  providers: [NistkastenService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [NistkastenService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
