import { Camera } from 'expo-camera';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { storage } from '../firebase/config';

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
              
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.takePicture()}>
                    </TouchableOpacity>
                </View>
            </Camera>
            }
        </View>
        )
    }
}
const styles = StyleSheet.create({
    
})