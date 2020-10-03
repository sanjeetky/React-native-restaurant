import React, { Component } from 'react';

import { View, Platform, Text, ScrollView, Image, StyleSheet, Button } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})



import Menu from './MenuComponent';
import Home from './home';
import About from './about';
import Contact from './contact';
import Reservation from './ReservationComponent';
import Dishdetail from './DishdetailComponent';


import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();
const bottoms=createMaterialBottomTabNavigator();



function createbottom()
{
  return(
     <bottoms.Navigator>
       <bottoms.Screen name='Home' component={Homenavigator}
        options={{
          tabBarIcon:(color)=>(
            <Icon
            name='home'  size={24} color={color}
          />
          )
        }}
       />
       <bottoms.Screen name='BottomStack' component={StackNavigator}
        options={{
          tabBarIcon:(color)=>(
            <Icon
            name='utensils'  size={24} color={color}
          />
          ),
          title:"Menu"
        }}
       />
     </bottoms.Navigator>

  )
}

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Hello"  children={createbottom}
      options={{title:"Bazaree" ,
      drawerIcon: (color) => (
        <Icon
          name='wolf-pack-battalion'  size={34} color={"blue"}
        />
      ),
      }}/>
       <Drawer.Screen name="Home" component={Homenavigator} 
       options={{
        drawerIcon: (color) => (
          <Icon
            name='home'  size={24} color={color}
          />
        ),
       }} />
       <Drawer.Screen name="About Us" component={Aboutnavigator} options={{
        drawerIcon: (color) => (
          <Icon
            name='user'  size={24} color={color}
          />
        ),
       }} />
      <Drawer.Screen name="Stack" component={StackNavigator} options={{
        drawerIcon: (color) => (
          <Icon
            name='utensils'  size={24} color={color}
          />
        ),
        title:"Menu"
       }} />
      <Drawer.Screen name="Contact Us" component={Contactnavigator} options={{
        drawerIcon: (color) => (
          <Icon
            name='id-card'  size={24} color={color}
          />
        ),
       }} />
         <Drawer.Screen name="Resere-vation" component={ReservationNavigator} options={{
        drawerIcon: (color) => (
          <Icon
            name='bars'  size={24} color={color}
          />
        ),
       }} />
    </Drawer.Navigator>
  );
}
const Homenavigator=({navigation})=>
{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}
         options={{
          title:"Home",
          headerStyle:{backgroundColor:"#512DA8"},
          headerTintColor:"white",
           headerLeft:(color)=>(
            <Icon
            name='bars'  size={24} color={color} style={{paddingLeft:20}}
            onPress={ () =>navigation.toggleDrawer() }  
          />
           )
        }}
      />
    </Stack.Navigator>
  )
}
const Aboutnavigator=({navigation})=>
{
  return(
    <Stack.Navigator>
      <Stack.Screen name="About" component={About}
         options={{
          title:"About Us",
          headerStyle:{backgroundColor:"#512DA8"},
          headerTintColor:"white",
          headerLeft:(color)=>(
            <Icon
            name='bars'  size={24} color={color} style={{paddingLeft:20}}
            onPress={ () =>navigation.toggleDrawer() }  
          />
           )
        }}
      />
    </Stack.Navigator>
  )
}

const Contactnavigator=({navigation})=>
{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={Contact}
         options={{
          title:"Contact Us",
          headerStyle:{backgroundColor:"#512DA8"},
          headerTintColor:"white",
          headerLeft:(color)=>(
            <Icon
            name='bars'  size={24} color={color} style={{paddingLeft:20}}
            onPress={ () =>navigation.toggleDrawer() }  
          />
           )
         
        }}
      />
    </Stack.Navigator>
  )
}


const StackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" 
         component={Menu} 
         options={{
           title:"Menu",
           headerStyle:{backgroundColor:"#512DA8"},
           headerTintColor:"white",
           headerLeft:(color)=>(
            <Icon
            name='bars'  size={24} color={color} style={{paddingLeft:20}}
            onPress={ () =>navigation.toggleDrawer() }  
          />
           )
         }}
      />
      <Stack.Screen name="Dishdetail" component={Dishdetail} />
    </Stack.Navigator>
  );
}



const ReservationNavigator=({navigation})=>{
  return(
    <Stack.Navigator>
       <Stack.Screen name="Reservation" component={Reservation}
         options={{
          title:"Reservation",
          headerStyle:{backgroundColor:"#512DA8"},
          headerTintColor:"white",
          headerLeft:(color)=>(
            <Icon
            name='bars'  size={24} color={color} style={{paddingLeft:20}}
            onPress={ () =>navigation.toggleDrawer() }  
          />
           )
        }}
      />
    </Stack.Navigator>
  )
}

class Main extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  

  render() {
    return (
        <DrawerNavigator/>
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});