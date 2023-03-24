import {ActivityIndicator, Modal, View} from 'react-native';
export default function ModalLoading({open}) {
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 16,
          gap: 24,
        }}>
        <ActivityIndicator
          animating={true}
          color={'rgb(255, 255, 255)'}
          hidesWhenStopped={true}
          size={'large'}
        />
      </View>
    </Modal>
  );
}
