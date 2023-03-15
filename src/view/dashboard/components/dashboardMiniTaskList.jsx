import * as React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

import EmptyMessage from '../../../components/EmptyMessage';
import Title from '../../../components/Title';
import {readTaskMiniListService} from '../../../service/taskService';
import DashboardMiniTaskListItem from './dashboardMiniTaskListItem';

export default function DashboardMiniTaskList({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadTasks() {
    setIsLoading(true);
    await readTaskMiniListService(userSession.id)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setItems(response.data);
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
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
      <Title
        goTo={'TasksView'}
        navigation={navigation}
        title={'MINHAS TAREFAS'}
      />
      <ScrollView
        horizontal={true}
        alwaysBounceHorizontal={true}
        contentContainerStyle={{
          gap: 8,
          padding: 4,
        }}>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <DashboardMiniTaskListItem
                item={item}
                key={index}
                navigation={navigation}
              />
            ))}
          </>
        ) : (
          <>
            {isLoading ? (
              <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
                <ActivityIndicator color={'#1e1e1e'} size={'small'} />
                <EmptyMessage message={'BUSCANDO TAREFAS'} />
              </View>
            ) : (
              <EmptyMessage message={'VOCÊ NÃO TEM TAREFAS PENDENTES'} />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
