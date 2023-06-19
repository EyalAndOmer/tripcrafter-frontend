import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom, Observable} from "rxjs";
import {Router} from "@angular/router";
import {LoginPayload, User} from "../../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/verificate';
  private _user: User;

  constructor(private http: HttpClient) {
    this._user = { id: 0, accessToken: '', role: '', keepLoggedIn: false };
  }

  get jwtToken(): string {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return "";
  }

  set jwtToken(value: string) {
    this._user.accessToken = value;
    localStorage.setItem("token", value);
  }

  get userRole(): string {
    return this._user.role;
  }

  set userRole(value: string) {
    this._user.role = value;
  }

  get keepLoggedIn(): boolean {
    if (this._user.keepLoggedIn) {
      return this._user.keepLoggedIn;
    }
    return false;
  }

  async loginUser(keepLoggedIn: boolean, payload: LoginPayload) {
    await firstValueFrom(this.http.post<User>('http://localhost:8080/api/auth/auth', payload))
      .then(response => {
        this.user = response;
    })
  }

  get user() {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
    localStorage.setItem("token", user.accessToken);
  }


   fetchUserData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return firstValueFrom(this.http.get<User>(this.apiUrl, {headers}));
  }

  removeToken() {
    localStorage.removeItem("token");
  }

}
