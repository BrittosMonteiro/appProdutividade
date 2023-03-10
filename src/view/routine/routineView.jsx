import * as React from 'react';
import {ScrollView, View} from 'react-native';
import EmptyMessage from '../../components/EmptyMessage';

import Header from '../../components/Header';
import TemplateScreen from '../templateScreen';
import RoutineListItem from './components/routineListItem';

export default function RoutineView({navigation}) {
  const [itemsList, setItemsList] = React.useState([]);

  const tasks = [
    {
      title: 'Beber 2L de água',
    },
    {
      title: 'Fazer limpeza de pele',
    },
    {
      title: 'Seguir alimentação correta',
    },
  ];

  React.useEffect(() => {
    setItemsList(tasks);
  }, []);

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={'ROTINEIRAS'} />
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
                <RoutineListItem
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
