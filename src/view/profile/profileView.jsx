import * as React from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';

import TemplateScreen from '../templateScreen';
import Header from '../../components/Header';
import HorizontalRule from '../../components/HorizontalRule';

export default function ProfileView({navigation}) {
  const [name, setName] = React.useState('Lucas');
  const [surname, setSurname] = React.useState('Brittos');
  const [email, setEmail] = React.useState('brittosmonteiro@gmail.com');
  const [username, setUsername] = React.useState('brittosmonteiro');

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  async function updatePassword() {
    console.log('Atualizar senha');
  }

  async function deleteAccount() {
    console.log('Remover conta');
  }

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
                placeholder={'Nova senha'}
                secureTextEntry={true}
                defaultValue={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
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
                placeholder={'Confirmar nova senha'}
                secureTextEntry={true}
                defaultValue={confirmNewPassword}
                onChangeText={text => setConfirmNewPassword(text)}
              />
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
                SALVAR
              </Text>
            </Pressable>
          </View>
          <HorizontalRule />
          <Pressable
            onPress={() => deleteAccount()}
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
