import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { getToken } from '../../auth/auth';
import Toast from 'react-native-toast-message';
import axios from 'axios';

interface Atleta {
  _id: string;
  nome: string;
  descricao: string;
  imagem?: string;
  apostas: number;
}

interface ApostaItem {
  atleta: Atleta;
  quantidade: number;
}

const CarrinhoApostas: React.FC = () => {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [apostas, setApostas] = useState<ApostaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carregarAtletas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/atletas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors'
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
        setAtletas(data);
      } catch (error) {
        console.error('Erro ao carregar atletas:', error);
        Toast.show({ type: 'error', text1: `Erro ao carregar atletas: ${error}` });
      } finally {
        setLoading(false);
      }
    };

    carregarAtletas();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Carrinho de Apostas</Text>
        {/* Renderização dos itens vai aqui */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20
  }
});

// Renderizar o Toast
import { View as RNView } from 'react-native';
export default () => (
  <RNView style={{ flex: 1 }}>
    <CarrinhoApostas />
    <Toast />
  </RNView>
);
