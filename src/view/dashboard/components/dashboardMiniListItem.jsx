import {Pressable, Text, View} from 'react-native';
import {BookmarkSimple} from 'phosphor-react-native';

export default function DashboardMiniListItem({item, navigation}) {
  const priority = ['39, 174, 96', '255, 122, 0', '235, 87, 87'];

  return (
    <Pressable
      onPress={() => navigation.navigate('ListItemView', {idList: item.id})}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            color: '#1e1e1e',
            fontSize: 18,
            fontFamily: 'IBMPlexSansCondensed-Medium',
          }}>
          {item.title}
        </Text>
        <BookmarkSimple color={`rgb(${priority[item.priority]})`} weight="fill" />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            color: '#1e1e1e',
            fontSize: 14,
            fontFamily: 'IBMPlexSansCondensed-Regular',
          }}>
          {item.items.filter(e => e.status === true).length} concluídos
        </Text>
        <Text
          style={{
            color: '#1e1e1e',
            fontSize: 14,
            fontFamily: 'IBMPlexSansCondensed-Regular',
          }}>
          {item.items.filter(e => e.status === false).length} pendentes
        </Text>
      </View>
    </Pressable>
  );
}
