import * as React from 'react';
import {Pressable, Text, View} from 'react-native';

import {List, User} from 'phosphor-react-native';

export default function DashboardHeader({navigation}) {
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
      <Text
        style={{
          color: '#fff',
          fontSize: 28,
          fontFamily: 'IBMPlexSansCondensed-Regular',
        }}>
        Bem-vindo,{' '}
        <Text
          style={{
            fontFamily: 'IBMPlexSansCondensed-SemiBold',
          }}>
          Lucas!
        </Text>
      </Text>
      <Pressable onPress={() => navigation.navigate('ProfileView')}>
        <User weight="bold" color="#fff" size={24} />
      </Pressable>
    </View>
  );
}
