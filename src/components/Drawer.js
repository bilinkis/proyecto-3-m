import React from 'react';
import {Text, Image, View, Stylesheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import masVistas from '../screens/masVistas.js';
import novedades from '../screens/novedades.js';


const Drawer = createDrawerNavigator();

export default function Drawer () {
        
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



}
