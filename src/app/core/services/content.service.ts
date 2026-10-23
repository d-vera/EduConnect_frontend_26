import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, ArticleSummary, ArticleDetail } from '../models/educonnect.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/content/categories`);
  }

  getArticles(categorySlug?: string): Observable<ArticleSummary[]> {
    let params = new HttpParams();
    if (categorySlug && categorySlug !== 'todos') {
      params = params.set('category', categorySlug);
    }
    return this.http.get<ArticleSummary[]>(`${this.baseUrl}/content/articles`, { params });
  }

  getArticleBySlug(slug: string): Observable<ArticleDetail> {
    return this.http.get<ArticleDetail>(`${this.baseUrl}/content/articles/${slug}`);
  }
}
