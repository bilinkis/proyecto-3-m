import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';
import Camera from '../components/Camera';


export default class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "",
            likes: [],
            liked: false,
            comments: [],
            photo:'',
            showCamera: true,
        }
    }

handlePost(){
    db.collection('posts').add({
        owner: auth.currentUser.email,
        email: auth.currentUser.email,
        description: this.state.content,
        createdAt: Date.now(),
        likes: [],
        comments: 0,
        photo: this.state.photo,    
    })
    .then(response => {
        this.setState({
            content: ""
        })
        this.props.navigation.navigate('Home'); //redireccionamos a Home
        })
        .catch(e=>{
            console.log(e)
        })
}

savePhoto(url){
    this.setState({
        photo: url,
        showCamera: false,
    })
}

render(){
    return(
            <>
            {this.state.showCamera ? 
            <Camera savePhoto = {(url)=>this.savePhoto(url)}/>
            :
            <>
        <View>
            {console.log(this.state.email)}
            <TextInput
            style={styles.input}
            keyboardType='default'
            placeholder='¿Qué vas a postear hoy?'
            multiline={true}
            numberOfLines={3}
            onChangeText={post=> this.setState({content:post})}
            value={this.state.content}            
            />
            <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                    <Text style = {styles.text}> Submit </Text>
            </TouchableOpacity>
        
        </View>
        </>
            }
        </>
    )
}


}

const styles = StyleSheet.create({
    input: {
        borderRadius: 25,
        backgroundColor: 'white',
        margin:10,
        height:50,
        fontSize: 14,
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
})

