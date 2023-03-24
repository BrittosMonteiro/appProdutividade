import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';

import EmptyMessage from '../../../components/EmptyMessage';
import HorizontalRule from '../../../components/HorizontalRule';
import Title from '../../../components/Title';
import {readRoutineMiniListService} from '../../../service/routineService';
import DashboardMiniRoutineListItem from './dashboardMiniRoutineListItem';

export default function DashboardMiniRoutineList({
  navigation,
  setIsLoadingMiniRoutineList,
}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadRoutines() {
    setIsLoading(true);
    setIsLoadingMiniRoutineList(true);

    await readRoutineMiniListService(userSession.id)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setItems(response.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        setIsLoadingMiniRoutineList(false);
      });
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
              <React.Fragment key={index}>
                <DashboardMiniRoutineListItem
                  item={item}
                  navigation={navigation}
                />
                {index < items.length - 1 && <HorizontalRule />}
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {isLoading ? (
              <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
                {/* <ActivityIndicator color={'#1e1e1e'} size={'small'} /> */}
                <EmptyMessage message={'BUSCANDO ATIVIDADES'} />
              </View>
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
          </>
        )}
      </View>
    </View>
  );
}
