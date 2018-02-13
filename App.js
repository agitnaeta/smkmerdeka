/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  Alert,
  FlatList,
  Linking
} from 'react-native';



export default class App extends Component<{}> {

  // constructor aplikasi
  constructor(props){
    super(props)
    // Dinamic variable
    this.state = {
      judul  : 'Aplikasi Cari Harga',
      deskripsi: 'Aplikasi Pencarian Harga Paling murah',
      cari  : '',
      params :'',
      judulList :'',
      code :'',
    }
  }


  // Buka Browser 
  _open_link(url){
    Linking.openURL(url)
  }
  // Pencarian App 
 
  pencarians  = () => {
    fetch ('http://malesnyari.com/api/search',{
      method :'POST',
      headers :{
        Accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      body : "keyword="+this.state.cari
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
       this.setState({
         code : responseJson.code,
         params : responseJson.params,
         judulList : {
           produk :'Produk',
           related :'Related',
           suggest :'Suggest'
         }
       })
      //  Alert.alert(JSON.stringify(this.state.params))
    })
    .catch((error) =>{
      console.error(error)
    })
  }

  // Render Aplikasi 
  render() {

    // Static variable
    let gambar = {
      uri : 'http://www.smkmerdekabdg.sch.id/images/banner/01.jpg'
    }
   
    return (
     <ScrollView style={styles.containerScroll}>
        <Image source={gambar} style={styles.banner}/>
        <View>
              <Text style={styles.welcome}>
                {this.state.judul}
              </Text>
              <Text style={styles.instructions}>
                {this.state.deskripsi}
              </Text>
        </View>
        <TextInput
          style ={{height:40}}
          placeholder = "Cari Apa Yang anda mau"
          onChangeText = {(cari)=>this.setState({cari})}
          />
        <Button
          onPress = {this.pencarians}
          title="Cari barang"
        />
        <Text>
          {this.state.cari}
        </Text>

        <Text>
          {this.state.judulList.produk}
        </Text>
        <FlatList 
          data = {this.state.params.products}
          
          renderItem = {
            ({item}) => 
            <View id={item.cacheId} style = {styles.resultView}>
              <Image 
                onPress = {()=>this._open_link(item.link)}
                source = {{uri:item.src}}
                style  = {{width:50,height:50}}
              />
              <Text 
                id={item.cacheId}
                onPress = {()=>this._open_link(item.link)}
              >
                {item.title}
                {"\n"}
                {item.harga}
              </Text>
            </View>
          }
         /> 
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerScroll :{
    padding :10,
  },
  banner :{
    width : 500,
    height:100,
  },
  judul :{
    paddingTop :300,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  resultView :{
    margin :20,
   flexDirection: 'row',
   justifyContent: 'space-between'
 },
});
