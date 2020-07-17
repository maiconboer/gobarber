import React, { useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp = () => {
  const formRef = useRef('')
  const navigation = useNavigation();

  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.os === 'ios' ? 'padding' : undefined}
        enable
      >
        <ScrollView
          contentContainerStyle={{ flex: 1}}
          keyboardShouldPersistTaps='handled'
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={(data) => {console.log(data);}}
            >
              <Input
                autoCorrect={false}
                autoCapitalize='words'
                name='name'
                icon='user'
                placeholder='Nome'
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                name='email'
                icon='mail'
                placeholder='E-mail'
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name='password'
                icon='lock'
                placeholder='Senha'
                textContentType='newPassword'
                returnKeyType='send'
                onSubmitEditing={() => formRef.current.submitForm()}
              />

              <Button
                onPress={() => formRef.current.submitForm()}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => navigation.goBack()}>
        <Icon name='arrow-left' size={20} color='#ffffff'/>
        <BackToSignInText>
          Voltar para logon
        </BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp;
