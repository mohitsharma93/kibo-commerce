import { Component, inject, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";
import { CartItems } from "../types/products";
import { BehaviourService } from "../services/behaviour-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ConfirmationPopupService } from "../services/confirmation-popup.service";




@Component({
    standalone: true,
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    imports: [CommonModule, FormsModule],
})
export class CartComponent {    
    private behaviourService = inject(BehaviourService);
    private destroyRef = inject(DestroyRef);
    private confirm = inject(ConfirmationPopupService);

    protected cart$: Observable<CartItems> = this.behaviourService.cart$.pipe(
        takeUntilDestroyed(this.destroyRef)
    );

    protected updateQty(index: number, event: any) {
        this.behaviourService.updateQuntity(index, event.target.value);
    }

    protected async removeItem(index: number) {
        console.log('removeItem', index);
        const confirmed = await this.confirm.show('Do you want to delete this item?');
        if (confirmed) {
            console.log('Item deleted!');
            this.behaviourService.removeItem(index);
        }
    }
}