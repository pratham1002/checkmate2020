const axios = require("axios");

const getGoogleDriveFiles = async (access_token) => {
    try{
        const { data } = await axios({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'get',
            headers: {
        Authorization: `Bearer ${access_token}`,
    },
});
        console.log(data); // { id, email, given_name, family_name }
        return data;
    }catch(e){
        console.log(e)
        throw(e)
    }

};

module.exports = getGoogleDriveFiles;