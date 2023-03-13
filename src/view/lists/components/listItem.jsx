import {Pressable, Text, View} from 'react-native';
import {Check, CheckCircle, RadioButton} from 'phosphor-react-native';

export default function ListItem({navigation, item}) {
  const priority = ['39, 174, 96', '255, 122, 0', '235, 87, 87'];

  return (
    <Pressable
      onPress={() => navigation.navigate('ListItemView', {idList: item.id})}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 4,
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
        <RadioButton color={`rgb(${priority[item.priority]})`} weight="fill" />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        {item.items.length > 0 && item.items.every(e => e.status === true) ? (
          <View style={{display: 'flex', flexDirection: 'row', gap: 4}}>
            <CheckCircle size={18} weight="fill" color="green" />
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 14,
                fontFamily: 'IBMPlexSansCondensed-Regular',
              }}>
              100% concluído
            </Text>
          </View>
        ) : (
          <>
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
          </>
        )}
      </View>
    </Pressable>
  );
}
