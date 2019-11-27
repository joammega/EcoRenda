import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, ScrollView, Button, TouchableOpacity, Image } from 'react-native'

import * as firebase from 'firebase'
import "firebase/firestore"





export default class ProductScreen extends Component {
    constructor(props) {

        super(props);
        const item = this.props.navigation.getParam("produto", 'não encontrado');

        this.state = { produto: item, materiais: [], contador: 1, data: item.data.toDate() }
    }
    setDemanda(){
        let c = this.state.produto
        let change = {
            nome: c.nome, 
            data: c.data,
            demanda: c.demanda - this.state.contador,
            valor: c.valor,
            linkI: c.linkI,
            linkV: c.linkV,
            linkP: c.linkP
        }
        firebase.firestore().collection('demandas').doc().set({
            linkI: c.linkI,
            itemNome: c.nome,
            valor: c.valor,
            quant: this.state.contador,
            data: c.data,
            userId: 'teste'
        })
        firebase.firestore().collection('produtos').doc(c.key).set(change);
        
    }
    alimentarMateriais(query) {
        let materiais = []
        query.forEach(function (doc) {
            materiais.push({
                key: doc.id,
                ...doc.data()
            })
        });
        this.setState({ materiais })
        console.log(this.state.materiais)
    }
    renderImage(link) {
        let imgs = []
        link.forEach(l => {
            imgs.push(<Image
                style={{ width: 50, height: 50, margin: 3, borderColor: 'green', borderWidth: 0.2 }}
                source={{ uri: l }}
            />)
        })
        return imgs

    }
    acrescentar() {
        if (this.state.contador == this.state.produto.demanda) {
            return
        }
        this.setState(antes => { return { contador: antes.contador + 1 } })
    }
    tirar() {
        if (this.state.contador == 0 ) {
            return
        }
        this.setState(antes => { return { contador: antes.contador - 1 } })
    }
    componentDidMount() {
        firebase.firestore().collection("materiais").where("prodId", "==", this.state.produto.key).onSnapshot(this.alimentarMateriais.bind(this));

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 9, flexDirection: "row" }}>
                    <View style={{ flex: 4 }}>
                        <Text style={{ marginLeft: 10, fontSize: 24 }}>Aprenda</Text>
                        <View style={{ width: '90%', height: '90%', margin: 10, borderColor: 'green', borderWidth: 1, boxSizing: "border-box", alignItems: "center", justifyContent: "center" }}>
                            <ImageBackground
                                style={{ width: 400, height: 180, margin: 10 }}
                                source={{ uri: this.state.produto.linkI }}>

                            </ImageBackground>
                            <ImageBackground
                                style={{ width: 400, height: 180, margin: 10 }}
                                source={{ uri: this.state.produto.linkI }}>

                            </ImageBackground>

                        </View>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={{ marginLeft: 10, fontSize: 24 }}>
                            Materiais e Ferramentas
                        </Text>
                        <ScrollView style={{ width: '90%', margin: 10, borderColor: 'green', borderWidth: 1, boxSizing: "border-box" }}>
                            <FlatList
                                data={this.state.materiais}
                                renderItem={({ item }) =>
                                    <View>
                                        <View style={{ backgroundColor: 'gray', width: '98%', marginLeft: '1%', marginTop: '1%' }}>
                                            <Text style={{ fontSize: 24, color: 'white', padding: 5 }}>
                                                {item.categoria}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            {this.renderImage(item.imagens)}
                                        </View>
                                    </View>


                                }

                            />


                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "center", borderTopWidth: 0.5, borderTopColor: 'black', marginTop: 4 }}>
                    <View style={{ margin: 10, display: 'flex', flexDirection: "row", alignItems:"center" }}>
                        
                        <View>
                        <Text style={{ backgroundColor: 'gray', fontSize: 16 }}>{this.state.data.getDate() + "/" + this.state.data.getMonth() + "/" + this.state.data.getFullYear()}</Text>
                        </View>
                        
                        <TouchableOpacity onPress={this.tirar.bind(this)} style={{ width: 25, height: 25, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 8 }}>
                            <Text style={{ color: 'white' }}>
                                -
                           </Text>
                        </TouchableOpacity>
                        <Text style={{ width: 25, height: 25, backgroundColor: 'gray', fontSize: 16, textAlign: "center", marginLeft: 8 }}>{this.state.contador}</Text>
                        <TouchableOpacity onPress={this.acrescentar.bind(this)} style={{ width: 25, height: 25, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 8 }}>
                            <Text style={{ color: 'white' }}>
                                +
                           </Text>
                        </TouchableOpacity>
                        <Text style={{ minWidth: 25, height: 25, backgroundColor: 'gray', fontSize: 16, textAlign: "center", marginLeft: 8 }}>{this.state.contador * this.state.produto.valor}</Text>
                        <TouchableOpacity onPress={this.setDemanda.bind(this)} style={{ width: 70, height: 35, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 8 }}>
                        <Text style={{ color: 'white', fontSize:18 }}>
                               Produzir
                           </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}