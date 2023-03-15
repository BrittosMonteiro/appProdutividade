import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';

import Title from '../../../components/Title';
import HorizontalRule from '../../../components/HorizontalRule';
import DashboardMiniListItem from './dashboardMiniListItem';
import EmptyMessage from '../../../components/EmptyMessage';
import {readMiniListService} from '../../../service/listsService';

export default function DashboardMiniList({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadLists() {
    setIsLoading(true);
    await readMiniListService(userSession.id)
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
    loadLists();
  }, []);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadLists();
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
        goTo={'ListsView'}
        navigation={navigation}
        title={'MINHAS LISTAS'}
      />
      {items.length > 0 ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 16,
            borderRadius: 4,
            backgroundColor: '#fff',
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <DashboardMiniListItem navigation={navigation} item={item} />
              {index < items.length - 1 && <HorizontalRule />}
            </React.Fragment>
          ))}
        </View>
      ) : (
        <>
          {isLoading ? (
            <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
              <ActivityIndicator color={'#1e1e1e'} size={'small'} />
              <EmptyMessage message={'BUSCANDO LISTAS'} />
            </View>
          ) : (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <EmptyMessage message={'VOCÊ NÃO TEM LISTAS'} />
            </View>
          )}
        </>
      )}
    </View>
  );
}
