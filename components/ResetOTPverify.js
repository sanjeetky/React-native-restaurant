import React ,{Component} from 'react';
import { Text, ScrollView, View ,StyleSheet,Image,TextInput,Alert,ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import {Input} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


class ResetOTPverify extends Component{
    constructor(props)
    {
        super();
        this.state={
            code:'',
            isValidcode:true
        }
    }


verify()
{
      var numbers = /^[0-9]+$/;
        if(!this.state.code.match(numbers))
        Alert.alert("Please input valid number")
        else if(this.state.code.trim().length!=4)
        Alert.alert("OTP must be 4 digit long!!")
     else if(this.state.code==this.props.route.params.otp)
    {
        this.props.navigation.navigate('ResetPassword',{mobilenum:this.props.route.params.mobile})
    }
    else
    {
        ToastAndroid.show("Wrong OTP!!",ToastAndroid.LONG);
    }
}

handlecode=(val)=>
{
   
        if( val.trim().length == 4 ) {
          this.setState({
            isValidcode: true,
            code:val
          })
        } else {
          this.setState({
            isValidcode:  false,
            code:val
          })
        }
 }

    render()
    {
        //const otp = this.props.route.params.otp;
        return (
            <ScrollView contentContainerStyle={{margin:10}} keyboardShouldPersistTaps={'handled'} >
           <Input
              placeholder="  Enter OTP...."
              leftIcon={{ type: 'font-awesome', name: 'key' }}
              onChangeText={(val) => this.handlecode(val)}
              value={this.state.code}
              containerStyle={styles.formInput}
             />
           { this.state.isValidcode ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Number must be 4 characters long.</Text>
            </Animatable.View>
            }
             <FontAwesome.Button name="check" style={{alignSelf:'center'}}  backgroundColor="#3CD6D4" onPress={()=>this.verify()}>
                                 Submit
            </FontAwesome.Button>
           
        
            </ScrollView>
          );
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
export default ResetOTPverify;