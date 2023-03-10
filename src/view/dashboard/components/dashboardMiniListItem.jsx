import {Pressable, Text, View} from 'react-native';
import {BookmarkSimple} from 'phosphor-react-native';

export default function DashboardMiniListItem({item, navigation}) {
  return (
    <Pressable
      onPress={() => navigation.navigate('ListsView')}
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
        {item.priority === 1 && (
          <BookmarkSimple color="#EB5757" weight="fill" />
        )}
        {item.priority === 2 && (
          <BookmarkSimple color="#FF7A00" weight="fill" />
        )}
        {item.priority === 3 && (
          <BookmarkSimple color="#27AE60" weight="fill" />
        )}
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
          {item.done} concluídos
        </Text>
        <Text
          style={{
            color: '#1e1e1e',
            fontSize: 14,
            fontFamily: 'IBMPlexSansCondensed-Regular',
          }}>
          {item.pending} pendentes
        </Text>
      </View>
    </Pressable>
  );
}
