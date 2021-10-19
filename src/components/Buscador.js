import React from 'react';
import {Text, Image, View, Stylesheet} from 'react-native';
import React, { Component } from 'react';
import { TextInput } from 'react-native-gesture-handler';


export default class Buscador extends Component () {

    constructor(props){ 
        super(props);
    
        }

   render(){
    return(

        <View>

        <TextInput
        style={styles.buscador}
        keyboardType= 'default'
        placeholder='¿Qué estás buscando?'
       /* onChangeText= */
        
        />

        </View>

    )
   } 

}