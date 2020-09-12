import React, { useState } from "react";
import CenteredContainer from "../components/Layout/CenteredContainer";
import DynamicForm from "../components/Form/DynamicForm";
import NavBar from "../components/NavBar/NavBar";

const JoinConference = (props) => {
  let reqId = props.params.id;
  const [message, setMessage] = useState('');  
  const content = {
    api: "/sdf",
    heading: "Join A Conference",
    footer: "",
    link: {
      path: "",
      text: "",
    },
    button: "JOIN",
    fields: [
      {
        name: "displayName",
        type: "text",
        placeholder: "Display Name",
      },
      {
        name: "conferenceId",
        type: "text",
        placeholder: "Enter Conference ID",
      },
    ],
  };

  const [form, setState] = useState({
    displayName: "",
    conferenceId: !reqId?"":reqId,
  });

  const changeHandler = (e) => {
    setState({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if(form.conferenceId === ""){
      setMessage("Please Enter a valid conference ID");
    }
    else if(form.displayName !== ""){
      const userId = localStorage.getItem("userId");
      if(userId){
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
              window.open(`/conferences/${form.conferenceId}`, "_self");
            }
          })
          .catch((err) => setMessage("Internal Server Error!." + err));
      }
      else {
        localStorage.setItem('displayName', form.displayName);
        window.open(`conferences/${form.conferenceId}`, "_self");
      }
      
    }
    else{
        setMessage('Please enter a display name !');
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
        message={message}
      />
    </CenteredContainer>
  );
};

export default JoinConference;
