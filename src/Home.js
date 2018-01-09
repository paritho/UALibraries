import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         Image,
         TouchableHighlight,
         ActivityIndicator,
         NetInfo,
         Alert
} from 'react-native';

import Header from '../src/Header';
import Button from '../src/Button';
import Footer from '../src/Footer';

export default class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            staff:null,
            hours:null,
            rooms:null
        };

        this.renderHome = this.renderHome.bind(this);
        this.renderSplash = this.renderSplash.bind(this);
        this.footerBtnPress = this.footerBtnPress.bind(this);
        
    }

    componentDidMount(){        
        let staffUrl = 'http://www.uakron.edu/libraries/app-service/data/staff.json',
            hoursUrl = 'https://api3.libcal.com/api_hours_today.php?iid=1574&lid=0&format=json';

        NetInfo.isConnected.fetch().then(isCon => {
            if(!isCon){
                Alert.alert('No Internet Connection',
                    'Please make sure you are connected to the internet and re-launch the app');
                return;
            }
            
            fetch(staffUrl).then((res)=>res.json()).then((data)=> this.setState({staff:data.staff}))
                           .catch((e)=>Alert.alert('Oops!','There was an error getting staff data'));
            fetch(hoursUrl).then((res)=>res.json()).then((data)=> this.setState({hours:data.locations}))
                           .catch((e)=>Alert.alert('Oops!','There was an error getting hours data '+ e)); 
        });
    }

    footerBtnPress(){
        console.log('pressed',this.props.navigation);
        this.props.navigation.navigate('Webview',{'data':'hours'});
    }

    renderSplash(){
        return(
            <Image source={require('../img/splash.png')} style={styles.container}/>
         );
    };

    renderHome(){
        const { navigate } = this.props.navigation;
        let { staff, hours, rooms } = this.state;
        return(
            <Image source={require('../img/front.jpg')} style={styles.container}>
                <Header />
                <View style={styles.content} >             
                       
                   <Button options={
                                {'navigateTo':'StudyRooms',
                                'params':null,
                                'icon':require('../img/study.png'),
                                'title':'Study Rooms'
                                }}
                          navigator={ navigate }/>

                    <Button options={
                                {'navigateTo':'Webview',
                                'params':'catalog',
                                'icon':require('../img/search.png'),
                                'title':'Catalog Search'
                                }}
                          navigator={ navigate }/>

                    <Button options={
                                {'navigateTo':'Webview',
                                'params':'account',
                                'icon':require('../img/account.png'),
                                'title':'My Library'
                                }}
                          navigator={ navigate }/>
                    <Button options={
                                {'navigateTo':'Staff',
                                'params':staff,
                                'icon':require('../img/staff.png'),
                                'title':'Library Staff'
                                }}
                          navigator={ navigate }/> 
                    
                   
                </View>
                <Footer hours={hours} btnPress={this.footerBtnPress}/>
            </Image>
            );
    };

    render(){
        let { staff, hours, rooms } = this.state;
        return (staff && hours) ? this.renderHome() : this.renderSplash();
    };

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'cover',
    },
    content :{
        flex:1,
        padding:10,
        backgroundColor:'rgba(100,100,100,.4)'
        
    },
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