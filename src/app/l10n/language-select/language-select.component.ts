import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  LangDefinition,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { map } from 'rxjs';

import { injectActiveLanguage$ } from '../active-language';

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [CommonModule, TranslocoModule, MatButtonModule, MatMenuModule],
  template: `
    <button mat-button [matMenuTriggerFor]="menu">{{ lang$ | async }}</button>
    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let lang of langs"
        (click)="transloco.setActiveLang(lang.id)"
      >
        {{ lang.label }}
      </button>
    </mat-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectComponent {
  readonly transloco = inject(TranslocoService);

  langs = this.transloco.getAvailableLangs() as LangDefinition[];

  lang$ = injectActiveLanguage$().pipe(
    map((id) => this.langs.find((lang) => lang.id === id)),
    map((lang) => lang?.label)
  );
}
