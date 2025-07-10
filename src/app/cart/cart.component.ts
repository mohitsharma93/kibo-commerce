import { Component, inject, DestroyRef, ViewChild, ElementRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";
import { CartItems } from "../types/products";
import { BehaviourService } from "../services/behaviour-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ConfirmationPopupService } from "../services/confirmation-popup.service";
import { elementIsVisibleInViewport } from "../utils";




@Component({
    standalone: true,
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    imports: [CommonModule, FormsModule],
})
export class CartComponent implements OnInit {

    @ViewChild('cart') cart!: ElementRef;

    private behaviourService = inject(BehaviourService);
    private destroyRef = inject(DestroyRef);
    private confirm = inject(ConfirmationPopupService);

    public cart$: Observable<CartItems> = this.behaviourService.cart$.pipe(
        takeUntilDestroyed(this.destroyRef)
    );

    ngOnInit(): void {
        this.behaviourService.scrollToCart$.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((value) => {
            if (value && this.cart) {
                elementIsVisibleInViewport(this.cart.nativeElement, 700).then((res) => {
                        if (!res) {
                            this.cart.nativeElement.scrollIntoView({
                                behavior: 'smooth',
                                top: this.cart.nativeElement.offsetTop - 100 // Adjust offset as needed
                            });
                        }
                });
                this.behaviourService.setScrollToCart(false);
            }
        });
    }

    public updateQty(index: number, event: any) {
        this.behaviourService.updateQuntity(index, event.target.value);
    }

    public async removeItem(index: number) {
        console.log('removeItem', index);
        const confirmed = await this.confirm.show('Do you want to delete this item?');
        if (confirmed) {
            console.log('Item deleted!');
            this.behaviourService.removeItem(index);
        }
    }
}