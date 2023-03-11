import {CaretRight} from 'phosphor-react-native';
import * as React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
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
          gap: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}>
          <Pressable
            onPress={() => navigation.navigate('RoutineItemView', {item: null})}
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
              ADICIONAR ATIVIDADE
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
