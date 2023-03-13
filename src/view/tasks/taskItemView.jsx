import {Circle, RadioButton} from 'phosphor-react-native';
import * as React from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';

import Header from '../../components/Header';
import {
  createTaskService,
  deleteTaskService,
  readTaskService,
  updateTaskService,
} from '../../service/taskService';
import TemplateScreen from '../templateScreen';

export default function TaskItemView({route, navigation}) {
  const {idTask} = route.params;
  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState(0);

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

  async function createTask() {
    const task = {
      title,
      description,
      priority,
      idUser: '640dde39e1c25aac9c6a60af',
    };

    await createTaskService(task)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          goBack();
        }
      })
      .catch(err => {});
  }

  async function loadTask() {
    await readTaskService(idTask)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setId(response.data.id);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPriority(response.data.priority);
      });
  }

  async function updateTask() {
    const data = {
      idTask,
      task: {
        title,
        description,
        priority,
        updatedAt: Date.now(),
      },
    };
    await updateTaskService(data)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          goBack();
        }
      })
      .catch(err => {});
  }

  async function deleteTask() {
    if (!id) {
      return;
    }

    await deleteTaskService({idTask: id})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => {});
  }

  function goBack() {
    setTitle('');
    setDescription('');
    setPriority(null);
    setId(null);
    navigation.goBack();
  }

  React.useEffect(() => {
    loadTask();
  }, [idTask]);

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={title || 'CRIAR TAREFA'} />
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
              placeholder={'Título da sua tarefa'}
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
              Prioridade
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
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
                    <RadioButton
                      weight="fill"
                      size={28}
                      style={{margin: 0, padding: 0, backgroundColor: ''}}
                      color={`rgb(${item.color})`}
                    />
                  ) : (
                    <Circle
                      weight="bold"
                      size={28}
                      style={{margin: 0, padding: 0, backgroundColor: ''}}
                      color={'#fff'}
                    />
                  )}
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'IBMPlexSansCondensed-Medium',
                      fontSize: 18,
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
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
              placeholder={'Descrição da tarefa'}
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
                onPress={() => updateTask()}
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
                onPress={() => deleteTask()}
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
                  EXCLUIR TAREFA
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() => createTask()}
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
    </TemplateScreen>
  );
}
