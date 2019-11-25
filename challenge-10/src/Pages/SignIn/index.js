import React, { useState } from 'react';
import { Image } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/8-layers.png';

import Background from '~/components/Background/BackgroundSignIn';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const [id, setId] = useState('');

  const handleSubmit = () => {};
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            autoCorrect={false}
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
