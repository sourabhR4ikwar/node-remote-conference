import React  from "react";
import styled from "styled-components";
import FullWidthButton from "../UI/Buttons/FullWidthButton";
import { Link } from "react-router";

const FormHeading = styled.h1`
  font-size: 45px;
  color: white;
  margin-bottom: 40px;
`;

const LinkText = styled(Link)`
  color: skyblue;
  text-decoration: none;
`;
const Para = styled.p`
  font-size: 30px;
  color: white;
  margin-top: 30px;
`;

const Message = styled.p`
  color: ${props => props.success?"lightgreen":"tomato"};
`;

const Input = styled.input`
  outline: none;
  background-color: #3d3d3d;
  color: white;
  font-size: 35px;
  border-radius: 50px;
  border: 1px solid white;
  height: 80px;
  width: 536px;
  font-weight: 400;
  display: block;
  margin-top: 3%;
  padding: 2px 30px 2px 30px;
  text-align: center;
`;

/*
content ={
    heading: "",
    footer: "",
    Link: {
      path: "",
      text: ""
    }
    fields: [{
      placeholder:"",
      name:"",
      type:""
    }],
    button: ""
}
*/
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DynamicForm = (props) => {
  const content = props.content;
  let message = null;
  if(props.message){
    message = <Message success={props.message === 'User Created Successfully !'}>{props.message}</Message>;
  }
  return (
    <FormContainer>
      <FormHeading>{content.heading}</FormHeading>
      {message}
      <form>
        {content.fields.map((field) => {
          return (
            <Input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              key={field.name}
              value={props.formData[field.name]}
              onChange={props.change}
            />
          );
        })}
        <FullWidthButton onClick={props.submit}>
          {content.button}
        </FullWidthButton>
      </form>
      <Para>
        {content.footer}
        <LinkText to={content.link.path}> {content.link.text}</LinkText>
      </Para>
    </FormContainer>
  );
};

export default DynamicForm;
