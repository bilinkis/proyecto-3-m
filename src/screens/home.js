import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { auth } from '../firebase/config';
import Post from '../components/Post';
import { db } from '../firebase/config';


export default class Home extends Component {
    constructor(props){
            super(props);
            this.state = {
                posts:[],
            }
        }
        componentDidMount(){
            db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
                docs => {
                    let postsAux = []
                    docs.forEach( doc => {
                        postsAux.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    this.setState({
                        posts: postsAux
                    })
                }
            )
        }
    render(){
        return(
            <View style = {styles.container}>
                <>
                <Text> Home </Text>
                <Text style={styles.title}>Hola {auth.currentUser.displayName}!</Text>
                </>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Cerrar sesión </Text>
                </TouchableOpacity>
                {/*<Text>Ups! Todavía no hay posts disponibles</Text>*/}
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()} //pasa el ID a String
                renderItem = { ({item}) => // Es como un map, imprime los posts y le pasa la info en {item}
                    <Post item = {item}></Post> }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        padding:10,
        justifyContent: 'space-around',
        fontSize: 25,
        alignItems: 'center',
        fontWeight: 'bold',
 
     }
})