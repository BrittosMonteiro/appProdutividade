import {ScrollView, View} from 'react-native';

import Header from '../../components/Header';
import TemplateScreen from '../templateScreen';

export default function ProfileView({navigation}) {
  return (
    <TemplateScreen>
      <Header navigation={navigation} title={'PERFIL'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#E0E0E0',
          height: '100%',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          paddingVertical: 16,
        }}>
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            paddingHorizontal: 16,
          }}></ScrollView>
      </View>
    </TemplateScreen>
  );
}
