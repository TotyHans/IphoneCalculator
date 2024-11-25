import { Component } from '@angular/core';
import { sign } from 'crypto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator';
  input = '';
  result = 0;
  resolvedEcuation = false;
  firstChar = false;
  decimal = false;
  negative = false;
  cleanInput(){
    this.input = '';
  }
  insertChar(character:String){
    this.input += character;
    this.verifyValues();
  }
  insertValue(digit:number){
    if(this.resolvedEcuation && !this.checkCaracter()){
      this.resolvedEcuation = false;
      this.cleanInput();
    }
      this.input+=digit;
      this.verifyValues();
    }
  toggleMinusPlus(){
    debugger
    var index = 0;
    for (index; index < this.input.length; index++) {
      if(isNaN(parseFloat(this.input.charAt(index)))){
          this.input = this.input.slice(index+1);
          break;
      }else{
        var sign = "-";
        var completeNumber = sign.concat(this.input);
        this.input = completeNumber;
        break;
      } 
    }
   return index;
  }
  verifyValues(){
    var array = [];//todos los elementos que ingresa el usuario
    var value1 = '';
    var value2 = '';
    var signFound = false;
    var sign = '';
    var point1 = false;
    var point2 = false;
    var signs = ['*','+','÷','-','%'];
    //obteniendo el input del usuario para evaluar cada caracter
  for (let index = 0; index < this.input.length; index++) {
    array.push(this.input.charAt(index));
    }
    //verificando qué es un numero y qué es un signo por cada caracter
    for (let index = 0; index < array.length; index++) {
      var isNotNumber = isNaN(parseFloat(array[index]));
      //vamos a comparar si es un signo para operar y no confundir con el .
      if(isNotNumber){
  //si el input es igual a cualquiera de los signos permitidos lo guarda en signo
  //y continuamos el ciclo
  debugger
      for (let j = 0; j < signs.length; j++) {
        //'*','+','÷','-','%'
        if(array[index] == signs[j] && !this.negative){
          if(signFound){
            this.operation(0,0,value1,value2,sign);
            value1 = this.input;
            this.input += array[index];
            signFound = false;
            break;
          }
          signFound = true;
          sign = array[index];
          break;
        }else if(sign !=''){
          if(!point2){
          value2 += array[index];
          point2 = true;  
          this.decimal = true;
        }
        }else{
          if(!point1){
          value1 += array[index];
          point1 = true; 
          this.decimal = true; 
        }
        }
      }
    }else if(sign != ''){
      value2 += array[index];
    }else{
      value1 += array[index];
    }
  }
}
  resolveEcuation(){  
    var array=[];
    var signs = ['*','+','÷','-','%'];
    var sign = '';
    var value1='';
    var value2='';
    for (let index = 0; index < this.input.length; index++) {
      array.push(this.input.charAt(index));
      }
      for (let index = 0; index < array.length; index++) {
        var isNotNumber = isNaN(parseFloat(array[index]));
        if(isNotNumber){
          for (let j = 0; j < signs.length; j++) {
            if(array[index] == signs[j] ){
              sign = array[index];
              break;
            }
          }
        }else if(sign == ''){
        value1 += array[index];
        }else{
        value2 += array[index];
        }
      }
      this.operation(0,0,value1,value2,sign);
      this.resolvedEcuation = true;
  }
  
  checkCaracter(){
    var character = false;
    for (let i = 0; i < this.input.length; i++) {
     if(isNaN(parseFloat(this.input[i]))&& this.input[i] != '.'){
      character = true;
     }  
    }
    return character;
  }
  checkDecimalPoint(value:string){
    var start = false;
    var count=0;
      for (let index = 0; index < value.length; index++) {
        if(isNaN(parseFloat(value.charAt(index)))){
          start = true;
        }
        if(start && !isNaN(parseFloat(value.charAt(index)))){
          count++;
        }
      }
  
    return count;
  }
  operation(num1:number,num2:number,value:string,value2:string,sign:string){
    debugger
    switch(sign){
      case '+':
        num1 = parseFloat(value);
        num2 = parseFloat(value2);
        var res = num1 + num2;
        var dp1 = this.checkDecimalPoint(value);
        var dp2 = this.checkDecimalPoint(value2);
        if(dp1 > dp2){
        this.input = res.toFixed(dp1).toString();
        }else if(dp2 > dp1){
        this.input = res.toFixed(dp2).toString();
        }else if(dp1 == dp2){
        this.input = res.toFixed(dp1).toString();
        }else{
        this.input = res.toString();
        } 
        break;
      case '-':
        num1 = parseFloat(value);
        num2 = parseFloat(value2);
        var res = num1 - num2;
        var dp1 = this.checkDecimalPoint(value);
        var dp2 = this.checkDecimalPoint(value2);
        if(dp1 > dp2){
        this.input = res.toFixed(dp1).toString();
        }else if(dp2 > dp1){
        this.input = res.toFixed(dp2).toString();
        }else if(dp1 == dp2){
        this.input = res.toFixed(dp1).toString();
        }else{
        this.input = res.toString();
        } 
        break;
      case '*':
        num1 = parseFloat(value);
        num2 = parseFloat(value2);
        var res = num1 * num2;
        var dp1 = this.checkDecimalPoint(value);
        var dp2 = this.checkDecimalPoint(value2);
        if(dp1 > dp2){
        this.input = res.toFixed(dp1).toString();
        }else if(dp2 > dp1){
        this.input = res.toFixed(dp2).toString();
        }else if(dp1 == dp2){
        this.input = res.toFixed(dp1).toString();
        }else{
        this.input = res.toString();
        } 
        break;
      case '÷':
        num1 = parseFloat(value);
        num2 = parseFloat(value2);
        var res = num1 / num2;
        var dp1 = this.checkDecimalPoint(value);
        var dp2 = this.checkDecimalPoint(value2);
        if(dp1 > dp2){
        this.input = res.toFixed(dp1).toString();
        }else if(dp2 > dp1){
        this.input = res.toFixed(dp2).toString();
        }else if(dp1 == dp2){
        this.input = res.toFixed(dp1).toString();
        }else{
        this.input = res.toString();
        } 
        break;
    }
  }
}