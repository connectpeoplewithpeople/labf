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
import { HelpComponent } from './view/help/help.component';
import { AllianceComponent } from './view/static/alliance/alliance.component';
import { RequestComponent } from './view/static/request/request.component';
import { PolicyComponent } from './view/static/policy/policy.component';
import { PrivacyComponent } from './view/static/privacy/privacy.component';
import { IntroComponent } from './view/static/intro/intro.component';
import { NotfoundpageComponent } from './view/error/notfoundpage/notfoundpage.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'help', component: HelpComponent },
  { path: 'static/intro', component: IntroComponent },
  { path: 'static/policy', component: PolicyComponent },
  { path: 'static/privacy', component: PrivacyComponent },
  { path: 'static/request', component: RequestComponent },
  { path: 'static/alliance', component: AllianceComponent },
  { path: '**', component: NotfoundpageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NotfoundpageComponent,
    NavbarComponent,
    FooterComponent,
    AllianceComponent,
    RequestComponent,
    PolicyComponent,
    PrivacyComponent,
    IntroComponent,
    HelpComponent
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
