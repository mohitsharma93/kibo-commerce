import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductListsComponent } from './product-lists.component';
import { BehaviourService } from '../services/behaviour-service';
import { ProductsResponseModel } from '../types/products';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('ProductListsComponent (with real BehaviourService)', () => {
    let fixture: ComponentFixture<ProductListsComponent>;
    let component: ProductListsComponent;
    let mockBehaviourService: jasmine.SpyObj<BehaviourService>;

    const mockProducts: ProductsResponseModel[] = [
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
    ];


    beforeEach(async () => {
        mockBehaviourService = jasmine.createSpyObj('BehaviourService', ['getAllProducts'], {
            products$: of(mockProducts), // or whatever it expects
            productLists$: of(mockProducts),
            addToCart: jasmine.createSpy('addToCart')
        });

        await TestBed.configureTestingModule({
            imports: [ProductListsComponent, CommonModule, HttpClientTestingModule],
            providers: [
                { provide: BehaviourService, useValue: mockBehaviourService },
                { provide: 'FAKEAPI_BASE_URL', useValue: 'https://fakestoreapi.com' }
            ]
            }).compileComponents();

        fixture = TestBed.createComponent(ProductListsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the ProductListsComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe to cart$ and expose correct productLists$', (done) => {

        component.productLists$.subscribe((products) => {
            if(products) {
                expect(products.length).toBe(2);
                expect(products[0].title).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
                expect(products[0].price).toBe(109.95);
                done();
            } else {
                fail('Products should not be null');
            }
            
        });
    });

    it('should call addToCart on BehaviourService when addToCart is called', () => {
        const item = mockProducts[0];
        component.addToCart(item);
        expect(mockBehaviourService.addToCart).toHaveBeenCalledWith(item);
    });
});
