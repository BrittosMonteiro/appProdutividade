import {Pressable, Text, View} from 'react-native';
import {Square} from 'phosphor-react-native';

export default function DashboardMiniRoutineListItem({navigation, item}) {
  return (
    <View
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        }}>
        <Square weight="bold" color="#1e1e1e" />
        <Text
          style={{
            color: '#1e1e1e',
            fontSize: 18,
            fontFamily: 'IBMPlexSansCondensed-Regular',
          }}>
          {item.title}
        </Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate('RoutineView')}
        style={{
          paddingVertical: 4,
          paddingHorizontal: 8,
        }}>
        <Text
          style={{
            color: '#108FD8',
            fontSize: 16,
            fontFamily: 'IBMPlexSansCondensed-Medium',
          }}>
          Ver
        </Text>
      </Pressable>
    </View>
  );
}
