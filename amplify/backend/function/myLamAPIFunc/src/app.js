/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { Configuration, OpenAIApi } = require("openai")
//const config = require("./config")
const AWS = require('aws-sdk');
const ssm = new AWS.SSM({region:"eu-central-1"})



    
    // Chiamata ad altra funzione che utilizza myParamValue


// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/egen', async function(req, res) {
  const resu = await getGptKey("test",false)
  console.log(resu);
  res.json({success: 'get call succeed! SCHEISSSSE', url: req.url});
});


app.get('/egen/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/egen', async function(req, res) {
  try {
    const gptKey = await getGptKey("chat-gpt-key",true)
    const {to,purpose, language, other, formal} = req.body
    const question = buildMainQuestion({to,purpose, other, language,formal})
    if(question){
      const answer = await GPTQuestion(question,gptKey)
      res.status(201).send({
        res:answer,
        req:question
      })
    }
  } catch (error) {
    res.status(500).send("Internal Server Error")
    console.log(error);
  }

  // Add your code here
  
});

app.post('/egen/*', function(req, res) {
  // Add your code here
});

/****************************
* Example put method *
****************************/

app.put('/egen', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/egen/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/egen', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/egen/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app


const GPTQuestion = async(question,gptKey) =>  {
  return new Promise((resolve,reject) => {
     const openai = new OpenAIApi(new Configuration({
         apiKey: gptKey 
     }))
     openai.createChatCompletion({
       model:"gpt-3.5-turbo",
       messages:[{role: "user", content:`${question}`}]
     }).then((res)=> resolve(res.data.choices[0].message.content)).catch((Err) => reject(Err))
})
}

const buildMainQuestion = ({to,purpose, other, language,formal}) => to&&purpose&&language?`I would like you to write a structured ${isFormal(formal)} email, ${language?"in"+" "+language:""} for me to ${to}, with the purpose:${purpose}. ${isOther(other)}`:null//potrebbe diventare un app che suggerisce pastibuoni quotidiani
const isOther = (other) => other?`Other informations are: ${other}`:""
const isFormal = (formal) => {
  return formal?"formal":"unformal"
}

async function getGptKey(parameterName,isDecripted){

  const params = {
    Name: parameterName,
    WithDecryption: isDecripted
  };

  const response = await ssm.getParameter(params).promise();

  if (!response.Parameter || !response.Parameter.Value) {
    throw new Error(`Could not retrieve value for SSM parameter ${parameterName}`);
  }
  return response.Parameter.Value
}