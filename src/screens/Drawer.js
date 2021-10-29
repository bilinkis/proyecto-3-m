import React, { Component } from 'react';
import {Text, Image, View, Stylesheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './login';
import Register from './register';
import Home from './home';
import NewPost from './NewPost';
import { auth } from '../firebase/config';

export default class Drawer extends Component {
        constructor(props){
                super(props);
                this.state = {
                    loggedIn: false,
                    error: null,
                }
            }
            
            componentDidMount(){
                auth.onAuthStateChanged(user => {
                    if (user) {
                        this.setState({
                            loggedIn: true
                        })
                    }
                })
            }

            handleLogin(email, password){ //promesa
                auth.signInWithEmailAndPassword(email, password) //método de Auth para iniciar sesión
                .then(response=>{
                console.log('Usuario logueado')
                auth.onAuthStateChanged(user=>{ //observa los datos obtenidos l usuario
                        console.log(user)
                      })
                this.setState({
                                loggedIn: true
                })
                })
                .catch(response=>{
                console.log('No se pudo loguear')
                this.setState({
                        error: 'Error en el inicio de sesión'
                })
                })
            }

            handleRegister(email, password){ //promesa
                auth.createUserWithEmailAndPassword(email, password) //método de Auth para registro
                .then(response=>{
                console.log('Usuario registrado')
                this.setState({
                                loggedIn: true
                })
                response.user.updateProfile({
                    displayName: email
                })
                this.props.navigation.navigate('Home')
                })
                .catch(response=>{
                alert('No se pudo registrar:(')
                console.log('No se pudo registrar')
                this.setState({
                        error: 'Error en el registro :('
                })
                })
            }

            handleLogout(){ //promesa
                auth.signOut()
                .then(()=>{
                        this.setState({
                                loggedIn: false
                        })
                })
                .catch(error=>{
                        console.log(error)
                })
            }

            handleLikes(){
                if (this.state.liked === false && this.state.loggedIn === true){
                    this.setState({
                        likes: +1,
                    })
                }
                else if (this.state.liked === true && this.state.loggedIn === true){
                    this.setState({
                        likes: -1,
                    })
                }
            }
        
        render(){ 
                const Drawer = createDrawerNavigator();

        return (
                <NavigationContainer>
                <Drawer.Navigator initialRouteName="Login">
                    {this.state.loggedIn === true ? 
                    <>
                    <Drawer.Screen name = "Home">
                        {props => <Home {...props} handleLogout={()=>this.handleLogout()}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name = "New Post">
                                {props => <NewPost {...props}/>}
                    </Drawer.Screen>
                    </>
                    :
                    <>
                        <Drawer.Screen name="Iniciá sesión">
                            {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name = "Registrate">
                            {props => <Register {...props} handleRegister={(email, password)=>this.handleRegister(email, password)}/>}
                        </Drawer.Screen>
                    </>
                }
                </Drawer.Navigator>
            </NavigationContainer>
        


        )}
        
        }
