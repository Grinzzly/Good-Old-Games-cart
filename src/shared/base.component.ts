import {
  OnChanges,
  OnDestroy,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';

import {
  merge,
  of,
  Subject,
  Observable,
  Unsubscribable as AnonymousSubscription
} from 'rxjs';

import { map, filter, delay } from 'rxjs/operators';

export class BaseComponentTyped<TActual extends BaseComponentTyped<TActual>>
  implements OnChanges, OnDestroy, AfterViewInit {

  protected get viewInitialized$(): Observable<void> {
    if (!this._viewInitialized$) {
      this._viewInitialized$ = new Subject<void>();
    }
    return this._viewInitialized$.pipe(delay(0));
  }

  private subscriptions: { [key: string]: AnonymousSubscription } = {};

  private _changes$ = new Subject<SimpleChanges>();

  private _viewInitialized$: Subject<void>;

  public ngAfterViewInit() {
    if (this._viewInitialized$) {
      this._viewInitialized$.next();
      this._viewInitialized$.complete();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    this._changes$.next(changes);
  }

  public ngOnDestroy() {
    for (let key in this.subscriptions) {
      if (this.subscriptions[key]) {
        this.subscriptions[key].unsubscribe();
      }
    }
  }

  public createGuid(): string {
    let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });

    return guid;
  }

  protected observeInputProperty<TKey extends keyof TActual>(
    propertyName: TKey,
    includeCurrent?: boolean
  ): Observable<TActual[TKey]> {
    const changes$ = this._changes$.pipe(
      filter(changes => changes.hasOwnProperty(propertyName)),
      map(changes => changes[String(propertyName)].currentValue));

    return includeCurrent
      ? merge(of(this[`${propertyName}`]), changes$)
      : changes$;
  }

  protected addSubscription(subscription: AnonymousSubscription, key: string = undefined) {
    if (!key) {
      key = this.createGuid();
    } else {
      this.removeSubscription(key);
    }
    this.subscriptions[key] = subscription;
  }

  protected removeSubscription(key: string) {
    if (this.subscriptions[key]) {
      this.subscriptions[key].unsubscribe();
      delete this.subscriptions[key];
    }
  }
}

export class BaseComponent extends BaseComponentTyped<BaseComponent> { }
