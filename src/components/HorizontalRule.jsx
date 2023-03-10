import {StyleSheet, View} from 'react-native';

export default function HorizontalRule() {
  return (
    <View
      style={{
        borderBottomColor: '#999',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}
