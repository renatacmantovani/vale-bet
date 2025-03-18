import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Product {
  id: number;
  name: string;
  description: string;
  image: any;
  price: number;
}

// Apostas disponíveis
const availableProducts: Product[] = [
  { id: 1, name: 'Aposta simples', description: 'Apoie um atleta!', image: require('../../assets/images/one.png'), price: 20 },
  { id: 2, name: 'Casadinha', description: 'Apoie dois atletas!', image: require('../../assets/images/two.png'), price: 40 },
  { id: 3, name: 'Meu trio favorito!', description: 'Apoie três atletas!', image: require('../../assets/images/three.png'), price: 60 },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Adicionar
  const addToCart = (product: Product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  // Remover
  const removeFromCart = (index: number) => {
    setCartItems((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Calcular
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Apostas disponíveis</Text>

        {availableProducts.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image source={product.image} style={styles.productImage} /> {/* Corrigido aqui */}
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
                <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Minhas apostas</Text>

        {cartItems.length === 0 ? (
          <Text style={styles.emptyCart}>Seu carrinho está vazio.</Text>
        ) : (
          cartItems.map((product, index) => (
            <View key={index} style={styles.productContainer}>
              <Image source={product.image} style={styles.productImage} /> {/* Corrigido aqui */}
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(index)}>
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {calculateTotal().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#D9534F',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginVertical: 10,
  },
  totalContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#9B4F96',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartPage;
