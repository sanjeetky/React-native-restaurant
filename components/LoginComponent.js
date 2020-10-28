import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image ,FlatList, Alert, TouchableHighlightBase} from 'react-native';
import { Input, CheckBox,Button ,Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseUrl } from '../shared/baseUrl';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const bottoms=createMaterialBottomTabNavigator();

//import Icon from 'react-native-vector-icons/FontAwesome';


import { logoutUser } from '../redux/ActionCreators';
import { loginUser } from '../redux/ActionCreators';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const mapDispatchToProps = dispatch => ({
  logoutUser: (user) => dispatch(logoutUser(user)),
  loginUser: (user) => dispatch(loginUser(user)),
})

 
const mapStateToProps = state => {
    return {
     user:state.user
    }
  }

class Login extends Component{
   constructor(props){
    super();
     
    this.state={
      activeorders:[],
      pastorders:[],
      cancelledorders:[],
      password: '',
      username:"",
      isValidPassword:true,
      isValidUser:true
      
   }

}




componentDidMount(){
  if(this.props.user.user.username!=null)
  {
    let item={
      username:this.props.user.user.username,
      status:'Inprogress'
  }
  fetch(baseUrl+'/delivery/display',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body:JSON.stringify(item)
  })
  .then((res)=>res.json())
  .then((data)=>
  {
      this.setState({activeorders:data})
  })
  .catch((err)=>console.log(err));

  let Item={
      username:this.props.user.user.username,
      status:'completed'
  }
  fetch(baseUrl+'/delivery/display',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body:JSON.stringify(Item)
  })
  .then((res)=>res.json())
  .then((data)=>
  {
      this.setState({pastorders:data})
  })
  .catch((err)=>console.log(err));  
  
  let Iitem={
      username:this.props.user.user.username,
      status:'cancelled'
  }
  fetch(baseUrl+'/delivery/display',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body:JSON.stringify(Iitem)
  })
  .then((res)=>res.json())
  .then((data)=>
  {
      this.setState({cancelledorders:data})
  })
  .catch((err)=>console.log(err)); 
  }
}

handlelogout()
{
  this.props.logoutUser();
}
handleLogin() {

  if(this.state.username.trim().length <4)
  {
    this.setState({isValidUser:false})
  }
  else if(this.state.password.trim().length<4)
  {
    this.setState({isValidPassword:false})
  }
  else{
  this.props.loginUser({username:this.state.username,password:this.state.password})
  }
}


cancelit(item)
    {
        var status="cancelled";
        var object={
            status:status,
            id:item._id
        }
        console.log(object);
           fetch(baseUrl+'/delivery',{
               method:"PUT",
               headers:{"Content-Type":"application/json"},
               body:JSON.stringify(object)
           })
           .then(res=>res.json())
           .then(data=>{
               console.log(data)
               alert("submitted successfully");
              
            })
           .catch(err=>{
               console.log(err)
            });
    }


     handlePasswordChange = (val) => {
      if( val.trim().length >= 4 ) {
            this.setState({
              password: val,
              isValidPassword: true
            })
      } else {
        this.setState({
          password: val,
          isValidPassword: false
        })
      }
  }


   handleValidUser = (val) => {
    if( val.trim().length >= 4 ) {
      this.setState({
        isValidUser: true,
        username:val
      })

    } else {
      this.setState({
        isValidUser:  false,
        username:val
      })
    }
}

  

render()
{
 

  if(this.props.user.user.username==null)
  {
    return(
      <View style={styles.container}>
      <Input
          placeholder="Username"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={val=>this.handleValidUser(val)}
          value={this.state.username}
          containerStyle={styles.formInput}
          />
           { this.state.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
      <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(val) => this.handlePasswordChange(val)}
          value={this.state.password}
          containerStyle={styles.formInput}
          />
           { this.state.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
            </Animatable.View>
            }
     
     <View style={{marginBottom:20}}>
            <FontAwesome.Button name="sign-in"  style={{alignSelf:'center'}} backgroundColor="#3CD6D4"  onPress={() => this.handleLogin()} >
                                Login
             </FontAwesome.Button>
       </View>
          
              <FontAwesome.Button name="user-plus"  style={{alignSelf:'center'}} backgroundColor="#3CD6D4" onPress={() => this.props.navigation.navigate('OTPsend')}>
                                 Register
              </FontAwesome.Button>
       
             <Text style={{alignSelf:'center', marginTop:50}} onPress={()=>this.props.navigation.navigate('ResetOTPsend')} >Forget Password ?</Text>
  </View>
  )
  }
  else
  {
    
    const Activeorders = ({item,index})=>{
      return(
       <View>
         {item.item.map((hello)=>{
          return(
           <Card>
             <Card.Image source={{uri:hello.img}}/>
             <Card.Title>{hello.name}</Card.Title>
             <Text>Quantity:{hello.quantity}</Text>
             <Text>Date:  {item.updatedAt[0]+item.updatedAt[1]+item.updatedAt[2]+item.updatedAt[3]+item.updatedAt[4]+item.updatedAt[5]+item.updatedAt[6]+item.updatedAt[7]+item.updatedAt[8]+item.updatedAt[9]}</Text>
           
           </Card>
          )})}
            <Button 
            title="Cancel the Order"
            buttonStyle={{marginLeft:16,marginRight:16,backgroundColor:'#DB1229'}}
           onPress={()=>this.cancelit(item)}
            />
        </View>
         )}



         const Cancelorders = ({item,index})=>{
          return(
           <View>
             {item.item.map((hello)=>{
              return(
               <Card>
                 <Card.Image source={{uri:hello.img}}/>
                 <Card.Title>{hello.name}</Card.Title>
                 <Text>Quantity:{hello.quantity}</Text>
                 <Text>Date:  {item.updatedAt[0]+item.updatedAt[1]+item.updatedAt[2]+item.updatedAt[3]+item.updatedAt[4]+item.updatedAt[5]+item.updatedAt[6]+item.updatedAt[7]+item.updatedAt[8]+item.updatedAt[9]}</Text>
               
               </Card>
              )})}

            </View>
             )}
    

             const Pastorders = ({item,index})=>{
              return(
               <View>
                 {item.item.map((hello)=>{
                  return(
                   <Card>
                     <Card.Image source={{uri:hello.img}}/>
                     <Card.Title>{hello.name}</Card.Title>
                     <Text>Quantity:{hello.quantity}</Text>
                     <Text>Date:  {item.updatedAt[0]+item.updatedAt[1]+item.updatedAt[2]+item.updatedAt[3]+item.updatedAt[4]+item.updatedAt[5]+item.updatedAt[6]+item.updatedAt[7]+item.updatedAt[8]+item.updatedAt[9]}</Text>
                   
                   </Card>
                  )})}
                  
                </View>
                 )}
        




    return(
      <ScrollView>
      <Text style={{alignSelf:'center'}}>Welcome {this.props.user.user.username}</Text>
      
      <Text>Active Orders</Text>
    <FlatList
       data={this.state.activeorders}
       renderItem={Activeorders}
       keyExtractor={item => item._id}
       extraData={this.state}
    
    />
      
      
      <Text>Past Orders</Text>
      <FlatList
       data={this.state.pastorders}
       renderItem={Pastorders}
       keyExtractor={item => item._id}
       extraData={this.state}
    
    />
     
      
      <Text>Cancelled Orders</Text>
      
     
      <FlatList
       data={this.state.cancelledorders}
       renderItem={Cancelorders}
       keyExtractor={item => item._id}
       extraData={this.state}
    
    />
      
      
      
      
      
      <Button
      onPress={() => this.handlelogout()}
      title="Logout"
      clear
      icon={
          <Icon
              name='user-plus'
              type='font-awesome'            
              size={24}
              color= '#1229DB'
          />
      }
      titleStyle={{
          color: "#1229DB"
      }}
      />
      </ScrollView>
    )
  }
   

}
}
    

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      margin: 20,
  },
  imageContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  },
  formInput: {
      marginTop:20,
      marginBottom:0
  },
  formCheckbox: {
      margin: 20,
      backgroundColor: null
  },
  formButton: {
      margin: 60
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    margin:0
},
});


export default connect(mapStateToProps,mapDispatchToProps)(Login);