const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const path = require('path') ;

const views = path.join(__dirname, '../../public') ;

router.get('/logout/', (req, res)=>{
	res.clearCookie('jwt')
	res.sendFile(views + '/logout.html') // You guys need to add a logout file in public folder
})

router.post('/logout/', async (req, res)=>{
	const user = await User.findById(req.user._id) ;
	try {
		user.tokens = user.tokens.filter((token) => token.token!==req.cookies.jwt) ;
		user.save() ;
		res.status(200).send()
	} catch (e) {
		res.status(500).send() ;
	}
})

// TODO:Add routers for Login and Registration [POST Request] here

module.exports = router;