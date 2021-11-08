import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, Modal, FlatList, TextInput } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase';
import {auth, db} from '../firebase/config';

export default class Post extends Component{

    constructor(props){
        super(props);
        this.state = {
            liked: false,
            likes:0,
            modal: true,
            comments:0,

        }
    }
    
    componentDidMount(){
        if(this.props.item.data.likes.length !== 0 ){
            this.setState({
                likes: this.props.item.data.likes.length
            })
            
        }

    }
    componentWillUpdate(){
        if(this.state.liked === false){
        if (this.props.item.data.likes.includes(auth.currentUser.displayName)){
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
        console.log('se dislikea', this.props.item.id)
        const actualizamosPost = db.collection('posts').doc(this.props.item.id)
        console.log(actualizamosPost)
        actualizamosPost.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.displayName)

        })
        .then(()=>{
            this.setState({
                liked: false,
                likes: this.state.likes -1
            })

        })

        

        
    }
    showModal(){
        this.setState({
            modal: true, //muestra modal
        })
    }

    closeModal(){
        this.setState({
            modal: false, //oculta moda
        })
    }

    postComment(){
        
        let comment = {
            author: auth.currentUser.email,
            createdAt: Date.now(),
            commentContent: this.state.comment
        }
        db.collection('posts').doc(this.props.data.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(comment)
        })
        .then(()=>{
            console.log('Comentario guardado');
            this.setState({
                comment: ''
            })
        })
        .catch( e => console.log(e))

        
    }

    

   render(){
       console.log(auth.currentUser)
       return(
    <View styles={styles.container}>
        <Card>
        <Card.Title style={styles.title}>{this.props.item.data.description}</Card.Title>
        
        <Card.Divider/>
        <Card.Image style={styles.image} source={{uri:'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'}}/>
        {this.state.liked == false ?
            <TouchableOpacity onPress={() => this.handleLikes()}><Text><FontAwesomeIcon style={styles.like} icon={faHeart}/></Text></TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.handleDislikes()}><Text><FontAwesomeIcon style={styles.dislike} icon={faHeart}/></Text></TouchableOpacity>
        }
        <Text style={styles.text}>Likes: {this.state.likes}</Text>
        <Text style={styles.text}>Publicado por: {this.props.item.data.owner}</Text>
        <Text>{this.props.item.data.createdAt}</Text>
        
        {this.state.modal === true?    
                    <Modal style={styles.modal}
                            animationType='fade'
                            transparent={false}
                            visible = {this.state.showModal}>
                        <TouchableOpacity onPress={()=>this.closeModal()}>
                            <Text>X</Text>
                        </TouchableOpacity>
                        {
                            this.props.item.data.comments !==0 ?
                                <FlatList 
                                    data={this.props.item.data.comments}
                                    keyExtractor={post => post.createdAt.toString()}
                                    renderItem={({item})=> <Text> {item.author}: {item.commentContent}</Text>}
                                /> :
                                <Text>No hay comentarios todavía.</Text>
                        }
                        <View>
                            <TextInput keyboardType='default'
                                        placeholder='Escribí tu comentario'
                                        onChangeText={(text)=>{this.setState({comment: text})}}
                                        multiline
                                        value={this.state.comment}
                            />
                            <TouchableOpacity onPress={()=>this.postComment()}>
                                <Text>Enviar</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal> :
                    <TouchableOpacity onPress={()=> this.showModal()}><Text>Ver comentarios</Text></TouchableOpacity>
                   
               }
   </Card>
    </View>
)}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
    },
    title:{
        padding:10,
        justifyContent: 'space-around',
        fontSize: 25,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    image:{
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    like:{
        marginTop:10,
        color:'grey'
    },
    dislike:{
        color:"red"
    },
    modal:{
        border: 'none',
    },
    closeButtonModal:{
        color: 'black',
    }
   
})