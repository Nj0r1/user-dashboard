import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../../services/counter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',        // Selector for using the component
  standalone: true,               // Standalone component (no NgModule needed)
  imports: [CommonModule],
  templateUrl: './counter.component.html' ,
  styleUrls: [ './counter.component.css']
})

export class CounterComponent {
  // Observable for the counter value provided by the CounterService.
  counter$: Observable<number>;

  constructor(private counterService: CounterService) {
    this.counter$ = this.counterService.counter$;
  }

  /**
   * Calls the increment method in CounterService.
   */
  increment(): void {
    this.counterService.increment();
  }

  /**
   * Calls the decrement method in CounterService.
   */
  decrement(): void {
    this.counterService.decrement();
  }

  /**
   * Calls the reset method in CounterService.
   */
  reset(): void {
    this.counterService.reset();
  }
}
