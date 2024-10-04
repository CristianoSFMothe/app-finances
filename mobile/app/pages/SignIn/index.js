import React, { useState } from "react";
import { Platform } from "react-native";

import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  Label,
  IconContainer,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from "./styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Logo source={require("../../assets/Logo.png")} />

        <Label>Email</Label>
        <AreaInput>
          <Input placeholder="Seu E-mail" keyboardType="email-address" />
        </AreaInput>

        <Label>Senha</Label>
        <AreaInput>
          <Input placeholder="Sua Senha" secureTextEntry={hidePassword} />
          <IconContainer onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={25}
              color="#737373"
            />
          </IconContainer>
        </AreaInput>

        <SubmitButton activeOpacity={0.9}>
          <SubmitText>Entrar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
