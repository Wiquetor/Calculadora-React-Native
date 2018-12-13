import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Dimensions} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  _addNum = (n) => {
    this.setState({text: this.state.text + n});
  }

  _addSign = (s) => {
    
    if(this.state.text[this.state.text.length-1] != null)
      if (this.state.text[this.state.text.length-1] != '+' && this.state.text[this.state.text.length-1] != '*' &&
          this.state.text[this.state.text.length-1] != '-' && this.state.text[this.state.text.length-1] != '/' )
        this.setState({text: this.state.text + s}); //Caso tenha um número atrás, adicione o sinal na frente
      else
        this.setState({text: this._setCharAt(this.state.text,this.state.text.length-1,s)}); //Caso não seja um número, substitua o sinal antigo
  }

  _backspace() {
    this.setState({text: this._setCharAt(this.state.text,this.state.text.length-1,'')});
  }

  _calculate() {
    //Essa calculadora não calcula ainda, desculpa.
  }

  _clear = () => {
    this.setState({text:""});
  }

  _setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }

  render() {

    return (

      <View style={{flex: 1}}>
        <TextInput style={styles.textinput} maxLength = {14} editable = {false} value={this.state.text} /> 
        
        <View style={styles.buttoncontainer}> 
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(1)}><Text style={styles.containedbuttontext}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(2)}><Text style={styles.containedbuttontext}>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(3)}><Text style={styles.containedbuttontext}>3</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addSign('+')}><Text style={styles.containedbuttontext}>+</Text></TouchableOpacity>

          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(4)}><Text style={styles.containedbuttontext}>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(5)}><Text style={styles.containedbuttontext}>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(6)}><Text style={styles.containedbuttontext}>6</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addSign('-')}><Text style={styles.containedbuttontext}>-</Text></TouchableOpacity>

          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(7)}><Text style={styles.containedbuttontext}>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(8)}><Text style={styles.containedbuttontext}>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(9)}><Text style={styles.containedbuttontext}>9</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addSign('*')}><Text style={styles.containedbuttontext}>*</Text></TouchableOpacity>

          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addNum(0)}><Text style={styles.containedbuttontext}>0</Text></TouchableOpacity>

          <TouchableOpacity style={styles.containedbutton} onPress={() => this._clear()}><Text style={styles.containedbuttontext}>C</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._addSign('/')}><Text style={styles.containedbuttontext}>/</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._calculate() }><Text style={styles.containedbuttontext}>=</Text></TouchableOpacity>
          <TouchableOpacity style={styles.containedbutton} onPress={() => this._backspace() }><Text style={styles.containedbuttontext}>Apagar</Text></TouchableOpacity>

        </View> 
      </View>

    );
  }
}

const styles = StyleSheet.create({
  
  textinput: {
     flex: 1,
     
     backgroundColor: 'white',
     borderColor:'#333333',

     fontWeight: 'bold',
     fontSize: 40,

     borderTopWidth: 25,
     borderBottomWidth: 5,
     borderLeftWidth: 5,
     borderRightWidth: 5,

     paddingHorizontal: 10
  },

  buttoncontainer: {
    flex: 3,


    backgroundColor: 'grey',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'space-evenly'
  },

  containedbutton: {

    flex:1,
    margin:5,
    flexBasis:'22%',
    aspectRatio: 1,
    justifyContent: 'center',
    borderRadius: 3,

    backgroundColor:'white'
  },

  containedbuttontext: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  }

});
