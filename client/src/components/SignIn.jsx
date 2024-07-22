import React, { useState } from 'react';
import styled from 'styled-components';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <div>
        <Title>Welcome to Fittrack </Title>
        <Span>Please login</Span>
      </div>
      <FormContainer>
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
        <Button text='Sign In' />
      </FormContainer>
    </Container>
  );
};

export default SignIn;
