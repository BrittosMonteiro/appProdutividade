import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function TemplateScreen(props) {
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.view}>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#171717',
    paddingTop: 16,
    gap: 24,
    height: '100%',
  },
});
