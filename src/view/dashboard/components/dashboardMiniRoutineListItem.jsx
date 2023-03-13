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
        gap: 8,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 4,
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
    </Pressable>
  );
}
