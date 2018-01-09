import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';

export default class Button extends Component {
    constructor(props){
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(nav, params){this.props.navigator(nav, {'data':params});}

    render(){
        const { navigateTo, params, icon, title } = this.props.options;
        
        return(
            
            <TouchableHighlight style={styles.btn} 
                                onPress={()=>this.handlePress(navigateTo, params)}
                                underlayColor='white'>
            
                <View style={styles.row}>
                    <Image source={icon} style={styles.icon}/>
                    <Text style={styles.text}>{title}</Text>
                </View>

            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    btn:{
        flex:1,
        borderRadius:5,
        borderColor:'white',
        borderWidth:2,
        padding:10,
        margin:10,
        alignItems:'center',
        justifyContent:'center',
        height:70
        
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        color:'white',
        fontSize:30,
        margin:10,
        alignSelf:'center'
    },
    icon:{
        resizeMode:'contain',
        width:60,
        height:60,
        marginRight:10,
        alignSelf:'center'
    }
});