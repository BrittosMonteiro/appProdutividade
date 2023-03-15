import * as React from 'react';
import {CaretRight} from 'phosphor-react-native';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import TemplateScreen from '../templateScreen';
import Header from '../../components/Header';
import RoutineListItem from './components/routineListItem';
import EmptyMessage from '../../components/EmptyMessage';
import {readRoutineListService} from '../../service/routineService';
import HorizontalRule from '../../components/HorizontalRule';

export default function RoutineView({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function loadRoutines() {
    setIsLoading(true);
    await readRoutineListService(userSession.id)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setItems(response.data);
      })
      .catch(err => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    loadRoutines();
  }, []);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadRoutines();
    });
  }, [navigation]);

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
            gap: 8,
            paddingHorizontal: 16,
          }}>
          {items.length > 0 ? (
            <>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <RoutineListItem item={item} navigation={navigation} />
                  {index < items.length - 1 && <HorizontalRule />}
                </React.Fragment>
              ))}
            </>
          ) : (
            // <EmptyMessage message={'VOCÊ NÃO TEM ATIVIDADES'} />
            <>
              {isLoading ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator color={'#1e1e1e'} size={'small'} />
                  <EmptyMessage message={'BUSCANDO ATIVIDADES'} />
                </View>
              ) : (
                <EmptyMessage message={'VOCÊ NÃO TEM ATIVIDADES'} />
              )}
            </>
          )}
        </ScrollView>
      </View>
    </TemplateScreen>
  );
}
