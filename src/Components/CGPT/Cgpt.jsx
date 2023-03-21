import React, { useState } from "react";
import fetch from 'isomorphic-fetch';
import Answer from "../Answer/Answer";
import GifGptAnswer from "../GifGtpAnswer/GifGptAnswer";
import './Cgpt.css';
function Cgpt(){
    const introductionText = `Introducing "MailGen", the ultimate email generation app designed to simplify your communication process and save you time. Whether you're sending out newsletters, sales pitches, or simply following up with clients, MailGen has got you covered.`
    const asciiArt = ['(๑ > ᴗ < ๑)','( ๑ ˃̵ᴗ˂̵)و ♡','৻(  •̀ ᗜ •́  ৻)','(づ ᴗ _ᴗ)づ♡',"˶ᵔ ᵕ ᵔ˶"]
    const [isLoading, setLoading] = useState(false) 
    const [inputValues, setInputValues] = useState({})
    const [ answerChatGPT, setAnserChatGPT ] = useState({})
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
        }
      
        
    const handleSubmit = async(e) => {
       e.preventDefault();
       setLoading(true)
       console.log(inputValues);
        // send data to API using fetch or axios
       fetch('http://localhost:3100/question', {
        method: 'POST',
        body: JSON.stringify(inputValues),
        headers: {
        'Content-Type': 'application/json'
        }
        })
       .then((data)=> {
           return data.json()
        }).then((res) =>{
            setLoading(false)
            console.log("hitted", res, isLoading);
            setAnserChatGPT(res)
        }).catch((e) => {
            console.log(e);
        })
        // const data = await res.json().catch((Err) => console.log(Err))
        // console.log(data);
        // setAnserChatGPT(data)
}
const handleSetChatGPTanswer = (answer) => {
    setAnserChatGPT(answer);
    setInputValues({})
  };
//answe res 
    return(
        <div className="layout">
            
            {!answerChatGPT.res 
                     ?   ( !isLoading 
                            ?
                                <form className = "container" onSubmit={handleSubmit}>
                                    <div className="el inputs">    
                                        <label htmlFor="to">Who will you send the email to?</label>                            
                                                <input type="text" name={"to"} placeholder={asciiArt[0]} onChange={handleInputChange} />
                                                <span></span>
                                        <label htmlFor="purpose">Why are you writing this email?</label>                            
                                                <input type="text" name={"purpose"} placeholder={asciiArt[1]} onChange={handleInputChange} />
                                                <span></span>
                                        <label htmlFor="language">What language should the email be in?</label>                            
                                                <input type="text" name={"language"} placeholder={asciiArt[2]} onChange={handleInputChange} />
                                                <span></span>
                                        <label htmlFor="other">Additional Informations</label>                            
                                                <input type="text" name={"other"} placeholder={asciiArt[3]} onChange={handleInputChange} />
                                        <label htmlFor="formal">Must be formal</label>                            
                                                <input type="checkbox" name={"formal"} placeholder={asciiArt[4]} onChange={handleInputChange} />
                                                
                                        <div className ="send">
                                            <button id="subBtn" type="submit" disabled={isLoading}>Send</button>
                                            
                                        </div>
                                    </div>
                                    <div className="el">
                                        {introductionText}
                                    </div> 
                                </form>
                            :
                                <GifGptAnswer/>
                        )
                    :
                    <div className="container">
                    <div className="el">      
                        <Answer chatGPTanswer={answerChatGPT.res} setChatGptAnswer={handleSetChatGPTanswer}></Answer>
                    </div>
                </div>  
            }
        </div>
    )
}
export default Cgpt