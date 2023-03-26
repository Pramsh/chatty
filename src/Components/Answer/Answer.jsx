import React,{useState} from "react";
import "./Answer.css"
function Answer({chatGPTanswer, setChatGptAnswer}){

    const [copyButtonValue,setCopyButtonValue] = useState("Copy!")

    const resetChatGPTAnswer = () => {
        setChatGptAnswer({})
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(chatGPTanswer);
        setCopyButtonValue("Copied!")
      };
    
    
    
    return(
        <div>
            <div>
                {chatGPTanswer}
            </div>
            <div className="send">
            <button onClick={resetChatGPTAnswer}>Back</button>
            </div>
            <div className="textCopy">
            <button onClick={copyToClipboard}>{copyButtonValue}</button>
            </div>
        </div>
    )
}

export default Answer
