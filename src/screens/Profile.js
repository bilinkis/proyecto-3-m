import React, { Component } from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import { auth, db } from '../firebase/config';
import NavigationBar from 'react-native-navbar';
import Post from '../components/Post';



export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts:[],
            loading:true,
        }
}
    
    componentDidMount() {
        db.collection('posts').where('email','==',auth.currentUser.email).onSnapshot(
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
    console.log(auth.currentUser.metadata.lastSignInTime)
        return(
            <View styles={styles.container}>
                <NavigationBar title={{title:'Hola '+ auth.currentUser.displayName+'!'}} rightButton={{title: 'Logout',styles:styles.button,handler: () => this.props.handleLogout()}} leftButton={{title: 'Home',styles:styles.button,handler: () => this.props.navigation.navigate('Home')}}/>
                <Text style={styles.title}>Mi Perfil</Text>
                <Text style={styles.description}>Tu usuario es: {auth.currentUser.displayName}</Text>
                <Text style={styles.description}>Tu email es: {auth.currentUser.email}</Text>
                <Text style={styles.description}>El último acceso a la cuenta fue: {String(new Date(auth.currentUser.metadata.lastSignInTime))}</Text>
                <Text style={styles.description}>Hiciste {this.state.posts.length} {this.state.posts.length != 1 ? "posteos!":"posteo!"}</Text>
                <Text style={styles.title}>Tus Posts</Text>
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
    container:{
        padding: 20,
     },
     description:{
         alignSelf: 'center',
         fontSize:16,
     },
     text: {
         marginLeft: 'auto',
         marginRight: 'auto',
         alignSelf: 'center',
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