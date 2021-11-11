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
        console.log(this.props.item)
        if(this.state.liked === false && this.props.item.data.likes.length > 0){
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
        db.collection('posts').doc(this.props.item.id).update({
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
        <Card.Image style={styles.image} source={{uri:this.props.item.data.photo}}/>
        {this.state.liked == false ?
        <Text style={styles.likes}>
            <TouchableOpacity onPress={() => this.handleLikes()}><Text><FontAwesomeIcon style={styles.like} icon={faHeart}/></Text></TouchableOpacity>
            <Text style={styles.text}>{Number(this.state.likes)}</Text>
            </Text>
            :
            <Text  style={styles.likes}>
            <TouchableOpacity onPress={() => this.handleDislikes()}><Text><FontAwesomeIcon style={styles.dislike} icon={faHeart}/></Text></TouchableOpacity>
            <Text style={styles.text}>{Number(this.state.likes)}</Text>
            </Text>
        }
        <Text style={styles.text}>Publicado por: {this.props.item.data.owner}</Text>
        <Text style={styles.text}>Publicado el: {String(new Date(this.props.item.data.createdAt).toLocaleString())}</Text>
        
        {this.state.modal === true?    
                    <Modal style={styles.modal}
                            animationType='fade'
                            transparent={false}
                            visible = {this.state.showModal}>
                        <TouchableOpacity style={styles.botoncruz} onPress={()=>this.closeModal()}>
                            <Text style={styles.cruz}>X Cerrar comentarios</Text>
                        </TouchableOpacity>
                        {
                            this.props.item.data.comments !==0 ?
                                <FlatList 
                                    style={styles.comentarios}
                                    data={this.props.item.data.comments}
                                    keyExtractor={post => post.createdAt.toString()}
                                    renderItem={({item})=> <Text> {item.author}: {item.commentContent}</Text>}
                                /> :
                                <Text>No hay comentarios todavía.</Text>
                        }
                        <View>
                            <TextInput keyboardType='default'
                                        style={styles.input}
                                        placeholder='Escribí tu comentario'
                                        onChangeText={(text)=>{this.setState({comment: text})}}
                                        multiline
                                        value={this.state.comment}
                            />
                            <TouchableOpacity onPress={()=>this.postComment()}>
                                <Text style={styles.send}>Enviar</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal> :
                    <TouchableOpacity onPress={()=> this.showModal()}><Text style={styles.vercomm}>Ver comentarios</Text></TouchableOpacity>
                   
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
    infoContainer:{
        flex:1,
        flexDirection:'column',
        
    },
    comentarios:{
        padding: 10,
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        paddingLeft:10,
        alignSelf:'center',
        justifyContent:'center',
        flex:1
    },
    vercomm:{
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 3,
        textAlign: 'center',
        margin: 3,

    },
    cruz:{
        fontWeight: 'bold',
        backgroundColor: '#E3E2DE',
        borderRadius: 8,
        textAlign: 'center',
        padding: 2,
    },
    botoncruz:{
        marginTop: 10,
        marginBottom: 10,
    },
    input:{
        padding: 8,
        backgroundColor: '#E3E2DE',
        borderRadius: 3,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
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
        height:250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    like:{
        marginTop:10,
        color:'grey'
    },
    likes:{
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    send:{
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 3,
        textAlign: 'center',
        alignItems: 'center'

    },
    dislike:{
        marginTop:10,
        color:"red"
    },
    modal:{
        border: 'none',
        alignSelf: 'center',
    },
    closeButtonModal:{
        color: 'black',
    }
   
})