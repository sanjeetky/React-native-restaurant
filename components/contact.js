import React,{Component} from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card,Button, Icon  } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import * as MailComposer from 'expo-mail-composer';
class Contact extends Component{

    sendMail() {
        try{
        MailComposer.composeAsync({
            recipients: ['NAME@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    catch(e){
        console.log(e);
    }
    }

    render()
    {
        return(
           
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}  useNativeDriver={true} >                
            <Card title="Contact Information">
                
              <Text>121, Clear Water Bay Road</Text>
              <Text>Clear Water Bay, Kowloon</Text>
              <Text>HONG KONG</Text>
              <Text>Tel: +917667433131</Text>
              <Text>Fax: +9877897879</Text>
              <Text>Email:sanjeetky1999@gmail.com</Text>
              <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
             </Card>
        </Animatable.View>
          
        )
    }
}
export default Contact;