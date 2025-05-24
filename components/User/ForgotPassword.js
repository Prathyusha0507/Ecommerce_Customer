import React from "react";
import Form from "../Custom/Form";

function ForgotPassword() {
  return (
    <div>
      <Form
        heading="Forgot Password"
        showEmail={true}
        showPassword={false}
        label="Submit"
        showSignUpLink={false}
      />
    </div>
  );
}

export default ForgotPassword;
