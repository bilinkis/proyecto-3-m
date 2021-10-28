import React from 'react';
import {Text, Image, View, Stylesheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './login';
import Register from './register';
import { auth } from '../firebase/config';


const Drawer = createDrawerNavigator();

export default class Drawer extends Component {
        constructor(props){
                super(props);
                this.state = {
                    loggedIn: false,
                    error: null,
                }
            }

            handleLogin(email, password){ //promesa
                auth.signInWithEmailAndPassword(email, password) //método de Auth para iniciar sesión
                .then(response=>{
                console.log('Usuario logueado')
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
                })
                .catch(response=>{
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
        
        render(){ 
        return (
           <NavigationContainer>
                   <Drawer.Navigator>
                   <Drawer.Screen name= "Iniciar sesión" component= {login}/>
                   <Drawer.Screen name= "Registrate" component= {register}/>
                   <Drawer.Screen name= "Más vistas" component= {masVistas}/>
                   <Drawer.Screen name= "Más vistas" component= {novedades}/>

                   </Drawer.Navigator>

           </NavigationContainer>
            
        
        


            )



}}
