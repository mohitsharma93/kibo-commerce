import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListsComponent } from './product-lists/product-lists.component';
import { CartComponent } from './cart/cart.component';
import { BehaviourService } from './services/behaviour-service';
import { of } from 'rxjs';
import { CartItems } from './types/products';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let mockBehaviourService: jasmine.SpyObj<BehaviourService>;

    beforeEach(async () => {
        const cartMock: CartItems = {
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

        mockBehaviourService = jasmine.createSpyObj('BehaviourService', ['getAllProducts'], {
            cart$: of(cartMock),
            products$: of(cartMock.items), // or whatever it expects
        });

        await TestBed.configureTestingModule({
            imports: [AppComponent, HeaderComponent, ProductListsComponent, CartComponent],
            providers: [{ provide: BehaviourService, useValue: mockBehaviourService }, { provide: 'FAKEAPI_BASE_URL', useValue: 'https://fakestoreapi.com' }],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app component', () => {
        expect(component).toBeTruthy();
    });

    it('should call getAllProducts on ngOnInit', () => {
        expect(mockBehaviourService.getAllProducts).toHaveBeenCalled();
    });

    it('should subscribe to cart$ and expose correct data', (done) => {
        component.cart$.subscribe(cart => {
            expect(cart.items.length).toBe(2);
            expect(cart.items[0].title).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
            done();
        });
    });
});
