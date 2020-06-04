import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  constructor(private http: HttpClient) { }

  getAllDemands():Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/demands`);
  }

  getDemandSkills(id:number) {
    return this.http.get<any[]>(`${baseUrl}/demand/${id}`);
  }
}
