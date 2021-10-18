import React from 'react';
import {Text, Image, View, Stylesheet} from 'react-native';
import Tarjeta from '../components/Tarjeta';

export default function Home () {

    constructor(props) { 
        super(props);
        this.state ={
            movies: [],
            page:1,
        }
    
    
        }
    
        fetchData = (page) => {
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=0ef54cf87594d6b6ca72ab2de24ffdc0&page='+page)
    
            .then((response)=>{
                return response.json();
            })        
            .then((data)=>{
                console.log(data);
                this.setState({
                movies:data.results,
            })
            
              
            })
            .catch((error)=>{
                return console.log(error);
            })
        }
       
    
    }
    
    
        render = () => {
            
            return (
                <View>
                    
                     {this.state.movies === [] ? //si array de Movies vacío
    
                    <Text>Cargando...</Text> 
                    : //sino
                  this.state.filterBuscador.map ( (movies, index) => { //devolver la info de la
                      return <Tarjeta className="card-movies" key = {index} index = {index}id={movies.id} title= {movies.title} rating = {movies.vote_average} image = {movies.poster_path} descripcion= {movies.overview} adult={movies.adult} release_date={movies.release_date} deleteCard={this.deleteCard} moreInfo={this.moreInfo} swap={this.swapPositions}/> 
                  })}
                

                </View>
            )

}