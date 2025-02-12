import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccederComponent } from './componentes/acceder/acceder.component';
import { Error404Component } from './componentes/error404/error404.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccederTokenInterceptor } from './utils/aceder-token.interceptor';
import { Error401Component } from './componentes/error401/error401.component';
import { HomeUsersComponent } from './componentes/home-users/home-users.component';
import { ApiMapaComponent } from './componentes/api-mapa/api-mapa.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { MapaLeafletComponent } from './apis/mapa-leaflet/mapa-leaflet.component';
import { VideoCallComponent } from './apis/video-call/video-call.component';
import { PagoComponent } from '../pago/pago.component'; // Importa el componente de pago



@NgModule({
  declarations: [
    AppComponent,
    AccederComponent,
    Error404Component,
    Error401Component,
    HomeUsersComponent,
    ApiMapaComponent,
    MapaLeafletComponent,
    VideoCallComponent,
    PagoComponent // Declara el componente de pago
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('474077138996545') // Coloca tu Facebook App ID
          }
        ]
      } as SocialAuthServiceConfig,
    },
    /*provideClientHydration(),*/
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AccederTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
