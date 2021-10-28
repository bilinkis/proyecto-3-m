import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';

export default class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: ""
        }
    }

handlePost(){
    db.collection('posts').add({
        owner: auth.currentUser.displayName,
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
            <TextInput
            styles={styles.input}
            keyboardType='default'
            placeholder='¿Qué vas a postear hoy?'
            multiline={true}
            numberOfLines={3}
            onChangeText={post=> this.setState({content:post})}
            value={this.state.content}            
            />
        <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                    <Text style = {styles.text}> Publicar </Text>
                </TouchableOpacity>
        </View>
    )
}


}