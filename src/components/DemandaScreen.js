import React, { Component } from 'react';
import { View, Text, Button, FlatList, ScrollView } from 'react-native'



import * as firebase from 'firebase'
import "firebase/firestore"



export default class DemandaScreen extends Component {

    constructor(props) {
        super(props)
        this.state = { demandas: [] }
    }
    alimentarDemandas(query) {
        let demandas = []
        query.forEach(function (doc) {
            demandas.push({
                key: doc.id,
                ...doc.data()
            })
        });
        this.setState({ demandas })
        console.log(demandas)
        
    }
    componentDidMount() {

        firebase.firestore().collection("demandas").where('userId',"==",'teste').onSnapshot(this.alimentarDemandas.bind(this))




    }
    render() {
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ScrollView style={{width:'95%',borderRadius:5, borderWidth:0.2, borderColor:'black'}}>
                    <View style={{width:'100%', backgroundColor:'gray', flexDirection:'row'}}>
                        <View style={{width:'30%'}}>
                            <Text style={{color:'white', padding:5,fontSize:16}}>
                                Produto
                            </Text>
                        </View>
                        <View style={{width:'15%'}}>
                            <Text style={{color:'white', padding:5,fontSize:16}}>
                                Preço
                            </Text>
                        </View>
                        <View style={{width:'25%'}}>
                            <Text style={{color:'white', padding:5,fontSize:16}}>
                                Quantidade
                            </Text>
                        </View>
                        <View style={{width:'20%'}}>
                            <Text style={{color:'white', padding:5,fontSize:16}}>
                                Lucro
                            </Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <Text style={{color:'white', padding:5,fontSize:16}}>
                                Data
                            </Text>
                        </View>
                    </View>
                    <FlatList
                    data = {this.state.demandas}
                    renderItem = {({item})=>
                    <View style={{width:'100%', flexDirection:'row', borderColor:'gray', borderWidth:0.3}}>
                        <View style={{width:'30%'}}>
                            <Text style={{color:'black', padding:5,fontSize:16}}>
                                {item.itemNome}
                            </Text>
                        </View>
                        <View style={{width:'15%'}}>
                            <Text style={{color:'black', padding:5,fontSize:16}}>
                                {item.valor}
                            </Text>
                        </View>
                        <View style={{width:'25%'}}>
                            <Text style={{color:'black', padding:5,fontSize:16}}>
                                {item.quant}
                            </Text>
                        </View>
                        <View style={{width:'20%'}}>
                            <Text style={{color:'black', padding:5,fontSize:16}}>
                                {item.quant * item.valor}
                            </Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <Text style={{color:'black', padding:5,fontSize:16}}>
                                {item.data.toDate().getDate()+"/"+item.data.toDate().getMonth()}
                            </Text>
                        </View>
                    </View>
                
                }
                    />
                </ScrollView>
            </View>

        );
    }
}