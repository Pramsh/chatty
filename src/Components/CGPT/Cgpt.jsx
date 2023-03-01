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
                <div class="view">
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
                    <div class="kawaiiImg">
                        <p>
                        Ciao e benvenuto in ******, la prima smart app per la tua dieta personalizzata!<br></br>

Sei pronto a tirare fuori il meglio dal tuo corpo? <br></br>Con l'aiuto della nostra app, potrai creare una dieta salutare che si adatta perfettamente alle tue esigenze!<br></br> Non solo, avrai anche accesso a una vasta gamma di informazioni su cibi specifici, come gli ingredienti, gli allergeni e le vitamine contenute in ogni pietanza o verdura.<br></br> In questo modo, avrai sempre le informazioni necessarie per fare scelte alimentari consapevoli e intelligenti.<br></br>

Ma c'è di più! Grazie alla nostra app, avrai accesso a deliziose ricette per completare i tuoi pasti,<br></br> e la possibilità di personalizzare più di una dieta in base al rapporto di nutrienti di cui hai bisogno in un determinato periodo. <br></br>E il tutto verrà visualizzato in un comodo (e buono!) grafico a torta, per rendere ancora più facile monitorare la tua dieta.<br></br>

Quindi, cosa aspetti? Non perdere altro tempo a cercare di capire cosa mangiare!<br></br> Scarica la nostra app e crea subito la tua dieta personalizzata. <br></br>Non solo ti sentirai meglio, ma otterrai anche i risultati che hai sempre desiderato.<br></br> Vieni a scoprire tutto ciò che ****** ha da offrire e unisciti alla nostra comunità di persone che hanno già migliorato la loro salute grazie alla nostra app!
                        </p>
                    </div>    
                </div>
            </form>
            }
        </div>
    )
}
export default Cgpt