import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import EmptyMessage from '../../components/EmptyMessage';

import Header from '../../components/Header';
import TemplateScreen from '../templateScreen';
import TasksListItem from './components/tasksListItem';

export default function TasksView({navigation}) {
  const [itemsList, setItemsList] = React.useState([]);

  const tasks = [
    {
      description: 'Enviei mensagem por Whatsapp. Aguardando retorno',
      priority: 2,
      title: 'Marcar ortopedista',
    },
    {
      description: 'Realizar pagamento R$ 88,00 no cartão',
      priority: 1,
      title: 'EspaçoLaser',
    },
    {
      description: 'Olhar no maps',
      priority: 0,
      title: 'Procurar Coworking',
    },
  ];

  React.useEffect(() => {
    setItemsList(tasks);
  }, []);

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={'TAREFAS'} />
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
                <TasksListItem
                  item={item}
                  navigation={navigation}
                  key={index}
                />
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
