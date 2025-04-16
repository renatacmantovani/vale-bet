import React, { Fragment, useEffect, useRef, useState } from 'react';
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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from 'expo-router';

type Message = {
  text: string;
  sentBy: string;
  date: string;
};

const Chat = () => {
  const params = useLocalSearchParams();
  const [userLogged] = useState<string>(params.userLogged as string);
  const [chat, setChat] = useState<{ messages: Message[] }>({ messages: [] });
  const [text, setText] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ipDoServidor = '192.168.18.16'; // coloque o IP local correto aqui
    ws.current = new WebSocket(`ws://${ipDoServidor}:3000`);

    ws.current.onopen = () => {
      console.log('Cliente conectado ao socket com sucesso');
    };

    ws.current.onmessage = ({ data }) => {
      try {
        const msg = JSON.parse(data);
        setChat(prev => ({ messages: [...prev.messages, msg] }));
      } catch (e) {
        console.warn('Mensagem recebida não era JSON:', data);
      }
    };

    ws.current.onclose = () => {
      console.log('Conexão com WebSocket encerrada');
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const jsonString = JSON.stringify({
        text: text,
        sentBy: userLogged,
        date: new Date()
      });
      ws.current.send(jsonString);
      setChat(prev => ({
        messages: [...prev.messages, { text, sentBy: userLogged, date: new Date().toISOString() }]
      }));
      setText('');
    } else {
      console.warn('WebSocket não está conectado.');
    }
  };

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
          ><MaterialCommunityIcons name="send-circle-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Chat;
