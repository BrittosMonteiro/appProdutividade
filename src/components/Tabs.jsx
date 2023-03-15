import * as React from 'react';
import {Pressable, Text, View} from 'react-native';

export default function Tabs({changeTab, selected}) {
  const tabs = [
    {
      title: 'TODAS',
    },
    {
      title: 'PENDENTES',
    },
    {
      title: 'CONCLUÍDAS',
    },
  ];

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#111637',
        borderRadius: 16,
        padding: 4,
      }}>
      {tabs.map((tab, index) => (
        <Pressable
          onPress={() => changeTab(index)}
          key={index}
          style={[
            index === selected && {backgroundColor: '#fff'},
            {
              flex: 1,
              padding: 8,
              justifyContent: 'center',
              borderRadius: 12,
            },
          ]}>
          <Text
            style={[
              index === selected
                ? {
                    color: '#111637',
                    fontFamily: 'IBMPlexSansCondensed-SemiBold',
                  }
                : {fontFamily: 'IBMPlexSansCondensed-Regular'},
              {
                fontSize: 18,
                textAlign: 'center',
              },
            ]}>
            {tab.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
