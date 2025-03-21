import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router'
const register = () => {
    const router = useRouter()
  return (
    <LinearGradient colors={['#D60270', '#9B4F96', '#0038A8']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}

    >
     <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
            <FontAwesome6 style={styles.logo} name="rainbow" />
            <Text style={{color: '#FFF', fontSize:32, marginBottom: 20}}>ValeBet</Text>
        </View>
        <TextInput style={styles.input} placeholder='Nome Completo*'/>
        <TextInput style={styles.input} placeholder='E-mail'/>
        <TextInput style={styles.input} placeholder='CPF*'/>
        <TextInput style={styles.input} placeholder='Senha' />
        <TextInput style={styles.input} placeholder='Repetir Senha' secureTextEntry/>
        <TouchableOpacity onPress={()=> router.replace('/tabs/home')} style={styles.loginButton}><Text style={{color: '#FFF'}}>Enviar</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> router.replace('/welcome')} style={styles.backButton}><Text style={{color: '#000000'}}>Voltar</Text></TouchableOpacity>
    
    </View>   

    </LinearGradient>
  )
}

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
        color: '#FFF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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
        marginBottom: 10
    }

})

export default register