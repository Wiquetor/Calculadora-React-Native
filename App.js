import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

export default class App extends React.Component {

  mathArray;
    constructor(props) {
    super(props);
    this.state = {text: ''};
  }
    
  _addNum = (n) => {
    if(this.state.text[this.state.text.length-1] == "." && n == ".")
    return;

    this.setState({text: this.state.text + n});
  }

  _isNumber = (num) => {
    if(num != null)
        return(num != '+' && num != '*' && num != '-' && num != '/'); 
    return false;   
  }

  _addSign = (s) => {
    
    if(this._isNumber(this.state.text[this.state.text.length-1]))  
        this.setState({text: this.state.text + s}); //Caso tenha um número atrás, adicione o sinal na frente
    else
       this.setState({text: this._setCharAt(this.state.text,this.state.text.length-1,s)}); //Caso não seja um número, substitua o sinal antigo
  }

  _backspace() {
      this.setState({text: this._setCharAt(this.state.text,this.state.text.length-1,'')});
  }

  _calculate() {
      mathString = this.state.text;
      number = "";
      j=0;

      for(i=0;i < mathString.length;i++) { //Quebra a string do TextInput e coloca em um array.
        for(;this._isNumber(mathString[i]);i++)
          number += mathString[i];

        mathArray[j] = {"number":parseFloat(number),
                         "sign": mathString[i]};
              
        number = "";
        j++;

      }

      //Resolve as equações no array, reduzindo ela até um único index.
      for(;mathArray[1];) {

        for (j=0; j < mathArray.length; j++) {

          if(mathArray[j] != null)
          switch(mathArray[j]["sign"]) { //Passa uma primeira vez no vetor para dar prioridade à multiplicação e divisão
            case '/':  mathArray[j]["number"] /= mathArray[j+1]["number"];
                       this._removeIndex(j+1);
                       break; 

             case '*':  mathArray[j]["number"] *= mathArray[j+1]["number"];
                       this._removeIndex(j+1);
                       break;
          }      
        }

        for (j=0; j < mathArray.length; j++) {
          if(mathArray[j] != null)

          switch(mathArray[j]["sign"])
          {
              case '+':  mathArray[j]["number"] += mathArray[j+1]["number"];
                         this._removeIndex(j+1);
                         break;
                       
              case '-':  mathArray[j]["number"] -= mathArray[j+1]["number"];
                         this._removeIndex(j+1);
                         break;  
          }
      }
    }
      this.setState({text: mathArray[0]["number"].toString()});

  }

  _removeIndex = (i) => {
    if(mathArray[i-1] != null)
      mathArray[i-1]["sign"] = mathArray[i]["sign"];

    for(;i < mathArray.length;i++)
        mathArray[i] = mathArray[i+1];

    mathArray[i] == null;
  }

  _clear = () => {
    this.setState({text:""});
  }

  _setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }

  render() {

    mathArray = [{
      "number": '0',
      "sign":'+'
    }];

    
    return (

      <View style={{flex: 1}}>
        <View style={styles.statusbar} />

        <TextInput style={styles.textinput} maxLength = {14} editable = {false} value={this.state.text} /> 
        
        <View style={styles.buttoncontainer}>          
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._clear()}><Text style={[styles.containedbuttontext, styles.buttontexthighlight]}>AC</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._backspace() }><Text style={styles.containedbuttontext}>A</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addSign('*')}><Text style={styles.containedbuttontext}>*</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addSign('/')}><Text style={styles.containedbuttontext}>/</Text></TouchableOpacity>

          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(7)}><Text style={styles.containedbuttontext}>7</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(8)}><Text style={styles.containedbuttontext}>8</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(9)}><Text style={styles.containedbuttontext}>9</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addSign('+')}><Text style={styles.containedbuttontext}>+</Text></TouchableOpacity>

          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(4)}><Text style={styles.containedbuttontext}>4</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(5)}><Text style={styles.containedbuttontext}>5</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(6)}><Text style={styles.containedbuttontext}>6</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addSign('-')}><Text style={styles.containedbuttontext}>-</Text></TouchableOpacity>

          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(1)}><Text style={styles.containedbuttontext}>1</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(2)}><Text style={styles.containedbuttontext}>2</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(3)}><Text style={styles.containedbuttontext}>3</Text></TouchableOpacity>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum('.')}><Text style={styles.containedbuttontext}>.</Text></TouchableOpacity>
          
          <View style={styles.containedbutton}></View>
          <TouchableOpacity ref="touch" style={styles.containedbutton} onPress={() => this._addNum(0)}><Text style={styles.containedbuttontext}>0</Text></TouchableOpacity>
          <View style={styles.containedbutton}></View>
          <TouchableOpacity ref="touch" style={[styles.containedbutton, styles.buttonequals]} onPress={() => this._calculate() }><Text style={[styles.containedbuttontext, styles.buttonequals]}>=</Text></TouchableOpacity>

        </View> 
      </View>

    );
  }
}

const styles = StyleSheet.create({
  
  statusbar: {
    height:Expo.Constants.statusBarHeight,
    backgroundColor: 'black'
  },

  textinput: {
     flex: 1,

     fontSize: 40,

     fontFamily: 'monospace',
     textAlignVertical: 'bottom',
     textAlign: 'right',
     
     backgroundColor: 'white',
     borderColor:'black',

     borderBottomWidth: 0.5,
     paddingHorizontal: 10,
     paddingVertical:10
  },

  buttoncontainer: {
    flex: 3,

    backgroundColor: 'black',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'space-evenly'
  },

  containedbutton: {

    flex:1,
    margin:0.5,
    flexBasis:'22%',
    aspectRatio: 1,
    justifyContent: 'center',

    backgroundColor:'white'
  },

  containedbuttontext: {
    fontFamily: 'Roboto',
    fontSize: 28,
    textAlign: 'center'
  },

  buttonequals: {
    backgroundColor:'#f97c00',
    color:'#ffffff'
  },

  buttontexthighlight: {
    color:'#f97c00'
  }

});
