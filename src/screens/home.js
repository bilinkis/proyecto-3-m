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
                <Text>Hola {auth.currentUser.username}!</Text>
                </>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Cerrar sesión </Text>
                </TouchableOpacity>
                {/*<Text>Ups! Todavía no hay posts disponibles</Text>*/}
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) => 
                    <Post item = {item}></Post> }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

})