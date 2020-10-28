
// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {Component} from 'react';
import { connect } from 'react-redux';
const mapStateToProps = state => {
    return {
      cart:state.cart,
      user:state.user,
      dishes:state.dishes
    }
  }
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  Alert
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
class Search extends Component{
    constructor(props)
    {
        super();
        this.state={
            filteredDataSource:[],
            masterDataSource:[],
             search:'',
            
        }
    }
    componentDidMount(){
  
       this.setState({filteredDataSource:this.props.dishes.dishes,masterDataSource:this.props.dishes.dishes}) 
  }
    render()
    {
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData =this.state. masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
       this.setState({ filteredDataSource:newData});
      this.setState({search:text});
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      this.setState({filteredDataSource:this.state.masterDataSource});
      this.setState({search:text});
    }
  }; 

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.itemid })}>
          {item.name.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

 

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
          containerStyle={{backgroundColor:'#B2EBEB'}}
          inputContainerStyle={{backgroundColor:'#E1F2F2'}}
        />
        <FlatList
          data={this.state.filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
});

export default  connect  (mapStateToProps,null)(Search);