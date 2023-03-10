import {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {loginUserService} from '../../service/userService';

import TemplateScreen from '../templateScreen';
import loginStyle from './loginStyle';

export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    // if (!username || !password) {
    //   setIsLoading(false);
    //   return;
    // }

    const userValidate = {
      username,
      password,
    };

    // await loginUserService(userValidate)
    //   .then(responseLogin => {
    //     if (responseLogin.status === 200) {
    //       navigation.navigate('DashboardView');
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    setTimeout(() => {
      navigation.navigate('DashboardView');
    }, 3000);
  }

  return (
    <TemplateScreen>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: '100%',
            maxWidth: 300,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              fontFamily: 'IBMPlexSansCondensed-Medium',
            }}>
            ACESSAR MINHA CONTA
          </Text>
          <TextInput
            style={{
              backgroundColor: '#1e1e1e',
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 4,
              padding: 8,
              width: '100%',
              fontFamily: 'IBMPlexSansCondensed-Medium',
              color: '#fff',
              fontSize: 18,
            }}
            placeholder={'Usuário'}
            keyboardType={'default'}
            defaultValue={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={{
              backgroundColor: '#1e1e1e',
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 4,
              padding: 8,
              width: '100%',
              fontFamily: 'IBMPlexSansCondensed-Medium',
              color: '#fff',
              fontSize: 18,
            }}
            placeholder={'Senha'}
            secureTextEntry={true}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />
          <Pressable
            onPress={() => handleLogin()}
            style={{
              width: '100%',
              backgroundColor: 'rgb(235, 87, 87)',
              alignItems: 'center',
              padding: 8,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Medium',
                  color: '#fff',
                }}>
                ACESSAR
              </Text>
            )}
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'IBMPlexSansCondensed-Regular',
              color: '#fff',
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              paddingBottom: 4,
            }}>
            CRIAR UMA CONTA
          </Text>
        </Pressable>
      </View>
    </TemplateScreen>
  );
}
