import React, { useState } from "react";
import CustomButton from "../Custom/CustomButton.js";
import CustomFormInput from "../Custom/CustomFormInput.js";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useForm } from "react-hook-form";
import Modal from "../Custom/Modal.js";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { addUserAsync } from "../../redux/user/userSlice.js";
import { RoutePaths } from "../../utils/RoutePaths.js";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function Signup() {
  /* Reference from https://www.npmjs.com/package/yup and https://www.youtube.com/watch?v=K4r6nw6aeg4 */
  const schema = object({
    firstname: string().required("Firstname is required"),
    lastname: string().required("Lastname is required"),
    useremail: string().email().required("User Email is required"),
    userpassword: string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowModal(false);
  };
  /* Reference from https://firebase.google.com/docs/auth/web/password-auth */
  const createUser = (event) => {
    createUserWithEmailAndPassword(auth, event.useremail, event.userpassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: event.firstname,
        });
        event = {
          ...event,
          _id: user.uid,
        };
        dispatch(addUserAsync(event));
        reset();
        navigate(RoutePaths.Login);
      })
      .catch((error) => {
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
      });
  };
  return (
    <div>
      <div>
        <form className="signup-container">
          <h1 className="signup-header">Sign Up</h1>
          <CustomFormInput
            name="firstname"
            id="firstname"
            type="text"
            label="First Name"
            placeholder="Enter First Name"
            register={{ ...register("firstname", { required: true }) }}
            errorMessage={errors.firstname?.message}
          />
          <CustomFormInput
            name="lastname"
            id="lastname"
            type="text"
            label="Last Name"
            placeholder="Enter Last Name"
            register={{ ...register("lastname", { required: true }) }}
            errorMessage={errors.lastname?.message}
          />
          <CustomFormInput
            name="useremail"
            id="useremail"
            type="text"
            label="Email"
            placeholder="Enter Email"
            register={{ ...register("useremail", { required: true }) }}
            errorMessage={errors.useremail?.message}
          />
          <CustomFormInput
            name="userpassword"
            id="userpassword"
            type="password"
            label="Password"
            placeholder="Enter Password"
            register={{ ...register("userpassword", { required: true }) }}
            errorMessage={errors.userpassword?.message}
          />
          <CustomButton
            type="submit"
            label="Continue"
            event={handleSubmit(createUser)}
          />
        </form>
        {showModal && (
          <Modal
            heading="Notification"
            content={errorMessage}
            closeModal={closeModal}
            primaryLabel="Close"
            showSecondary={false}
          />
        )}
      </div>
    </div>
  );
}

export default Signup;
