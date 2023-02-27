import React, { useState } from "react";
import fetch from 'isomorphic-fetch';
import Answer from "../Answer/Answer";
import './Cgpt.css';
function Cgpt(){
    const headers = ['Altezza', 'Peso', 'Eta', 'Sesso'];
    const inputs = ['input1'];
    const asciiArt = ['(๑ > ᴗ < ๑)','( ๑ ˃̵ᴗ˂̵)و ♡','৻(  •̀ ᗜ •́  ৻)','(づ ᴗ _ᴗ)づ♡']
    let i = 0
    const [inputValues, setInputValues] = useState({})
    const [ answerChatGPT, setAnserChatGPT ] = useState({})
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
        }
      
        
    const handleSubmit = async(e) => {
       e.preventDefault();
       console.log(inputValues);
        // send data to API using fetch or axios
        const res = await fetch('http://localhost:3100/question', {
        method: 'POST',
        body: JSON.stringify(inputValues),
        headers: {
        'Content-Type': 'application/json'
        }
        })
        const data = await res.json().catch((Err) => console.log(Err))
        console.log(data);
        setAnserChatGPT(data)
}
const handleSetChatGPTanswer = (answer) => {
    setAnserChatGPT(answer);
    setInputValues({})
  };

    return(
        <div class="layout">
            {
               answerChatGPT.res
            ? 
                <div class="container">
                    <Answer chatGPTanswer={answerChatGPT.res} setChatGptAnswer={handleSetChatGPTanswer}></Answer>
                </div>
            :   <form onSubmit={handleSubmit}>
{/*                 <div class="view"> */}
                        <div class = "container">
                            <div class = "inputs">
                                <div class="flexEl" key={inputs[0]}>                                
                                    {headers.map(header => (
                                        <div class= "textbox" key={header}>
                                            <div>{header}</div>
                                            <input type="text" name={header} placeholder={asciiArt[i++]} onChange={handleInputChange} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div class ="send">
                            <   button id="subBtn" type="submit">Send</button>
                            </div>
                        </div>
{/*                             <div class="kawaiiImg">A</div>     */}
                {/* </div> */}
            </form>
            }
        </div>
    )
}
export default Cgpt