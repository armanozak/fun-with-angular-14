import { inject, InjectionToken } from '@angular/core';
import type { Provider } from '@angular/core';

const TOKEN = new InjectionToken('TOOLBAR_COLOR');

export const injectToolbarColor = () => inject(TOKEN);

export const provideToolbarColor = (color = 'primary'): Provider => ({
  provide: TOKEN,
  useValue: color,
});
