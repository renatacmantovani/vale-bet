import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router'

function Register(){
    const router = useRouter()
        const [nome, setNome] = useState({value: '', dirty: false});
        const [password, setPassword] = useState({value: '', dirty: false});
        const [cpf, setCPF] = useState({value: '', dirty: false});
        const [email, setEmail] = useState({value: '', dirty: false});
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cpfRegex: RegExp = /^\d{11}$/;

    const handleErrorEmail = () => {
            if(!email.value && email.dirty) {
                return <Text style={styles.error}>Campo obrigatório</Text>
            } else if (!emailRegex.test(email.value) && email.dirty) {
                return <Text style={styles.error}>E-mail inválido</Text>
            }
        }
    
        const handleErrorPassword = () => {
            if(!password.value && password.dirty) {
                return <Text style={styles.error}>Campo obrigatório</Text>
            }
        }

        const handleErrorCPF = () => {
            if(!cpf.value && cpf.dirty) {
                return <Text style={styles.error}>Campo obrigatório</Text>
            } else if (!cpfRegex.test(email.value) && cpf.dirty) {
                return <Text style={styles.error}>CPF inválido</Text>
            }
        }

        const handleErrorNome = () => {
            if(!nome.value && nome.dirty) {
                return <Text style={styles.error}>Campo obrigatório</Text>
            }
            return null;
        }

        const handleErrorForm = () => {
            let hasError = false;
            if(!password.value) {
              setPassword({value: password.value, dirty: true})
              hasError = true;
            }
        
            if(!email.value) {
              setEmail({value: email.value, dirty: true})
              hasError = true
            }
            
            if (!emailRegex.test(email.value)) {
              setEmail({value: email.value, dirty: true})
              hasError = true
            }

            if (!cpf.value) {
                setCPF({value: cpf.value, dirty: true})
                hasError = true
            }

            if (!cpfRegex.test(cpf.value)) {
                setCPF({value: cpf.value, dirty: true})
                hasError = true
            }

            if (!nome.value) {
                setNome({value: nome.value, dirty: true})
                hasError = true
            }
        
            if(!hasError) {
                router.replace('/tabs/home')
            }

    }       

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
        <TextInput onChangeText={(text) => setNome({value: text, dirty: true})}
        style={styles.input} placeholder='Nome Completo*'/>
        {handleErrorNome()}

        <TextInput onChangeText={(text) => setEmail({value: text, dirty: true})}
        style={styles.input} placeholder='E-mail'/>
        {handleErrorEmail()}

        <TextInput onChangeText={(text) => setCPF({value: text, dirty: true})}
         style={styles.input} placeholder='CPF*'/>
        {handleErrorCPF()}

        <TextInput onChangeText={(text) => setPassword({value: text, dirty: true})}
        style={styles.input} placeholder='Senha' />
        {handleErrorPassword()}

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
    },
    error: {
        width: '100%',
        marginBottom: 20,
        color: '#FFF',
        fontWeight: 'bold',
        height: 20,
        fontSize: 14
    }

})

export default Register