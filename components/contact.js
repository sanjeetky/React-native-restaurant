import React,{Component} from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component{

    render()
    {
        return(
           
            <Card title="Contact Information">
                
              <Text>121, Clear Water Bay Road</Text>
              <Text>Clear Water Bay, Kowloon</Text>
              <Text>HONG KONG</Text>
              <Text>Tel: +917667433131</Text>
              <Text>Fax: +9877897879</Text>
              <Text>Email:sanjeetky1999@gmail.com</Text>
             </Card>
          
        )
    }
}
export default Contact;