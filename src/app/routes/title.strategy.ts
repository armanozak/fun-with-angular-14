import { inject, Type } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  Data,
  PRIMARY_OUTLET,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { from, Observable, of, zip } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

import { injectAppConfig } from '../app.config';

class DefaultTitleStrategy extends TitleStrategy {
  private readonly name = injectAppConfig().name;
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    const data = this.buildData(routerState);

    if (!title) return;

    this.selectTranslateData(data)
      .pipe(
        switchMap((params) =>
          this.transloco.selectTranslateObject(title, params)
        )
      )
      .subscribe((translatedTitle) => {
        this.title.setTitle(`${this.name} | ${translatedTitle}`);
      });
  }

  protected buildData(snapshot: RouterStateSnapshot) {
    let data: Data = {};
    let route: ActivatedRouteSnapshot | undefined = snapshot.root;

    do {
      data = {
        ...data,
        ...route.data,
      };
      route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
    } while (route);

    return data;
  }

  protected selectTranslateData(data: Data): Observable<TranslatedData> {
    return from(Object.entries(data)).pipe(
      switchMap(([key, value]) =>
        zip(of(key), this.transloco.selectTranslateObject(value))
      ),
      map(([key, value]) => ({ [key]: value })),
      toArray(),
      map((entries) => Object.assign({}, ...entries))
    );
  }
}

type TranslatedData = {
  [key: string]: any;
  [key: symbol]: any;
};

export function provideTitleStrategy(
  strategy: Type<TitleStrategy> | (() => TitleStrategy) = DefaultTitleStrategy
) {
  return isClassCtor(strategy)
    ? {
        provide: TitleStrategy,
        useClass: strategy,
      }
    : {
        provide: TitleStrategy,
        useFactory: strategy,
      };
}

function isClassCtor(
  strategy: Type<TitleStrategy> | (() => TitleStrategy)
): strategy is Type<TitleStrategy> {
  return Object.getPrototypeOf(strategy) === TitleStrategy;
}
