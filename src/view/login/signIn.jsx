import {useEffect, useState} from 'react';
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

import {loginService} from '../../service/loginService';
import TemplateScreen from '../templateScreen';
import {setUser} from '../../store/action/loginAction';
import ModalError from '../../components/ModalError';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [titleError, setTitleError] = useState('ERRO');
  const [messageError, setMessageError] = useState('');

  const setUserData = async data => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('userData', jsonData);
    } catch (err) {
      setMessageError('Não foi possível armazenar os dados do login.');
      setOpenModal(true);
    }
  };

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const jsonStoredData = await AsyncStorage.getItem('userData');
      const storedData = JSON.parse(jsonStoredData);
      if (storedData !== null) {
        dispatch(setUser(storedData));
        navigation.reset({
          index: 0,
          routes: [{name: 'DashboardView'}],
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  async function handleLogin() {
    setIsLoading(true);
    if (!username || !password) {
      setTitleError('DADOS INCORRETOS');
      setMessageError('Preencha os campos corretamente');
      setOpenModal(true);
      setIsLoading(false);
      return;
    }

    const userValidate = {
      username,
      password,
    };

    await loginService(userValidate)
      .then(responseLogin => {
        return responseLogin.json();
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

  useEffect(() => {
    getUserData();
  }, []);

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
            editable={!isLoading}
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
              editable={!isLoading}
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
      <ModalError
        title={titleError}
        message={messageError}
        onClose={closeModal}
        open={openModal}
      />
    </TemplateScreen>
  );
}
