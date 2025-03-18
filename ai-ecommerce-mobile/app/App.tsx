import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductPage from './tabs/atletas'
import CartPage from './tabs/cart';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen name="Products" component={ProductPage} options={{ title: 'Produtos' }} />
        <Stack.Screen name="Cart" component={CartPage} options={{ title: 'Carrinho' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
