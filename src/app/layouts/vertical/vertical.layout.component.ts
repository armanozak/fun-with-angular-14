import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { injectAppConfig } from '../../app.config';
import { ExternalLinkDirective } from '../../directives/external-link.directive';
import { injectGitHubIcon } from '../../icons/github.icon';
import { LanguageSelectComponent } from '../../l10n/language-select/language-select.component';
import { injectToolbarColor } from '../toolbar-color';

@Component({
  selector: 'app-vertical-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ExternalLinkDirective,
    LanguageSelectComponent,
  ],
  template: `
    <mat-toolbar [color]="color" *transloco="let t; read: '_'">
      <span>{{ t('APP_NAME', {name}) }}</span>
      <span class="spacer"></span>

      <app-language-select></app-language-select>
      <a mat-icon-button aria-label="Share" href="https://github.com/armanozak">
        <mat-icon svgIcon="github"></mat-icon>
      </a>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalLayoutComponent {
  color = injectToolbarColor();
  name = injectAppConfig().name;

  constructor() {
    injectGitHubIcon();
  }
}
