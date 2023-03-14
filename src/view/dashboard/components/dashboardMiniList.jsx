import * as React from 'react';
import {View} from 'react-native';
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

  async function loadLists() {
    await readMiniListService(userSession.id)
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
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <EmptyMessage message={'VOCÊ NÃO TEM LISTAS'} />
        </View>
      )}
    </View>
  );
}
