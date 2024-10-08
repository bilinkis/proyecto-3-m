import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';
import Register from './Register';


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
            
            <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style = {styles.text}> Iniciá sesión </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.redirect} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style = {styles.text}> ¿No tenés cuenta? Registrate </Text>
            </TouchableOpacity>

{
    this.props.error ?
    <Text style={styles.error}>Debe completar todos los campos</Text>
    :
    <React.Fragment></React.Fragment>
}

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
        zIndex:1

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

    },
    error:{
        padding:10,
        fontSize:20,
        color:'red',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})