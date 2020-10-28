import React,{Component} from 'react';
import { Text, ScrollView,Picker, View ,StyleSheet,Image,TextInput,Alert,ToastAndroid,Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import { Card, Input } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import {emptycart} from '../redux/ActionCreators';
//import {Picker} from '@react-native-community/picker';

const {width}=Dimensions.get('window');

const mapDispatchToProps = dispatch =>({
   emptycart:(item)=>dispatch(emptycart(item)),
   
})

const mapStateToProps = state => {
   return {
     cart:state.cart,
   }
 }


class Delivery extends Component{

constructor(props)
{
  super();
  this.state={
    fullname:"",
    pincode: "802301",
    telnum: "",
    area:"",
    houseno:"",
    city:"Arrah",
    isValidtelnum:true
  }
}


submit(item)
{
   var numbers = /^[0-9]+$/;
  if(this.state.fullname.trim().length==0)
  Alert.alert("fullname can not be empty!!")
  else if(!this.state.telnum.match(numbers)||this.state.telnum.trim().length!=10)
  Alert.alert("please enter valid mobile number")
  else if(this.state.houseno.trim().length==0)
  Alert.alert("house number should not be empty!!")
  else if(this.state.area.trim().length==0)
  Alert.alert("area should not be empty!!")
  else
  {
   const usern=this.props.route.params.data[0].username;
  var obj={
    item:this.props.route.params.data,
    fullname:this.state.fullname,
    pincode:this.state.pincode,
    telnum:this.state.telnum,
    area:this.state.area,
    houseno:this.state.houseno,
    city:this.state.city,
    username:usern
  }
  fetch(baseUrl+'/delivery',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(obj)
})
.then(res=>res.json())
.then(data=>{

   this.props.emptycart({username:usern});

   console.log(JSON.stringify(data))
   ToastAndroid.show("Order Received",
        ToastAndroid.LONG)
})
.catch(err=>console.log(err));
}
}


   validetelnum=(val)=>{ if(val.trim().length==10) {this.setState({   telnum:val, isValidtelnum:true })
} else {    this.setState({  telnum:val,      isValidtelnum:false   })}}
   

    render()
    {
        return(
          
        <ScrollView style={{marginLeft:20,marginRight:20}}>
          <Text style={{alignSelf:'center',margin:20}}>Address</Text>
          <Text style={{marginBottom:5,marginTop:5}}>Fullname</Text>
         <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({fullname:text})}
            value={this.state.fullname}
         />
        

         <Text style={{marginBottom:5,marginTop:5}}>Telnum</Text>
         <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.validetelnum(text)}
            value={this.state.telnum}
         />
          { this.state.isValidtelnum ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Number must be 10 characters long.</Text>
            </Animatable.View>
            }


         <Text style={{marginBottom:5,marginTop:5}}>Houseno</Text>
         <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({houseno:text})}
            value={this.state.houseno}
         />


         <Text style={{marginBottom:5,marginTop:5}}>Area/Landmark</Text>
         <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({area:text})}
            value={this.state.area}
         />

<Text style={{marginBottom:5,marginTop:5}}>Pincode</Text>
         <Picker
             selectedValue={this.state.pincode}
             style={{height: 50, width: width*(90/100)}}
             onValueChange={(itemValue, itemIndex) =>
             this.setState({pincode: itemValue})
           }>
           <Picker.Item label="802301" value="802301" />
           <Picker.Item label="802302" value="802302" />
          </Picker>

          <Text style={{marginBottom:5,marginTop:5}}>City</Text>
          <Picker
             selectedValue={this.state.city}
             style={{height: 50, width: width*(90/100)}}
             onValueChange={(itemValue, itemIndex) =>
             this.setState({city: itemValue})
           }>
           <Picker.Item label="Arrah" value="Arrah" />
          
          </Picker>
         
     
        <Button style={{backgroundColor:'#50C7C7', marginTop:20,marginBottom:20}} onPress={()=>this.submit(this.props.data)} >Submit</Button>


        </ScrollView>
        )
    
    }
}


const styles = StyleSheet.create({
   container: {
       justifyContent: 'center',
       margin: 10,
   },
 
   formInput: {
       marginTop:20,
       marginBottom:0
   },
   
   errorMsg: {
     color: '#FF0000',
     fontSize: 14,
     margin:0
 },
 });
export default  connect  (mapStateToProps,mapDispatchToProps)  (Delivery);
