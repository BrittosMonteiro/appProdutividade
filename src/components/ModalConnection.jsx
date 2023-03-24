import * as React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

export default function ModalConnection({open, refreshConnection}) {
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#e0e0e0',
          padding: 16,
          gap: 24,
        }}>
        <Text
          style={{
            color: '#1e1e1e',
            fontSize: 28,
            fontFamily: 'IBMPlexSansCondensed-SemiBold',
          }}>
          VOCÊ ESTÁ SEM CONEXÃO :/
        </Text>
        <Pressable
          onPress={() => refreshConnection()}
          style={{padding: 8, backgroundColor: '#1e1e1e', borderRadius: 4}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'IBMPlexSansCondensed-SemiBold',
            }}>
            VERIFICAR CONEXÃO
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
