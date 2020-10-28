import React, { Component } from 'react';
import { Text,View, FlatList, ScrollView ,TouchableOpacity,Dimensions} from 'react-native';
import Reservation from './ReservationComponent';
import { Tile ,Card,Icon,Badge,Avatar} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      cart:state.cart
    }
  }

class Menu extends Component {
constructor(props)
{
    super();
}

   
    render() {
        const category= this.props.route.params.category;

    const RenderItems = ({item,index})=>{
        
           return (
             
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.itemid })}  >
               <View  style={{width:170,left:-10}} >
               <Card    image={{uri:item.img}}  >
                    
                <Text style={{alignSelf:"center"}} >{item.name}</Text>
              </Card>
              </View>
            </TouchableOpacity>
      
        )
    };

       
    

    if (this.props.dishes.isLoading) {
        return(
            <Loading />
        );
    }
    else if (this.props.dishes.errMess) {
        return(
            <View>            
                <Text>{this.props.dishes.errMess}</Text>
            </View>            
        );
    }
    else {
        return (
            <View style={{flex:1}} >
            <FlatList
            data={this.props.dishes.dishes.filter((item)=>item.category==category)}
            renderItem={RenderItems}
            keyExtractor={item => item.id}
            numColumns={2}
            horizontal={false}
           
           />

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

}


export default connect(mapStateToProps,null) (Menu);

/*<Animatable.View animation="fadeInDownBig" duration={2000}  useNativeDriver={true} >     
            <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}
            imageSrc={{ uri: baseUrl + item.image}}
          
          />
          </Animatable.View>*/