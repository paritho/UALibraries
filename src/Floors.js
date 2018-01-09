import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import Button from './Button';
import Moment from 'moment';

export default class Floors extends Component{
    constructor(props){
        super(props);

       let ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });

        const { params } = this.props.navigation.state;

        this.state = {
            dataSource: ds.cloneWithRows(params.data),
        };

        this.renderRooms = this.renderRooms.bind(this);
        this.bookRoom = this.bookRoom.bind(this);
    }

    bookRoom(room){
        let { navigate } = this.props.navigation;

        let floors = {
            11057:'biercegroundfloorstudyrooms',
            11058:'biercefirstfloorstudyrooms',
            11059:'biercesecondfloorstudyrooms',
            11060:'biercethirdfloorstudyrooms',
            11353:'bierceADA'
        };

        if(typeof room.group_id !== 'number') return null;

        let floor = floors[room.group_id];

        navigate('Webview', {'data':floor});
    }

    renderRooms(room){
        let bookable;

        if(room.timeslots.length > 0) {
            let startTime = Moment(room.timeslots[0].start);
            bookable = Moment().isAfter(startTime);
        }

        return(
            <View style={styles.row}>
                <Text style={styles.name}> { room.name.replace('Room','').trim() } </Text>
                <Text style={styles.cap}>Capacity: {room.capacity}</Text> 
                <TouchableHighlight disabled={!bookable} style={styles.bookableBtn} 
                                    onPress={()=>this.bookRoom(room)}>
                    { bookable ? 
                    <Text style={styles.bookable}> Book Now! </Text>  :
                    <Text style ={styles.unavailable}>Unavailable</Text>
                    }
                </TouchableHighlight>
            </View>
        );
    }

    render(){
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRooms} />
            </View>
        );
    }
}


 const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#041e42'
    },
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:5,
        paddingRight:5,
        margin:5,
        borderBottomWidth:2,
        borderBottomColor:'#ae9c6e'
    },
    name:{
        fontSize:28,
        color:'white'
    },
    cap:{
        fontSize:18,
        fontWeight:'bold',
        color:'#ae9c6e'
    },
    bookableBtn:{

    },
    bookable:{
        color:'white',
        backgroundColor:'green',
        fontSize:22,
        borderWidth:2,
        borderColor:'white',
        borderRadius:4,
        margin:7,
        padding:3,
        paddingLeft:7,
        paddingRight:4
    },
    unavailable:{
        color:'white',
        backgroundColor:'red',
        fontSize:22,
        borderWidth:2,
        borderColor:'white',
        borderRadius:4,
        margin:7,
        padding:3,
        paddingLeft:7,
        paddingRight:4

    }
});