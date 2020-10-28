import React,{Component} from 'react';
import { Text, View,StyleSheet, Animated, Easing,Image,ScrollView,Dimensions ,TouchableOpacity} from 'react-native';
import { Card ,Icon,Avatar,Badge} from 'react-native-elements';
import { connect } from 'react-redux';
import Slider from './slider'


const mapStateToProps = state => {
     return {
       cart:state.cart
     }
   }

class Home extends Component {

constructor(props)
{
    super();
   this.state={
         data:[]
   }
}

render() {
 
    return(
       <View style={{flex: 1}}>
          
           <ScrollView>
           <Slider/>

               

              <View style={{flexDirection:'row',margin:0,padding:0,left:0}}>
                  <View style={{width:180,margin:0,padding:0,left:-10}}>
                     <TouchableOpacity  onPress={() => this.props.navigation.navigate('Menu', { category:"grocery" })}> 
                     <Card >
                    <Card.Image   source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLeLdg-hgr-4Drs56t3_7J_wGXtLrRyyQRrQ&usqp=CAU'}}/>
                    <Text style={{alignSelf:'center'}}>Grocery</Text>
                     </Card>
                     </TouchableOpacity>
                   </View>
                  <View style={{width:180,right:35,margin:0,padding:0}}>
                      <TouchableOpacity  onPress={() => this.props.navigation.navigate('Menu', { category:"fruit" })}>
                      <Card >
                      <Card.Image   source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTa1ZLVSS2likNXIsynyhCOPpZvmqnphZO8Gw&usqp=CAU'}}/>
                      <Text style={{alignSelf:'center'}}>Fruits</Text>
                      </Card>
                      </TouchableOpacity>
                  </View>
              </View>


             <View style={{flexDirection:'row',margin:0,padding:0,left:0}}>
                  <View style={{width:180,margin:0,padding:0,left:-10}}>
                     <TouchableOpacity  onPress={() => this.props.navigation.navigate('Menu', { category:"vegetable" })} >
                     <Card >
                     <Card.Image   source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQt-ddJj9OQ4QGK8vexeTJGctGMXsfAzM8Fpw&usqp=CAU'}}/>
                     <Text style={{alignSelf:'center'}}>Vegetables</Text>
                     </Card>
                     </TouchableOpacity>
                   </View>
                   <View style={{width:180,right:35,margin:0,padding:0}}>
                     <TouchableOpacity    onPress={() => this.props.navigation.navigate('Menu', { category:"milkproduct" })}>
                     <Card >
                     <Card.Image   source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEUtVAScOUd31x3ju1KAI23vsVfku_blzWdg&usqp=CAU'}}/>
                     <Text style={{alignSelf:'center'}}>Milk Products</Text>
                     </Card>
                     </TouchableOpacity>
                   </View>
             </View>       

           </ScrollView>
           <View style={{position:'absolute',right:7,bottom:9,flexDirection:'column',justifyContent:'flex-end'}}>
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


export default connect (mapStateToProps,null) ( Home);



/*
  <View style={{marginTop:5,marginRight:5}}>
             <Avatar
               rounded
               icon={{ name: 'shopping-cart' }}
               size={'medium'}
               onPress={()=>navigation.navigate('Cart')}
             />

            <Badge
              status="success"
              containerStyle={{ position: 'absolute', top: 5, right: 3 }}
              value={0}
            />
          </View>

          */