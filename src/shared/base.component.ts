import {
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import {
  Subject,
  Unsubscribable as AnonymousSubscription
} from 'rxjs';

export class BaseComponentTyped<TActual extends BaseComponentTyped<TActual>>
  implements OnChanges, OnDestroy {

  private subscriptions: { [key: string]: AnonymousSubscription } = {};

  private changes$ = new Subject<SimpleChanges>();

  public ngOnChanges(changes: SimpleChanges) {
    this.changes$.next(changes);
  }

  public ngOnDestroy() {
    for (let key in this.subscriptions) {
      if (this.subscriptions[key]) {
        this.subscriptions[key].unsubscribe();
      }
    }
  }

  public createGuid(): string {
    const guid = 'xxxxxxxx-yxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const radix = Math.random() * 16 | 0, value = c === 'x' ? radix : (radix & 0x3 | 0x8);

      return value.toString(16);
    });

    return guid;
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
