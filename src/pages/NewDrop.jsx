import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

export default function NewDrop() {
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = {
        item_code: data.item_code,
        total_stock: Number(data.total_stock),
        starts_at: data.starts_at,
      };
      const res = await axiosSecure.post("/api/drops", formData);
      //console.log('Response:', res.data);
      navigate("/availableProducts");
      reset();
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full max-w-md bg-base-100 shadow-lg"
      >
        <div className="card-body">
          <h2 className="card-title justify-center">Create Merch Drop</h2>

          {/* Item Code */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Code</span>
            </label>
            <input
              type="text"
              placeholder="AJ1-RED"
              className={`input input-bordered ${
                errors.item_code ? "input-error" : ""
              }`}
              {...register("item_code", { required: true })}
            />
            {errors.item_code && (
              <span className="text-error text-sm">Item code is required</span>
            )}
          </div>

          {/* Stock */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Total Stock</span>
            </label>
            <input
              type="number"
              className={`input input-bordered ${
                errors.total_stock ? "input-error" : ""
              }`}
              {...register("total_stock", { required: true, min: 1 })}
            />
            {errors.total_stock && (
              <span className="text-error text-sm">
                Stock must be at least 1
              </span>
            )}
          </div>

          {/* Start Time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Drop Starts At</span>
            </label>
            <input
              type="datetime-local"
              className={`input input-bordered ${
                errors.starts_at ? "input-error" : ""
              }`}
              {...register("starts_at", { required: true })}
            />
            {errors.starts_at && (
              <span className="text-error text-sm">Start time is required</span>
            )}
          </div>

          <div className="card-actions mt-4">
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                isSubmitting ? "loading" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Drop"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
