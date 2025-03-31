import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const Home = () => {
  const [email, setEmail] = useState({ value: '', dirty: false });
  const [error, setError] = useState('');

  const router = useRouter();

  const handleErrorEmail = () => {
      if (!email.dirty) 
        return null;
  if (!email.value) {
    return <Text style={styles.errorText}>O e-mail é obrigatório.</Text>;
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    return <Text style={styles.errorText}>Digite um e-mail válido.</Text>;
  }
    return null;
  };

  const handleErrorForm = () => {
    if (!email.value) {
      setError('O e-mail é obrigatório.');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setError('Digite um e-mail válido.');
      return;
    }
  
    setError('');
  };

  const handlePress = (destination: string) => {
    router.push(destination as any); // Redireciona para a página especificada
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <FontAwesome6 style={styles.logo} name="rainbow" />
        <Text style={styles.title}>Aposte na diversidade, apoie o esporte!</Text>
        <Text style={styles.text}>
          No Vale-Bet, você apoia atletas LGBTQIAP+ a alcançarem seus sonhos no esporte.
          Sua contribuição ajuda a custear viagens, treinamentos e competições,
          enquanto você recebe recompensas e concorre a prêmios dos nossos patrocinadores!
        </Text>
      </View>
      
      {/* BOTÕES INTERFACE PRINCIPAL */}
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => handlePress('/tabs/atletas')} style={styles.menuButton}>
          <FontAwesome6 name="medal" size={50} color="#000" />
          <Text style={styles.buttonText}> Atletas </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('/tabs/promocoes')} style={styles.menuButton}>
          <Ionicons name="star-sharp" size={50} color="black" />
          <Text style={styles.buttonText}>Promoções</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('/tabs/cart')} style={styles.menuButton}>
          <Feather name="shopping-cart" size={50} color="black" />
          <Text style={styles.buttonText}>Apostas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Como funciona?</Text>
        <Text style={styles.text}>- Conheça os atletas e suas histórias.</Text>
        <Text style={styles.text}>- Apoie com uma contribuição simbólica.</Text>
        <Text style={styles.text}>- Celebre o progresso e receba recompensas.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Por que apoiar?</Text>
        <Text style={styles.text}>- Promova a inclusão no esporte.</Text>
        <Text style={styles.text}>- Ajude atletas a superar barreiras financeiras.</Text>
        <Text style={styles.text}>- Faça parte de uma comunidade que valoriza a diversidade.</Text>
      </View>


      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <FontAwesome6 style={styles.logo} name="rainbow" />
          <Text style={{ color: '#000', fontSize: 20, marginBottom: 20 }}>
            Inscreva-se na nossa newsletter!
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={(text) => {
            setEmail({ value: text, dirty: true });
          }}
        />
        {handleErrorEmail()}
        <TouchableOpacity onPress={handleErrorForm} style={styles.loginButton}>
          <Text style={{ color: '#FFF' }}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/welcome')} style={styles.backButton}>
          <Text style={{ color: '#000000' }}>Voltar</Text>
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 5,
  },
  logo: {
    fontSize: 50,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  menuButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFF',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Home;
