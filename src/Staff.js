import React, { Component } from 'react';
import { View,
         Text,
         TextInput,
         StyleSheet,
         Image,
         TouchableHighlight,
         ListView
} from 'react-native';

import SendIntentAndroid from 'react-native-send-intent';


let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

export default class Staff extends Component{
    constructor(props){
        super(props);

        const { params } = this.props.navigation.state;

        this.state = {
            dataSource: ds.cloneWithRows(params.data),
            searchText:''
        };

        this.renderStaffInfo = this.renderStaffInfo.bind(this);
        this.onRowPress = this.onRowPress.bind(this);
        this.onEmailPress = this.onEmailPress.bind(this);
        this.onPhonePress = this.onPhonePress.bind(this);
        this.searching = this.searching.bind(this);
    }

    onRowPress(info){
        
    }

    onPhonePress(phone){
        SendIntentAndroid.sendPhoneDial(phone);
    }

    onEmailPress(email){
        SendIntentAndroid.sendMail(email,'Contact Us (From Android App)','Your message here');
    }

    searching(text){
        let searchData = this.props.navigation.state.params.data;
        
        let filtered = searchData.filter((record)=>{
            if(record.name.toLowerCase().indexOf(text)>-1) return record;
        });
    
        // if nothing found, say so
        if(filtered.length < 1) filtered[0] = {noResults:'No results'};

        this.setState({dataSource:ds.cloneWithRows(filtered)});

    }

    renderStaffInfo(staffInfo){
        const phone = require('../img/phone.png');
        const email = require('../img/email.png');

        let extention, ex;
        if(staffInfo.phone){
            extention = staffInfo.phone;
            ex = extention.match(/\d{4}$/);
            extention = `x${ex[0]}`;
        }

        return(
            <View style={styles.staffContainer}>
                <View style={styles.info}>
                    { staffInfo.noResults ? 
                        <View style={styles.row}>
                            <Text style={styles.name}>{staffInfo.noResults}</Text>
                        </View>
                        :
                        <View>
                        <Text style={styles.dept}>{staffInfo.department}</Text>
                        <View style={styles.row}>
                            <Text style={styles.name}>{staffInfo.name}</Text>
                                <TouchableHighlight onPress={()=>this.onPhonePress(staffInfo.phone)}>
                                    <Image source={phone} style={styles.icon}/>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={()=>this.onEmailPress(staffInfo.email)}>
                                    <Image source={email} style={styles.icon}/>
                                </TouchableHighlight>
                        </View>
                        </View>
                    }
                    <Text style={styles.office}>{staffInfo.office}    {extention}</Text>
                    <Text style={styles.dept}>{staffInfo.title}</Text>
                </View>
            </View>
        );
    }

    render(){
        let data = this.props.navigation.state.params;
        

        return(
            <View style={styles.container}>
                <TextInput style={styles.searchInput}  
                           onChange={(event)=>this.searching(event.nativeEvent.text)} 
                           placeholder={'Search'} />
                <ListView dataSource={this.state.dataSource} renderRow={this.renderStaffInfo} />
            </View>
        );
        
    }

}


 const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#333'
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        width:40,
        height:40,
        tintColor:'#999999',
        marginRight:20,
    },
    staffContainer:{
        flex:1,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#ddd',
        backgroundColor:'#041e42'
    },
    info:{
        padding:20
    },
    name:{
        fontSize:30,
        flex:1,
        color:'white'
    },
    dept:{
        fontSize:15,
        color:'#ddd',//'#041e42'
    },
    office:{
        fontWeight:'bold',
        color:'#ae9c6e'
    },
    searchContainer:{
        backgroundColor:'#ddd'
    },
    searchInput:{
        color:'#000',
        fontSize:28,
        backgroundColor:'#ddd'
    }
});