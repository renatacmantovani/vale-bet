import React from 'react'
import { Text, StyleSheet, TouchableOpacity,View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f0f0f0', 
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
  boxTop: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row', // Para alinhar o ícone e o texto na horizontal
    alignItems: 'center', // Centraliza os itens verticalmente

  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  boxMid: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row', // Para alinhar o ícone e o texto na horizontal
    alignItems: 'center', // Centraliza os itens verticalmente
  },
  boxBottom: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row', // Para alinhar o ícone e o texto na horizontal
    alignItems: 'center', // Centraliza os itens verticalmente
  },
})

const Cart = () => {
  const handlePress = () => {
    console.log('Carrinho clicado!')
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <TouchableOpacity onPress={handlePress} style={style.button}>
        <FontAwesome6 name="medal" size={50} color="#000" />
          <Text style={style.title}>Nossos atletas</Text>
        </TouchableOpacity>
      </View>

      <View style={style.boxMid}>
      <TouchableOpacity onPress={handlePress} style={style.button}>
        <Ionicons name="star-sharp" size={50} color="black" />
          <Text style={style.title}>Promoções</Text>
        </TouchableOpacity>
      </View>

      <View style={style.boxBottom}>
      <TouchableOpacity onPress={handlePress} style={style.button}>
      <Feather name="shopping-cart" size={50} color="black" />
          <Text style={style.title}>Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Cart;