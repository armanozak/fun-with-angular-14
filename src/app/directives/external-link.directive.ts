import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'a:not([routerLink])',
  standalone: true,
})
export class ExternalLinkDirective {
  @HostBinding('rel')
  @Input()
  rel = 'noopener noreferrer';

  @HostBinding('target')
  @Input()
  target = '_blank';
}
