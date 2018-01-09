import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Header extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.borderBox}>
                    <Text style={styles.h1}>The University of Akron</Text>
                    <View style={styles.uBox}>
                        <Text style={styles.textCaps}>U</Text>
                        <Text style={styles.text}>niversity  </Text>

                        <Text style={styles.textCaps}>L</Text>
                        <Text style={styles.text}>ibraries</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:85,
        backgroundColor:"#041e42",
        opacity:.8,
    },
    borderBox:{
        flex:1,
        borderTopColor:'#ae9c6e',
        borderBottomColor:'#ae9c6e',
        borderTopWidth:4,
        borderBottomWidth:4,
        marginTop:6,
        marginBottom:6,     
        alignContent:'center',
    },
    h1:{
        flex:1,
        color:'white',
        alignSelf:'center',
        fontSize:15
    },
    uBox:{
        flex:1,
        flexDirection:'row',
        marginTop:-50,
        alignSelf:'center'
    },
    textCaps:{
        color:'#ae9c6e',
        fontSize:40,
        fontWeight:'bold',
    },
    text:{
        color:'white',
        fontSize:35,
        marginTop:5
    }

});