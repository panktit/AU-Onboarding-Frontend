import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { User } from '../models/user';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

  }

  findUserById(UserId: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/user/id`);
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }
}
