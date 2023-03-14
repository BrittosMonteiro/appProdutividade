import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

import TemplateScreen from '../templateScreen';
import HorizontalRule from '../../components/HorizontalRule';
import DashboardMiniList from './components/dashboardMiniList';
import DashboardMiniTaskList from './components/dashboardMiniTaskList';
import DashboardMiniRoutineList from './components/dashboardMiniRoutineList';
import DashboardHeader from './components/dashboardHeader';
import ModalConnection from '../../components/ModalConnection';

export default function DashboardView({navigation}) {
  const [openModalConnection, setOpenModalConnection] = React.useState(false);
  const netInfo = useNetInfo();

  function checkInternetConnection() {
    if (netInfo.isConnected) {
      setOpenModalConnection(false);
    } else {
      setOpenModalConnection(true);
    }
  }

  return (
    <TemplateScreen>
      <DashboardHeader navigation={navigation} />
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
          }}>
          <DashboardMiniTaskList navigation={navigation} />
          <HorizontalRule />
          <DashboardMiniList navigation={navigation} />
          <HorizontalRule />
          <DashboardMiniRoutineList navigation={navigation} />
        </ScrollView>
        <ModalConnection
          open={openModalConnection}
          refreshConnection={checkInternetConnection}
        />
      </View>
    </TemplateScreen>
  );
}
