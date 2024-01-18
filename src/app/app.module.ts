import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './shared/components/accueil/accueil.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthTokenInterceptor } from './shared/interceptors/auth-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotfoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule
],
  providers: [{
    provide : HTTP_INTERCEPTORS, useClass : AuthTokenInterceptor, multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
