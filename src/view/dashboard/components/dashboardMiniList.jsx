import * as React from 'react';
import {View} from 'react-native';

import Title from '../../../components/Title';
import HorizontalRule from '../../../components/HorizontalRule';
import DashboardMiniListItem from './dashboardMiniListItem';

export default function DashboardMiniList({navigation}) {
  const lists = [
    {
      done: '4',
      items: [
        {
          title: 'Pão integral Wickbold',
          status: true,
        },
        {
          title: 'Wrap',
          status: true,
        },
        {
          title: 'Geléia de morango',
          status: true,
        },
        {
          title: 'Suco de Uva - Campo largo',
          status: true,
        },
      ],
      pending: '0',
      priority: 0,
      title: 'Supermercado',
      description: 'Brasil Atacadista',
    },
    {
      done: '2',
      items: [
        {
          title: 'Ovos',
          status: true,
        },
        {
          title: 'Açucar mascavo',
          status: true,
        },
      ],
      pending: '0',
      priority: 1,
      title: 'Receita bolo de banana',
    },
    {
      done: '2',
      items: [
        {
          title: 'Hospedagens em Berlin',
          status: true,
        },
        {
          title: 'Hospedagens em München',
          status: false,
        },
        {
          title: 'Hospedagens em Stuttgart',
          status: false,
        },
        {
          title: 'Passeios em Berlin',
          status: true,
        },
        {
          title: 'Passeios em München',
          status: false,
        },
      ],
      pending: '3',
      priority: 2,
      title: 'Viagem Alemanha',
      description: '15/Out - 02/Nov',
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
        {lists.map((item, index) => (
          <React.Fragment key={index}>
            <DashboardMiniListItem navigation={navigation} item={item} />
            {index < lists.length - 1 && <HorizontalRule />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
