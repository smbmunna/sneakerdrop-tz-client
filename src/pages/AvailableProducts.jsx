import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

export default function AvailableProducts() {
  //managing purchase state
  //const [purchaseState, setPurchaseState] = useState('');
  const { user } = useAuth();
  //load products using axios and tanstack query
  const axiosSecure = useAxiosSecure();
  const fetchItems = async () => {
    const response = await axiosSecure("/items");
    //console.log(response.data);
    return response.data;
  };
  const { data: items = [], refetch } = useQuery({
    queryKey: ["sneakerItems"],
    queryFn: fetchItems,
    refetchInterval: 3000, // refresh every 5 seconds
    refetchIntervalInBackground: true,
  });

  //reserve item
  const handleReserve = async (itemcode) => {
    await axiosSecure
      .post(`/reserve/${itemcode}`)
      .then((res) => {
        refetch();
        if (res.statusText == "OK") {
          Swal.fire("Item reserved for 60 seconds!");
          //setPurchaseState('reserved');
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data?.error || "Failed", "error");
        console.error(err);
      });
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
      <h1>Available Products:{items.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Item Image</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Stock Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {" "}
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
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
                      onClick={() => handleReserve(item.item_code)}
                      className="btn btn-soft btn-primary btn-xm"
                    >
                      Reserve
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
