import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 w-full glass-nav transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <!-- Logo & Theme badge -->
          <div class="flex items-center gap-3">
            <a routerLink="/" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  Edu<span class="text-indigo-600 dark:text-indigo-400">Connect</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    2026
                  </span>
                </span>
                <span class="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Tema #5 · Comunicación Efectiva
                </span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              routerLink="/"
              routerLinkActive="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Inicio
            </a>
            <a
              routerLink="/content"
              routerLinkActive="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Artículos
            </a>
            <a
              routerLink="/quiz"
              routerLinkActive="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Cuestionario
            </a>
            <a
              routerLink="/comunidad"
              routerLinkActive="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Comunidad
            </a>
            <a
              routerLink="/developers"
              routerLinkActive="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              Equipo & Matriz
            </a>
          </nav>

          <!-- Action buttons (Swagger + Dark Toggle + Mobile toggle) -->
          <div class="flex items-center gap-2">
            <!-- Swagger API Docs Link -->
            <a
              [href]="docsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              title="Abrir documentación Swagger OpenAPI 3.0"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Swagger API
              <svg class="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            <!-- Dark / Light Mode Toggle -->
            <button
              type="button"
              (click)="themeService.toggleTheme()"
              class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              [attr.aria-label]="themeService.isDarkMode() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              @if (themeService.isDarkMode()) {
                <!-- Sun Icon -->
                <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              } @else {
                <!-- Moon Icon -->
                <svg class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              }
            </button>

            <!-- Mobile Hamburger Button -->
            <button
              type="button"
              (click)="isMobileMenuOpen.update(v => !v)"
              class="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Abrir menú"
            >
              @if (isMobileMenuOpen()) {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 space-y-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          <a
            routerLink="/"
            (click)="isMobileMenuOpen.set(false)"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Inicio
          </a>
          <a
            routerLink="/content"
            (click)="isMobileMenuOpen.set(false)"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Artículos Educativos
          </a>
          <a
            routerLink="/quiz"
            (click)="isMobileMenuOpen.set(false)"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cuestionario Interactivo
          </a>
          <a
            routerLink="/comunidad"
            (click)="isMobileMenuOpen.set(false)"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Comunidad & Avisos
          </a>
          <a
            routerLink="/developers"
            (click)="isMobileMenuOpen.set(false)"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Equipo & Matriz Técnica
          </a>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800">
            <a
              [href]="docsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Swagger OpenAPI Docs
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  readonly themeService = inject(ThemeService);
  readonly docsUrl = environment.docsUrl;
  readonly isMobileMenuOpen = signal<boolean>(false);
}
