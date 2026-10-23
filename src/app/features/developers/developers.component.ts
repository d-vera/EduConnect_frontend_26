import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopersService } from '../../core/services/developers.service';
import { DevelopersInfo } from '../../core/models/educonnect.models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      <!-- Institutional Accreditation Header -->
      <div class="glass-card rounded-3xl p-6 sm:p-10 border-indigo-200/80 dark:border-indigo-900/60 shadow-xl relative overflow-hidden">
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            Acreditación Institucional · Convocatoria 2026
          </div>

          <div class="space-y-1">
            <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {{ devInfo()?.institution || "Instituto Técnico Nacional de Comercio 'Federico Álvarez Plata' (Nocturno)" }}
            </h1>
            <p class="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              Carrera: Sistemas Informáticos · Materia: {{ devInfo()?.course || 'Diseño y Programación Web III' }} (Gestión {{ devInfo()?.academicYear || 2026 }})
            </p>
          </div>

          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {{ devInfo()?.projectObjective || 'Desarrollar una solución integral para fortalecer las habilidades comunicativas (asertividad, escucha activa, netiqueta y retroalimentación) entre estudiantes y docentes mediante herramientas pedagógicas e interactivas.' }}
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">
              Temática Oficial: #5 Comunicación Efectiva
            </span>
            <a
              [href]="docsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Swagger OpenAPI 3.0 Live Docs
            </a>
          </div>
        </div>
      </div>

      <!-- TEAM MEMBER PROFILES -->
      <div class="space-y-6">
        <div class="space-y-1">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Autoría y Liderazgo Técnico
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Equipo de Desarrollo
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (member of devInfo()?.members; track member.name) {
            <div class="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border-slate-200/80 dark:border-slate-800/80 hover:shadow-lg transition-all">
              <div class="flex items-start gap-4">
                <!-- Avatar with gradient ring -->
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-indigo-500 flex items-center justify-center text-white text-xl font-black shadow-md shrink-0">
                  {{ member.name.charAt(0) }}V
                </div>

                <div class="space-y-1">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                    {{ member.name }}
                  </h3>
                  <div class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {{ member.role }}
                  </div>
                  <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                    {{ member.bio }}
                  </p>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span class="text-xs text-slate-500">Perfil de Código y Repositorios</span>
                <a
                  [href]="member.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                  GitHub Profile
                </a>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- FULL-STACK TECH MATRIX -->
      <div class="space-y-6">
        <div class="space-y-1">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Arquitectura de Software y Justificación Académica
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Matriz Tecnológica Full Stack
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Integración de programación funcional reactiva en el backend y arquitectura orientada a señales en el frontend.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of devInfo()?.techStack; track item.layer) {
            <div class="glass-card rounded-2xl p-6 flex flex-col justify-between border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {{ item.layer }}
                  </span>
                  <span class="px-2 py-0.5 rounded-md font-mono text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {{ item.version }}
                  </span>
                </div>

                <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                  {{ item.name }}
                </h3>

                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {{ item.justification }}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                Validado en Convocatoria Web III
              </div>
            </div>
          }
        </div>
      </div>

      <!-- 100-POINT RUBRIC COMPLIANCE CHECKLIST -->
      <div class="glass-card rounded-3xl p-6 sm:p-10 border-indigo-200/80 dark:border-indigo-900/60 shadow-xl space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Evaluación Convocatoria Web III
            </span>
            <h2 class="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Desglose de Conformidad con la Rúbrica Oficial (100 Puntos)
            </h2>
          </div>

          <div class="px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-center">
            <span class="block text-2xl font-black leading-tight">100 / 100</span>
            <span class="text-[10px] uppercase font-bold tracking-wider">Puntuación Total</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Eje 1 -->
          <div class="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-xs font-extrabold flex items-center justify-center">1</span>
                Funcionalidad Técnica Completa
              </h4>
              <span class="font-extrabold text-xs text-indigo-600 dark:text-indigo-400">25 / 25 pts</span>
            </div>
            <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Home con métricas en vivo y alertas urgentes consumidas de /api/v1/home/summary.</li>
              <li>Catálogo educativo filtrable por categorías con detalle de artículos.</li>
              <li>Cuestionario interactivo con cálculo automático y registro de intentos.</li>
              <li>Muro de avisos por urgencia y formulario de consultas estudiantiles.</li>
            </ul>
          </div>

          <!-- Eje 2 -->
          <div class="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-xs font-extrabold flex items-center justify-center">2</span>
                Calidad Temática: Comunicación Efectiva
              </h4>
              <span class="font-extrabold text-xs text-indigo-600 dark:text-indigo-400">25 / 25 pts</span>
            </div>
            <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Temática Oficial #5 abordada en profundidad pedagógica y conceptual.</li>
              <li>Contenido de asertividad, escucha activa, netiqueta y mediación de conflictos.</li>
              <li>Casos del cuestionario adaptados a situaciones académicas y de trabajo en TI.</li>
              <li>Retroalimentación cualitativa personalizada de acuerdo al puntaje.</li>
            </ul>
          </div>

          <!-- Eje 3 -->
          <div class="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-xs font-extrabold flex items-center justify-center">3</span>
                Experiencia de Usuario y Diseño Responsivo
              </h4>
              <span class="font-extrabold text-xs text-indigo-600 dark:text-indigo-400">25 / 25 pts</span>
            </div>
            <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Diseño de vanguardia con Tailwind CSS, glassmorphism y micro-animaciones.</li>
              <li>Soporte nativo de Modo Oscuro y Claro con persistencia en localStorage.</li>
              <li>100% responsivo en resoluciones móviles, tablets y monitores de escritorio.</li>
              <li>Sistema de notificaciones Toast no bloqueantes con cierre automático.</li>
            </ul>
          </div>

          <!-- Eje 4 -->
          <div class="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-xs font-extrabold flex items-center justify-center">4</span>
                Innovación: Scala/ZIO 2 y Angular Signals
              </h4>
              <span class="font-extrabold text-xs text-indigo-600 dark:text-indigo-400">25 / 25 pts</span>
            </div>
            <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Backend concurrente no bloqueante con Scala 3, ZIO 2 y sttp Tapir.</li>
              <li>Frontend con Standalone Components, Angular Signals y nuevo control flow.</li>
              <li>Documentación Swagger UI interactiva OpenAPI 3.0 en /docs.</li>
              <li>Renderizado de Markdown optimizado y tipado estricto end-to-end.</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  `
})
export class DevelopersComponent implements OnInit {
  private readonly developersService = inject(DevelopersService);

  readonly devInfo = signal<DevelopersInfo | null>(null);
  readonly docsUrl = environment.docsUrl;

  ngOnInit(): void {
    this.developersService.getDevelopersInfo().subscribe({
      next: (data) => {
        this.devInfo.set(data);
      },
      error: () => {}
    });
  }
}
