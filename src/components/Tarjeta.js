import React from 'react';
import {Text, Image, View, Stylesheet, TouchableOpacity} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Tarjeta () {
    constructor(props){
        super(props)
    }

render (){ 
        return (
            <View>
                                            <Image src={{uri: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + this.props.image }} style={styles.image-tarjeta} resizeMode='contain'/>
                    <Text>{this.props.title}</Text>
                    <Text>{this.props.descripcion}</Text>
                    <TouchableOpacity onClick={() => this.props.moreInfo(this.props.id)}><Text>Ver más</Text></TouchableOpacity>                    <section className="aditional-info" id={this.props.id}>
                       <Text>Rating: {this.props.rating}</Text>
                        <Text>Fecha de lanzamiento: {this.props.release_date}</Text>
                        {this.props.adult === false ?
                        <Text>Apta para menores: Si</Text>
                        :
                        <Text>Apta para menores: No</Text>
}
            </View>
        )}



}
