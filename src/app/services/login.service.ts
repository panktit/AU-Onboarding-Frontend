import { baseUrl } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  login(data): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/login`, data)
    .pipe(
      map(userData => {
        console.log("user data: ", userData);
        sessionStorage.setItem('email', data.email);
        console.log(sessionStorage.getItem('email'));
        return userData;
      })
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email');
    console.log("Logged in service: ", !(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('email');
  }
}
