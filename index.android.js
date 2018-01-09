/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, NetInfo, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './src/Home';
import Staff from './src/Staff';
import StudyRooms from './src/StudyRooms';
import Floors from './src/Floors';
import Web from './src/Web';

const App = StackNavigator({
        Home: { screen: Home },
        Staff: {screen: Staff},
        StudyRooms :{screen: StudyRooms},
        Floors:{screen:Floors},
        Webview : {screen: Web}
    },
    { headerMode: 'none'}
);

AppRegistry.registerComponent('UALibraries', () => App);
