const mongoose = require('mongoose') 
const Question = require('../models/question') 
const fs = require('fs')
const path = require('path')


mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(async (db)=>{
	console.log("Successfully connected to database :)") ;
	const count = await mongoose.connection.db.collection("questions").countDocuments()
	if (count === 0){
		console.log("Seeding the database..") ;
		const questions = JSON.parse(fs.readFileSync(path.join(__dirname, './fixture.json')));
		var question_input;
		for (question_input of questions.questions){
			const question = await Question.create(question_input) ;
			question.save() ;
		}
		console.log("Seeded the database")
	}
}).catch(error => {
	console.log(error) 
	console.log("Not able to connect to database :(")
})
