import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";
import {version} from './../package.json';

Sentry.init({
  dsn: "https://e608411811234e0aa74dd62dfea0281a@o530231.ingest.sentry.io/5649466",
  environment: environment.env,
  release: 'sentry-demo@' + version,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "https://pokeapi.co"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
