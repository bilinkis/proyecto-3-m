import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Post ({item}){
   
return(
    <View styles={styles.container}>
        <Text>{item.data.description}</Text>
        <TouchableOpacity onPress={() => this.props.handleLikes()}><Text><i class="far fa-heart"></i></Text></TouchableOpacity>
        <Text>{item.data.createdAt}</Text>
        <Text>{item.data.owner}</Text>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
   
})