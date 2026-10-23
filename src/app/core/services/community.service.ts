import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Announcement,
  AnnouncementPriority,
  CreateAnnouncementRequest,
  StudentQuery,
  CreateStudentQueryRequest
} from '../models/educonnect.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAnnouncements(priority?: AnnouncementPriority): Observable<Announcement[]> {
    let params = new HttpParams();
    if (priority) {
      params = params.set('priority', priority);
    }
    return this.http.get<Announcement[]>(`${this.baseUrl}/announcements`, { params });
  }

  createAnnouncement(payload: CreateAnnouncementRequest): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseUrl}/announcements`, payload);
  }

  submitQuery(payload: CreateStudentQueryRequest): Observable<StudentQuery> {
    return this.http.post<StudentQuery>(`${this.baseUrl}/queries`, payload);
  }

  getQueries(): Observable<StudentQuery[]> {
    return this.http.get<StudentQuery[]>(`${this.baseUrl}/queries`);
  }
}
