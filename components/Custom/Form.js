import React, { useState, useEffect } from "react";
import CustomButton from "../Custom/CustomButton.js";
import CustomFormInput from "../Custom/CustomFormInput.js";
import "./Form.css";
import { useForm } from "react-hook-form";
import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { updateUserAsync } from "../../redux/user/userSlice.js";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "../Custom/Modal.js";
import { auth } from "../../firebase/firebaseConfig";
import { getUserInfoAsync } from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutePaths } from "../../utils/RoutePaths.js";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
/* Reference from Assignment2 and https://firebase.google.com/docs/auth/web/password-auth */
function Form({
  heading,
  showEmail,
  showPassword,
  label,
  showSignUpLink,
  query,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* Reference from https://www.npmjs.com/package/yup and https://www.youtube.com/watch?v=K4r6nw6aeg4  and ChatGPT */
  const schema = object({
    username: string().email("Invalid email found"),
    userpassword: string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const override = {
    display: "block",
    margin: "0 auto",
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const verifyUser = (event) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, event.username, event.userpassword)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        if (user) {
          dispatch(getUserInfoAsync(user.uid));
          setIsLoading(false);
          reset();
          navigate(RoutePaths.Home);
          toast.success("User Logged In!", {
            position: "bottom-right",
            theme: "colored",
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            setErrorMessage("Invalid Email Address found.");
            break;
          case "auth/user-disabled":
            setErrorMessage("Your account is disabled.");
            break;
          case "auth/user-not-found":
            setErrorMessage(
              "User Not found,Please Sign up to create a new account."
            );
            break;
          case "auth/wrong-password":
            setErrorMessage("Invalid User Password found.");
            break;
          default:
            setErrorMessage(error.message);
        }

        setShowModal(true);
        toast.error(error.message, {
          position: "bottom-right",
          theme: "colored",
          autoClose: 2000,
        });
      });
  };
  /* Learned from https://www.youtube.com/watch?v=MsDjbWUn3IE */
  const sendResetPasswordEmail = (event) => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, event.username, {
      url: "https://e-commerce-frontend-1ddb.onrender.com/login",
    })
      .then(() => {
        setIsLoading(false);
        setErrorMessage("Please Check Your Email and reset your password.");
        setShowModal(true);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            setErrorMessage("Invalid Email Address found.");
            setShowModal(true);
            break;
          default:
            setErrorMessage(error.message);
            setShowModal(true);
        }
      });
  };
  /* Learned from https://www.youtube.com/watch?v=MsDjbWUn3IE */
  const resetPassword = (event) => {
    return confirmPasswordReset(
      auth,
      query.get("oobCode"),
      event.userpassword
    ).then(() => {
      dispatch(
        updateUserAsync({
          _id: auth.currentUser.uid,
          userpassword: event.userpassword,
        })
      );

      navigate(RoutePaths.Login);
    });
  };
  /* Referred from https://www.npmjs.com/package/react-spinners */
  return (
    <>
      {isLoading && (
        <ClipLoader
          color="#369cd6"
          loading={isLoading}
          speedMultiplier={1}
          size={40}
          cssOverride={override}
        />
      )}
      <div>
        <form className="container">
          <div>
            <h1 className="form-header">{heading}</h1>
            {showEmail && (
              <CustomFormInput
                name="username"
                id="username"
                type="text"
                label="Email"
                placeholder="Enter Email"
                register={{ ...register("username", { required: true }) }}
                errorMessage={errors.username?.message}
              />
            )}
            {showPassword && (
              <CustomFormInput
                name="userpassword"
                id="userpassword"
                type="password"
                label="Password"
                placeholder="Enter Password"
                register={{ ...register("userpassword", { required: true }) }}
                errorMessage={errors.userpassword?.message}
              />
            )}
            <CustomButton
              type="submit"
              label={label}
              event={
                label === "Continue"
                  ? handleSubmit(verifyUser)
                  : label === "Reset"
                  ? handleSubmit(resetPassword)
                  : handleSubmit(sendResetPasswordEmail)
              }
            />
            {showSignUpLink && (
              <Link to={RoutePaths.Signup}>
                <span className="span_content">Create your account</span>
              </Link>
            )}
          </div>
        </form>
        {showModal && (
          <Modal
            heading="Notification"
            content={errorMessage}
            primaryLabel="Close"
            showSecondary={false}
            closeModal={closeModal}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Form;
