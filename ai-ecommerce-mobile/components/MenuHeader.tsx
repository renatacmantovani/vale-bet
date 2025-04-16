import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Divider, Menu } from 'react-native-paper'

const MenuHeader = () => {
    const [visible, setVisible] = useState(false)
    const router = useRouter()
  return (
    <Menu
        visible={visible} // Controla a visibilidade do menu
        onDismiss={() => setVisible(false)} // Fecha o menu ao clicar fora
        anchor={
        <TouchableOpacity onPress={() => setVisible(true)} style={{ marginRight: 15 }}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="#FFF" />
        </TouchableOpacity>
        }>
    <Menu.Item onPress={() => router.push('/chat')} title={<Text>Fale conosco</Text>} />
    <Divider />
    <Menu.Item onPress={() => router.replace('/login')} title={<Text>Sair</Text>} />
</Menu>
  )
}

export default MenuHeader