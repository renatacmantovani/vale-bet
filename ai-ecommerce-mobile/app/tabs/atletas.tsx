// ProductPage.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Atleta 01',
    description: 'Descrição 1',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Atleta 2',
    description: 'Descrição 2',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Atleta 3',
    description: 'Descrição 3',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const ProductPage: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        {products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        ))}
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
  productContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
});

export default ProductPage;
