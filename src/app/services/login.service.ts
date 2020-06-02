import { baseUrl } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  login(data): Observable<any> {
    console.log(data);
    return this.http.post<User>(`${baseUrl}/login`, data)
    .pipe(
      map(userData => {
        console.log("user data: ", userData);
        sessionStorage.setItem('name', userData.name);
        console.log(sessionStorage.getItem('name'));
        return userData;
      })
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('name');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('name');
  }
}
