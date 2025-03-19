import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const CartPage2 = () => {
  const router = useRouter(); // Correção: Chamado dentro do componente funcional

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <Text style={styles.text}>Os produtos selecionados devem aparecer aqui (em breve!).</Text>
      <TouchableOpacity onPress={() => router.replace('/welcome')} style={styles.backButton}>
        <Text style={{ color: '#000000' }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  backButton: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#e0e0e0', 
    borderRadius: 5, 
    alignItems: 'center' 
  },
});

export default CartPage2;
