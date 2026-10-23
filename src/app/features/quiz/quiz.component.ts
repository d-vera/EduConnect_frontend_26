import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../core/services/quiz.service';
import { QuizQuestion, QuizResult } from '../../core/models/educonnect.models';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      <!-- Top Header -->
      <div class="max-w-2xl space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
          <span class="w-2 h-2 rounded-full bg-violet-500"></span>
          Evaluación Formativa · Temática #5
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Cuestionario de Comunicación Efectiva
        </h1>
        <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Evalúa tus competencias en comunicación asertiva, escucha activa y resolución constructiva de conflictos a través de casos prácticos del entorno académico.
        </p>
      </div>

      <!-- Saved Attempt Notice Banner -->
      @if (savedAttemptId() && !result() && !isSubmitting()) {
        <div class="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-violet-200 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/20">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white">Tienes un intento previo registrado</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400">Puedes consultar tu resultado guardado o realizar una nueva evaluación.</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="loadSavedAttempt()"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-violet-700 dark:text-violet-300 bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Ver Resultado
            </button>
            <button
              type="button"
              (click)="clearSavedAttempt()"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              Descartar
            </button>
          </div>
        </div>
      }

      <!-- RESULTS SCREEN -->
      @if (result(); as res) {
        <div class="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl border-indigo-200 dark:border-indigo-900/60 space-y-8 animate-fade-in print:shadow-none print:border-none">
          
          <!-- Result Header -->
          <div class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/25 mx-auto">
              @if (res.percentage >= 80) {
                <!-- Trophy / Star Icon -->
                <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004 0V9A4.5 4.5 0 009 4.5H7.5A4.5 4.5 0 003 9v1.875" />
                </svg>
              } @else {
                <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            </div>

            <div class="space-y-1">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Certificado Digital de Participación
              </span>
              <h2 class="text-3xl font-black text-slate-900 dark:text-white">
                Resultado de {{ res.participantName }}
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Evaluado el {{ res.createdAt | date:'medium' }} · ID Intento: {{ res.id }}
              </p>
            </div>
          </div>

          <!-- Score Gauge Card -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <!-- Score Points -->
            <div class="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Puntaje Obtenido</span>
              <div class="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {{ res.score }} <span class="text-lg font-normal text-slate-500">/ {{ res.totalScore }}</span>
              </div>
            </div>

            <!-- Percentage Gauge -->
            <div class="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Porcentaje de Dominio</span>
              <div class="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {{ res.percentage }}%
              </div>
            </div>

            <!-- Level Badge -->
            <div class="p-5 rounded-2xl bg-violet-50/70 dark:bg-violet-950/40 border border-violet-200/60 dark:border-violet-800/60">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Nivel Asertivo</span>
              <div class="text-xl sm:text-2xl font-black text-violet-600 dark:text-violet-400 mt-2">
                {{ res.percentage >= 80 ? 'Avanzado' : (res.percentage >= 50 ? 'Intermedio' : 'En Desarrollo') }}
              </div>
            </div>
          </div>

          <!-- Feedback Box -->
          <div class="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-violet-50/90 to-emerald-50/90 dark:from-indigo-950/60 dark:via-violet-950/60 dark:to-emerald-950/50 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              Retroalimentación Pedagógica
            </h4>
            <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {{ res.feedback }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-4 print:hidden">
            <button
              type="button"
              (click)="printCertificate()"
              class="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24-1.076-.672-2.126-1.27-3.109m12.001 3.109c.24-1.076.672-2.126 1.27-3.109M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              Imprimir / Guardar PDF
            </button>

            <button
              type="button"
              (click)="resetQuiz()"
              class="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
            >
              Realizar Nueva Evaluación
            </button>
          </div>

        </div>
      } @else {
        <!-- SINGLE-PAGE QUESTIONNAIRE -->
        <div class="space-y-8">
          
          <!-- Participant Information Card -->
          <div class="glass-card rounded-2xl p-6 sm:p-7 space-y-4 border-indigo-200/80 dark:border-indigo-900/60">
            <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Datos del Participante
            </div>
            
            <div class="max-w-md">
              <label for="participantName" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Nombre Completo o Alias Académico *
              </label>
              <input
                id="participantName"
                type="text"
                [(ngModel)]="participantName"
                placeholder="Ej. Dennis Vera / Estudiante Sistemas"
                class="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              @if (showValidationErrors() && !participantName().trim()) {
                <p class="text-xs text-rose-500 font-medium mt-1">Por favor ingresa tu nombre antes de entregar el cuestionario.</p>
              }
            </div>
          </div>

          <!-- Sticky / Floating Progress Bar -->
          <div class="sticky top-20 z-30 glass-card rounded-2xl p-4 shadow-md flex items-center justify-between gap-4 border-slate-200/90 dark:border-slate-800/90">
            <div class="space-y-1 flex-1">
              <div class="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Progreso de Respuestas</span>
                <span class="text-indigo-600 dark:text-indigo-400 font-extrabold">{{ answeredCount() }} de {{ questions().length }} ({{ completionPercentage() }}%)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 rounded-full"
                  [style.width.%]="completionPercentage()"
                ></div>
              </div>
            </div>

            <button
              type="button"
              (click)="submitQuiz()"
              [disabled]="isSubmitting()"
              class="shrink-0 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
            >
              @if (isSubmitting()) {
                <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Evaluando...</span>
              } @else {
                <span>Entregar Examen</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              }
            </button>
          </div>

          <!-- Questions List -->
          <div class="space-y-6">
            @for (question of questions(); track question.id; let idx = $index) {
              <div
                class="glass-card rounded-2xl p-6 sm:p-7 space-y-4 transition-all duration-200 border"
                [ngClass]="{
                  'border-rose-400 dark:border-rose-700 bg-rose-50/20': showValidationErrors() && !selectedAnswers()[question.id],
                  'border-slate-200/80 dark:border-slate-800/80': !showValidationErrors() || selectedAnswers()[question.id]
                }"
              >
                <!-- Question Header -->
                <div class="flex items-start gap-3">
                  <span class="shrink-0 w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs flex items-center justify-center">
                    #{{ question.orderIndex || (idx + 1) }}
                  </span>
                  <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {{ question.prompt }}
                  </h3>
                </div>

                <!-- Answer Options Radio Cards -->
                <div class="grid grid-cols-1 gap-2.5 pt-1">
                  @for (opt of question.options; track opt.id) {
                    <label
                      (click)="selectOption(question.id, opt.id)"
                      class="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border text-sm transition-all duration-200 cursor-pointer"
                      [ngClass]="selectedAnswers()[question.id] === opt.id
                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-100 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'"
                    >
                      <!-- Custom Radio Circle -->
                      <div
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                        [ngClass]="selectedAnswers()[question.id] === opt.id
                          ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-600 dark:bg-indigo-500'
                          : 'border-slate-300 dark:border-slate-600 bg-transparent'"
                      >
                        @if (selectedAnswers()[question.id] === opt.id) {
                          <div class="w-2 h-2 rounded-full bg-white"></div>
                        }
                      </div>

                      <span class="flex-1 font-medium leading-relaxed">
                        {{ opt.optionText }}
                      </span>
                    </label>
                  }
                </div>

                @if (showValidationErrors() && !selectedAnswers()[question.id]) {
                  <p class="text-xs text-rose-500 font-semibold pt-1">
                    * Debes seleccionar una respuesta para esta pregunta.
                  </p>
                }
              </div>
            }
          </div>

          <!-- Bottom Submit Action -->
          <div class="text-center pt-4">
            <button
              type="button"
              (click)="submitQuiz()"
              [disabled]="isSubmitting()"
              class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 disabled:opacity-50 transition-all text-base cursor-pointer"
            >
              @if (isSubmitting()) {
                <span class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Procesando Evaluación...</span>
              } @else {
                <span>Enviar Respuestas y Ver Puntaje</span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              }
            </button>
          </div>

        </div>
      }

    </div>
  `
})
export class QuizComponent implements OnInit {
  private readonly quizService = inject(QuizService);
  private readonly toastService = inject(ToastService);

  readonly questions = signal<QuizQuestion[]>([]);
  readonly participantName = signal<string>('');
  readonly selectedAnswers = signal<Record<string, string>>({}); // questionId -> optionId
  readonly result = signal<QuizResult | null>(null);
  readonly savedAttemptId = signal<string | null>(null);
  readonly isSubmitting = signal<boolean>(false);
  readonly showValidationErrors = signal<boolean>(false);

  readonly answeredCount = computed(() => {
    return Object.keys(this.selectedAnswers()).length;
  });

  readonly completionPercentage = computed(() => {
    const total = this.questions().length;
    if (total === 0) return 0;
    return Math.round((this.answeredCount() / total) * 100);
  });

  ngOnInit(): void {
    this.savedAttemptId.set(this.quizService.getLastAttemptId());
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.getQuestions().subscribe({
      next: (qs) => {
        this.questions.set(qs);
      },
      error: () => {
        this.toastService.error('Error al cargar las preguntas del cuestionario.');
      }
    });
  }

  selectOption(questionId: string, optionId: string): void {
    this.selectedAnswers.update(current => ({
      ...current,
      [questionId]: optionId
    }));
  }

  submitQuiz(): void {
    const name = this.participantName().trim();
    const answered = this.answeredCount();
    const total = this.questions().length;

    if (!name || answered < total) {
      this.showValidationErrors.set(true);
      this.toastService.warning('Completa tu nombre y responde todas las preguntas antes de enviar.', 'Respuestas Incompletas');
      return;
    }

    this.isSubmitting.set(true);
    const selectedOptionIds = Object.values(this.selectedAnswers());

    this.quizService.submitQuiz({
      participantName: name,
      selectedOptionIds
    }).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.result.set(res);
        this.quizService.saveLastAttemptId(res.id);
        this.savedAttemptId.set(res.id);
        this.toastService.success(`¡Evaluación enviada con éxito! Puntaje: ${res.percentage}%`, 'Resultado Listo');
      },
      error: () => {
        this.isSubmitting.set(false);
        this.toastService.error('Ocurrió un error al enviar el cuestionario al servidor.');
      }
    });
  }

  loadSavedAttempt(): void {
    const id = this.savedAttemptId();
    if (!id) return;

    this.quizService.getAttempt(id).subscribe({
      next: (res) => {
        this.result.set(res);
      },
      error: () => {
        this.toastService.warning('No se pudo recuperar el intento anterior.');
        this.quizService.clearLastAttemptId();
        this.savedAttemptId.set(null);
      }
    });
  }

  clearSavedAttempt(): void {
    this.quizService.clearLastAttemptId();
    this.savedAttemptId.set(null);
  }

  resetQuiz(): void {
    this.result.set(null);
    this.selectedAnswers.set({});
    this.showValidationErrors.set(false);
  }

  printCertificate(): void {
    window.print();
  }
}
