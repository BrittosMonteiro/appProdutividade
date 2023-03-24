import {useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import {BookmarkSimple, XCircle} from 'phosphor-react-native';

import {createListService} from '../../../service/listsService';

export default function ModalCreateList({open, onClose, userSession, refresh}) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(null);

  const priorityLevel = [
    {
      title: 'Baixa',
      color: '39, 174, 96',
    },
    {
      title: 'Média',
      color: '255, 122, 0',
    },
    {
      title: 'Alta',
      color: '235, 87, 87',
    },
  ];

  async function createList() {
    const list = {
      title,
      priority,
      idUser: userSession.id,
    };

    await createListService(list)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          setTitle('');
          setPriority(null);
          onClose();
          refresh();
        }
      })
      .catch(() => {});
  }

  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#e0e0e0',
            width: '100%',
            maxWidth: 400,
            padding: 16,
            borderRadius: 4,
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
                fontFamily: 'IBMPlexSansCondensed-SemiBold',
                fontSize: 20,
                color: '#1e1e1e',
              }}>
              NOVA LISTA
            </Text>
            <Pressable onPress={() => onClose()}>
              <XCircle weight="fill" color="rgb(235, 87, 87)" size={28} />
            </Pressable>
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#1e1e1e',
              }}>
              Título
            </Text>
            <TextInput
              style={{
                backgroundColor: '#fff',
                borderRadius: 4,
                padding: 8,
                width: '100%',
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#1e1e1e',
                fontSize: 18,
              }}
              placeholder={'Título da sua tarefa'}
              placeholderTextColor={'#5e5e5e'}
              keyboardType={'default'}
              defaultValue={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#1e1e1e',
              }}>
              Prioridade
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 8,
              }}>
              {priorityLevel.map((item, index) => (
                <Pressable
                  onPress={() => setPriority(index)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                  }}
                  key={index}>
                  {priority === index ? (
                    <BookmarkSimple
                      weight="fill"
                      size={28}
                      style={{margin: 0, padding: 0, backgroundColor: ''}}
                      color={`rgb(${item.color})`}
                    />
                  ) : (
                    <BookmarkSimple
                      weight="bold"
                      size={28}
                      style={{margin: 0, padding: 0, backgroundColor: ''}}
                      color={'#1e1e1e'}
                    />
                  )}
                  <Text
                    style={{
                      color: '#1e1e1e',
                      fontFamily: 'IBMPlexSansCondensed-Medium',
                      fontSize: 18,
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable
            onPress={() => createList()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingVertical: 8,
              backgroundColor: 'rgb(39, 174, 96)',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#fff',
                fontSize: 18,
              }}>
              CRIAR
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
