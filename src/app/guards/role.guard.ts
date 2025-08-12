import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, ActivatedRouteSnapshot, UrlTree, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanMatch {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route);
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkRoleForMatch(route);
  }

  private checkRole(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredRole = route.data['role'];
    
    if (!requiredRole) {
      return true;
    }
    
    if (this.authService.isAuthenticated() && this.authService.hasRole(requiredRole)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  private checkRoleForMatch(route: Route): boolean {
    const requiredRole = route.data?.['role'];
    
    if (!requiredRole) {
      return true;
    }
    
    if (this.authService.isAuthenticated() && this.authService.hasRole(requiredRole)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
} 