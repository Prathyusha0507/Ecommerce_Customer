import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserProfile.css";
import CustomButton from "../Custom/CustomButton";
import CustomFormInput from "../Custom/CustomFormInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { updateUserInfo } from "../../redux/user/userSlice.js";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAddress from "../Custom/CustomAddress";
import {
  updateUserAsync,
  getUserInfoAsync,
} from "../../redux/user/userSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutePaths } from "../../utils/RoutePaths";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function UserProfile() {
  const userSchema = object({
    accountholder: string().required("Account holder is required"),
    email: string().email().required("Email is required"),
    mobile: string()
      .required()
      .matches(/^\d{10}$/, "Invalid Mobile Number"),
  });
  const user = useSelector((state) => state.user.user);
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const currentUser = auth.currentUser;
  const changePassword = () => {
    navigate(RoutePaths.ForgotPassword);
  };
  const updateUserName = () => {
    setIsEditable(!isEditable);
  };
  const updateUserEmail = () => {
    setIsEditable(!isEditable);
  };
  const updateUserMobile = () => {
    setIsEditable(!isEditable);
  };
  const loaderStyle = {
    display: "block",
    margin: "0 auto",
  };
  useEffect(() => {
    if (currentUser != null) {
      dispatch(getUserInfoAsync(currentUser.uid));
    }
  }, [dispatch, currentUser]);
  /* Reference from https://firebase.google.com/docs/auth */
  const updateUser = (event) => {
    setIsLoading(true);
    updateProfile(currentUser, {
      displayName: event.accountholder,
      email: event.email,
    })
      .then(() => {
        dispatch(
          updateUserInfo({
            name: event.accountholder,
            email: event.email,
          })
        );
        dispatch(
          updateUserAsync({
            _id: currentUser.uid,
            useremail: event.email,
            mobile: event.mobile,
            address: event.address,
            firstname: event.accountholder,
          })
        );
        setIsLoading(false);
        toast.success("User Profile updated !", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 2000,
        });
      })
      .catch((error) => {});
  };
  return (
    <>
      {isLoading && (
        <ClipLoader
          color="#369cd6"
          loading={isLoading}
          speedMultiplier={1}
          size={40}
          cssOverride={loaderStyle}
        />
      )}
      <div className="profile_container">
        <form>
          <div className="profile_input">
            <div className="image_uploader">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU"
                alt="Broken Link"
              />
            </div>
            <div className="input_row">
              <div className="profile_input_field">
                <CustomFormInput
                  name="accountholder"
                  id="accountholder"
                  type="text"
                  defaultValue={user?.firstname}
                  label="Account Holder"
                  readOnly={!isEditable}
                  register={{ ...register("accountholder") }}
                  errorMessage={errors.accountholder?.message}
                />
              </div>

              <div onClick={updateUserName}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="edit_icon"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </div>
            </div>
            <div className="input_row">
              <div className="profile_input_field">
                <CustomFormInput
                  name="email"
                  id="email"
                  type="email"
                  label="Email Address"
                  defaultValue={user?.useremail}
                  readOnly={!isEditable}
                  register={{ ...register("email") }}
                  errorMessage={errors.email?.message}
                />
              </div>
              <div onClick={updateUserEmail}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="edit_icon"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </div>
            </div>
            <div className="input_row">
              <div className="profile_input_field">
                <CustomFormInput
                  name="mobile"
                  id="mobile"
                  type="phone"
                  readOnly={!isEditable}
                  label="Mobile Number"
                  defaultValue={user?.mobile}
                  register={{ ...register("mobile") }}
                  errorMessage={errors.mobile?.message}
                />
              </div>
              <svg
                onClick={updateUserMobile}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="edit_icon"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
            </div>
            <div className="input_row">
              <div className="profile_input_field">
                <CustomAddress
                  name="Address"
                  id="address"
                  register={{ ...register("address") }}
                />
              </div>
              <div></div>
            </div>
          </div>
          <CustomButton
            style={{
              width: "90%",
            }}
            label="Update Profile"
            event={handleSubmit(updateUser)}
          />
          <CustomButton
            style={{
              width: "90%",
            }}
            label="Change Password"
            event={changePassword}
          />
          <CustomButton
            label="View Order History"
            style={{
              width: "90%",
            }}
            event={() => navigate(RoutePaths.OrderHistory)}
          />
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserProfile;
