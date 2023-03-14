import * as React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TemplateScreen from '../templateScreen';
import Header from '../../components/Header';
import HorizontalRule from '../../components/HorizontalRule';
import {
  deleteUserService,
  readUserService,
  updatePasswordService,
} from '../../service/userService';
import {Eye, EyeSlash} from 'phosphor-react-native';

export default function ProfileView({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  async function loadUserData() {
    await readUserService(userSession.id)
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setName(response.data.name);
        setSurname(response.data.surname);
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch(err => {});
  }

  async function updatePassword() {
    if (!newPassword || !confirmNewPassword) {
      Alert.alert('Preencher senha');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Senhas não são iguais');
      return;
    }

    const updatePass = {
      idUser: userSession.id,
      password: newPassword,
    };

    await updatePasswordService(updatePass)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          Alert.alert('Senha alterada');
          setConfirmNewPassword('');
          setNewPassword('');
        } else {
          Alert.alert('Não foi possível alterar a senha');
        }
      })
      .catch(err => {});
  }

  async function deleteUser() {
    await deleteUserService({idUser: userSession.id})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          signOut();
        }
      })
      .catch(err => {});
  }

  async function signOut() {
    try {
      const storedData = await AsyncStorage.removeItem('userData');
      if (!storedData) {
        navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    loadUserData();
  }, []);

  return (
    <TemplateScreen>
      <Header navigation={navigation} title={'PERFIL'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingVertical: 16,
        }}>
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            paddingHorizontal: 16,
          }}>
          <View style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Regular',
                  color: '#fff',
                }}>
                Nome
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#1e1e1e',
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
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Regular',
                  color: '#fff',
                }}>
                Sobrenome
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#1e1e1e',
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
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Regular',
                  color: '#fff',
                }}>
                E-mail
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#1e1e1e',
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
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Regular',
                  color: '#fff',
                }}>
                Usuário
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#1e1e1e',
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
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>

          <HorizontalRule />

          <View style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <Text
              style={{
                fontFamily: 'IBMPlexSansCondensed-Medium',
                fontSize: 20,
                color: '#fff',
              }}>
              ALTERAR SENHA
            </Text>
            <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Regular',
                  color: '#fff',
                }}>
                Nova senha
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#1e1e1e',
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
                  keyboardType={'default'}
                  secureTextEntry={showPassword ? false : true}
                  placeholder={'Nova senha'}
                  defaultValue={newPassword}
                  onChangeText={text => setNewPassword(text)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye weight="bold" color="#fff" />
                  ) : (
                    <EyeSlash weight="bold" color="#fff" />
                  )}
                </Pressable>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'IBMPlexSansCondensed-Regular',
                  color: '#fff',
                }}>
                Confirmar nova senha
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#1e1e1e',
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
                  placeholder={'Confirmar nova senha'}
                  keyboardType={'default'}
                  secureTextEntry={showPassword ? false : true}
                  defaultValue={confirmNewPassword}
                  onChangeText={text => setConfirmNewPassword(text)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye weight="bold" color="#fff" />
                  ) : (
                    <EyeSlash weight="bold" color="#fff" />
                  )}
                </Pressable>
              </View>
            </View>
            <Pressable
              onPress={() => updatePassword()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingVertical: 12,
                backgroundColor: 'rgb(39, 174, 96)',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'IBMPlexSansCondensed-Medium',
                  color: '#fff',
                  fontSize: 18,
                }}>
                ATUALIZAR
              </Text>
            </Pressable>
          </View>
          <HorizontalRule />

          <Pressable
            onPress={() => signOut()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingVertical: 12,
              backgroundColor: '#1e1e1e',
              borderColor: 'rgb(235, 87, 87)',
              borderWidth: 2,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: 'rgb(235, 87, 87)',
                fontSize: 18,
              }}>
              SAIR DA CONTA
            </Text>
          </Pressable>

          <Pressable
            onPress={() => deleteUser()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingVertical: 12,
              backgroundColor: '#1e1e1e',
              borderColor: 'rgb(235, 87, 87)',
              borderWidth: 2,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'IBMPlexSansCondensed-Medium',
                color: 'rgb(235, 87, 87)',
                fontSize: 18,
              }}>
              EXCLUIR MINHA CONTA
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </TemplateScreen>
  );
}
