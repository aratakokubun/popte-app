import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { PopteService } from './popte.service';
import { AppRoutingModule } from './app-routing.module';
import { PopteSearchComponent } from './popte-search.component';
import { PopteDetailComponent } from './popte-detail.component';
import { RateComponent } from './parts/rate.component';

@NgModule({
  declarations: [
    AppComponent,
    PopteSearchComponent,
    DashboardComponent,
    PopteDetailComponent,
    RateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [PopteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
