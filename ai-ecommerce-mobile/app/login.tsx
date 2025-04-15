import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { login } from '../auth/auth';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState({ value: '', dirty: false });
  const [password, setPassword] = useState({ value: '', dirty: false });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleErrorEmail = () => {
    if (!email.value && email.dirty) {
      return <Text style={styles.error}>Campo obrigatório</Text>;
    } else if (!emailRegex.test(email.value) && email.dirty) {
      return <Text style={styles.error}>E-mail inválido</Text>;
    } else {
      return <Text style={styles.error}></Text>;
    }
  };

  const handleErrorPassword = () => {
    if (!password.value && password.dirty) {
      return <Text style={styles.error}>Campo obrigatório</Text>;
    } else {
      return <Text style={styles.error}></Text>;
    }
  };

  const handleErrorForm = async () => {
    let hasError = false;

    if (!password.value) {
      setPassword({ value: password.value, dirty: true });
      hasError = true;
    }

    if (!email.value || !emailRegex.test(email.value)) {
      setEmail({ value: email.value, dirty: true });
      hasError = true;
    }

    if (hasError) return;

    try {
      const data = await login(email.value, password.value);
      Toast.show({ type: 'success', text1: 'Login realizado com sucesso!' });
      router.replace('/tabs/home');
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err.message || 'Erro ao fazer login' });
    }
  };

  return (
    <LinearGradient
      colors={['#D60270', '#9B4F96', '#0038A8']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <FontAwesome6 style={styles.logo} name="rainbow" />
          <Text style={{ color: '#FFF', fontSize: 32, marginBottom: 20 }}>ValeBet</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder='E-mail'
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={(text) => setEmail({ value: text, dirty: true })}
        />
        {handleErrorEmail()}

        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry
          onChangeText={(text) => setPassword({ value: text, dirty: true })}
        />
        {handleErrorPassword()}

        <TouchableOpacity onPress={handleErrorForm} style={styles.loginButton}>
          <Text style={{ color: '#FFF' }}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/welcome')} style={styles.backButton}>
          <Text style={{ color: '#000000' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 100,
    marginBottom: 20,
    color: '#FFF',
  },
  loginButton: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#D60270',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D60270',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    marginBottom: 4,
    paddingHorizontal: 8
  },
  error: {
    width: '100%',
    marginBottom: 10,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    height: 20
  }
});

// Componente de toast
import { View as RNView } from 'react-native';
const LoginWithToast = () => (
  <RNView style={{ flex: 1 }}>
    <Login />
    <Toast />
  </RNView>
);

export default LoginWithToast;
