import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DevelopersInfo } from '../models/educonnect.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getDevelopersInfo(): Observable<DevelopersInfo> {
    return this.http.get<DevelopersInfo>(`${this.baseUrl}/developers`);
  }
}
