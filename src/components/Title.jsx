import {CaretRight} from 'phosphor-react-native';
import {Pressable, Text, View} from 'react-native';

export default function Title({navigation, goTo, title}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: '#1e1e1e',
          fontFamily: 'IBMPlexSansCondensed-Medium',
        }}>
        {title}
      </Text>
      <Pressable
        style={{
          display: 'flex',
          backgroundColor: '#108FD8',
          borderRadius: 4,
          padding: 4,
        }}
        onPress={() => navigation.navigate(goTo)}>
        <CaretRight color="#fff" weight="bold" />
      </Pressable>
    </View>
  );
}
