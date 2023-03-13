import {CaretRight} from 'phosphor-react-native';
import {Pressable, Text, View} from 'react-native';

export default function DashboardMiniRoutineListItem({navigation, item}) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('RoutineItemView', {idActivity: item.id})
      }
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#1e1e1e',
          fontSize: 18,
          fontFamily: 'IBMPlexSansCondensed-Medium',
        }}>
        {item.title}
      </Text>
      <CaretRight weight="bold" size={24} color={'#1e1e1e'} />
    </Pressable>
  );
}
