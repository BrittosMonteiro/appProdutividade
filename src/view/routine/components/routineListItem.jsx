import {CaretRight} from 'phosphor-react-native';
import * as React from 'react';
import {Pressable, Text, View} from 'react-native';

export default function RoutineListItem({navigation, item}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingVertical: 8,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
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
        <Pressable
          onPress={() =>
            navigation.navigate('RoutineItemView', {idActivity: item.id})
          }>
          <CaretRight color="#1e1e1e" weight="bold" size={24} />
        </Pressable>
      </View>
    </View>
  );
}
