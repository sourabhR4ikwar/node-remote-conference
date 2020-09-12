import React, { useState } from "react";
import { browserHistory as history } from "react-router";
import CenteredContainer from "../components/Layout/CenteredContainer";
import DynamicForm from "../components/Form/DynamicForm";
import NavBar from "../components/NavBar/NavBar";

const Register = () => {
  const content = {
    heading: "Create a new Account",
    footer: "Already have an Account?",
    link: {
      path: "/login",
      text: "Login Here",
    },
    button: "SIGN UP",
    fields: [
      {
        name: "email",
        type: "email",
        placeholder: "E-Mail",
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
      },
      {
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
      },
    ],
  };

  const [form, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setState({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
    fetch("http://localhost:3001/api/v1/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation Error!");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Registration Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        history.push("/login?success=true");
      })
      .catch((err) => console.log(err));
  };

  return (
    <CenteredContainer>
      <NavBar />
      <DynamicForm
        content={content}
        formData={form}
        change={changeHandler}
        submit={submitHandler}
      />
    </CenteredContainer>
  );
};

export default Register;
