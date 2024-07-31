import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { UserSignUp } from '../api';
import { loginSuccess } from '../redux/reducers/userSlice';
import Button from './Button';
import TextInput from './TextInput';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const FormContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return false;
    }
    return true;
  };

  const signUpHandler = async () => {
    setLoading(true);
    setIsButtonDisabled(true);
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then(res => {
          dispatch(loginSuccess(res.data));
          alert('Account Created Success');
          setLoading(false);
          setIsButtonDisabled(false);
        })
        .catch(err => {
          alert(err.response.data.message);
          setLoading(false);
          setIsButtonDisabled(false);
        });
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Fittrack </Title>
        <Span>Please fill form to create account</Span>
      </div>
      <FormContainer>
        <TextInput
          label='Full name'
          placeholder='please enter your full name'
          value={name}
          handelChange={e => setName(e.target.value)}
        />
        <TextInput
          label='Email'
          placeholder='please enter your email'
          value={email}
          handelChange={e => setEmail(e.target.value)}
        />
        <TextInput
          label='Password'
          placeholder='please enter your password'
          value={password}
          password
          handelChange={e => setPassword(e.target.value)}
        />
        <Button
          text='Sign In'
          onClick={signUpHandler}
          isLoading={loading}
          isDisabled={isButtonDisabled}
        />
      </FormContainer>
    </Container>
  );
};

export default SignUp;
