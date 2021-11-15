import React, { Component } from 'react';
import {Text, TouchableOpacity, View, StyleSheet, TextInput, FlatList} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { auth } from '../firebase/config';
import { db } from '../firebase/config';
import Post from '../components/Post'



export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            posts:[],
            loading:true,
        }
}

    search(){
        let searchQuery = this.state.searchQuery;
        db.collection('posts').where('email','==',searchQuery).onSnapshot(
            docs => {
                console.log(docs)
                let postsAux = []
                docs.forEach( doc => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    console.log(postsAux)
                })
                this.setState({
                    posts: postsAux,
                    loading:false
                })
            }
        )
    }
    render(){
    return(
        <View styles={styles.container} >
            <NavigationBar title={{title:'Hola '+ auth.currentUser.displayName+'!'}} rightButton={{title: 'Logout',styles:styles.button,handler: () => this.props.handleLogout()}} leftButton={{title: 'Home',styles:styles.button,handler: () => this.props.navigation.navigate('Home')}}/>
            
                
            <React.Fragment>
            <Text style={styles.title}>Search page</Text>
            
                
                <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="insert the email here"
                onChangeText={text=>this.setState({searchQuery: text})}              
                />
                
            
            <TouchableOpacity style = {styles.button} onPress={() => this.search(this.state.searchQuery)}>
                    <Text style = {styles.text}> Search </Text>
            </TouchableOpacity>
            </React.Fragment>
            {
            this.state.loading === false && this.state.posts.length > 0 ?
            <React.Fragment>
                
            <Text style={styles.title}>Search results</Text>
            <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()} //pasa el ID a String
                renderItem = { ({item}) => // Es como un map, imprime los posts y le pasa la info en {item}
                    <Post item = {item}></Post> }
                />
                </React.Fragment>
                :
                this.state.loading === false && this.state.posts.length === 0 ?
               <Text style={styles.error}>No results</Text>
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
        height:50,
        fontSize: 12,
        justifyContent: 'space-evenly',
        padding: 10,
    },
    button:{
        borderRadius: 25,
        backgroundColor: 'white',
        fontSize: 12,
        width: 100,
        height: 50,
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