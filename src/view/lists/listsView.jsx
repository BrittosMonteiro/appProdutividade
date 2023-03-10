import * as React from 'react';
import {ScrollView, View} from 'react-native';

import Header from '../../components/Header';
import TemplateScreen from '../templateScreen';
import ListItem from './components/listItem';
import EmptyMessage from '../../components/EmptyMessage';

export default function ListsView({navigation}) {
  const [itemsList, setItemsList] = React.useState([]);

  const tasks = [
    {
      done: '4',
      pending: '0',
      priority: 0,
      title: 'Supermercado',
    },
    {
      done: '5',
      pending: '2',
      priority: 1,
      title: 'Receita bolo de banana',
    },
    {
      done: '5',
      pending: '9',
      priority: 2,
      title: 'Viagem Alemanha',
    },
  ];

  React.useEffect(() => {
    setItemsList(tasks);
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
        }}>
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
            <EmptyMessage message={'VOCÊ NÃO TEM TAREFAS'} />
          )}
        </ScrollView>
      </View>
    </TemplateScreen>
  );
}
