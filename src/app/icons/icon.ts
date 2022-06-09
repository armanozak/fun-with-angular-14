import { inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const injectSvgIcon = (name: string, url: string) => {
  const iconRegistry = inject(MatIconRegistry);
  const domSanitizer = inject(DomSanitizer);
  const safeUrl = domSanitizer.bypassSecurityTrustResourceUrl(url);
  iconRegistry.addSvgIcon(name, safeUrl);
};
