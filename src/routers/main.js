const express = require('express')
const router = new express.Router()
const User = require('../models/user')


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


router.get('/login', (req, res)=>{
	res.render('login')
})


router.get('/register', (req, res)=>{
	res.render('/register')
})


module.exports = router 
