import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { BehaviourService } from '../services/behaviour-service';
import { of, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsResponseModel } from '../types/products';

@Component({
  standalone: true,
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  imports: [CommonModule],
  providers: [],
})
export class ProductListsComponent {
  private destroyRef = inject(DestroyRef);

  private behaviourService = inject(BehaviourService);
  public productLists$ = this.behaviourService.products$.pipe(
    takeUntilDestroyed(this.destroyRef)
  );

  public addToCart(item: ProductsResponseModel) {
    this.behaviourService.addToCart(item);
  }
}
