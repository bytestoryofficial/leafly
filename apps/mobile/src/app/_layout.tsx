import { Provider } from 'react-redux';
import { Stack } from 'expo-router';

import store from '@/store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
