import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider, Menu, PaperProvider } from 'react-native-paper';
import { Text, TouchableOpacity } from 'react-native';
import MenuHeader from '@/components/MenuHeader';

export default function TabLayout() {
  const colorScheme = useColorScheme();
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
              color: 'white'
            },
            headerStyle: {
              backgroundColor: '#9B4F96' // cor do fundo da header
            },
            title: 'Home',
            headerRight: () => <MenuHeader/>,
            tabBarIcon: () => <MaterialCommunityIcons name="home" size={24} color='white'/>,
            tabBarStyle: {
              backgroundColor: '#9B4F96' // cor do fundo da tab
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray'
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Minhas Apostas',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white'
            },
            headerStyle: {
              backgroundColor: '#9B4F96'
            },
            headerRight: () => <MenuHeader/>,
            
            tabBarIcon: () => <MaterialCommunityIcons name="account-circle" size={24} color='white'/>,
            tabBarStyle: {
              backgroundColor: '#9B4F96'
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray'
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
