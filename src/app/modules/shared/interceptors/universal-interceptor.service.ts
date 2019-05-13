import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import {Request} from 'express';
import {REQUEST} from '@nguniversal/express-engine/tokens';

@Injectable()
export class UniversalInterceptorService implements HttpInterceptor {

  constructor(
    @Optional() @Inject('serverUrl') protected serverUrl: string
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const serverReq = !this.serverUrl ? req : req.clone({
      url: `${req.url}`
    });

    return next.handle(serverReq);
  }
}
