import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase/config';


export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
}


    render(){
    return(
        <View>
            <Text>
                <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text=>this.setState({email:text})}              
                />
                <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Password (al menos 6 caracteres!)"
                secureTextEntry={true}
                onChangeText={text=>this.setState({password:text})}              
                />
            </Text>
            <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style = {styles.text}> Iniciá sesión </Text>
            </TouchableOpacity>



        </View>        
    )
}}

const styles = StyleSheet.create({

})