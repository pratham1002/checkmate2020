const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const path = require('path') ;


const views = path.join(__dirname, '../../public') ;


router.get('/register', (req, res)=>{
	res.render('register')
})

router.get('/login', (req, res)=>{
	res.render('login')
})

// router.get('/logout/', (req, res)=>{
// 	res.clearCookie('jwt')
// 	res.sendFile(views + '/logout.html') // You guys need to add a logout file in public folder
// })

router.post("/register", async (req,res) => {
	console.log(req.body.username)
    const user = new User(req.body)
    try{
		token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post("/login", async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.username,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
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

module.exports = router;