import React, { Component } from 'react';
import { Text,View, FlatList, ScrollView ,TouchableOpacity,RefreshControl, ToastAndroid} from 'react-native';
import { Card,Icon} from 'react-native-elements';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import {deletecartitem,fetchCart} from '../redux/ActionCreators';
import { FontAwesome } from '@expo/vector-icons';


const mapDispatchToProps = dispatch =>({
    deletecartitem:(item)=>dispatch(deletecartitem(item)),
    fetchCart:(user)=>dispatch(fetchCart(user))
})

const mapStateToProps = state => {
    return {
      cart:state.cart,
      user:state.user
    }
  }

class Cart extends Component {
constructor(props)
{
    super();
    this.state={
        fruits:[],
        data:[],
        refresh:false
    }
}

componentWillReceiveProps(nextProps) {
    
    if (this.props.cart.cart !== nextProps.cart.cart) {
      //  this.onRefresh()
        ToastAndroid.show("Please Refresh the Page for Better Experience!!",ToastAndroid.SHORT)
        this.setState({
            fruits: nextProps.cart.cart,
        });
    }
}
componentWillMount()
{
 
    this.setState({fruits:this.props.cart.cart})
}

removeitem(item)
{
  this.props.deletecartitem(item)
}

minus(item)
{
   if(item.quantity>1)
   {
    const elementsIndex = this.state.fruits.findIndex(element => element.itemid == item.itemid )
    let newArray = [...this.state.fruits]
        newArray[elementsIndex] = {...newArray[elementsIndex], quantity: +newArray[elementsIndex].quantity -1 }
        this.setState({
            fruits: newArray,
            });
    }
};
plus(item)
{
    
    const elementIndex = this.state.fruits.findIndex(element => element.itemid == item.itemid )
    let newArrayy = [...this.state.fruits]
        newArrayy[elementIndex] = {...newArrayy[elementIndex], quantity:  + newArrayy[elementIndex].quantity  +1 }
        this.setState({
            fruits: newArrayy,
            });
}
   

onRefresh()
{
    this.setState({refresh: true},()=>{this.setState({refresh:false}), this.props.fetchCart({username:this.props.user.user.username});});
}

    render() {
        
      const RenderItems = ({item,index})=>{
          // this.state.data.push(item);
           return (
            <Card style={{position:'relative'}}  >
                <Card.Image style={{resizeMode:'contain'}} source={{uri:item.img}} />
                <Text style={{alignSelf:"center"}} >{item.name}</Text>
                <Text>Rs:{item.cost} /{item.weight}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text>Quantity:</Text>
                <Button  onPress={()=>this.minus(item)} icon='minus'/>
                 <Button>
                      {item.quantity}
                 </Button>
                 <Button icon='plus'  onPress={()=>this.plus(item)}/> 
                   
                </View>
                <Button icon='close' style={{position:'absolute',right:0,marginTop:0,marginRight:0,top:0}} onPress={()=>this.removeitem(item)}/>
            </Card>
        )
    };

       
    if(this.props.user.user.username==null)
    {
        return(<Text>Please Login</Text>)
    }
    else if(this.props.cart.isLoading)
    {
        return(
            <Loading />
        );
    }
    else if (this.props.cart.errMess) {
        return(
            <View>            
                <Text>{this.props.cart.errMess}</Text>
            </View>            
        );
    }
    else {
        return (
            <View style={{flex:1}}>
           <ScrollView  
            refreshControl={
         <RefreshControl
      refreshing={this.state.refresh}
      onRefresh={() => this.onRefresh()}
      tintColor="red"
            />} >
            <FlatList 
           
            data={this.state.fruits}
            renderItem={RenderItems}
            keyExtractor={item => item.id}
        
        />
        <Card style={{alignItems:'center' ,backgroundColor:'green'}}>
            <Text style={{alignSelf:'center'}}>PRICE DETAILS</Text>
            <Text>Delivery Charge:5</Text>
             <Text>Total Amount:{5+this.state.fruits.reduce((total,item)=>{return total+ (item.cost*item.quantity) },0)}</Text>
             <Button icon='cart' style={{backgroundColor:"#50C7C7"}} onPress={()=> this.props.navigation.navigate('Delivery',{data:this.state.fruits})}>CheckOut</Button>
        </Card>
       
        </ScrollView>
          <View style={{position:'absolute',right:5,bottom:5,flexDirection:'row',justifyContent:'flex-end'}}>
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
}

export default connect  (mapStateToProps,mapDispatchToProps) (Cart);

