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
    <View style={{paddingHorizontal: 16}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
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
                borderRadius: 16,
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
    </View>
  );
}
