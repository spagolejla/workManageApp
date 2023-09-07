import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/employee/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  apiUrl: string = `${environment.apiUrl}/employee`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/authenticate`, loginData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUser(response.loggedUser);
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  setUser(user: Employee) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): Employee | null {
    return JSON.parse(localStorage.getItem(this.userKey) as string);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
