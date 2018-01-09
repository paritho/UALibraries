import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView, ActivityIndicator,
         NetInfo, Alert } from 'react-native';
import { getRoomInfoFromLibCal } from '../services/room-service';
import Button from './Button';

export default class StudyRooms extends Component{
    constructor(props){
        super(props);

        this.state = {
            rooms:null,
            loading:true,
        };
    
        this.renderLoading = this.renderLoading.bind(this);
        this.renderRooms = this.renderRooms.bind(this);
    }

    componentDidMount(){
        NetInfo.isConnected.fetch().then(isCon=>{
            if(isCon){
                 getRoomInfoFromLibCal()
                    .then((data)=>this.setState({rooms:data,loading:false}))
                    .catch((e)=>Alert.alert('Oops!','There was an error retrieving room data'));
                    return;
            }
            
            Alert.alert(
            'No Internet Connection',
            'Please make sure you are connected to the internet and re-launch the app');
        });
    }

    renderLoading(){
        return(
            <View style={styles.container}> 
                <Image source={require('../img/study.png')} style={styles.icon} />
                <Text style={styles.loadingText}> Loading... </Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    renderRooms(){
        let { rooms, loading, open} = this.state;
        let { navigate } = this.props.navigation;

        return(
            <View style={styles.container}> 
                <Button options={{'navigateTo':'Floors',
                                  'params':rooms.filter((r)=>{if(r.group_id == 11057) return r}),
                                  'icon':null,
                                  'title':'Ground Floor Study Rooms'}}
                          navigator={ navigate }/>
                <Button options={{'navigateTo':'Floors',
                                  'params':rooms.filter((r)=>{if(r.group_id == 11058) return r}),
                                  'icon':null,
                                  'title':'1st Floor Study Rooms'}}
                          navigator={ navigate }/>
                <Button options={{'navigateTo':'Floors',
                                  'params':rooms.filter((r)=>{if(r.group_id == 11059) return r}),
                                  'icon':null,
                                  'title':'2nd Floor Study Rooms'}}
                          navigator={ navigate }/>
                <Button options={{'navigateTo':'Floors',
                                  'params':rooms.filter((r)=>{if(r.group_id == 11060) return r}),
                                  'icon':null,
                                  'title':'3rd Floor Study Rooms'}}
                          navigator={ navigate }/>
                <Button options={{'navigateTo':'Floors',
                                  'params':rooms.filter((r)=>{if(r.group_id == 11353) return r}),
                                  'icon':null,
                                  'title':'ADA Study Rooms'}}
                          navigator={ navigate }/>
            </View>
        );
    }


    render(){
        return this.state.loading ? this.renderLoading() : this.renderRooms();
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:null,
        height:null,
        backgroundColor:'#041e42'
    },
    icon:{
        width:100,
        height:100,
        alignSelf:'center',
        marginTop:200,
        tintColor:'#ae9c6e'
    },
    loadingText:{
        alignSelf:'center',
        color:'#fff',
        fontSize:25,
        fontWeight:'bold',
        margin:10
    }
});