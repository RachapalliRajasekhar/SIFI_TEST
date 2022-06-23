import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('Noauth'))
            return next.handle(req.clone());
        let jwtToken = req.clone({
            setHeaders: {
                Authorization: "bearer " + localStorage.getItem('token')
            }
        });
        return next.handle(jwtToken);
    }
}