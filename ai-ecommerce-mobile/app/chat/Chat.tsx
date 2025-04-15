import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ChatStyle'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Balloon from './Baloon';
import storageService from '../services/storageService';
import { io } from "socket.io-client";
import { FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const PORT = '3000'
const SERVER_URL = `http://10.5.6.138:${PORT}`
const socket = io(SERVER_URL)

const Chat = () => {
  const content: any = {messages:[]}
  const [text, setText] = useState('')
  const [chat, setChat] = useState(content)
  const [userData, setUserData] = useState({name: ''})
  useEffect(() => {
    socket.on('connect', () => {
        console.log("Web Socket CONNECTED " + socket.connected)
        console.log(socket.id)
    })

    socket.on("disconnect", () => {
        console.log(socket.connected); // false
    });
    storageService.getItem('userData').then((userData) => {
      setUserData(userData)
      socket.on('chat', (message: any) => {
        console.log(message)
        setText('')
        chat.messages.push(message)
        setChat({messages: chat.messages})
      })
    })
  }, [])
  const sendMessage = () => {
    const message = {content: text, sentBy: userData.name, date: new Date()}
    chat.messages.push(message)
    socket.emit('chat', message)
  }
  socket.on('chat', (response) => {
      chat.messages.push(response)
      setChat({messages: chat.messages})
      setText('')
  })
  return (
    <Fragment>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {
        chat.messages.length > 0 ?
          chat.messages.map((m: any, index: number) => (
            <Balloon key={index} message={m} currentUser={userData.name} />
          )): 
          <Text style={{alignSelf: 'center', color: '#848484'}}>
            Sem mensagens no momento
          </Text>
        }
      </ScrollView>

      <View>
        <FlatList
          data={chat.messages}
          renderItem={({ item }) =>
            <Balloon message={item} currentUser={userData.name}></Balloon>}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={()=> <Text style={{alignSelf: 'center', color: '#848484'}}>
            Sem mensagens no momento
          </Text>}/>
      </View>

      <SafeAreaView>
          <View style={styles.messageTextInputContainer}>
            <TextInput
              style={styles.messageTextInput}
              placeholder="Digite sua mensagem..."
              placeholderTextColor={Colors.light}
              value={text}
              multiline
              onChangeText={(message) => setText(message)}
            />
            <TouchableOpacity
              style={styles.sendButton}
              disabled={!text}
              onPress={() => sendMessage()}>
              <MaterialCommunityIcons name="send-circle-outline" size={20} color="grey" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    </Fragment>
  );
};
export default Chat