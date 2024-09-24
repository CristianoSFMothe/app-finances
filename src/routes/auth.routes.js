import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import { theme } from "../theme"; 

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false
        }}
      />

      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: theme.buttonBackground,
            borderBottomWidth: 1,
            borderBottomColor: theme.border
          },
          headerTintColor: theme.white,
          headerTitle: 'Voltar',
          headerBackTitleVisible: false
        }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthRoutes;