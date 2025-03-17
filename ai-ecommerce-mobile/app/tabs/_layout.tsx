import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import MenuHeader from '@/components/MenuHeader';

export default function TabLayout() {
  const [visible, setVisible] = useState(false);

  return (
    <PaperProvider>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#9B4F96', // cor do fundo da header
            },
            title: 'Home',
            headerRight: () => <MenuHeader />,
            tabBarIcon: () => <MaterialCommunityIcons name="home" size={24} color="white" />,
            tabBarStyle: {
              backgroundColor: '#9B4F96', // cor do fundo da tab
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
          }}
        />
        <Tabs.Screen
          name="atletas"
          options={{
            title: 'Atletas',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#9B4F96',
            },
            headerRight: () => <MenuHeader />,
            tabBarIcon: () => <MaterialCommunityIcons name="account-circle" size={24} color="white" />,
            tabBarStyle: {
              backgroundColor: '#9B4F96',
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Carrinho',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#9B4F96',
            },
            headerRight: () => <MenuHeader />,
            tabBarIcon: () => <MaterialCommunityIcons name="cart" size={24} color="white" />, // ícone do carrinho
            tabBarStyle: {
              backgroundColor: '#9B4F96',
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
