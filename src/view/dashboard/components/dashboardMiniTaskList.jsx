import * as React from 'react';
import {ScrollView, View} from 'react-native';
import EmptyMessage from '../../../components/EmptyMessage';

import Title from '../../../components/Title';
import {readTaskMiniListService} from '../../../service/taskService';
import DashboardMiniTaskListItem from './dashboardMiniTaskListItem';

export default function DashboardMiniTaskList({navigation}) {
  const [items, setItems] = React.useState([]);

  async function loadTasks() {
    idUser = '640dde39e1c25aac9c6a60af';
    await readTaskMiniListService(idUser)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setItems(response.data);
      })
      .catch(err => {});
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
          <EmptyMessage message={'VOCÊ NÃO TEM TAREFAS'} />
        )}
      </ScrollView>
    </View>
  );
}
