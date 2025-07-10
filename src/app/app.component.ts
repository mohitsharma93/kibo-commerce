import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductListsComponent } from './product-lists/product-lists.component';
import { BehaviourService } from './services/behaviour-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { CartItems } from './types/products';
import { CartComponent } from './cart/cart.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, HeaderComponent, ProductListsComponent, CartComponent],
})
export class AppComponent implements OnInit {
  private behaviourService = inject(BehaviourService);
  private destroyRef = inject(DestroyRef);
  // constructor(private behaviourService: BehaviourService) {}

  public cart$: Observable<CartItems> = this.behaviourService.cart$.pipe(
    takeUntilDestroyed(this.destroyRef)
  );

  ngOnInit() {
    this.behaviourService.getAllProducts();
  }
}
