import * as React from 'react';
import {Pressable, Text, View} from 'react-native';

import {CaretLeft, List, User} from 'phosphor-react-native';

export default function Header({navigation, title}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        borderRadius: 4,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <CaretLeft weight="bold" color="#fff" size={28} />
      </Pressable>
      <Text
        style={{
          color: '#fff',
          fontSize: 28,
          fontFamily: 'IBMPlexSansCondensed-Medium',
        }}>
        {title}
      </Text>
      <Pressable onPress={() => navigation.navigate('ProfileView')}>
        <User weight="bold" color="#fff" size={24} />
      </Pressable>
    </View>
  );
}
