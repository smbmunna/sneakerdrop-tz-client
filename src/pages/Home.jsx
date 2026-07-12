import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ProductImage from "../components/ProductImage";

export default function AllProducts() {
  const axiosSecure = useAxiosSecure();

  const fetchItems = async () => {
    const response = await axiosSecure("/api/items");    
    return response.data.data;
  };

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["sneakerItems"],
    queryFn: fetchItems,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-md text-gray-500"></span>
      </div>
    );
  }

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
