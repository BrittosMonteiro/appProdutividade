import {XCircle} from 'phosphor-react-native';
import * as React from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';

export default function ManageItemFromCheckList({open, onClose, addItem}) {
  const [title, setTitle] = React.useState('');

  function addItemToListItem() {
    if (!title) {
      return;
    }

    addItem({status: false, title});
    onClose();
    setTitle('');
  }
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E0E0E0',
            borderRadius: 4,
            padding: 16,
            elevation: 5,
            gap: 16,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'IBMPlexSansCondensed-Medium',
                fontSize: 20,
                color: '#1e1e1e',
              }}>
              Novo item
            </Text>
            <Pressable onPress={() => onClose()}>
              <XCircle weight="fill" size={32} color={'rgb(235, 87, 87)'} />
            </Pressable>
          </View>
          <TextInput
            style={{
              backgroundColor: '#fff',
              fontFamily: 'IBMPlexSansCondensed-Medium',
              fontSize: 18,
              borderRadius: 4,
              padding: 8,
              color: '#1e1e1e',
            }}
            placeholder={'Novo item para a lista'}
            placeholderTextColor={'#a0a0a0'}
            defaultValue={title}
            onChangeText={text => setTitle(text)}
          />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Pressable
              onPress={() => addItemToListItem()}
              style={{
                backgroundColor: 'rgb(39, 174, 96)',
                padding: 8,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Medium',
                  color: '#fff',
                }}>
                Incluir
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
