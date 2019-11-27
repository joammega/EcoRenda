import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import * as firebase from 'firebase'
import "firebase/firestore"





export default class ProductsListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { produtos: [] }
    }
    alimentarProdutos(query) {
        let produtos = []
        query.forEach(function (doc) {
            produtos.push({
                key: doc.id,
                ...doc.data()
            })
        });
        this.setState({ produtos })
        console.log(this.state.produtos)
    }
    componentDidMount() {

        firebase.firestore().collection("produtos").onSnapshot(this.alimentarProdutos.bind(this))




    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.produtos}
                    renderItem={({ item }) =>
                        <TouchableOpacity 
                        style={{ width: 250, height: 200, borderRadius: 10, overflow:"hidden" }}
                        onPress={()=>this.props.navigation.navigate("Product", {
                            produto: item
                        })}>
                            
                                <ImageBackground 
                                style={{ width: 250, height: 200}}
                                source={{uri: item.linkI}}>

                                </ImageBackground>
                            
                        </TouchableOpacity>

                    }
                />
            </View>

        );
    }
}