import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase/config';
import Registro from './register';


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
            <TouchableOpacity style = {styles.button} onClick={() => this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style = {styles.text}> Iniciá sesión </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onClick={() => this.props.navigation.navigate('Registro')}>
                    <Text style = {styles.text}> ¿No tenés cuenta? Registrate </Text>
            </TouchableOpacity>


        </View>        
    )
}}

const styles = StyleSheet.create({

})