
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image ,Button, Alert} from 'react-native';
import { Input, CheckBox,  Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {registerUser} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';



const mapStateToProps = state => {
    return {
     user:state.user
    }
  }

const mapDispatchToProps = dispatch => ({
    registerUser:(user)=>dispatch(registerUser(user))
 })

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            mobilenum:'',
            isValidUser:true,
            isValidPassword:true,
            isValidemail:true
        }
    }
    componentDidMount()
    {
        this.setState({mobilenum:this.props.route.params.mobilenum})
    }

    

   
   
    handleRegister() {
        if(this.state.username.trim().length <4)
        Alert.alert("username must be 4 characters long!!");
        else if(this.state.password.trim().length <4)
        Alert.alert("password must be 4 characters long!!")
        else if(this.state.firstname.trim().length==0)
        Alert.alert("First Name can not be empty!!")
        else if(this.state.lastname.trim().length==0)
        Alert.alert("Last Name can not be empty")
        else if(this.state.email.trim().length==0)
        Alert.alert("Invalid email!!")
        else
       this.props.registerUser({username:this.state.username,password:this.state.password,firstname:this.state.firstname,lastname:this.state.lastname,email:this.state.email,mobilenum:this.state.mobilenum})
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

    handleemail=(val)=>{
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(val.match(mailformat))
        {
            this.setState({
                email:val,
                isValidemail:true
            })
        }
        else{
            this.setState({
                email:val,
                isValidemail:false
            })
        }
    }

    render() {
        
        return(
            <ScrollView>
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
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                    
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={val=>this.handleemail(val)}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                     { this.state.isValidemail ? null : 
                      <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>Invalid email.</Text>
                      </Animatable.View>
                      }
               
               
                <FontAwesome.Button name="check"  style={{alignSelf:'center'}}  backgroundColor="#3CD6D4" onPress={()=>this.handleRegister()}>
                                 Register
               </FontAwesome.Button>
            </View>
            </ScrollView>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterTab);