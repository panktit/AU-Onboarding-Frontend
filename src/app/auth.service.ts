import { baseUrl } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(data): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/login`, data);
  }

  googleLogin() {
    return this.http.get(`${baseUrl}/glogin`);
  }
}
