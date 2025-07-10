import { TestBed } from '@angular/core/testing';
import { BehaviourService } from './behaviour-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsResponseModel } from '../types/products';
import { CartItems } from '../types/products';

describe('BehaviourService', () => {
    let service: BehaviourService;
    let httpMock: HttpTestingController;

    const fakeProduct: ProductsResponseModel = {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 100,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        },
        quantity: 1
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                BehaviourService,
                { provide: 'FAKEAPI_BASE_URL', useValue: 'https://fakestoreapi.com' }
            ]
        });

        service = TestBed.inject(BehaviourService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch products and update products$', () => {
        let result: ProductsResponseModel[] | null = null;

        service.products$.subscribe((val) => {
            if(val) {
                expect(val).toEqual([fakeProduct]);
            }
        });
        service.getAllProducts();

        const req = httpMock.expectOne('https://fakestoreapi.com/products');
        expect(req.request.method).toBe('GET');

        req.flush([fakeProduct]);
    });

    it('should add a new item to cart', () => {
        let result: CartItems | undefined;

        service.cart$.subscribe((val) => (result = val));
        service.addToCart(fakeProduct);

        expect(result?.items.length).toBe(1);
        expect(result?.items[0].quantity).toBe(1);
        expect(result?.items[0].totalPrice).toBe(100);
        expect(result?.total).toBe(100);
    });

    it('should increase quantity if item is added again', () => {
        service.addToCart(fakeProduct);
        service.addToCart(fakeProduct); // same item

        let result: CartItems | undefined;
        service.cart$.subscribe((val) => (result = val));

        expect(result?.items.length).toBe(1);
        expect(result?.items[0].quantity).toBe(2);
        expect(result?.items[0].totalPrice).toBe(200);
        expect(result?.total).toBe(200);
    });

    it('should update quantity and recalculate total', () => {
        service.addToCart(fakeProduct); // quantity = 1

        service.updateQuntity(0, 3); // update to 3

        let result: CartItems | undefined;
        service.cart$.subscribe((val) => (result = val));

        expect(result?.items[0].quantity).toBe(3);
        expect(result?.items[0].totalPrice).toBe(300);
        expect(result?.total).toBe(300);
    });

    it('should remove item from cart', () => {
        service.addToCart(fakeProduct);
        service.removeItem(0);

        let result: CartItems | undefined;
        service.cart$.subscribe((val) => (result = val));

        expect(result?.items.length).toBe(0);
        expect(result?.total).toBe(0);
    });
});
