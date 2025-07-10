export interface ProductsResponseModel {
  id: number;
  title: string;
  price: number;
  totalPrice?:number
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number; // Optional field for cart items
}

export interface CartItems {
  total: number;
  items: ProductsResponseModel[];
}
