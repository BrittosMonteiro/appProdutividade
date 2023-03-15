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

export default function TasksView({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [itemsList, setItemsList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadTasks() {
    setIsLoading(true);
    await readTaskListService(userSession.id)
      .then(responseRead => {
        if (responseRead) {
          return responseRead.json();
        }
      })
      .then(response => {
        setItemsList(response.data);
      })
      .catch(err => {})
      .finally(() => {
        setIsLoading(false);
      });
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
          paddingVertical: 16,
          gap: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}>
          <Pressable
            onPress={() => navigation.navigate('TaskItemView', {item: null})}
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 8,
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
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingHorizontal: 16,
          }}>
          {itemsList.length > 0 ? (
            <>
              {itemsList.map((item, index) => (
                <TasksListItem
                  item={item}
                  navigation={navigation}
                  key={index}
                />
              ))}
            </>
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
