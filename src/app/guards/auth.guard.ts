import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, UrlTree, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthForMatch();
  }

  private checkAuth(): boolean | UrlTree {
    if (this.authService.isAuthenticated() && this.authService.validateToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private checkAuthForMatch(): boolean {
    if (this.authService.isAuthenticated() && this.authService.validateToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
} 