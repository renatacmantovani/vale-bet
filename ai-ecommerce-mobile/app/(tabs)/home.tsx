import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const handleErrorEmail = () => {
  // Add your error handling logic here
  return null;
};

const handleErrorPassword = () => {
  // Add your error handling logic here
  return null;
};

const handleErrorForm = () => {
  // Add your form error handling logic here
  return null;
};

import { useState } from 'react';
import { useRouter } from 'expo-router';

const Home = () => {
  const [email, setEmail] = useState({ value: '', dirty: false });
  const [password, setPassword] = useState({ value: '', dirty: false });
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>

      /* Container 1: Aposte na diversidade, apoie o esporte! */
      <View style={styles.section}>
        <FontAwesome6 style={styles.logo} name="rainbow" />
        <Text style={styles.title}>Aposte na diversidade, apoie o esporte!</Text>
        <Text style={styles.text}>
         No Vale-Bet, você apoia atletas LGBTQIAP+ a alcançarem seus sonhos no esporte.
         Sua contribuição ajuda a custear viagens, treinamentos e competições,
         enquanto você recebe recompensas simbólicas como agradecimento.
        </Text>
      </View>

      /* Container 2: Como funciona? */
      <View style={styles.section}>
        <Text style={styles.subtitle}>Como funciona?</Text>
        <Text style={styles.text}>-Conheça os atletas e suas histórias.</Text>
        <Text style={styles.text}>-Apoie com uma contribuição simbólica.</Text>
        <Text style={styles.text}>-Celebre o progresso e receba recompensas.</Text>
      </View>

      /* Container 3: Por que apoiar? */
      <View style={styles.section}>
        <Text style={styles.subtitle}>Por que apoiar?</Text>
        <Text style={styles.text}>-Promova a inclusão no esporte.</Text>
        <Text style={styles.text}>-Ajude atletas a superar barreiras financeiras.</Text>
        <Text style={styles.text}>-Faça parte de uma comunidade que valoriza a diversidade.</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
            <FontAwesome6 style={styles.logo} name="rainbow" />
            <Text style={{color: '#FFF', fontSize:32, marginBottom: 20}}>ValeBet</Text>
        </View>
        <TextInput style={styles.input} placeholder='E-mail' onChangeText={(text) => {setEmail({value: text, dirty: true})}}/>
        {handleErrorEmail()}
        <TextInput style={styles.input} placeholder='Senha' onChangeText={(text) => {setPassword({value: text, dirty: true})}} secureTextEntry/>
        {handleErrorPassword()}
        <TouchableOpacity onPress={()=> handleErrorForm()} style={styles.loginButton}><Text style={{color: '#FFF'}}>Entrar</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> router.replace('/welcome')} style={styles.backButton}><Text style={{color: '#000000'}}>Voltar</Text></TouchableOpacity>
    
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
    marginBottom: 12,//Espaço entre os containers
  },
  title: {
    fontSize: 25, // Tamanho da fonte
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:5,
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
});

export default Home;