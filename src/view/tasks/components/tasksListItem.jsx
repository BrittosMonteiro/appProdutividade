import * as React from 'react';
import {Pressable, Text, View} from 'react-native';

import {BookmarkSimple, Square} from 'phosphor-react-native';

export default function TasksListItem({navigation, item}) {
  const priority = ['39, 174, 96', '255, 122, 0', '235, 87, 87'];

  return (
    <Pressable
      onPress={() => navigation.navigate('TaskItemView', {item})}
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Square color="#1e1e1e" weight="bold" />
          <Text
            style={{
              color: '#1e1e1e',
              fontSize: 18,
              fontFamily: 'IBMPlexSansCondensed-Medium',
            }}>
            {item.title}
          </Text>
        </View>
        <BookmarkSimple
          color={`rgb(${priority[item.priority]})`}
          weight="fill"
        />
      </View>
    </Pressable>
  );
}
