import { Observable, Observer } from 'rxjs';

export const skipNull = <A, B, C extends Error>(f: ((x: A) => B) | C) => {
  return (observable: Observable<A>) =>
    new Observable((observer: Observer<B>) => {
      const subscription = observable.subscribe({
        next(value) {
          if (f === null) {
            observer.complete();
          } else if (f instanceof Error) {
            observer.error(f);
          } else {
            try {
              const next = f(value);
              if (next === null) {
                observer.complete();
              } else {
                observer.next(next);
              }
            } catch (err) {
              console.error('Error in Rendering', err);
              observer.error(err);
            }
          }
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
};
