import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {CaretRight} from 'phosphor-react-native';
import {useSelector} from 'react-redux';

import EmptyMessage from '../../components/EmptyMessage';
import Header from '../../components/Header';
import {readTaskListService} from '../../service/taskService';
import TemplateScreen from '../templateScreen';
import TasksListItem from './components/tasksListItem';
import Tabs from '../../components/Tabs';
import HorizontalRule from '../../components/HorizontalRule';

export default function TasksView({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [originalList, setOriginalList] = React.useState([]);
  const [itemsList, setItemsList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);

  async function loadTasks() {
    setIsLoading(true);
    await readTaskListService(userSession.id)
      .then(responseRead => {
        if (responseRead) {
          return responseRead.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
        setItemsList(response.data);
      })
      .catch(err => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  function changeTab(index) {
    setCurrentTab(index);
    filterItems(index);
  }

  function filterItems(index) {
    let newList = [];

    switch (index) {
      case 1:
        newList = originalList.filter(e => e.status === false);
        break;
      case 2:
        newList = originalList.filter(e => e.status === true);
        break;
      default:
        newList = originalList;
        break;
    }

    setItemsList(newList);
  }

  React.useEffect(() => {
    loadTasks();
  }, []);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadTasks();
    });
  }, [navigation]);

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={'TAREFAS'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#E0E0E0',
          height: '100%',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
          gap: 16,
        }}>
        {originalList.length > 0 && (
          <Tabs changeTab={changeTab} selected={currentTab} />
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Pressable
            onPress={() => navigation.navigate('TaskItemView', {item: null})}
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: '#108FD8',
              borderRadius: 4,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'IBMPlexSansCondensed-Medium',
                fontSize: 16,
              }}>
              ADICIONAR TAREFA
            </Text>
            <CaretRight weight="bold" size={24} color={'#fff'} />
          </Pressable>
        </View>
        <ScrollView>
          {itemsList.length > 0 ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                borderRadius: 4,
                gap: 8,
                padding: 12,
              }}>
              {itemsList.map((item, index) => (
                <React.Fragment key={index}>
                  <TasksListItem
                    item={item}
                    navigation={navigation}
                    refresh={loadTasks}
                  />
                  {index < itemsList.length - 1 && <HorizontalRule />}
                </React.Fragment>
              ))}
            </View>
          ) : (
            <>
              {isLoading ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator color={'#1e1e1e'} size={'small'} />
                  <EmptyMessage message={'BUSCANDO TAREFAS'} />
                </View>
              ) : (
                <EmptyMessage message={'VOCÊ NÃO TEM TAREFAS'} />
              )}
            </>
          )}
        </ScrollView>
      </View>
    </TemplateScreen>
  );
}
