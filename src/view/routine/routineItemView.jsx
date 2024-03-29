import * as React from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../../components/Header';
import ModalLoading from '../../components/ModalLoading';
import {
  createRoutineService,
  deleteRoutineService,
  readRoutineService,
  updateRoutineService,
} from '../../service/routineService';
import TemplateScreen from '../templateScreen';

export default function RoutineItemView({route, navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const {idActivity} = route.params;
  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  async function createRoutine() {
    setIsLoading(true);
    const routine = {
      title,
      description,
      idUser: userSession.id,
    };

    await createRoutineService(routine)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          goBack();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function loadRoutine() {
    setIsLoading(true);
    await readRoutineService(idActivity)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setId(response.data.id);
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function updateRoutine() {
    setIsLoading(true);
    const data = {
      idRoutine: id,
      routine: {
        title,
        description,
        updatedAt: Date.now(),
      },
    };

    await updateRoutineService(data)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          goBack();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function deleteRoutine() {
    setIsLoading(true);
    if (!idActivity || !id) {
      setIsLoading(false);
      return;
    }
    await deleteRoutineService({idRoutine: id})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          goBack();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    loadRoutine();
  }, [idActivity]);

  function goBack() {
    setTitle('');
    setDescription('');
    setId(null);
    navigation.goBack();
  }

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={title || 'CRIAR ATIVIDADE'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingVertical: 16,
        }}>
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingHorizontal: 16,
          }}>
          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'IBMPlexSansCondensed-Regular',
                color: '#fff',
              }}>
              Título
            </Text>
            <TextInput
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: 4,
                padding: 8,
                width: '100%',
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#fff',
                fontSize: 18,
              }}
              placeholder={'Título da sua atividade'}
              keyboardType={'default'}
              defaultValue={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'IBMPlexSansCondensed-Regular',
                color: '#fff',
              }}>
              Descrição
            </Text>
            <TextInput
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: 4,
                padding: 8,
                width: '100%',
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#fff',
                fontSize: 18,
              }}
              placeholder={'Descrição da atividade'}
              keyboardType={'default'}
              defaultValue={description}
              onChangeText={text => setDescription(text)}
              numberOfLines={5}
              textAlignVertical="top"
              multiline={true}
            />
          </View>

          {id ? (
            <>
              <Pressable
                onPress={() => updateRoutine()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 12,
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
                  ATUALIZAR
                </Text>
              </Pressable>
              <Pressable
                onPress={() => deleteRoutine()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 12,
                  backgroundColor: '#1e1e1e',
                  borderColor: 'rgb(235, 87, 87)',
                  borderWidth: 2,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'IBMPlexSansCondensed-Medium',
                    color: 'rgb(235, 87, 87)',
                    fontSize: 18,
                  }}>
                  EXCLUIR ATIVIDADE
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() => createRoutine()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 12,
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

              <Pressable
                onPress={() => goBack()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 12,
                  backgroundColor: '#1e1e1e',
                  borderColor: 'rgb(235, 87, 87)',
                  borderWidth: 2,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'IBMPlexSansCondensed-Medium',
                    color: 'rgb(235, 87, 87)',
                    fontSize: 18,
                  }}>
                  CANCELAR
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </View>
      <ModalLoading open={isLoading} />
    </TemplateScreen>
  );
}
