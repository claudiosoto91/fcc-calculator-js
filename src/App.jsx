// import { useState } from 'react';
import './App.css'

// export default function App() {
//   const [expresion, setExpresion] = useState("");
//   const [answer, setAnswer] = useState(0);
  
//   const display = (symbol) => {
//     setExpresion(prev => prev+ symbol);
//     if ( expresion[expresion.length - 1] === "=" ){
//       if ( /[0-9]/.test(symbol) ){
//         setExpresion(symbol);
//       }else{
//         setExpresion(answer + symbol)
//       }
//     }
//   };
//   const calculate = () => {
//     setAnswer(eval(expresion));
//     setExpresion((prev) => prev + "=");
//   }
//   const allClear = () => {
//     setExpresion("");
//     setAnswer(0);
//   }
//   const clear = () => {
//     setExpresion(prev => prev.split("").slice(0, prev.length-1).join(""));
//     setAnswer(0);
//   }

    

//   return (
//     <>
//       <h1>Calculator | JS</h1>
//       <div className='container'>
//           <div className='grid'>
//             <div id='display' className='display'>
//               <div>
//                 {expresion || "0"}
//               </div>
//               <div>{answer}</div>
//             </div>
//             <div onClick={allClear} id='clear' className='padButton clear tomato'>AC</div>
//             <div onClick={clear} id='btn-c' className='padButton btn-c tomato'>C</div>
//             <div onClick={ () => display("/")} id='divide' className='padButton divide'>/</div>
//             <div onClick={ () => display("*")} id='multiply' className='padButton multiply'>x</div>
//             <div onClick={ () => display("7")} id='seven' className='padButton seven dark-gray'>7</div>
//             <div onClick={ () => display("8")} id='eight' className='padButton eight dark-gray'>8</div>
//             <div onClick={ () => display("9")} id='nine' className='padButton nine dark-gray'>9</div>
//             <div onClick={ () => display("-")} id='subtract' className='padButton subtract'>-</div>
//             <div onClick={ () => display("4")} id='four' className='padButton four dark-gray'>4</div>
//             <div onClick={ () => display("5")} id='five' className='padButton five dark-gray'>5</div>
//             <div onClick={ () => display("6")} id='six' className='padButton six dark-gray'>6</div>
//             <div onClick={ () => display("+")} id='add' className='padButton add'>+</div>
//             <div onClick={ () => display("1")} id='one' className='padButton one dark-gray'>1</div>
//             <div onClick={ () => display("2")} id='two' className='padButton two dark-gray'>2</div>
//             <div onClick={ () => display("3")} id='three' className='padButton three dark-gray'>3</div>
//             <div onClick={calculate} id='equals' className='padButton equals blue'>=</div>
//             <div onClick={ () => display("0")} id='zero' className='padButton zero dark-gray'>0</div>
//             <div onClick={ () => display(".")} id='decimal' className='padButton decimal dark-gray'>.</div>
//         </div>
//       </div>
//     </>
//   )
// }

import { useState } from "react";

export default function App(){
  
    const operators = ["*", "/", "+", "-"];
    const [exp, setExp] = useState("");
    const [io, setIO] = useState("0");
    const [solved, setSolved] = useState(false);


  
    function clear() {
        setExp("");
        setIO("0");
    }

    function op(toDo) {
        // working copy
        let wcExp = exp;

        if (solved) {
            wcExp = io;
            setSolved(false);
        }

        if (toDo !== "-") {
            wcExp = wcExp.replace(/[*\/+-]+$/, "");
        } else if (toDo === "-" && wcExp.endsWith("-")) {
            return;
        }

        setExp(wcExp + toDo);
        setIO(toDo);
    }

    function n(digit) {
        // working copy
        let wcExp = exp;
        let wcIO = io;

        if (digit === "0" && wcExp === "0") {
            return;
        }

        if (solved) {
            wcExp = "";
            wcIO = "";
            setSolved(false);
        }

        if (operators.includes(io)) {
            wcIO = "";
        }

        if (wcIO === "0") {
            wcIO = "";
        }

        if (digit === ".") {
            if (wcIO.includes(".")) {
                return;
            }

            if (wcIO === "") {
                wcIO = "0";
            }

            if (wcExp === "" || /[*\/+-]$/.test(wcExp)) {
                wcExp += "0";
            }
        }

        setExp(wcExp + digit);
        setIO(wcIO + digit);
    }

    function solve() {
        // working copy
        let wcExp = exp;

        wcExp = wcExp.replace(/[*\/+-]+$/, "");

        const answer = eval(wcExp).toString();

        setExp(wcExp + "=" + answer);
        setIO(answer);
        setSolved(true);
    }

    return (
        <div className="container">
          <div className="grid" >
            <div className="exp">{exp}</div>
            <div id="display" className="io">
                {io}
            </div>
            <div className="padButton clear">
                <button id="clear" onClick={clear}>
                    AC
                </button>
            </div>
             <div className="padButton clearAll">
                <button id="clear" onClick={clear}>
                    C
                </button>
            </div>
            <div className="padButton divide">
                <button id="divide" onClick={() => op("/")}>
                    /
                </button>
            </div>
            <div className="padButton multiply">
                <button id="multiply" onClick={() => op("*")}>
                    X
                </button>
            </div>
            <div className="padButton seven">
                <button id="seven" onClick={() => n("7")}>
                    7
                </button>
            </div>
            <div className="padButton eight">
                <button id="eight" onClick={() => n("8")}>
                    8
                </button>
            </div>
            <div className="padButton nine">
                <button id="nine" onClick={() => n("9")}>
                    9
                </button>
            </div>
            <div className="padButton subtract">
                <button id="subtract" onClick={() => op("-")}>
                    -
                </button>
            </div>
            <div className="padButton four">
                <button id="four" onClick={() => n("4")}>
                    4
                </button>
            </div>
            <div className="padButton five">
                <button id="five" onClick={() => n("5")}>
                    5
                </button>
            </div>
            <div className="padButton six">
                <button id="six" onClick={() => n("6")}>
                    6
                </button>
            </div>
            <div className="padButton add">
                <button id="add" onClick={() => op("+")}>
                    +
                </button>
            </div>
            <div className="padButton one">
                <button id="one" onClick={() => n("1")}>
                    1
                </button>
            </div>
            <div className="padButton two">
                <button id="two" onClick={() => n("2")}>
                    2
                </button>
            </div>
            <div className="padButton three">
                <button id="three" onClick={() => n("3")}>
                    3
                </button>
            </div>
            <div className="padButton equals">
                <button id="equals" onClick={solve}>
                    =
                </button>
            </div>
            <div className="padButton zero">
                <button id="zero" onClick={() => n("0")}>
                    0
                </button>
            </div>
            <div className="padButton decimal">
                <button id="decimal" onClick={() => n(".")}>
                    .
                </button>
            </div>
          </div>

        </div>
    );
}
