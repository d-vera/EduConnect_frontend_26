import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'educonnect_theme';

  readonly isDarkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.isDarkMode.set(stored === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }

      effect(() => {
        const isDark = this.isDarkMode();
        const root = document.documentElement;
        if (isDark) {
          root.classList.add('dark');
          localStorage.setItem(this.storageKey, 'dark');
        } else {
          root.classList.remove('dark');
          localStorage.setItem(this.storageKey, 'light');
        }
      });
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(prev => !prev);
  }
}
