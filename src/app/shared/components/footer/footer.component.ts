import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Col 1: Brand & Theme -->
          <div class="md:col-span-2 space-y-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <span class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Edu<span class="text-indigo-600 dark:text-indigo-400">Connect</span>
              </span>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Plataforma interactiva para el fortalecimiento de la asertividad, la escucha activa y la resolución constructiva de conflictos en la comunidad académica.
            </p>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
              Temática Oficial #5 · Convocatoria Web III 2026
            </div>
          </div>

          <!-- Col 2: Navigation -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Navegación
            </h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a routerLink="/" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Inicio</a>
              </li>
              <li>
                <a routerLink="/content" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Artículos Educativos</a>
              </li>
              <li>
                <a routerLink="/quiz" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cuestionario Interactivo</a>
              </li>
              <li>
                <a routerLink="/comunidad" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Avisos y Consultas</a>
              </li>
              <li>
                <a routerLink="/developers" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Matriz Tecnológica</a>
              </li>
            </ul>
          </div>

          <!-- Col 3: Institutional Accreditation -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Institución & API
            </h4>
            <div class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p class="font-medium text-slate-800 dark:text-slate-300 text-xs leading-snug">
                Instituto Técnico Nacional de Comercio "Federico Álvarez Plata"
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Turno Nocturno · Cochabamba, Bolivia
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Diseño y Programación Web III
              </p>
              <div class="pt-1">
                <a
                  [href]="docsUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Documentación Swagger UI
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 EduConnect DevTeam · Dennis Vera (Lead Architect). Todos los derechos académicos reservados.</p>
          <p class="flex items-center gap-2">
            <span>Scala 3 & ZIO 2 Backend</span>
            <span>•</span>
            <span>Angular 17+ & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly docsUrl = environment.docsUrl;
}
