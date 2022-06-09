import { inject, InjectionToken } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { merge, Observable } from 'rxjs';

const TOKEN = new InjectionToken('ACTIVE_LANGUAGE_STREAM', {
  providedIn: 'root',
  factory() {
    const transloco = inject(TranslocoService);

    return merge(transloco.getActiveLang(), transloco.langChanges$);
  },
});

export function injectActiveLanguage$(stream?: Observable<string>) {
  return stream || inject(TOKEN);
}
