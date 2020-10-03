import React,{Component} from 'react';
import { Text, ScrollView, View ,StyleSheet,Image} from 'react-native';
import {  FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-elements';
//import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}

  function History(props){
      return(
        <Card title="Our History">
        <Text style={styles.paragraph}>
         Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
        </Text>
        <Text style={styles.paragraph}>
         The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
        </Text>
      </Card>
      )
  }

  function Lead(props)
  {
    const renderleaders= ({item, index}) => {
        
        return (
         
            <View key={index} style={{margin: 10}}>
                 <Image source={{uri: baseUrl + item.image}}/>
                <Text style={{fontSize: 14}}>{item.name}</Text>
                <Text style={{fontSize: 12}}>{item.description} </Text>
            </View>
             
            
        );
    };


      return(
        <Card title='Our Leaders' >
          <FlatList
              data={props.leaders}
              renderItem={renderleaders}
          />
          </Card>
      )
  }

class About extends Component{

constructor(props)
{
  super();
}


    render()
    {
        
      if (this.props.leaders.isLoading) {
        return(
            <Loading />
        );
    }
    else if (this.props.leaders.errMess) {
        return(
            <View>            
                <Text>{this.props.leaders.errMess}</Text>
            </View>            
        );
    }
    else {
      
        return(
          
             <ScrollView>
               <History/>
               <Lead leaders={this.props.leaders.leaders}/>
            </ScrollView>
        )
    }
    }
}
export default connect (mapStateToProps) (About);
const styles = StyleSheet.create({
    paragraph: {
      margin: 10,
      fontSize: 10,
      textAlign: 'left',
      color: '#34495e',
    },
  });