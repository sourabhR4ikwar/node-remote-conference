import React, { useState } from "react";
import CenteredContainer from "../components/Layout/CenteredContainer";
import DynamicForm from "../components/Form/DynamicForm";
import NavBar from "../components/NavBar/NavBar";
import { browserHistory as history } from "react-router";

const JoinConference = () => {
  const content = {
    api: "/sdf",
    heading: "Host A Conference",
    footer: "",
    link: {
      path: "",
      text: "",
    },
    button: "HOST",
    fields: [
      {
        name: "displayName",
        type: "text",
        placeholder: "Display Name",
      },
      {
        name: "password",
        type: "password",
        placeholder: "Enter Password (optional)",
      },
    ],
  };
  const [message, setMessage] = useState('');
  const [form, setState] = useState({
    displayName: "",
    password: "",
  });

  const changeHandler = (e) => {
    setState({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (form.displayName !== "") {
      const userId = localStorage.getItem("userId");
      const postData = { ...form, userId };
      fetch("/api/v1/user/change-display-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => {
          console.log(res);
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Server Error");
          }
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.success) {
            setMessage("Display name changed !");
            setState({
              displayName: "",
            });
            localStorage.setItem("displayName", form.displayName);
            window.open(`conferences/new-public`, "_self");
          }
        })
        .catch((err) => setMessage("Internal Server Error!." + err));
    } else {
      window.open(`conferences/new-public`, "_self");
    }
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

export default JoinConference;
