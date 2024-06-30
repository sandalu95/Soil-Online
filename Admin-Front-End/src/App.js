import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Reviews from "./pages/Reviews";

function App() {
  const location = useLocation();

  return (
    <div className="flex">
      <Sidebar>
        <Link to="/">
          <SidebarItem
            icon={<BarChartIcon />}
            text="Dashboard"
            active={location.pathname === "/"}
          />
        </Link>
        <Link to="/products">
          <SidebarItem
            icon={<Inventory2Icon />}
            text="Products"
            active={location.pathname === "/products"}
          />
        </Link>
        <Link to="/users">
          <SidebarItem
            icon={<PeopleIcon />}
            text="Users"
            active={location.pathname === "/users"}
          />
        </Link>
        <Link to="/reviews">
          <SidebarItem
            icon={<ReviewsIcon />}
            text="Reviews"
            active={location.pathname === "/reviews"}
          />
        </Link>
      </Sidebar>
      <div className="flex-1 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
