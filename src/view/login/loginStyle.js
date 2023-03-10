import {StyleSheet} from 'react-native';

const loginStyle = StyleSheet.create({
  flex: {
    display: 'flex',
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    color: '#1e1e1e',
    padding: 8,
  },
  border_radius_default: {
    borderRadius: 4,
  },
});

export default loginStyle;
