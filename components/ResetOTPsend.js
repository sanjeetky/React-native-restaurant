import React ,{Component} from 'react';
import { Text, ScrollView, View ,StyleSheet,Image,TextInput,Alert,ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import {Input} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';


class ResetOTPsend extends Component{
    constructor(props)
    {
        super();
        this.state={
            phonenum:"",
            disable:false,
            t:0,
            isValidphonenum:true
        }
    }
    renderRandom() {
        const min = 1000;
        const max = 9999;
        const random = (Math.floor(Math.random() * (max - min + 1)) + min);
        const t=random.toString();
        return t;
    }
     timewatch()
     {
         this.setState({disable:true})
         var i=60;
        for( i=60;i>=0;i--)
        {
            this.setState({t:i})
            if(i<=1)
            {
                this.setState({disable:false})
            }
        }
     }

    validate()
    {
        var numbers = /^[0-9]+$/;
        if(!this.state.phonenum.match(numbers))
        Alert.alert("Please input  numbers")
        else if(this.state.phonenum.trim().length!=10)
        Alert.alert("Number must be 10 long!!")
        else
        {
            fetch(baseUrl+'/users/searchmobile',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({mobilenum:this.state.phonenum})
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.success==true)
                this.send();
                else
                ToastAndroid.show(data.status,ToastAndroid.SHORT);
            })   
        }
    }
    
    send()
    {
         this.timewatch();
      ToastAndroid.show("OTP sent!! This may take some time! Plz wait",ToastAndroid.SHORT)
      var verifyCode = this.renderRandom();
      var phoneNumber = this.state.phonenum;
     /* var request="https://www.pay2all.in/web-api/send_sms?api_token=9BjyEu8DgWH0OMzDblCdxAtOojmTzPzL8ADWB5St2oP11J7rxP3aBa7IfA3i&senderid=URMART&number="+phoneNumber+"&message=Your OTP for UrbanReach is "+verifyCode+"&route=4";
      fetch(request).then(res => {
      if (res.ok) {
      this.props.navigation.navigate('OTPverify',{otp:verifyCode,mobile:phoneNumber});
      }
      else {
        Alert.alert("Error on seding messages. Please try again!");
      }
      }).catch(err => {
       Alert.alert("Error on sending message" + err);
      });*/
      console.log(verifyCode)
      this.props.navigation.navigate('ResetOTPverify',{otp:verifyCode,mobile:phoneNumber});
    }



    handleNumber = (val) => {
    if( val.trim().length == 10 ) {
      this.setState({
        isValidphonenum: true,
        phonenum:val
      })
    } else {
      this.setState({
        isValidphonenum:  false,
        phonenum:val
      })
    }
   }

    render()
    {
        return (
            <ScrollView  keyboardShouldPersistTaps={'handled'}>
            <Input
              placeholder="Enter mobile number"
              leftIcon={{ type: 'font-awesome', name: 'mobile' }}
              onChangeText={(val) => this.handleNumber(val)}
              value={this.state.phonenum}
              containerStyle={styles.formInput}
             />
           { this.state.isValidphonenum ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Number must be 10 characters long.</Text>
            </Animatable.View>
            }
            <View style={styles.container}>
             <FontAwesome.Button name="paper-plane" disabled={this.state.disable} style={{alignSelf:'center'}} backgroundColor="#3CD6D4" onPress={()=>this.validate()} >
                                 Send OTP
             </FontAwesome.Button>
             </View>
             {
                 this.state.t ?
            <Text style={{alignSelf:'center',marginTop:10}}>Please wait for {this.state.t} sec</Text>:null
             }
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

export default ResetOTPsend;