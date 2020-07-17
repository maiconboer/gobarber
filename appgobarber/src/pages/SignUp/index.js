import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp = () => {
  const formRef = useRef('')
  const navigation = useNavigation();

  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');

  const handleSignUp = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido.'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso',
          'Você já pode fazer login na aplicação.'
        )

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente'
        );
      }
    }, [navigation]);

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
              onSubmit={handleSignUp}
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
