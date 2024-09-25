import React, { createContext, useState } from 'react'
import api from '../services/api'
import { useNavigation } from '@react-navigation/native'
export const AuthContext = createContext({}) 

const AuthProvider = ({ children })  => {
  const [user, setUser] = useState({
    name: 'Cristiano Teste'
  })

  const navigation = useNavigation();

  const signUp = async (name, email, password) => {
    try{
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      navigation.goBack()

    } catch(err) {
      console.log('ERRO AO CADASTRAR', err)
    }
  }

  return(
    <AuthContext.Provider value={{ user, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider