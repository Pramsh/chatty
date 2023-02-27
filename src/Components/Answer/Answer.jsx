import React from "react";

function Answer({chatGPTanswer, setChatGptAnswer}){
    const resetChatGPTAnswer = () => {
        setChatGptAnswer({})
    }
    
    return(
        <div>
            <div>
                {chatGPTanswer}
            </div>
            <div class="send">
            <button onClick={resetChatGPTAnswer}>Back</button>
            </div>
        </div>
    )
}

export default Answer