import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { getToken } from '../../auth/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        toast.error(`Erro ao carregar atletas: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    carregarAtletas();
  }, []);

  const adicionarAposta = (atleta: Atleta) => {
    setApostas(prev => {
      const existe = prev.find(a => a.atleta._id === atleta._id);
      if (existe) {
        return prev.map(a => 
          a.atleta._id === atleta._id 
            ? { ...a, quantidade: a.quantidade + 1 } 
            : a
        );
      }
      return [...prev, { atleta, quantidade: 1 }];
    });
  };

  const removerAposta = (atletaId: string) => {
    setApostas(prev => prev.filter(a => a.atleta._id !== atletaId));
    toast.info('Aposta removida');
  };

  const atualizarQuantidade = (atletaId: string, valor: number) => {
    if (valor < 1) return;
    
    setApostas(prev => 
      prev.map(a => 
        a.atleta._id === atletaId 
          ? { ...a, quantidade: valor } 
          : a
      )
    );
  };

  const calcularTotalApostas = () => {
    return apostas.reduce((total, aposta) => total + aposta.quantidade, 0);
  };

  const finalizarApostas = async () => {
    const token = getToken();
    if (!token) {
      toast.warn('Você precisa estar logado para apostar');
      return;
    }

    if (apostas.length === 0) {
      toast.warn('Adicione pelo menos uma aposta');
      return;
    }

    try {
      // Enviar cada aposta individualmente
      for (const aposta of apostas) {
        for (let i = 0; i < aposta.quantidade; i++) {
          const response = await fetch(`http://localhost:3000/api/atletas/${aposta.atleta._id}/apostar`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) throw new Error('Falha ao registrar aposta');
        }
      }

      toast.success(`${calcularTotalApostas()} apostas realizadas com sucesso!`);
      setApostas([]);
      
      // Recarregar lista de atletas atualizada
      const response = await fetch('http://localhost:3000/api/atletas');
      const data = await response.json();
      setAtletas(data);
      
    } catch (error) {
      toast.error('Erro ao finalizar apostas');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando atletas...</Text>
      </View>
    );
  }

  return (
    <>
      <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  toastStyle={{
    zIndex: 9999,
    padding: '16px',
    marginTop: '80px', // <-- começa abaixo do header
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  }}
/>
  
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.title}>Atletas Disponíveis</Text>
            
            {atletas.map(atleta => (
              <View key={atleta._id} style={styles.atletaCard}>
                <View style={styles.atletaInfo}>
                  <Text style={styles.atletaNome}>{atleta.nome}</Text>
                  <Text style={styles.atletaDescricao}>{atleta.descricao}</Text>
                  <Text style={styles.atletaApostas}>Apostas atuais: {atleta.apostas}</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.adicionarButton}
                  onPress={() => adicionarAposta(atleta)}
                >
                  <Text style={styles.buttonText}>Apostar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
  
          <View style={styles.section}>
            <Text style={styles.title}>Minhas Apostas</Text>
            
            {apostas.length === 0 ? (
              <Text style={styles.emptyMessage}>Nenhuma aposta adicionada</Text>
            ) : (
              <>
                {apostas.map((aposta) => (
                  <View key={aposta.atleta._id} style={styles.apostaItem}>
                    <View style={styles.apostaInfo}>
                      <Text style={styles.apostaNome}>{aposta.atleta.nome}</Text>
                      <View style={styles.quantidadeContainer}>
                        <TouchableOpacity
                          style={styles.quantidadeButton}
                          onPress={() => atualizarQuantidade(aposta.atleta._id, aposta.quantidade - 1)}
                        >
                          <Text style={styles.quantidadeButtonText}>-</Text>
                        </TouchableOpacity>
                        
                        <TextInput
                          style={styles.quantidadeInput}
                          value={aposta.quantidade.toString()}
                          keyboardType="numeric"
                          onChangeText={(text) => {
                            const num = parseInt(text) || 1;
                            atualizarQuantidade(aposta.atleta._id, num);
                          }}
                        />
                        
                        <TouchableOpacity
                          style={styles.quantidadeButton}
                          onPress={() => atualizarQuantidade(aposta.atleta._id, aposta.quantidade + 1)}
                        >
                          <Text style={styles.quantidadeButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    <TouchableOpacity
                      style={styles.removerButton}
                      onPress={() => removerAposta(aposta.atleta._id)}
                    >
                      <Text style={styles.buttonText}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                
                <View style={styles.resumoContainer}>
                  <Text style={styles.resumoTexto}>
                    Total de apostas: {calcularTotalApostas()}
                  </Text>
                  
                  <TouchableOpacity
                    style={styles.finalizarButton}
                    onPress={finalizarApostas}
                  >
                    <Text style={styles.finalizarButtonText}>Finalizar Apostas</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  atletaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  atletaInfo: {
    flex: 1,
  },
  atletaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  atletaDescricao: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  atletaApostas: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
  },
  apostaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginBottom: 8,
  },
  apostaInfo: {
    flex: 1,
  },
  apostaNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantidadeButton: {
    width: 30,
    height: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  quantidadeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantidadeInput: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  resumoContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  resumoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  adicionarButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  removerButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  finalizarButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CarrinhoApostas;