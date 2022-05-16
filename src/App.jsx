import './App.css';
import React, {useState} from 'react';

function App() {
//alineado del texto de titulo y color de fuente
const hStyle = {textAlign: 'center', color: 'white' };
const [number1, setNumber1] = useState("");
const [number2, setNumber2] = useState("");
const [currentOperation, setCurrentOperation] = useState("");
const [result, setResult] = useState(0);

const initialState = JSON.parse(localStorage.getItem("hist")) || []
const [hist, setHist] = useState(initialState)

const handleHist = () => {
  var dato1 = number1.opera1; //almacena en una variable
  var dato2 = currentOperation.opera2; //almacena en una variable
  var op = setResult.operador //almacena el operador
  var res = result; //almacena resultado en una variable

  //Agrega al almacenmiento local el JSON de la operación realizada
  localStorage.setItem("hist", JSON.stringify([...hist, { opera1: dato1, opera2: dato2, operador: op, resultado: res, }, ]));
  //Actualiza el state que obtiene el historial de operaciones
  setHist([...hist, { opera1: dato1, opera2: dato2, operador: op, resultado: res, },]);
};

const deleteNumber =() => {
  //borra los operandos usando DEL
  if (currentOperation === ""){
    setNumber1(number1.toString().slice(0,-1));
  } else {
    setNumber2(number2.toString().slice(0,-1));
  }
};


function allClear() {
  setNumber1("");
  setNumber2("");
  setCurrentOperation("");
  setResult("");
}
function clickNumber (val) {
  if (currentOperation === "") {
    setNumber1(number1 + val);
  } else {
    setNumber2(number2 + val);
  }
}
//función para los operandos
  function clickOperation (val) {
    setCurrentOperation (val);
  }
//funcion que obtiene el resultado dependiendo de la operación realizada
  function getResult (){

    switch (currentOperation) {
      case "+":
        //convierte los valores string a numeros
        setResult(Number(number1) + Number(number2));
        break;
      case "-":
        //convierte los valores string a numeros
        setResult(Number(number1) - Number(number2));
        break;
      case "*":
        //convierte los valores string a numeros
        setResult(Number(number1) * Number(number2));
        break;
      case "/":
        //convierte los valores string a numeros
        setResult(Number(number1) / Number(number2));
        break;
      default:
        break;
    }
  }
  return (
    //clases de la aplicacion
    <div className="App">
      <h1 className="title" style={ hStyle }>Calculadora de Luis</h1>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{currentOperation ? number1 + currentOperation : ""}</div> {/*si no hay operación no muestra nada*/}
          <div className="current-operand">{result ? result : (!currentOperation ? number1 : number2)}</div> {/*Si la operación actual =nulo, muestra el primer numero, pero si se selecciona una operación, muestra el 2do*/}
        </div>
        {/*botones de la aplicacion*/}
        <button onClick={allClear} className='span-two'>AC</button>
        <button onClick={deleteNumber}>DEL</button>
        <button onClick={() => {clickOperation("/")}}>/</button>
        <button onClick={() => {clickNumber(7)}}>7</button>
        <button onClick={() => {clickNumber(8)}}>8</button>
        <button onClick={() => {clickNumber(9)}}>9</button>
        <button onClick={() => {clickOperation("*")}}>*</button>
        <button onClick={() => {clickNumber(4)}}>4</button>
        <button onClick={() => {clickNumber(5)}}>5</button>
        <button onClick={() => {clickNumber(6)}}>6</button>
        <button onClick={() => {clickOperation("+")}}>+</button>
        <button onClick={() => {clickNumber(1)}}>1</button>
        <button onClick={() => {clickNumber(2)}}>2</button>
        <button onClick={() => {clickNumber(3)}}>3</button>
        <button onClick={() => {clickOperation("-")}}>-</button>
        <button onClick={() => {clickNumber(".")}}>.</button>
        <button onClick={() => {clickNumber(0)}}>0</button>
        <button onClick={getResult}className='span-two'>=</button> {/*impresión del resultado*/}
        <button onClick={handleHist}className='span-two'>Hist</button> {/*impresión del resultado*/}
      </div>

          {/*historial calculadora*/}

            <div className="col" style={{ width: 400 }}>
        <span className="row">
          <div className="col"
            style={{ width: 400, left: 0 }}
          >
            <h3 style={ hStyle }>Historial de operaciones</h3>

            {hist.length === 0 ? ("Al momento no hay Operaciones que mostrar") 
            : (
              <ol>
                {hist.map((item, index ) => {
                  return (
                    <li className="" >
                      {item.opera1} , {item.operador} , {item.opera2} es igual a: {item.resultado} &nbsp;
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}

export default App;
