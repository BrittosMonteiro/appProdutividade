import * as React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import Header from '../../components/Header';
import TemplateScreen from '../templateScreen';
import ListItem from './components/listItem';
import EmptyMessage from '../../components/EmptyMessage';
import {CaretRight} from 'phosphor-react-native';

export default function ListsView({navigation}) {
  const [itemsList, setItemsList] = React.useState([]);

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

  React.useEffect(() => {
    setItemsList(lists);
  }, []);

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={'LISTAS'} />
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
            onPress={() => navigation.navigate('ListItemView', {item: null})}
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
              ADICIONAR LISTA
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
                <ListItem item={item} navigation={navigation} key={index} />
              ))}
            </>
          ) : (
            <EmptyMessage message={'VOCÊ NÃO TEM LISTAS'} />
          )}
        </ScrollView>
      </View>
    </TemplateScreen>
  );
}
