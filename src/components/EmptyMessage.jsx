import * as React from 'react';
import {Text, View} from 'react-native';

export default function EmptyMessage({message}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: '#1e1e1e',
          fontFamily: 'IBMPlexSansCondensed-SemiBold',
          fontSize: 18,
        }}>
        {/* VOCÊ NÃO TEM TAREFAS :) */}
        {message}
      </Text>
    </View>
  );
}
