import React from "react";
import { useLocation } from "react-router-dom";
import Form from "../Custom/Form";

/* Learned from https://www.youtube.com/watch?v=MsDjbWUn3IE */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function PasswordReset() {
  const query = useQuery();
  return (
    <div>
      <Form
        heading="New Password"
        showEmail={false}
        showPassword={true}
        label="Reset"
        showSignUpLink={false}
        query={query}
      />
    </div>
  );
}

export default PasswordReset;
