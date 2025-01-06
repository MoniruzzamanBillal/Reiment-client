import { Button } from "@/components/ui/button";

const ManageCoupon = () => {
  return (
    <div className="ManageCouponContainer py-8 bg-gray-100 border border-gray-300 p-3 shadow rounded-md">
      <div className="ManageCouponWrapper">
        <h3 className="brand text-2xl font-medium mb-4 "> Manage Coupons </h3>

        <Button
          onClick={() => (window.location.href = "/dashboard/add-coupon")}
          className="mb-4 bg-prime100 hover:bg-prime100 cursor-pointer"
        >
          Add Coupon
        </Button>

        {/* Existing Coupons Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Code</th>
              <th className="border border-gray-300 px-4 py-2">Percentage</th>
              <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder Rows */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">SAVE20</td>
              <td className="border border-gray-300 px-4 py-2">20%</td>
              <td className="border border-gray-300 px-4 py-2">2024-12-31</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md mr-2">
                  Edit
                </Button>
                <Button className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupon;
