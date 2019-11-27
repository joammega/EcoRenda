import React, { Component } from 'react';
import {View, Text} from 'react-native'

import Routes from './src/routes'
import firebase from 'firebase'



export default class App extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){

    var firebaseConfig = {
      removido:"removido"
    };
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    
  }
  
  render() {
    return (
      <Routes/>
      
    );
  }
}