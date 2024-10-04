import { StatusBar } from 'react-native';

import Routes from './routes';

export default function Index() {
  return (
    <>
      <StatusBar backgroundColor="#F0F4FF" barStyle="dark-content" />
      <Routes />
    </>
  );
}
