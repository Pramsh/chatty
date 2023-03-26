const dotenv = require('dotenv');
dotenv.config();

const config = {
    myApiUrl: process.env.REACT_APP_OPENAI_API_KEY
    // altre variabili d'ambiente...
  };
  
  module.exports = config;