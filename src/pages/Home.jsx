import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function AllProducts() {
  const axiosSecure = useAxiosSecure();
  const fetchItems = async () => {
    const response = await axiosSecure("/allItems");
    //console.log(response.data);
    return response.data;
  };
  const { data: items = [], refetch } = useQuery({
    queryKey: ["sneakerItems"],
    queryFn: fetchItems,
  });
  return (
    <div>
      <h1>Total Products:{items.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Item Image</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Price</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
