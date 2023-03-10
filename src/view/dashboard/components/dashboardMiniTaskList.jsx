import {ScrollView, View} from 'react-native';

import Title from '../../../components/Title';
import DashboardMiniTaskListItem from './dashboardMiniTaskListItem';

export default function DashboardMiniTaskList({navigation}) {
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
        {tasks.map((item, index) => (
          <DashboardMiniTaskListItem
            item={item}
            key={index}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}
