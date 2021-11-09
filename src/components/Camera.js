import { Camera } from 'expo-camera';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { storage } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default class MyCamera extends React.Component{
    constructor(props){
        super(props);
        this.camera; //Variable vacía
        this.state = {
            photo: '',
            permiso: false,
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(response => {
            console.log(response)
            this.setState({
            permiso: response.granted
            })
        })
    }

    takePicture(){
        if(!this.camera) return;
        this.camera.takePictureAsync()
        .then(photo => {
            console.log(photo)
            this.setState({
                photo: photo.uri
            })
        })
    }

    uploadImage(){
        fetch(this.state.photo)
        .then(res => {
            return res.blob();
        })
        .then(img => {
            const ref = storage.ref(`camera/${Date.now()}.jpg`)
            ref.put(img)
            .then(()=>{
                console.log(ref.getDownloadURL);
                
                ref.getDownloadURL()
                .then(url => {
                    this.setState({
                        photo: ''
                    })
                    this.props.savePhoto(url);
                })
            })
        })
    }

    onReject(){
        this.setState({
            photo: ''
        })
    }

    render(){
        console.log(this.state)
        return(
        <View style = {styles.container}>
            {
            this.state.photo ?
            <>
            <Image 
            style={styles.preview}
            source={{uri: this.state.photo}}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.reject}
                    onPress={() => this.onReject()}
                ><Text style={styles.text}>X</Text></TouchableOpacity>

                <TouchableOpacity
                    style={styles.accept}
                    onPress={() => this.uploadImage()}
                ><Text style={styles.text}>Subir</Text>
                </TouchableOpacity>
            </View>
            </>
            :
            
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.front || Camera.Constants.Type.back}
            
                ref = {referencia => this.camera = referencia}
            >
              
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.takePicture()}>
                        <Text><FontAwesomeIcon style={styles.icon} icon={faCamera}/></Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            }
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        height: 124,
        position: 'absolute',
        bottom: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 50,
        height: 50,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        paddingTop: 15
    },
    imageContainer: {
        height: '90%',
    },
    preview: {
        width: '100%',
        flex: 6
    },
    btnContainer: {
        backgroundColor:'black',
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accept: {
        width: 100,
        height: 50,
        backgroundColor: '#7F6DF3',
        borderRadius: 50
    },
    reject: {
        width: 100,
        height: 50,
        backgroundColor: '#FF392B',
        borderRadius: 50
    },
    icon:{
        alignItems: 'center',
        flex:1,
        justifyContent: 'space-around',

    }
})