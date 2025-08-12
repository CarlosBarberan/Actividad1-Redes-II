import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.get<any>('assets/database.json').pipe(
      map(data => {
        const user = data.users.find((u: User) => 
          u.username === credentials.username && u.password === credentials.password
        );
        
        if (user) {
          const token = this.generateToken(user);
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);
          
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
          
          return {
            success: true,
            user: user,
            token: token,
            message: 'Login exitoso'
          };
        } else {
          return {
            success: false,
            message: 'Credenciales inválidas'
          };
        }
      }),
      catchError(error => {
        return of({
          success: false,
          message: 'Error en el servidor'
        });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000)
    };
    return btoa(JSON.stringify(payload));
  }

  validateToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp < Date.now()) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  }
} 