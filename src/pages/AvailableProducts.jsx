import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import ProductImage from "../components/ProductImage";
import { useState } from "react";

export default function AvailableProducts() {
  //managing purchase state
  const [loadingItem, setLoadingItem] = useState(null);
  const { user } = useAuth();
  //load products using axios and tanstack query
  const axiosSecure = useAxiosSecure();
  const fetchItems = async () => {
    const response = await axiosSecure("/api/drops");
    //console.log(response.data);
    return response.data.data;
  };
  const { data: items = [], refetch } = useQuery({
    queryKey: ["drops"],
    queryFn: fetchItems,
    refetchInterval: 3000, // refresh every 5 seconds
    refetchIntervalInBackground: true,
  });

  //reserve item
  const handleReserve = async (itemCode) => {
    setLoadingItem(itemCode);
    try {
      const res = await axiosSecure.post(`/api/reservations/${itemCode}`, {
        userId: user?.email,
      });

      refetch();

      Swal.fire({
        icon: "success",
        title: "Item reserved!",
        text: "Your reservation will expire in 60 seconds.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Reservation Failed",
        text: err.response?.data?.message || "Something went wrong",
      });

      console.error(err);
    } finally {
      setLoadingItem(null);
    }
  };

  //Purchase item
  const handlePurchase = async (itemcode) => {
    try {
      const res = await axiosSecure.post(`/purchase/${itemcode}`);

      if (res.status === 200) {
        refetch();
        const userData = {
          name: user?.displayName,
          email: user?.email,
        };
        await axiosSecure.post("/userPurchase", userData);
        //console.log(userPurchaseRes.data);

        Swal.fire("Success!", "Item purchased successfully!", "success");
      }
    } catch (err) {
      console.error("Purchase error:", err);
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to purchase",
        "error",
      );
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl">
              <th>Item Image</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {" "}
                  <div className="avatar">
                    <div className="rounded-lg h-12 w-12 bg-gray-50 border border-gray-100 overflow-hidden">
                      <ProductImage src={item.image} alt={item.item_name} />
                    </div>
                  </div>
                </td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
                <td>
                  {item.is_reserved ? (
                    <button
                      onClick={() => handlePurchase(item.item_code)}
                      className="btn btn-soft btn-accent btn-xm"
                    >
                      Purchase
                    </button>
                  ) : (
                    <button
                      disabled={loadingItem === item.item_code}
                      className="btn btn-soft btn-success btn-xm"
                      onClick={() => handleReserve(item.item_code)}
                    >
                      {loadingItem === item.item_code
                        ? "Reserving..."
                        : "Reserve"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
