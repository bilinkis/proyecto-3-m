import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { auth } from '../firebase/config';


export default class Home extends Component {
    constructor(props){
            super(props);
            this.state = {
                posts:[],
            }
        }
componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot( //onSnapshot actualiza los datos
        docs => {
            let postsAux = [] //Variable auxiliar
            docs.forEach( doc => { //se recorre el array
                postsAux.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: postsAux
            })
        }

    )}
    render(){
        return(
            <View style = {styles.container}>
                <Text> Home </Text>
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()} //pasamos el id a String
                renderItem = { ({item}) => 
                    <Post item = {item}></Post> }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

})