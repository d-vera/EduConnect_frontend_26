import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { QuizQuestion, QuizSubmitRequest, QuizResult } from '../models/educonnect.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = environment.apiUrl;
  private readonly storageKey = 'educonnect_last_attempt_id';

  getQuestions(): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.baseUrl}/quiz/questions`);
  }

  submitQuiz(payload: QuizSubmitRequest): Observable<QuizResult> {
    return this.http.post<QuizResult>(`${this.baseUrl}/quiz/submit`, payload);
  }

  getAttempt(id: string): Observable<QuizResult> {
    return this.http.get<QuizResult>(`${this.baseUrl}/quiz/attempts/${id}`);
  }

  saveLastAttemptId(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, id);
    }
  }

  getLastAttemptId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.storageKey);
    }
    return null;
  }

  clearLastAttemptId(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }
  }
}
