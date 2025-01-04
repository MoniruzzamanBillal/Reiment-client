type TProduct = {
  _id: string;
  name: string;
  price: number;
  productImage: string;
  stockQuantity: number;
};

export type TCartItem = {
  price: number;
  product: TProduct;
  quantity: number;
  _id: string;
};
