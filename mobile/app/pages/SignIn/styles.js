import styled from "styled-components";
import { theme } from "../../theme";

export const Background = styled.View`
  flex: 1;
  background-color: ${theme.background};
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 25px;
`;

export const Label = styled.Text`
  width: 90%;
  font-size: 16px;
  color: ${theme.darkText};
  margin-bottom: 5px;
`;

export const AreaInput = styled.View`
  flex-direction: row;   
`;

export const Input = styled.TextInput`
  background-color: ${theme.white};
  width: 90%;          
  font-size: 17px;
  padding: 10px;
  border-radius: 8px;
  color: ${theme.darkText};
  margin-bottom: 15px;
`;

export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  height: 100%;
  justify-content: center; 
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  background-color: ${theme.buttonBackground};
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: ${theme.submitText};
`;

export const Link = styled.TouchableOpacity`
  margin: 10px 0;
`;

export const LinkText = styled.Text`
  color: ${theme.linkText};
`;
