import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './src/view/login/signIn';
import SignUp from './src/view/login/signUp';
import DashboardView from './src/view/dashboard/dashboardView';
import TasksView from './src/view/tasks/tasksView';
import TaskItemView from './src/view/tasks/taskItemView';
import ListsView from './src/view/lists/listsView';
import ListItemView from './src/view/lists/listItemView';
import RoutineView from './src/view/routine/routineView';
import RoutineItemView from './src/view/routine/routineItemView';
import ProfileView from './src/view/profile/profileView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="DashboardView" component={DashboardView} />
        <Stack.Screen name="TasksView" component={TasksView} />
        <Stack.Screen name="TaskItemView" component={TaskItemView} />
        <Stack.Screen name="ListsView" component={ListsView} />
        <Stack.Screen name="ListItemView" component={ListItemView} />
        <Stack.Screen name="RoutineView" component={RoutineView} />
        <Stack.Screen name="RoutineItemView" component={RoutineItemView} />
        <Stack.Screen name="ProfileView" component={ProfileView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
