import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

import SendIntentAndroid from 'react-native-send-intent';

export default class Libraries extends Component{
    constructor(props){
        super(props);
    
        this.onMapPress = this.onMapPress.bind(this);
        this.onPhonePress = this.onPhonePress.bind(this);
    }

    onPhonePress(phone){
        SendIntentAndroid.sendPhoneDial(phone);
    }

    onMapPress(location){
        let actions = {
            'bierce':'Bierce Library, Akron, OH 44304',
            'science':'244 Sumner St, Akron, OH 44325',
            'archives':'225 S Main St Akron, OH 44308'
        };

        SendIntentAndroid.openMaps(actions[location.toLowerCase()]);
    }

    render(){
        const { name, phone, position } = this.props.options;
        const libraries = this.props.hours;
    
        let toRender = {'open':false, 'render': undefined};
        
        for(let lib in libraries){
            if(!libraries) break;

            if(libraries[lib].name.toLowerCase() === name) {
                toRender.open = libraries[lib].times.currently_open;
                toRender.render = libraries[lib].rendered;
                break;
            }
        }

        return(
             <View style={ position == 'first' ? styles.footerItemLeft : styles.footerItem}>
                <View style={styles.row}>
                    <Text style={styles.title}>{ name.toUpperCase() }</Text>
                    <TouchableHighlight onPress={()=>this.onMapPress(name)}>
                        <Image source={require('../img/map.png')} style={styles.icon}/>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={()=>this.onPhonePress(phone)}>
                    <Text style={styles.phone}>{ phone }</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.btnPress}>
                    <View>
                    <Text style={styles.open}> {toRender.open ? 'Open Today: ' : 'Closed Now' }</Text>
                    <Text style={styles.hours}>{toRender.open ? toRender.render : 'Press for hours'}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    footerItem :{
        flex:1,
        borderLeftWidth:2,
        borderLeftColor:'#ae9c6e',
        padding:5,
        paddingLeft:10
    },
    footerItemLeft:{
        flex:1,
        margin:5,
        padding:5
    },
    title:{
        fontSize:16,
        color:'#ae9c6e',
        flex:1
    },
    phone:{
        fontSize:15,
        fontWeight:'bold',
        color:'white'
    },
    open:{
        fontSize:15,
        color:'white',
        marginLeft:-5,
        marginRight:20
    },
    hours:{
        fontSize:15,
        color:'white'
    },
    row:{
        flexDirection:'row'
    },
    icon:{
        width:20,
        height:20,
        tintColor:'#fff',
        
    }
});