const axios = require("axios")

const getAccessTokenFromCode = async(code) => {
  try{
        const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/google-oauth2',
        grant_type: 'authorization_code',
        code,
        }})
        // console.log(data)// { access_token, expires_in, token_type, refresh_token }
        return data.access_token;
  }catch(e){
      console.log("Error: ",e)
      throw e
  }
  
};

module.exports = getAccessTokenFromCode