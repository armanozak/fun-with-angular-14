import { inject, InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

const CONFIG = new InjectionToken('APP_CONFIG', {
  providedIn: 'root',
  factory() {
    return environment;
  },
});

export function injectAppConfig(config: Partial<typeof CONFIG> = CONFIG) {
  return {
    ...inject(CONFIG),
    ...config,
  };
}
