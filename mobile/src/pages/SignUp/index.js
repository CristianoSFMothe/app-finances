import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";
import {
  Background,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "../SignIn/styles";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (name === '' || email === '' || password === '') return;
    
    signUp(name, email, password);
  };

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enable>
        <AreaInput>
          <Input
            placeholder="Nome"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Seu email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton activeOpacity={0.8} onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size="18" color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
