import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {

  constructor(private http: HttpClient) { }

  getJoiningCitiesData(): Observable<any> {
    return this.http.get(`${baseUrl}/onboardees/joiningCities`);

  }
}
