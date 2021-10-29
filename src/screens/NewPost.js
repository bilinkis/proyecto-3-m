import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import Home from './home';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "",
            likes: 0,
            liked: false,
        }
    }

handlePost(){
    db.collection('posts').add({
        owner: auth.currentUser.displayName,
        likes: this.state.likes,
        description: this.state.content,
        createdAt: Date.now()
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

render(){
    return(
        <View>
            {console.log(this.state.email)}
            <TextInput
            styles={styles.input}
            keyboardType='default'
            placeholder='¿Qué vas a postear hoy?'
            multiline={true}
            numberOfLines={3}
            onChangeText={post=> this.setState({content:post})}
            value={this.state.content}            
            />
        <TouchableOpacity styles={styles.button} onPress={() => this.handlePost()}>
                    <Text > Publicar </Text>
                </TouchableOpacity>
        </View>
    )
}


}

const styles = StyleSheet.create({
    input: {
        borderRadius: 25,
        backgroundColor: 'white',
        alignContent: 'center',
        fontSize: 12,
        width: '50%',
        height: '150%',
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
})