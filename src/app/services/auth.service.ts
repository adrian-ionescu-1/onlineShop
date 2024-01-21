import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://api.codebyte-software.com:2323/api/users";

  constructor(private httpClient: HttpClient) {

  }

  logIn(loginData: any) {
    return this.httpClient.post(`${this.apiUrl}/login`, loginData);
  }

  register(registerData: any) {
    return this.httpClient.post(`${this.apiUrl}/register`, registerData);
  }
}
