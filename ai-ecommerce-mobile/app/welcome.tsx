import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router'
const welcome = () => {
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
            <Text style={{color: '#FFF', fontSize:32}}>ValeBet</Text>
            <Text style={{color: '#FFF', fontSize:18, marginBottom: 20}}>Seja Bem vindo!</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace('/login')} style={styles.loginButton}><Text style={{color: '#FFF'}}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/register')} style={styles.registerButton}><Text style={{color: '#00000'}}>Cadastre-se</Text></TouchableOpacity>
    
    </View>   

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', 
        padding: 20,
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
        backgroundColor: '#0038A8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0038A8',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    icon: {
        fontSize: 24,
        color: '#000',
    },
    boxTop: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        padding: 10,
    },
    boxMid: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxBottom: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default welcome