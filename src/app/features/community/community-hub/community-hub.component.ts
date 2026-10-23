import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../../core/services/community.service';
import {
  Announcement,
  AnnouncementPriority,
  CreateAnnouncementRequest,
  StudentQuery,
  CreateStudentQueryRequest
} from '../../../core/models/educonnect.models';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-community-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      <!-- Top Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="max-w-3xl space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Canal de Interacción Académica · Web III
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Comunidad y Avisos Académicos
          </h1>
          <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Mantente al día con las convocatorias, recordatorios de entregas y sesiones de mentoría. Envía consultas directas a los docentes mediante el buzón temático.
          </p>
        </div>

        <button
          type="button"
          (click)="openNoticeModal()"
          class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 transition-all cursor-pointer text-sm"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Publicar Nuevo Aviso
        </button>
      </div>

      <!-- SECTION 1: NOTICES BOARD (TABLÓN DE AVISOS) -->
      <div class="space-y-6">
        
        <!-- Filter Pills Bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="filterByPriority(null)"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              [ngClass]="activePriority() === null
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              Todos los avisos
            </button>

            <button
              type="button"
              (click)="filterByPriority('URGENT')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              [ngClass]="activePriority() === 'URGENT'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-500/25'
                : 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40'"
            >
              <span class="w-2 h-2 rounded-full bg-rose-500"></span>
              Urgentes
            </button>

            <button
              type="button"
              (click)="filterByPriority('NORMAL')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              [ngClass]="activePriority() === 'NORMAL'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                : 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'"
            >
              <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
              Normales
            </button>

            <button
              type="button"
              (click)="filterByPriority('INFO')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              [ngClass]="activePriority() === 'INFO'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/25'
                : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Informativos
            </button>
          </div>

          <span class="text-xs text-slate-500 dark:text-slate-400">
            Mostrando {{ announcements().length }} avisos registrados
          </span>
        </div>

        <!-- Announcements Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @if (isLoadingAnnouncements()) {
            @for (i of [1, 2, 3]; track i) {
              <div class="glass-card rounded-2xl p-6 animate-pulse space-y-3">
                <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                <div class="h-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            }
          } @else if (announcements().length === 0) {
            <div class="col-span-full py-12 text-center glass-card rounded-2xl space-y-2">
              <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">No hay avisos para el filtro seleccionado.</p>
              <p class="text-xs text-slate-500">Selecciona "Todos los avisos" para visualizar el tablero completo.</p>
            </div>
          } @else {
            @for (notice of announcements(); track notice.id) {
              <div
                class="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border"
                [ngClass]="{
                  'border-rose-300 dark:border-rose-900/60 bg-gradient-to-b from-rose-50/30 to-transparent': notice.priority === 'URGENT',
                  'border-indigo-200/80 dark:border-indigo-900/50': notice.priority === 'NORMAL',
                  'border-slate-200/80 dark:border-slate-800/80': notice.priority === 'INFO'
                }"
              >
                <div class="space-y-3">
                  <!-- Priority badge & Date -->
                  <div class="flex items-center justify-between text-xs">
                    @switch (notice.priority) {
                      @case ('URGENT') {
                        <span class="px-2.5 py-0.5 rounded-full font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                          <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                          Urgente
                        </span>
                      }
                      @case ('NORMAL') {
                        <span class="px-2.5 py-0.5 rounded-full font-semibold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          Aviso Normal
                        </span>
                      }
                      @default {
                        <span class="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Informativo
                        </span>
                      }
                    }

                    <span class="text-slate-400 dark:text-slate-500 text-[11px]">
                      {{ notice.createdAt | date:'shortDate' }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {{ notice.title }}
                  </h3>

                  <!-- Content -->
                  <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {{ notice.content }}
                  </p>
                </div>

                <!-- Author info footer -->
                <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {{ notice.authorName.charAt(0) }}
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {{ notice.authorName }}
                    </span>
                    <span class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {{ notice.authorRole }}
                    </span>
                  </div>
                </div>
              </div>
            }
          }
        </div>
      </div>

      <!-- SECTION 2: STUDENT INQUIRY BOX ("BUZÓN DE CONSULTAS") -->
      <div class="pt-8 border-t border-slate-200 dark:border-slate-800">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Info & Submitted Queries -->
          <div class="lg:col-span-5 space-y-6">
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Canal Asincrónico de Soporte
              </span>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white">
                Buzón de Consultas Estudiantiles
              </h2>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                ¿Tienes dudas sobre los estilos de comunicación, el proyecto de Web III o requieres orientación docente? Envía tu consulta directamente al facilitador académico.
              </p>
            </div>

            <!-- Recent Queries List -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Consultas en Trámite
              </h4>
              
              @if (queries().length === 0) {
                <p class="text-xs text-slate-500">No hay consultas registradas aún.</p>
              } @else {
                @for (q of queries(); track q.id) {
                  <div class="glass-card rounded-xl p-4 text-xs space-y-1.5 border border-slate-200/60 dark:border-slate-800/60">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                        {{ q.topic }}
                      </span>
                      <span class="px-2 py-0.5 rounded-full font-semibold text-[10px] bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {{ q.status }}
                      </span>
                    </div>
                    <p class="text-slate-600 dark:text-slate-300 italic">"{{ q.message }}"</p>
                    <div class="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between pt-1">
                      <span>Por: {{ q.studentName }}</span>
                      <span>{{ q.createdAt | date:'shortDate' }}</span>
                    </div>
                  </div>
                }
              }
            </div>
          </div>

          <!-- Right Form Card -->
          <div class="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border-indigo-200/80 dark:border-indigo-900/60 shadow-xl">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Formulario de Consulta Directa
            </h3>

            <form (ngSubmit)="submitStudentQuery()" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div>
                  <label for="studentName" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    [(ngModel)]="queryForm.studentName"
                    name="studentName"
                    required
                    placeholder="Ej. Dennis Vera"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="studentEmail" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico Institucional *
                  </label>
                  <input
                    id="studentEmail"
                    type="email"
                    [(ngModel)]="queryForm.studentEmail"
                    name="studentEmail"
                    required
                    placeholder="estudiante@alvarezplata.edu.bo"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <!-- Topic -->
              <div>
                <label for="topic" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Asunto / Tema *
                </label>
                <input
                  id="topic"
                  type="text"
                  [(ngModel)]="queryForm.topic"
                  name="topic"
                  required
                  placeholder="Ej. Consulta sobre técnicas de asertividad en pull requests"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Mensaje Detallado *
                </label>
                <textarea
                  id="message"
                  [(ngModel)]="queryForm.message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Describe tu duda o situación comunicativa..."
                  class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                [disabled]="isSubmittingQuery()"
                class="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 disabled:opacity-50 transition-all cursor-pointer text-sm"
              >
                @if (isSubmittingQuery()) {
                  <span>Enviando consulta...</span>
                } @else {
                  <span>Enviar Consulta Docente</span>
                }
              </button>
            </form>
          </div>

        </div>
      </div>

      <!-- MODAL: CREATE ANNOUNCEMENT -->
      @if (isNoticeModalOpen()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div class="glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                Publicar Nuevo Aviso Académico
              </h3>
              <button
                type="button"
                (click)="isNoticeModalOpen.set(false)"
                class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form (ngSubmit)="submitNoticeForm()" class="space-y-4">
              <!-- Title -->
              <div>
                <label for="noticeTitle" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Título del Aviso *
                </label>
                <input
                  id="noticeTitle"
                  type="text"
                  [(ngModel)]="noticeForm.title"
                  name="noticeTitle"
                  required
                  placeholder="Ej. Taller de Escucha Activa este Viernes"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <!-- Content -->
              <div>
                <label for="noticeContent" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Contenido Detallado *
                </label>
                <textarea
                  id="noticeContent"
                  [(ngModel)]="noticeForm.content"
                  name="noticeContent"
                  rows="3"
                  required
                  placeholder="Detalles de la sesión, hora, enlace o instrucciones..."
                  class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              <!-- Author Name & Role -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="authorName" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Autor *
                  </label>
                  <input
                    id="authorName"
                    type="text"
                    [(ngModel)]="noticeForm.authorName"
                    name="authorName"
                    required
                    placeholder="Ej. Dennis Vera"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label for="authorRole" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Rol o Cargo *
                  </label>
                  <input
                    id="authorRole"
                    type="text"
                    [(ngModel)]="noticeForm.authorRole"
                    name="authorRole"
                    required
                    placeholder="Ej. Facilitador Académico"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <!-- Priority -->
              <div>
                <label for="priority" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Nivel de Prioridad *
                </label>
                <select
                  id="priority"
                  [(ngModel)]="noticeForm.priority"
                  name="priority"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="NORMAL">Normal</option>
                  <option value="URGENT">Urgente (Aparece en Banner Principal)</option>
                  <option value="INFO">Informativo</option>
                </select>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  (click)="isNoticeModalOpen.set(false)"
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  [disabled]="isPublishingNotice()"
                  class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 disabled:opacity-50 transition-all cursor-pointer"
                >
                  @if (isPublishingNotice()) {
                    <span>Publicando...</span>
                  } @else {
                    <span>Publicar Aviso</span>
                  }
                </button>
              </div>
            </form>

          </div>
        </div>
      }

    </div>
  `
})
export class CommunityHubComponent implements OnInit {
  private readonly communityService = inject(CommunityService);
  private readonly toastService = inject(ToastService);

  readonly announcements = signal<Announcement[]>([]);
  readonly queries = signal<StudentQuery[]>([]);
  readonly activePriority = signal<AnnouncementPriority | null>(null);
  readonly isLoadingAnnouncements = signal<boolean>(true);
  readonly isNoticeModalOpen = signal<boolean>(false);
  readonly isPublishingNotice = signal<boolean>(false);
  readonly isSubmittingQuery = signal<boolean>(false);

  noticeForm: CreateAnnouncementRequest = {
    title: '',
    content: '',
    authorName: '',
    authorRole: '',
    priority: 'NORMAL'
  };

  queryForm: CreateStudentQueryRequest = {
    studentName: '',
    studentEmail: '',
    topic: '',
    message: ''
  };

  ngOnInit(): void {
    this.loadAnnouncements();
    this.loadQueries();
  }

  loadAnnouncements(): void {
    this.isLoadingAnnouncements.set(true);
    this.communityService.getAnnouncements(this.activePriority() ?? undefined).subscribe({
      next: (data) => {
        this.announcements.set(data);
        this.isLoadingAnnouncements.set(false);
      },
      error: () => {
        this.isLoadingAnnouncements.set(false);
        this.toastService.error('Error al cargar los avisos comunitarios.');
      }
    });
  }

  loadQueries(): void {
    this.communityService.getQueries().subscribe({
      next: (data) => {
        this.queries.set(data);
      },
      error: () => {}
    });
  }

  filterByPriority(priority: AnnouncementPriority | null): void {
    this.activePriority.set(priority);
    this.loadAnnouncements();
  }

  openNoticeModal(): void {
    this.noticeForm = {
      title: '',
      content: '',
      authorName: '',
      authorRole: '',
      priority: 'NORMAL'
    };
    this.isNoticeModalOpen.set(true);
  }

  submitNoticeForm(): void {
    if (!this.noticeForm.title || !this.noticeForm.content || !this.noticeForm.authorName) {
      this.toastService.warning('Por favor completa todos los campos requeridos.');
      return;
    }

    this.isPublishingNotice.set(true);
    this.communityService.createAnnouncement(this.noticeForm).subscribe({
      next: (created) => {
        this.isPublishingNotice.set(false);
        this.isNoticeModalOpen.set(false);
        this.toastService.success('Aviso publicado exitosamente en el muro.');
        this.loadAnnouncements();
      },
      error: () => {
        this.isPublishingNotice.set(false);
        this.toastService.error('Ocurrió un error al publicar el aviso.');
      }
    });
  }

  submitStudentQuery(): void {
    if (!this.queryForm.studentName || !this.queryForm.studentEmail || !this.queryForm.topic || !this.queryForm.message) {
      this.toastService.warning('Completa todos los campos de la consulta.');
      return;
    }

    this.isSubmittingQuery.set(true);
    this.communityService.submitQuery(this.queryForm).subscribe({
      next: (created) => {
        this.isSubmittingQuery.set(false);
        this.toastService.success('Tu consulta ha sido enviada al equipo docente.', 'Consulta Registrada');
        this.queryForm = {
          studentName: '',
          studentEmail: '',
          topic: '',
          message: ''
        };
        this.loadQueries();
      },
      error: () => {
        this.isSubmittingQuery.set(false);
        this.toastService.error('Error al registrar la consulta estudiantil.');
      }
    });
  }
}
