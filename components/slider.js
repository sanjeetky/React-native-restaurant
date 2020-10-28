import React,{Component} from 'react';
import { Text, View,StyleSheet, Animated, Easing,Image,ScrollView,Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';


const mapStateToProps = state => {
    return {
      sliderimage:state.sliderimage
    }
  }

const {width}=Dimensions.get('window');
const height=width*60/100;


class Slider extends Component {

constructor(props)
{
    super();
   this.state={
         active:0,
         images:[]
   }
}
componentDidMount()
{
    this.setState({images:this.props.sliderimage.images})
}
change=({nativeEvent})=>{
    const slide=Math.ceil(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width);
    if(slide!==this.state.active)
    {
        this.setState({active:slide})
    }

}

render() {
  if (this.props.sliderimage.isLoading) {
    return(
        <Loading />
    );
}
else if (this.props.sliderimage.errMess) {
    return(
        <View>            
            <Text>{this.props.dishes.errMess}</Text>
        </View>            
    );
}
else
 {
    return(
        <View style={{marginTop:2,width,height}}>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{width,height}}
            onScroll={this.change}
          >
             {
                this.props.sliderimage.images.map((image,index)=>(
                     <Image 
                     key={index}
                     source={{uri:image.img}}
                     style={{width,height,resizeMode:'cover'}}
                    />
                 ))
             }
          </ScrollView>
          <View style={{flexDirection:'row',position:'absolute',bottom:0,alignSelf:'center' }} >
             {
                this.props.sliderimage.images.map((i,k)=>(
                    <Text key={k} style={k==this.state.active?{color:'#fff',margin:3}:{color:'#888', margin:3}}>&#9679;</Text>
                 ))
             }
             
          </View>
        </View>
    );
            }
           
}
}
export default connect (mapStateToProps,null)  (Slider);