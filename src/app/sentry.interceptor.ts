import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import * as Sentry from '@sentry/browser';

@Injectable()
export class SentryInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(error => {
          if ('HttpErrorResponse' === error.name) {
            SentryInterceptor.handleErrorResponse(req, error);
          }
          return throwError(error);
        })
      );
  }

  private static handleErrorResponse(req: HttpRequest<any>, res: HttpErrorResponse): void {
    const event: Sentry.Event = {
      message: `${req.method} request to ${req.url} failed with ${res.status}.`,
      contexts: {
        'context': {
          request: {
            method: req.method,
            url: req.url
          },
          response: {
            status: res.status,
            message: res.message
          }
        }
      }
    };

    Sentry.captureEvent(event);
  }
}
