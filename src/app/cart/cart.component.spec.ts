import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { BehaviourService } from '../services/behaviour-service';
import { ConfirmationPopupService } from '../services/confirmation-popup.service';
import { of } from 'rxjs';
import { CartItems } from '../types/products';

describe('CartComponent', () => {
  let fixture: ComponentFixture<CartComponent>;
  let component: CartComponent;
  let behaviourService: jasmine.SpyObj<BehaviourService>;
  let confirmService: jasmine.SpyObj<ConfirmationPopupService>;

  const mockCart: CartItems = {
            total: 132.25,
            items: [
                {
                    "id": 1,
                    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    "price": 109.95,
                    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    "category": "men's clothing",
                    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    "rating": {
                        "rate": 3.9,
                        "count": 120
                    },
                    quantity: 1
                },
                {
                    "id": 2,
                    "title": "Mens Casual Premium Slim Fit T-Shirts ",
                    "price": 22.3,
                    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                    "category": "men's clothing",
                    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                    "rating": {
                        "rate": 4.1,
                        "count": 259
                    },
                    quantity: 1
                },
            ]
        };

  beforeEach(async () => {
    behaviourService = jasmine.createSpyObj('BehaviourService', ['updateQuntity', 'removeItem'], {
      cart$: of(mockCart)
    });

    confirmService = jasmine.createSpyObj('ConfirmationPopupService', ['show']);

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: BehaviourService, useValue: behaviourService },
        { provide: ConfirmationPopupService, useValue: confirmService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the CartComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should update quantity on input change', () => {
    const event = { target: { value: 3 } };
    component.updateQty(0, event);
    expect(behaviourService.updateQuntity).toHaveBeenCalledWith(0, 3);
  });

  it('should remove item if confirmation returns true', async () => {
    confirmService.show.and.returnValue(Promise.resolve(true));
    await component.removeItem(1);
    expect(confirmService.show).toHaveBeenCalledWith('Do you want to delete this item?');
    expect(behaviourService.removeItem).toHaveBeenCalledWith(1);
  });

  it('should not remove item if confirmation returns false', async () => {
    confirmService.show.and.returnValue(Promise.resolve(false));
    await component.removeItem(1);
    expect(confirmService.show).toHaveBeenCalled();
    expect(behaviourService.removeItem).not.toHaveBeenCalled();
  });
});
