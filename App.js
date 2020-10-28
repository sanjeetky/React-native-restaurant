import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import Main from './components/MainComponent';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';

import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';


const { persistor, store } = ConfigureStore();

export default class  App extends Component {

  render()
  {
    return(
     
        <NavigationContainer>
             <Provider store={store}>
               <PersistGate 
                loading={<Loading />}
                persistor={persistor}>
                <Main />
               </PersistGate>
              </Provider>
        </NavigationContainer>
    
    )
  }

}






























































///react navigation

/*import React, { Component } from 'react';
import 'react-native-gesture-handler';

import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { StyleSheet, Text, View } from 'react-native';
import Hello from './components/hello';
import Main from './components/MainComponent';
import Menu from './components/MenuComponent';
import S from './components/S';
import SS from './components/SS';
import Tab1 from './components/tab1';
import Tab2 from './components/tab2';
import Tab3 from './components/tab3';
import Tab4 from './components/tab4';


const Stack = createStackNavigator();
const drawer=createDrawerNavigator();
const tops=createMaterialTopTabNavigator();
const bottoms=createMaterialBottomTabNavigator();
function createbottom()
{
  return(
     <bottoms.Navigator>
       <bottoms.Screen name='tab1' component={Tab1}/>
       <bottoms.Screen name='tab2' component={Tab2}/>
     </bottoms.Navigator>

  )
}
function createtop()
{
return(
   <tops.Navigator>
     <tops.Screen name='tab3' component={Tab3}/>
     <tops.Screen name='tab4' component={Tab4}/>
   </tops.Navigator>

)
}
export default class  App extends Component {



 stackin()
  {
    return(
  <Stack.Navigator>
    <Stack.Screen name="slide1" component={S}/>
    <Stack.Screen name="slide2" component={SS}/>
    <Stack.Screen name="bottomm" children={createbottom}/>
    <Stack.Screen name="topp" children={createtop}/>
  </Stack.Navigator>
    )
  }
 
  render(){
  return (
   <NavigationContainer>
      <drawer.Navigator >
        <drawer.Screen name='Home' children={this.stackin}/>
        <drawer.Screen name='MAIN' component={Main}/>
        <drawer.Screen name='Menu' component={Menu}/>
        <drawer.Screen name='Hello' component={Hello}/>
      </drawer.Navigator>
   </NavigationContainer>
  );
  }
}
*/
