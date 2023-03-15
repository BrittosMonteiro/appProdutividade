import * as React from 'react';
import {Pressable, Text, View} from 'react-native';

import {CheckSquare, RadioButton, Square} from 'phosphor-react-native';
import {updateTaskStatusService} from '../../../service/taskService';

export default function TasksListItem({navigation, item, refresh}) {
  const priority = ['39, 174, 96', '255, 122, 0', '235, 87, 87'];

  async function changeTaskStatus() {
    const updateStatus = {
      idTask: item.id,
      status: !item.status,
    };
    await updateTaskStatusService(updateStatus)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          refresh();
        }
      })
      .catch(err => {});
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingVertical: 8,
        borderRadius: 4,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 8,
          }}>
          <Pressable onPress={() => changeTaskStatus()}>
            {item.status ? (
              <CheckSquare
                color={`rgb(${priority[item.priority]})`}
                weight="fill"
              />
            ) : (
              <Square color="#1e1e1e" weight="bold" />
            )}
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('TaskItemView', {idTask: item.id})
            }
            style={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 18,
                fontFamily: 'IBMPlexSansCondensed-Medium',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                color: '#4e4e4e',
                fontSize: 14,
                fontFamily: 'IBMPlexSansCondensed-Medium',
              }}>
              {item.description ? item.description : 'Sem descrição'}
            </Text>
          </Pressable>
        </View>
        <RadioButton color={`rgb(${priority[item.priority]})`} weight="fill" />
      </View>
    </View>
  );
}
