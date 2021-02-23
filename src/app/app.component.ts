import { Component } from '@angular/core';
import * as Sentry from "@sentry/angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-dream-app';

  constructor() {
    Sentry.configureScope(scope => {
      scope.setUser({
        id: 'sentry-demo-user-id'
      });
    });
  }

  sendError() {
    const a = [];
    const b = a[0][1];
  }
}
