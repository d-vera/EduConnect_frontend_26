import { Component, Input, inject, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="prose prose-slate dark:prose-invert prose-indigo max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-950/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg text-slate-700 dark:text-slate-300 leading-relaxed"
      [innerHTML]="sanitizedHtml()"
    ></div>
  `
})
export class MarkdownViewerComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly content = input<string>('');

  readonly sanitizedHtml = computed<SafeHtml>(() => {
    const raw = this.content() || '';
    try {
      const parsed = marked.parse(raw) as string;
      return this.sanitizer.bypassSecurityTrustHtml(parsed);
    } catch (e) {
      return raw;
    }
  });
}
