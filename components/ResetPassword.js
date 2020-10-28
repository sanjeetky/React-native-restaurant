import React,{Component} from 'react';
import { View, StyleSheet, Text, ScrollView, Image ,FlatList, Alert, TouchableHighlightBase, ToastAndroid} from 'react-native';
import { Input, CheckBox,Button ,Card} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

class ResetPasssword extends Component{
    constructor(props){
        super();
        this.state={
            newpass1:"",
            newpass2:"",
            isValidnewpass1:true,
            isValidnewpass2:true
        }
    }

    submit()
    {

        if(this.state.newpass1.trim().length<4)
        Alert.alert("new password must be atleast 4 letter long!!")
        else if(this.state.newpass2.trim().length<4)
        Alert.alert("confirm password must be atleast 4 digit long!!")
        else if(this.state.newpass1!=this.state.newpass2)
           ToastAndroid.show("Confirm Your Password Correctly ",ToastAndroid.SHORT);
        else
        {
            fetch( baseUrl+'/users/password',{
                method:"PUT",
                headers:{ "Content-Type":"application/json"},
                body:JSON.stringify({password:this.state.newpass1,mobilenum:this.props.route.params.mobilenum})
              
            })
           .then(res=>res.json())
           .then(data=>{
               ToastAndroid.show("Password Updated Successfully!!",ToastAndroid.SHORT);
               this.props.navigation.navigate('Login');
           })
           .catch(err=>console.log(err))
        }
    }

    
    handlenewpass1 = (val) => {
        if( val.trim().length >= 4 ) {
              this.setState({
                newpass1: val,
                isValidnewpass1: true
              })
        } else {
          this.setState({
            newpass1: val,
            isValidnewpass1: false
          })
        }
    }
  
    handlenewpass2 = (val) => {
        if( val.trim().length >= 4 ) {
              this.setState({
                newpass2: val,
                isValidnewpass2: true
              })
        } else {
          this.setState({
            newpass2: val,
            isValidnewpass2: false
          })
        }
    }
  

    render(){
        return(
            <View style={styles.container}>
            <Input
                placeholder="New Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={val=>this.handlenewpass1(val)}
                value={this.state.newpass1}
                containerStyle={styles.formInput}
                />
                 { this.state.isValidnewpass1 ? null : 
                 <Animatable.View animation="fadeInLeft" duration={500}>
                 <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
                </Animatable.View>
                }
            <Input
                placeholder="Confirm Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={val=>this.handlenewpass2(val)}
                value={this.state.newpass2}
                containerStyle={styles.formInput}
                />
                 { this.state.isValidnewpass2 ? null : 
                 <Animatable.View animation="fadeInLeft" duration={500}>
                 <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
                 </Animatable.View>
                }

                  <FontAwesome.Button name="paper-plane"  style={{alignSelf:'center'}} backgroundColor="#3CD6D4"  onPress={() => this.submit()} >
                                      Submit
                   </FontAwesome.Button>
      
        </View>
        )
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
        margin: 20
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

  
export default ResetPasssword;