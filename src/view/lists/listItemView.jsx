import * as React from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {
  CheckSquare,
  BookmarkSimple,
  Plus,
  Square,
  Trash,
} from 'phosphor-react-native';

import TemplateScreen from '../templateScreen';
import Header from '../../components/Header';
import HorizontalRule from '../../components/HorizontalRule';
import ManageItemFromCheckList from './components/manageItemFromCheckList';
import ModalLoading from '../../components/ModalLoading';

import {
  deleteListService,
  readItemListService,
  updateListService,
} from '../../service/listsService';

export default function ListItemView({route, navigation}) {
  const {idList} = route.params;
  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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

  async function loadList() {
    setIsLoading(true);
    await readItemListService(idList)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setId(response.data.id);
        setTitle(response.data.title);
        setPriority(response.data.priority);
        setItems(response.data.items);
        setDescription(response.data.description);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function updateList(refresh) {
    setIsLoading(true);
    const list = {
      idList,
      list: {
        title,
        description,
        item: items,
        priority,
        updatedAt: Date.now(),
      },
    };

    await updateListService(list)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          if (refresh) {
            loadList();
          } else {
            goBack();
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function deleteList() {
    setIsLoading(true);
    if (!idList || !id) {
      setIsLoading(false);
      return;
    }

    await deleteListService({idList})
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

  function goBack() {
    setTitle('');
    setDescription('');
    setId(null);
    setPriority(null);
    setItems([]);
    navigation.goBack();
  }

  function changeItemStatus(index) {
    const itemToChange = items[index];
    itemToChange.status = !itemToChange.status;
    items[index] = itemToChange;
    setItems(items);
    updateList(true);
  }

  function closeModal() {
    setOpenModal(false);
  }

  function addItem(newItem) {
    items.push(newItem);
    setItems(items);
    updateList(true);
  }

  function removeItemFromCheckList(index) {
    let newArray = items;
    newArray.splice(index, 1);
    setItems(newArray);
    updateList(true);
  }

  React.useEffect(() => {
    loadList();
  }, [idList]);

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={title || 'CRIAR LISTA'} />
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
            gap: 24,
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

          <HorizontalRule />

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

          <HorizontalRule />

          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Regular',
                  color: '#fff',
                }}>
                Itens
              </Text>
              <ManageItemFromCheckList
                open={openModal}
                onClose={closeModal}
                addItem={addItem}
              />
              <Pressable
                onPress={() => setOpenModal(true)}
                style={{
                  backgroundColor: `rgb(${priorityLevel[priority]?.color})`,
                  padding: 4,
                  borderRadius: 50,
                }}>
                <Plus weight="bold" color="#fff" size={20} />
              </Pressable>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
              }}>
              {items && items.length > 0 ? (
                <>
                  {items.map((item, index) => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                      }}
                      key={index}>
                      <Pressable
                        onPress={() => changeItemStatus(index)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 8,
                        }}>
                        {item.status ? (
                          <CheckSquare
                            weight="fill"
                            size={28}
                            style={{margin: 0, padding: 0, backgroundColor: ''}}
                            color={`rgb(${
                              priorityLevel[priority]?.color || '255, 255, 255'
                            })`}
                          />
                        ) : (
                          <Square
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
                      <Pressable onPress={() => removeItemFromCheckList(index)}>
                        <Trash weight={'fill'} color="rgb(235, 87, 87)" />
                      </Pressable>
                    </View>
                  ))}
                </>
              ) : (
                <Text
                  style={{
                    fontFamily: 'IBMPlexSansCondensed-Regular',
                    fontSize: 18,
                  }}>
                  NÃO HÁ ITENS NA LISTA
                </Text>
              )}
            </View>
          </View>

          <HorizontalRule />

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
          <Pressable
            onPress={() => updateList(false)}
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
            onPress={() => deleteList()}
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
              EXCLUIR LISTA
            </Text>
          </Pressable>
        </ScrollView>
      </View>
      <ModalLoading open={isLoading} />
    </TemplateScreen>
  );
}
