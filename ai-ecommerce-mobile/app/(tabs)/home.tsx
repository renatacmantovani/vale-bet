import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Home = () => {
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
});

export default Home;