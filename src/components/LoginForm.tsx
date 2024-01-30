import React, { FC, ChangeEvent, useState, useEffect } from "react";
import { Button } from "./Button";
import styled from "styled-components";

interface LoginFormProps {
  email: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
}

const LoginContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}))

const Login = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 0px 30px #dedede',
  padding: '80px', 
}))

const ButtonLogin = styled(Button)((props) => ({
  border: !!props.disabled ? '2px solid gray' : '2px solid black',
  color: !!props.disabled ? 'gray' : 'black',
}))

const LoginForm: FC<LoginFormProps> = ({ email, onChange, onClickLogin }) => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    setIsValidEmail(validateEmail(email))
  }, [email]);

  function validateEmail(email:string){
    const mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
    return mailformat.test(email);
  }

  return (
    <LoginContainer>
      <Login>
        <input placeholder="Inserisci email" value={email} onChange={onChange} /><br></br>
        <ButtonLogin onClick={onClickLogin} disabled={!isValidEmail}>
          Login
        </ButtonLogin>
      </Login>
    </LoginContainer>
  );
};

export default LoginForm;