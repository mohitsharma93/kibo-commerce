import { Component, DestroyRef, inject } from '@angular/core';
import { BehaviourService } from '../services/behaviour-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FilterInputComponent } from "../filter-input/filter-input.component";

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule],
})
export class HeaderComponent {

  private behaviourService = inject(BehaviourService);

   private destroyRef = inject(DestroyRef);

  protected cartItemLength$: Observable<number> = this.behaviourService.cart$.pipe(
    map((cart) =>  cart.items.length ),
    takeUntilDestroyed(this.destroyRef)
  );

    public goToCartView() {
      this.behaviourService.setScrollToCart(true);
    }
}
