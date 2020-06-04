import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Onboardee } from '../models/onboardee';

@Injectable({
  providedIn: 'root'
})
export class OnboardeeService {

  constructor(private http: HttpClient) { }

  create(data): Observable<any> {
    console.log("Post Data: ",data);
    return this.http.post(`${baseUrl}/onboardees`, data);
  }

  findOnboardeeById(id: number): Observable<any> {
    return this.http.get<Onboardee>(`${baseUrl}/onboardee/${id}`);
  }

  findAllOnboardees(): Observable<Onboardee[]> {
    return this.http.get<Onboardee[]>(`${baseUrl}/onboardees`);
  }

  updateOnboardee(id:number, data: any) {
    return this.http.put<Onboardee>(`${baseUrl}/onboardee/${id}`, data);
  }

  deleteOnboardee(id:number) {
    return this.http.delete(`${baseUrl}/onboardee/${id}`);
  }
}
