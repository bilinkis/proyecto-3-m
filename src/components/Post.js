import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, Modal } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { farHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { fasHeart } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';
import {auth, db} from '../firebase/config';

export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: false,
            likes:0,
            modal: true,

        }
    }

    componentDidMount(){
        if(this.props.item.data.likes.length !== 0 ){
            this.setState({
                likes: this.props.item.data.likes.length
            })
            if (this.props.item.data.likes.includes(auth.currentUser.email)){
                this.setState({
                    liked: true,
                })
            }
        }

    }

    handleLikes(){
        console.log(this.props.item.id)
        const actualizamosPost = db.collection('posts').doc(this.props.item.id)
        actualizamosPost.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.displayName)

        })
        .then(()=>{
            this.setState({
                liked: true,
                likes: this.state.likes +1
            })

        })
        
    }
    handleDislikes(){
        console.log('se dislikea')
        const actualizamosPost = db.collection('posts').doc(this.props.item.id)
        actualizamosPost.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.displayName)

        })
        .then(()=>{
            this.setState({
                liked: false,
                likes: this.state.likes -1
            })

        })
        
    }


   render(){
       console.log(this.props)
       return(
    <View styles={styles.container}>
        <Text>{this.props.item.data.description}</Text> {
            ! this.state.liked ?
            <TouchableOpacity onPress={() => this.handleLikes()}><Text><FontAwesomeIcon icon={faHeart}/></Text></TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.handleDislikes()}><Text><FontAwesomeIcon icon={faHeart}/></Text></TouchableOpacity>
 

        }
        <Text>Likes: {this.state.likes}</Text>
        <Text>{this.props.item.data.createdAt}</Text>
        <Text>{this.props.item.data.owner}</Text>
        <Modal visible={this.state.modal}
        animationType='fade'
        transparent= {true}>
                <Text>Acá va el modal</Text>
        </Modal>
    </View>
)}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
   
})