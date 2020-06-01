const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require("../middleware/auth");

router.get('', (req, res)=>{
	res.render('register')
})


router.post('/time', (req, res)=>{
	res.send({
		time: Date().split(' ')[4] // We will be keeping a uniform end time for everyone..just like previous checkmate
	})
}) 


router.get('/instructions', (req, res)=>{
	res.send("Will render instructions page here....")
})

router.post("/score", auth, (req, res) => {
	try {
		req.user.score = req.user.score + parseInt(req.body.score)
		req.user.save()
		res.send({
			"username": req.user.username,
			"score": req.user.score
		})
	} catch (e) {
		res.status(500).send(e)
	}
})

router.get("/tic-tac-toe", auth, (req, res) => {
	// console.log(req.user)
	res.render("tic-tac-toe/index", {
		"user": req.user
	})
})

router.get("/me", auth, (req, res) => {
	res.send({
		"username": req.user.username,
	})
})

module.exports = router 
