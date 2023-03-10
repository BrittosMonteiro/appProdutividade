import * as React from 'react';
import {View} from 'react-native';

import Title from '../../../components/Title';
import HorizontalRule from '../../../components/HorizontalRule';
import DashboardMiniListItem from './dashboardMiniListItem';

export default function DashboardMiniList({navigation}) {
  const list = [
    {
      done: '4',
      pending: '0',
      priority: 1,
      title: 'Supermercado',
    },
    {
      done: '5',
      pending: '2',
      priority: 2,
      title: 'Receita bolo de banana',
    },
    {
      done: '5',
      pending: '9',
      priority: 3,
      title: 'Viagem Alemanha',
    },
  ];

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
        {list.map((item, index) => (
          <React.Fragment key={index}>
            <DashboardMiniListItem navigation={navigation} item={item} />
            {index < list.length - 1 && <HorizontalRule />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
