import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {APP_INITIALIZER, ErrorHandler, NgModule} from "@angular/core";
import {Router} from "@angular/router";
import * as Sentry from "@sentry/angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SentryInterceptor} from './sentry.interceptor';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
      },
      deps: [Sentry.TraceService],
      multi: true,
    },
    {provide: HTTP_INTERCEPTORS, useClass: SentryInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
