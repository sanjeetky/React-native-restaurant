import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,form,input, Picker, Switch,Modal,Input,TextInput,Image, Alert, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {  Notifications } from 'expo';
import {Button} from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { baseUrl } from '../shared/baseUrl';


import { Asset } from 'expo-asset';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import Constants from 'expo-constants';
/* if you want  to run on web then import Modal from modal-r*/
const sample = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXMzMzPz8+SkpLLy8u8vLzHx8fBwcGhoaGWlpaRkZGsrKylpaW5ubmwsLDIyMipqambm5sQ5GzmAAAFGUlEQVR4nO2d23LkKBBEVdzFRfD/X7tZIKnbE+udmAdvayLyRNjCEuBKCgr0Uto2QgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEELIzyLyVpR/u/3bdtuftPvfCbXVsKzytbVw3nYo/petBypUO2vIgXZ13ZbQmvtBa/8cm1MyKfUDxjUUTep6+4habPbbdn5ohTh1hVkuXrvTPmZvT0HqPnLLw+RNHEzTYoOh3cQG7fW7dhiB2Foxxk+BpbVoIu63NFrT3h6DxOSw+Goa3pbUtlUUlwamaN3jNU/X4notU5eiFbHFNNmaKSj7tIftGAbdBXTxGTn/gsBSvY7kw5h2QaiTtjfVEvfTUrcnlCTv5ZRY9yo6A0wRG6FK5zjUulkB9epjwo2tDgrhgHGEJVY65mY0M+Bkc1qqzsLUTOmKQ76q9jkSduxz2VXTJZs5Mlr8gJhvOXwdmKD+DIeqcOzTs9Xk01KstaD2vzWzPmSdjratSg2Vi5lx1JvxKIV5N0mNnItMMFmDTfu08OULqOt+fFleHkFTV+u5Rm3cnYzl+2NPj1KIAJ9SPjeGgFgq1iwLXbrWHfSksqbgBfaLBInXX4i+m4w1jY9kHqUQcbClFRt0O4PbjkuhuRXqOIxf2m0hmtOtbpjon6lwWYJJCC1yFChF2HjN0pfCML6swrV7wI+68DAw+zwznBHqGqEn4M9TWjDY+iCi+OnKMzy2t3mJ/X+8jjj1VKthSZfgcHMRd1Pv3h5C3ZepahN05XXcsmWfwvt+H2qwDqN57XJxBVtVKDbv0S+friGRJ+0WIZW5CWqoz6/D1rLUDnMdMHWneD+q5H06DeE14BQUr2rLeZcrn4E6RhA0UziiHsRknsx0y5jHscsVU11/rUSc2rzI0U1RT3s5G+J8Uzc98z3o1FbxgtAjdgvd1OPC6WlmFNy93oPsFIdxuCzH2W6UMvSQY+928HvFplJSat/9v0+AN4EdLwQY+d0s5pkU7xgp3i96blevSN/jdccXvDGNEnR7v9qpx+vA7UcJhK3OBb+uJ9NRAdfXVuHCWfUOpxYVgq4/HG1PtI74dSWEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEkD/kMQkTf4yZcrf+nSnbfK3u96nIZzLoX9KyT70B7WsNMnMs41e4ktt5NwcEj/FE09nJp3LauV5zW5kjz7yuV+5heSstheGqNX+K/opHbQUKNWNoSE76mYPRl1az3Y7SWvESu938yJ+Z664KPNQK7IB1VUKTUEqFgB6tK8VttpfeZwLTorWyEztT0xYdlyjaAko72uNRXgolz/T9WllCltictPY5haGHvIUumG3RwlHF24xxd+K7PfT2VqcPaxeXcXNzmiQSgsCQbSostYVc661wpauVuMrR9wP/5EMKR+yhOvWGzbm6LpJKHF5t9CnGMY0+16HW2iBlJjYvHsRTYYTPw5vCmSJ2XWzBU3TtP+dDETgFPtx69xlmYMJ5OxVmK0Ha7cOsM24Lsb2tw1sh+lCFh67fKrVZjTq42FbxNDT/OYWbpn0u+pmH3DasO4iNeSrcXIltrsNyr0NNwnv656tC/T4BFM6crpgPLaKTTS9t9oXx+mgaYjmD5vb6WsJbSe6PKEyh7Q66b5H11dHqRa4uv0TpvwHJ5TnphH8G+/0nTgghfw//AP4bKU0UJm5wAAAAAElFTkSuQmCC';

const mapStateToProps = state => {
    return {
      user:state.user
    }
  }
class Reservation extends Component {

    constructor(props) {
        super();

        this.state = {
           imageuri:sample,
           items:[],
           detail:""
        }
    }


    static navigationOptions = {
        title: 'Reserve Table',
    };

     selectfile=async()=>
    {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
         
      
          if (!result.cancelled) {
            this.processImage(result.uri)
          }
    }

    processImage = async imageUri => {
        let processedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 320 } }],
          { format: 'jpeg' }
        );
        console.log(processedImage);
        this.setState({ imageuri: processedImage.uri });
      };
       
   submitkaro=async ()=> 
  {
   const img=this.state.imageuri;
    let filename = img.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log({ uri: img, name: filename, type })
      const payload=new FormData();
      let mobile=this.props.user.user.mobilenum;
      let details=this.state.detail;
      payload.append('image', { uri: img, name: filename, type});
      payload.append('mobilenum',mobile);
      payload.append('details',details);
  
     return  fetch(baseUrl+'/customorder',{
        method:"POST",
        body:payload,
        header: {
            'content-type': 'multipart/form-data',
            'Accept': 'application/json, text/plain, */*', 
          },
          credentials: 'same-origin'
       
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
            if(data.success==true)
            {
                ToastAndroid.show("succesfully submitted",ToastAndroid.SHORT)
                this.setState({
                    imageuri:sample,
                    detail:""
                })
              
            } 
            else{
                ToastAndroid.show("Failed to submit!! Please try later!",ToastAndroid.SHORT)
            }
        })
    .catch(err=>console.log(err))
  }

    render() {
        return(
           <ScrollView>
               <Text style={{alignSelf:'center'}}>Create Custom Order</Text>
               <Card>
                   <Text style={{alignSelf:'center',margin:10}}>
                      Enter Required detail of product and leave the rest on us!!
                   </Text>
               

                   <View >
                    <Image 
                        source={{uri:this.state.imageuri}} 
                         style={{  margin: 10,  width: 200, height: 150,alignSelf:'center'}} 
                        />
                    <Button
                        title="Camera"
                        icon='camera'
                        onPress={this.selectfile}
                        color={'#fff'} style={{alignSelf:'center', backgroundColor:"#7f89df",marginBottom:10,marginTop:10,paddingLeft:10,paddingRight:10}} 
                      >
                          Upload Image
                          </Button>
                </View>

               <TextInput
               style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
               onChangeText={text => this.setState({detail:text})}
               value={this.state.detail}
               placeholder={" enter product details..."}
             />

             <Button
              icon='check'
               onPress={this.submitkaro}
              color={'#fff'} style={{alignSelf:'center', backgroundColor:"#7f89df",marginBottom:10,marginTop:10,paddingLeft:10,paddingRight:10}} 
              >
                 Submit
             </Button>

             </Card>
             <Card>
                 <Text style={{alignSelf:'center'}}>
                     You will be notified through your registered contact number about the availabilty of this product!!
                 </Text>
                 <Text style={{alignSelf:'center',marginTop:10}}>
                     Till then Relax!! We are working on your order
                 </Text>
             </Card>
              
              
           </ScrollView>

        );
    }

};


export default connect (mapStateToProps,null)  (Reservation);



