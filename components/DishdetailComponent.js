import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,Modal, StyleSheet,ToastAndroid, TextInput,Alert, PanResponder, Share, CheckBox, TouchableHighlightBase  } from 'react-native';
import { Card ,Icon,Badge,Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import {Button} from 'react-native-paper';
import { postcart } from '../redux/ActionCreators';
import {postComments} from '../redux/ActionCreators';
import { FontAwesome } from '@expo/vector-icons';


import Stars from 'react-native-stars';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      user:state.user,
      cart:state.cart
    }
  }
  const mapDispatchToProps = dispatch => ({
  
    postComments:(comments)=>dispatch(postComments(comments)),
    postcart:(item)=>dispatch(postcart(item))
})




  class RenderComments extends Component{
        constructor(props){
          super();
          this.state={
            coment:""
          }
        }
render(){
    const comments =this. props.comments;
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
 
    return (
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}  useNativeDriver={true} > 
        <Card title='Comments' >

         
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id}
            />


        <View style={{flexDirection:'row',position:'relative'}}>
           <TextInput
            style={{ height: 40,width:180  ,borderBottomColor: 'gray', borderBottomWidth:1,left:0 }}
            onChangeText={text=>this.setState({coment:text})}
            value={this.state.coment}
            placeholder={"Type your comment..."}
         />
         <Button  color={'#fff'} style={{position:'absolute',right:0,backgroundColor:"#7f89df"}} onPress={()=>this.props.post(this.props.id,this.state.coment)}>
           POST
         </Button>
           </View>
        </Card>

       </Animatable.View>
    );
}
  }



function RenderDish(props) {

    const dish = props.dish;
   
        if (dish != null) {
            return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}  useNativeDriver={true} >
                <Card
                image={{uri: dish[0].img}}
                >
                    <Text style={{margin:2}}>{dish[0].name}</Text>
                    <Text style={{margin: 2,marginBottom:15}}>
                        {dish[0].description}
                    </Text>
                  
                  
                          <Button icon="cart-plus"    onPress={()=>props.onPress()} color={'#fff'} style={{alignSelf:'center', backgroundColor:"#7f89df",marginBottom:10,marginTop:10,paddingLeft:10,paddingRight:10}} >
                                 Add to Cart
                          </Button>
                 
                       
                </Card>
            </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}
class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal:false,
            username:""
        };
    
    }
   
 
    addtocart(item)
    {
        if(this.props.user.user.username!=null)
        {
           this.props.postcart({item:item[0],username:this.props.user.user.username})
        ToastAndroid.show("Successfully Added",ToastAndroid.SHORT)
        }
        else
        ToastAndroid.show("Please Login",ToastAndroid.SHORT)
    }

    submitComment=(id,coment)=>{
    
      if(this.props.user.user.username!=null)
      {
        this.props.postComments(({itemid:id,comment:coment,author:this.props.user.user.username,date:new Date().toLocaleString()}));
      }
      else
      {
        ToastAndroid.show("Please Login",
        ToastAndroid.SHORT)
      }
    }


    render() {
        console.log(this.props);
        const dishId = this.props.route.params.dishId;
        const item=this.props.dishes.dishes.filter((item)=>item.itemid==dishId);
        return(
          <View style={{flex:1}}>
          <ScrollView>
           <RenderDish dish={this.props.dishes.dishes.filter((item)=>item.itemid==dishId)}
                  
                    onPress={() => this.addtocart(item)} 
                    onComment={()=>{this.toggleModal();this.resetform()}}
                                     />
            <RenderComments    post={this.submitComment}    id={dishId}                   comments={this.props.comments.comments.filter((comment) => comment.itemid === dishId)} />
    
                  
               
          </ScrollView>
               

          <View style={{position:'absolute',right:5,bottom:5,flexDirection:'column',justifyContent:'flex-end'}}>
                       <Icon
                            raised
                            reverse
                            name='search'
                            type='font-awesome'
                            color='#F2D73F'
                            onPress={()=>this.props.navigation.navigate('Search')}
                            size={21}
                             iconStyle={{color:'black',fontSize:18}}
                            />
          </View>

          </View>
        );
    }
}


const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
       borderColor:'white',
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
        borderWidth:0,
        borderColor:'#fff'
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     },
     myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
      },
      myEmptyStarStyle: {
        color: 'white',
      }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);



/*  <Icon
                        raised
                        reverse
                        name={ false ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => false ? props.delfav() : props.onPress()}
                        />


                        
                          <Icon
                        raised
                        reverse
                        name={false ? 'pencil-square' : 'pencil-square-o'}
                        type='font-awesome'
                        color='orange'
                        onPress={() => props.onComment()}
                        />
                        */