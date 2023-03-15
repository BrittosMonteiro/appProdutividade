import {Pressable, Text, View} from 'react-native';
import {
  CheckCircle,
  CheckSquare,
  RadioButton,
  Square,
} from 'phosphor-react-native';

import {updateListStatusService} from '../../../service/listsService';

export default function ListItem({navigation, item, refresh}) {
  const priority = ['39, 174, 96', '255, 122, 0', '235, 87, 87'];

  async function changeListStatus() {
    const updateStatus = {
      idList: item.id,
      status: !item.status,
    };
    await updateListStatusService(updateStatus)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          refresh();
        }
      })
      .catch(err => {});
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          alignItems: 'flex-start',
        }}>
        <Pressable onPress={() => changeListStatus()}>
          {item.status ? (
            <CheckSquare
              color={`rgb(${priority[item.priority]})`}
              weight="fill"
            />
          ) : (
            <Square />
          )}
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('ListItemView', {idList: item.id})}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
          <Text
            style={{
              color: '#1e1e1e',
              fontSize: 18,
              fontFamily: 'IBMPlexSansCondensed-Medium',
            }}>
            {item.title}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {item.items.length > 0 &&
            item.items.every(e => e.status === true) ? (
              <>
                <CheckCircle size={18} weight="fill" color="green" />
                <Text
                  style={{
                    color: '#1e1e1e',
                    fontSize: 14,
                    fontFamily: 'IBMPlexSansCondensed-Regular',
                  }}>
                  100% concluído
                </Text>
              </>
            ) : (
              <Text
                style={{
                  color: '#4e4e4e',
                  fontSize: 14,
                  fontFamily: 'IBMPlexSansCondensed-Medium',
                }}>
                {item.items.length >= 0 && item.items.length <= 1
                  ? `${item.items.length} item`
                  : `${item.items.length} itens`}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
      <RadioButton color={`rgb(${priority[item.priority]})`} weight="fill" />
    </View>
  );
}
