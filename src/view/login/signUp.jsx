import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {createUserService} from '../../service/userService';

import TemplateScreen from '../templateScreen';

export default function SignUp({navigation}) {
  const [name, setName] = React.useState('Lucas');
  const [surname, setSurname] = React.useState('Brittos');
  const [email, setEmail] = React.useState('brittosmonteiro@gmail.com');
  const [username, setUsername] = React.useState('brittosmonteiro');
  const [password, setPassword] = React.useState('teste123');
  const [confirmPassword, setConfirmPassword] = React.useState('teste123');
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    // if (!name || !username || !email || !password || !confirmPassword) {
    //   console.log('Preencher form');
    //   setIsLoading(false);
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   console.log('Senhas não são iguais');
    //   setIsLoading(false);
    //   return;
    // }

    const user = {
      name,
      surname,
      email: email.toLocaleLowerCase(),
      username: username.toLocaleLowerCase(),
      password,
    };

    // await createUserService(user)
    //   .then(responseCreate => {
    //     if (responseCreate.status === 201) {
    //       return responseCreate.json();
    //     }
    //   })
    //   .then(response => {
    //     console.log(response);
    //     navigation.navigate('DashboardView');
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
            CRIAR MINHA CONTA
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
            placeholder={'Nome'}
            keyboardType={'default'}
            defaultValue={name}
            onChangeText={text => setName(text)}
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
            placeholder={'Sobrenome'}
            keyboardType={'default'}
            defaultValue={surname}
            onChangeText={text => setSurname(text)}
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
            placeholder={'E-mail'}
            keyboardType={'email-address'}
            defaultValue={email}
            onChangeText={text => setEmail(text)}
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
            placeholder={'Confirmar senha'}
            secureTextEntry={true}
            defaultValue={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          <Pressable
            onPress={() => handleSignIn()}
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
                CRIAR
              </Text>
            )}
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'IBMPlexSansCondensed-Regular',
              color: '#fff',
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              paddingBottom: 4,
            }}>
            JÁ TENHO UMA CONTA
          </Text>
        </Pressable>
      </View>
    </TemplateScreen>
  );
}
