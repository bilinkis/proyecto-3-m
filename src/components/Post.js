import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Post ({item}){
   
return(
    <View styles={styles.container}>
        <Text>{item.data.description}</Text>
        <TouchableOpacity onPress={() => this.props.handleLikes()}><Text><FontAwesomeIcon icon={faHeart}/></Text></TouchableOpacity>
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