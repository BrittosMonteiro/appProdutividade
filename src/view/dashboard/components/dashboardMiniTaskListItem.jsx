import {Pressable, Text, View} from 'react-native';

export default function DashboardMiniTaskListItem({item, navigation}) {
  const priority = ['39, 174, 96', '255, 122, 0', '235, 87, 87'];

  return (
    <Pressable
      onPress={() => navigation.navigate('TaskItemView', {idTask: item.id})}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 250,
      }}>
      <View
        style={{
          padding: 8,
          backgroundColor: `rgba(${priority[item.priority]}, 0.75)`,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 4,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#fff',
            fontFamily: 'IBMPlexSansCondensed-Regular',
          }}>
          {item.title}
        </Text>
      </View>
      <View
        style={{
          padding: 8,
          backgroundColor: `rgba(${priority[item.priority]}, 1)`,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 8,
          minHeight: 60,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            fontFamily: 'IBMPlexSansCondensed-Regular',
          }}
          numberOfLines={2}>
          {item.description ? item.description : 'Sem descrição'}
        </Text>
      </View>
    </Pressable>
  );
}
