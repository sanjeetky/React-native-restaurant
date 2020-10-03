import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,Modal, StyleSheet,Button, TextInput } from 'react-native';
import { Card ,Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import {postComments} from '../redux/ActionCreators';
import Stars from 'react-native-stars';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComments:(comments)=>dispatch(postComments(comments))
})

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                          <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'pencil-square' : 'pencil-square-o'}
                        type='font-awesome'
                        color='orange'
                        onPress={() => props.onComment()}
                        />
                </Card>
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
            username:"",
            usercomment:"",
            stars:2
        };
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    toggleModal(){
        this.setState({showModal:!this.state.showModal})
    }
    submitComment(dishID){
    
        this.props.postComments(({id:20,dishId:dishID,rating:this.state.stars,comment:this.state.usercomment,author:this.state.username,date:new Date().toLocaleString()}));
    }
    resetform()
    {
        this.setState({
            username:"",
            usercomment:"",
            stars:2
        })
    }
  
    render() {
        console.log(this.props);
        const dishId = this.props.route.params.dishId;
        return(
          <ScrollView>
           <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    onComment={()=>{this.submitComment(dishId);this.resetform()}}
                    />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            <Modal animationType = {"slide"} transparent = {false}
                    visible= {this.state.showModal}
                    onDismiss = {() => this.toggleModal()}
                    onRequestClose = {() => this.toggleModal()}>
                  
                  <View style={{alignItems:'center'}}>
                  <Stars
                    default={2}
                    count={5}
                    half={true}
                    update={(val)=> this.setState({stars: val})}
                    starSize={50}
                    fullStar={<Icon name={'star'} type='font-awesome'/> }
                    emptyStar={<Icon name={'star-o'} type='font-awesome'/>}
                    halfStar={<Icon name={'star-half-o'} type='font-awesome'/>}
                  />
                </View>
                <View style={styles.formRow}>
              
                  <TextInput
                    style={styles.formLabel}
                    placeholder="@Name"
                    onChangeText={text => this.setState({username:text})}
                    value={this.state.username}
                   />
                </View>
                <View style={styles.formRow}>
              
                  <TextInput
                    style={styles.formLabel}
                    placeholder="@Comment"
                    onChangeText={text => this.setState({usercomment:text})}
                    value={this.state.usercomment}
                   />
                </View>
               
                
                <View style={styles.formRow}>
                <Button
                    onPress={() => {this.submitComment(dishId);this.resetform();this.toggleModal()}}
                    title="Submit"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                </Modal>
          </ScrollView>
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