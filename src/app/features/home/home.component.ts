import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeService } from '../../core/services/home.service';
import { HomeSummary } from '../../core/models/educonnect.models';
import { UrgentAlertBarComponent } from '../../shared/components/urgent-alert-bar/urgent-alert-bar.component';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, UrgentAlertBarComponent],
  template: `
    <!-- Urgent Announcement Bar -->
    @if (summary()?.recentAnnouncements; as notices) {
      <app-urgent-alert-bar [announcements]="notices" />
    }

    <!-- Hero Section with Background Radial Glow -->
    <section class="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 gradient-hero dark:gradient-hero-dark border-b border-slate-200/50 dark:border-slate-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto space-y-6">
          
          <!-- Theme Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm animate-fade-in">
            <span class="flex h-2 w-2 rounded-full bg-indigo-500"></span>
            <span>Temática #5 · Comunicación Efectiva</span>
            <span class="text-slate-400 dark:text-slate-600">|</span>
            <span class="font-normal text-slate-600 dark:text-slate-400">Web III · 2026</span>
          </div>

          <!-- Main Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Construyendo <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300">Puentes de Diálogo</span> en la Comunidad Educativa
          </h1>

          <!-- Subtitle / Motto -->
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {{ summary()?.motto || 'Fortaleciendo la asertividad, la escucha empática y la resolución constructiva de conflictos entre estudiantes y docentes con tecnología reactiva.' }}
          </p>

          <!-- Call to Actions -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              routerLink="/content"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Explorar Artículos
            </a>

            <a
              routerLink="/quiz"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-100 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-all duration-200 text-sm sm:text-base backdrop-blur-md"
            >
              <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Evaluar mi Asertividad
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- Real-Time Metrics Counters Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <!-- Metric 1: Articles -->
        <div class="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-700">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Artículos Pedagógicos
            </span>
            <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-slate-900 dark:text-white">
              {{ summary()?.articlesCount ?? '4' }}
            </span>
            <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              En 4 categorías
            </span>
          </div>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Lecturas con Markdown y tiempos estimados</p>
        </div>

        <!-- Metric 2: Quiz Questions -->
        <div class="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 dark:hover:border-violet-700">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Banco de Evaluación
            </span>
            <div class="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-slate-900 dark:text-white">
              {{ summary()?.quizQuestionsCount ?? '4' }}
            </span>
            <span class="text-xs font-medium text-violet-600 dark:text-violet-400">
              Casos prácticos
            </span>
          </div>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Puntaje porcentual y feedback automático</p>
        </div>

        <!-- Metric 3: Announcements -->
        <div class="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Muro Comunitario
            </span>
            <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-slate-900 dark:text-white">
              {{ summary()?.announcementsCount ?? '4' }}
            </span>
            <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Avisos activos
            </span>
          </div>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Notificaciones con prioridad y buzón docente</p>
        </div>

        <!-- Metric 4: Full Stack Architecture -->
        <div class="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 dark:hover:border-amber-700">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Cumplimiento Rúbrica
            </span>
            <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004 0V9A4.5 4.5 0 009 4.5H7.5A4.5 4.5 0 003 9v1.875" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-slate-900 dark:text-white">
              100<span class="text-lg font-normal text-slate-500">/100</span>
            </span>
            <span class="text-xs font-medium text-amber-600 dark:text-amber-400">
              4 Ejes Evaluados
            </span>
          </div>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Scala 3, ZIO 2 + Angular 17 & Tailwind</p>
        </div>

      </div>
    </section>

    <!-- Featured Educational Articles Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Formación Integral
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Artículos Pedagógicos Destacados
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Fundamentos teóricos y guías prácticas para perfeccionar la comunicación en entornos colaborativos y de desarrollo de software.
          </p>
        </div>

        <a
          routerLink="/content"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group"
        >
          Ver todos los artículos
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        @if (isLoading()) {
          @for (i of [1, 2, 3]; track i) {
            <div class="glass-card rounded-2xl p-6 animate-pulse space-y-4">
              <div class="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
              <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
              <div class="h-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          }
        } @else {
          @for (article of summary()?.featuredArticles; track article.id) {
            <article class="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 group">
              <div>
                <!-- Category and Reading Time -->
                <div class="flex items-center justify-between text-xs mb-3">
                  <span class="font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {{ article.categoryName }}
                  </span>
                  <span class="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ article.readTimeMinutes }} min
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  <a [routerLink]="['/content', article.slug]">
                    {{ article.title }}
                  </a>
                </h3>

                <!-- Excerpt -->
                <p class="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {{ article.excerpt }}
                </p>
              </div>

              <!-- Footer Author & Link -->
              <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span class="text-slate-500 dark:text-slate-400 font-medium truncate max-w-[170px]">
                  Por {{ article.author }}
                </span>

                <a
                  [routerLink]="['/content', article.slug]"
                  class="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1"
                >
                  Leer artículo
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              </div>
            </article>
          }
        }
      </div>
    </section>

    <!-- Quiz CTA Banner Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <!-- Decorative background elements -->
        <div class="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-violet-600/30 blur-3xl pointer-events-none"></div>
        <div class="absolute -left-10 -top-10 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div class="lg:col-span-2 space-y-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-indigo-200 border border-white/20">
              <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
              Evaluación Interactiva de Habilidades
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ¿Qué tan asertiva es tu comunicación en el equipo?
            </h2>
            <p class="text-sm sm:text-base text-indigo-100 max-w-xl leading-relaxed">
              Pon a prueba tus reacciones en situaciones académicas reales: code reviews, discrepancias técnicas y mensajes asincrónicos. Obtén tu puntaje y retroalimentación instantánea.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <a
              routerLink="/quiz"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-indigo-950 bg-white hover:bg-indigo-50 shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
            >
              Comenzar Evaluación
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <span class="text-xs text-indigo-200 text-center lg:text-right">
              Toma menos de 3 minutos · Sin registro previo
            </span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly toastService = inject(ToastService);

  readonly summary = signal<HomeSummary | null>(null);
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.homeService.getSummary().subscribe({
      next: (data) => {
        this.summary.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastService.warning('No se pudo conectar con el backend en localhost:8080. Mostrando datos locales.', 'Aviso de Conexión');
      }
    });
  }
}
