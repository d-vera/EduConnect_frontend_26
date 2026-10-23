import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  show(toast: Omit<Toast, 'id'>): void {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 4500
    };

    this.toasts.update(list => [...list, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newToast.duration);
    }
  }

  success(message: string, title: string = 'Éxito'): void {
    this.show({ type: 'success', title, message });
  }

  error(message: string, title: string = 'Error'): void {
    this.show({ type: 'error', title, message });
  }

  info(message: string, title: string = 'Información'): void {
    this.show({ type: 'info', title, message });
  }

  warning(message: string, title: string = 'Atención'): void {
    this.show({ type: 'warning', title, message });
  }

  remove(id: string): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
