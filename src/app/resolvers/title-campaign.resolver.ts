import { inject, Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleCampaignResolver implements Resolve<string> {
  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return of('_.DISCOUNT_20').pipe(delay(1000));
  }
}
