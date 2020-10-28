import React, { Component } from 'react';

import { View, Platform, Text, ScrollView, Image, StyleSheet,  ToastAndroid, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments,fetchCart,fetchSliderimage } from '../redux/ActionCreators';
import {Badge,Avatar,Button} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    user:state.user,
    cart:state.cart
    //sliderimage:state.sliderimage
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
   fetchCart:(user)=>dispatch(fetchCart(user)),
   fetchSliderimage:()=>dispatch(fetchSliderimage())

})



import Menu from './MenuComponent';
import Home from './home';
import Contact from './contact';
import Reservation from './ReservationComponent';
import Dishdetail from './DishdetailComponent';
import Login from './LoginComponent';
import Cart from './cart';
import Delivery from './delivery';
import Search from './search';
import RegisterTab from './signuptab';
import OTPsend from './OTPsend';
import OTPverify from './OTPverify';
import ResetOTPsend from './ResetOTPsend';
import ResetOTPverify from './ResetOTPverify';
import ResetPassword from './ResetPassword';



import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();
const bottoms=createMaterialBottomTabNavigator();




class Main extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
   this.props.fetchCart({username:this.props.user.user.username});
   this.props.fetchSliderimage();
    
  NetInfo.addEventListener(connectionInfo => {
    ToastAndroid.show('Initial Network Connectivity Type: '
    + connectionInfo.isConnected +', effectiveType: '+ connectionInfo.type,
    ToastAndroid.SHORT)
});
  }
  
  render() {
    

    

const DrawerNavigator = ({navigation,props}) => {
  return (
    
    <Drawer.Navigator >
    
       <Drawer.Screen name="Home" component={Homenavigator} 
       options={{
        drawerIcon: (color) => (
          <Icon
            name='home'  size={20} 
          />
        ),
       }} />


    
         <Drawer.Screen name="Cart" component={CartNavigator} 
       options={{
        drawerIcon: (color) => (
          <Icon
            name='shopping-cart'  size={20} 
          />
        ),
       }} />


      
     
      <Drawer.Screen name="Contact Us" component={Contactnavigator} options={{
        drawerIcon: (color) => (
          <Icon
            name='id-card'  size={20} color={color}
          />
        ),
       }} />
       
         <Drawer.Screen name="Custom Order" component={ReservationNavigator} options={{
        drawerIcon: (color) => (
          <Icon
            name='book-reader'  size={20} color={color}
          />
        ),
       }} />

       
        <Drawer.Screen name="My Profile" component={loginNavigator} 
       options={{
        drawerIcon: (color) => (
          <Icon
            name='user'  size={20} color={color}
          />
        ),
       }} />       
    </Drawer.Navigator>
  );
}
const Homenavigator=({navigation,props})=>
{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}
         options={{
          title:null,
          headerStyle:{backgroundColor:"#7f89df"},
          headerTintColor:"white",
           headerLeft:(color)=>(
             
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Icon
                name='bars'  size={26}  color={'white'} style={{paddingLeft:20,paddingRight:25,top:10}}
                onPress={ () =>navigation.toggleDrawer() }
              />
             <Image
            source={require('./images/urmart.png')}
            style={{height:50,width:50}}
              />
           </View>
           ),
             headerRight:(color)=>(
              <View style={{right:10,flexDirection:'row',height:32,bottom:3}} >

              
              <Avatar
                rounded
                icon={{ name: 'shopping-cart' }}
                size={'medium'}
                containerStyle={{right:10,bottom:6}}
                onPress={()=>navigation.navigate('Cart')}
                
              />
 
             <Badge
               status="warning"
              containerStyle={{ position: 'absolute',left:15 }}
               value={this.props.cart.cart.length}
               badgeStyle={{width:1,height:18 }}
               
               
             
               
             />
               <FontAwesome.Button  style={{bottom:6,right:3}}   backgroundColor="#7f89df"  onPress={() => navigation.navigate('My Profile')} >
                                Login
             </FontAwesome.Button>

           </View>
             ),
             
        }}
      />
      <Stack.Screen name="Search" component={Search}/>
       <Stack.Screen name="Menu" component={Menu}
         options={{
          headerStyle:{backgroundColor:"#7f89df"},
          headerRight:(color)=>(
            <View style={{right:10,flexDirection:'row',height:32,bottom:3}} >
            <Avatar
              rounded
              icon={{ name: 'shopping-cart' }}
              size={'medium'}
              containerStyle={{right:10,bottom:6}}
              onPress={()=>navigation.navigate('Cart')}
              
              
            />

           <Badge
             status="warning"
            containerStyle={{ position: 'absolute',left:15 }}
             value={this.props.cart.cart.length}
             badgeStyle={{width:1,height:18 }}
             
           />
           </View>)
         }}
       
       />
       <Stack.Screen name="Dishdetail" component={Dishdetail}
         options={{
          headerStyle:{backgroundColor:"#7f89df"},
          headerRight:(color)=>(
            <View style={{right:10,flexDirection:'row',height:32,bottom:3}} >
            <Avatar
              rounded
              icon={{ name: 'shopping-cart' }}
              size={'medium'}
              containerStyle={{right:10,bottom:6}}
              onPress={()=>navigation.navigate('Cart')}
              
              
            />

           <Badge
             status="warning"
            containerStyle={{ position: 'absolute',left:15 }}
             value={this.props.cart.cart.length}
             badgeStyle={{width:1,height:18 }}
             
           />
           </View>)
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
          headerStyle:{backgroundColor:"#B2EBEB"},
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






const CartNavigator=({navigation})=>{
  return(
    <Stack.Navigator>
       <Stack.Screen name="Cart" component={Cart}
         options={{
          title:"Cart",
          headerStyle:{backgroundColor:"#7f89df"},
          headerTintColor:"white",
          headerLeft:(color)=>(
            <Icon
            name='bars'  size={24} color={color} style={{paddingLeft:20}}
            onPress={ () =>navigation.toggleDrawer() }  
          />
           )
        }}
      />
        <Stack.Screen name="Delivery" component={Delivery} />
        
    </Stack.Navigator>
  )
}


const ReservationNavigator=({navigation})=>{
  return(
    <Stack.Navigator>
       <Stack.Screen name="Reservation" component={Reservation}
         options={{
          title:"Custom Order",
          headerStyle:{backgroundColor:"#7f89df"},
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

const loginNavigator=({navigation})=>{
  return(
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login}
      options={{
       title:"Login",
       headerStyle:{backgroundColor:"#B2EBEB"},
       headerTintColor:"white",
       headerLeft:(color)=>(
         <Icon
         name='bars'  size={24} color={color} style={{paddingLeft:20}}
         onPress={ () =>navigation.toggleDrawer() }  
       />
        )
     }}
   />
    
    <Stack.Screen name="OTPsend" component={OTPsend}   options={{
       title:"Send ",
       headerStyle:{backgroundColor:"#B2EBEB"},}} />
    <Stack.Screen name="OTPverify" component={OTPverify} options={{
       title:"Verify",
       headerStyle:{backgroundColor:"#B2EBEB"},}}/>
    <Stack.Screen name="RegisterTab" component={RegisterTab}  options={{
       title:"Register",
       headerStyle:{backgroundColor:"#B2EBEB"},}} />
    <Stack.Screen name="ResetOTPsend" component={ResetOTPsend}
     options={{
      title:"Send",
      headerStyle:{backgroundColor:"#B2EBEB"},}} />
    <Stack.Screen name="ResetOTPverify" component={ResetOTPverify}  options={{
       title:"Verify",
       headerStyle:{backgroundColor:"#B2EBEB"},}}/>
    <Stack.Screen name="ResetPassword" component={ResetPassword}
     options={{
      title:"Reset",
      headerStyle:{backgroundColor:"#B2EBEB"},}} />
 </Stack.Navigator>
  )
}


    return (
        <DrawerNavigator  />
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