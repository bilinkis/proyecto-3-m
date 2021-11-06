import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import NavigationBar from 'react-native-navbar';
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
                <NavigationBar title={{title:'Hola '+ auth.currentUser.displayName+'!'}} rightButton={{title: 'Logout',styles:styles.button,handler: () => this.props.handleLogout()}} leftButton={{title: 'Home',styles:styles.button,handler: () => this.props.navigation.navigate('Home')}}/>
                {//<Text> Home </Text>
                //<Text style={styles.title}></Text>
            }
                </>
    
                {//<TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
               //     <Text style = {styles.text}> Cerrar sesión </Text>
             //   </TouchableOpacity>
    }
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
})