import React, { Fragment, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import styles from './ChatStyle';
import Balloon from './Baloon';
import storageService from '../services/storageService';
import { io } from "socket.io-client";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PORT = '3000';
const SERVER_URL = `http://10.5.6.138:${PORT}`;
const socket = io(SERVER_URL);

class message {
  text: string;
  sentBy: string;
  date: Date;

  constructor(text: string, sentBy: string) {
    this.text = text;
    this.sentBy = sentBy;
    this.date = new Date();
  }
}

const Chat = () => {
  const [userLogged, setUserLogged] = useState('usuário');
  const [chat, setChat] = useState<{ messages: message[] }>({ messages: [] });
  const [text, setText] = useState('');

  const sendMessage = () => {
    chat.messages.push({text: text, sentBy: userLogged, date: new Date()});
    setChat({ messages: [...chat.messages] });
    setText('');
  };

/*  useEffect(() => {
    socket.on('connect', () => {
      console.log("Web Socket CONNECTED " + socket.connected);
    });

    socket.on('disconnect', () => {
      console.log("Web Socket DISCONNECTED");
    });

    storageService.getItem('userData').then((data) => {
      if (data) {
        setUserLogged(data.name);

        socket.on('chat', (message: Message) => {
          setChat(prev => ({ messages: [...prev.messages, message] }));
        });
      } else {
        console.warn("userData retornou null");
      }
    });
  }, []);*/

  return (
    <Fragment>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={chat.messages}
          renderItem={({ item }) => (
            <Balloon message={item} currentUser={userLogged} />
          )}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text style={{ alignSelf: 'center', color: '#848484', marginTop: 20 }}>
              Sem mensagens no momento
            </Text>
          )}
        />
      </View>

      <SafeAreaView>
        <View style={styles.messageTextInputContainer}>
          <TextInput
            style={styles.messageTextInput}
            placeholder="Digite sua mensagem"
            placeholderTextColor="#999"
            value={text}
            multiline
            onChangeText={setText}
          />
          <TouchableOpacity
            style={styles.sendButton}
            disabled={!text}
            onPress={sendMessage}
          >
            <MaterialCommunityIcons name="send-circle-outline" size={20} color="grey" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Chat;
