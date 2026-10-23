import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { ArticleDetail } from '../../../core/models/educonnect.models';
import { MarkdownViewerComponent } from '../../../shared/components/markdown-viewer/markdown-viewer.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownViewerComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      <!-- Top Action Navigation -->
      <div class="flex items-center justify-between gap-4">
        <a
          routerLink="/content"
          class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver al Catálogo
        </a>

        <!-- Share / Copy Link Button -->
        <button
          type="button"
          (click)="copyArticleLink()"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
        >
          <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          Copiar Enlace
        </button>
      </div>

      <!-- Loading Skeleton -->
      @if (isLoading()) {
        <div class="glass-card rounded-3xl p-8 sm:p-12 space-y-6 animate-pulse">
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
          <div class="h-10 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          <div class="space-y-3 pt-6">
            <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
            <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
          </div>
        </div>
      } @else if (article(); as item) {
        <!-- Article Card Shell -->
        <article class="glass-card rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-200/80 dark:border-slate-800/80 space-y-8">
          
          <!-- Article Header -->
          <header class="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <span class="font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Temática Oficial #5
              </span>
              <span class="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ item.readTimeMinutes }} min de lectura estimada
              </span>
            </div>

            <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {{ item.title }}
            </h1>

            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{{ item.excerpt }}"
            </p>

            <!-- Author & Metadata Badge -->
            <div class="flex items-center gap-3 pt-2">
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow">
                {{ getInitials(item.author) }}
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-900 dark:text-white">
                  {{ item.author }}
                </span>
                <span class="text-xs text-slate-500 dark:text-slate-400">
                  Publicación Académica · Web III 2026
                </span>
              </div>
            </div>
          </header>

          <!-- Markdown Content Body -->
          <main class="py-2">
            <app-markdown-viewer [content]="item.content" />
          </main>

          <!-- Reflection / Callout Footer -->
          <div class="rounded-2xl p-6 bg-gradient-to-r from-indigo-50 via-violet-50 to-emerald-50 dark:from-indigo-950/40 dark:via-violet-950/40 dark:to-emerald-950/30 border border-indigo-200/60 dark:border-indigo-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                ¿Listo para aplicar estos conceptos?
              </h4>
              <p class="text-xs text-slate-600 dark:text-slate-400">
                Pon a prueba tus habilidades de asertividad con casos reales en el cuestionario interactivo.
              </p>
            </div>

            <a
              routerLink="/quiz"
              class="shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              Hacer el Cuestionario
            </a>
          </div>

        </article>
      }
    </div>
  `
})
export class ArticleDetailComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly toastService = inject(ToastService);
  private readonly route = inject(ActivatedRoute);

  readonly article = signal<ArticleDetail | null>(null);
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadArticle(slug);
      }
    });
  }

  loadArticle(slug: string): void {
    this.isLoading.set(true);
    this.contentService.getArticleBySlug(slug).subscribe({
      next: (data) => {
        this.article.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.error('No se pudo encontrar el artículo solicitado.');
      }
    });
  }

  copyArticleLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.toastService.success('Enlace del artículo copiado al portapapeles');
    });
  }

  getInitials(name: string): string {
    if (!name) return 'ED';
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }
}
