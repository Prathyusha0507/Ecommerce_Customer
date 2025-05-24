import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import Checkout from "./components/Checkout/Checkout";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Cart from "./components/Cart/Cart";
import ProductPage from "./components/ProductPage/ProductPage";
import Dashboard from "./pages/dashboard";
import UserProfile from "./components/User/UserProfile";
import PrivateRoutes from "./utils/PrivateRoutes";
import WishlistPage from "./components/Wishlist/WishlistPage";
import PasswordReset from "./components/User/PasswordReset";
import ForgotPassword from "./components/User/ForgotPassword";
import { useSelector } from "react-redux";
import AddProduct from "./components/Admin/AddProduct";
import EditProduct from "./components/Admin/EditProduct";
import OrderPlaced from "./components/Checkout/OrderPlaced";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import { RoutePaths } from "./utils/RoutePaths";
import Front from "./pages/front";

function App() {
  const userFromStore = useSelector((state) => state.user.user);
  return (
    <div className="App">
      <Router>
        <Navbar name={userFromStore?.firstname} />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path={RoutePaths.Profile} element={<UserProfile />}></Route>
            <Route path={RoutePaths.Checkout} element={<Checkout />}></Route>
            <Route path={RoutePaths.Cart} element={<Cart />}></Route>
            <Route
              path={RoutePaths.Wishlist}
              element={<WishlistPage />}
            ></Route>
            <Route
              path={RoutePaths.OrderPlaced}
              element={<OrderPlaced />}
            ></Route>
            <Route
              path={RoutePaths.OrderHistory}
              element={<OrderHistory />}
            ></Route>
          </Route>
          <Route path={RoutePaths.Login} element={<Login />}></Route>
          <Route path={RoutePaths.Signup} element={<Signup />}></Route>
          <Route path={RoutePaths.Dashboard} element={<Dashboard />}></Route>
          <Route path={RoutePaths.Home} element={<Front />}></Route>
          <Route
            path={RoutePaths.ResetPassword}
            element={<PasswordReset />}
          ></Route>
          <Route
            path={RoutePaths.ForgotPassword}
            element={<ForgotPassword />}
          ></Route>
          <Route path={RoutePaths.Product} element={<ProductPage />}></Route>{" "}
          <Route path={RoutePaths.AddProduct} element={<AddProduct />}></Route>
          <Route
            path={RoutePaths.EditProduct}
            element={<EditProduct />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
