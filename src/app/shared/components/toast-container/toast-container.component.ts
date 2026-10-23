import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md"
          [ngClass]="{
            'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100': toast.type === 'success',
            'bg-rose-50/95 dark:bg-rose-950/90 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100': toast.type === 'error',
            'bg-amber-50/95 dark:bg-amber-950/90 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100': toast.type === 'warning',
            'bg-indigo-50/95 dark:bg-indigo-950/90 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100': toast.type === 'info'
          }"
        >
          <!-- Icon -->
          <div class="shrink-0 mt-0.5">
            @switch (toast.type) {
              @case ('success') {
                <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              @case ('error') {
                <svg class="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              }
              @case ('warning') {
                <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              }
              @default {
                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              }
            }
          </div>

          <!-- Body -->
          <div class="flex-1 min-w-0">
            @if (toast.title) {
              <h4 class="text-sm font-semibold leading-5 mb-0.5">{{ toast.title }}</h4>
            }
            <p class="text-xs leading-relaxed opacity-90">{{ toast.message }}</p>
          </div>

          <!-- Close -->
          <button
            type="button"
            (click)="toastService.remove(toast.id)"
            class="shrink-0 rounded-lg p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100"
            aria-label="Cerrar notificación"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
