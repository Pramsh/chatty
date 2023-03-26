import React, { useState } from "react";
import Answer from "../Answer/Answer";
import GifGptAnswer from "../GifGtpAnswer/GifGptAnswer";
import { API } from 'aws-amplify';
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
        
      



//change the buttons






    const handleSubmit = async(e) => {
        try {
            e.preventDefault(); 
            const {language,purpose,to} = inputValues
            if(to&&purpose&&language){
                setLoading(true)     
                const res = await API.post('EmailGen', '/egen', {
                 headers: {
                   'Content-Type': 'application/json',//prova a rimettere il then
                 },
                 body: inputValues
               })
                setLoading(false)
                setAnserChatGPT(res)
                return res
            }else{
                handleRequire({to,purpose,language})
            }

        } catch (error) {
            console.log(error);    
        }
}

const handleRequire = ({to, purpose, language}) => {
    if (!to) {
        document.getElementsByName('to')[0].classList.add('undefined-input');
      } else {
        document.getElementsByName('to')[0].classList.remove('undefined-input');
      }
      if (!purpose) {
        document.getElementsByName('purpose')[0].classList.add('undefined-input');
      } else {
        document.getElementsByName('purpose')[0].classList.remove('undefined-input');
      }
      if (!language) {
        document.getElementsByName('language')[0].classList.add('undefined-input');
      } else {
        document.getElementsByName('language')[0].classList.remove('undefined-input');
      }
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
                                        <label htmlFor="to">Who will you send the email to?*</label>                            
                                                <input type="text" name={"to"} placeholder={asciiArt[0]} onChange={handleInputChange} />
                                                <span></span>
                                        <label htmlFor="purpose">Why are you writing this email?*</label>                            
                                                <input type="text" name={"purpose"} placeholder={asciiArt[1]} onChange={handleInputChange} />
                                                <span></span>
                                        <label htmlFor="language">What language should the email be in?*</label>                            
                                                <input type="text" name={"language"} placeholder={asciiArt[2]} onChange={handleInputChange} />
                                                <span></span>
                                        <label htmlFor="other">Additional Informations</label>                            
                                                <input type="text" name={"other"} placeholder={asciiArt[3]} onChange={handleInputChange} />
                                        <label htmlFor="formal">Must be formal</label>                            
                                                <input type="checkbox" name={"formal"} placeholder={asciiArt[4]} onChange={handleInputChange} />
                                                
                                        <div className ="send">
                                            <button id="subBtn" type="submit" onClick={handleSubmit} disabled={isLoading}>Send</button>
                                            
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