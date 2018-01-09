import React, { Component } from 'react';
import {View, Text, WebView, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';

export default class Web extends Component{
    constructor(props){
        super(props);

        this.state={};

        this.navigationStateChange = this.navigationStateChange.bind(this);
        this.back = this.back.bind(this);
    }

    back(){
        const { canGoBack } = this.state;
        if(canGoBack) {
            this.refs['WEBVIEW_REF'].goBack();
            return true;
        }
    }

    componentWillMount(){ BackHandler.addEventListener('hardwareBackPress', this.back) }

    componentWillUnmount(){ BackHandler.removeEventListener('hardwareBackPress',this.back) }

    navigationStateChange(state){
        this.setState({
            canGoBack: state.canGoBack
        });
    }
    
    
    render(){
        const { params } = this.props.navigation.state;
        let url ='';

        // MUST CHANGE WHEN CATALOG changes to library.uakron.edu
        if(params.data == 'catalog') url = 'http://m.library.uakron.edu';
        if(params.data == 'account') url = 'http://library.uakron.edu/patroninfo';
        if(params.data.indexOf('bierce') == 0) url = 'http://uakron.libcal.com/booking/' + params.data; 
        if(params.data == 'hours') url = 'http://uakron.edu/libraries/about/hours.dot';

        return(
            <View style={styles.container}>
            <WebView
                ref='WEBVIEW_REF'
                source={{uri:url}}
                onNavigationStateChange= {this.navigationStateChange}
                 />
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    back:{
        flexDirection:'row',
        backgroundColor:"#041e42",
    },
    icon:{
        marginLeft:5
    },
    backText:{
        color:'white',
        fontSize:25,
        margin:8
    }
})