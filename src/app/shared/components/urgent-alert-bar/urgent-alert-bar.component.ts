import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Announcement } from '../../../core/models/educonnect.models';

@Component({
  selector: 'app-urgent-alert-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (urgent(); as notice) {
      <div class="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-rose-700 font-extrabold uppercase tracking-wider text-[10px] animate-pulse">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              Urgente
            </span>
            <span class="font-semibold truncate">
              {{ notice.title }}
            </span>
            <span class="hidden md:inline opacity-90 truncate max-w-lg">
              — {{ notice.content }}
            </span>
          </div>

          <a
            routerLink="/comunidad"
            class="shrink-0 inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-rose-100 transition-colors"
          >
            Ver aviso completo
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>
      </div>
    }
  `
})
export class UrgentAlertBarComponent {
  readonly announcements = input<Announcement[]>([]);

  readonly urgent = computed(() => {
    return this.announcements().find(a => a.priority === 'URGENT') ?? null;
  });
}
