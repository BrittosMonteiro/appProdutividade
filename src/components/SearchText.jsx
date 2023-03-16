import {TextInput, View} from 'react-native';
import {MagnifyingGlass} from 'phosphor-react-native';

export default function SearchText({filterText}) {
  return (
    <View style={{paddingHorizontal: 16}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#1e1e1e',
          padding: 8,
          borderRadius: 4,
          gap: 8,
        }}>
        <MagnifyingGlass weight="bold" color="#fff" />
        <TextInput
          style={{
            flex: 1,
            fontFamily: 'IBMPlexSansCondensed-Medium',
            color: '#fff',
            fontSize: 18,
            padding: 0,
          }}
          placeholder={'Pesquisar'}
          keyboardType={'default'}
          defaultValue={''}
          onChangeText={text => {
            filterText(text);
          }}
        />
      </View>
    </View>
  );
}
