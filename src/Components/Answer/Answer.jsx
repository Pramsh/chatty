import React from "react";

function Answer({chatGPTanswer, setChatGptAnswer}){
    //devo fare il bottone per tornare indietro
    const resetChatGPTAnswer = () => {
        setChatGptAnswer({})
    }
    
    return(
        <div>
            <div>
                {chatGPTanswer}
            </div>
            <button onClick={resetChatGPTAnswer}>Back</button>
        </div>
    )
}

export default Answer