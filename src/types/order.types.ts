export type TOrder = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  address: {
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
    user: string;
  };

  orderItems: Array<{
    _id: string;
    price: number;
    quantity: number;
    product: {
      _id: string;
      name: string;
      detail: string;
      material: string;
      price: number;
      color: string[];
      size: string[];
      productImage: string;
    };
  }>;
  payment: {
    _id: string;
    paymentStatus: string;
    transactionId: string;
    amount: number;
  };
  status: string;
  totalAmount: number;
  user: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };
};
