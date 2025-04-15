import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Product } from '../../navigationTypes/navigation';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ nome: '', descricao: '', imagem: '' });

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.18.16:3000/api/atletas'); //alterar IP da minha máquina aqui
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar atletas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removerAtleta = async (id: string) => {
    console.log('Tentando excluir atleta com id:', id);
  
    try {
      const res = await fetch(`http://localhost:3000/api/atletas/${id}`, {
        method: 'DELETE',
      });
  
      const data = await res.text();
      console.log('Resposta do backend:', res.status, data);
  
      if (!res.ok) {
        throw new Error('Erro ao excluir atleta');
      }
  
      fetchProducts();
    } catch (err) {
      console.error('Erro ao remover atleta:', err);
    }
  };

  const abrirFormulario = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setForm({ nome: product.nome, descricao: product.descricao, imagem: product.imagem });
    } else {
      setEditingProduct(null);
      setForm({ nome: '', descricao: '', imagem: '' });
    }
    setModalVisible(true);
  };

  const salvarAtleta = async () => {
    if (!form.nome || !form.descricao || !form.imagem) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct
        ? `http://localhost:3000/api/atletas/${editingProduct._id}`
        : 'http://localhost:3000/api/atletas';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error('Erro ao salvar atleta');

      fetchProducts();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao salvar atleta');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {products.map((product) => (
          <View key={product._id} style={styles.card}>
            <Image source={{ uri: product.imagem }} style={styles.image} />
            <Text style={styles.title}>{product.nome}</Text>
            <Text style={styles.description}>{product.descricao}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  console.log('Editar clicado:', product._id);
                  abrirFormulario(product);
                }}
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  console.log('Excluir clicado:', product._id);
                  removerAtleta(product._id);
                }}
              >
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={() => abrirFormulario()}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={form.nome} onChangeText={(text) => setForm({ ...form, nome: text })} />

          <Text style={styles.label}>Descrição</Text>
          <TextInput style={styles.input} value={form.descricao} onChangeText={(text) => setForm({ ...form, descricao: text })} />

          <Text style={styles.label}>Imagem (URL)</Text>
          <TextInput style={styles.input} value={form.imagem} onChangeText={(text) => setForm({ ...form, imagem: text })} />

          <TouchableOpacity style={styles.button} onPress={salvarAtleta}>
            <Text style={styles.buttonText}>{editingProduct ? 'Atualizar' : 'Adicionar'} Atleta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 14, color: '#666', marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  editButton: {
    backgroundColor: '#FFA500',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 4,
  },
  actionText: { color: '#fff', fontWeight: 'bold' },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#4CAF50',
    marginTop: 30,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 16,
  },
});

export default ProductPage;