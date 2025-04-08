import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  // Initialize the counter with a default value of 0.
  private counterSubject = new BehaviorSubject<number>(0);
  
  // Expose the counter as an observable so that components can subscribe to changes.
  counter$: Observable<number> = this.counterSubject.asObservable();

  /**
   * Increments the counter by 1.
   */
  increment(): void {
    this.counterSubject.next(this.counterSubject.value + 1);
  }

  /**
   * Decrements the counter by 1.
   */
  decrement(): void {
    this.counterSubject.next(this.counterSubject.value - 1);
  }

  /**
   * Resets the counter to 0.
   */
  reset(): void {
    this.counterSubject.next(0);
  }
}

