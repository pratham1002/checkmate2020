const queryString = require("query-string")

const stringifiedParams = queryString.stringify({
  client_id: process.env.CLIENT_ID,
  redirect_uri: 'http://localhost:3000/google-oauth2',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

module.exports = googleLoginUrl