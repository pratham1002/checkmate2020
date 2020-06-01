const express = require('express')
const router = new express.Router()
const auth = require("../middleware/auth");


router.get('/chain-reaction/', auth, (req, res)=>{
	res.render('Chain-Reaction/chain_reaction', {
		"user": req.user
	})
})

module.exports = router 