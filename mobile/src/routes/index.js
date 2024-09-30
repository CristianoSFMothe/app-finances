import React, { useContext} from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { styled } from 'styled-components/native';
import { theme } from '../theme';

function Routes(){
  const { signed, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View 
        styled={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.backgroundColor
        }}
      >
        <ActivityIndicator size="large" color={theme.buttonBackground} />
      </View>
    )
  }

  return(
    signed ? <AppRoutes /> : <AuthRoutes/>
  )
}

export default Routes;