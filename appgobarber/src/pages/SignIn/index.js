import React, { useCallback, useRef } from 'react';
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

import { useAuth } from '../../hooks/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';

const SignIn = () => {
  const formRef = useRef('');
  const passwordInputRef = useRef('');

  const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleSigIn = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais'
        )
      }
    }, [signIn]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enable
      >
        <ScrollView
          contentContainerStyle={{ flex: 1}}
          keyboardShouldPersistTaps='handled'
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSigIn}>

              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
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
                name='password'
                icon='lock'
                placeholder='Senha'
                secureTextEntry
                returnKeyType='send'
                onSubmitEditing={() => { formRef.current.submitForm()}}
              />

              <Button
                onPress={() => { formRef.current.submitForm()}}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton
        onPress={() => navigation.navigate('SignUp')}>
        <Icon name='log-in' size={20} color='#ff9000'/>
        <CreateAccountButtonText>
          Criar conta
        </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default SignIn;
