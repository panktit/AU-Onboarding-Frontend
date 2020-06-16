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
        if (!(userData === null)) {
          sessionStorage.setItem('name', userData.name);
          sessionStorage.setItem('access', userData.access_level);
          console.log(sessionStorage.getItem('name'));
          console.log("Access set in login: " , sessionStorage.getItem('access'));
        }
        return userData;
      })
    );
  }

  setAccess(email): Observable<any> {
    return this.http.post<User>(`${baseUrl}/check`, {email: email}).pipe(
      map(userData => {
        if(!(userData === null)) {
          sessionStorage.setItem('access', userData.access_level);
          console.log("Access set as: ", sessionStorage.getItem('access'));
        } 
        else {
          sessionStorage.setItem('access', "manager");
          console.log("Access set as: ", sessionStorage.getItem('access'));
        }
      })
    )
  }
  isSuperUser(): boolean {
    let access = sessionStorage.getItem('access');
    return (access === "super");
  }
  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('name');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('access');
  }
}
