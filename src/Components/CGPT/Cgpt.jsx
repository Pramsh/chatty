import React, { useState } from "react";
import Answer from "../Answer/Answer";
import './Cgpt.css';
function Cgpt(){
    const headers = ['Altezza', 'Peso', 'Eta', 'Sesso'];
    const inputs = ['input1'];

    const [inputValues, setInputValues] = useState({})
    const [ answerChatGPT, setAnserChatGPT ] = useState({})
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
        }
      
        
    const handleSubmit = async(e) => {
       e.preventDefault();
        // send data to API using fetch or axios
        const res = await fetch('http://localhost:3100/question', {
        method: 'POST',
        body: JSON.stringify(inputValues),
        headers: {
        'Content-Type': 'application/json'
        }
        })
        const data = await res.json()
        console.log();
        setAnserChatGPT(data)
}
const handleSetChatGPTanswer = (answer) => {
    setAnserChatGPT(answer);
    setInputValues({})
  };

    return(
        <div>
            {
               answerChatGPT.res
            ? <Answer chatGPTanswer={answerChatGPT.res} setChatGptAnswer={handleSetChatGPTanswer}></Answer>
            :   <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                            {headers.map(header => (
                                <th key={header}>{header}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            {inputs.map(input => (
                            <tr key={input}>
                                {headers.map(header => (
                                    <td key={header}>
                                        <input type="text" name={header} onChange={handleInputChange} />
                                    </td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                <button type="submit">Send</button>
                </form>
}
        </div>
    )
}
export default Cgpt