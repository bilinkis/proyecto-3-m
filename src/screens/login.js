import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


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
        <View styles={styles.container} >
            <Text style={styles.title}>Iniciá sesión</Text>
            
                
                <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="johndoe@gmail.com"
                onChangeText={text=>this.setState({email:text})}              
                />
                <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text=>this.setState({password:text})}              
                />
            
            <TouchableOpacity style = {styles.button} onClick={() => this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style = {styles.text}> Iniciá sesión </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.redirect} onClick={() => this.props.navigation.navigate('Registro')}>
                    <Text style = {styles.text}> ¿No tenés cuenta? Registrate </Text>
            </TouchableOpacity>


        </View>        
    )
}}

const styles = StyleSheet.create({
    container:{
       padding: 20,
    },
    input: {
        borderRadius: 25,
        backgroundColor: 'white',
        margin:10,
        height:'12%',
        fontSize: 12,
        justifyContent: 'space-evenly',
        padding: 10,
    },
    button:{
        borderRadius: 25,
        backgroundColor: 'white',
        fontSize: 12,
        width: '50%',
        height: '25%',
        justifyContent: 'space-evenly',
        padding: 2,
        marginTop:40,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    text: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
    },
    redirect:{
        marginTop:10,  
    },
    title:{
        padding:10,
        justifyContent: 'space-around',
        fontSize: 25,
        alignItems: 'center',
        fontWeight: 'bold',

    }
})