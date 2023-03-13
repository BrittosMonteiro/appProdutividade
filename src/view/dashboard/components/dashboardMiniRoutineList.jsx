import * as React from 'react';
import {View} from 'react-native';
import EmptyMessage from '../../../components/EmptyMessage';

import Title from '../../../components/Title';
import {readRoutineMiniListService} from '../../../service/routineService';
import DashboardMiniRoutineListItem from './dashboardMiniRoutineListItem';

export default function DashboardMiniRoutineList({navigation}) {
  const [items, setItems] = React.useState([]);

  async function loadRoutines() {
    idUser = '640dde39e1c25aac9c6a60af';
    await readRoutineMiniListService(idUser)
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
    loadRoutines();
  }, []);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadRoutines();
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
        goTo={'RoutineView'}
        navigation={navigation}
        title={'ATIVIDADES ROTINEIRAS'}
      />
      <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => (
              <DashboardMiniRoutineListItem
                item={item}
                key={index}
                navigation={navigation}
              />
            ))}
          </>
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <EmptyMessage message={'VOCÊ NÃO TEM ATIVIDADES'} />
          </View>
        )}
      </View>
    </View>
  );
}
