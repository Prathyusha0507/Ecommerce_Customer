import React from "react";
import "./CustomDropdown.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../redux/user/userSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutePaths } from "../../utils/RoutePaths";
import { removeAllInCart } from "../../redux/cart/cartSlice";
import { clearWishlist } from "../../redux/wishlistSlice";
import NavDropdown from "react-bootstrap/NavDropdown";
function CustomDropdown({ name }) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(loggedOut());
        dispatch(removeAllInCart());
        dispatch(clearWishlist());
        navigate(RoutePaths.Home);
      })
      .catch((error) => {
        toast.error("error", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 2000,
        });
      });
    toast.success("User Logged Out!", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 2000,
    });
  };
  let menu = [
    {
      name: "Profile",
      to: RoutePaths.Profile,
    },
  ];
  if (user?.firstname === "Admin") {
    menu.push({
      name: "Add Product",
      to: RoutePaths.AddProduct,
    });
  }
  const navigateTo = (to) => {
    navigate(to); // Navigate to the desired route when the menu item is clicked
  };

  /* Learned from https://www.youtube.com/watch?v=bOx2WmyZrno */
  /* Referenced from https://www.tabnine.com/code/javascript/classes/react-bootstrap/NavDropdown.Item */
  return (
    <>
      <div className="custom-dropdown">
        <NavDropdown title={!name ? "Guest" : name}>
          {menu.map((i, index) => (
            <NavDropdown.Item key={index}>
              <p onClick={() => navigateTo(i.to)} className="option_name">
                {i.name}
              </p>
            </NavDropdown.Item>
          ))}
          <NavDropdown.Item>
            <p className="option_name" onClick={logOut}>
              Log Out
            </p>
          </NavDropdown.Item>
        </NavDropdown>
      </div>
      <ToastContainer />
    </>
  );
}

export default CustomDropdown;
