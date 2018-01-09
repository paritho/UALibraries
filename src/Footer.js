import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Libraries from '../src/Libraries';

export default class Footer extends Component{
    constructor(props){
        super(props);

    }

    render(){
        const { hours, btnPress } = this.props;

        let bierce = {'name':'bierce','phone':'330.972.5355','position':'first'};
        let science = {'name':'science','phone':'330.972.8323'};
        let archives = {'name':'archives','phone':'330.972.7670'};
        
        return(
            <View style={styles.footer}>
                <Libraries options={bierce} hours={hours} btnPress={btnPress} />
                <Libraries options={science} hours={hours} btnPress={btnPress} />
                <Libraries options={archives} hours={hours} btnPress={btnPress} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#041e42",
        opacity:.9,
        borderTopWidth:4,
        borderTopColor:'#ae9c6e',

    }

});