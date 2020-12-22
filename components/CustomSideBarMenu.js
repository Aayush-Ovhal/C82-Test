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
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return( 
            <View>
                <View>
                    <DrawerItems
                     {...this.props}
                    />
                </View>
                <View>
                    <TouchableOpacity
                     onPress={
                        ()=>{
                            this.props.navigation.navigate("WelcomeScreen");
                            firebase.auth().signOut();
                            alert("Logged Out you Noob")
                        }
                     }
                    >
                        <Text>
                            LOG OUT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}