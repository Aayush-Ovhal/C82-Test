import React from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import {Cards} from 'react-native-elements';

import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class RecieverDetailScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            recieverId: this.props.navigation.getParam("Details")['user_id'],
            requestId: this.props.navigation.getParam("Details")['request_id'],
            bookName: this.props.navigation.getParam("Details")['book_name'],
            reaToRe: this.props.navigation.getParam("Details")['reason_to_request'],
            recieverName: "",
            recieverContact: "",
            recieverAddress: "",
            recieverDocId: ""
        }
    }

    getRecieverDetails = async()=>{
        db.collection("users").where("email_id", "==", this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverName: doc.data().first_name,
                    recieverContact: doc.data().contact,
                    recieverAddress: doc.data().address
                })
            })
        })
    }

    updateBookDetails = async()=>{
        db.collection('all_donations').add({
            book_name           : this.state.bookName,
            request_id          : this.state.requestId,
            reciever_name        : this.state.recieverName,
            user_id          : this.state.userId,
            request_status      :  "Donor Interested"
        })

    }

    render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Book Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBookStatus()
                    this.props.navigation.navigate('MyDonations')
                  }}>
                <Text>I want to Donate</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}