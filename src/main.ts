import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import routes from './app/app.routes';
import { provideTitleStrategy } from './app/routes/title.strategy';
import { TranslocoRootModule } from './app/transloco-root.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      TranslocoRootModule,
      RouterModule.forRoot(routes)
    ),
    provideTitleStrategy(),
  ],
}).catch((err) => console.error(err));
