const express = require('express')
const router = new express.Router()

router.get('/chain-reaction', (req, res)=>{
	res.render('Chain-Reaction/chain_reaction')
})

module.exports = router 