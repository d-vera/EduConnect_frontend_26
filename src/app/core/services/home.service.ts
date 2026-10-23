import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeSummary } from '../models/educonnect.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getSummary(): Observable<HomeSummary> {
    return this.http.get<HomeSummary>(`${this.baseUrl}/home/summary`);
  }
}
