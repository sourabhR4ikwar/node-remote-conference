import React, { useState } from "react";
import { browserHistory as history } from "react-router";
import CenteredContainer from "../components/Layout/CenteredContainer";
import DynamicForm from "../components/Form/DynamicForm";
import NavBar from "../components/NavBar/NavBar";
import OrSeperator from "../components/UI/OrSeperator";
import FullWidthButton from "../components/UI/Buttons/FullWidthButton";

const Profile = () => {
  const content = {
    heading: "Set A Display Name",
    footer: "",
    link: {
      path: "",
      text: "",
    },
    button: "SET",
    fields: [
      {
        name: "displayName",
        type: "text",
        placeholder: "Display Name",
      },
    ],
  };
  const [message, setMessage] = useState('');
  const [form, setState] = useState({
    displayName: "",
  });

  const changeHandler = (e) => {
    setState({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const postData = {...form, userId};
    fetch('/api/v1/user/change-display-name',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res => {
      console.log(res);
      if(res.status !== 200 && res.status !== 201){
        throw new Error('Server Error');
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      if(res.success){
        setMessage('Display name changed !');
        setState({
          displayName: "",
        });
        localStorage.setItem('displayName',form.displayName);
        history.push('/profile');
      }
    })
    .catch(err => setMessage('Internal Server Error!.'+err));
  };

  const logoutHandler = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    history.push('/login');
  }
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
      <OrSeperator />
      <FullWidthButton onClick={logoutHandler} >LOG OUT</FullWidthButton>
    </CenteredContainer>
  );
};

export default Profile;
