import { Injectable } from '@angular/core';
import { CanMatch, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanMatch {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated() && this.authService.validateToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
} 