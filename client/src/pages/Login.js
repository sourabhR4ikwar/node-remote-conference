import React, { useState, useEffect } from "react";
import { browserHistory as history } from "react-router";
import CenteredContainer from "../components/Layout/CenteredContainer";
import DynamicForm from "../components/Form/DynamicForm";
import NavBar from "../components/NavBar/NavBar";

const Login = () => {
  const [message, setMessage] = useState(' ');
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const isRedirected = params.get('success');
    if(isRedirected){
      setMessage('User Created Successfully !');
    }
  }, []);
  const content = {
    heading: "Sign in to your Account",
    footer: "Don't have an Account?",
    link: {
      path: "/register",
      text: "Register",
    },
    button: "SIGN IN",
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
    ],
  };

  const [form, setState] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setState({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
    fetch("api/v1/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(form),
    })
      .then((res) => { 
        console.log(res);
        if(res.status === '422'){
          setMessage('Validation Error !');
          throw new Error('Validation Error!');
        }
        if(res.status !== 200 && res.status !== 201){
          setMessage('Server Error !');
          throw new Error('Server Error !');
        }
        return res.json()
      })
      .then((res) => {
        console.log(res);
        if(res.success){
          const userId = res.data.userId;
          const email = res.data.email;
          const displayName = res.data.displayName;
          const token = res.token.split(" ")[1];

          const remainingTime = 60 * 60 * 1000;
          const expiryDate = new Date(new Date().getTime() + remainingTime);

          console.log({userId, email, displayName, token});
          localStorage.setItem('userId', userId);
          localStorage.setItem('email', email);
          localStorage.setItem('displayName', displayName);
          localStorage.setItem('token', token);
          localStorage.setItem('expiryDate', expiryDate.toISOString());
          history.push('/dashboard');
        }else{
          setMessage(res.message);
        }
      })
      .catch((err) => setMessage('Unable to reach server !'+err));
  };

  return (
    <CenteredContainer>
      <NavBar />
      <DynamicForm
        content={content}
        formData={form}
        change={changeHandler}
        submit={submitHandler}
        message={message}
      />
    </CenteredContainer>
  );
};

export default Login;
