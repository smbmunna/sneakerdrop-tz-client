import { Link, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet />
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/">Itemmaster</Link>
          </li>
          <li>
            <Link to="/availableProducts">Available Products</Link>
          </li>
          <li>
            <Link to="/newDrop">New Drop</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RootLayout;
