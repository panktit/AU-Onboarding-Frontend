import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Onboardee } from '../models/onboardee';

@Injectable({
  providedIn: 'root'
})
export class OnboardeeService {

  constructor(private http: HttpClient) { }

  create(data): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/onboardees`, data);
  }

  findOnboardeeById(id: number): Observable<any> {
    return this.http.get<Onboardee>(`${baseUrl}/onboardee/${id}`);
  }

  findAllOnboardees(): Observable<Onboardee[]> {
    return this.http.get<Onboardee[]>(`${baseUrl}/onboardees`);
  }
}
