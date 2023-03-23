import {Modal, Pressable, Text, View} from 'react-native';
import {XCircle} from 'phosphor-react-native';

export default function ModalError({title, message, onClose, open}) {
  return (
    <Modal visible={open} transparent={true}>
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 16,
            width: '100%',
            maxWidth: 400,
            borderRadius: 4,
            gap: 16,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 20,
                fontFamily: 'IBMPlexSansCondensed-SemiBold',
              }}>
              {title}
            </Text>
            <Pressable onPress={() => onClose()}>
              <XCircle weight="bold" color="rgb(235, 87, 87)" />
            </Pressable>
          </View>
          <Text
            style={{
              color: '#1e1e1e',
              fontSize: 16,
              fontFamily: 'IBMPlexSansCondensed-Regular',
            }}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
