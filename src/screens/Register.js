import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';



export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: '',
        }
}

render(){
        return(
            <View styles={styles.container}>
                <Text style={styles.title}>Registrate</Text>
                
                <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Username"
                onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="johndoe@gmail.com"
                onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Password (al menos 6 caracteres!)"
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                />

                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleRegister(this.state.email, this.state.password,this.state.username)}>
                <Text styles={styles.text}>Registrate</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.redirect} onPress={() => this.props.navigation.navigate('Login')}>
                <Text styles={styles.text}>¿Ya tenés cuenta? Iniciá sesión</Text>
                </TouchableOpacity>
            </View>


        )

}

}

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