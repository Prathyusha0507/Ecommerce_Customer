import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomDropdown from "../Custom/CustomDropdown";
import { RoutePaths } from "../../utils/RoutePaths";
/* Reference from https://firebase.google.com/docs/auth/web/password-auth */
function Navbar({ name }) {
  const [showDropdown, setshowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const showMenu = () => {
    setshowDropdown(!showDropdown);
  };
  const numItemsInCart = useSelector((state) => state.cart.itemsList).length;
  const navigate = useNavigate();
  const keyPressHandler = (e) => {
    if (e.which === 13) {
      navigate(`/dashboard/${query}`);
    }
  };
  let item = useLocation().pathname.split("/")[2];
  let page = useLocation().pathname.split("/")[1];
  useEffect(() => {
    if (item === undefined || page !== "dashboard") {
      item = "";
    }
    setQuery(item);
  }, [item, page]);
  return (
    <div className="navbar">
      <Link className="navbar_title_link" to={RoutePaths.Home}>
        <span className="navbar_title">E-Commerce</span>
      </Link>
      <div className="navbar_search">
        <input
          className="navbar_search_input"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyDown={keyPressHandler}
          placeholder="Search here...."
        ></input>
        <Link to={`/dashboard/${query}`} style={{ lineHeight: 0 }}>
          <svg
            className="navbar_search_icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Link>
      </div>
      <div className="navbar_links">
        <>
          {name ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.9"
              stroke="currentColor"
              className="navbar_account_icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <Link to={RoutePaths.Login}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.9"
                stroke="currentColor"
                className="navbar_account_icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          )}
        </>

        <CustomDropdown name={name} />

        <div>
          <Link to={RoutePaths.Wishlist}>
            <svg
              className="navbar_wishlist_icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.9"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </Link>
        </div>

        <div className="navbar_link_3">
          <Link to={RoutePaths.Cart}>
            <svg
              className="navbar_shopping-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
          <span className="navbar_shopping-icon_count">{numItemsInCart}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
