import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../core/services/content.service';
import { Category, ArticleSummary } from '../../../core/models/educonnect.models';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      <!-- Header -->
      <div class="max-w-3xl space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
          Módulo Formativo · Temática #5
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Catálogo de Artículos Pedagógicos
        </h1>
        <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Explora guías, técnicas y conceptos clave de comunicación asertiva, escucha activa, netiqueta y mediación constructiva para el trabajo en equipo.
        </p>
      </div>

      <!-- Category Filter Pills & Search Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <!-- Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            type="button"
            (click)="selectCategory('todos')"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer"
            [ngClass]="selectedCategorySlug() === 'todos'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Todos
          </button>

          @for (category of categories(); track category.id) {
            <button
              type="button"
              (click)="selectCategory(category.slug)"
              class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer"
              [ngClass]="selectedCategorySlug() === category.slug
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              {{ category.name }}
            </button>
          }
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-72 shrink-0">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Buscar por tema o palabra clave..."
            class="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <!-- Active Category Info Banner -->
      @if (activeCategoryInfo(); as cat) {
        <div class="glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-3 border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ cat.name }}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{{ cat.description }}</p>
          </div>
        </div>
      }

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        @if (isLoading()) {
          @for (i of [1, 2, 3, 4]; track i) {
            <div class="glass-card rounded-2xl p-6 animate-pulse space-y-4">
              <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
              <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div class="h-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          }
        } @else if (filteredArticles().length === 0) {
          <div class="col-span-full text-center py-16 glass-card rounded-2xl space-y-3">
            <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-slate-800 dark:text-slate-200">No se encontraron artículos</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Prueba ajustando el término de búsqueda o selecciona otra categoría.</p>
          </div>
        } @else {
          @for (article of filteredArticles(); track article.id) {
            <article class="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 group">
              <div>
                <!-- Category and Reading Time -->
                <div class="flex items-center justify-between text-xs mb-3">
                  <span class="font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {{ article.categoryName }}
                  </span>
                  <span class="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ article.readTimeMinutes }} min
                  </span>
                </div>

                <!-- Title -->
                <h2 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  <a [routerLink]="['/content', article.slug]">
                    {{ article.title }}
                  </a>
                </h2>

                <!-- Excerpt -->
                <p class="mt-2.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {{ article.excerpt }}
                </p>
              </div>

              <!-- Card Footer -->
              <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span class="text-slate-500 dark:text-slate-400 font-medium truncate max-w-[170px]">
                  {{ article.author }}
                </span>

                <a
                  [routerLink]="['/content', article.slug]"
                  class="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1"
                >
                  Leer más
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              </div>
            </article>
          }
        }
      </div>

    </div>
  `
})
export class ContentListComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly toastService = inject(ToastService);
  private readonly route = inject(ActivatedRoute);

  readonly categories = signal<Category[]>([]);
  readonly articles = signal<ArticleSummary[]>([]);
  readonly selectedCategorySlug = signal<string>('todos');
  readonly searchQuery = signal<string>('');
  readonly isLoading = signal<boolean>(true);

  readonly activeCategoryInfo = computed(() => {
    const slug = this.selectedCategorySlug();
    if (slug === 'todos') return null;
    return this.categories().find(c => c.slug === slug) ?? null;
  });

  readonly filteredArticles = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const list = this.articles();
    if (!query) return list;

    return list.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.categoryName.toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {
    // Check query params if any
    this.route.queryParams.subscribe(params => {
      const cat = params['category'];
      if (cat) {
        this.selectedCategorySlug.set(cat);
      }
    });

    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    this.contentService.getCategories().subscribe({
      next: (cats) => {
        this.categories.set(cats);
        this.loadArticles(this.selectedCategorySlug());
      },
      error: () => {
        this.loadArticles(this.selectedCategorySlug());
      }
    });
  }

  selectCategory(slug: string): void {
    this.selectedCategorySlug.set(slug);
    this.loadArticles(slug);
  }

  loadArticles(categorySlug: string): void {
    this.isLoading.set(true);
    this.contentService.getArticles(categorySlug).subscribe({
      next: (arts) => {
        this.articles.set(arts);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastService.error('Error al cargar la lista de artículos');
      }
    });
  }
}
