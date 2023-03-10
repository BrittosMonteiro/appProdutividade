import {Text} from 'react-native';

import Header from '../../components/Header';
import TemplateScreen from '../templateScreen';

export default function SettingsView({navigation}) {
  return (
    <TemplateScreen>
      <Header navigation={navigation} />
      <Text>Configurações</Text>
    </TemplateScreen>
  );
}
