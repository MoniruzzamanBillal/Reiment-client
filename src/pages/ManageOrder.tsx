const ManageOrder = () => {
  let content = null;

  return (
    <div className="ManageOrderContainer">
      <div className="ManageOrderWrapper bg-gray-100 border border-gray-300  shadow rounded-md p-3 ">
        <h3 className="brand text-2xl font-medium mb-4 "> Manage Order </h3>

        {/* table starts  */}
        <div className="table">
          <table className="w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Total Amount</th>
                <th>Shipping Address</th>
                <th>Order Detail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
        {/* table ends  */}
      </div>
    </div>
  );
};

export default ManageOrder;
