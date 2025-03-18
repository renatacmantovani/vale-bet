import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <Text style={styles.text}>Os produtos selecionados aparecerão aqui.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, color: '#666' },
});

export default CartPage;