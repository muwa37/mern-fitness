import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { UserSignIn } from '../api';
import { loginSuccess } from '../store/reducers/userSlice';
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

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    if (!email || !password) {
      alert('please fill in all fields');
      return false;
    }
    return true;
  };

  const signInHandler = async () => {
    setLoading(true);
    setIsButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then(res => {
          dispatch(loginSuccess(res.data));
          alert('Login Success');
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
        <Span>Please login</Span>
      </div>
      <FormContainer>
        <TextInput
          label='Email'
          placeholder='please enter email'
          value={email}
          handelChange={e => setEmail(e.target.value)}
        />
        <TextInput
          label='Password'
          placeholder='please enter password'
          value={password}
          password
          handelChange={e => setPassword(e.target.value)}
        />
        <Button
          text='Sign In'
          onClick={signInHandler}
          isLoading={loading}
          isDisabled={isButtonDisabled}
        />
      </FormContainer>
    </Container>
  );
};

export default SignIn;
