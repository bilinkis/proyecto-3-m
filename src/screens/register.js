import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
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
                style={styles.field}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                style={styles.field}
                keyboardType="default"
                placeholder="Password"
                SecureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
                />

                </Text>

                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleRegister(this.state.email, this.state.password)}>
                <Text>Registrate</Text>
                </TouchableOpacity>
            </View>


        )

}

}

const styles = StyleSheet.create({

})