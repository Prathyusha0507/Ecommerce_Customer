import React from "react";
import Form from "../Custom/Form";
function Login() {
  return (
    <div>
      <Form
        heading="Sign in"
        showEmail={true}
        showPassword={true}
        label="Continue"
        showSignUpLink={true}
      />
    </div>
  );
}

export default Login;
