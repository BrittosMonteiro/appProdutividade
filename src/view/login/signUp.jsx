import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Eye, EyeSlash} from 'phosphor-react-native';

import {createUserService} from '../../service/loginService';
import TemplateScreen from '../templateScreen';
import {setUser} from '../../store/action/loginAction';
import ModalError from '../../components/ModalError';

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [titleError, setTitleError] = React.useState('ERRO');
  const [messageError, setMessageError] = React.useState('');

  const setUserData = async data => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('userData', jsonData);
    } catch (err) {
      setMessageError('Não foi possível armazenar os dados do login.');
      setOpenModal(true);
    }
  };

  async function handleSignUp() {
    setIsLoading(true);
    if (!name || !username || !email || !password || !confirmPassword) {
      setTitleError('DADOS INCORRETOS');
      setMessageError('Preencha os campos corretamente');
      setOpenModal(true);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setTitleError('SENHAS INCOMPATÍVEIS');
      setMessageError('As senhas precisam ser iguais');
      setOpenModal(true);
      setIsLoading(false);
      return;
    }

    const user = {
      name,
      surname,
      email: email.toLocaleLowerCase(),
      username: username.toLocaleLowerCase(),
      password,
    };

    await createUserService(user)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          return responseCreate.json();
        }
      })
      .then(response => {
        if (response?.data) {
          dispatch(setUser(response.data));
          setUserData(response.data);
          navigation.reset({
            index: 0,
            routes: [{name: 'DashboardView'}],
          });
        } else {
          setMessageError(response.message);
          setOpenModal(true);
        }
      })
      .catch(() => {
        setMessageError('Serviço indisponível. Tente novamente mais tarde');
        setOpenModal(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeModal() {
    setOpenModal(false);
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#1e1e1e',
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 4,
              padding: 8,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#fff',
                fontSize: 18,
                padding: 0,
              }}
              placeholder={'Senha'}
              keyboardType={'default'}
              secureTextEntry={showPassword ? false : true}
              defaultValue={password}
              onChangeText={text => setPassword(text)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye weight="bold" color="#fff" />
              ) : (
                <EyeSlash weight="bold" color="#fff" />
              )}
            </Pressable>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#1e1e1e',
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 4,
              padding: 8,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: '#fff',
                fontSize: 18,
                padding: 0,
              }}
              placeholder={'Confirmar senha'}
              keyboardType={'default'}
              secureTextEntry={showPassword ? false : true}
              defaultValue={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye weight="bold" color="#fff" />
              ) : (
                <EyeSlash weight="bold" color="#fff" />
              )}
            </Pressable>
          </View>
          <Pressable
            onPress={() => handleSignUp()}
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
      <ModalError
        message={messageError}
        onClose={closeModal}
        open={openModal}
        title={titleError}
      />
    </TemplateScreen>
  );
}
