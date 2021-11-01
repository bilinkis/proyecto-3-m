import React, { Component } from 'react';
import {Text, Image, View, Stylesheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
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
                    console.log(response)
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

            handleRegister(email, password, username){ //promesa
                console.log(email,password,username)
                auth.createUserWithEmailAndPassword(email, password) //método de Auth para registro
                .then(response=>{
                console.log('Usuario registrado')
                this.setState({
                                loggedIn: true
                })
                auth.onAuthStateChanged(user=>{ //observa los datos obtenidos l usuario
                    console.log(user)
                    user.updateProfile({
                        displayName: username
                    })
                  })
                
                this.props.navigation.navigate('Home')
                })
                .catch(error=>{
                console.log(error)
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
                        <Drawer.Screen name="Login">
                            {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name = "Register">
                            {props => <Register {...props} handleRegister={(email, password,username)=>this.handleRegister(email, password,username)}/>}
                        </Drawer.Screen>
                    </>
                }
                </Drawer.Navigator>
            </NavigationContainer>
        


        )}
        
        }
