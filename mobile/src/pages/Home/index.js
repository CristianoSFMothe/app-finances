import React from 'react'
import { View, Text } from 'react-native'

import { Background } from './styles'
import Header from '../../components/Header'

export default function Home() {
  return (
    <Background>
      <Header  title="Minhas movimentações" />
    </Background>
  )
}
