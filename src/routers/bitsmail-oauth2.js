const express = require("express");
const router = new express.Router();
const googleOAuthUrl = require("../google-oauth2/google-oauth2");
const getAccessTokenFromCode = require("../google-oauth2/generateAccessToken");
const fetchUserData = require("../google-oauth2/fetchUserData")

router.get("/login-using-BitsMail", async (req,res)=>{
	res.redirect(googleOAuthUrl)
})

router.get("/google-oauth2", async (req,res) => {
    const access_token = await getAccessTokenFromCode(req.query.code)
    const data = await fetchUserData(access_token)
    res.send(data)
})

module.exports = router