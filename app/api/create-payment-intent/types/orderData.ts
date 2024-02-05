interface OrderDataProduct {
    name: string;
    productId: string;
    quantity: number;
    color: string;
    price: number;
    image: string;
  }
  
 export interface OrderDataType {
    userId: string,
    amount: number;
    currency: string;
    payment_intent_id: string;
    products: {
      create: OrderDataProduct[];
    };
  }