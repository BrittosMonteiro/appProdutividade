import {View} from 'react-native';

import Title from '../../../components/Title';
import DashboardMiniRoutineListItem from './dashboardMiniRoutineListItem';

export default function DashboardMiniRoutineList({navigation}) {
  const routineItems = [
    {
      title: 'Beber 2L água',
    },
    {
      title: 'Fazer limpeza de pele',
    },
    {
      title: 'Seguir alimentação correta',
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
        goTo={'RoutineView'}
        navigation={navigation}
        title={'ATIVIDADES ROTINEIRAS'}
      />
      <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {routineItems.map((item, index) => (
          <DashboardMiniRoutineListItem
            item={item}
            key={index}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
}
