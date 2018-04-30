import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { IndexComponent } from './view/index/index.component';
import { NotfoundpageComponent } from './view/error/notfoundpage/notfoundpage.component';
import { Game1Component } from './view/game1/game1.component';

const appRoutes: Routes = [
  { path: '', component: Game1Component },
  { path: '**', component: NotfoundpageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NotfoundpageComponent,
    NavbarComponent,
    FooterComponent,
    Game1Component
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, {}
    ),
    FormsModule,
    SuiModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
