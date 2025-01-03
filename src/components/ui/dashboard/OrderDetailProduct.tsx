import TableDataLoading from "../TableDataLoading";

type TPoductItem = {
  _id: string;
  price: number;
  quantity: number;
  product: {
    _id: string;
    name: string;
    material: string;
    price: number;
    color: string[];
    size: string[];
    productImage: string;
  };
};

const OrderDetailProduct = ({
  productItems,
}: {
  productItems: TPoductItem[];
}) => {
  let content;

  if (!productItems) {
    content = (
      <tr>
        <td colSpan={8} className="p-4">
          <TableDataLoading />
        </td>
      </tr>
    );
  } else {
    content = productItems?.map((item: TPoductItem) => (
      <tr key={item._id} className="border-b">
        <td className="p-4 text-center flex items-center justify-center gap-x-1 ">
          {/* prod image  */}
          <div className="img ">
            <img
              src={item?.product?.productImage}
              className=" size-8 object-cover rounded-md  "
              alt=""
            />
          </div>
          <p className=" font-medium ">{item?.product?.name}</p>
        </td>
        <td className="p-4 text-center">{item?.price}</td>
        <td className="p-4 text-center">{item?.quantity}</td>
      </tr>
    ));
  }

  return (
    <div className="productCards">
      <h1 className=" font-medium text-lg mb-3 "> Products </h1>

      {/* product table  */}
      <div className="productTable">
        <table className="w-full">
          <thead>
            <tr>
              <th> Name</th>
              <th>Item Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailProduct;
